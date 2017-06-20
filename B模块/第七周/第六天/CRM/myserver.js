/**
 * Created by lenovo on 2017/2/27.
 */
var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;//
    /*
     * 静态资源文件的请求处理（HTML/CSS/JS/PNG...）
     * */
    var reg = /\.([0-9a-zA-Z]+)/i;
    if (reg.test(pathname)) {//如果是它就是请求的静态资源文件
        var conFile = null,
            status = 200;
        try {
            conFile = fs.readdirSync('.' + pathname);
        } catch (e) {
            conFile = 'not found~';
            status = 404;
        }
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
                suffixMIME = 'text/JavaScript';
                break;
        }
        res.writeHead(status, {'content-type': suffixMIME});
        res.end(conFile);
        return;
    }

    /*
     *
     * 处理API文档的数据接口
     *
     * */
    var resultTemplate = {code: 1,msg:'ERROR',data:null},
        path='./json/custom.json',
        customList=JSON.parse(fs.readFileSync(path));//数组对象

    if (pathname === '/getAllList') {
        if(customList.length>0){
            resultTemplate={
                code:0,
                msg:'SUCCESS',
                data:customList
            };
        }
        res.writeHead(200,{'content-type':'application/json'});//指定返回的是JSON格式的字符串

        res.end(JSON.stringify(resultTemplate));// 服务器端返回给客户端的是JSON字符串
        return;

    }

    if(pathname === '/getInfo'){
        var customId = query['id'];
        //循环所有的客户信息找到和传递的ID相同的那一项
        customList.forEach(function(item,index){
            if(item['id'] == customId){
                resultTemplate ={
                    code : 0,
                    msg:'SUCCESS',
                    data:item
                };
            }
        });
        res.writeHead(200,{'content-type':'application/json'});
        reg.end(JSON.stringify(resultTemplate));
        return;
    }

    if(pathname === '/removeInfo'){
        customId=query['id'];
        customList.forEach(function(item,index){
            if(item['id'] == customId){
                customList.splice(index,1);
                fs.writeFileSync(path,JSON.stringify(customList));
                resultTemplate={
                    code:0,
                    msg:'SUCCESS'
                };
            }
        });
        res.writeHead(200,{'content-type':'application/json'});
        reg.end(JSON.stringify(resultTemplate));
        return;
    }

    //  addInfo 增加客户信息
    if(pathname === '/addInfo'){
        //-->获取客户端通过请求主体（POST）传递给服务器的内容：name=xxx
        var pass='';

        req.on('data', function (chunk) {//正在一点点接收内容，chunk就是每一次接受一点内容；
            pass+=chunk;
        });
        req.on('end',function(){//接受完了
            pass=pass.myQueryURLParameter();

        });
        //-->我们需要给传递的内容增加一个ID，用当前最大的ID + 1.如果当前一项没有，我们新增加项的ID为1即可
        var maxId=customList.length ===0? 0 :parseFloat(customList[customList])
        //-->把最新的信息插入到数组和文件的末尾（增加成功）
        //-->返回结果

    }

});
String.prototype.myQueryURLParameter=function(){
    var reg = /([^?&=#]+)=([^?&=#]+)/g;
    var obj = {};
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2]
    });
    return obj;

};
server.listen(9090, function () {
    console.log('hello world 9090!')
});