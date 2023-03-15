const router = require('express').Router()
const url = require('url')
const fs = require('fs')

const http = require('http').Server(router);
const io = require('socket.io')(http);

router.get('/*',(req,res)=>{
    const {pathname} = url.parse(req.url, true)
    const filepath = `./resource/${pathname}`
    
    const stat = fs.statSync(filepath)
    const fileSize = stat.size
    const range = req.headers.range;
	console.log(range)
    
    if(!range){
        const header = { 'Content-Type':'audio/mpeg' }
        res.writeHead(200, header);
        res.end()
    }
    else{
    	// ranage헤더 파싱
        const parts = range.replace(/bytes=/, "").split("-");
        // 재생 구간 설정
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
        const header = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Type'  : 'audio/mpeg',
            'Content-Length': fileSize-1,
        }
        res.writeHead(200, header);
        const readStream = fs.createReadStream(filepath,{start,end} )
        readStream.pipe(res);
    }
})

io.on('connection', function (socket) {
    socket.on('sound', function () {
        fs.readFile('./resource/winxp.mp3', function (err, buf) {
            socket.broadcast.emit('sound', buf);
        });
    });
});

// router.get('/*',(req,res)=>{
//     const {pathname} = url.parse(req.url, true)
//     const filepath = `./resource/${pathname}`
//     const stat = fs.statSync(filepath)
//     const fileSize = stat.size
//     const header = {
//         'Accept-Ranges': 'bytes',
//         'Content-Type'  : 'audio/mpeg',
//         'Content-Length': fileSize,
//     }
//     const range = req.headers.range;
//     console.log(range)
//     res.writeHead(200, header);
//     const readStream = fs.createReadStream(filepath)
//     readStream.pipe(res);
// })
router.post('/', function(req, res){
	res.end()
})

module.exports = router

export default router;