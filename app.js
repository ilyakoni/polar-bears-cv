
const express = require('express');
let app = express();
const fs = require('fs')
const multer = require('multer')
const open = require('open')
const { spawnSync } = require ('child_process');
const url = require('url')
const http=require('http')

//Создаем Static для определения корневой папки сайта
app.use('/',express.static(__dirname + '/public'));

//Задаем путь и создаем инстанцию Multer для работы с обработкой POST метода, состоящего из нескольких файлов
path = __dirname+'/public/results/upload';
const upload = multer({dest:path})
console.log(path)

//POST метод после вызова  /upload
app.post('/upload',upload.any('photos'), function(req, res) {
    spawnSync('python', ['public/results/child_process.py'])
    res.redirect('/results')
});
app.get('/results', function(req, res){
    res.write(`<meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script><link rel="stylesheet" href="style.css"> <script src="script.js"></script><link rel="stylesheet" href="/results/bootstrap-magnify/css/bootstrap-magnify.css"> `)
    console.log('hello')
    fs.readdir(__dirname+'/public/results/AppTest/first', function(err, files) {
        if (err) throw err;
        var results = [];

        files.forEach(function(file)  {
            results.push(file);
            console.log(file)
        });
        showImages(results);
    });

    function showImages(images) {
        res.write('<table class="table table-image"><tr><th scope="col">id</th><th scope="col">Изображение</th><th scope="col">Путь</th></tr>')
        for (i = 0; i < images.length; i++) {
            
            res.write(`<th scope="row">${i}</th><td><div class='imageContainer'><a target="_blank" href='/results/AppTest/first/${images[i]}' type="image"><img data-toggle="magnify" class="img-fluid img-thumbnail" src="/results/AppTest/first/${images[i]}"/></a></td><td><p>${__dirname+'/results/AppTest/first/'+images[i]}</p></div></td></tr>`);

        }
        
        res.write(`<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script><script src="/results/bootstrap-magnify/js/bootstrap-magnify.min.js"></script>  `)
        
        res.end();
    }
}
)
app.get(`/results/upload/*`, function(req, res){
    adr=req.url;
    res.write(`<img src='${adr}'></img>`)
})
//Создаем прослушку на порту и запускаем браузер с ссылкой на сайт
const port = 8000;
app.listen(port);
console.log(`listening on port ${port}`)
open(`http://localhost:${port}`)