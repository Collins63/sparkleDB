const express = require('express');
const app = express();
const port = 3000
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routes/job');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser')

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=> console.log('connected to sparkle')).catch((err)=>console.log(err));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/jobs' , jobRouter);
app.use("/api/", authRoute);
 


app.listen(process.env.PORT  || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});