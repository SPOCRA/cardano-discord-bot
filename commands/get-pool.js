const { Pool, Client } = require('pg')

const sql = 
`select pu.pledge, pu.margin, pu.fixed_cost
from public.pool_hash ph 
join public.pool_update pu
on ph.id = pu.hash_id 
where encode(hash, 'hex') = $1
and pu.registered_tx_id in (select max(registered_tx_id) from pool_update group by reward_addr_id)
and not exists (select hash_id from pool_retire where hash_id = pu.hash_id)`;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATA,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

module.exports = {
  name: 'get-pool',
  description: 'GetPool!',
  execute(msg, args) {
    if(args.length == 0) {
      msg.reply("Please pass the Pool ID");
    } else {
      let poolId = args[0];
      pool.query(sql, [poolId], (err, res) => {
          res.rows.forEach((o) => {
            let payload = {
              pledge: o.pledge/1000000,
              margin: (o.margin * 100).toFixed(2),
              fixedCost: o.fixed_cost/1000000
            };

            msg.reply(`Pledge: ${payload.pledge} | Margin: ${payload.margin}% | Fixed Cost: ${payload.fixedCost}`);
            console.log(o);
          })
        pool.end()
      })
    }
  },
};
