"""
Consist classes to perform various operation on documents
"""

import re 
import fitz
import logging 

from operator import itemgetter
from typing import List, Tuple, Optional

from translearn.summarizer import extractive_summarizer
from gensim.summarization.textcleaner import get_sentences


class Pdf:
  """
  This class consist routines to perform various operations on Pdf
  """

  def __init__(self, doc: str):
    """
    :param doc: path of pdf document
    """
    logging.info('initializing object for pdf: %s', doc)
    self.doc = fitz.open(doc)
    self.font_size_count = {}  #frequency of all font size
    self.find_font_size_count()
  
  
  def find_font_size_count(self) -> None:
    """ 
    Find frequency of all font size in document

    :Usage: Font size is use to differentiate paragraphs, headers and subscripts in most pdfs
            We assume most used font_size represent paragraph.
    """

    logging.info('Finding font size of paragraphs')

    for page in self.doc:
      for block in page.getText('dict')['blocks']:
        if block['type'] != 0: continue  #ignoring non-text blocks
        for line in block['lines']:
          for span in line['spans']:
            size = span['size']
            self.font_size_count[size] = self.font_size_count.get(size, 0) + len(span['text'].split())
    
    self.font_size_count = sorted(self.font_size_count.items(), key=itemgetter(1), reverse=True)
    
    if len(self.font_size_count) == 0:
      raise ValueError('No Fonts Found')


  def get_text_with_embedded_info(self) -> str:
    """
    This method embed information about page_no, font_size, position of each line in a text
    :return: complete text of document with embedded info
    """
    
    logging.info('Embedding line info in text')   

    text = ""
    page_no = 0

    for page in self.doc:
      for block in page.getText('dict')['blocks']:
        if block['type'] != 0: continue
        
        for line in block['lines']:  
          text_in_line = ""
          font_size_in_line = {}

          for span in line['spans']:
            text_in_line += span['text'] 
            size = span['size']
            font_size_in_line[size] = font_size_in_line.get(size, 0) + len(span['text'].split())
          
          if(len(font_size_in_line) != 0):
            most_used_font_size = max(font_size_in_line, key=font_size_in_line.get)
            info_to_embed = "@@@id_{page}_{font}_{position} ".format(page=page_no, font=most_used_font_size, position=line['bbox'][1])
            
            #to correctly identify sentence ending when it has superscript '[]'
            text_in_line = re.sub('(?<=[?!.])\[',' ', text_in_line)
             
            text_in_line = info_to_embed + text_in_line + ' '
            text += text_in_line
        
        text += '\n'

      page_no += 1  
    return text 

  
  def prepare_text_for_ext_summarizer(self) -> str:
    """
    This method process the embed text and prepare it to feed in extractive summarizer
    It also ensure enough information is avaialble in text itself for highlighting

    :return: string consist final_text 
    """

    logging.info('Prepare pdf text for extractive summarization')
    
    text = self.get_text_with_embedded_info()
    final_text = "" 
    info = "" 

    for sentence in get_sentences(text):
      final_sentence = sentence
      
      if not final_sentence.startswith('@@@id_'):
        final_sentence = info + final_sentence

      info = [word+' ' for word in final_sentence.split() if word.startswith('@@@id_')][-1]
      final_text += final_sentence + '\n'

    return final_text


  def find_strings_to_highlight(self, ratio: float = 0.1) -> List[Tuple[int, float, str]]:
    """
    Identify all strings to highlight in pdf.
    Note-: Method use heuristic approach to ensure that heading and subscripts will not get highlighted
    """
    
    sentences = extractive_summarizer(self.prepare_text_for_ext_summarizer(), ratio)
    string_to_highlight = []
    imp_sentences = []
    
    logging.info('finding strings to highlight')

    font1 = self.font_size_count[0]   #most used font
    font2 = None if len(self.font_size_count) < 2 else self.font_size_count[1]  #second most used font
    font_to_highlight = [font1[0]]

    #we consider font2 to highlight if it is atleast 30% of font1 and roughly equal to it in size
    if font2 is not None and abs(font1[0]-font1[0]) < 1 and font2[1] >= 0.3*font2[0]: 
      font_to_highlight.append(font2[0])

    strings_to_highlight = []

    for sentence in sentences:
      if not sentence.startswith('@@@id_'): continue  #rare situation of information loss
      lines = sentence.split('@@@id_')
  
      for line in lines:
        info = re.search(r'^\s*\S+', line) 
        if info is None: continue
        info = info.group().split('_')
        if len(info) < 3: continue  
        if float(info[1]) in font_to_highlight:
          strings_to_highlight.append((int(info[0]), float(info[2]), re.sub(r'^\s*\S+', '', line).strip()))
  
    return strings_to_highlight


  def search_string(self, string: str, page_no: int, line_pos: Optional[float] = None, max_error: int = 3) -> List:
    """
    :param string: string to search
    :param page_no: page no of pdf that will be searched
    :param line_pos: line position where string is present
    :param max_error: maximum allowable error in correctness of line_pos
    :return: list of Rect where string is present
    """

    if len(string) == 0 or string.isspace(): 
      logging.warn('Empty string or whitespace is not allowed')
      return None

    page = self.doc[page_no]

    areas = page.searchFor(string, hit_max=50)

    if len(areas) == 0:
      logging.warn('String not Found')
      return None  

    if line_pos == None: 
      return areas[0]
    else:
      areas = list(filter(lambda x: abs(x[1]-line_pos) < max_error, areas))
      if len(areas) == 0: 
        logging.warn('String not Found at given location')
        return None
      return areas

  
  def highlight_imp_points(self, outfile: str, ratio: float = 0.1) -> None:
    """
    Based on Text Rank algorithm, It highlight most important point in Pdf.
    It uses heuristic approach to ensure no heading or subscript will be highlighted

    :param outfile: desired path of highlighted file
    :param ratio:  percent of sentence that will be highlighted
    """

    strings_to_highlight = self.find_strings_to_highlight(ratio)

    logging.info('highlighting %s strings', len(strings_to_highlight))
  
    for string_to_highlight in strings_to_highlight:
      try:
        page_no = string_to_highlight[0]
        line_pos = string_to_highlight[1]
        string = string_to_highlight[2]
        locations = self.search_string(string, page_no, line_pos)
        for location in locations:
          self.doc[page_no].addHighlightAnnot(location)
      except:
        continue 
    self.doc.save(outfile, garbage=4, deflate=True, clean=True)