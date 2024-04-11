const client = require('./client')

const createActivity = async ( activityName ,activityDescription,) => {
  try {
    const { rows: [ id, name, description ] } = await client.query(`
      INSERT INTO fitness_trackr (id, is_public, name, goal)
      VALUES('${activityName}', '${activityDescription}'')
      RETURNING *;
    `);
    return { id, name, description };
  } catch (error) {
    console.log(error)
  }
}

const getActivities = async () => {
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
  createActivity,
  getActivities
}