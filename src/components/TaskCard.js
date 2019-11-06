import React from 'react';
import { useHistory, Link } from 'react-router-dom'
import '../stylesheets/TaskCard.css'
import API from '../adapters/API'
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from '../helpers/Sorting'

const TaskCard = ({task, setCurrentUser, currentUser}) => {

    const history = useHistory()

    const handleCompleteTaskClick = task => {
        task.steps.forEach(step => {
            API.patchStep(step.id, {completed: true})
            .then(responseStep => {
                setCurrentUser({
                  ...currentUser,
                  projects: UpdateUserObject.patchedStep(responseStep, currentUser)
                })
              })
        });
    }

    return (
        <div>
            <div className="task-details">
                <h4>{task.title}</h4>
                <p>{task.project.title !== "" && <span>📌 <Link to={`/projects/${task.project.id}`}>{task.project.title}</Link> </span>}</p>
                <p>🕑 {Sorting.displayDateTime(task)} - {task.cue}</p>
            </div>
            <div className="task-actions">
                <button onClick={() => history.push(`tasks/${task.id}`)} className="details-button">👁️</button>
                <button onClick={() => handleCompleteTaskClick(task)} className="completed-button">✅</button>
            </div>
        </div>
);
}

export default TaskCard;
