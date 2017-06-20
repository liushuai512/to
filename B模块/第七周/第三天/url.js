/**
 * Created by lenovo on 2017/2/23.
 */
var url = require('url');
var str="http://www.zhufengoeixun.cn:80/school/login.html?a=12&b=13#C";
console.log(url.parse(str));


/*
* parse解析方法
* */

/*
Url {
 protocol: 'http:',//传输协议
 slashes: true,
 auth: null,
 host: 'www.zhufengoeixun.cn:80',
 port: '80',
 hostname: 'www.zhufengoeixun.cn',
 hash: '#C',
 search: '?a=12&b=13',//问号传参（string） 带问号
 query: 'a=12&b=13',//问号传参（string） 不带问号
 pathname: '/school/login.html',//资源文件的路径和名称
 path: '/school/login.html?a=12&b=13', // pathname+search
 href: 'http://www.zhufengoeixun.cn:80/school/login.html?a=12&b=13#C' //原始解析的URL地址
 }
* */
console.log(url.parse(str,true));
/*
 Url {
 ...
 query: { a: '12', b: '13' },//第二个参数传递true，会把问号传递的值进行解析，以对象的方式来存储
 pathname: '/school/login.html',
 ...

*/