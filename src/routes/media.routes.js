const router = require('./router');
const controller = require('../controllers/collection.controller')
const storage = require('../middlewares/multer');

router.get('/upload/images', (req, res)=> {
    return res.render('form')
})
router.get('/gallery', controller.getCollections)
router.get('/gallery/:id', controller.getDetailCollectionByUserId)
router.post('/upload/images', storage.upload.single('photo'), controller.uploadCollection);

//upload to imagekit.io

const multer = require('multer')();
const imagekitController = require('../controllers/imageKit.controller')
router.post('/imagekit', storage.upload.single('photo') , imagekitController.imageKitUpload)

module.exports = router