const client = require('./client')
const { createRoutine, getRoutines } = require('./routines.js')
const { createActivity, getActivities } = require('./activities.js')
const { createRoutineActivity, getRoutineActivities } = require('./routines_activities.js')

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN NOT NULL,
        name VARCHAR(12) NOT NULL,
        goal VARCHAR(20) NOT NULL
      );

      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(12) NOT NULL,
        description VARCHAR(30) NOT NULL
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
  
  await createRoutine(true, 'testDay', 'test out our function')
}

connectAndSeed();