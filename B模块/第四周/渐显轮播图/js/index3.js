/**
 * Created by lenovo on 2017/2/4.
 */
//获取元素
var $banner=$('#banner');
var $bannerInner=$banner.find('.bannerInner');//find指所有的子孙后代
var $focusUl=$banner.children('.focusUl');
var $left=$banner.find('.left');
var $right=$banner.find('.right');
var $imgs=null;
var $lis=null;
var data=null;


//获取数据
$.ajax({
    type:'get',
    url:'data.txt?_='+Math.random(),
    async:false,
    dataType:'json',//返回的数据类型
    success:function(res){//res就是成功返回的数据，这个res会直接处理成dataType指定的类型
        data=res;
    }
});
console.log(data);

//绑定数据
if(data && data.length){
    var str='';
    var str1='';
    $.each(data,function(index,item){
        str+='<div><img src="" real="'+item.src+'"></div>';
        str1+=index==0?'<li class="cur"></li>':'<li></li>';
    });
    $bannerInner.html(str);//参数传了我就是赋值，参数没传就是获取
    $focusUl.html(str1);
}

$imgs=$bannerInner.find('img');
$imgs.each(function(index,itme){
    var $tempImg=$('<img/>');//创建img标签,
    $tempImg.prop('src',$(itme).attr('real'));//一个值是获取，俩个值是获取
    $tempImg.on('load',function(){
       $(itme).prop('src',$(this).prop('src'));
        if(index==0){
            $(itme).parent().css('zIndex',1).stop().animate({opacity:1},500);
        }
    });
});

//自动轮播
var timer=window.setInterval(autoPlay,2000);
var step=0;
function autoPlay(){
    step++;
    if(step==data.length){
        step=0;
    }
    setImgShow();
}
$lis=$focusUl.children();
function setImgShow(){
    $imgs.each(function(index,item){
        if(step == index){
            $(item)
            .parent()
            .css('zIndex',1)
            .stop()
            .animate({opacity:1},500,function(){
                $(item).parent().siblings().each(function(){
                    $(this).css('opacity',0);
                })
            })
        }else{
            $(index).parent().css('zIndex',0);
        }
    });
    $lis.each(function(index,item){
        index==step?$(item).addClass('cur'):$(item).removeClass('cur');
    });
}

//绑定事件
$banner.on('mouseover',function(){
    window.clearInterval(timer);
    $left.css('display','block');
    $right.css('display','block');
}).on('mouseout',function(){
    timer=window.setInterval(autoPlay,2000);
    $left.css('display','none');
    $right.css('display','none');
});


$left.on('click',function(){
    step--;
    if(step==-1){
        step=data.length-1;
    }
    setImgShow();
});
$right.on('click',autoPlay);

$lis.each(function(){
    $(this).on('click',function(){
        step=$(this).index();
        setImgShow();
    })
});
