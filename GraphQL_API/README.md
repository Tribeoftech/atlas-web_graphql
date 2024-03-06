GraphQL API
 Novice
 By: Khaoula Derouiche, Software Engineer at Holberton
 Weight: 1
 Manual QA review must be done (request it when you are done with the project)
Background Context
In this project, you will create an application using a query language, designed to make APIs fast, flexible and developer-friendly. In the first part, you will create the back-end part using ExpressJs and set up GraphQl with all the parts (schema, root query and resolve function). In second part, you will connect your back-end to mongoDB and test your queries to GraphQL server using Graphiql. In the last part, you will create the front-end part using ReactJS and the GraphQL Client Apollo.



Resources
Read or watch:

GraphQL
GraphQL: Schemas and Types
GraphQL: Queries and Mutations
Mongoose
Apollo-boost
Apollo Client (React)
Learning Objectives
At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

What GraphQL means
What is Graphiql
How to test queries using Graphiql
What is Apollo
How to connect to mongoDB
How to make queries from React
How to make GraphQL server accept request from another server
Requirements
Allowed editors: vi, vim, emacs, Visual Studio Code
All your files will be interpreted/compiled on Ubuntu 18.04 LTS using node (version 12.x.x)
All your files should end with a new line
A README.md file, at the root of the folder of the project, is mandatory
Your code should use the js extension
Setup
Install NodeJS
(in your home directory):

sudo apt install nodejs 
$ node -v
v12.x.x
$ npm -v
...
Setup Express and GraphQL
In your folder server of GraphQL server:

Add package.json using: npm init
Install Express in the directory and save it in the dependencies list using: npm install express --save
Set up GraphQL using: npm install graphql express-graphql
Setup Apollo
npm i apollo-boost graphql react-apollo --save
Walk of the final graph


Tasks
0. GraphQL Schema
mandatory
The file app.js of the folder server is initializing the Express server with express-graphql which is a middleware, applied here to just a single route, the /graphql route:

 const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();

app.use('/graphql',graphqlHTTP({
}));
app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});
when you run the command: nodemon app

khaoula@khaoula-HP-Laptop-15-dw3xxx:~/Holberton/GraphQL_playlist/server$ nodemon app
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
now listening for request on port 4000
You will obtain in the browser http://localhost:4000/graphql the following error:



From the message you can understand that we must pass an object which contains the schema property.

Create the file schema.js, in which:

require graphql
add GraphQLObjectType object using the object destructuring syntax (const {prop1, prop2, prop3,…, propN} = object and object in our case is graphql)
create a new GraphQLObjectType: TaskType which contains 2 parameters:
name: Task
fields property: object contains a set of properties. In our case, fields will contain:
id of type GraphQLString
title of type GraphQLString
weight of type GraphQLInt
description of type GraphQLString
Note: Don’t forget to import these types using the object destructuring syntax that contains GraphQLObjectType.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/app.js, server/schema/schema.js
0/5 pts
1. Root Query
mandatory
Root field is at the top level of every GraphQL server. It is a type that represents all of the possible entry points into the GraphQL API, it’s often called the Root type or the Query type. The objective of this task is to create a root query to query for a particular task. Create RootQuery: a new GraphQLObjectType in the schema.js file which contains the following parameters:

name: RootQueryType
fields property will contain the field task, which will contain:
type: TaskType
args (any type of arguments can be added): in our case we will for a particular task using the id of type GraphQLString which should be the argument
resolve function where you write code get whichever data needed from the database. In this task, we will create an empty function of prototype: resolve(parent,args)
At the end of the file, make sure you export your GraphQLSchema with your RootQuery and be sure you have imported it using the object destructuring syntax.

In app.js file, require the schema.js file and add schema in an object we pass to the graphqlHTTP() constructor to correct the error related to the schema in the middleware.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/app.js, server/schema/schema.js
0/4 pts
2. Resolve function and test query in graphiql
mandatory
In this task, You will create a dummy data to be used in the resolve function. In the file schema.js, create an array tasks contains these 2 different task objects:

{id: ’1’, title: ’Create your first webpage’, weight: 1, description: ’Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)’}
{id: ’2’, title: ’Structure your webpage’, weight: 1, description: ’Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order’}
Install and require the module: lodash to avoid using Vanilla JavaScript and make the code easier. In the resolve function, use the id from args parameter to find the task of a given id from the tasks array using lodash and return it.

In the file app.js, add the property graphiql: true to the graphqlHTTP constructor to be able to use GraphiQL: a great tool to test GraphQL API obtained in the link http://localhost:4000/graphql. Before adding graphiql: true, you will get the following error:

 After adding the property. when you visit the http://localhost:4000/graphql URL, you will see GraphiQL in action:



