// 获取元素
var banner = document.getElementsByClassName('banner')[0];
var bannerInner = banner.getElementsByClassName('bannerInner')[0];
var focusUl = banner.getElementsByClassName('focusUl')[0];
var left = banner.getElementsByClassName('left')[0];
var right = banner.getElementsByClassName('right')[0];
var imgs = bannerInner.getElementsByTagName('img');
var lis = focusUl.getElementsByTagName('li');
var data = null;
// 获取数据
;(function (){
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
// 绑定数据
;(function (){
    if(data && data.length){
        var str = ''; // img
        var str1 = ''; // li
        for(var i = 0; i < data.length; i++){
            str += '<div><img src="" real="'+ data[i]['src'] +'"></div>';
            str1 += i == 0 ? '<li class="cur"></li>' : '<li></li>';
        }
        bannerInner.innerHTML = str;
        focusUl.innerHTML = str1;
    }
})();
// 图片延迟加载
;(function imgsDealyLoad(){
    for(var i = 0; i < imgs.length; i++){
        var tempImg = document.createElement('img');
        tempImg.index = i;
        tempImg.src = imgs[i].getAttribute('real');
        tempImg.onload = function (){
            imgs[this.index].src = this.src;
            if(this.index == 0){
                imgs[0].parentNode.style.zIndex = 1;
                fadeIn(imgs[0].parentNode);
            }
        }
    }
})();
// 轮播
var timer = window.setInterval(autoPlay,2000); // 2s播一张
var index = 0; // index的值就是让哪张图片出现的索引
function autoPlay(){ // 执行一次播一张
    index++; // 累加之后的值就是要出现的图片的索引
    // 在所有的imgs里找出索引值和index相等的那一张出现，其他全部隐藏
    // 我们定义一个方法，专门负责和index的值相等的那一张出现。左右，焦点都用
    if(index == /*4*/data.length){
        index = 0;
    }
    setImgShow();
}
function setImgShow(){
    for(var i = 0; i < imgs.length; i++){
        if(i == index){
            imgs[i].parentNode.style.zIndex = 1;
            fadeIn(imgs[i].parentNode);
        }else{
            imgs[i].parentNode.style.zIndex = 0;
            imgs[i].parentNode.style.opacity = 0;
        }
    }
    // 焦点
    for(var i = 0; i < lis.length; i++){
        lis[i].className = i == index ? 'cur' : '';
    }
}

banner.onmouseover = function (){
    window.clearInterval(timer);
    left.style.display = 'block';
    right.style.display = 'block';
}
banner.onmouseout = function (){
    timer = window.setInterval(autoPlay,2000);
    left.style.display = right.style.display = 'none';
}

right.onclick =  autoPlay;

var canClick = true; // 借助一个第三方的标识变量来处理点击逻辑
left.onclick = function (){
    if(canClick){
        index--;
        if(index == -1){
            index = data.length-1;
        }
        setImgShow();
    }
    canClick = false;

}
//绑定点击事件
;(function (){
    for(var i = 0; i < lis.length; i++){
        lis[i].index = i;
        lis[i].onclick = function (){
            index = this.index;
            setImgShow();
        }
    }
})();


function fadeIn(ele){
    window.clearInterval(ele.timer);
    ele.timer = window.setInterval(function (){
        var opacityVal = window.getComputedStyle(ele,null).opacity/1;
        if(opacityVal >= 1){
            window.clearInterval(ele.timer);
            canClick = true;
            return;
        }
        opacityVal += 0.01;
        ele.style.opacity = opacityVal;
    },10);
}






// function animate(option){
//     // t b c d
//     var time = 0;
//     var begin = {};
//     var change = {};
//     var duration = option.duration || 1000; //多长时间内完成运动
//     var target = option.target; // 运动到哪
//     var ele = option.ele; // 哪个元素运动
//     var callback = option.callback; // 动画完成之后要做什么
//     for(var key in target){
//         begin[key] = getCss(ele,key);
//         change[key] = target[key] - begin[key];
//     }
//     window.clearInterval(ele.timer); // 清空遗留定时器
//     ele.timer = window.setInterval(function (){
//         time += 10;
//         if(time >= duration){ // 运动完成之后要执行
//             window.clearInterval(ele.timer);
//             for(var key in target){
//                 setCss(ele,key,target[key]);
//             }
//             if(typeof callback == 'function'){
//                 callback.call(ele);
//             }
//             return;
//         }
//         for(var key in change){
//             var val = linear(time,begin[key],change[key],duration);
//             setCss(ele,key,val);
//         }
//     },10);
//     function linear(t,b,c,d){
//         return b + t/d*c;
//     }
// }
// getCss
// setCss









