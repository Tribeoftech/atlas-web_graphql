/**
 * AddProject component allows user to add a new project by submitting a form.
 * It uses the addProjectMutation to send the new project data to the server.
 * It also refetches the projects list after adding a new one.
 *
 * The component manages form input state in inputsProject.
 * It renders a form with title, weight, description inputs that update state.
 * On submit, it calls addProjectMutation and refetches projects list.
 */
import React, { useState } from "react";
import { graphql } from "react-apollo";
import { addProjectMutation, getProjectsQuery } from "../queries/queries";

function AddProject(props) {
  const [inputsProject, setInputsProject] = useState({
    title: "",
    weight: 1,
    description: "",
  });

  const handleChange = (e) => {
    const newInputsProject = {
      ...inputsProject,
    };
    if (e.target.name === "weight")
      newInputsProject[e.target.name] = parseInt(e.target.value);
    else newInputsProject[e.target.name] = e.target.value;
    setInputsProject(newInputsProject);
  };

  const submitForm1 = (e) => {
    e.preventDefault();
    props.addProjectMutation({
      variables: {
        title: inputsProject.title,
        weight: inputsProject.weight,
        description: inputsProject.description,
      },
      refetchQueries: [{ query: getProjectsQuery }],
    });
  };

  return (
    <form className="project" id="add-project" onSubmit={submitForm1}>
      <div className="field">
        <label>Project title:</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputsProject.title}
        />
      </div>
      <div className="field">
        <label>Weight:</label>
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={inputsProject.weight}
        />
      </div>
      <div className="field">
        <label>description:</label>
        <textarea
          name="description"
          onChange={handleChange}
          value={inputsProject.description}
        />
      </div>
      <button> + </button>
    </form>
  );
}

export default graphql(addProjectMutation, { name: "addProjectMutation" })(
  AddProject
);
