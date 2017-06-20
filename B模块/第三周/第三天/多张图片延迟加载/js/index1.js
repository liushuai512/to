
//获取元素
var newList = utils.getElesByClass('newList')[0];
var aImg = newList.getElementsByTagName('img');
var data = null;

//获取数据
;(function(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','data.txt?_='+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && /^2\d{2}$/.test(xhr.status)){
            data=utils.jsonParse(xhr.responseText)
        }
    };
    xhr.send();
})();
console.log(data);

;(function(){
    if(data && data.length){
        var str='';
        for(var i=0;i<data.length;i++){
            str+='<li>';
                  str+='<div><img str="" real="'+data[i].src+'"></div>';
                  str+='<div><h3>'+data[i].title+'</h3><p>'+data[i].desc+'</p></div>';
            str+='</li>';
        }
        newList.innerHTML=str;
    }
})();

function aImgDeLayLoad(){
    for(var i=0;i<aImg.length;i++){
        if(aImg[i].isLoaded){
            continue;
        }
        var winHeight=utils.win('clientHeight');
        var winScrollTop=utils.win('scrollTop');

        var aImgHeight=aImg[i].parentNode.offsetHeight;
        var aImgOffset=utils.offset(aImg[i].parentNode).top;
        if(winHeight + winScrollTop >aImgHeight +aImgOffset ){
            singDelayLoad(aImg[i]);

        }
    }
}

function singDelayLoad(img){
    var tempImg=document.createElement('img');
    tempImg.src=img.getAttribute('real');
    tempImg.onload=function(){
        img.src=this.src;
        fadeIn(img);
    };
    img.isLoaded=true;
}

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

aImgDeLayLoad();
window.onscroll=aImgDeLayLoad;

