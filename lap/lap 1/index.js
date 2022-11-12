
const express = require('express')
const app = express()
const port = 8081
var url = require('url')
var http = require('http')

app.use('/', (req, res) =>{
    var nowyear = new Date()
    var year = nowyear.getFullYear() - req.query.year
    var name = req.query.name ?? 'your name'
    res.send(`${name} is ${year} year old`)
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})


