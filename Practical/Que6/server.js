var fs = require('fs')
var unzip = require('zlib')


fs.createReadStream('../Que5/test.txt.gz')
    .pipe(unzip.createGunzip())
    .pipe(fs.createWriteStream('./test.txt'));


console.log('File Decompressed..!!');