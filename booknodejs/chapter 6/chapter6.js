const express = require ('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const port = process.env.PORT || 3000

const tours = [
    { id: 0, name: 'HoodRiver', price:99.99},
    { id: 1, name: 'Oregon Coast', price:149.95}
]

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}))

app.post('/process-contact', (req,res) =>{
    console.log(`received contact from ${req.body.name}
    <${req.body.email}>`)
    res.redirect(303, '10-thank-you')
})



app.get('/api/tours', (req, res) =>{
    const toursXml = '<?xml version = "1.0"?><tours>' +
    tours.map(p=>`<tours price="${p.price}" id="${p.id}">${p.name}</tours>`)
    .join('') + '</tours>'
    const tourText = tours.map(p => 
        `${p.id}: ${p.name} (${p.price})`
        ).join('\n')
        res.format({
            'application/json':()=> res.json(tours),
            'application/xml':()=>
            res.type('application/xml').send(toursXml),
        'text/xml': () => res.type('text/xml').send(toursXml),
        'text/plain': () => res.type('text/plain').send(toursXml),
        })
})

app.get('/api/tours', (req,res) => res.json(tours))


app.engine('handlebars', expressHandlebars.engine({
    defaultlayout: 'main',
}))
app.set('view engine', 'handlebars')
//basic usage

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/error', (req,res) => {
    res.status(500)
    res.render('error')
})

// or on one line

app.get('/error', (req,res) => res.status(500).render('error'))

app.get('/greeting', (req,res) =>{
    res.render('greeting', {
        message: 'Hello esteemed programmer!',
        style: req.query.style,
        userid: req.cookies.userid,
        username: req.session.username
    })
})

// the following layout doesn't have a layout file, so
// views/no-layout.handlebars must include all nescessary HTML

app.get('/no-layout', ( req, res ) => {
    res.render('no-layout', { layout: null})
})

// the layout file views/layouts/custom.handlebars will be used

app.get('/custom-layout', (req,res) => {
    res.render('custom-layout', {layout: 'custom'})
})

app.get('/text', (req,res) => {
    res.type('text/plain')
    res.send('this is a text')
})


// app.disable('x-powered-by')

app.get('/headers', (req,res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

// this should appear AFTER all of your routes
// note that even if you dont need the "next" function, it must be
// included for Express to recognize this as an error handler

app.use((err, req, res, next) => {
    console.error('!** SERVER ERROR: '+ err.massage)
    res.status(500). render('08-error', 
    {message : "you shouldn't have clicked that!"})
})

//this should appear AFTER all of your routes

app.use((req,res) => 
 res.status(404).render('404'))

app.listen(port, () =>console.log(
    `Express started on http://localhost:${port};`
))