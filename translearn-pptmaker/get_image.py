
import requests # to get image from the web
import shutil # to save it locally
from googletrans import Translator
## Set up the image URL and filename
def get_image(image_url):
		#image_url = "https://raw.githubusercontent.com/AmanGupta03/Assets/master/x1.png"
		filename = image_url.split("/")[-1]

		# Open the url image, set stream to True, this will return the stream content.
		r = requests.get(image_url, stream = True)
		print(r.status_code)
		# Check if the image was retrieved successfully
		if r.status_code == 200:
		    # Set decode_content value to True, otherwise the downloaded image file's size will be zero.
		    r.raw.decode_content = True
		    
		    # Open a local file with wb ( write binary ) permission.
		    with open(filename,'wb') as f:
		        shutil.copyfileobj(r.raw, f)
		        
		    print('Image sucessfully Downloaded: ',filename)
		else:
		    print('Image Couldn\'t be retreived')
		return filename



def translator(text,lang):
  translator=Translator()
  dt1=translator.detect(text).lang
  translated_text=translator.translate(text,src=dt1,dest=lang).text
  return {"status":"success","translated_text":translated_text}
  