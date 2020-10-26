import re
import requests
from bs4 import BeautifulSoup
from urllib.request import urlretrieve
import os
import textwrap 

def get_image(site):   
		#site = 'https://en.wikipedia.org/wiki/Operating_system'
		response = requests.get(site)
		img_count=1
		img_tags=[]
		img_desc=[]
		if response.status_code==200:
		    soup = BeautifulSoup(response.text,'lxml')
		    img_tags1 = soup.find_all('img', { 'class':'thumbimage'})
		    #img_tags2 = soup.find_all('a')
		    img_desc=["*"+textwrap.TextWrapper(width=60).fill(text=u.get_text()) for u in soup.find_all('div',{'class':'thumbcaption'})]
		    urls = [img['src'] for img in img_tags1]
		    #urls.extend([img['href'] for img in img_tags2])
		    for i in range(len(urls)):
		       urlretrieve("https:"+urls[i],str(img_count)+".jpg")
		       img_count+=1
		return {'img_count':img_count-1,'img_desc':img_desc}  
def remove_image(img_count):
	 #print(img_count)
	 for i in range(1,img_count+1):
	         os.remove(str(i)+".jpg")
	         print(i)
	    	      