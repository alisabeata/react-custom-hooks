import Section from '../Utiles/Section'
import TaskItem from './TaskItem'
import classes from './Tasks.module.css'

const Tasks = (props) => {
  let taskList = <h2>No tasks found</h2>

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </ul>
    )
  }

  let content = taskList

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>
  }

  if (props.loading) {
    content = 'Loading...'
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  )
}

export default Tasks
