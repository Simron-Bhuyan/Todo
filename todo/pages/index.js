import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import { TaskContractAddress } from '../config'
import TaskAbi from '../../backend/build/contracts/ToDoTaskContract.json'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useEffect } from 'react'
/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isLoggedin, setIsLoggedIn] = useState(false)
  const [currentAcct, setCurrentAcct] = useState('')
  const [textInput, setTextInput] = useState('')
  const [tasks, setTasks] = useState([])
useEffect(()=>{
connectWallet();
getAllTasks();
},[])
  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' })
      console.log('connected to chain', chainId)

      const georeliChainId = '0x5'
      if (chainId != georeliChainId) {
        alert('You are not connected to the Georeli testnet!!!!')
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      setIsLoggedIn(true)
      setCurrentAcct(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
   try{
    const { ethereum } = window
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const ToDoTaskContract = new ethers.Contract(TaskContractAddress, TaskAbi.abi,signer)
      let allTasks=await ToDoTaskContract.getMyTodos()
      setTasks(allTasks)
    }else{
      console.log('Ethereum obj does not exist')
    }
   
   }catch(error){
    console.log(error)
   }
  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
    e.preventDefault() //avoiding refresh of the page
    let task = {
      taskText: textInput,
      isDeleted: false
    }
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const ToDoTaskContract = new ethers.Contract(TaskContractAddress, TaskAbi.abi,signer)
        ToDoTaskContract.addTask(task.taskText, task.isDeleted).then(res => {
          setTasks([...tasks, task.taskText])
          console.log('Added task')
        }).catch(err => console.log(err))
      }else{
        console.log('ethereum object doed not exists')
      }
    } catch (error) {
      console.log(error)
    }
    setTaskInput('')
  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract filtering doesn't mean deleting the todos
  const deleteTask = key => async () => {
try{
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const ToDoTaskContract = new ethers.Contract(TaskContractAddress, TaskAbi.abi,signer)
    const deleteTaskTnx=await ToDoTaskContract.deleteTask(key,true)
    console.log('Task successfully deleted ',deleteTaskTnx)
    let allTasks = await ToDoTaskContract.getMyTodos()
    setTasks(allTasks)
  }else{
    console.log('Ethereum does not exist .\n Nothing to delete...')
  }
}catch(err){
console.log(err)
}
  }

  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen flex justify-center py-4'>
      {! isLoggedin ? <ConnectWalletButton connectWallet={connectWallet} /> :
        correctNetwork ? <TodoList tasks={tasks} textInput={textInput} setTextInput={setTextInput} addTask={addTask} deleteTask={deleteTask} /> : <WrongNetworkMessage />}
    </div>
  )
}

