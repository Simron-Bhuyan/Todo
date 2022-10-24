import Head from 'next/head'
import Navbar from './Navbar'
import { IoMdAddCircle } from 'react-icons/io'
import Task from './Task'

const TodoList = ({tasks,textInput,setTextInput,addTask,deleteTask}) => <div id="mainContent" className='w-[80%] bg-gradient-to-l from-cyan-600 to-blue-800 py-4 px-9 rounded-[30px] overflow-y-scroll'>
<Head>
    <title>My ToDo List</title>
    <meta name="keywords" content="web development ,programming"/>
    </Head>
  <Navbar />
  <h2 className='text-4xl bolder text-white italic hover:not-italic pb-8'>
    What&apos;s up, Simron!
  </h2>
  <div className='py-3 text-[#7d99e9] font-medium'>TODAY&apos;S TASKS</div>
  <form className='flex items-center justify-center'>
    <input
      className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]'
      placeholder='Add a task for today...'
      value={textInput}// take input from the form here
      onChange={e => setTextInput(e.target.value)}
    />
    <IoMdAddCircle
      onClick={addTask}// OnClick method
      className='text-[#031956] text-[50px] cursor-pointer ml-[20px] mb-[10px]'
    />
  </form>
  <ul>
    {/* Looping through all tasks here using the Task component */}
    {tasks.map(item=>(
      <Task 
      key={item.id}
      taskText={item.taskText}
     onClick={deleteTask(item.id)}//onClick
      />
    ))}
  </ul>
</div>

export default TodoList