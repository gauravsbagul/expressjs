const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')


app.use((req, res, next)=>{
        var now = new Date().toString();
        var log = `${now}: ${req.method}: ${req.url}`
        fs.appendFile('server.log', log +'\n', (err) => {
                if(err){
                        console.log('Unable to append the log to the server.log file');
                }
        })
        next();
});

// middleWare
// app.use((req, res, next) =>{
//         res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
        return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
        return text ;
});

app.get('/', (req, res) => {
        // res.send('<h1> hello Express!</h1>');
        res.send({
                name: 'Gaurav',
                likes: [
                        'songs',
                        'poems',
                        'movies'
                ],
                address: 'nashik'
        })
});
app.get('/about', (req, res) => {
        // res.send('you are on about page')     
        res.render('about.hbs', {
                pageTitle: 'About page',
        });
});

app.get('/bad', (req, res) => {
        res.send({
                errorMessage: 'Unable to handle request'
        })
});
app.listen(3001, () => {
        console.log('server is up and running on posr 3001');
});

app.get('/home', (req, res) => {
        res.render('home.hbs', {
                welcomeMessage: 'Welcome to my website',
                title: 'Home Page',
                data: {
                        name: 'Gaurav',
                        likes: [
                                'songs',
                                'poems',
                                'movies'
                        ],
                        address: 'nashik'
                },
        })
})