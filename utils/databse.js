const mysql = require("mysql2")

const pool = mysql.createPool({
   host:"sql12.freesqldatabase.com",
   user:"sql12627291",
   database:"sql12627291",
   password:"rHnAsGMLFl"

})
module.exports = pool.promise()
