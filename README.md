# Vap_paypay_project 
The project implements a Course Registration System where we can Subscribe to or add the course ypu want to teach

index.js - the index file
sel.js - login Authentication System, selecting the courses you want to subscribe
course_creation.js - Creating your own course
course.js - gives the details of all the registered courses by the logged in user

course_details.json - stores the information about the course, coursecode, coursename, Professor
course_registered.json - stores the information about who has subscribed to which course
courses.json - stores the coursecode of each of the created course
login_credentials.json - stores the credentials of the users

**Express** is used for the seve
**Pug** is used for the templates of all the pages
**Promises** are used instead of callbacks for reading and writing into the files

# Login-Authentication
**Sessions and cookies** are used to keep the user logged in
**Middleware** is used to Authenticate the username/password entered
Json file is used to store the credentials of the user and autheticate them
If the username/password is wrong, an error message occurs and then are redirected to the login page


# Subscribe to new courses
User can subscribe to the courses created by anybody on the server
The courses registered by the user can be viewed under the AllCourses section

# Create your own courses
Users(Teachers) can also create own courses, which they want to teach

# Home Page
Provides us with all the sections to begin

# Run the server on localhost:8000
start with /home(for home page)
