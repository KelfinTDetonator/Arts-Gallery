const router = require('./router')
const controller = require('../controllers/users.controller')


router.post('/register', controller.createUser)

module.exports = router