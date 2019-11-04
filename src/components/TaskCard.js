import React from 'react';
import { useHistory } from 'react-router-dom'
import '../stylesheets/TaskCard.css'
import API from '../adapters/API'

const TaskCard = ({task, handleUpdateToggle}) => {

    const history = useHistory()

    const handleCompleteTaskClick = taskId => {
        console.log(`task ${taskId} complete!`)
        task.steps.forEach(step => {
            API.patchStep(step.id, {completed: true})
        });
        handleUpdateToggle()
    }

    return (
        <div className="task-card">
            <div className="task-details">
                <h4>{task.title}</h4>
                <p>{task.project.title !== "" && `📌 ${task.project.title}`}</p>
                <p>🕑 this {task.display_time}, {task.cue}</p>
            </div>
            <div className="task-actions">
                <button onClick={() => history.push(`tasks/${task.id}`)} className="details-button">👁️</button>
                <button onClick={() => handleCompleteTaskClick(task.id)} className="completed-button">✅</button>
            </div>
        </div>
    );
}

export default TaskCard;