When you click Docs in the top right of Graphiql, you will see in Root types: query: RootQueryType.

the following figure shows that:



This panel is going to tell you about the GraphQL server that you are making queries to. In our case, it will give an idea about the properties used in the object Task and show how to make a request for a Task using the id.

In a file graphiql2, Write the query in GraphiQL that will give you the title, the weight and the description of the task of id: “2” and return the following result:



Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/app.js, server/schema/schema.js, server/graphiql2
0/7 pts
3. GraphQL ID type and Project Type
mandatory
In the previous tasks, you used the type string to the id but to be a bit more flexible, you can use a type called GraphQLID. So, the id must be an ID type not necessarily a string and you can write the id without the quotations in your request and it still works.

Change the type of id to GraphQLID and do all the necessary changement to your code.

Create a new GraphQLObjectType: ProjectType which contains 2 parameters:

name: Project
fields property: object contains a set of properties. In our case, fields will contain:
id of type GraphQLID
title of type GraphQLString
weight of type GraphQLInt
description of type GraphQLString
Do the same steps that you did with the type TaskType in the RootQueryType with the new field project of type ProjectType. In the resolve function, use the id to find a project.

To test your queries in GraphiQL, create an array projects contains these 2 different project objects:

{id: ’1’, title: ’Advanced HTML’, weight: 1, description: ’Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!’}
{id: ’2’, title: ’Bootstrap’, weight: 1, description: ’Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.’}
Note: In the RootQueryType of Documentation Explorer, the field project(id: ID): Project will be added.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/schema/schema.js
0/6 pts
4. Type relations
mandatory
From the final graph in the description, you can conclude that there is a relation between Project and task. So, each task will be related to a project and each project can contain 0 to multiple tasks.

Add to the 2 objects of array tasks the property projectId with the value ’1’ to the both.

Add the object project to the fields of TaskType:

Specify the type to TaskType
Add the resolve function which will find from projects the one who has an id property equal to projectId in the parent object.
To test that in GraphiQL, in a file graphiql4_1, write the query that will give you the title, the weight, the description of the task of id: “2” and the title of the project.

Add the object tasks to the field of ProjectType:

Specify the type to a list of type TaskType (you should use GraphQLList)
Add the resolve function which will filter from tasks array the tasks with the criteria projectId equal to id in the parent object in the resolve function.
To test that in GraphiQL, in a file graphiql4_2, write the query that will give you the title, the weight, the description of the project of id: “1” and the title of their tasks.

Important remark: You have to wrap the fields property inside a function. Why?

If you use the fields property just as an object and your write in your code TaskType before ProjectType then you test the query of the file graphiql4_2, you will get an error (TypeError: Failed to fetch) and in the terminal, you will get the error TaskType is not defined. You will get this error because code is running from top to bottom and changing the orders is not going to solve the problem. Nevertheless when we wrap the fields inside a function, the code still running from top to bottom but the function will not be executed until the whole file finishes running. So, when you execute the code inside the function, it knows what TaskType is because it has already been run previously and vice versa.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/schema/schema.js, server/graphiql4_1, server/graphiql4_2
0/5 pts
5. More on root queries: projects and tasks
mandatory
In this task, you will be able to write in GraphiQL the query that will result all the projects and all the tasks.

In the fields of the RootQueryType, create two new fields tasks and projects of types GraphQLList of TaskType and PojectType respectively. In the resolve functions of each field, return all the tasks and all the projects.

To test that in GraphiQL, in a file graphiql5, write the query that will give you the id, the title, the weight, the description of all the projects and the title and the description of their tasks. The result of your query will be like in the following figure:



You can also test the output of the query that will give all the tasks.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/schema/schema.js, server/graphiql5
0/3 pts
6. Connecting to mongoDB Atlas and create mongoose models
mandatory
You will add in this task a database instead of using examples.

Open this link: www.mongodb.com and create an account. Add a new database user, well save the username and the password then create a new database.

To use mongoDB in your application:

install a new package mongoose by using the following command: npm install mongoose –save.

In the file app.js:

Require mongoose in the const mongoose
Connect to mongoDB Atlas database using the string generated in the cluster in MongoDB Atlas.
Add this code:
  mongoose.connection.once(’open’, () =>
  console.log(’connected to database’);
  );
⇒ an event listener returns a the message “connected to database” to the console once the connection is open.

Before start putting data in the database, You need to create a model and schema for each data type to be stored inside the database.

Create a new folder models. Inside the folder create two files task.js and project.js.

In the file task.js:

