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
            conFile='not found~';
            status=404;
        }

        var suffix=reg.exec(pathname)[1].toUpperCase(),
            suffixMIMX='text/plain';
        switch (suffix){
            case 'HTML':
                suffixMIMX='text/html';
                break;
            case 'CSS':
                suffixMIMX='text/css';
                break;
            case 'JS':
                suffixMIMX='text/javascript';
                break;
        }
        res.writeHead(status,{'content-type':suffixMIMX});
        res.end(conFile);
        return;
    }

    //处理API文档
    var result={code:1,msg:'ERROR',data:null},
        path='./json/custom.json',
        customList=JSON.parse(fs.readFileSync(path));

    //获取所有信息
    if(pathname === '/getAllList'){
        if(customList.length>0){
            result={
                code:0,
                msg:'SUCCESS',
                data:customList
            }
        }
        res.writeHead(200,{'content-type':'application/json'});
        res.end(JSON.stringify(result));
        return;
    }

    //获取指定客户信息
    if(pathname === '/getInfo'){
        var customId=query['id'];
        customList.forEach(function(item,index){
            if(item['id']==customId){
                result={
                    code:0,
                    msg:'SUCCESS',
                    data:item
                }
            }
        });
        res.writeHead(200,{'content-type':'application/json'});
        res.end(JSON.stringify(result));
        return;
    }

    //删除指定客户信息
    if(pathname ==='/removeInfo'){
        customId=query['id'];
        customList.forEach(function(item,index){
            if(item['id'] == customId){
                customList.splice(index,1);
                fs.writeFileSync(path,JSON.stringify(customList));
                result={
                    code:0,
                    msg:'SUCCESS'
                }
            }
        });
        res.writeHead(200, {'content-type': 'application/json'});
        res.end(JSON.stringify(result));
        return;
    }

    //增加客户信息
    if(pathname === '/addInfo'){
        var pass='';
        req.on('data',function(chunk){
            pass+=chunk;
        });
        req.on('end',function(){
            pass=pass.myQueryURLParameter();

            var maxId=customList.length===0?0:customList[customList.length-1]['id'];
            pass['id']=parseFloat(maxId)+1;

            customList.push(pass);
            fs.writeFileSync(path,JSON.stringify(customList));
            result={
                code:0,
                msg:'SUCCESS'
            };
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(result));
        });
        return;
    }

    //修改客户信息
    if (pathname === '/updateInfo') {
        pass = '';
        req.on('data', function (chunk) {
            pass += chunk;
        });
        req.on('end', function () {
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

    res.writeHead(404,{'content-type':'text/plain'});
    res.end('bod url~');
});
String.prototype.myQueryURLParameter=function(){
    var reg=/([^?#&=]+)=([^?#&=]+)/g,
        obj={};
    this.replace(reg,function(){
        obj[arguments[1]]=arguments[2];
    });
    return obj;
};
server.listen(8020,function(){
    console.log('8020 ok')
});