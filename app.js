var express = require("express");
const users = require("./utils/users");
var app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
 console.log("Server running on port "+ port);
});

app.get('/', (req, res) => {
    res.send('This is an example API, you should try stuff like /users to get JSON responses.')
});

app.get('/users', (req, res) => {
    const count = req.query.count || 100;
    if (count > 10000 || count < 1){
        res.status(400).json({"error":"Count must be greater than 0 and less than 10000."});
        return;
    }
    const randomUsers = users.generateRandomUsers(count);
    res.json(randomUsers);
});