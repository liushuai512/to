var $banner1 = $('#banner1');
var $bannerInner = $banner1.find('.bannerInner');
var $focusUl = $banner1.find('.focusUl');
var $left = $banner1.find('a:first');
var $right = $banner1.find('a:last');

var $imgs = null;
var $lis = null;
var data = null;
//获取数据
$.ajax({
    type : 'get',
    url : 'data.txt',
    cache : false,
    dataType :'json',
    async : false,
    success : function (res){
        data = res;
    }
});
console.log(data);

// 绑定数据
var str = '';
var str1 = '';
$.each(data,function (index,item){ // item : {src: 'iamges/1.jpg'}
    str += '<div><img src="" real="'+ item.src +'"></div>';
    str1 += index == 0 ? '<li class="cur"></li>' : '<li></li>';
});
$bannerInner.html(str);
$focusUl.html(str1);

//图片有效性验证
// 使用jq没有dom映射关系，对于这种动态添加的元素需要重新获取
$imgs = $bannerInner.find('img');
$lis = $focusUl.children('li');
$imgs.each(function (index,item){ // item => img每一张图片
    var $tempImg = $('<img>');
    $tempImg.prop('src',$(item).attr('real')); // tempImg.src = imgs[i].src;
    $tempImg.on('load',function (){
        $(item).prop('src',$(this).prop('src'));
        if(index == 0){
            $(item).parent('div').css('zIndex',1).stop().animate({opacity : 1},500);
        }
    })
});
// 剩下的部分明年再说...
// 封装成一个函数，并且添加到jquery中的拓展方法中...



