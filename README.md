# Full Stack Developer Challenge

<body>
<h1>TASK MANAGER APPLICATION</h1>
<p>
Simple application for managing tasks. This API is built with NODEjs and uses EXPRESS as the server. Routes are protected using JWT Authentication.
</p>

<h2>Main Technologies used:</h2>
 <p>Express, Nodejs, MongoDB, Mongoose, JWT </p>

Commands to start the server => npm run dev

<h2>Application functionalities:</h2>
<h4>It is necessary to be registered and login as a user to ACCESS, VIEW, CREATE, UPDATE, DELETE or make any operation with a task.</h4>

<h4>All routes testing were done on Postman.</h4>
<p>The postaman collection has been included in this repository for import in the following path:</p>
<h4>/docs/postman/Task Manager API.postman_collection.json</h4>

<div>
<h2> AUTH ROUTES -> PUBLIC:</h2>
<p>Server is running con port 3000. Starting end-point: http://localhost:3000/api/auth</p>
<h3>Registration and Login System</h3>
<p>.post(/register) = New user registration </p>
<p>Process:</p>
<ol>
 <li>The user must enter a valid email and create a password.</li>
 <li>Email verification to check that is not already registered in the Database and that complies with the format</li>
 <li>Password verification (must meet requirements, e.g. minimum 6 characters)</li>
 <li>Password encryption</li>
 <li>Token Key Creation</li>
</ol>
<h3>To be able to log in:</h3>
<p>.post(/login) = Existing User login</p>
<p>Process:</p>
<ol>
 <li>The user must enter the email and password used to register.</li>
 <li>Authentication of his credentials with the Database.</li>
 <li>Generation of a new token key that gives access to all task functionalities.</li>
</ol>

<h2>TASK ROUTES -> PRIVATE:</h2>
<p>Starting end-point: http://localhost:3000/api/tasks</p>
<ul>
 <li>.get(/) = Get a list of tasks for the authenticated user</li>
 <li>.post(/new) = Create a new task</li>
 <li>.put(/:id) = Update a task</li>
 <li>.delete(/:id) = Delete a task</li>
</ul>
</div>

<div>
<h2>API Documentation (Swagger</h2>
<h3>This project includes API documentation generated with Swagger.</h3>

<h4>Swagger Setup</h4>
<p>Swagger is integrated using the swagger-jsdoc and swagger-ui-express packages. The documentation is automatically generated from the comments defined in the route files.</p>

<h4>How to Access</h4>
<p>Once the project is running locally, you can access the Swagger UI at:
http://localhost:3000/docs</p>
</div>
