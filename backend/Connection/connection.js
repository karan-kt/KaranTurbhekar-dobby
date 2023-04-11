const mongoose = require('mongoose');

const connection = async () => {
    mongoose.set('strictQuery', true);

    try {
        const con = await mongoose.connect(process.env.ConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${con.connection.host}`)
    }
    catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connection;