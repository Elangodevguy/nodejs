const fs = require('fs');
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan('dev'))

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

const getTour = (req, res) => {
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)

    if (!tour) {
        res.status(404).json({
            status: 'fail',
            message: 'No tour found'
        })
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    }
}

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: 'fail',
            message: 'ID not found'
        })
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                tour: '<Updated tour here>'
            }
        })
    }
}

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        res.status(404).json({
            status: 'fail',
            message: 'ID not found'
        })
    } else {
        res.status(204).json({
            status: 'success',
            data: null
        })
    }
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        success: 'error',
    })
}
const getUser = (req, res) => {
    res.status(500).json({
        success: 'error',
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        success: 'error',
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        success: 'error',
    })
}
const deleteUser = (req, res) => {
    res.status(500).json({
        success: 'error',
    })
}
// app.get('/api/v1/tours', getAllTours)
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id', getTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

app.route('/api/v1/users').get(getAllUsers).post(createUser)
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser)

const port = 8000
app.listen(port, () => {
    console.log("App running on port " + port)
})