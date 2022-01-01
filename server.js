require('dotenv').config()
const express = require('express')
const app = express()
const expressLayouts= require('express-ejs-layouts')
const mongoose = require('mongoose')

//GUI
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layots/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//DATABASE
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true, useUnifiedTopology:true })
const db= mongoose.connection
db.on('error',(error)=> console.error(error))
db.once('open',()=> console.log('Connected to Database'))

app.use(express.json())

const sitesRouter= require('./routes/sites')
app.use('/sites',sitesRouter)
app.listen(process.env.PORT || 3000, ()=> console.log('server Started'))