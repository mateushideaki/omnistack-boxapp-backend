const Box = require('../models/Box');

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

    async delete(req, res) {
        const box = await Box.findById(req.params.id);

        // const filePath = `${path.resolve(__dirname, '..', '..', 'tmp')}${file.path}`;
        // console.log(filePath);
        // await File.findByIdAndDelete(req.params.id);

        return res.json("Aqui");
    }
}

module.exports = new BoxController();