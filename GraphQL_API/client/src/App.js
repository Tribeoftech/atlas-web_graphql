/**
 * The App component renders the main UI of the application.
 *
 * It provides the Apollo client via the ApolloProvider component to make it
 * available to all child components.
 *
 * It renders the main app layout with the TaskList, AddTask, and AddProject
 * components.
 */
import ApolloClient from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo";

// components
import AddProject from "./components/AddProject";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <div id="bg"></div>
        <h1>Holberton School Tasks</h1>
        <TaskList />
        <AddProject />
        <AddTask />
      </div>
    </ApolloProvider>
  );
}

export default App;
