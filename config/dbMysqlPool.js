import mysql from "mysql2";
const PORT_MYSQL = process.env.DATABASE_PORT;

export const dbMysqlPool = mysql.createPool({
  host: process.env.DATABASE_URI,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_DBNAME,
  connectionLimit: process.env.DATABASE_POOL_LIMIT,
  maxIdle: process.env.DATABASE_POOL_MAX_IDLE, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: process.env.DATABASE_POOL_IDLE_TIMEOOUT, // idle connections timeout, in milliseconds, the default value 60000
  connectTimeout: process.env.DATABASE_POOL_CONNECT_TIMEOOUT,
  queueLimit: process.env.DATABASE_POOL_QUEUE_LIMIT,
  enableKeepAlive: process.env.DATABASE_POOL_KEEP_ALIVE,
  keepAliveInitialDelay: process.env.DATABASE_POOL_KEEP_ALIVE_INITIAL_DELAY,
});

dbMysqlPool.getConnection((err) => {  
  if (err) throw err;  
  console.log(`Mysql DB connected on port: ${PORT_MYSQL}`);
});


