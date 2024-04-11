const client = require('./client')

const createActivity = async ( activityName, activityDescription, ) => {
  try {
    await client.query(`
      INSERT INTO activites (name, description)
      VALUES('${activityName}', '${activityDescription}');
    `);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createActivity,
}