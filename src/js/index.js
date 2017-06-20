var hrefReg = {
    aboutUsReg: /aboutus/,
    anfangReg: /anfangpeixun/,
    riskNanfeiReg: /fengxian-nanfei/,
    loginReg: /login/,
    nanfeiJqReg: /nanfei-jingqing/
};

var url = window.location.href;  //保存当前的地址栏中的地址

/**
 * 初始化轮播图插件
 */
unsliderInit();
function unsliderInit() {
    // 导航栏顶部轮播
    var banner0 = $('.tuC').unslider({
        autoplay: true,
        keys: false,
        nav: false,
        pause:true
    });


    $('#banner1').on('mouseover', function () {
        // banner0.unslider('stop');
        banner0.data('unslider').stop();
    });

    $('#banner1').on('mouseout', function () {
        // banner0.unslider('start');
        banner0.data('unslider').start();
    });

    // 第一个大轮播
    var banner1 = $('.bannerInner').unslider({
        autoplay: true,
        animation: 'fade', // 渐隐渐现
        keys: false // 关掉键盘
    });

    $('#banner2 .unslider').on('mouseover', function () {
        banner1.unslider('stop');
    });

    $('#banner2 .unslider').on('mouseout', function () {
        banner1.unslider('start');
    });

    // 第二个垂直轮播
    var banner2 = $('.informBanner').unslider({
        autoplay: true,
        animation: 'vertical',
        nav: false,
        arrows: false,
        keys: false
    });

    $('#banner4 .unslider').on('mouseover', function () {
        banner2.unslider('stop');
    });

    $('#banner4 .unslider').on('mouseout', function () {
        banner2.unslider('start');
    });


    // 第三个轮播图
    var banner3 = $('.bannerInner1').unslider({
        autoplay: false,
        animation: 'fade',
        keys: false,
        nav: false
    });

    $('#banner3 .unslider').on('mouseover', function () {
        banner3.unslider('stop');
    });

    $('#banner3 .unslider').on('mouseout', function () {
        banner3.unslider('start');
    });

}

/**
 * 关于我们页面
 */
function aboutUs() {
    // 关于我们li事件绑定
    $('.conMain-list').on('click', 'li', function (e) {
        $(e.currentTarget).addClass('on').siblings().removeClass('on');
    });
}

/**
 * 安防培训
 */
function anfangTrain() {
    // 箭头
    $('.arrow').on('click', function (e) {
        var $target = $(e.target);
        if ($target.hasClass('rotate')) {
            $target.removeClass('rotate');
            $target.parent().next().slideDown(700);
        } else {
            $target.addClass('rotate');
            $target.parent().next().slideUp(700);
        }
    });

    // 海外常见风险左侧列表
    $('.overRisk-lul').on('click', 'li', function (e) {
        var index = $(e.currentTarget).index();
        $(e.currentTarget).addClass('on').siblings().removeClass('on');
        $('.overRisk-rul li').eq(index).addClass('on').siblings().removeClass('on');
        $('.overRisk-rCon').eq(index).show().siblings().hide();
    });

    // 海外常见风险右侧
    $('.overRisk-rul').on('click', 'li', function (e) {
        var index = $(e.currentTarget).index();
        $(e.currentTarget).addClass('on').siblings().removeClass('on');
        $('.overRisk-lul li').eq(index).addClass('on').siblings().removeClass('on');
        $('.overRisk-rCon').eq(index).show().siblings().hide();
    });

    // 安全应对方法左侧
    $('.secMethod-lul').on('click', 'li', function (e) {
        var index = $(e.currentTarget).index();
        $(e.currentTarget).addClass('on').siblings().removeClass('on');
        $('.secMethod-rul li').eq(index).addClass('on').siblings().removeClass('on');
        $('.secMethod-rCon').eq(index).show().siblings().hide();
    });

    // 安全应对方法右侧
    $('.secMethod-rul').on('click', 'li', function (e) {
        var index = $(e.currentTarget).index();
        $(e.currentTarget).addClass('on').siblings().removeClass('on');
        $('.secMethod-lul li').eq(index).addClass('on').siblings().removeClass('on');
        $('.secMethod-rCon').eq(index).show().siblings().hide();
    });

}

/**
 * 地区风险-南非
 */
function riskNanfei() {
    // 箭头
    $('.arrow').on('click', function (e) {
        var $target = $(e.target);
        if ($target.hasClass('rotate')) {
            $target.removeClass('rotate');
            $target.parent().next().slideDown(700);
        } else {
            $target.addClass('rotate');
            $target.parent().next().slideUp(700);
        }
    });

    // 南非-左侧
    // $('.conMain-list').on('click', 'li', function (e) {
    //     var index = $(e.currentTarget).index(),
    //         $li = $(e.currentTarget);
    //     if (!$li.hasClass('rescue')) {
    //         $li.addClass('on').siblings().removeClass('on');
    //         console.log($('.tab-item'));
    //     }
    //
    // })

    // 右侧-top
    $('.top-rul').on('click', 'li', function (e) {
        var index = $(e.currentTarget).index(),
            $li = $(e.currentTarget);
        $li.addClass('on').siblings().removeClass('on');
        $('.top-rCon').eq(index).show().siblings().hide();
    });

    // 右侧-middle
    $('.middle-rul').on('click', 'li', function (e) {
        var index = $(e.currentTarget).index(),
            $li = $(e.currentTarget);
        $li.addClass('on').siblings().removeClass('on');
        $('.middle-rCon').eq(index).show().siblings().hide();
    });

    // 右侧-bottom
    $('.bottom-rul').on('click', 'li', function (e) {
        var index = $(e.currentTarget).index(),
            $li = $(e.currentTarget);
        $li.addClass('on').siblings().removeClass('on');
        $('.bottom-rCon').eq(index).show().siblings().hide();
    });
}

