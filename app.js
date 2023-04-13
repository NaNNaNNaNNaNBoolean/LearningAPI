const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
//made my ownnnnn
const mangas = require("./mangas.json")

app.get('/', (req, res) => {
    res.send('Hello to the very small manga !')
  })
  
  app.get('/mangas', (req,res) => {
    
      res.send("IT READING TIME!")
      //res.send(mangas)
  })
  
//   app.get('/mangas/:id', (req,res) => {
//     const id = req.params.id;
//     const manga = mangas.find(book => book.id === id);
//       //res.send(req.params)
//       console.log(manga) //undefined
//       //res.send(manga)
//   })

/////////////////////////////////////////////////////////////////
//get manga info from json
  app.get('/mangas/:id', (req,res) => {
      //console.log(req.params.title)
      //const id = req.params.id; //for testing
      const manga = mangas.find(manga => manga.id === req.params.id); //if manga id matchs web id
      console.log(manga) //undefineddddddddd but whyyyyyyyyy
      if(manga === undefined){
        //const title = req.params.title
        const maName = mangas.findIndex(i => i.title === manga)
          res.status(404).send({error: `Manga ${maName} is not found`})
      }
      res.send(manga)
  })

  ////////////////////////////////////////////////////////////////////////////
  ////All needs further testing/////////
  
  app.post('/mangas', (req,res) => {
      const ids = mangas.map((manga) => manga.id);
      let maxId = Math.max(...ids);
      //... to work like an array
      const manga = mangas.find(manga => manga.title === req.body.title)
      if (manga !== undefined) {
          res.status(409).send({error: "Manga already exists"})
      }else{
          maxId +=1
          const newManga = req.body
          newManga.id = maxId
  
          mangas.push(newManga) //new manga who this?
  
          res.status(201).send(newManga)
  
      }
      res.status(201).send(newManga);
  })

  ///////////////////////////////////////////////////////////////////////////
  
  app.patch("/mangas/:id", (req, res) => {
      const manga = mangas.find(manga => manga.id === req.params.id);
    
      if (manga === undefined) {
        return res.status(404).send({error: "manga does not exist"})
      }
    
      try {
        const updatedManga = { ...req.body, id:req.body.title, title: manga.title}

        const maName = mangas.findIndex(i => i.title === manga.title);
        mangas[maName] = updatedManga;
        res.send(updatedManga)
      } catch (error) {
        res.status(400).send(error.message)
      }
    })

  ///////////////////////////////////////////////////////////////////////

    app.delete("/mangas/:id", (req,res)=> {
      //const ID = req.params.id; // get the id?
      const mangaIx = mangas.findIndex(manga => manga.id === req.params.id);
  
      if(mangaIx === -1){
          res.status(404).send({error: "Manga does not exist"})
      }else{
          mangas.splice(mangaIx, 1);
          res.status(204).send() //goodbye
      }
    })
  
  module.exports = app;
  