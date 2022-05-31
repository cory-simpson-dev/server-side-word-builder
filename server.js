const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const consonant = 'bcdfghjklmnpqrstvwxyz'.split('');
const vowel = 'aeiou'.split('')
let getCons = () => consonant[Math.floor(Math.random()*20)];
let getVow = () => vowel[Math.floor(Math.random()*5)];

const server = http.createServer((req, res) => {
  const readWrite = (file, contentType) => {
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      res.end();
    });
  }

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);

  switch (page) {
    case '/':
      readWrite('index.html', 'text/html'); 
      break;
    case '/api':
      let getCVC = 'input consonant-vowel-consonant'
      let getVP = 'input vowel-pair'
      let getHA = 'input hyphen-apostrophe'
      if(params['key'] == 'cvc'){
        getCVC = `${getCons()}${getVow()}${getCons()}`
      } else if(params['key'] == 'vp'){
        getVP = `${getVow()}${getVow()}`
      } else if(params['key'] == 'ha'){
        getHA = `${Math.random() > 0.5 ? "-" : "'"}`
      } 
      res.writeHead(200, {'Content-Type': 'application/json'});
      const objToJson = {
        cvc: getCVC,
        vp: getVP,
        ha: getHA
        }
        res.end(JSON.stringify(objToJson));
      break;
    case '/css/main.css':
      fs.readFile('css/main.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break;
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript'); 
      break;
    default:
      figlet('Whoops, you wanted more?', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break;
  }; 
})

server.listen(8000);