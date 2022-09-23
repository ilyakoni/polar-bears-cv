
const express = require('express');
let app = express();
const fs = require('fs')
const multer = require('multer')




app.use('/',express.static(__dirname + '/public'));

//index страница
app.get('/', function (req, res) {
    res.send('Hello World');
})


// Отрисовка формы загрузки сайта

path = __dirname+'/public/results/upload';
const upload = multer({dest:path})
console.log(path)
//POST клиента датасета на сервер
app.post('/upload',upload.any('photos'), function(req, res) {
    res.redirect('/results')
});



const port = 8000;
app.listen(port);
console.log(`listening on port ${port}`)