const client = require('./client')
const { createRoutine } = require('./routines.js')
const { createActivity } = require('./activities.js')
const { createRoutineActivity } = require('./routines_activities.js')

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
  
  const legDay = await createRoutine(true, 'legDay', 'work out for legs')
  console.log('mock routine created')

  const squats = await createActivity('squats', 'barbell on the back and squat down')
  console.log('mock activity created')
  const running = await createActivity('running', 'walk twice at once')
  console.log('mock activity created')

  await createRoutineActivity(legDay.id, squats.id, 5)
  console.log('mock routines_activities created')
  await createRoutineActivity(legDay.id, running.id, 2)
  console.log('mock routines_activities created')
}

connectAndSeed();