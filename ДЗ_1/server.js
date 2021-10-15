const http = require("http");
var fs = require("fs");
var mustache = require("mustache");
const port = 3000;
 
http.createServer(function(request, response){
    if(request.url == '/index.html' || request.url == '/index.html?') {
        var data = fs.readFileSync(__dirname + '\\index.html', 'utf8');

        response.writeHead(200);
        response.end(data);
    } else if(request.url == '/form_submit.html') {
        var data = fs.readFileSync(__dirname + '\\form_submit.html', 'utf8');

        let buf = '';
        request.on('data', chunk => {
            buf = chunk;
        }); 
            
        request.on('end', chunk => {
            fs.writeFileSync(__dirname + '\\1.txt', buf);
            response.writeHead(200);
            response.end(data);
        }); 
    } else if (request.url == '/last_req.html' || request.url == '/last_req.html?') {
        var data = fs.readFileSync(__dirname + '\\last_req.html', 'utf-8');
        var lrequest = fs.readFileSync(__dirname + '\\1.txt', "utf-8");
        
        let  name = '';
        let   tel = '';
        let  date = '';
        let brand = '';
        let  info = '';

        let  origin = 0;
        let limiter = 0;

        if ((origin = lrequest.indexOf('name=')) != -1) {
            limiter = lrequest.indexOf('&');
            name = lrequest.slice(origin + 5, limiter);
        }

        if ((origin = lrequest.indexOf('telephone=')) != -1) {
            limiter = lrequest.indexOf('&', limiter + 1);
            tel = lrequest.slice(origin + 10, limiter);
        }

        if ((origin = lrequest.indexOf('date=')) != -1) {
            limiter = lrequest.indexOf('&', limiter + 1);
            date = lrequest.slice(origin + 5, limiter);
        }

        if ((origin = lrequest.indexOf('brand=')) != -1) {
            limiter = lrequest.indexOf('&', limiter + 1);
            brand = lrequest.slice(origin + 6, limiter);
        }

        if ((origin = lrequest.indexOf('problem=')) != -1) {
            limiter = lrequest.indexOf('&', limiter + 1);
            info = lrequest.slice(origin + 8, limiter);
        }

        //console.log(name + "\n" + tel + "\n" + date + "\n" + brand + "\n" + info);
        var view = {
            Name: name,
            Tel: tel,
            Date: date,
            Brand: brand,
            Problem: info
        };

        response.writeHead(200);
        response.end(mustache.render(data, view));
    } else {
        fs.readFile(__dirname + request.url, function (err, data) {
            if (err) {
                response.writeHead(404);
                response.end(JSON.stringify(err));
                return;
            }

            response.writeHead(200);
            response.end(data);
        });
    }
}).listen(port);