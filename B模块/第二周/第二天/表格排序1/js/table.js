/*
 (function(){
 //获取元素
 var table = document.getElementById('tab');//获取整个表单
 var ths = table.tHead.rows[0].cells;//获取表头那一列
 var tBody = table.tBodies[0];//获取第一个表身
 var tBodyTrs = tBody.rows;//获取表身的每一列
 var data = null;
 // console.log(ths)

 //获取数据
 //创建xhr对象
 getData();
 function getData() {
 //创建一个xhr对象
 var xhr = new XMLHttpRequest();
 //打开地址
 xhr.open('get', 'data.txt', false);//get获取  false异步
 //响应请求
 xhr.onreadystatechange = function () {
 if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
 data = utils.jsonParse(xhr.responseText);
 };

 };
 xhr.send();
 }
 //console.log(data)

 //绑定数据
 bind();
 function bind(){
 var frg=document.createDocumentFragment();
 for(var i=0;i<data.length;i++){
 var tr=document.createElement('tr');
 var dataObj=data[i];
 for(var key in dataObj){
 var td=document.createElement('td');
 if(key === 'developed'){
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

 //隔行换色
 changeColor();
 function changeColor(){
 for(var i=0;i<tBodyTrs.length;i++){
 tBodyTrs[i].className='bg'+i%3;
 }
 }

 //绑定事件  给所有表头添加点击事件
 bindEvent();
 function bindEvent(){
 for(var i=0;i<ths.length;i++){
 ths[i].index=i;
 ths[i].sortFlag*=-1;
 if(ths[i].className=='cursor'){
 ths[i].onclick=function(){
 sort.call(this,this.index);
 changeColor();
 }
 }
 }
 }

 function sort(n){
 for(var i=0;i<ths.length;i++){
 if(ths[i]!==this){
 ths[i].sortFlag*=-1;
 }
 }
 var that=this;
 that.sortFlag*=-1;
 //类数组转数组
 var tBodyTrsAry=Array.prototype.slice.call(tBodyTrs);
 //sort排序
 tBodyTrsAry.sort(function(str1,str2){
 var a=str1.cells[n].innerHTML;
 var b=str2.cells[n].innerHTML;
 if(isNaN(a) || isNaN(b)){
 return a.localeCompare(b)*that.sortFlag
 }
 return (a-b)*that.sortFlag;
 });
 //将排好序的  重新插入页面
 var frg=document.createDocumentFragment();
 for(var i=0;i<ths.length;i++){
 frg.appendChild(tBodyTrsAry[i]);
 }
 tBody.appendChild(frg);
 frg=null;
 }


 })();*/
/*(function () {
 //获取元素
 var table = document.getElementById('tab');
 var ths = table.tHead.rows[0].cells;
 var tBody = table.tBodies[0];
 var tBodyTrs = tBody.rows;
 var data = null;
 //console.log(tBody)
 //获取数据
 getData();
 function getData() {
 //创建xhr一个对象
 var xhr = new XMLHttpRequest();
 //打开地址
 xhr.open('get', 'data.txt', false);
 //请求响应
 xhr.onreadystatechange = function () {
 if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
 data = utils.jsonParse(xhr.responseText);
 }
 };
 xhr.send();
 }

 //console.log(data)

 //绑定数据
 bind();
 function bind() {
 var frg = document.createDocumentFragment();
 for (var i = 0; i < data.length; i++) {
 var tr = document.createElement('tr');
 var dataObj = data[i];
 for (var key in dataObj) {
 var td = document.createElement('td');
 if (key == 'developed') {
 dataObj[key] = dataObj[key] == '0' ? '发展中' : '发达';
 }
 td.innerHTML = dataObj[key];
 tr.appendChild(td);
 }
 frg.appendChild(tr);
 }
 tBody.appendChild(frg);
 frg = null;
 }

 //各行变色
 changeColor();
 function changeColor() {
 for (var i = 0; i < tBodyTrs.length; i++) {
 tBodyTrs[i].className = 'bg' + i % 3;
 }
 }


 bindEvent();
 function bindEvent() {
 for (var i = 0; i < ths.length; i++) {
 ths[i]..babelrc = i;
 ths[i].sortFlag = -1;
 if (ths[i].className == 'cursor') {
 ths[i].onclick = function () {
 sort.call(this, this..babelrc);
 changeColor();
 }
 }
 }
 }

 function sort(n) {
 for (var i = 0; i < ths.length; i++) {
 if (ths[i] !== this) {
 ths[i].sortFlag = -1;//为甚取反
 }
 }
 var that = this;
 that.sortFlag *= -1;
 //类数组排序
 var tBodyTrsAry = Array.prototype.slice.call(tBodyTrs);
 //sort排序
 tBodyTrsAry.sort(function (str1, str2) {
 var a = str1.cells[n].innerHTML;
 var b = str2.cells[n].innerHTML;
 if (isNaN(a) || isNaN(b)) {
 // 字符串
 return (a.localeCompare(b)) * that.sortFlag;
 }
 return (a - b) * that.sortFlag;
 });
 //重新插入
 var frg = document.createDocumentFragment();
 for (var i = 0; i < tBodyTrsAry.length; i++) {
 frg.appendChild(tBodyTrsAry[i]);///////////
 }
 tBody.appendChild(frg);
 frg = null;
 }


 })();*/
