//Core Modules
//path core module - to manipuate strings
const path = require("path");
//Node Modules
const express = require("express");
const hbs = require("hbs");
//My Modules
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Changing port for Heroku deployment
const port = process.env.PORT || 3000;
const app = express();

//Need absolute path to serve up static files
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//express expects view engine to be served from /views
//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Express works through your app until it finds a match
//setup static directory to serve
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


app.get("/weather", (req, res) => {
  const address = req.query.address;
  
  if (!address || /\W/g.test(/\s+/.test(address) ? address.replace(/\s/g,'_') : address)) {
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
        address,
      });
    });
  });
});


app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 help",
    name: "Fred Moseley",
    message: "Help article not found",
  });
});

//Catch any path that is not matched
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Fred Moseley",
    message: "Page not found",
  });
});

//start the server
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
