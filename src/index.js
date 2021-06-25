const path = require('path');
const express = require('express');
const requests = require('requests');
const app = express();
const port = 8000;

// homepage request
app.get('/', (req,res)=>{
    res.send('Connection established');
});

app.get('/about', (req,res)=>{
    requests(`https://api.openweath_weather_token/weather?q=${req.query.name},token`)
    .on("data", (chunk)=>{
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        // get the request of cityname and the temperature
        console.log(`city name is ${arrData[0].name} and temperature is ${arrData[0].main.temp}`);
        res.write(arrData[0].name);
    })
    .on("end", (err)=>{
        if (err) console.log('connection error', err);
        res.end();
    });
});

// listening port
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});