/**
 * Created by lenovo on 2017/1/12.
 */
var newsList = document.getElementById('newsList');
var aImg = newsList.getElementsByTagName('img');
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


;(function bindData() {
    if (data && data.length) {
        //data存在并且data里还存在数据
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<li>';
            str += '<div><img src="" real="' + data[i]['src'] + '"></div>';
            str += '<div><h3>' + data[i].title + '</h3><p>' + data[i].desc + '</p></div>';
            str += '</li>';
        }
        newsList.innerHTML = str;
    }
})();


//多张图片延迟加载==>循环判断每一张图片是否完全进入到窗口中

function aImgDelayLoad() {
    for (var i = 0; i < aImg.length; i++) {

        if (aImg.isLoaded) {
            continue;
        }
        //循环判断每一张是否完全进入
        var winHeight = utils.win('clientHeight');//窗口高度
        var winScrollTop = utils.win('scrollTop');//窗口滚出去的高度

        var imgHeight = aImg[i].parentNode.offsetHeight; //盒子的高度
        var imgOffsetTop = utils.offset(aImg[i].parentNode).top;//盒子距离body的偏移量

        if (winHeight + winScrollTop > imgHeight + imgOffsetTop) {
            //当前正在循环的这张图片完全进入到窗口
            singleDelayLoad(aImg[i]);

        }
    }
}

function singleDelayLoad(img) {

    var tempImg = document.createElement('img');
    tempImg.src = img.getAttribute('real');
    tempImg.onload = function () {
        img.src = this.src;
        fadeIn(img);
    };
    img.isLoaded = true;

}

function fadeIn(img){
    window.clearInterval(img.timer);
    img.timer=window.setInterval(function(){
        var opacity=utils.getCss(img,'opacity');
        if(opacity>=1){
            window.clearInterval(img.timer);
            return;
        }
        opacity+=0.01;
        utils.setCss(img,'opacity',opacity);

    },10)

}

aImgDelayLoad();
window.onscroll=aImgDelayLoad;


