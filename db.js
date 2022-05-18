const mongoose = require('mongoose');
const URL = "mongodb+srv://vianviet2502:X3POU0SQmi9Mog1d@cluster-mongodb-freeage.arqkt.mongodb.net/?retryWrites=true&w=majority";
const connectDB = async() => {
    try {
        await mongoose.connect(
            URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )

        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = {
    connectDB
}