from extract import *

def exist_fully(topic):
  if topic == 'machine learning' or topic == 'ml': return ml 
  if topic == 'bert' or ('bi' in topic and 'direction' in topic and 'transformer' in topic): return bert
  if topic == 'java': return java


def match(topic, head):
  word = topic.split()
  for w in word:
    if w not in head.lower(): return False
  return True


def exist_partially(topic):
  sections = []
  for sec in bert["sections"]:
    if match(topic.replace("bert", ""), sec["heading"]):
      sections.append(sec)
  
  for sec in ml["sections"]:
    if match(topic.replace("machine learning", ""), sec["heading"]):
      sections.append(sec)
  
  for sec in java["sections"]:
    if match(topic.replace("java", ""), sec["heading"]):
      sections.append(sec)
  if len(sections) == 0: return None

  return {
    "topic": topic.upper(),
    "no_of_head": len(sections),
    "introduction": "",
    "sections": sections
  }


def get_content(topic):
  """
  """

  topic = topic.strip()
  topic = topic.lower()
  topic = topic.replace("  ", " ")
  words = topic.split()
  
  for w in words:
    if w in STOPWORDS:
      topic = topic.replace(w, '')


  data = exist_fully(topic)
  
  if data is not None: 
    return data 

  data = exist_partially(topic)

  return data