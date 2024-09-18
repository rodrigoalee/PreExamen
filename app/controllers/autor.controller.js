const db = require('../config/db.config.js');
const Autor = db.Autor;

// Crear un nuevo autor
exports.create = (req, res) => {
    let autor = {};

    try {
        autor.nombre = req.body.nombre;
        autor.apellido = req.body.apellido;
        autor.nacionalidad = req.body.nacionalidad;
        autor.fecha_nacimiento = req.body.fecha_nacimiento;

        Autor.create(autor).then(result => {
            res.status(200).json({
                message: "Autor creado exitosamente con id = " + result.id_autor,
                autor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el autor!",
            error: error.message
        });
    }
};

// Obtener todos los autores
exports.retrieveAllAutores = (req, res) => {
    Autor.findAll()
        .then(autorInfos => {
            res.status(200).json({
                message: "¡Autores obtenidos exitosamente!",
                autores: autorInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los autores!",
                error: error
            });
        });
};

// Obtener un autor por ID
exports.getAutorById = (req, res) => {
    let autorId = req.params.id_autor;
    Autor.findByPk(autorId)
        .then(autor => {
            res.status(200).json({
                message: "Autor obtenido exitosamente con id = " + autorId,
                autor: autor
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener autor con id!",
                error: error
            });
        });
};

// Actualizar un autor por ID
exports.updateById = async (req, res) => {
    try {
        let autorId = req.params.id_autor;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No se encontró el autor para actualizar con id = " + autorId,
                autor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacionalidad: req.body.nacionalidad,
                fecha_nacimiento: req.body.fecha_nacimiento
            };
            let result = await Autor.update(updatedObject, { returning: true, where: { id_autor: autorId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar el autor con id = " + req.params.id_autor,
                    error: "No se pudo actualizar el autor",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa del autor con id = " + autorId,
                autor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el autor con id = " + req.params.id_autor,
            error: error.message
        });
    }
};

// Eliminar un autor por ID
exports.deleteById = async (req, res) => {
    try {
        let autorId = req.params.id_autor;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No existe el autor con id = " + autorId,
                error: "404",
            });
        } else {
            await autor.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del autor con id = " + autorId,
                autor: autor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el autor con id = " + req.params.id_autor,
            error: error.message,
        });
    }
};