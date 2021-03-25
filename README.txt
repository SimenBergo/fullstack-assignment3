--ASSIGNMENT 3 IDG2100--

Hello Gerardo!

Here i will explain how you can set up my project, and test it. 

When opening the project, open the terminal in your code editor and run:
npm install
This should give you all the dependencies and node modules needed to run this project properly!

For postman, go to your workspace (or create a new one if you want too). 
Then create a new collection and call it campus-tracker-db.
Then press import file right next to new collection (At the top left of the page).

Import the oblig3.postman_collection.json file from the test-files folder of this project.
You will then recieve all the neccesary requests for testing this project.
The three first POST requests requires no secret_token to be submitted
in the params. Here you only need to go to BODY and select raw JSON as the format.
Then type in the neccesary JSON object, this will already be imported as well.

For the rest of the requests you will need to copy the jwt token from the response
after logging in with a student/teacher user. Type in secret_token in the key in params, 
and the recieved token in value. 
The students check users-db GET request requires a student user and the rest of the requests reqires 
a teacher user. 

For Compass, just open the program and press connect without typing anything into the field. 
This is to connect it to localhost:27017, and while the db is empty now, 
one will be made the first time a user is made in signup.

I have added a users.json file in test-files as requested, which you can import into the database in Compass.
I called mine "users-db". 


I have three different routes in my project.
One for anonymous users, they can only access signup, login and forgot password.
Then the students can access these routes plus the viewing of users, as described in the oblig 3 description.
This is done by signing a token on login. 
The teachers can access everything, this is made possible by defining the users role
in the token payload. This decides whether the user can access certain routes. 
If you try to access a teacher route as a student you will only be faced
with a "unauthorized" message. One thing worth mentioning is that 

I have based the code on the one you created in the lecture on March 17th, the second
example.

Hope everything is ok!
