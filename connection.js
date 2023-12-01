const mongoose = require('mongoose');

async function connectToMongo(MONGO_URL){
    return mongoose.connect(`${MONGO_URL}/project-01`).then(()=>console.log("MongoDB connected")).catch((err)=>console.log(err));
}

module.exports = {
    connectToMongo,
}
