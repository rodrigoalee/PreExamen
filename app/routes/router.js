let express = require('express');
let router = express.Router();

const usuarioController = require('../controllers/usuario.controller.js');
const libroController = require('../controllers/libro.controller.js');
const autorController = require('../controllers/autor.controller.js');

router.post('/api/usuarios/create', usuarioController.create);
router.get('/api/usuarios/all', usuarioController.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id_usuario', usuarioController.getUsuarioById);
router.put('/api/usuarios/update/:id_usuario', usuarioController.updateById);
router.delete('/api/usuarios/delete/:id_usuario', usuarioController.deleteById);

router.post('/api/libros/create', libroController.create);
router.get('/api/libros/all', libroController.retrieveAllLibros);
router.get('/api/libros/onebyid/:id_libro', libroController.getLibroById);
router.put('/api/libros/update/:id_libro', libroController.updateById);
router.delete('/api/libros/delete/:id_libro', libroController.deleteById);

router.post('/api/autores/create', autorController.create);
router.get('/api/autores/all', autorController.retrieveAllAutores);
router.get('/api/autores/onebyid/:id_autor', autorController.getAutorById);
router.put('/api/autores/update/:id_autor', autorController.updateById);
router.delete('/api/autores/delete/:id_autor', autorController.deleteById);

module.exports = router;