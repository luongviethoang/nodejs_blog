const express = require('express')
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const catNames = require('cat-names')
const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

//the following is needed for cookies support
app.use(cookieParser())

//the following is needed for session support
app.use(session({resave:false, saveUninitialized: false, secret: 'keyboard cat'}))

//see the views/greeting.hbs file for the contents of the view
app.get('/greeting', ( req, res) => {
     res.render('greeting', { 
        message: 'Hello esteemed programmer!', 
        style: req.query.style,
        userid: req.cookies.userid,
        username: req.session.username    
    })
})

app.get('/set-random-userid', (req,res) =>{
    res.cookie('userid', (Math.random()*10000).toFixed(0))
    res.redirect('/greeting')
})

app.get('/set-random-username', (req,res) => {
    req.session.username = catNames.random()
    res.redirect('/greeting')
})

app.get('*', (req,res) => res.send('check out our <a herf="/greeting">greeting</a> page!'))

app.listen(port, () => console.log(
    `express started on http://localhost:${port}/greeting\n`
))