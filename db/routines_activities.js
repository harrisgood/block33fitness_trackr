const client = require('./client')

const createRoutineActivity = async (RAroutineId, RAactivityId, RoutineActivityCount,) => {
  try {
    const { rows: [ id,  routine_id, activity_id, count ] } = await client.query(`
      INSERT INTO fitness_trackr (id, is_public, name, goal)
      VALUES(${RAroutineId}, ${RAactivityId}, ${RoutineActivityCount})
      RETURNING *;
    `);
    return { id, routine_id, activity_id, count };
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