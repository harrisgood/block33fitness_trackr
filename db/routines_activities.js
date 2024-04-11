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

const getRoutineActivities = async () => {
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
  createRoutineActivity,
  getRoutineActivities
}