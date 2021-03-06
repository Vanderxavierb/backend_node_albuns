const express = require('express');

const router = express.Router();

module.exports = router;

const albuns = [
    {
        id: 1,
        artista: "Legião Urbana",
        titulo: "II",
        imagem:"https://www.vagalume.com.br/legiao-urbana/discografia/dois.jpg",
        genero: "Rock",
        nota: 8,
        status: false,
        statuscolor: "grey"
    },
    {
        id: 2,
        artista: "Racionais MC'S",
        titulo: "Sobrevivendo no Inferno",
        imagem:"https://www.vagalume.com.br/racionais-mcs/discografia/sobrevivendo-no-inferno.jpg",
        genero: "Rap",
        nota: 5,
        status: false,
        statuscolor: "grey"

    },
    {
        id: 3,
        artista: "Milionário e José Rico",
        titulo: "Sentimental Demais",
        imagem: "https://www.vagalume.com.br/milionario-e-jose-rico/discografia/sentimental-demais.jpg",
        genero: "Sertanejo",
        nota: 10,
        status: false,
        statuscolor: "grey"

    },
    {
        id: 4,
        artista: "Djavan",
        titulo: "Lilás",
        imagem: "https://www.vagalume.com.br/djavan/discografia/lilas.jpg",
        genero: "MPB",
        nota: 6,
        status: false,
        statuscolor: "grey"
    }
]


router.get('/', (req,res) => {
    res.send(albuns);
});

router.get("/:id", (req,res) =>{
    const idParam = req.params.id;
    const album = albuns.find(album => album.id == idParam); 
    res.send(album);
});

router.post('/add',(req,res) =>{
    const novoAlbum = req.body;
    novoAlbum.id = albuns[albuns.length -1].id + 1;
    novoAlbum.status = false;
    novoAlbum.statuscolor = "grey"
    albuns.push(novoAlbum);
    res.send({
        albuns,
        message: `Álbum ${novoAlbum.titulo} cadastrado com sucesso!`
    });
});

router.put('/edit/:id',(req,res) =>{
    const idParam = req.params.id;
    const novoAlbum = req.body;
    let index = albuns.findIndex(album => album.id == idParam);
    albuns[index] = {
        ...albuns[index],
        ...novoAlbum
    }
    res.send({
        albuns,
        message: `Álbum ${novoAlbum.titulo} editado com sucesso`
    });
});


router.delete('/delete/:id',(req,res) =>{
    const idParam = req.params.id;
    const index = albuns.findIndex(album => album.id == idParam);
    const nome = albuns[index];
    albuns.splice(index, 1);
    res.send({
        message: `Album ${nome.titulo} excluido com sucesso !`,
    })
});

router.put('/:status/:id',(req,res) =>{
    const idParam = req.params.id;
    let statusParam = req.params.status;
    let statusParamBool = (statusParam == 'true')
    let index = albuns.findIndex(album => album.id == idParam);
    albuns[index].status = statusParamBool
    albuns[index].statuscolor === "grey" ? albuns[index].statuscolor = "green" : albuns[index].statuscolor = "grey";
    
    const albumModificado = albuns[index]
    res.send({
        albumModificado
    });
});