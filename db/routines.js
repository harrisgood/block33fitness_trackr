const client = require('./client')

const createRoutine = async (isRoutinePublic, routineName, routineGoal,) => {
  try {
    const { rows: [ id, is_public, name, goal ] } = await client.query(`
      INSERT INTO fitness_trackr (is_public, name, goal)
      VALUES(${isRoutinePublic}, '${routineName}', '${routineGoal}')
      RETURNING *;
    `);
    return { id, is_public, name, goal };
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

createRoutine()

module.exports = {
  createRoutine,
  getRoutines
}