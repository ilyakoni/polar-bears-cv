
function images(res){
    res.write('hello world')
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
        res.writeHead(200, {"Content-Type" : "text/html"});
        for (i = 0; i < images.length; i++) {
            res.write("<img src='http://localhost:8000/results/upload" + images[i] + "' />");
        }
        res.end();
    }
}