var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const port = process.env.PORT||8080;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
mongoose.set('useFindAndModify', false);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
import cors from 'cors';
//const mongo_uri = 'mongodb://localhost/react-listtsk';
const mongo_uri = 'mongodb+srv://yogesh:N032084@cluster0-cj3wh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
	console.log(`App listening on PORT: ${port}`)
})


module.exports = app;
