import { gql } from 'apollo-boost';


const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`

const getTasksQuery = gql`
  {
    tasks {
      id
      title
      weight
      description
      projectId
    }
  }
`

const getTaskQuery = gql`
  query($id: ID) {
    task(id:$id) {
      id
      title
      weight
      description
      project{
        id
        title
        weight
        description
        tasks{
          title
          id
          weight
        }
      }
    }
  }
`

export { getProjectsQuery, getTaskQuery, getTasksQuery };
