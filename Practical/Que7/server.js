
var fs = require('fs/promises')

function readFile(fpath)
{
    return new Promise(function(success,fail)
    {
        fs.unlink(fpath,(err,data) =>
        {
            if(err)
                fail(err)
            else
                success(data)    
        })
    })
}

readFile('./test.txt').then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})




