import { useState, useEffect } from 'react'

// Name of Custom Hooks have to start with 'use...'

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) =>
        forwards ? prevCounter + 1 : prevCounter - 1,
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [forwards])

  return counter
}

export { useCounter }
