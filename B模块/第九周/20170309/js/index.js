//获取问号传参值
String.prototype.myQueryURLParameter =function() {
    var reg=/([^?&#=]+)=([^?&#=]+)/g,
        obj={};
    this.replace(reg,function(){
        obj[arguments[1]]=arguments[2];
    });
    reg=/#([^?=#&]+)/;
    this.replace(reg,function(){
        obj['HASH']=arguments[1];
    });
    return obj;
};

//格式化时间字符串
String.prototype.myFormatTime = function (template) {
    template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
    let ary = this.match(/\d+/g);
    template = template.replace(/\{(\d)\}/g, function () {
        let index = arguments[1],
            num = ary[index] || '00';
        num.length < 2 ? num = '0' + num : null;
        return num;
    });
    return template;
};


/*MAIN RENDER*/
let mainRender=(()=>{
    let $header=$('.header'),
        $main=$('.main'),
        $menu=$main.find('.menu'),
        $calendar=$main.find('.calendar'),
        $match=$main.find('.match');
    let computedHeight = ()=>{
        let winH=$(window).height(),//获取一屏幕的高度,height 是一个集成方法
            heightH=$header.outerHeight(),
            calendarH=$calendar.outerHeight();


        let mainH=winH-heightH-40;
        $main.height(mainH);
        $menu.height(mainH-2);
        $match.height(mainH-calendarH-20);
    };


    return{
        init(){
            computedHeight();
            $(window).on('resize',computedHeight);

        }
    }
})();

mainRender.init();

/*MENU READER
*
* 1、给menu区域实现局部滚动（ISCROLL.js）
* 2、根据URL中的HASH值，让某一个A选中（点击A的时候，需要往URL中加HASH值），并且滚动到这个A的位置
* 3、点击左侧的每一个A，让右侧展示不同的内容
* */
let menuRender = (()=>{
    let $menuPlan = $.Callbacks();

    let example=null,
        HASH=null;

    let $menu=$('.menu'),
        $link=$menu.find('a');

    $menuPlan.add(()=>{
        new IScroll('.menu',{
            scrollbars:true,
            fadeScrollbars:true,
            mouseWheel:true,
            bounce:false
        });

        $('.iScrollIndicator').css('opacity', 0.3);

    });

    //HASH定位
    $menuPlan.add(()=> {
        HASH = window.location.href.myQueryURLParameter()['HASH'];
        let $cur = $link.filter('[href="#' + HASH + '"]');//->验证JQ是否获取到想要的内容,不能使用NULL/UNDEFINED验证,因为即使没有获取到,得到的依然是JQ的类数组(伪数组),只是LENGTH为零而已
        $cur.length === 0 ? $cur = $link.eq(0) : null;
        $cur.addClass('bg');

        example.scrollToElement($cur[0], 0);//->ISCROLL:滚动到具体的某一个元素位置([原生的元素对象],[时间])
    });

    //->点击操作
    $menuPlan.add(()=> {
        $link.filter(':not(.link)').on('click', function () {
            $(this).addClass('bg').parent().siblings().find('a').removeClass('bg');//->也可以使用JQ中的循环,循环$link来处理

        });
    });

    return {
        init(){
            $menuPlan.fire();//->JQ:通知计划表中的方法依次执行,还可以给每个方法传递参数,$menuPlan.fire(100)相当于给计划表中的每一个方法都传递了100
        }
    }
})();

menuRender.init();



let calendarRender = (()=> {
    let $calendarPlan = $.Callbacks(),
        $calendar = $('.calendar'),
        $calendarItem = $calendar.find('ul'),
        $link = null;

    let maxL = 0,
        minL = 0;

    //->绑定数据
    $calendarPlan.add((today, data)=> {
        let str = ``;
        $.each(data, function (index, item) {
            str += `<li data-time="${item.date}"><a href="javascript:;">
                <span class="week">${item.weekday}</span>
                <span class="date">${item.date.myFormatTime('{1}-{2}')}</span>
            </a></li>`;
        });
        $calendarItem.html(str)
            .css('width', data.length * 110);

        $link = $calendarItem.find('li');
        minL = -((data.length - 7) * 110);
    });

    //->定位日期
    /*
     * 1、在所有的LI中找到当前日期对应项(如果今天没有比赛,LI中没有这个日期,我们是无法找到的:找不到的话,找后面最靠近的那个日期,如果后面都没有比当前日期大的,我们默认找到最后一项即可)
     * 2、滚动到当前项目这个位置:需要做边界判断
     */
    $calendarPlan.add((today, data)=> {
        let $cur = $link.filter('[data-time="' + today + '"]');
        if ($cur.length === 0) {
            let todayNum = today.replace(/-/g, '');
            $link.each(function (index, item) {
                let itemTime = $(item).attr('data-time'),
                    itemNum = itemTime.replace(/-/g, '');
                if (itemNum > todayNum) {
                    $cur = $(item);
                    return false;//->结束JQ的EACH循环
                }
            });
        }
        $cur.length === 0 ? $cur = $link.eq($link.length - 1) : null;

        $cur.find('a').addClass('bg');
        let curIndex = $cur.index(),
            curL = -curIndex * 110 + 330;
        curL = curL > maxL ? maxL : (curL < minL ? minL : curL);
        $calendarItem.css('left', curL);
    });

    //->左右切换
    $calendarPlan.add((today, data)=> {

        $btn.on('click',function(){

        })

    });

    //->定位比赛
    $calendarPlan.add((today, data)=> {

    });

    return {
        init(){
            //->获取数据JSONP跨域请求
            $.ajax({
                url: 'http://matchweb.sports.qq.com/kbs/calendar?columnId=23',
                method: 'GET',
                dataType: 'jsonp',
                success: function (result) {
                if (result && result['code'] == 0) {
                    result = result['data'];
                    let today = result['today'],
                        data = result['data'];
                    $calendarPlan.fire(today, data);
                }
            }
        });
        }
    }
})();
