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
    user: 'pat2',
    status: 'approved',
    createdOn: 'Jul 17 08:12:04'
  },
  {
    type: 'foodtruck',
    user: 'pat2',
    status: 'approved',
    createdOn: 'Jul 17 08:24:04'
  },
  {
    type: 'foodtruck',
    user: 'pat3',
    status: 'waitlisted',
    createdOn: 'Jul 17 18:12:04'
  },
  {
    type: 'table',
    user: 'pat3',
    status: 'approved',
    createdOn: 'Jul 18 08:10:04'
  },
  {
    type: 'foodtruck',
    user: 'pat3',
    status: 'awaiting action',
    createdOn: 'Jul 18 09:16:04'
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

foodventenyController.getApps = async (req, res) => {
  try {
    //req.body will contain a username or role
    let username = 'pat2';
    if(checkRole(username) === 'admin'){
      // return array of apps
      return dbApps;
    }else if(checkRole(username) === 'user'){
      const userAppArray = [];
      for(let app of dbApps) {
        if(app.user === username) userAppArray.push(app);
      }
      return userAppArray;
    }else{
      return "ERROR: User not found"
    }

  } catch (error) {
    console.log(error);
  }
}

foodventenyController.updateAppStatus = async () => {

}

module.exports = foodventenyController;

console.log(checkRole('pat1'));
console.log(foodventenyController.getApps())