import { Router } from "express";

const router = Router();

//La expresión regular /[a-zA-Z]+/ significa que sólo podrá reconocer valores alfabéticos
//Agregamos en encoding url áéíóú
router.get('/word/[a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA]+', async (req, res) => {
    res.send(req.params.word);
});

//Ruta por defecto
router.get('/findWord/:word', async (req, res) => {
    if(req.word==null)
        return res.status(404).send('Palabra no encontrada');
    res.send(req.word);
});

//Ruta por defecto
router.get('*', async (req, res) => {
    res.status(404).send('Cannot get the specified word');
});

router.param('word', async (req, res, next, word) => {
    let searchWord = await dictionaryService.findWord(word);
    if (!searchWord) {
      req.word = null;
    } else {
      req.word = searchWord;
    }
    next();
});