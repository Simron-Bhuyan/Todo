import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'


/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {

  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {

  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {

  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract filtering doesn't mean deleting the todos
  const deleteTask = key => async () => {

  }

  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen flex justify-center py-4'>
      {!'is user not logged in?' ? <ConnectWalletButton /> :
        !'is this the correct network?' ? <TodoList /> : <WrongNetworkMessage />}
    </div>
  )
}

