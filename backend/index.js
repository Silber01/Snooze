const express = require('express');
const app = express();

app.get('/login', (request, response) =>{
    response.json('test');
});

app.listen(3001);