/**
 * Created by lenovo on 2017/1/18.
 */
//获取元素
var banner=document.getElementById('banner');
var bannerInner=utils.getElesByClass('bannerInner',banner)[0];
var focusUl=utils.getElesByClass('focusUl',banner)[0];
var left=utils.getElesByClass('left',banner)[0];
var right=utils.getElesByClass('right',banner)[0];
var imgs=bannerInner.getElementsByTagName('img');
var lis=focusUl.getElementsByTagName('li');


//获取数据
;(function(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState ==4 && /^2\d{2}$/.test(xhr.status)){
            data=utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send();
})();
console.log(data);

;(function(){
    if(data){
        var str='';
        var strLi='';
        for(var i=0;i<data.length;i++){
            var curData=data[i];
            str+='<div><img src="" real="'+data[i].src+'"></div>';
            strLi+=i==0?'<li class="cur"></li>':'<li></li>';
        }
        //为了保证轮播时做无缝连接，需在最后添加第一张图片
        str+='<div><img src="" real="'+data[0].src+'"></div>';
        utils.setCss(bannerInner,'width',(data.length+1)*600);//
        bannerInner.innerHTML=str;
        focusUl.innerHTML=strLi;
    }
})();

//图片是否有效性验证
;(function(){
    for(var i=0;i<imgs.length;i++){
        var tempImg=document.createElement('img');
        tempImg.index=i;
        tempImg.src=imgs[i].getAttribute('real');

        tempImg.onload=function(){
            imgs[this.index].src=this.src;
            //imgs.src=this.src;
            animate({
                ele:imgs[this.index],
                target:{
                    opacity:1
                },
                duration:500
            });
        }
    }
})();

//轮播图开始
var timer=window.setInterval(autoPlay,2000);
var index=0;
function autoPlay(){
    index++;
    if(index==data.length+1){//目前正在从最后一张往后播放，赶紧切换到第一张（直接切换）
        utils.setCss(bannerInner,'left',0);
        index=1;
    }
    animate({
        ele:bannerInner,
        target : {
            left:-index*600
        },
        duration:500
    });
    focusAlign();

}

//焦点对齐
function focusAlign(){
    var tempIndex=index==lis.length?0:index;
    for(var i=0;i<lis.length;i++){
        lis[i].className=i==tempIndex?'cur':'';

    }
}

//鼠标悬停停止播放
banner.onmousemove=function(){
    window.clearInterval(timer);
    //左右按钮出现
    left.style.display='block';
    right.style.display='block';
};
//给左右按钮绑定点击事件
banner.onmouseout=function(){
    timer=window.setInterval(autoPlay,2000);
    left.style.display='none';
    right.style.display='none';
};

//给左右按钮绑定点击事件=》和自动轮播的逻辑相反
left.onclick=function(){
    index--;
    if(index==-1){
        utils.setCss(bannerInner,'left',-data.length*600);
        index=data.length-1;
    }
    animate({
        ele:bannerInner,
        target:{
            left:-index*600
        },
        duration:500
    });
    focusAlign();
};
right.onclick=autoPlay;

//给焦点绑定点击事件
;(function(){
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){

        }
    }
})();




