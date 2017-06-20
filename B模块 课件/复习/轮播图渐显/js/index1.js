// jq
// 获取元素

;(function (){
    function banner(/*$banner,*/url,interval){
        this; // $banner
        interval = interval || 2000;
        var $bannerInner = /*$banner*/this.find('.bannerInner');
        var $focusUl = /*$banner*/this.children('.focusUl');
        var $left = /*$banner*/this.find('.left');
        var $right = /*$banner*/this.find('.right');
        var $imgs = null;
        var $lis = null;
        var data = null;
// 获取数据
        $.ajax({
            type : 'get',
            url : url + '?_='+Math.random(),
            async : false,
            dataType : 'JSON',
            success : function (res){//res就是成功返回的数据,这个res会直接处理成dataType指定的类型

                data = res;
            }
        });
        console.log(data);

// 绑定数据
        if(data){
            var str = '';
            var str1 = '';
            $.each(data,function (index,item){
                str += '<div><img src="" real="'+ item.src +'"></div>';
                str1 += index == 0 ? '<li class="cur"></li>' : '<li></li>';
            });
            $bannerInner.html(str);
            $focusUl.html(str1);
        }

// 图片延迟加载
        $imgs = $bannerInner.find('img');

        $imgs.each(function (index,item){
            // item : 就是每一张图片, .babelrc : 每一张图片的索引
            // console.log(this); // this => item
            var $tempImg = $('<img/>');
            $tempImg.prop('src',$(item).attr('real'));
            $tempImg.on('load',function (){
                $(item).prop('src',$(this).prop('src'));
                if(index == 0){
                    $(item).parent().css('zIndex',1).stop().animate({opacity : 1},500);
                }
            });
        });
// 自动播放
        var timer = window.setInterval(autoPlay,interval);
        var step = 0;
        function autoPlay(){
            step++;
            if(step == data.length){
                step = 0;
            }
            setImgShow();
        }
        $lis = $focusUl.children();
        function setImgShow(){
            $imgs.each(function (index,item){ //.babelrc : 0 1 2 3  item : img,img,img,img
                if(step == index){
                    $(item)
                        .parent()
                        .css('zIndex',1)
                        .stop()
                        .animate({opacity:1},500,function (){
                            // 除了当前正在运动的这一个div的其他兄弟节点div的透明度全部设置成0
                            $(item).parent().siblings().each(function (){
                                $(this).css('opacity',0); // this是遍历的每一项
                            })
                        })
                }else{
                    $(item).parent().css('zIndex',0);
                }
            });
            // 焦点图  zepto
            $lis.each(function (index,item){
                index == step ? $(item).addClass('cur') : $(item).removeClass('cur');
            });
        }
// 绑定事件
        /*$banner*/this.on('mouseover',function (){
            window.clearInterval(timer);
            $left.css('display','block');
            $right.css('display','block');
        }).on('mouseout',function (){
            timer = window.setInterval(autoPlay,2000);
            $left.css('display','none');
            $right.css('display','none');
        });

        $left.on('click',function (){
            step--;
            if(step == -1){
                step = data.length-1;
            }
            setImgShow();
        });

        $right.on('click',autoPlay);

        $lis.each(function (){
            $(this).on('click',function (){
                step = $(this).index();
                setImgShow();
            });
        });
    }
    /*$.extend({
        banner : banner
    }); // jquery本身上的属性*/
    $.fn.extend({
    banner : banner
}); // jquery原型上

})();








//
// $.extend({ // $.ajax  $.each
//     fn : function (){
//         alert(1);
//     }
// });
//
// $.fn.extend({ // jQuery.prototype
//     foo : function (){
//         alert(2);
//     }
// });





