const client = require('./db/client.js');
const express = require('express')
const app = express()
const { createRoutine, getRoutines, deleteRoutine } = require('./db/routines.js')
const { createRoutineActivity, getRoutineActivities } = require('./db/routines_activities.js')
const { createActivity, getActivities, deleteActivity } = require('./db/activities.js')


const getConnected = async () => {await client.connect()}
getConnected()

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

// get a single activity by its id 
app.get('/api/v1/activities/:id', async(req, res, next) => {
  try {
    const allActivities = await getActivities();
    const { id } = req.params
    const foundActivity = allActivities.find( currentActivity => currentActivity.id === id*1 )
    res.send(foundActivity)
  } catch(err) {
    next(err);
  }
})

// delete an actitivty
app.delete('/api/v1/activities/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteMessage = await deleteActivity(id)
    res.send(deleteMessage)
  } catch (error) {
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

// get a single routine by its id 
app.get('/api/v1/routines/:id', async(req, res, next) => {
  try {
    const allRoutines = await getRoutines();
    const { id } = req.params
    console.log('req.params: ', req.params)
    const foundRoutine = allRoutines.find( currentRoutine => currentRoutine.id === id*1 )
    res.send(foundRoutine)
  } catch(err) {
    next(err);
  }
})

// delete a routine
app.delete('/api/v1/routines/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteMessage = await deleteRoutine(id)
    res.send(deleteMessage)
  } catch (error) {
    console.log(error)
  }
})

app.post('/api/v1/routines_activities/', async(req, res) => {
  try{
    const { routineId, activityId, count } = req.body
    const newRoutineActivity = await createRoutineActivity(routineId, activityId, count)
    res.send(newRoutineActivity)
  } catch (error) {
    console.log(error)
  }
})


app.listen(8080, () => console.log(`listening on port 8080`))