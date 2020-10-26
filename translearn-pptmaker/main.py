from typing import List,Dict
from uuid import uuid4

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from temp import prepare_corpus
from pptmaker import get_ppt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/files", StaticFiles(directory="files"), name="files")

@app.post("/ppt")
async def make_ppt(json_data: Dict):
   #content= json_data.get('content')
   return get_ppt(json_data)
