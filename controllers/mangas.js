const Manga = require("../models/Manga")

  const index = async (req, res) => {
    const mangas = Manga.all;
    //console.log(mangas)
    res.send(mangas)
  }
  const show = async(req,res) => {
    try{
      const mangaId = parseInt(req.params.id)
      const manga = await Manga.findById(mangaId);
      res.send(manga)
    }  catch (err) {
      res.status(404).send("manga not found")
    }
  }
  const create = async(req,res) => {
    try{
      const newManga = await Manga.create(req.body);
      res.status(201).send(newManga)
    }catch(err){
      res.status(422).json({err})
    }
  }
  const update = async (req,res) => {
    try {
      const mangaId = parseInt(req.params.id);
      const manga = await Manga.findById(mangaId);
      const updatedManga = await manga.update(req.body);
      //res.send(updatedManga)
      res.status(201).json(updatedManga)
    }catch(err) {
      res.status(404).send({error: "Manga does not exist"})}
  }  

  const destory = async (req,res) => {
    try{
      const MangaId = parseInt(req.params.id);
      const manga = await Manga.findById(MangaId);
      await manga.destory()
      res.sendStatus(204)
    }catch(err){
        res.status(404).send({error: err.message})
    }
  }

  module.exports = {index, show, create, update,destory }

  