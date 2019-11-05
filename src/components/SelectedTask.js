import React from "react"
// import { useHistory } from 'react-router-dom'
import { useParams, Link } from 'react-router-dom'
import API from '../adapters/API'
import StallingComponent from './StallingComponent'
import UpdateUserObject from '../helpers/UpdateUserObject'

const SelectedTask = ({tasks, setCurrentUser, currentUser, history }) => {

    const handleCompleteStepClick = stepId => {
        console.log(`step ${stepId} complete!`)
        API.patchStep(stepId, {completed: true})
        .then(step => setCurrentUser({...currentUser, projects: UpdateUserObject.patchedStep(step, currentUser)}))
    }

    const handleEditClick = () => {
        history.push(`/tasks/${task.id}/edit`)
    }

    let {id} = useParams()

    const task = tasks.find(task => task.id === parseInt(id))

  return (
      
    <div>{task ? (
      <div>
          <h1>{task.title}</h1>
          {task.project.title !== "" && (<p>
          📌 <Link to={`/projects/${task.project.id}`}>{task.project.title}</Link>
          </p>)}
          <p>
            ❗this {task.display_time}, {task.cue}
          </p>
          {task.steps.filter(step => !step.completed).map(step => (
            <p key={`step-${step.id}`}>
              👉 {step.act}{" "}
              <button
                onClick={() => handleCompleteStepClick(step.id)}
                className="completed-button"
              >
                ✅
              </button>
            </p>
          ))}
          <button onClick={() => handleEditClick()}>Edit task</button>
          <button onClick={() => history.push(`/tasks`)}>All tasks</button>
      </div>) : 
      <StallingComponent/>}
    </div>
  )
}

export default SelectedTask
