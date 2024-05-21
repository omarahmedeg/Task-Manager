import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://task-manager-api-f67n.onrender.com/api/tasks/" + task._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MEDICATION", payload: json });
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  function parseLong(inputString) {
    let words = inputString.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 30) {
        words[i] = words[i].slice(0, 40);
      }
    }
    return words.join(" ");
  }
  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p className="long-word">
        <strong>Description:</strong> {parseLong(task.description)}
      </p>
      <p>
        <strong>Deadline:</strong> {formatDate(task.deadline)}
      </p>
      <p>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default TaskDetails;