Require mongoose
Create a constant Schema contains mongoose.Schema
Create a schema for the task: taskSchema, then add the properties in the example tasks in the file schema.js with the adequate type (String, Number …) except the id because MongoDB is automatically going to create a new ID.
Make sure you export the model, you define the model which will be the collection in MongoDB “Task” and base it to the particular schema “taskSchema”
In the file project.js: Do the same steps you did with the previous file. Just modify the properties, the name of schema to “projectSchema” and the collection name to “Project”.

Note: mongoose schema: you are going to create for your data that is being stored in a database. The schema used previously in the code for graphQL is defining the graph and the object types on that graph.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/app.js, server/models/task.js, server/models/project.js
0/6 pts
7. Mutation
mandatory
In this task, we will get an idea about mutations by using them to add project and task.

In the file schema.js, create a new GraphQLObjectType Mutation with the name Mutation then create a field called addProject. So when you use addProject mutation, you will be able to add a project to the database.

addProject property is going to be an object of the fields of const Mutation where their properties are:

type: ProjectType
args When a user makes a mutation query from the front-end then he is expected to send some kind of data or arguments. Here to add a project your are expected to pass the title, the weight and the description throught to the graphQL server. Add these arguments and precise to each one the propertie type.
resolve function where you should create new Project which will be imported from the models of the previous task and precise title, weight and description. Then, save the instance of the Project data type to the database (here you can understand the importance of mongoose) and return the results.
Export the mutation after the query at the bottom of the file.

To prevent users from making mutation without passing through any required fields, you should use the GraphQLNonNull type. Add new GraphQLNonNull to all the arguments of the mutation.

Remark: When you make a mutation, the ID will randomly generated that is why you wouldn’t add it in the arguments.

To test your code you should try some examples in graphiql. In a file graphiql7_1, write the query that will give you the following output:



Do the same steps with the field addTask to add new task. and write in the file graphiql7_2 the query which will give you the following output (the projectId should be one ID from the project(s) created previously)



You should always check the updates of data in mongodb.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/schema/schema.js, server/graphiql7_1, server/graphiql7_2
0/8 pts
8. Updating the resolve functions
mandatory
In this task, instead of selecting data from the examples previously created in the task 2 and 3, you should find the data directly from the database.

In the file schema.js, delete the 2 arrays of data: tasks and projects. In the resolve functions, delete any line of code using these two arrays and replace them by the code doing the same goal but by using the models: Project and Task.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: server/schema/schema.js
0/5 pts
9. Add the front-end part and setup Apollo Client
mandatory
Once the objective of this project in not to learn ReactJs, you will get the access to the project client.zip with the different components.

In the folder client, run your react project by using the following commands:

npm install
npm start
To consume the APIs in the front-end part, you will use GraphQL Client Apollo: you can think about it as the thing that is in charge with the passage of data between the front-end and the server.

Install apollo-boost, graphql and react-apollo in your project using the command in the description.

apollo-boost is a package contains several different packages including Apollo-client.

graphql is the js implementation of GraphQL

react-apollo is the layer to bind apollo with react.

In the file App.js:

