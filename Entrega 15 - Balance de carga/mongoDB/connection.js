const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const url = "mongodb://localhost:27017/ecommerce"
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB