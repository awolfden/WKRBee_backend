Welcome to WorkerBee, the employee management application. 


*Instructions to run app*

To run the front-end React app, please clone the repo, npm install, and enter npm start. 
The front-end is set up to run on localhost:3000. This is the address that the backend app is set up to connect to. 

To run the backend Node.js app, please clone the repo, npm install (and nodemon if not globally installed on your computer), and then navigate to the root and run nodemon server.js. 

React App Repo: https://github.com/awolfden/WKRBee
Node.js Back End Repo: https://github.com/awolfden/WKRBee_backend



*User Flow*

Page loads to the login screen. Users must create an account or log in to access the rest of the application. The user is notified if a user name is already taken or if they enterred incorrect information to login. 

On successful login the app navigates to the index screen which is where all the app components live. The create, show, edit, and delete fuctions all live on this page and the navigation is done with modals. 

The user will only see their employees on this page, not all employees on the database. Initially when a new user is created, the page will load with one pre-populated employee named "Add Anne Employee". When a user creates their first employee, Add Anne Employee is replaced with their created employees and will no longer show on the application. 

The state for the employees is stored globally using Redux as requested in the prompt, however I did use local state for the form submissions as it seemed to be less cumbersome. The api functions (get/create/edit/delete) are stored in the components where they are called and then state is changed globally through dispatch/action. 


Thank you for reviewing my app, I look forward to discussing it with you!

Adam Wolfman
