const client = require('./client')

const createRoutine = async (isRoutinePublic, routineName, routineGoal,) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES(${isRoutinePublic}, '${routineName}', '${routineGoal}')
      RETURNING *;
    `);
    return rows[0]
  } catch (error) {
    console.log(error)
  }
}

const getRoutines = async () => {
  try {
     const { rows } = await client.query(`
        SELECT * FROM routines;
     `);
     return rows;
  } catch (error) {
    console.log(error)
  }
}

const deleteRoutine = async (IdToDelete) => {
  try {
    const { rows: [deleteObject] } = await client.query(`
      DELETE FROM routines WHERE id = ${IdToDelete}
      RETURNING *;
    `)
    console.log('deleteObject: ', deleteObject)
    return (deleteObject ? "succesfully deleted" : "failed to delete")
  } catch (error) {
    console.log(error)
    return "failed to delete, because " + error
  }
}

module.exports = {
  createRoutine,
  getRoutines,
  deleteRoutine
}