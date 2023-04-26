const mangas = require("../data/mangas")

class Manga {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.state = data.state
        this.NicolesRating = data.NicolesRating
    }
    static get all() {
        return mangas.map(mangaData => new Manga(mangaData))
      }

    static async findById(mangaId){
        try{
            const manga = mangas.find(manga => manga.id === mangaId);
            return new Manga(manga)
        }catch (err) {
            res.status(404).send({error:err.message})
        }
    }

    static async create(data){
        try{
            let nextId
            mangas.length
            ? nextId = mangas.reduce((m1, m2) => m1.id > m2.id ? m1:m2).id +1
            : nextId = 1

            if(!data.title||!data.state){
                throw new Error('you need both a title and an a status of if its complete or not')
            };

            const newManga = new Manga({id: nextId, ...data});
            mangas.push(newManga)
            return newManga
        }catch(err){
            throw(err.message)
        }
    }
    async update(data){
        const manga = mangas.find(manga => manga.id === this.id);
        try {
            manga.title = data.title;
            manga.state = data.state;
            manga.NicolesRating = data.NicolesRating;
            return new Manga(manga)
        } catch (error) {
            res.status(404).send(error.message)
        }
    }
    
    async destory(){
        const manga = mangas.find(m => m.id === this.id);

        if(manga){
            const mangaIdx = mangas.indexOf(manga);
            mangas.splice(mangaIdx,1)
        }else{
            throw new Error('manga not found')
        }
    }

}

module.exports = Manga;
