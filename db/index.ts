const { Client } = require('pg')

export const pg_client = new Client({
    host: 'ec2-54-246-90-10.eu-west-1.compute.amazonaws.com',
    database: 'ddscqjec5bgfd6',
    user: 'brgddndbsdnoeg',
    password: '30f1da60ebef9a607479b3fe56274be5cd59f928cdf17db861dedaf1f4db162b',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

//TODO: проверить оптимальность коннектов
pg_client.connect()