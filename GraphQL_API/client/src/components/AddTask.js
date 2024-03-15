/**
 * AddTask component allows user to add a new task.
 * It uses React hooks like useState to manage form inputs.
 * It uses GraphQL mutations to add the task to backend.
 * It also refetches task list after adding to update UI.
 */
// client/src/components/AddTask.js
import { flowRight as compose } from "lodash";
import React, { useState } from "react";
import { graphql } from "react-apollo";
import {
  addTaskMutation,
  getProjectsQuery,
  getTasksQuery,
} from "../queries/queries";

function AddTask(props) {
  const [inputs, setInputs] = useState({
    title: "",
    weight: 1,
    description: "",
    projectId: "",
  });
  function displayProjects() {
    var data = props.getProjectsQuery;
    if (data) {
      return <option disabled>Loading projects...</option>;
    } else {
      return data.projects.map((project) => {
        return (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        );
      });
    }
  }

  const handleChange = (e) => {
    const newInputs = {
      ...inputs,
    };
    if (e.target.name === "weight")
      newInputs[e.target.name] = parseInt(e.target.value);
    else newInputs[e.target.name] = e.target.value;
    setInputs(newInputs);
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addTaskMutation({
      variables: {
        title: inputs.title,
        weight: inputs.weight,
        description: inputs.description,
        projectId: inputs.projectId,
      },
      refetchQueries: [{ query: getTasksQuery }],
    });
  };

  return (
    <form className="task" id="add-task" onSubmit={submitForm}>
      <div className="field">
        <label>Task title:</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputs.title}
          required
        />
      </div>
      <div className="field">
        <label>Weight:</label>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={inputs.weight}
          required
        />
      </div>
      <div className="field">
        <label>description:</label>
        <textarea
          name="description"
          onChange={handleChange}
          value={inputs.description}
          required
        />
      </div>
      <div className="field">
        <label>Project:</label>
        <select
          name="projectId"
          onChange={handleChange}
          value={inputs.projectId}
          required
        >
          <option value="" disabled>
            Select project
          </option>
          {displayProjects()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addTaskMutation, { name: "addTaskMutation" })
)(AddTask);
