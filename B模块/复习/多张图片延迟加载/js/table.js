/**
 * Created by lenovo on 2017/2/5.
 */
//获取元素
var $newsList=$('.newsList');
var $imgs=$newsList.find('.img');
var data=null;

//获取数据
;(function(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt?_+'+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
            data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
})();
console.log(data);

//绑定数据
;(function(){
    if(data &&　data.length){
        var str='';
        for(var i=0;i<data.length;i++){
            str+='<li>';
                str+='<div><img src="" real="'+data[i].src+'"></div>';
                str+='<div><h3>'+data[i].title+'</h3><p>'+data[i].desc+'</p></div>';
            str+='</li>'
        }
        $newsList.html=str;
    }
})();

imgsDelayLoad();
//图片延迟加载
window.onscroll = imgsDelayLoad;
function imgsDelayLoad(){
    for(var i=0;i<$imgs.length;i++){
        var _a=imgs[i].parentNode.offsetHeight+offset(imgs[i].parentNode).top;
        var _b=win('clientHeight')+win('scrollTop');
        if(_a<_b){
            if(imgs[i].isLoaded){
                continue;
            }
            var tempImg=new Image();
            tempImg.index=i;
            tempImg.src=$imgs[i].getAttribute('real');
            tempImg.onload=function(){
                $imgs[this.index].src=this.src;
                animate({ele:$imgs[this.index],target:{opacity:1},duration:300});
            };
            imgs[i].isLoaded=true;//这张图片加载过了
        }

    }
}









function animate(option){
    var ele=option.ele;
    var duration=option.duration;
    var target=option.target;
    var callback=option.target;
    var time=0;
    var begin={};
    var change={};
    for(var key in target){
        begin[key]=getCss(ele,key)
        change[key]=target[key]-begin[key];
    }
    var linear=function(t,b,c,d){
        return b+t/d*c;
    };

    window.clearInterval(ele.timer);
    ele.timer=window.setInterval(function(){
        time+=10;
        if(time>=duration){
            window.clearInterval(ele.timer);
            for(var key in target){
                setCss(ele,key,target[key]);
            }
            if(typeof callback=='undefined'){
                callback.call(ele);//回调函数中的this还是运动的的这个元素
            }
            return
        }
        for(var key in change){
            var value=linear(time,begin[key],change[key],duration);
            setCss(ele,key,value);
        }
    },10);


}
function getCss(ele,attr){
    var val=null;
    if(window.getComputedStyle){
        val=window.getComputedStyle(ele)[attr];
    }else{
        if(attr=='opacity'){

            var reg=/^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;

        }
        val=ele.currentStyle[attr];
    }
    var reg=/^-?\d+(\.\d+)?(px|rem|pt)?$/;
    return reg.test(val)?parseFloat(val):val;
}
function setCss(ele,attr,val){
    if(attr=='opacity'){
        ele.style.opacity=val;
        ele.style.filter='alpha(opacity='+val*100+')';
        return;
    }

    if(attr=='float'){
        ele.style.cssFloat=val;
        ele.style.styleFloat=val;
        return;
    }

    var reg=/wight|height|top|bottom|left|right|(margin|padding)(Bottom|Top|Left|Right)?/;
    if(reg.test(attr)){
        if(!isNaN(val)){
            val+='px';
        }
    }
    ele.style[attr]=val;
}


function offset(ele){
    var l=0,t=0;
    l+=ele.offsetLeft;
    t+=ele.offsetTop;
    var pre=ele.offsetParent;
    while (pre){
        window.navigator.userAgent;
        l+=pre.clientLeft;
        t+=pre.clientTop;
        l+=pre.offsetLeft;
        t+=pre.offsetTop;
        pre=pre.offsetParent;
    }
    return{left:l,top:t};
}
function win(attr,val){//属性，值
    if(typeof val=='undefined'){
        return document.documentElement[attr] || document.body[attr];
    }
    document.documentElement[attr]=val;
    document.body=val;
}
