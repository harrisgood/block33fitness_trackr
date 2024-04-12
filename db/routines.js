const client = require('./client')

const createRoutine = async (isRoutinePublic, routineName, routineGoal,) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES(${isRoutinePublic}, '${routineName}', '${routineGoal}')
      RETURNING *;
    `);
    return rows[0]
  } catch (error) {
    console.log(error)
  }
}

const getRoutines = async () => {
  try {
     const { rows } = await client.query(`
        SELECT * FROM routines;
     `);
     return rows;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createRoutine,
  getRoutines
}