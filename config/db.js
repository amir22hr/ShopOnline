const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_ID, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    () => {
        console.log("MongoDB Connected.")
    },
    error => console.log(error)
)