/**
 * TaskList component displays a list of tasks and a selected task's details.
 * Fetches tasks via GraphQL query. Allows selecting a task to view details.
 * Uses local component state to track selected task.
 */
import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getTasksQuery } from "../queries/queries";

// components
import TaskDetails from "./TaskDetails";

// function to display the list of tasks
function TaskList(props) {
  const [state, setState] = useState({
    selected: null,
  });

  function displayTasks() {
    var data = props.data;
    if (data.loading) {
      return <div>Loading tasks...</div>;
    } else {
      return data.tasks.map((task) => {
        return (
          <li key={task.id} onClick={(e) => setState({ selected: task.id })}>
            {task.title}
          </li>
        );
      });
    }
  }

  return (
    <div>
      <ul id="task-list">{displayTasks()}</ul>
      <TaskDetails taskId={state.selected} />
    </div>
  );
}

// Bind the getTasksQuery to the TaskList component
export default graphql(getTasksQuery)(TaskList);
