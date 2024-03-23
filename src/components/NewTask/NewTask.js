import Section from '../Utiles/Section'
import TaskForm from './TaskForm'
import { useHttp } from '../../hooks/useHttp'

const NewTask = (props) => {
  const { loading, error, sendRequest: sendTaskRequest } = useHttp()

  const createTask = (taskText, data) => {
    const generatedId = data.name // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText }

    props.onAddTask(createdTask)
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-http-9b5c3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText },
      },
      // bind allows preconfiguration of the parametrs
      // here this = null, we're passing the first paramets taskText
      // the second will be added while execution
      createTask.bind(null, taskText),
    )
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={loading} />
      {error && <p>{error}</p>}
    </Section>
  )
}

export default NewTask
