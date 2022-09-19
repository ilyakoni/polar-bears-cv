let express = require('express');
let fileUpload = require('express-fileupload');
let app = express();
let fs = require('fs')


app.use(fileUpload({}));

app.use('/',express.static(__dirname + '/public'));


//index страница
app.get('/', function (req, res) {
    res.send('Hello World');
})


// Отрисовка формы загрузки сайта
app.get('/form', function (req, res) {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.write('<form action="/upload" method="POST" enctype="multipart/form-data" >');
    res.write('<input type="file" name="dataset">');
    res.write('<input type="submit">');
    res.write('</form>');
    res.end();
})


//POST клиента датасета на сервер
app.post('/upload', function(req, res) {
    req.files.dataset.mv(__dirname+'/public/results/data.csv');
    res.redirect('/results')
    console.log(req.files.dataset); // the uploaded file object

});



const port = 8000;
app.listen(port);
console.log(`listening on port ${port}`)