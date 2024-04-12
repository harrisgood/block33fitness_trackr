const client = require('./db/client.js');
const express = require('express')
const app = express()
const { createRoutine, getRoutines } = require('./db/routines.js')
const { createRoutineActivity, getRoutineActivities } = require('./db/routines_activities.js')
const { createActivity, getActivities } = require('./db/activities.js')


client.connect()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// home page
app.get('/', async (req, res, next) => {
  res.send('Loaded home page')
  console.log('on homepage')
})

// get all activities
app.get('/api/v1/activities', async (req, res, next) => {
  try {
    const allActivities = await getActivities();
    console.log('on /activities')
    res.send(allActivities)
  } catch(err) {
    next(err);
  }
})

// post a new activity
app.post('/api/v1/activities', async (req, res) => {
  try{
    const { name, description } = req.body
    const newActivity = await createActivity(name, description)
    res.send(newActivity)
  }catch (error) {
    console.log(error)
  }
})

// get all routines
app.get('/api/v1/routines', async (req, res, next) => {
  try {
    const allRoutines = await getRoutines();

    res.send(allRoutines)
  } catch(err) {
    next(err);
  }
})

// post a new routine
app.post('/api/v1/routines', async (req, res) => {
  try{
    const { is_public, name, goal } = req.body
    const newRoutine = await createRoutine(is_public, name, goal)
    res.send(newRoutine)
  }catch (error) {
    console.log(error)
  }
})

// get a single acitivity by its id 
app.get('/api/v1/activities/:activityId  ', async(req, res, next) => {
  try {
    const allActivities = await getActivities();
    console.log(allActivities)
    res.send(allRoutines)
  } catch(err) {
    next(err);
  }
})


app.listen(8080, () => console.log(`listening on port 8080`))