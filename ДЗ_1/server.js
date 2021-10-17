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
            fs.writeFileSync(__dirname + '\\last_request.dat', buf);
            response.writeHead(200);
            response.end(data);
        }); 
    } else if (request.url == '/last_req.html' || request.url == '/last_req.html?') {
        var data     = fs.readFileSync(__dirname + '\\last_req.html', 'utf-8');
        var lrequest = fs.readFileSync(__dirname + '\\last_request.dat', "utf-8");

        let  origin = 0;
        let limiter = 0;

        let    buf = [];

        for (let i = 0; i < 5; i++) {
            if ((origin = lrequest.indexOf('=', limiter)) != -1) {
                limiter = lrequest.indexOf('&', limiter);
                buf[i] = lrequest.slice(++origin, limiter);         // (++origin) skip a '=' symbol
                origin++; limiter++;
            }
        }

        var view = {
            Name:    buf[0],
            Tel:     buf[1],
            Date:    buf[2],
            Brand:   buf[3],
            Problem: buf[4]
        };

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