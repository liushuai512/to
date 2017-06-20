/*
 var newList=document.getElementById('newList');
 var aImg=newList.getElementsByTagName('img');
 var data=null;

 //获取数据
 ;(function getData(){
 var xhr=new XMLHttpRequest();
 xhr.open('get','data.txt?_='+Math.random(),false);
 xhr.onreadystatechange=function(){
 if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
 data=utils.jsonParse(xhr.responseText);
 }
 };
 xhr.send();
 })();
 console.log(data);

 //绑定数据
 ;(function bindEvent(){
 if(data && data.length){//检测data存在，并且里面有数据
 var str='';
 //只要data中存在一个对象就拼接一个li
 for(var i=0;i<data.length;i++){
 str+='<li>';
 str+='<div><img src="" real="'+data[i]["src"]+'"></div>';
 str+='<div><h3>'+data[i].title+'<p>'+data[i].desc+'</p></h3></div>';
 str+='</li>';
 }
 newList.innerHTML=str;
 }
 })();

 //多张图片延迟加载 =>循环判断每一张图片是否完全进入窗口中
 //aImg:[img,img,img.....]=>对应页面中每一张真实图片
 function aImgDelayLoad(){
 for(var i=0;i<aImg.length;i++){
 if(aImg.isLoaded){//判断每一张是否进入
 continue;
 }

 var winHeight = utils.win('clientHeight');//窗口高度
 var winScrollTop = utils.win('scrollTop');//窗口滚出去的高度

 var imgHeight = aImg[i].parentNode.offsetHeight; //盒子的高度
 var imgOffsetTop = utils.offset(aImg[i].parentNode).top;//盒子距离body的上偏移

 if (winHeight + winScrollTop > imgHeight + imgOffsetTop) {
 //当前正在循环的这张图片完全进入到窗口
 //代码从这个位置开始就是单张图片延迟加载的逻辑
 singleDelayLoad(aImg[i]);//把每一张符合完全进入窗口内条件的图片都传给单张图片延迟加载的函数
 }
 }
 }


 //单张图片加载
 function singleDelayLoad(img){//img:真正要做到图片延迟加载的
 var tempImg=document.createElement('img');
 tempImg.src=img.getAttribute('real');
 tempImg.onload=function(){
 //只要时间触发说明img的图片资源有效。有效就可以给img.src属性赋值
 img.src=this.src;
 fadeIn(img);
 };
 img.isLoaded=true;
 }

 //淡入
 function fadeIn(img){
 window.clearInterval(img.timer);
 img.timer=window.setInterval(function(){
 var opacity=window.getComputedStyle(img).opacity/1;
 if(opacity>=1){
 window.clearInterval(img.timer);
 return;
 }
 opacity+=0.01;
 img.style.opacity=opacity;
 },10);
 }


 aImgDelayLoad();//刷新页面执行，有符合条件的图片
 window.onscroll=aImgDelayLoad;//滚动条滚动执行*/
/*var newList = document.getElementById('newList');
 var aImg = newList.getElementsByTagName('img');
 var data = null;

 //获取数据
 ;(function getData() {
 var xhr = new XMLHttpRequest();
 xhr.open('get', 'data.txt?_=' + Math.random(), false);
 //在url后添加一个随机数就是为了不能读取缓存，浏览器的缓存机制就是比较地址
 xhr.onreadystatechange = function () {
 if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
 data = utils.jsonParse(xhr.responseText);
 }
 };
 xhr.send();
 })();
 console.log(data);
 //绑定数据

 function bindEvent(){
 if(data && data.length){
 var str='';for(var i=0;i<data.length;i++){
 str+='<li>';
 str+='<div><img src="" real="'+data[i]["src"]+'"></div>';
 str+='<div><h3>'+data[i].title+'</h3><p>'+data[i].desc+'</p></div>';
 str+='</li>';
 }
 newList.innerHTML=str;
 }

 }
 bindEvent();

 //多张图片延迟加载
 function aImgDelayLoad(){
 for(var i=0;i<aImg.length;i++){
 if(aImg[i].isLoaded){
 continue;
 }
 var winHeight=utils.win('clientHeight');
 var winScrollTop=utils.win('scrollTop');

 var aImgHeight=aImg[i].parentNode.offsetHeight;
 var aImgOffsetTop=utils.offset(aImg[i].parentNode).top;

 if(winHeight +winScrollTop >aImgHeight +aImgOffsetTop ){
 console.log('ok')
 singleDelayLoad(aImg[i])

 }
 }
 }

 //单张图片延迟加载

 function singleDelayLoad(img){//img:真正要做到图片延迟加载的
 var tempImg=document.createElement('img');
 tempImg.src=img.getAttribute('real');
 tempImg.onload=function(){
 //只要时间触发说明img的图片资源有效。有效就可以给img.src属性赋值
 img.src=this.src;
 fadeIn(img);
 };
 img.isLoaded=true;
 }

 //淡入
 function fadeIn(img){
 window.clearInterval(img.timer);
 img.timer=window.setInterval(function(){
 var opacity=window.getComputedStyle(img).opacity/1;//????
 if(opacity>=1){
 window.clearInterval(img.timer);
 return;
 }
 opacity+=0.01;
 img.style.opacity=opacity;
 },10);
 }

 aImgDelayLoad();
 window.onscroll=aImgDelayLoad;*/

//获取元素
//var newList = document.getElementById('newList');
var newList = utils.getElesByClass('newList')[0];
var aImg = newList.getElementsByTagName('img');
var data = null;

//获取数据
;(function(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
            data=utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send();
})();
console.log(data);

//绑定数据
;(function(){
    if(data && data.length){
        var str='';
        for(var i=0;i<data.length;i++){
            str+='<li>';
                 str+='<div><img src="" real="'+data[i].src+'"></div>';
                 str+='<div><h3>'+data[i].title+'</h3><p>'+data[i].desc+'</p></div>';
            str+='</li>';
        }
        newList.innerHTML=str;
    }
})();

//多张图片延迟加载
function aImgDelayLoad(){
    for(var i=0;i<aImg.length;i++){
        if(aImg[i].isLoaded){
            continue;
        }

        var winHeight=utils.win('clientHeight');
        var winScrollTop=utils.win('scrollTop');

        var aImgHeight=aImg[i].parentNode.offsetHeight;
        var aImgOffsetTop=utils.offset(aImg[i].parentNode).top;

        if(winHeight +winScrollTop >aImgHeight +aImgOffsetTop){
            singDelayLoad(aImg[i]);
        }
    }
}

//单张图片延迟加载
function singDelayLoad(img){
    var tempImg=document.createElement('img');
    tempImg.src=img.getAttribute('real');//注意
    tempImg.onload=function(){
        img.src=this.src;
        fadeIn(img);
    };
    img.isLoaded=true;
}

//淡入
function fadeIn(img){
    window.clearInterval(img.timer);

    img.timer=window.setInterval(function(){
        var opacity=window.getComputedStyle(img).opacity/1;//注意
        if(opacity>=1){
            window.clearInterval(img.timer);
            return;
        }
        opacity+=0.01;
        img.style.opacity=opacity;
    },10)
}

aImgDelayLoad();
window.onscroll=aImgDelayLoad;//为什么不能带括号




