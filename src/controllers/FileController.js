const File = require('../models/File');
const Box = require('../models/Box');
const path = require('path');
const fs = require('fs');

class FileController {
    async store(req, res) {

        const box = await Box.findById(req.params.id);
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }

    async delete(req, res) {
        const file = await File.findById(req.params.id);

        const filePath = `${path.resolve(__dirname, '..', '..', 'tmp')}${path.sep}${file.path}`;
        fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log('successfully deleted');
        });
        await File.findByIdAndDelete(req.params.id);

        return res.json(file._id);
    }
}

module.exports = new FileController();