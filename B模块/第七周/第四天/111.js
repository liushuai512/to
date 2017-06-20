/**
 * Created by lenovo on 2017/2/25.
 */
//创建AJAX对象
var xhr=new XMLHttpRequest();//通过http发送一个请求，得到XML； 造IE6及更低版本浏览器中不兼容（new ActiveXObject）
// var xhr =new XMLHttpRequest();  IE6以上
//  var xhr=new ActiveXObject();  IE6以下
//打开一个URL地址（配制请求的基本信息）
//[
// [请求方式]：get delete head post put...
// [请求的URL地址]
// [同步或者异步] 默认值是  true 代表异步编程，false 同步编程
//设置请求的用户名密码；提供安全权限的验证（一般不用）
xhr.open('get','temp.xml',true,[userName],[userPass]);

//xhr.setRequestHeader('key','Value');//
//监听AJAX状态的改变。获取到服务器返回的数据
xhr.onreadystatechange=function(){
    //xhr.readyState:AJAX 请求的状态0 1 2 3 4
    //xhr.status  服务器返回的网络状态码，不同的状态码代表了服务器返回的不同结果
    if(xhr.readyState === 4 && xhr.status===200){
        //xhr.responseText 获取服务器端响应主体内容，也就是把服务器返回的内容获取到，获取的结果是一个字符串
        //xhr.responseXML 和上面一样都是响应主题的内容，只不过获取到的格式是XML格式的数据

        //获取响应头的俩种方式
        xhr.getResponseHeader('key');
        xhr.getAllResponseHeaders();

    }

};
// 发送请求：括号中传递的内容就是客户端通过请求主体把内容传递给服务器
xhr.send(null);