/*
 (function () {
 //获取元素
 var table = document.getElementById('tab');
 var ths = table.tHead.rows[0].cells;
 var tBody = table.tBodies[0];
 var tBodyTrs = tBody.rows;
 var data = null;

 //获取数据
 getData();
 function getData() {
 //创建xhr对象
 var xhr = new XMLHttpRequest();
 //打开地址
 xhr.open('get', 'data.txt', false);
 //请求方式
 xhr.onreadystatechange = function () {
 if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
 data = utils.jsonParse(xhr.responseText);
 }
 };
 xhr.send();
 }

 //console.log(data)

 //绑定数据
 bind();
 function bind() {
 var frg = document.createDocumentFragment();
 for (var i = 0; i < data.length; i++) {
 var tr = document.createElement('tr');
 var dataObj = data[i];
 for (var key in dataObj) {
 var td = document.createElement('td');
 if (key === 'developed') {
 dataObj[key] = dataObj[key] == 0 ? '发展中' : '发达';
 }
 td.innerHTML = dataObj[key];
 tr.appendChild(td);
 }
 frg.appendChild(tr);
 }
 tBody.appendChild(frg);
 frg = null;
 }

 //各行变色
 changeColor();
 function changeColor() {
 for (var i = 0; i < tBodyTrs.length; i++) {
 tBodyTrs[i].className = 'bg' + i % 3;
 }
 }

 bindEvent();
 function bindEvent() {
 for(var i=0;i<ths.length;i++) {
 ths[i]..babelrc=i;
 ths[i].sortFlag=-1;
 if (ths[i].className == 'cursor') {
 ths[i].onclick = function (){
 sort.call(this,this..babelrc);
 changeColor();
 }
 }
 }
 }

 function sort(n) {
 for (var i = 0; i < ths.length; i++) {
 if(ths[i] !== this){
 ths[i].sortFlag = -1;
 }
 }

 //类数组转数组
 var tBodyTrsAry=Array.prototype.slice.call(tBodyTrs);
 var that = this;
 this.sortFlag *= -1;
 //sort排序
 tBodyTrsAry.sort(function (tr1,tr2){
 var a = tr1.cells[n].innerHTML; // 数字 北京..
 var b = tr2.cells[n].innerHTML;
 if(isNaN(a)||isNaN(b)){
 // 字符串
 return (a.localeCompare(b))*that.sortFlag;
 }
 return (a - b)*that.sortFlag;
 });


 //重新插入
 var frg = document.createDocumentFragment();
 for (var i = 0; i < tBodyTrsAry.length; i++) {
 frg.appendChild(tBodyTrsAry[i]);
 }
 tBody.appendChild(frg);
 frg = null;
 }
 })();

 */
(function () {
    /*var table=document.getElementById('tab');
     var ths=table.tHead.rows[0].cells;
     var tBody=table.tBodies[0];
     var tBodyTrs=tBody.rows;
     var data=null;
     */
    var table = document.getElementById('tab');
    var ths = table.tHead.rows[0].cells;
    var tBody = table.tBodies[0];
    var tBodyTrs = tBody.rows;
    var data = null;

    //
    /* getData();
     function getData() {
     //创建xhr对象
     var xhr = new XMLHttpRequest();
     //打开地址
     xhr.open('get', 'data.txt', false);
     //请求方式
     xhr.onreadystatechange = function () {
     if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
     data = utils.jsonParse(xhr.responseText);
     }
     };
     xhr.send();
     }*/
    getData();
    function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'data.txt', false);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
                data=utils.jsonParse(xhr.responseText);
            }
        };
        xhr.send();
    }

    console.log(data);

    bind();
    function bind(){
        var frg=document.createDocumentFragment();
        for(var i=0;i<data.length;i++){
            var tr=document.createElement('tr');
            var dataObj=data[i];
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
    function changeColor() {
        for (var i = 0; i < tBodyTrs.length; i++) {
            tBodyTrs[i].className = 'bg' + i % 3;
        }
    }

    bindEvent();
    function bindEvent() {

        for (var i = 0; i < ths.length; i++) {
            ths[i].index = i;//给表头各列都添加一个自定义属性，保存索引值
            ths[i].sortFlag = -1;//每一个表头列都存在一个自定义属性-1；

            if (ths[i].className == 'cursor') {
                ths[i].onclick = function () {
                    sort.call(this, this.index);
                    changeColor();
                }
            }
        }
    }
    function sort(n) {
        for (var i = 0; i < ths.length; i++) {
            if (ths[i] !== this) {
                ths[i].sortFlag = -1;
            }
        }
        var that = this;
        that.sortFlag *= -1;
        var tBodyTrsAry = Array.prototype.slice.call(tBodyTrs);

        tBodyTrsAry.sort(function (str1, str2) {
            var a = str1.cells[n].innerHTML;
            var b = str2.cells[n].innerHTML;
            if (isNaN(a) || isNaN(b)) {
                return a.localeCompare(b) * that.sortFlag;
            }
            return (a - b) * that.sortFlag;
        });

        var frg = document.createDocumentFragment();
        for (var i = 0; i < tBodyTrsAry.length; i++) {
            frg.appendChild(tBodyTrsAry[i]);
        }
        tBody.appendChild(frg);
        frg = null;
    }

})();
