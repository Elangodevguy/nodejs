const fs = require('fs');
const express = require('express')

const app = express()

// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'hi' })
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
})

const port = 8000
app.listen(port, () => {
    console.log("App running on port " + port)
})