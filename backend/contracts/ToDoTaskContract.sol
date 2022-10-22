// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
//before interacting with frontend, deployed contract address  and access to ABI
contract ToDoTaskContract {
    event AddTask(address recipient, uint taskId);
    event DeleteTask(uint taskId, bool isDeleted);
    struct Task {
        uint256 id;
        string taskText;
        bool isDeleted;
    }
    Task[] private tasks;
    mapping(uint256 => address)taskToOwner; // key=>address inner join for joining and getting only the owers tasks and not someone else {0: take walk}vs{0:'0x.....'}

    function addTask(string memory taskText, bool isDeleted) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, taskText, isDeleted));
        taskToOwner[taskId] = msg.sender; // wallet address of whoever is currently logged in
        emit AddTask(msg.sender, taskId);
    }
    // get the tasks that of mine and not deleted
    function getMyTodos()external view returns(Task[] memory) {
        Task[] memory temp = new Task[](tasks.length);
        uint count = 0;
        for (uint i = 0; i < tasks.length; i ++) {
            if (taskToOwner[i] == msg.sender && tasks[i].isDeleted == false) { // These are my tasks and not deleted
                temp[count] = tasks[i];
                count ++;
            }
        }
        Task[] memory resultTasks=new Task[](count);
        for(uint i=0;i<count;i++){
          resultTasks[i]=temp[i];
        }
        return resultTasks;
    }

    function deleteTask(uint taskId,bool isDeleted) external{
      if(taskToOwner[taskId]==msg.sender){
        tasks[taskId].isDeleted=isDeleted;
        emit DeleteTask(taskId,isDeleted);
      }
    }
}
  