const express = require('express');
const app = express();
app.use(express.json());

app.get('/login', (request, response) =>{
    console.log(request.body);
    response.json('Login GET request is through');
});

app.post('/signup', (request, response) =>{
    console.log(request.body);
    response.json('Sign-up POST request is through');
});

app.listen(3001);