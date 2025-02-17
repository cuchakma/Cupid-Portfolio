const http = require('http');
const path = require('path');
const fs   = require('fs');
const { da, el } = require('date-fns/locale');
const fsPromises = require('fs').promises;
let filePath;

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try{
        const rawData = await fsPromises.readFile(filePath, !contentType.includes('image') ? 'utf-8' : '');
        const data    = contentType == 'application/json' ? JSON.parse(rawData) : rawData; 
        response.writeHead(filePath.includes('404.html') ? 400 : 200, {'Content-Type': contentType});
        response.end(
            contentType == 'application/json' ? JSON.stringify(data) : data
        );
    } catch(e) {
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, response) => {
    const extension = path.extname(req?.url);
    let contentType;

    switch(extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType =  'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';   
    }

    let filePath = contentType == 'text/html' && req?.url == '/'
                   ? path?.join(__dirname, 'views', 'index.html')
                   : contentType == 'text/html' && req?.url?.slice(-1) == '/' 
                   ? path?.join(__dirname, 'views', req?.url, 'index.html') 
                   : contentType == 'text/html' 
                   ? path.join(__dirname, 'views', req?.url)
                   : path.join(__dirname, req?.url);

    if( !extension && req?.url?.slice(-1) != '/' ) {
        filePath += '.html';
    } 

    const fileExists = fs.existsSync(filePath);
   
    if( fileExists ) {
        serveFile(filePath, contentType, response);
    } else {
        switch(path.parse(filePath).base){
            case 'old-page.html':
                response.writeHead(301, {'location': '/new-page.html'});
                response.end();
                break;
            case 'www-page.html':
                response.writeHead(301, {'location': '/'});
                response.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', response);
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});