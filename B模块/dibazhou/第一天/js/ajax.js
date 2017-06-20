/*
 * Created by lenovo on 2017/2/26.
 */
/*
;(function () {
    function ajax(option) {
        var _default = {
            url: null,
            method: 'GET',
            dataType: 'JSON',
            data: null,
            async: true,
            cache: true,
            success: true,
            error: null
        };
        //使用传递进来的参数值把默认值进行替换
        for (var key in option) {
            if (option.hasOwnProperty(key)) {
                if (key === 'type') {
                    _default['method'] = option['type'];
                    continue;
                }
                _default[key] = option[key];
            }
        }

        var regGET = /^(GET|DELETE|HEAD)$/i,
            mark = null;
        if (_default.data) {
            if (typeof _default.data === 'object') {
                var str = '';
                for (var attr in _default.data) {
                    if (_default.data.hasOwnProperty(attr)) {
                        str += attr + '=' + _default.data[attr] + '&';
                    }
                }
                _default.data = str.substring(0, str.length - 1);
            }
            if (regGET.test(_default.method)) {
                mark = checkMark(_default.url);
                _default.url += mark + _default.data;//为甚加data
                _default.data = null;
            }
        }
        if(regGET.test(_default.method) && _default.cache ===false){
            mark=checkMark(_default.url);
            _default.url+=mark+'_='+Math.random();
        }

        var xhr=new XMLHttpRequest();
        xhr.open(_default.method,_default.url,_default.async);
        xhr.onreadystatechange=function(){
            if(/^(2|3)\d{2}$/.test(xhr.status)){
                if(xhr.readyState===4){
                    var result=xhr.responseText;
                    //返回的数据格式
                    switch (_default.dataType.toUpperCase()){
                        case 'JSON':
                            result='JSON'in window?JSON.parse(result):eval('(+result+)');
                            break;
                        case 'XML':
                            result=xhr.responseXML;
                            break;
                    }
                    _default.success && _default.success.call(xhr,result);
                }
                return;
            }
            _default.error && _default.error.call(xhr,xhr.status,xhr.statusText);
        };
        xhr.send(_default.data);

    }
    function chaeckMack(url){
        return url.indexOf('?')===-1?'?':'&';
    }

    window.ajax = ajax;
})();*/
;(function(){
    function ajax(option){
        var _default={
            url:null,
            method:'GET',
            dataType:'JSON',
            data:null,
            async:true,
            cache:true,
            success:null,
            error:null
        };
        for(var key in option){
            if(option.hasOwnProperty(key)){
                if(key === 'type'){
                        _default['method']=option['type'];
                    continue;
                }
                _default[key]=option[key];
            }
        }

        var regGET=/^(GET|DELETE|HEAD)$/i,
            mark=null;
        if(_default.data){
            if(typeof _default.data === 'object'){
                var str='';
                for(var attr in _default.data){
                    if(_default.data.hasOwnProperty(attr)){
                        str+=attr+='='+_default.data[attr]+'&';
                    }
                }
                _default.data=str.substring(0,str.length-1);
            }
            if(regGET.test(_default.method)){
                mark=checkMark(_default.url);
                _default.url+=mark+_default.data;
                _default.data=null;
            }
        }

        //判断cache是否清缓存
        if(regGET.test(_default.method) && _default.cache === false){
            mark=checkMark(_default.url);
            _default.url+=mark+'_='+Math.random();
        }

        var xhr=new XMLHttpRequest();
        xhr.open(_default.method,_default.url,_default.async);
        xhr.onreadystatechange=function(){
            if(/^(2|3)\d{2}$/.test(xhr.status)){
                if(xhr.readyState ===4){
                    var result = xhr.responseText;
                    switch (_default.dataType.toUpperCase()){
                        case 'JSON':
                            result='JSON' in window? JSON.parse((result)):eval('(+result+)');
                            break;
                        case 'XML':
                            result=xhr.responseXML;
                            break;
                    }
                    _default.success && _default.success.call(xhr,result);
                }
                return;
            }
            _default.error && _default.error.call(xhr,xhr.statusText);
        };
        xhr.send(_default.data);
    }
    function checkMark(url){
        return url.indexOf('?')===-1?'?':'&';
    }
    window.ajax=ajax;
})();