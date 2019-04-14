const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.get("/boxes", BoxController.showAll);
routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);
routes.delete("/boxes/:id", BoxController.delete);
routes.delete("/files/:id", FileController.delete);

routes.get('/users', (req, res) => {
    return res.send('Hello World');
});

module.exports =  routes;