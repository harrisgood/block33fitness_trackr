const client = require('./client')

const createActivity = async ( activityName, activityDescription, ) => {
  try {
    const { rows: [ id, name, description ] } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES('${activityName}', '${activityDescription}');
    `);
    return  { id, name, description }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createActivity,
}