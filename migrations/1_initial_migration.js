const Migrations = artifacts.require("Migrations");

//create these migration files to put smart contracts on the blockchain
//like a db migration in a web2.0 context
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
