import React, { useEffect, useState } from 'react'
import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'
import { useHttp } from './hooks/useHttp'

// Custom Hooks are stateful reusable components
// can use other build-in or custom hooks

function App() {
  const [tasks, setTasks] = useState([])
  
  const { isLoading, error, sendRequest: fetchTasks } = useHttp()

  useEffect(() => {
    const transformHandler = (data) => {
      const loadedTasks = []

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text })
      }

      setTasks(loadedTasks)
    }
    fetchTasks(
      {
        url: 'https://react-http-9b5c3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      },
      transformHandler,
    )
  }, [fetchTasks])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task))
  }

  return (
    <React.Fragment>
      {/*
        <ForwardCounter />
        <BackwardCounter />
      */}
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  )
}

export default App
