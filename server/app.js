const express = require('express');
const path = require('path');
const { v4 } = require('uuid');
const app = express();

//  database
const TODOS = [
    {id: v4(), marked: false, firstName: 'Oleg', lastName: 'Fromm', email: 'olegFrom@gmail.com', todo: 'Make your homework!'}
];

app.use(express.json());

//  GET
app.get('/api/todos', (req, res) => {
    res.status(200).json(TODOS);
});

//  POST
app.post('/api/todos', (req, res) => {
    const todo = {...req.body, id: v4(), marked: false};
    TODOS.push(todo);
    res.status(201).json(todo);
})

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));
