const client = require('./client')

const createRoutine = async (isRoutinePublic, routineName, routineGoal,) => {
  try {
    await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES(${isRoutinePublic}, '${routineName}', '${routineGoal}');
    `);
  } catch (error) {
    console.log(error)
  }
}

const getRoutines = async () => {
  try {
     const { rows } = await client.query(`
        SELECT * FROM fitness_trackr;
     `);
     return rows;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createRoutine,
}