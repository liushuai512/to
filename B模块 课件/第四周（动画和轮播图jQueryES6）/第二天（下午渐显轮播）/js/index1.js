// 获取元素
var banner = document.getElementById('banner');
var bannerInner = utils.getElesByClass('bannerInner')[0];
var focusUl = utils.getElesByClass('focusUl')[0];
var left = utils.getElesByClass('left')[0];
var right = utils.getElesByClass('right')[0];
var imgs = bannerInner.getElementsByTagName('img');
var lis = focusUl.getElementsByTagName('li');
var data = null;
//
;(function (){
    var xhr = new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
console.log(data);
//
;(function (){
    if(data){
        var str = '';
        var str1 = ''; // for li
        for(var i = 0; i < data.length; i++){
            str += '<div><img src="" real="'+ data[i].src +'"></div>';
            str1 += i == 0 ? '<li class="cur"></li>' : '<li></li>';
        }
        bannerInner.innerHTML = str;
        focusUl.innerHTML = str1;
    }
})();
// 验证图片资源有效性
;(function (){
    for(var i = 0; i < imgs.length; i++){
        var tempImg = document.createElement('img');
        tempImg.index = i;
        tempImg.src = imgs[i].getAttribute('real');
        tempImg.onload = function (){
            imgs[this.index].src = this.src;
            if(this.index == 0){
                utils.setCss(imgs[0].parentNode,'zIndex',1);
                animate({
                    ele :  imgs[0].parentNode,
                    target : {
                        opacity : 1
                    },
                    duration : 500
                });
            }
        }
        tempImg = null;
    }
})();
// 轮播

var timer = window.setInterval(autoPlay,2000);
var index = 0; // 默认第一张
function autoPlay(){
    index++;
    // 写一个函数让对应index的这张上来，其他的下去,上来之后透明度赶紧从0到1
    if(index == /*4*/data.length){
        index = 0;
    }
    setImg();
}
function setImg(){
    for(var i = 0; i < imgs.length; i++){
        if(i == index){
            utils.setCss(imgs[i].parentNode,'zIndex',1);
            animate({
                ele : imgs[i].parentNode,
                target : {
                    opacity : 1
                },
                duration : 500,
                callback : function (){
                    var  siblings = utils.siblings(this); //除了当前在上面的这一张
                    for(var i = 0; i < siblings.length; i++){
                         utils.setCss(siblings[i],'opacity',0);
                    }
                }
            })
        }else{
            utils.setCss(imgs[i].parentNode,'zIndex',0);
        }
    }
    for(var i = 0; i < lis.length; i++){
        lis[i].className = i == index ? 'cur' : '';
    }
}

banner.onmouseover = function (){
    window.clearInterval(timer);
    left.style.display = right.style.display = 'block';
}
banner.onmouseout = function (){
    timer = window.setInterval(autoPlay,2000);
    left.style.display = right.style.display = 'none';
}
// 我喜欢左小青(girl)那样的
left.onclick = function (){
    index--;
    if(index == -1){
        index = /*3*/data.length-1;
    }
    setImg();
}
right.onclick = autoPlay;

// 焦点
;(function (){
    for(var i = 0; i < lis.length; i++){
        lis[i].index = i;
        lis[i].onclick = function (){
            index = this.index;
            setImg();
        }
    }
})();
