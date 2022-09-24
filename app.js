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
    spawnSync('python', ['child_process.py'])
    res.redirect('/results')
});
app.get('/results', function(req, res){
    res.write('<link rel="stylesheet" href="style.css"><script src="script.js"></script>')
    console.log('hello')
    fs.readdir(__dirname+'/public/results/upload', function(err, files) {
        if (err) throw err;
        var results = [];

        files.forEach(function(file)  {
            results.push(file);
            console.log(file)
        });
        showImages(results);
    });

    function showImages(images) {
        for (i = 0; i < images.length; i++) {
            res.write(`<div class='imageContainer'><a target="_blank" href='/results/upload/${images[i]}' type="image"><img width=512px height=512px src='/results/upload/${images[i]}' align=bottom></a><p>${__dirname+'results/upload/'+images[i]}</p></div>`);
        }
        
        for (i=0; i<images.length;i++){
            res.write(`<script type="text/javascript">magnify(5,${i})</script>`)
    }
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