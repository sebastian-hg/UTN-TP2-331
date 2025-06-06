const subirImagen = (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }
    res.json({ mensaje: 'Imagen subida correctamente', filename: req.file.filename });
  };
  
  module.exports = {
    subirImagen,
  };
  