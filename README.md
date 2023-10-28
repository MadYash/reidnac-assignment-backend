# reidnac-assignment-backend

## This project is created by node.js in express framework
### To run the project you must have Node.js installed in your system 
Try running by cloning this repo in your local system and then run the command npm i before that don't forget to switch to master branch.
After that connect your database in your local mongo db and then create a user by postman by registering it through the API's in router folder 
api would be 
### http://localhost:8000/register
data could be find through userSchema else it is 
{
  "name": "Yash Sharma",
  "email": "test14@email.com",
  "phone": "9876543210",
  "password": "1234",
  "cpassword": "1234",
  "role":"admin"
}
After that hit the login API which would be 
### http://localhost:8000/login
and payload will be 
{
  "email":"test14@email.com",
  "password":"1234"
}

After that you can check through frontend. It would be working fine.

### Thanks for your time 😀
