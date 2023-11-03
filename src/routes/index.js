const router = require('./router')
const users = require('./users.routes');
const collections = require('./media.routes')

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.use(users);
router.use(collections);

module.exports = router