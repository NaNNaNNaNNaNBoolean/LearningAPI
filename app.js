const express = require('express');
const cors = require('cors');

const mangaRoutes = require("./routes/mangas")

const app = express();
app.use(express.json())
app.use(cors())


app.get('/',(req,res) => {
    res.send("Hello, welcome to the very small manga collection!")
})

app.use('/mangas', mangaRoutes)

module.exports = app
