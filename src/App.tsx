import React from 'react'
import Task from './components/Task'
import TaskList from './components/TaskList'

const App = () => {
  return (
    <div className='flex-col m-4 h-full'>
      <h1 className=' text-4xl font-medium text-white mb-4'>Tasks</h1>
      <TaskList/>
    </div>
  )
}

export default App
