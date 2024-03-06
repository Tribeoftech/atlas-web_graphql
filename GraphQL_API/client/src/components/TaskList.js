/**
 * TaskList component fetches and displays a list of tasks.
 * Uses Apollo Client and GraphQL to retrieve tasks from backend.
 * Allows selecting a task by ID to perform actions on specific tasks.
 */
import gql from "apollo-boost";
import React, { useState } from "react";
import { graphql } from "react-apollo";

const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

function TaskList(props) {
  console.log(props);
  const [setSelected] = useState(null);

  function displayTasks() {
    const data = props.data;

    if (data.loading) {
      return <div>Loading tasks...</div>;
    } else {
      return data.tasks.map((task) => (
        <li key={task.id} onClick={() => setSelected(task.id)}>
          {task.title}
        </li>
      ));
    }
  }

  return (
    <div>
      <ul id="task-list">{displayTasks()}</ul>
    </div>
  );
}

export default graphql(getTasksQuery)(TaskList);
