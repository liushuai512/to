var http = require('http'),
    url = require('url'),
    fs = require('fs');

var server = http.createServer(function(req,res){
    //createServer（里面也可以是是回调函数）
    //此处的函调函数不是服务创建成功就会被执行的，而是需要等到客户端向当前的服务（8080）发送请求的时候，回调函数才会被触发执行，而且发送一次请求被触发执行一次，在这个回调函数中我们需要完成每一次请求的；接受解析、资源查找、源代码返回等操作
    /*
    * 客户端（浏览器）如何向服务器发送请求的？
    *  http：//localhost：8080/  向本地8080端口对应的服务发送请求（localhost：本地服务）
    *
    *  http：//本机的IP地址：8080/  通过服务器的IP地址（外网IP、局域网IP）想当前这台主机的8080服务发送请求，真实项目中肯定是通过域名访问的
    *
    * */
    /*
    * 不仅仅触发回调函数的执行，而且默认 还传递了俩个参数值进来
    * -req:request 请求对象，里面有很多的属性和方法，存储了客户端的全部请求信息
    *   +  req.url：存储的是客户端请求的资源文件的路径名称以及问号传参的值，例如
    *
    * -res ：response 响应对象里面提供了很多的方法，可以提供服务器端把源代码返回给客户端
    *   + res。write([content]) 向客户端响应内容（相应的内容时字符串格式得）
    *   + res.end() 结束向客户端的响应
    *   + res.writeHead 重置响应头信息
    * */
    console.log('ok');
});//默认遵循的是HTTP传输协议

//给当前服务监听端口（0~65535），需要保持端口的唯一性
server.listen(8080,function (){
    //当服务创建成功，并且端口号监听成功后，就会执行回调函数，我们一般都会在这里面输出一句话，提示开发者创建成功
    console.log('sever is success,listening on 8080 port!')
});//给当前服务监听端口号（0~65535），需要保持端口的唯一性










/*
* 监听端口
* server.listen([port],[callback]); 给当前服务监听端口
* @parameters:
*     [port] : 端口号
*     [callback] : .....
* @
* */