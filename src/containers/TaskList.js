import React from 'react';
import TaskCard from '../components/TaskCard';

const TaskList = ({tasks}) => {

    return (
        <div>
            {tasks.map(task => {
                return <TaskCard key={task.id} task={task}/> 
            })}
        </div>
    );
}

export default TaskList;