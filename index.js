const express = require('express');
const app = express();
const port = 3000
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jobRouter = require('./routes/job');
const authRoute = require('./routes/auth');
const userroute = require('./routes/user');
const bookMarkRoute = require("./routes/bookmark");
const bodyParser = require('body-parser')

dotenv.config();

const admin= require('firebase-admin');
const serviceAccount = require('./servicesAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose.connect(process.env.MONGO_URL).then(()=> console.log('connected to sparkle')).catch((err)=>console.log(err));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/jobs' , jobRouter);
app.use("/api/", authRoute);
app.use("/api/users" , userroute);
app.use("/api/bookmarks" , bookMarkRoute );


app.listen(process.env.PORT  || PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});