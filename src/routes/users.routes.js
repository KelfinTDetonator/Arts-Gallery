const router = require('./router')
const controller = require('../controllers/users.controller')

router.post('/register', controller.createUser)
router.get('/user/:id', controller.getUserById)
module.exports = router