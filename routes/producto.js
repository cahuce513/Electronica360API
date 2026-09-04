const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Consultar todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Crear un producto
router.post('/', async (req, res) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        precio: req.body.precio,
        stock: req.body.stock,
        marca: req.body.marca
    });

    try {
        const productoGuardado = await producto.save();
        res.json(productoGuardado);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Consultar un producto por ID
router.get('/:productoId', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.productoId);
        res.json(producto);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Eliminar un producto por ID
router.delete('/:productoId', async (req, res) => {
    try {
        const productoEliminado = await Producto.deleteOne({
            _id: req.params.productoId
        });
        res.json(productoEliminado);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Actualizar un producto por ID
router.patch('/:productoId', async (req, res) => {
    try {
        const productoActualizado = await Producto.updateOne(
            { _id: req.params.productoId },
            {
                $set: {
                    nombre: req.body.nombre,
                    categoria: req.body.categoria,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    marca: req.body.marca
                }
            }
        );
        res.json(productoActualizado);
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;