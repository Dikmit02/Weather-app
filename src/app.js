const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();

//  Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//  use when index.html is a static page 
app.use(express.static(publicDirectoryPath))

// //Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Diksha Mittal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Diksha Mittal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Diksha Mittal'
    })
})

// /*static pages/*/
// // app.use('/about',express.static(path.join(publicDirectoryPath,'/about.html')))
// // app.use('/help',express.static(path.join(publicDirectoryPath,'/help.html')))

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Adress must be provided'
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({error: error})

        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location: location,
                forecastData: forecastData,
                address:req.query.address
            })
        })
    })




})

app.use('*', express.static(path.join(publicDirectoryPath, './404.html')))

app.listen(3000, () => {
    console.log('Server started at port 3000')
})


// // exact match found(index.html) therefore this will not run
// // app.get('',(req,res)=>{
// //     res.send("<h1>Weather</h1>")
// // })
// // app.get('/json',(req,res)=>{
// //     res.send({
// //         name:'Diksha',
// //         age:22
// //     })
// // })

// // app.get('/array',(req,res)=>{
// //     res.send([{
// //        name:'Diksha' 
// //     },{
// //         name:'Mittal'
// //     }])
// // })
// // app.get('/about',(req,res)=>{
// //     res.send("<h1>About</h1>")
// // })

