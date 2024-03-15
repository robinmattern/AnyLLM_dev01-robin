 import dotenv from 'dotenv'; dotenv.config( )  // npm install dotenv 
 import mysql  from 'mysql2/promise';           // npm install mysql2 mysql2-promise 

// 01.1 Write main() function which is run at the end
//----------------------------------------------------
  async function main() {
    var pConnection
    try {
    var pConnection = await mysql.createConnection(
          { host:     process.env.DB1_MYSQL_HOST
          , user:     process.env.DB1_MYSQL_USER
          , password: process.env.DB1_MYSQL_PASSWORD
          , database: process.env.DB1_MYSQL_DATABASE
          , port:     3306 // Default MySQL port
//        , pool:     true
          } );
        console.log(   `\nSuccessful connection to MySQL DB at: ${process.env.DB1_MYSQL_HOST}`);

    } catch( pErr ) {
        console.log(   `\nFailed to connect to MySQL DB at: ${process.env.DB1_MYSQL_HOST}`);
//      console.error( `ERROR:`,  pErr );
//      console.error( `ERROR: ${ pErr }` );
        console.error( `ERROR ${-pErr.errno}: ${pErr.message}` );
        process.exit(1);
    } finally {
    if (pConnection) {
        await pConnection.end();
        }
        }
    } // eof main
//----------------------------------------------------

// 01.2 Call main() function
//----------------------------------------------------
        main()

//----------------------------------------------------
