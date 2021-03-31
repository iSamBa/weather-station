const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const PORT = 3000;
require("dotenv").config();

const app = express();
// Using body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.TOKEN}&units=metric`;
  https.get(URL, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      if (weatherData.cod === 200) {
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        res.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My Weather Station</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Lobster&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="./css/style.css" />
    </head>
        <body>
          <section id="title">
            <div class="container-fuild">
              <div class="row">
                <div class="col-lg-6">
                  <h1>Welcome to my weather station</h1>
                </div>
                <div class="col-lg-6">
                  <img class="title-image" src="./images/title.svg" alt="Title" />
                </div>
              </div>
            </div>
          </section>
          <section id="content">
            <div class="container-fuild">
              <div class="row justify-content-center">
                <div class="col-lg-6">
                  <form action="/" method="post">
                    <div class="row justify-content-center">
                      <label for="city">Please enter your city</label>
                    </div>
                    <div class="row justify-content-center">
                      <input type="text" name="city" id="city" placeholder="${req.body.city}"/>
                    </div>
                    <div class="row justify-content-center">
                      <button type="submit" class="btn btn-outline-light">Ok</button>
                    </div>
                  </form>
                </div>
                <div class="result col-lg-6">
                  <h2>${req.body.city}</h2>
                  <img
                    src="http://openweathermap.org/img/wn/${icon}@2x.png"
                    alt=""
                    srcset=""
                  />
                  <h4>${temperature} °C</h4>
                  <p>${description}</p>
                </div>
              </div>
            </div>
          </section>
      
          <script
            src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
            crossorigin="anonymous"
          ></script>
        </body>
      </html>
      `);
      } else {
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Weather Station</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="./css/style.css" />
      </head>
          <body>
            <section id="title">
              <div class="container-fuild">
                <div class="row">
                  <div class="col-lg-6">
                    <h1>Welcome to my weather station</h1>
                  </div>
                  <div class="col-lg-6">
                    <img class="title-image" src="./images/title.svg" alt="Title" />
                  </div>
                </div>
              </div>
            </section>
            <section id="content">
              <div class="container-fuild">
                <div class="row justify-content-center">
                  <div class="col-lg-6">
                    <form action="/" method="post">
                      <div class="row justify-content-center">
                        <label for="city">Please enter your city</label>
                      </div>
                      <div class="row justify-content-center">
                        <input type="text" name="city" id="city" placeholder="${req.body.city}"/>
                      </div>
                      <div class="row justify-content-center">
                        <button type="submit" class="btn btn-outline-light">Ok</button>
                      </div>
                    </form>
                  </div>
                  <div class="result col-lg-6">
                    <h2>City not found</h2>
                    <img
                    class = "error-img"
                      src="./images/404.svg"
                      alt="404 not found"
                      srcset=""
                    />
                    <p>Please check the city you entred again !</p>
                  </div>
                </div>
              </div>
            </section>
        
            <script
              src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
              integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
              crossorigin="anonymous"
            ></script>
            <script
              src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
              crossorigin="anonymous"
            ></script>
          </body>
        </html>
        `);
      }
      res.send();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});
