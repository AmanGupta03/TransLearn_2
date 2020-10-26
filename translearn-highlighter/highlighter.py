"""
Consist methods to highlight corpus of documents
"""

import os
import logging
from typing import List, Dict

from translearn.docutils.ops import Pdf

FILE_UPLOAD_PATH = './files/upload'
HIGHLIGHTED_FILE_PATH = './files/highlighted'


def highlight_doc(file, id: str, ratio: float = 0.1) -> Dict:
  """
  highlight file and save it to suitable location 
  """
  
  try:
    if file.filename.endswith('.pdf'):
      infile = os.path.join(FILE_UPLOAD_PATH, id+file.filename)
      outfile = os.path.join(HIGHLIGHTED_FILE_PATH, id+file.filename)

      with open(infile, "wb") as fp:
        fp.write(file.file.read())

      Pdf(infile).highlight_imp_points(outfile, ratio)

      return {'status': 'success', 'highlighted_doc': outfile[1:]}
    else:
      return {'status': 'fail', 'message': 'unsupported file type'}
  except Exception as e:
    logging.error(e)
    return {'status': 'fail', 'message': 'something went wrong, possible reason file is too short to highlight'}


def highlight_all_docs(files, id: str, ratio: float = 0.1) -> List[dict]:
  """
  :param id: unique id assign to each request, it will be added in file name to make it unique 
  :return: List of path of highlighted doc
  """

  highlighted_docs = []

  for file in files:
    highlighted_docs.append(highlight_doc(file, id, ratio))

  return highlighted_docs