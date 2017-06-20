/**
 * Created by lenovo on 2017/2/3.
 */
var banner=document.getElementById('banner');
var bannerInner=utils.getElesByClass('bannerInner')[0];
var focusUl=utils.getElesByClass('focusUl')[0];
var left=utils.getElesByClass('left')[0];
var right=utils.getElesByClass('right')[0];
var imgs=bannerInner.getElementsByTagName('img');
var lis=focusUl.getElementsByTagName('li');
var data=null;

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
;(function () {
    if (data && data.length) {
        var str = '';
        var strLi = '';
        for (var i = 0; i < data.length; i++) {
            str+='<div><img src="" real="'+data[i].src+'"></div>';
            strLi += i == 0 ? '<li class="cur"></li>' : '<li></li>';
        }
        bannerInner.innerHTML = str;
        focusUl.innerHTML = strLi;
    }
})();


//检验图片
;(function(){
    for(var i=0;i<imgs.length;i++){
        var tempImg=document.createElement('img');
        tempImg.src=imgs[i].getAttribute('real');
        tempImg.index=i;
        tempImg.onload=function(){
            imgs[this.index].src=this.src;
            if(this.index==0){
                utils.setCss(imgs[0].parentNode,'zIndex',1);
                animate({
                    ele:imgs[0].parentNode,
                    target:{
                        opacity:1
                    },
                    duration:500
                })
            }
        };
        tempImg=null;
    }
})();

//轮播
var timer=window.setInterval(autoPlay,2000);
var index=0;
function autoPlay(){
    index++;
    if(index==data.length){
        index=0;
    }
    setImg();

}

function setImg(){
    for(var i=0;i<imgs.length;i++){
        if(i==this.index){
            utils.setCss(imgs[i].parentNode,'zIndex',1);
            animate({
                ele:imgs[i].parentNode,
                target:{
                    opacity:1
                },
                duration:500,
                callback:function(){
                            this;
                            var siblings=utils.siblings(this);
                            for(var i=0;i<siblings.length;i++){
                                utils.setCss(siblings[i],'opacity',0)
                    }
                }
            })
        }else{
            utils.setCss(imgs[i].parentNode,'zIndex',0);
        }
    }
    for(var i=0;i<lis.length;i++){
        lis[i].className=i==index?'cur':'';
    }
}

banner.onmousemove=function(){
    window.clearInterval(timer);
    left.style.display=right.style.display='block';
};
banner.onmouseout=function(){
    timer=window.setInterval(autoPlay,2000);
    left.style.display=right.style.display='none';
};

left.onclick=function(){
    index--;
    if(index==-1){
        index=data.length-1;
    }
    setImg();
};
right.onclick=autoPlay;

;(function(){
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            index=this.index;
            setImg();
        }
    }
})();
