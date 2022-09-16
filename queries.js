const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'rbs!',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM student ORDER BY sid ASC', (error, results) => {
    if (error) throw error
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM studnet WHERE sid = $1', [id], (error, results) => {
    if (error) throw error
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { sid, name, surname, email } = request.body

  pool.query('INSERT INTO student (sid, fname, lname, email) VALUES ($1, $2) RETURNING *', [sid, name, surname, email], (error, results) => {
    if (error) throw error
    response.status(201).send(`User added with ID: ${results.rows[0].sid}`)
  })
}

const updateUser = (request, response) => {
  const sid = parseInt(request.params.sid)
  const { name, surname, email } = request.body

  pool.query(
    'UPDATE student SET name = $1, email = $2 WHERE id = $3',
    [name, email, sid],
    (error, results) => {
      if (error) throw error
      response.status(200).send(`User modified with ID: ${sid}`)
    }
  )
}

const deleteUser = (request, response) => {
  const sid = parseInt(request.params.sid)

  pool.query('DELETE FROM student WHERE id = $1', [sid], (error, results) => {
    if (error) throw error
    response.status(200).send(`User deleted with ID: ${sid}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}