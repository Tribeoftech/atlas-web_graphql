/**
 * GraphQL queries and mutations for retrieving and modifying project and task data.
 *
 * getProjectsQuery - Fetch all projects.
 * getTasksQuery - Fetch all tasks.
 * addTaskMutation - Add a new task.
 * addProjectMutation - Add a new project.
 * getTaskDetailQuery - Get details of a task by ID.
 */
import { gql } from "apollo-boost";

export const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`;

export const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

export const addTaskMutation = gql`
  mutation (
    $title: String!
    $weight: Int!
    $description: String!
    $projectId: ID!
  ) {
    addTask(
      title: $title
      weight: $weight
      description: $description
      projectId: $projectId
    ) {
      title
      id
    }
  }
`;

export const addProjectMutation = gql`
  mutation ($title: String!, $weight: Int!, $description: String!) {
    addProject(title: $title, weight: $weight, description: $description) {
      title
      id
    }
  }
`;

export const getTaskDetailQuery = gql`
  query ($id: ID) {
    task(id: $id) {
      id
      title
      weight
      description
      project {
        id
        title
        weight
        description
        tasks {
          id
          title
          weight
        }
      }
    }
  }
`;
