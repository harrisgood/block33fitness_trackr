const client = require('./client')

const createRoutineActivity = async (RAroutineId, RAactivityId, RoutineActivityCount,) => {
  try {
    await client.query(`
      INSERT INTO routines_activities (routineId, activityId, count)
      VALUES(${RAroutineId}, ${RAactivityId}, ${RoutineActivityCount});
    `);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createRoutineActivity,
}