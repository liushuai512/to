/**
 * Created by lenovo on 2017/2/24.
 */



////导入需要的内置模块
//var http=require('http'),
//    url=require('url'),
//    fs=require('fs');
//
////创建服务器端口
//var server = http.createServer(function (req, res) {
//    //解析客户端请求的地址和传递的内容
//    var urlObj = url.parse(req.url, true),//通过req.url获取到客户端请求的地址，在使用url.parse进行解析，最后得到我们想要的内容
    //true 请求的数据以键值对形式返回
//        pathname = urlObj.pathname,//pathname 客户端请求资源文件的路径和名称
//        query = urlObj.query;//存储的是客户端通过问号传参的方式传递给服务器的内容
//
//    //如果客户端想要的是index.html，所以需要获取到页面中的代码，并且返回给客户端
//    var reg = /\.([0-9a-zA-Z]+)/i;
//    if (reg.test(pathname)) {//通过正则匹配客户端服务是否存在
//        var conFile=null,
//            status=200;
//        try{
//            conFile=fs.readFileSync('.'+pathname);//同步读取指定文件中的内容，读取出来的都是字符串格式的
//        }catch (e){
//            conFile='not';
//            status=404;
//        }
//        //根据当前请求资源文件的后缀名，计算文件的MIME类型
//        var suffix=reg.exec(pathname)[1].toUpperCase(),//捕获pathname这个对象中索引为1的第一个分组，并且转化为大写
//            suffixMIMX='text/plain';//默认是纯字符串文本（.txt）
//        switch(suffix){
//            case 'HTML':
//                suffixMIMX='text/html';
//                break;
//            case 'CSS':
//                suffixMIMX='text/css';
//                break;
//            case 'JS':
//                suffixMIMX='text/javascript';
//                break;
//        }
//
//        res.writeHead(status,{//重写响应头
//            //res.write([content]) 向客户端响应内容（响应的内容时字符串格式的）
//            'content-type':suffixMIMX+';charset=utf-8;'
//
//        });
//        //基于参数res提供的方法，把内容返回给客户端
//        res.end(conFile);//结束客户端的响应
//
//    }
//});
////给当前服务监听端口（0~65535），需要端口保持唯一性
//server.listen(8010,function(){
//    //当服务创建成功并且端口号监听成功后，就会执行这个回调函数，在这里可以输出一句话，题型开发者或者创建者
//    console.log('ok');
//});

var http=require('http'),
    url=require('url'),
    fs=require('fs');
var server=http.createServer(function(req,res){
    var urlObj=url.parse(req.url,true),
        pathname=urlObj.pathname,
        query=urlObj.query;
    var reg=/\.([0-9a-zA-Z]+)/i;
    if(reg.test(pathname)){
        var conFile=null,
            status=200;
        try{
            conFile=fs.readFileSync('.'+pathname);
        }catch (e){
            conFile='not';
            status=404;
        }
        var suffix=reg.exec(pathname)[1].toUpperCase(),
            suffixMIME='text/plain';
        switch (suffix){
            case 'HTML':
                suffixMIME='test/html';
                break;
            case 'CSS':
                suffixMIME='test/css';
                break;
            case 'JS':
                suffixMIME='test/javascript';
                break;
        }
        res.writeHead(status,{
            'content-type':suffixMIME+';charset=utf-8;'
        });
        res.end(conFile);
    }
});
server.listen(7080,function(){
    console.log('ok')
});