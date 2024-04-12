const client = require('./db/client.js');
const app = express()
const { createRoutine, getRoutines } = require('./db/routines.js')
const { createRoutineActivity, getRoutineActivities } = require('./db/routines_activities.js')
const { createActivity, getActivities } = require('./db/activities.js')


client.connect()

app.use(express.json())
app.use(express.json())


app.listen(8080, () => console.log(`listening on port 8080`))