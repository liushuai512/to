/**
 * Created by lenovo on 2017/1/4.
 */
/*
(function(){
    //获取元素
    var table=document.getElementById('tab');
    var thead=table.tHead;
    var theadTr=thead.rows[0];
    var theadThs=thead.cells;
    var tbody=table.tBodies[0];
    var tbodyTrs=tbody.rows;
    var data=null;

    //获取数据
    getData();
    function getData(){
        var xhr=new XMLHttpRequest();
        xhr.open("get","data.txt",false);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && xhr.status==200){
                data=JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    }


    bind();
    function bind(){
        var frg=document.createDocumentFragment();
        for(var i=0;i<data.length;i++){
            var dataObj=data[i];
            var tr=document.createElement('tr');
            for(var key in dataObj){
                var td=document.createElement('td');
                td.innerHTML=dataObj[key];
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tbody.appendChild(frg);
        frg=null;
    }

    changeColor();
    function changeColor(){
        for(var i=0;i<tbodyTrs.length;i++){
            tbodyTrs[i].className="bg"+i%2;
        }

    }

})();*/
/*
// 1.获取元素  2.获取数据  3.绑定数据 4.各行换色 5表格排序
(function(){
    //获取元素
    var table=document.getElementById('tab');
    var tHead=table.tHead;
    var tHeadTr=tHead.rows[0].cells;
    var tBody=table.tBodies[0];
    var tBodyTrs=tBody.rows;
    var data=null;

    //2 获取数据
    getData();
    function getData(){
        //创建一个xhr对象
        var xhr=new XMLHttpRequest();
        //打开地址
        xhr.open('get','data.txt',false);
        //响应请求
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
                data=utils.jsonParse(xhr.responseText);
            }
        };
        //发送请求
        xhr.send();
    }

    //3.绑定数据
    bind();
    function bind(){
        var frg=document.createDocumentFragment();

        for(var i=0;i<data.length;i++){
            var dataObj=data[i];
            var tr=document.createElement('tr');
            for(var key in dataObj){
                var td=document.createElement('td');
                if(key==='developed'){
                    dataObj[key]=dataObj[key]==0?"发展中":"发达";
                }
                td.innerHTML=dataObj[key];
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tBody.appendChild(frg);
        frg=null;
    }

    //4.各行变色
    changeColor();
    function changeColor(){
        for(var i=0;i<tBodyTrs.length;i++){
            tBodyTrs[i].className='bg'+i%3;
        }
    }

    //5.表格排序



})();*/
(function(){
    //获取元素
    var table=document.getElementById('tab');
    var tHead=table.tHead;
    var tHeadTr=tHead.rows[0].cells;
    var tBody=table.tBodies[0];
    var tBodyTrs=tBody.rows;
    var data=null;
    console.log(tHeadTr);


    //获取数据
    getData();
    function getData(){
        //创建xhr对象
        var xhr=new XMLHttpRequest();
        //打开地址
        xhr.open('get','data.txt',false);
        //请求响应
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
                data=utils.jsonParse(xhr.responseText);
            }
        };
        //发送请求
        xhr.send();
    };


    //绑定数据
    bind();
    function bind(){
        var frg=document.createDocumentFragment();
        for(var i=0;i<data.length;i++){
            var dataObj=data[i];
            var tr=document.createElement('tr');
            for(var key in dataObj){
                var td=document.createElement('td');
                if(key==='developed'){
                    dataObj[key]=dataObj[key]==0?"发展中":"发达";
                }
                td.innerHTML=dataObj[key];
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tBody.appendChild(frg);
        frg=null;
    }


    changeColor();
    function changeColor(){
        for(var i=0;i<tBodyTrs.length;i++){
             tBodyTrs[i].className="bg"+i%3;
        }
    }


})();