const mongoose = require('mongoose');

const  db_connection= async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Connect to MongoDB',
            connect.connection.host,
            connect.connection.name
        )

       }catch(e){
          console.log('Error connecting to MongoDB')
          process.exit(1)
    }

} 

module.exports = db_connection;