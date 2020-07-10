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
    ```
    then will see the following message on your terminal
    ```
    Running at http://0.0.0.0:5000/
    Connected to MongoDB
    ```

## API Usage Examples
* **SignUp**
	- Post API
	- **http://0.0.0.0:5000/signup**

Example 
```
curl -d "username=user&email=user@xyz.com&password=password" -X POST http://0.0.0.0:5000/signup
 ```


* **Login**
	- Post API
	- **http://0.0.0.0:0/login**
Example
 ```
curl -d "username=user&password=password" -X POST http://0.0.0.0:5000/login
 ```

* **Profile**
	- Get API
	- **http://0.0.0.0/5000/user/profile?secret_token=<secret_token>**
  - **secret_token** is return by login request
```
curl http://0.0.0.0/5000/user/profile?secret_token=<secret_token>
```
