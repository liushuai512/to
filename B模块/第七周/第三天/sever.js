// 1 刀肉需要的内置模块，里面有三个，放带个代码
var http = require('http');
var url = require('url');
var fs = require('fs');

// 2 创建服务监听端口
var sever = http.createServer(function (req, res) {
        //3 解析客户端请求的地址和内容
        var urlObj = url.parse(req.url, true),
            pathname = urlObj.pathname,
            query = urlObj.query;

        //
        /*
         * 静态资源文件请求处理（HTML,CSS,JS,IMG(PNG,JPG,GIF...),TXT....）
         * - 所有的静态资源文件都有一个共同的特征；都有后缀名，后缀名是由字母和数字组成的
         * - 分析规律得到，服务器端需要查找文件的路径地址只是在pathname前面加一个点即可
         * - zai 客户端向我们服务器发送请求的时候，谷歌浏览器会默认请求一个图片“favicon.ico”,但是在我们的服务器上是没有这张图片的，所以在使用FS查找内容的时候找不到，导致后台服务器报错==>如果客户端请求的资源文件在服务器上不存在，我们不能终止服务（不能让服务器抛异常），只需要返回不存在即可；
         * - 在IE浏览器中有问题，服务器端返回给客户端的都是字符串格式的数据（不管是HTML/CSS/JS...），对于谷歌浏览器来说，他比较智能，会自动识别当前代码是什么类型的代码，然后进行解析和渲染，但是IE浏览器比较的弱智，不能识别具体的文件类型，都当成字符串了；
         *
         * 解决办法：需要我们在返回数据给客户端的时候，指定当前文件的MIME类型，告诉IE是什么类型的即可
         * MIME
         * HTML text/html
         *
         *
         * */

        var reg = /\.([0-9a-zA-Z]+)/i;
        if (reg.test(pathname)) {
            var conFile = null;
            try {
                conFile = fs.readFileSync('.' + pathname);
            } catch (e) {
                conFile = 'not';
            }

            // 根据当前请求资源文件的后缀名，计算出文件的MIME类型
            var suffix = reg.exec(pathname)[1].toUpperCase(),
                suffixMIME = 'text/plain';
            switch (suffix) {
                case 'HTML':
                    suffixMIME = 'text/html';
                    break;
                case 'CSS':
                    suffixMIME = 'text/css';
                    break;
                case 'JS':
                    suffixMIME = 'text/javascript';
                    break;
            }

            //在返回数据内容之前指定MIME类型（重写响应头）
            res.writeHead(200,{

            });
            res.end(conFile);//返回给客户端的是字符串格式的
        }
        //如果客户端想要的是
        /*if(pathname === '/index.html'){
         var conFile=fs.readFileSync('./index.html');//把读取的内容付给一个变量

         res.end(conFile);*/ //如果只需要返回一次内容，可以合并在一起写，返回的同时也告诉客户端返回结束了 res.end(conFile);

    })
    ;
sever.listen(8081, function () {
    console.log('ok 8081 port!')
});

