import React, { useState } from "react"
// import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
import API from "../adapters/API"
import StallingComponent from "./StallingComponent"
import UpdateUserObject from "../helpers/UpdateUserObject"
import Sorting from "../helpers/Sorting"
import { Icon } from "semantic-ui-react"

const SelectedTask = ({ hot, task, setCurrentUser, currentUser, history }) => {

  const [completeSteps, setCompleteSteps] = useState(task.complete_steps);
  const [incompleteSteps, setIncompleteSteps] = useState(task.incomplete_steps);

  const handleCompleteStepClick = index => {
    let newCompleteSteps = [...task.complete_steps]
    let newIncompleteSteps = [...task.incomplete_steps]
    newCompleteSteps = [...newCompleteSteps, ...newIncompleteSteps.splice(index, 1)]
    console.log(newCompleteSteps)
    console.log(newIncompleteSteps)
    API.patchTask(task.id, {complete_steps: JSON.stringify(newCompleteSteps), incomplete_steps: JSON.stringify(newIncompleteSteps)})
    .then(task => {
      console.log(task)
      setCurrentUser({...currentUser, tasks: UpdateUserObject.patchedTask(task, currentUser)})
    })
  }

  const handleEditClick = () => {
    history.push(`/tasks/${task.id}/edit`)
  }

  return (
    <div>
      {" "}
      {task ? (
        <div>
          <h1>{task.title}</h1>
          {task.tags.length > 0 && (
            <p>
              <Icon name="tags" />
              {task.tags}
            </p>
          )}
          <p>
            <Icon color="red" name="exclamation" />
            {Sorting.displayDateTime(task)} - {task.cue}
          </p>
          {task.incomplete_steps
            .map((step, index) => (
              <p key={`step-${index}`}>
                <Icon name="hand point right outline" /> {step}{" "}
                  <Icon name="check" color='green' onClick={() => handleCompleteStepClick(index)}/>
              </p>
            ))}
          <button onClick={() => handleEditClick()}>Edit task</button>
          <button onClick={() => history.push(`/tasks`)}>To all tasks</button>
        </div>
      ) : (hot ? (
        "You have no outstanding tasks - well done!"
      ) : (
        <StallingComponent />
      ))}
    </div>
  )
}

export default SelectedTask
