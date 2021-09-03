const express = require('express');
const path = require('path');
const app = express();

//  database
const TODOS = [
    {id: 1, marked: false, firstName: 'Oleg', lastName: 'Fromm', email: 'olegFrom@gmail.com', todo: 'Make your homework!'}
];

//  GET
app.get('/api/todos', (req, res) => {
    res.status(200).json(TODOS);
});

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));
