import React from 'react';
import '../stylesheets/TaskCard.css'
import API from '../adapters/API'

const TaskCard = ({task, handleUpdateToggle}) => {

    const handleCompleteClick = taskId => {
        console.log(`task ${taskId} complete!`)
        task.steps.forEach(step => {
            API.patchStep(step.id, {completed: true})
        });
        handleUpdateToggle()
    }

    return (
        <div className="task-card">
            <h4>{task.title}</h4>
            <p>{task.project.title}</p>
            <p>🕑 this {task.display_time}, {task.cue}</p>
            <button onClick={() => handleCompleteClick(task.id)} className="completed-button">✅</button>
        </div>
    );
}

export default TaskCard;
