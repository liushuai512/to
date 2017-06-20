/**
 * Created by lenovo on 2017/3/5.
 */
/*
 * 项目中的loading 区域是在页面内容展示之前，给用户一个等待加载的时间，主要是处理图片（或者音视频）的加载
 *
 * */
console.log('on')
var loadingRender = (function () {
    //ary 记录了我们当前的所有图片
    var ary = ["icon.png", "zf_concatAddress.png", "zf_concatInfo.png", "zf_concatPhone.png", "zf_course.png", "zf_course1.png", "zf_course2.png", "zf_course3.png", "zf_course4.png", "zf_course5.png", "zf_course6.png", "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_cubeTip.png", "zf_emploment.png", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", "zf_messageLogo.png", "zf_messageStudent.png", "zf_outline.png", "zf_phoneBg.jpg", "zf_phoneDetail.png", "zf_phoneListen.png", "zf_phoneLogo.png", "zf_return.png", "zf_style1.jpg", "zf_style2.jpg", "zf_style3.jpg", "zf_styleTip1.png", "zf_styleTip2.png", "zf_teacher1.png", "zf_teacher2.png", "zf_teacher3.jpg", "zf_teacher4.png", "zf_teacher5.png", "zf_teacher6.png", "zf_teacherTip.png"];
    var curNum = 0,
        total = ary.length;

    var $loading = $('.loading'),
        $progress = $loading.children('.progress'),
        $progressSpan = $progress.children('.span');

    return {
        init: function () {
            console.log('ok')
            //  jQ中的each和原生中的forEach参数是相反的
            $.each(ary, function (index, item) {
                var oImg = new Image;
                oImg.src = 'img/' + item;
                oImg.onload = function () {
                    oImg = null;
                    //curNum++;
                    var n = (++curNum) / total;
                    $progressSpan.css('width', n * 100 + '%');

                    //当所有图片都加载完成后，我们让loading层消失（设置1S的延迟，防止网速过快，loading层看不见或者层闪烁问题）
                    if (curNum === total) {
                        window.setTimeout(function () {
                            $loading.css('opacity', 0).on('webkitTransitionEnd', function () {
                                $(this).remove();
                            })
                        }, 1500);
                    }
                }
            });
        }
    }

})();
loadingRender.init();
