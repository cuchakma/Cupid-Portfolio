const express = require('express');
const router  = express.Router();
const path    = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,  '..', 'views', 'index.html'));
});

// router.get('/test(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'test.html'));
// });

// router.get('/new-page(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
// });

// router.get('/old-page(.html)?', (req, res) => {
//     res.redirect(301,'new-page.html');
// });

// router.get('/hello(.html)?', (req, res, next) => {
//     console.log('Attempted To Load Hello.html')
//     next();
// }, (req, res) => {
//     res.send('Hello World');
// });


// const one = (req, res, next) => {
//     console.log('one request');
//     next();
// }

// const two = (req, res, next) => {
//     console.log('two request');
//     next();
// }

// const three = (req, res, next) => {
//     console.log('three request');
//     res.send('Response 3');
// }

// app.get('/chain(.html)?', [one, two, three]); // chaining request for response

router.get('/*', (req, res) => {
    if(req.accepts())
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});


module.exports = router;