var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {//创建一个服务
    var urlObj = url.parse(req.url, true),//解析url地址中的每一项
    //req:request 请求对象，里面有很多的属性和方法，存储了客户端的全部请求信息
    //req.url：存储的是客户端请求的资源文件的路径名称以及问号传参的值，
    //true 请求的数据以键值对形式返回;//->第二个参数传递TRUE,会把问号传递参数的值进行解析,以对象的方式来存储
        pathname = urlObj.pathname,//客户端请求资源文件的路径名称
        query = urlObj.query;//->存储的是客户端问号传递的参数值{xxx:xxx...}

    /*
     * 静态资源文件的请求处理(HTML/CSS/JS/PNG...)
     */
    var reg = /\.([0-9a-zA-Z]+)/i;
    if (reg.test(pathname)) {//通过正则匹配客户端服务是否存在
        var conFile = null,
            status = 200;
        try {
            conFile = fs.readFileSync('.' + pathname);//同步读取指定文件中的内容，读取出来的都是字符串格式的
        } catch (e) {
            conFile = 'not found~';
            status = 404;
        }

        //根据当前请求资源文件的后缀名，计算问减的MIME类型
        var suffix = reg.exec(pathname)[1].toUpperCase(),//捕获pathname这个对象中索引为1的第一个分组，并且转化为大写
            suffixMIME = 'text/plain';//默认是纯文本字符串（.txt）
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

        //重写响应头
        res.writeHead(status, {'content-type': suffixMIME});//res.write([content])向客户端响应内容（响应的内容时字符串格式的）

        //基于参数res提供的方法，把内容返回给客户端
        res.end(conFile);//结束客户端的响应

        return;
    }

    /*
     * 处理API文档中的数据接口
     * - getAllList
     * - addInfo
     * - updateInfo
     * - getInfo
     * - removeInfo
     */
    var result = {code: 1, msg: 'ERROR', data: null},
        path = './json/custom.json',
        customList = JSON.parse(fs.readFileSync(path));//->数组对象,全部的客户信息  同步读取指定文件夹中的内容，将读取出来是字符串格式的转为JSON格式的

    //->getAllList:获取所有的客户信息
    if (pathname === '/getAllList') {
        if (customList.length > 0) {
            result = {code: 0, msg: 'SUCCESS', data: customList};
        }
        res.writeHead(200, {'content-type': 'application/json'});//->指定返回的是JSON格式的数据(字符串)
        res.end(JSON.stringify(result));//->服务器端返回给客户端的是JSON字符串
        return;
    }
    //->getInfo:通过指定的ID获取用户信息
    if (pathname === '/getInfo') {
        //->接收客户端传递的ID(QUERY这里面存储着呢=>客户端用的是GET请求,GET请求就是通过问号传递参数传过来的)
        var customId = query['id'];
        //->循环所有的客户信息找到和传递的ID相同的那一项
        customList.forEach(function (item, index) {
            if (item['id'] == customId) {
                result = {code: 0, msg: 'SUCCESS', data: item};
            }
        });
        //->返回
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(result));
        return;
    }
    //->removeInfo:删除指定客户
    if (pathname === '/removeInfo') {
        customId = query['id'];
        customList.forEach(function (item, index) {
            if (item['id'] == customId) {
                customList.splice(index, 1);
                //->这只是仅仅是在数组中把内容删除了,但是存储数据的文件中还没有删除,我们还需要把文件中的也删除掉
                fs.writeFileSync(path, JSON.stringify(customList));//->把最新的数据转换为字符串写入到文件中(覆盖式写入)
                result = {code: 0, msg: 'SUCCESS'};
            }
        });
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(result));
        return;
    }
    //->addInfo：增加客户信息
    if (pathname === '/addInfo') {
        //->获取客户端通过请求主体(POST)传递给服务器的内容:name=xxx
        var pass = '';
        req.on('data', function (chunk) {//->正在一点点接收传递的内容,chunk就是每一次接收到的一点点的内容
            pass += chunk;
        });
        req.on('end', function () {//->接收完了
            //pass -> 'name=xxx' -> {name:xxx}
            pass = pass.myQueryURLParameter();

            //->我们还需要给传递的内容多增加一个ID：用当前最大的ID+1，如果当前一项都没有，我们新增加项的ID为1即可
            var maxId = customList.length === 0 ? 0 : parseFloat(customList[customList.length - 1]['id']);
            pass['id'] = maxId + 1;

            //->把最新的信息插入到数组和文件中的末尾(增加成功)
            customList.push(pass);
            fs.writeFileSync(path, JSON.stringify(customList));

            //->返回结果
            result = {
                code: 0,
                msg: 'SUCCESS'
            };
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(result));
        });
        return;
    }

    //->updateInfo:修改客户信息
    if (pathname === '/updateInfo') {
        pass = '';
        req.on('data', function (chunk) {
            pass += chunk;
        });
        req.on('end', function () {
            //pass -> 'id=1&name=xxx' -> {id:1,name:xxx}
            pass = pass.myQueryURLParameter();
            customList.forEach(function (item, index) {
                if (item['id'] == pass['id']) {
                    customList[index] = pass;
                    fs.writeFileSync(path, JSON.stringify(customList));
                    result = {code: 0, msg: 'SUCCESS'};
                }
            });
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(result));
        });
        return;
    }

    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('bad url~');//->我们也可以在404的时候返回一个指定公益页面中的源代码
});
String.prototype.myQueryURLParameter = function () {
    var reg = /([^?&=#]+)=([^?&=#]+)/g;
    var obj = {};
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2]
    });
    return obj;
};
server.listen(9060, function () {
    console.log('hello world 9060!');
});


//127行