const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// const hbs = require('hbs')
const app = express();
//path core module - to manipuate strings
//https://nodejs.org/dist/latest-v12.x/docs/api/path.html
//Need absolute path to serve up static files

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//express expects view engine to be served from /views
//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Express works through your app until it finds a math
//setup static director to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather App",
    name: "Fred Moseley",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Fred Moseley",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Fred Mosley",
    message: "This is my test message for testing",
  });
});
//Express
//root of app
//Will never see this because of static index.html
/*
app.get('',(req,res)=>{
    res.send(`<h1>Weather<h1>`)
})
*/
/*
app.get('/help',(req,res)=>{
    res.send([{
        name: 'Fred',
        age: 49
    },{
        name: 'Danielle',
        age: 47
    }])
})

app.get('/about',(req,res)=>{
    res.send('<h1>About Page</h1>')
})
*/
app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    //The call back will return error or data
    if (error) {
      return res.send(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }
   
      res.send({
        forecastData,
          location,
          address       
      })
    });
  });

});

app.get("/products", (req, res) => {
  //request query arguments are available on
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Fred Moseley",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Fred Moseley",
    message: "Page not found",
  });
});

//start the server
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
