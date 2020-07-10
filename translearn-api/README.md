## Introduction
- A single Rest API to provide all microservices of **TransLearn**. 

## Installation
* Create **.env** file at home directory of api, and define suitable values of environment variables mentioned in **.sample-env**
* Install dependencies by running command `npm i` -:
* Start server by `nodemon server.js` 
  - If everything has been setup correctly, and in **.env** you have set 
    ```
    HOST = '0.0.0.0'
    PORT = '5000'  
    then will see the following message on your terminal
    ```
    Running at http://0.0.0.0:5000/
    Connected to MongoDB
    ```

## API Usage Examples
* **SignUp**
	- Post API
	- **http://0.0.0.0:5000/signup**
```
{
 "code":"a=$a  \n a; \n",
 "lang":"python",
 "vars":{"$a":2,"$b":3}
 }
 ```


* **Login**
	- Post API
	- **http://0.0.0.0:0/login**
 ```
 {
    	"id":"5",
    	"varObj":["$a"],
    	"code":"<?php \n$value=$a; \n $a;?>",
    	"lang":"php"
	
 }
 ```
	

* **Profile**
	- Get API
	- **http://0.0.0.0/5000/user/profile?secret_token=<secret_token>**
```
{
    "id":"5",
    "vars":{"$a":2}	
}
```
