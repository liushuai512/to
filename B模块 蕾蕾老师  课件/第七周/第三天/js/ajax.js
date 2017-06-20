/*
 * AJAX库的扩展思路
 *   1、回去后想尽自己的一切办法,把JQ中的AJAX方法提供的二十几个参数配置以及它的意思掌握下来
 *   2、自己一个个的加入到我们的AJAX库中,然后把相关的细节操作实现,完善我们的AJAX库
 *   3、自己的完善到一定地步的时候,去看JQ中AJAX部分的实现源码,对比自己和别人的区别与不足
 */
//实现AJAX请求的方法；当一个方法传递的过多，而且不固定，我们统一使用传值法（把要传递的参数值都放在一个对象中，一起传递进来即可）
function ajax(options) {
    //把我需要使用的参数值设定一个规则和初始值
    var _default = {
        url: null,//请求地址
        type: 'get',//请求方式
        dataType: 'text',//->预设定从服务器获取回来的数据是什么格式的,text->字符串,json->JSON对象,xml->xml数据 一般服务器返回给客户端的都是JSON格式的字符串或者XML格式的字符串,我们预设的值只是把服务器返回的内容进行二次处理转换
        async: true,//请求同步还是异步,默认异步
        cache: true, //->不想走缓存传递false
        success: null,//当ready state===4,的时候执行的回调函数
        data: null//方请求主体的内容(post)
    };

    //使用用户自己传递进来的值覆盖我们的默认值
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            _default[key] = options[key];
        }
    }

//->创建AJAX对象
    var xhr = new XMLHttpRequest;
    if (/^(get|delete|head)$/i.test(_default.type)) {
        if (_default.cache === false) {
            var char = _default.url.indexOf('?') > -1 ? '&' : '?';
            //清除get出现的缓存，在末尾加+Math.random()
            _default.url += char + '_=' + Math.random();
        }
    }

//->打开请求的URL地址(配置一些基础参数
    xhr.open(_default.type, _default.url, _default.async);
    //绑定事件,用来监听AJAX状态的改变,在不同状态做不同的事情
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var result = xhr.responseText;
            switch (_default.dataType) {
                case 'json':
                    result = JSON.parse(result);
                    break;
                case 'xml':
                    result = xhr.responseXML;
            }
            _default.success && _default.success.call(xhr, result);
        }
    };
    if (/^(post|put)$/i.test(_default.type)) {
        //->如果DATA传递的是一个对象,我们需要把DATA转换为JSON字符串,扩展:获取后研究JSON.stringify不兼容的处理方式
        if (typeof _default.data === 'object') {
            _default.data = JSON.stringify(_default.data);
        }
        xhr.send(_default.data);
    } else {
        xhr.send(null);
    }
}