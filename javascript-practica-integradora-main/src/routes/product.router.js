import express from 'express';
import ProductModel from '../models/product.models.js';

import {uploader} from '../utilsMulter.js'; //Importamos el uploader previamente configurado

const router = express.Router();

//creación de un producto
router.post('/', async (req, res )=> {
    try{
        const newProduct = new ProductModel(req.body);
        console.log('Info del body: ', req.body);
        newProduct.thumbnail = req.file.path; //Agregamos la RUTA  de acceso a su respectivo archivo
        await newProduct.save();

        res.render('product', {product: newProduct.toObject()});   
        //Mongoose provides a method called toObject that transforms the document into a plain JavaScript object, 
        // copying all its own properties (including inherited ones) to the new object.
    } catch(error){
        return res.render('error', {error: 'Error al insertar producto'});
    }
});


//obtener un producto por id
//localhost:8080/product/:id
router.get('/:id', async (req, res) => {
    try{
        //metodoFindById
        const unProducto = await ProductModel.findById(req.params.id);

        if(!unProducto){
            return res.render('error', {error: 'Producto no encontrado'});
        }
        res.render('product', {product: unProducto.toObject()});

    } catch(error){
        return res.render('error', {error: 'Error al buscar un producto'});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const producto = await ProductModel.findByIdAndDelete(req.params.id);
        if(!producto){
            return res.render('error', {error: 'No se encontro el producto a eliminar'});
        }
        res.redirect('/product');
    }catch (error){
        return res.render('error', {error: 'Error al eliminar el producto'});
    }
})

router.get('/', async (req, res) => {
    try{
        const products = await ProductModel.find();

        //IF SI LA LISTA ESTA VACÍA

        res.render('products', { products : products.map( product => product.toObject() )})
    }catch (error){
        return res.render('error', {error: 'Error al obtener todos los productos'});
    }

})

export default router;