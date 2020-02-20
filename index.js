// instatiate express module
const express = require('express')
require('express-group-routes')



//use express in app variable
const app = express()

//init bodyParser
const bodyParser = require('body-parser')

//define the server port
const port = 3500

//allow this app to receive incoming json request
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});


//create the homepage root
app.get('/', (req, res) => {
  //res means response, and it send string "Hello Express!" to the API
  res.send('Hello Express!')
})

//when this nodejs app executed, it will listen to defined port
// app.listen(port, () => console.log(`Listening on port ${port}!`))

//make hardcoded array of obj todos
//import the controller
const TodosController = require('./controllers/todos')
const { authenticated } = require('./middleware')
const AuthController = require('./controllers/auth')


//GET list route: simply send arr of obj todos your user screen
app.group('/api/v1', (router) => {

  router.post('/login', AuthController.login)
  router.post('/register', AuthController.signUp)

  router.get('/todos', authenticated, TodosController.index)


  //GET detail route: receive json body request, from user input, then push to todos array
  router.get('/todo/:id', authenticated, TodosController.show)

  //POST route: receive json body request, from user input, then push to todos array
  router.post('/todo', authenticated, TodosController.store)

  //PATCH route: receive json body request, from user input, then push to todos array by obj id
  router.put('/todo/:id', authenticated, TodosController.update)

  //DELETE route: delete the todo obj, by received id request paramas
  router.delete('/todo/:id', authenticated, TodosController.destroy)

})

app.listen(port, () => console.log(`Listening on port ${port}!`))
