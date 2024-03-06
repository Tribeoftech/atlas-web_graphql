/**
 * AddTask component fetches projects via the getProjectsQuery and displays them
 * in a select dropdown. Allows user to select a project when adding a new task.
 */
import { gql } from "apollo-boost";
import React from "react";
import { graphql } from "react-apollo";

const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;

function AddTask(props) {
  function displayProjects() {
    const { loading, projects } = props.data;

    if (loading) {
      return <option>Loading projects...</option>;
    } else {
      return projects.map((project) => (
        <option key={project.id} value={project.id}>
          {project.title}
        </option>
      ));
    }
  }

  return (
    <select>
      <option>Select Project</option>
      {displayProjects()}
    </select>
  );
}

export default graphql(getProjectsQuery)(AddTask);
