const { Pool, Client } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATA,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

module.exports = {
  name: 'pool',
  description: 'Pool!',
  execute(msg, args) {
    pool.query('SELECT * from public.pool_owner', (err, res) => {
      msg.reply("Got it");
      console.log(err, res)
      pool.end()
    })
  },
};
