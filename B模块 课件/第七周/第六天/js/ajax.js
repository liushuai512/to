~function () {
    function ajax(option) {
        //->init parameters
        var _default = {
            url: null,
            method: 'GET',
            dataType: 'JSON',
            data: null,
            async: true,
            cache: true,
            success: null,//->success callback
            error: null//->error callback
        };
        for (var key in option) {
            if (option.hasOwnProperty(key)) {//option里是否存在key
                if (key === 'type') {//key是否等于type
                    _default['method'] = option['type'];//如果上面条件满足，执行
                    continue;
                }
                _default[key] = option[key];
            }
        }

        //->data && cache
        var regGET = /^(GET|DELETE|HEAD)$/i,
            mark = null;

        if (_default.data) {
            //->If it is an object, we convert it to a string
            if (typeof _default.data === 'object') {//检测data是否是object
                var str = '';
                for (var attr in _default.data) {
                    if (_default.data.hasOwnProperty(attr)) {//data里是否存在attr
                        str += attr + '=' + _default.data[attr] + '&';//拼接字符串
                    }
                }
                _default.data = str.substring(0, str.length - 1);//截取所有的字符串长度
            }
            //判断是get还是 post请求
            if (regGET.test(_default.method)) {
                mark = checkMark(_default.url);//判断是？还是&
                _default.url += mark + _default.data;//问号传参，或者&链接
                _default.data = null;//请求主体为null
            }
        }

        //、如果是get请求，需要清缓存
        if (regGET.test(_default.method) && _default.cache === false) {
            mark = checkMark(_default.url);
            _default.url += mark + '_=' + Math.random();//用随机数清缓存
        }

        //->send ajax
        var xhr = new XMLHttpRequest;
        xhr.open(_default.method, _default.url, _default.async);
        xhr.onreadystatechange = function () {
            if (/^(2|3)\d{2}$/.test(xhr.status)) {
                if (xhr.readyState === 4) {
                    var result = xhr.responseText;
                    switch (_default.dataType.toUpperCase()) {
                        case 'JSON':
                            result = 'JSON' in window ? JSON.parse(result) : eval('(' + result + ')');
                            break;
                        case 'XML':
                            result = xhr.responseXML;
                            break;
                    }
                    _default.success && _default.success.call(xhr, result);
                }
                return;
            }
            _default.error && _default.error.call(xhr, xhr.status, xhr.statusText);
        };
        xhr.send(_default.data);
    }

    //->check whether the question mark contains
    function checkMark(url) {
        return url.indexOf('?') === -1 ? '?' : '&';
    }

    window.ajax = ajax;
}();