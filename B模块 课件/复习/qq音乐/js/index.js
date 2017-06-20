
var $musicBox = $('.musicBox');
var $header = $musicBox.find('.header');
//var header = document.getElementsByClassName('header')[0];
var $footer = $musicBox.find('.footer');
var $main = $musicBox.find('.main');
var $lyric = $main.find('.lyric');
var audio = $musicBox.find('audio')[0]; // dom原生对象
var $totalTime = $footer.find('.totalTime');
var $play = $header.find('.play');
var $paused = $header.find('.paused');
var $currentTime = $footer.find('.currentTime');
var $span = $footer.find('.progressBar span'); //获取进度条

// 重新计算main的高度
var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
var mainHeight = winHeight - $header.get(0)/*dom*/.offsetHeight - $footer[0].offsetHeight - 0.8*htmlFontSize;
$main.css('height',mainHeight);

//获取歌词然后添加到页面中
function getData(){
    $.ajax({
        type : 'get',
        url : 'lyric1.json?_='+Math.random(),
        async : false,
        dataType : 'json',
        success : function (res) { // res就是获取回来的数据
             if(res.code == 0 ){
                 window.data = res.lyric; // 把获取到的数据添加到全局变量中
             }
        }
    });
}
getData();
console.log(window.data);
// 把data添加到页面的歌词部分
function bindData(){
    if(window.data && data.length){
        // {content:'歌词内容', id:1 , minute: '分钟', second : '秒'}
        var str = '';
        $.each(data,function (index,item){
            str += '<p id="'+ item.id +'"  minute="'+ item.minute +'" second="'+ item.second +'">'+ item.content +'</p>';
        });
        $lyric.html(str);
    }
}
bindData();
// 自动播放音乐
function autoPlay(){
    audio.play(); // 播放方法
    audio.oncanplay = function (){ // 当可以播放的时刻触发
        // 可以播放之后就可以获取当前媒体文件的总时长
        // audio.duration 当前媒体文件的时长 浮点数的秒
        $totalTime.html(formatTime(audio.duration));
        // 只要能播放那暂停按钮显示，播放消失
        $play.css('display','none');
        $paused.css('display','block');
        console.log(audio.currentTime);
    }
}
autoPlay();

function formatTime(s){
    var min = Math.floor(s/60);
    var sec = Math.floor(s - min*60);
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    return min + ':' + sec;
}

// 实时更新当前时间和进度还有歌词
var timer = window.setInterval(updateProgress,1000); // 每秒都需要更新一次
var $lyricPs = $lyric.find('p'); // 所有的歌词行
function updateProgress() {
    var currentTime = audio.currentTime;
    $currentTime.html(formatTime(currentTime)); // 更新播放进度时间
    $span.css('width',currentTime/audio.duration*100 + '%'); // 进度条
    // 过滤歌词
    var min = formatTime(currentTime).split(':')[0]; // '07:08'  当前播放分
    var sec = formatTime(currentTime).split(':')[1]; // '07:08'  当前播放秒
    var $curP = $lyricPs.filter('[minute="'+ min +'"][second="'+ sec +'"]')
    $curP.addClass('cur').siblings().removeClass('cur');
    var n = $curP.index(); // 获取索引的方法
    if(n >= 3){
        $lyric.css({
            top : -(n-2)*.84 + 'rem'
        })
    }
}

// 给播放和暂停按钮绑定事件 => tap : zepto里才有
$('.musicBtn').tap(function (){
    if(audio.paused){ // 暂停
        audio.play();
        $play.css('display','none');
        $paused.css('display','block');
    }else{ // 播放
        audio.pause();
        $play.css('display','block');
        $paused.css('display','none');
    }
});









