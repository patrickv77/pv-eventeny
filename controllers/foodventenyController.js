// const db = require('..models/database') or sequelize

const db = [
  {
    username: 'pat1',
    role: 'admin'
  },
  {
    username: 'pat2',
    role: 'user'
  },
  {
    username: 'pat3',
    role: 'user'
  }
]

const dbApps = [
  {
    type: 'table',
    user: 'pat2'
  },
  {
    type: 'foodtruck',
    user: 'pat2'
  },
  {
    type: 'foodtruck',
    user: 'pat3'
  }
]


// functions to be used locally
function checkRole(username) {
  for(let user of db) {
    if(user.username === username) return user.role;
  }
  
  return "ERROR: User not found"
}

// functions to be exported
const foodventenyController = {};

foodventenyController.getAllApps = async (req, res) => {
  try {
    

  } catch (error) {
    console.log(error);
  }
}

foodventenyController.getUserApps = async () => {

}

foodventenyController.updateAppStatus = async () => {

}

module.exports = foodventenyController;

console.log(checkRole('pat1'));