const client = require('./client')

const createRoutine = async (isRoutinePublic, routineName, routineGoal,) => {
  try {
    const { rows: [ id, isRoutinePublic, routineName, routineGoal ] } = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES('${isRoutinePublic}', '${routineName}', '${routineGoal}');
    `);
    return { id, isRoutinePublic, routineName, routineGoal }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createRoutine,
}