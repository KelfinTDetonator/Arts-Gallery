require('dotenv').config()
const {app, createError} = require('./app')
const PORT = process.env.PORT;

//routes
const indexRoute = require('./src/routes/index')
app.use('/api/v1', indexRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
    console.error(err.stack)
});

app.listen(PORT, ()=>{
    console.log(`Server is listening to http://localhost:${PORT}/api/v1`);
})
