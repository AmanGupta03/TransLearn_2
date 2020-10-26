from translearn.docutils.ppt import  ppt_summarizer
import wikipediaapi
import json
import sys

#import pptwriter

def data_for_ppt(content, slide_per_head=1):
    data = []
    for head in content.sections:
        sec_info = {}
        head_content = []
        sec_info['heading'] = head.title
        point = {}
        point['title'] = ''
        point['desc'] = head.text
        head_content.append(point)
        for sub_head in head.sections:
            point = {}
            point['title'] = sub_head.title
            point['desc'] = sub_head.text
            head_content.append(point)
        sec_info['content'] = ppt_summarizer.bullets(head_content, slide_per_head)
        data.append(sec_info)
    return data

def extract(topic):
    data = {}
    print('Fetching Content...')
    wiki = wikipediaapi.Wikipedia(language='en', extract_format=wikipediaapi.ExtractFormat.WIKI)
    #Exception Handling Pending..
    content = wiki.page(topic)
    print('Modifying data...')
    data['topic'] = topic
    data['no_of_head'] = len(content.sections)
    data['introduction'] = ppt_summarizer.extract_intro(content.text)
    data['sections'] = data_for_ppt(content)
    print("all is well")
    #pptwriter.generate_ppt(data)
    return(data)

#print(extract("Operating System"))