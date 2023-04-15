const express = require('express');
const cors = require('cors');

const app = express();

const {capitalise} = require('./capitalise')
//made my own
const mangas = require('./mangas.json');

app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send("Hello, welcome to the very small manga collection!")
})

app.get('/mangas',(req,res) => {
    res.send(mangas)
})

//////////////////////////////////////////////////////////////////////////
//get manga info from json

app.get('/mangas/:id', (req,res) => {
    const id = req.params.id;
    const manga = mangas.find(manga => manga.id == id);
    console.log(manga)
    if(manga === undefined){
        //const maName = mangas.findIndex(i => i.title === manga)
        res.status(404).send({ error: `Manga with identifaction ${id} is not found`})
    }
    res.send(manga)
})

////////////////////////////////////////////////////////////////////////////

app.post('/mangas', (req, res) => {
    const ids = mangas.map(manga => manga.id)
    let maxId = Math.max(...ids)
    const manga = mangas.find(manga => manga.id == req.body.id)
  
    if (manga !== undefined) {
      res.status(409).send({error: "manga already exists"})
    } else {
      maxId += 1
      const newManga = req.body
      newManga.id = maxId
      mangas.push(newManga)
      res.status(201).send(newManga)
    }
  })

  ///////////////////////////////////////////////////////////////////////////

  app.patch("/mangas/:id", (req, res) => {
    const manga = mangas.find(manga => manga.id == req.params.id);
   
    if (manga === undefined) {
      return res.status(404).send({error: "Manga does not exist"})
    }
  //////////////////////////////////////////////////////////////////////////////////
    try {//change needed // not woring somhow for manga to id
    const updatedManga = { ...req.body, name: capitalise(req.body.name), id: manga.id};
      const idx = mangas.findIndex(m => m.id == manga.id);
      mangas[idx] = updatedManga;
      res.send(updatedManga)
    } catch (error) {
      res.status(400).send(error.message)

    }
  })

  /////////////////////////////////////////////////////////////////////////

  app.delete("/mangas/:id", (req, res) => {
    const id = req.params.id;
    const manga = mangas.find(manga => manga.id == id);
  
    if (manga === -1) {
      res.status(404).send({ error: "manga does not exist" })
    } else {
      mangas.splice(manga, 1);
  
      res.status(204).send()
    }
  })


module.exports =app;
