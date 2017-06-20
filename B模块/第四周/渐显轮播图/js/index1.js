/**
 * Created by lenovo on 2017/2/4.
 */
//获取元素
let banner = document.getElementById('banner');//let变量不能重名
let bannerInner = banner.getElementsByClassName('bannerInner')[0];
let focusUl = banner.getElementsByClassName('focusUl')[0];
let left = banner.getElementsByClassName('left')[0];
let right = banner.getElementsByClassName('right')[0];
let imgs = bannerInner.getElementsByTagName('img');
let lis = focusUl.getElementsByTagName('li');
let data = null;

//获取数据
;(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);//?前面的：获取数据的位置 后面的：
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
})();
console.log(data);

//绑定数据
;(function () {
    if (data && data.length) {//判断是否存在 data 文件
        var str = '';//img
        var str1 = '';//li
        for (var i = 0; i < data.length; i++) {
            str += '<div><img src="" real="' + data[i]['src'] + '"></div>';
            str1 += i == 0 ? '<li class="cur"></li>' : '<li></li>';
        }
        //将拼好的字符串送回到页面
        bannerInner.innerHTML = str;
        focusUl.innerHTML = str1;
    }
    //释放字符串
    str = null;
    str1 = null;
})();

//检验图片（图片延迟加载）
;(function () {
    for (var i = 0; i < imgs.length; i++) {
        var tempImg = document.createElement('img');
        tempImg.index = i;//事件帮给谁。this就是谁
        tempImg.src = imgs[i].getAttribute('real');//专门用来获取行内样式属性的
        tempImg.onload = function () {//监听tempImg事件
            imgs[this.index].src = this.src;
            if (this.index == 0) {
                imgs[0].parentNode.style.zIndex = 1;
                /*animate1({
                 ele:imgs[0].parentNode,
                 target:{
                 opacity:1
                 },
                 duration:500
                 })*/
                fadeIn(imgs[0].parentNode);
            }
        };
        tempImg = null;
    }
})();

//轮播
var timer = window.setInterval(autoPlay, 2000);//前面这个函数是啥？？？？？？？？
var index = 0;//index的值是谁就是让谁出现
function autoPlay() {//执行一次播一张
    index++;//累加之后的值就是图片的索引，图片已经到第二张
    //在所有的图片中imgs里找出索引值和index相等的哪一张出现，其他全部隐藏
    //我们声明定义一个方法，专门负责和index的值相等的哪一张出现。左右，焦点都用
    if (index == data.length) {
        index = 0;
    }
    setImgShow();

}
function setImgShow() {//这个方法是，不论你index是几，我都让你出现
    for (var i = 0; i < imgs.length; i++) {
        if (i == index) {
            imgs[i].parentNode.style.zIndex = 1;
            fadeIn(imgs[i].parentNode);
        } else {
            imgs[i].parentNode.style.zIndex = 0;
            imgs[i].parentNode.style.opacity = 0;
        }
    }
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = i == index ? 'cur' : '';
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

var canClick=true;//借助一个第三方表示变量来处理点击逻辑
left.onclick=function(){
    if(canClick){
        index--;
        if(index==-1){
            index=data.length-1;
        }
        setImgShow();
    }
    canClick=false;

};

right.onclick=function(){
    if(canClick){
        autoPlay;//赋值的是一个地址，不是函数
    }
    setImgShow();
    canClick=false;
}


//绑定事件
;(function(){
    for(var i=0;i<lis.length;i++){//循环和事件在一起就需要通过自定义来处理
        lis[i].index=i;
        lis[i].onclick=function(){
            index=this.index;
            setImgShow();
        }
    }
})();


function fadeIn(ele) {
    window.clearInterval(ele.timer);
    ele.timer = window.setInterval(function () {
        var opacityVal = window.getComputedStyle(ele, null).opacity / 1;//获取样式  处理字符串的引号
        if (opacityVal >= 1) {
            window.clearInterval(ele.timer);
            canClick=true;

            return;
        }
        opacityVal += 0.01;
        ele.style.opacity = opacityVal;
    }, 10);
}

