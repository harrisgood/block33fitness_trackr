const client = require('./client')

const createRoutineActivity = async (RAroutineId, RAactivityId, RoutineActivityCount,) => {
  try {
    const { rows: [routineActivityObj] } = await client.query(`
      INSERT INTO routines_activities (routineId, activityId, count)
      VALUES(${RAroutineId}, ${RAactivityId}, ${RoutineActivityCount})
      RETURNING *;
    `);
    return routineActivityObj
  } catch (error) {
    console.log(error)
  }
}

const getRoutineActivities = async () => {
  try {
     const { rows } = await client.query(`
        SELECT * FROM routines_activities;
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