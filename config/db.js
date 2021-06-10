const Pool = require('pg').Pool

const pool = new Pool({
    user: 'ryanpierre',
    password: '',
    database: 'find_photos',
    host: 'localhost',
    port: 5432
})

module.exports = pool;
