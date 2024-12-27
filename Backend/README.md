# Instructions:
## Database:
Execute the sql file in `SQL/` to generate the database and procedures to try the program.
## Run backend:
To download the required dependencies execute the following comand in your terminal:
```bash
npm i
```
To execute the program run the following comand in your terminal:
```bash
npm run dev
```
## Try with postman:
>[!Important]
>Backend is running in http://localhost:3000.

To try the program you can import this collection in postman:
[PostMan Collection](D360.postman_collection.json)

### Authentication:
Some endpoints require authentication, to get the token you need to make a POST request to `http://localhost:3000/login` with the following body:
```json
{
    "email": "operator@mail.com",
    "password": "123456"
}
```
This will return a token that you need to use in the headers of the requests that require authentication.
>[!Important]
>All endpoinst need authentication except for the login endpoint. You can create new users with the admin user for customer endpoints.