/**
 * TaskDetails component fetches details for a task via GraphQL query.
 * It takes a taskId prop to specify which task to fetch.
 * Renders task details if found, or a default message if no task.
 */
import { graphql } from "react-apollo";
import { getTaskDetailQuery } from "../queries/queries";

function TaskDetails(props) {
  console.log(props);

  function displayTaskDetails() {
    const { task } = props.data;
    if (task) {
      return (
        <div>
          <h2> Title of task: {task.title} </h2>
          <p> Weight of the task: {task.weight} </p>
          <p> Title of the project: {task.project.title} </p>
          <p> All tasks of the project: </p>
          <ul className="other-tasks">
            {" "}
            {task.project.tasks.map((item) => {
              return <li key={item.id}> {item.title} </li>;
            })}{" "}
          </ul>
        </div>
      );
    } else {
      return <div> No task selected... </div>;
    }
  }
  return <div id="task-details"> {displayTaskDetails()}</div>;
}

export default graphql(getTaskDetailQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.taskId,
      },
    };
  },
})(TaskDetails);
