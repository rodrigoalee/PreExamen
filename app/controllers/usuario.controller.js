const db = require('../config/db.config.js');
const Usuario = db.Usuario;

// Crear un nuevo usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.telefono = req.body.telefono;
        usuario.direccion = req.body.direccion;
        usuario.fecha_registro = req.body.fecha_registro;
        usuario.estado = req.body.estado;

        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el usuario!",
            error: error.message
        });
    }
};

// Obtener todos los usuarios
exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarioInfos => {
            res.status(200).json({
                message: "¡Usuarios obtenidos exitosamente!",
                usuarios: usuarioInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los usuarios!",
                error: error
            });
        });
};

// Obtener un usuario por ID
exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id_usuario;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            res.status(200).json({
                message: "Usuario obtenido exitosamente con id = " + usuarioId,
                usuario: usuario
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener usuario con id!",
                error: error
            });
        });
};

// Actualizar un usuario por ID
exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id_usuario;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario para actualizar con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                estado: req.body.estado
            };
            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar el usuario con id = " + req.params.id_usuario,
                    error: "No se pudo actualizar el usuario",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa del usuario con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el usuario con id = " + req.params.id_usuario,
            error: error.message
        });
    }
};

// Eliminar un usuario por ID
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id_usuario;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe el usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del usuario con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el usuario con id = " + req.params.id_usuario,
            error: error.message,
        });
    }
};
