const { Pool, Client } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_PORT,
  password: process.env.DB_PASS,
  port: process.env.DB_DATA,
})

module.exports = {
  name: 'pool',
  description: 'Pool!',
  execute(msg, args) {
    pool.query('SELECT NOW()', (err, res) => {
      msg.reply(res);
      console.log(err, res)
      pool.end()
    })
  },
};