Import ApolloClient from apollo -boost
setup an apollo client (uri:’http://localhost:4000/graphql’). Once you create your client, hook it up to your app by passing it to the ApolloProvider imported from react-apollo (before the first div tag).
Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: client/src/App.js
0/4 pts
10. Making queries from React
mandatory
In this task, you will make a queries from the different components of React application.

To make a query from TaskList component, in the file client/src/components/TaskList.js:

Import gql from apollo-boost in order to construct the query because GraphQL query language in not Javascript. So, when we construct it you need the help of another package to help pass it all.
Create a query and store it in a constant getTasksQuery that will give the id and the title of all the tasks (the syntax of the query is the same syntax of the queries tested in graphiql).
Bind the query to the component to be able to access the data that comes from the query by importing graphql from the package react-apollo and modify the export to be like the following prototype:
export default graphql(the query name)(the component name);

Before moving to the other queries. When you add console.log(props); before the return, it is not going to work and you will get some errors in the console. These errors are related to the non ability to fetch the data from the server and the reason is because of access control allow origin. By default, GraphQL sever is not accepting requests from an other server (here front-end and back-end are coming from different servers).

To solve this problem:

In Express GraphQL server, install the package CORS: npm install cors -save .

In the file server/app.js:

Require cors in a constant cors
Add the line of code app.use(cors());
When you refresh your browser, you can see two objects in the console:

the first one with loading: true and there is no data.
the second one with loading: false and you can check the data returned by the query in the component.
Once your objective here is to create the query. You should only add to the the file client/src/components/TaskList.js this function:

function displayTasks() {
    console.log(props.data);
    var data = props.data;

    if (data.loading) {
      return ( < div > Loading tasks... < /div>);
      }
      else {
        return data.tasks.map(task => {
            return ( < li key = {
                task.id
              }
              onClick = {
                (e) => {
                  setState({
                    selected: task.id
                  });
                }
              } > {
                task.title
              } < /li>);
            })
        }
     }
In the empty braces inside the ul tag, call the previous function.

In the file client/src/components/AddTask.js, Create a query and store it in a constant getProjectsQuery that will give the id and the title of all the projects and from the previous part, redo finish the other steps. Then to add all the projects to the options of the Project field, call after the option inside the select tag the function displayProjects():

function displayProjects() {
    //  console.log(props);
    var data = props.data;
    if (data.loading) {
      return ( < option > Loading projects... < /option>);
      }
      else {
        return data.projects.map(project => {
            return ( < option key = {
                project.id
              }
              value = {
                project.id
              } > {
                project.title
              } < /option>);
            })
        }
      }
Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: client/src/components/TaskList.js, client/src/components/AddTask.js, server/app.js
0/6 pts
11. External query file
mandatory
To avoid getting messy by defining the queries inside the component files especially when there is multiple queries in different components, you should externalize the queries into a separate file.

Go into src, create the file queries.js inside the new folder queries.

In the file client/src/queries/queries.js:

Import gql
Paste all the queries created in the components
Export the queries
In the files of the components:

Delete the queries
Detete the line of code to import gql
import the adequate query from the new file.
Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: client/src/queries/queries.js, client/src/components/TaskList.js, client/src/components/AddTask.js
0/5 pts
12. Query variables and composing queries
mandatory
In the file client/src/queries/queries.js, Create a query and store it in a constant addTaskMutation that will add a project using the mutation with three parameters: title, weight and description and will return the title and the id back. In the mutation add query variables (example: $variable: String! or Int! or ID!) and affect to each parameter the adequate variable. Don’t forget to export the new queries.

Remark: The mutation query to add a project should be written like the query tested in graphiql. Only you must add the variables.

In the file client/src/components/AddTask.js, import the mutation to be used when you submit the form. But now there are 2 different queries inside the component . So, at the bottom, you must bind both of these different queries to the component.

Use compose method to bind the queries. To do that:

Import flowRight as compose from the package lodash
Use the word compose to bind the queries and give to each query a name property which will be the name of the query.
When you check your browser, you will get an error related to the function displayProjects and when you check the props in the console, you will observe some modifications. Modify your variable data in the function to solve the problem and recheck the select field.

In the form tag, affect the function submitForm to onSubmit. Complete the function by using addTaskMutation and specify the variables. Then add refetchQueries array contains the query to get all the tasks in order to be sure that the task added will not need a refresh to be added to the list of tasks.

const submitForm = (e) => {
        e.preventDefault();
        props./*......( { 
                  variables: {......
                    .....Add your 
                    ..... code 
                    },
                    ......
            });
                */
      }
Write the mutation query addProjectMutation to add a project. From the steps of the previous part complete the file client/src/components/AddProject.js and affect to onSubmit the function submitForm1 contains the refetchQueries array.

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: client/src/queries/queries.js, client/src/components/AddTask.js, client/src/components/AddProject.js
0/8 pts
13. Tasks details query
mandatory
In the file client/src/queries/queries.js, create a query getTaskDetailQuery which will return the id, the title, the weight, the description and the project (id, title, weight, description and tasks: id, title, weight) of a task with the parameter id. Export the new query.

The objective of this task is to write the query. So, just copy and paste the following code in the file client/src/components/TaskDetails.js

import {
  graphql
} from 'react-apollo';
import {
  getTaskDetailQuery
} from '../queries/queries';

function TaskDetails(props) {
  console.log(props);

  function displayTaskDetails() {
    const {
      task
    } = props.data;
    if (task) {
      return ( <div>
        <h2> Title of task: {
          task.title
        } </h2> 
        <p> Weight of the task: {
          task.weight
        } </p> 
        <p> Title of the project: {
          task.project.title
        } </p> 
        <p> All tasks of the project: </p> 
        <ul className = "other-tasks" > {
          task.project.tasks.map(item => {
            return <li key = {
              item.id
            } > {
              item.title
            } < /li>
          })
        } </ul> 
        </div>
      )
    } else {
      return ( 
        <div> No task selected... </div>
      )
    }
  }
  return ( <
    div id = "task-details" > {
      displayTaskDetails()
    } < /
    div >
  );
}


export default graphql(getTaskDetailQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.taskId
      }
    }
  }
})(TaskDetails);
In the file client/src/components/TaskList.js, in the component TaskDetails add taskId = {state.selected}

Repo:

GitHub repository: atlas-web_graphql
Directory: GraphQL_API
File: client/src/queries/queries.js, client/src/components/TaskList.js, client/src/components/TaskDetails.js
