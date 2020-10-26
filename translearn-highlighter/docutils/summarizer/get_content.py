import requests
from bs4 import BeautifulSoup
import PyPDF2
import docx

def read_link(url):
   #URL = 'https://www.tutorialspoint.com/operating_system/os_overview.htm'
   page = requests.get(url)
   content=""
   soup = BeautifulSoup(page.content, 'html.parser')
   p = soup.find_all('p')
   for text in p:
     content+=text.get_text()+"\n"
   return content

def read_PDF(filepath):
      pdfFileObj = open(filepath, 'rb')  
      pdfReader = PyPDF2.PdfFileReader(pdfFileObj)  
      num_pages=pdfReader.numPages
      content=""
      for i in range(num_pages):
      	pageObj = pdfReader.getPage(i)
      	content+=pageObj.extractText()
      	i+=1
      pdfFileObj.close()
      print(content)
      return content

def read_docx(filename):
    doc = docx.Document(filename)
    fullText = []
    for para in doc.paragraphs:
        fullText.append(para.text)
    return '\n'.join(fullText)
#print(read_link("https://expertsystem.com/machine-learning-definition/"))

	

#print(summarize_url("https://fastapi.tiangolo.com/tutorial/request-files/",2))
    