/**
 * 登录页
 */
function login() {
    var $account = $('#account'),
        $pwd = $('#pwd'),
        $submit = $('.submit'),
        borderColor = 'rgb(246, 244, 244)';

    $account.on('blur', function () {
        if ($(this).val().trim() == '') {
            $(this).css('borderColor', 'rgb(255,0,0)');
            if (!$(this).prev('span').length) {
                $(this).before('<span class="account_tip" style="color: red;padding: 5px;font-size: 12px;display: block">* 请 填 写 用 户 名 信 息</span>');
            }
        }
    });

    $account.on('input', function (e) {
        $(this).css('borderColor', borderColor);
        if ($('.account_tip').length) {
            $('.account_tip').remove();
        }
        e.keyCode == 13 && $pwd.focus();
    });


    $pwd.on('blur', function () {
        if ($(this).val().trim() == '') {
            $(this).css('borderColor', 'rgb(255,0,0)');
            if ($account.val() == '') {
                $(this).before('<span class="pwd_tip" style="color: red;padding: 5px;font-size: 12px;display: block">* 请 先 填 写 用 户 名 信 息</span>');
            } else if (!$(this).prev('span').length) {
                $(this).before('<span class="pwd_tip" style="color: red;padding: 5px;font-size: 12px;display: block">* 请  填 写 密 码 信 息</span>');
            }
        }
    });

    $pwd.on('input', function (e) {
        $(this).css('borderColor', borderColor);
        if ($('.pwd_tip').length) {
            $('.pwd_tip').remove();
        }
        e.keyCode == 13 && $submit.focus();
    });


    $submit.on('click', function (e) {
        e.preventDefault();
        if ($account.val().trim() != '' && $pwd.val().trim() != '') {
            alert(JSON.stringify({account: $account.val(), password: $pwd.val()}));
        } else {
            alert('账号或密码不允许为空');
        }
    });

    $submit.on('keydown', function (e) {
        e.keyCode == 13 && $submit.click();
    });
}

/**
 * 南非-新闻列表页
 */
function nanfeiNewsList() {
    // 左侧箭头
    $('.arrow').on('click', function (e) {
        var $target = $(e.target);
        if ($target.hasClass('rotate')) {
            $target.removeClass('rotate');
            $target.parent().next().slideDown(700);
        } else {
            $target.addClass('rotate');
            $target.parent().next().slideUp(700);
        }
    });

    // 左侧二级导航
    $('.conMain-list').on('click', 'li', function (e) {
        var $li = $(e.currentTarget);
        if (!$li.hasClass('rescue')) {
            $(e.currentTarget).addClass('on').siblings().removeClass('on');
        }
    });

    // 监听onscroll事件
    var $leftList = $('.danger-left'),
        $leftListTop = $leftList.offset().top;
    // 获取左侧所有li
    var $li = $('.conMain-list li');

    $(window).on('scroll', function () {
        var scrollTop = $(document).scrollTop();

        // 回到顶部


        // 左侧列表position设置
        if (!$leftList.flag && scrollTop >= $leftListTop) {
            $leftList.flag = true;
            $leftList.css({
                position: 'fixed',
                top: '0'
            });
        } else if (scrollTop < $leftListTop) {
            // 此处代码 消耗性能
            $leftList.flag = false;
            $leftList.css('position', 'static');
        }

        // 右侧滚动监听
        $('.jt-item').each(function (index, item) {
            if (scrollTop + 50 >= $(item).offset().top) {
                $li.eq(index).addClass('on').siblings().removeClass('on');
            }
        });
    });

    // 获取加载更多按钮
    var frg = document.createDocumentFragment();
    $('#jqfb .btn').on('click', function () {
        var $this = $(this);
        var itemParentDiv = $this.parent().prev();
        var $items = itemParentDiv.children('div');
        itemParentDiv.append(`<div class="news-item clear">
                        <h3 class="news-title on"><a href="">新疆塔什库尔干县震后第一夜</a></h3>
                        <div class="news-img fl">
                            <img src="img/jingqingfabu/top.png" alt="新闻">
                        </div>
                        <div class="news-info hasImg fl">
                            <p class="time">2017-05-12 08:59</p>
                            <p>
                                昨天（11日）凌晨5点58分，发生在新疆喀什地区塔什库尔干县的5.5级地震造成8人死亡，23人受伤，1.2万人受灾。地震发生后，多方力量迅速展开抗震救灾工作。震后第一夜，
                            </p>
                        </div>
                    </div>`)
    });
}


$(function () {
    if (hrefReg.aboutUsReg.test(url)) {
        aboutUs();
    } else if (hrefReg.anfangReg.test(url)) {
        anfangTrain();
    } else if (hrefReg.riskNanfeiReg.test(url)) {
        riskNanfei();
    } else if (hrefReg.loginReg.test(url)) {
        login();
    } else if (hrefReg.nanfeiJqReg.test(url)) {
        nanfeiNewsList();
    }
});

