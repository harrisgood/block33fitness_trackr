const client = require('./client')
const { createRoutine } = require('./routines.js')
const { createActivity } = require('./activities.js')
const { createRoutineActivity } = require('./routines_activities.js')

const routine1 = {is_public: true, name: 'Leg Day', description: 'work out for legs'}

const activity1 = {name: 'squats', description: 'barbell on the shoulders and almost sit down'}
const activity2 =  {name: 'running', description: 'walk twice at once'}
const activity3 = {name: 'sled drags', description: 'drag a weighted sled backwards'}

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN NOT NULL,
        name VARCHAR(12) NOT NULL,
        goal text NOT NULL
      );

      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(12) NOT NULL,
        description text NOT NULL
      );
      
      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        routineId INT REFERENCES routines(id),
        activityId INT REFERENCES activities(id),
        count INT NOT NULL
      );
    `);
  } catch (error) {
    console.log(error)
  }
}

const dropTables = async () => {
  try{
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activities;
    `)
  } catch (error){
    console.log(error)
  }
}

const connectAndSeed = async () => {
  await client.connect();
  console.log('Connected to the database')

  await dropTables()
  console.log('Tables dropped')

  await createTables();
  console.log('tables created')
  


  const legDay = await createRoutine(routine1.is_public, routine1.name, routine1.description,)
  console.log('leg day created: ', legDay)

  const squats = await createActivity(activity1.name, activity1.description)
  console.log('squats created:', squats)
  const running = await createActivity(activity2.name, activity2.description)
  console.log('running created: ', running)
  const sleds = await createActivity(activity3.name, activity3.description)
  console.log('running created: ', running)

  await createRoutineActivity(legDay.id, squats.id, 5)
  console.log('5 squats added to legday')
  await createRoutineActivity(legDay.id, running.id, 2)
  console.log('2 running added to legday')
  await createRoutineActivity(legDay.id, running.id, 4)
  console.log('4 sleds added to legday')
}

connectAndSeed();