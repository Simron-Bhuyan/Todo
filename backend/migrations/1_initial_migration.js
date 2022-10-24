const ToDoTaskContract = artifacts.require("ToDoTaskContract");

module.exports = function (deployer) {
  deployer.deploy(ToDoTaskContract);
};
