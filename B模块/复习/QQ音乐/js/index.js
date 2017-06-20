/**
 * Created by lenovo on 2017/2/5.
 */
//计算main的高度
var $musicBox = $('.musicBox');
var $header = $musicBox.find('.header');
var $footer = $musicBox.find('.footer');
var $main = $musicBox.find('.main');
var $lyric=$main.find('.lyric');
var audio=$musicBox.find('audio')[0];//转成原生对象
var $totalTime=$footer.find('.totalTime');
var $play=$header.find('.play');
var $paused=$header.find('.paused');
var $currentTime=$footer.find('.currentTime');
var $span=$footer.find('.progressBar span');//获取进度条


//重新计算main的高度
var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
var mainHeight = winHeight - $header.get(0).offsetHeight - $footer[0].offsetHeight - 0.8 * htmlFontSize;
$main.css('height', mainHeight);

//获取歌词然后添加到页面中
function getData(){
    $.ajax({
        type:'get',
        url:'lyric1.json?_='+Math.random(),
        async:false,
        dataType:'json',
        success:function(res){//res 就是获取回来的数据
            console.log(res);
            if(res.code==0){
                window.data=res.lyric;//
            }
        }
    });
}
getData();
console.log(window.data);

//把data添加到页面的歌词部分
function bindData(){
    if(window.data && data.length){
        var str='';
        $.each(data,function(index,itme){
            str+='<p id="'+itme.id+'"  minute="'+itme.minute+'" second="'+itme.second+'">'+itme.content+'</p>';
        });
        $lyric.html(str);//有参数设置，没参数数获取
    }
}
bindData();

//自动播放
function autoPlay(){
    audio.play();/*audio:媒体播放方法   play只要的媒体播放方法中使用*/
    audio.oncanplay=function(){//当可以播放的时刻触发
        //可以播放之后就可以获取当前媒体文件的总时长
        //audio.duration 当前媒体播放的总时长 浮点数的秒
        console.log(audio.duration);
        $totalTime.html(formatTime(audio.duration));
        //只要能播放那暂停按钮显示，播放消失
        $play.css('display','none');
        $paused.css('display','block');

    }
}
autoPlay();

function formatTime(s){
    var min=Math.floor(s/60);
    var sec=Math.floor(s-min*60);
    min=min<10?'0'+min:min;
    sec=sec<10?'0'+sec:sec;
    return min+':'+sec;
}
//实时更新当前时间和进度还有歌词
var timer=window.setInterval(updataProgress,1000);
var $lyricPs=$lyric.find('p');//所有歌词行
function updataProgress(){
    var currentTime=audio.currentTime;
    $currentTime.html(formatTime(currentTime));
    $span.css('width',currentTime/audio.duration*100+"%");//进度条

    //过滤歌词
    var min=formatTime(currentTime).split(':')[0];
    var sec=formatTime(currentTime).split(':')[1];
    var $curP=$lyricPs.filter('[minute="'+ min +'"][second="'+ sec +'"]');
    $curP.addClass('cur').siblings().removeClass('cur');
    var n=$curP.index;
    if(n>=3){
        $lyric.css({
            top:-(n-2) *.84+'rem'
        })
    }
}
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








