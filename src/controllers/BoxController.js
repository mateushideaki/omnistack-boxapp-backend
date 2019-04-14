const Box = require('../models/Box');
const path = require('path');
const fs = require('fs');

class BoxController {
    async store(req, res) {
        const box = await Box.create(req.body);
        return res.json(box);
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });
        return res.json(box);
    }

    async showAll(req, res) {
        const boxes = await Box.find();
        return res.json(boxes);
    }

    async delete(req, res) {
        const box = await Box.findById(req.params.id).populate('files');

        if (!box) {
            return res.status(404).send({ error: 'Box not found' });
        }

        box.files.forEach(file => {

            const filePath = `${path.resolve(__dirname, '..', '..', 'tmp')}${path.sep}${file.path}`;

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log('successfully deleted');
                });
            } 

        });

        await Box.findByIdAndDelete(req.params.id);

        return res.json(box._id);
    }
}

module.exports = new BoxController();