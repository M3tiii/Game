var HTTP_OK = 200,
    HTTP_ERR_UNKNOWN = 500,
    HTTP_ERR_NOT_FOUND = 404;

var app = require('http').createServer(handler),
    fs = require('fs'),
    io = require('socket.io').listen(app),
    path = require('path');
    io.set('origins', '*:*');  //czy dziala bez tego
    
    
var User = require('./device/js/User'),
    screen_load = false;

function contentType(ext) {
    var ct;
    switch (ext) {
    case '.html':
        ct = 'text/html';
        break;
    case '.css':
        ct = 'text/css';
        break;
    case '.js':
        ct = 'text/javascript';
        break;
    default:
        ct = 'text/plain';
        break;
    }
    return {'Content-Type': ct};
}
function handler(req, res) {
    var link = !screen_load ? 'app/screen.html' : 'device/client.html'  //zamiast app/screen w 2 dac device/client
    var filepath = (req.url == '' || req.url == '/' ? link : '.' + req.url),
        fileext = path.extname(filepath); 
    
    console.log("PROŚBA O PLIK: " + filepath);

    path.exists(filepath, function (f) {
        if (f) {
            fs.readFile(filepath, function (err, content) {
                if (err) {
                    res.writeHead(HTTP_ERR_UNKNOWN);
                    res.end();
                } else {
                    res.writeHead(HTTP_OK, contentType(fileext));
                    res.end(content);
                }
            });
        } else {
            res.writeHead(HTTP_ERR_NOT_FOUND);
            res.end();
        }
    });
}

console.log('connect');
app.listen(8081);

var os = require('os')

var interfaces = os.networkInterfaces();
var addresses = [];

for (k in interfaces) {
    for (k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family == 'IPv4' && !address.internal) {
            addresses.push(address.address)
        }
    }
}

console.log(addresses)

io.on('connection', function(socket) {

    socket.on('disconnect', function() {
        console.log(socket.id + '   DISCONNECTED');
    });

    if(screen_load==false){         //connect screen
        screen_load=true;
        socket.id = 'screen';
        console.log('SCREEN   IMPLEMENTED')

    }else{                          //connect user

        new User(socket.id);

        for(var u in User.all){
            socket.id = User.all[u].id;
        }
        console.log(User.all[socket.id].id + '   LOGGED');
    
        io.sockets.emit('new', socket.id);                                      

        socket.on('key_down', function(data){
            console.log(socket.id + '   key_down: ' + data.move);  
            var package_send = {
                move: data.move,
                id: socket.id
            }
            io.sockets.emit('key_down', package_send);
        });

        socket.on('key_up', function(data){
            console.log(socket.id + '   key_up: ' + data.move);  
            io.sockets.emit('key_up');
        });


        socket.on('touch_down', function(data){
            console.log(socket.id + '   touch_down '); 
            var package_send = {
                id: socket.id
            } 
            io.sockets.emit('touch_down', package_send);
        });
        
        socket.on('touch_up', function(data){
            console.log(socket.id + '   touch_up ');  
            io.sockets.emit('touch_up');
        });

    }

});
//
