'use strict';

const http = require('http');
const https = require('https');

function hey() {
    return `Hello World`;
};

const add = (number1, number2) => {
    return number1 + number2;
};

//On exporte les fonctions qui vont être testés dans demoSpec.js
module.exports = {
    hey,
    add,
    getURLStatus: function(url, callback) {
        http.get(url, res => {
            const { statusCode } = res;
            //= res.statusCode 
            callback(statusCode);

        });
    },
    getObject: function(url, callback) {
        https.get(url, res => {
            callback(res);
        });
    },
    getAllObject: function(url, callback) {
        https.get(url, res => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);

                    callback(parsedData);
                    // console.log(parsedData);
                    //   return parsedData; 
                }
                catch (e) {
                    console.error(e.message);
                }

            });
        });

    },
    getGenderProperty: function(object, callback) {
        https.get(object, res => {
            const { Objectstatus } = res;
            //= res.statusCode 
            callback(Objectstatus);

        });
    },
};


// module.exports.getURLStatus('http://www.google.fr', function (code) {
//     console.log('JYO: test url', code) 
// });

//Le callback, fonction stocké dans une variable.
//C'est l'instruction donné à la fonction 
//une fois que la requête sera traité