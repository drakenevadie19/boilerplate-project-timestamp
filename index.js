// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Endpoint for date string or Unix timestamp
app.get("/api/:date(\\d{4}-\\d{2}-\\d{2})", (req, res) => {
  let dateInput = req.params.date;
  // console.log(dateInput);

  // If the date parameter is empty, use the current date
  if (!dateInput) {
    dateObject = new Date();
  } else {
    // Try to parse the input as a number (Unix timestamp)
    const timestamp = parseInt(dateInput);
    // console.log("Timestamp parse:" + timestamp)
    if (isNaN(timestamp)) {
      dateObject = new Date(timestamp);
    } else {
      // Try to parse the input as a date string
      dateObject = new Date(dateInput);
    }
  }

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) {
    return res.send({ error: "Invalid Date" });
  }

  // Get the Unix timestamp in milliseconds
  const timestampMilliseconds = dateObject.getTime();
  // console.log("Time Stamp: " + timestampMilliseconds);

  // Get the formatted date string
  const formattedDate = dateObject.toUTCString();
  // console.log("Date: " + formattedDate);

  res.send({ "unix": timestampMilliseconds, "utc": formattedDate });
});

// Endpoint for Unix timestamp in milliseconds
app.get("/api/:timestampMilliseconds", (req, res) => {
  let timestampInput = req.params.timestampMilliseconds;

  // Parse the input as an integer
  const timestamp = parseInt(timestampInput, 10);
  const dateObject = new Date(timestamp);
  
  // Check if the date is valid
  if (isNaN(dateObject.getTime())) {
    return res.send({ error: "Invalid Date" });
  }

  // Get the formatted date string
  const formattedDate = dateObject.toUTCString();
  res.send({ "unix": timestamp, "utc": formattedDate });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
