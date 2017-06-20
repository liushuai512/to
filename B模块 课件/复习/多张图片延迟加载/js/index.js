var newsList = document.getElementsByClassName('newsList')[0];
var imgs = newsList.getElementsByTagName('img'); // []
var data = null;
//
;(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
console.log(data);
//
;(function (){
    if(data){
        var str = '';
        for(var i = 0; i < data.length; i++){
            str += '<li>';
            str += '<div><img src="" real="'+ data[i].src +'"></div>';
            str += '<div><h3>'+ data[i].title +'</h3><p>'+  data[i].desc+'</p></div>';
            str += '</li>';
        }
        newsList.innerHTML = str;
    }
})();
// 图片延迟加载
imgsDelayLoad();
window.onscroll = imgsDelayLoad;
function imgsDelayLoad(){
    for(var i = 0; i < imgs.length; i++){
        // 判断每一张图片是否完全进入到窗口内
        var _a = imgs[i].parentNode.offsetHeight + offset(imgs[i].parentNode).top;
        var _b = win('clientHeight') + win('scrollTop');
        if(_a < _b){
            // 说明图片已经完全进入到窗口内
            if(imgs[i].isLoaded){
                continue;
            }
            var tempImg = new Image();
            tempImg.index = i;
            tempImg.src = imgs[i].getAttribute('real');
            tempImg.onload = function (){
                imgs[this.index].src = this.src;
                // 把图片的透明度从0动画到1
                animate({
                    ele : imgs[this.index],
                    target : {opacity:1}
                });
            }
            imgs[i].isLoaded = true; // 这个图片加载过了
        }
    }
}
function animate(/*ele,target,duration,callback*/option){
    // time duration begin change(target-begin)  {left : 500 ...}
    var ele = option.ele;
    var target = option.target;
    var duration = option.duration || 500;
    var callback = option.callback;
    var time = 0;
    var begin = {};
    var change = {};
    for(var key in target){ // 字段
        begin[key] = getCss(ele,key);
        change[key] = target[key] - begin[key];
    }
    var linear = function (t,b,c,d){
        return b + t/d*c;
    }
    window.clearInterval(ele.timer);
    ele.timer = window.setInterval(function (){
        time += 10;
        if(time >= duration){ // 动画结束
            window.clearInterval(ele.timer);
            for(var key in target){
                setCss(ele,key,target[key]);
            }
            if(typeof callback == 'function'){
                callback.call(ele); // 回调函数中的this还是运动的这个元素
            }
            return;
        }
        for(var key in change){
            var value = linear(time,begin[key],change[key],duration);
            setCss(ele,key,value);
        }
    },10);
}
//window.getComputedStyle(div1,null)['width'];
// div1.currentStyle['width']
function getCss(ele,attr){
    var val = null;
    if(window.getComputedStyle){
        val = window.getComputedStyle(ele)[attr];
    }else{ // lowIE
        // filter : alpha(opacity=50)
        if(attr == 'opacity'){
            val = ele.currentStyle.filter;
            var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
            val = reg.test(val) ? reg.exec(val)[1]/100 : 1;
        }else{
            val = ele.currentStyle[attr];
        }
    }
    // '100px'  '-55.50px' '0.8' 'block'   /\d/g i m lastIndex
    var reg = /^-?\d+(\.\d+)?(px|pt|rem)?$/;
    return reg.test(val) ? parseFloat(val) : val;
}
function setCss(ele,attr,val){ // setCss(div1,'width',500)  setCss(div1,'display')
    if(attr == 'opacity'){
        ele.style.opacity = val;
        ele.style.filter = 'alpha(opacity='+ val*100 +')';
        return;
    }
    if(attr == 'float'){
        ele.style.cssFloat = val;
        ele.style.styleFloat = val;
        return;
    }
    // width,height,left...
    var reg = /width|height|left|top|right|bottom|(margin|padding)(Left|Top|Right|Bottom)?/;
    //reg.test(attr) && !isNaN(attr) ? val += 'px' : null;
    if(reg.test(attr)){
        if(!isNaN(val)){
            val += 'px';
        }
    }
    ele.style[attr] = val;
}
function offset(ele){
    var l = null;
    var t = null;
    l += ele.offsetLeft;
    t += ele.offsetTop;
    var par = ele.offsetParent;
    while (par){
        window.navigator.userAgent; // 'Chrome' ... MSIE 6 7 8
        l += par.clientLeft;
        t += par.clientTop;
        l += par.offsetLeft;
        t += par.offsetTop;
        par = par.offsetParent;
    }
    return { left : l, top : t };
}
function win(attr,val){
    if(typeof val == 'undefined'){
        return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr] = val;
    document.body[attr] = val;
}

