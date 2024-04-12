const client = require('./client')

const createActivity = async ( activityName, activityDescription, ) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES('${activityName}', '${activityDescription}')
      RETURNING *;
    `);
    return  rows[0]
  } catch (error) {
    console.log(error)
  }
}

const getActivities = async () => {
  try {
     const { rows } = await client.query(`
        SELECT * FROM activities;
     `);
     return rows;
  } catch (error) {
    console.log(error)
  }
}

const deleteActivity = async (IdToDelete) => {
  try {
    const { rows: [deleteObject] } = await client.query(`
      DELETE FROM activities WHERE id = ${IdToDelete}
      RETURNING *;
    `)
    return (deleteObject ? "succesfully deleted" : "failed to delete")
  } catch (error) {
    console.log(error)
    return "failed to delete, because " + error
  }
}

module.exports = {
  createActivity,
  getActivities,
  deleteActivity
}