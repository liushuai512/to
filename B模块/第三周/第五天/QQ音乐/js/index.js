/**
 * Created by lenovo on 2017/1/15.
 */
//通过js求出Main的高度
var header = document.getElementsByClassName('header')[0];
var footer = document.getElementsByClassName('footer')[0];
var main = document.getElementsByClassName('main')[0];

;(function () {
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    var val = winH - header.offsetHeight - footer.offsetHeight - (.4 * 2) * htmlFontSize;
    main.style.height = val + 'px';
})();

//
var music = (function () {
    var data = null;
    var lyric=document.getElementsByClassName('lyric')[0];
    var audio=document.getElementsByClassName('audio')[0];
    var play=document.getElementsByClassName('play')[0];
    var pause=document.getElementsByClassName('pause')[0];
    var totalTime=document.getElementsByClassName('totalTime')[0];
    var currentTime=document.getElementsByClassName('currentTime')[0];
    var progressBarSpan=document.getElementsByClassName('progressBar')[0].getElementsByTagName('span')[0];
    var lyricPs = lyric.getElementsByTagName('p');

    function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'lyric1.json?_=' + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState && /^2\d{2}$/.test(xhr.status)) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
    }
    console.log(data);
    function bindData() {
        if (data && data.lyric) {
            data = data.lyric;
            var str='';
            for(var i=0;i<data.length;i++){
                var curData=data[i];
                str+='<p data-sec="'+curData.second+'"  data-min="'+curData.minute+'"   id="'+curData.id+'">'+curData.content+'</p>';
            }
            lyric.innerHTML=str;

        }
    }
    function autoPlay(){
        audio.play();//audio这种媒体标签独有的方法=》播放
        audio.oncanplay=function(){
            //console.log(audio.duration);
            totalTime.innerHTML=formatTime(audio.duration);
        };
        play.style.display='none';//播放按钮隐藏
        pause.style.display='block';//暂停按钮显示
    }
    function formatTime(s){
        var min=Math.floor(s/60);
        var sec=Math.floor(s-min*60);
        min<10? min='0'+min:void 0;
        sec<10? sec='0'+sec:void 0;
        return min+':'+sec;
    }
    function binEvent(){
        play.onclick=pause.onclick=function(){
            //audio.paused返回一个布尔值
            if(audio.paused){//如果是暂停
                audio.play();
                pause.style.display='block';
                play.style.display='none';
            }else{//播放
                audio.pause();
                pause.style.display='none';
                play.style.display='block';

            }
        }
    }
    function playStatus(){
        //audio.currentTime 这个属性就是当前audio的播放时长
        var timer=window.setInterval(function(){
            if(audio.currentTime >= audio.duration) {
                window.clearInterval(timer);
                return;
            }
            currentTime.innerHTML=formatTime(audio.currentTime);
            progressBarSpan.style.width=audio.currentTime/audio.duration*100+'%';

            var min=formatTime(audio.currentTime).split(':')[0];
            var sec=formatTime(audio.currentTime).split(':')[1];
            for(var i = 0; i < lyricPs.length; i++){
                var curP=lyricPs[i];
                if(curP.getAttribute('data-min')==min && curP.getAttribute('data-sec')==sec){
                    for(var j=0;j<lyricPs.length;j++){
                        lyricPs[j].className=i==j?'bg':'';
                    }
                    //curP.className='bg';
                    if(curP.id>=4){
                        lyric.style.top=-(curP.id-3)*.84*htmlFontSize+'px';
                    }
                    break;
                }
            }
        },1000)
    }


    return {
        init: function () {
            //刷新浏览器之后立刻要执行放入函数
            //获取歌词数据并且添加到页面中
            getData();
            //绑定数据
            bindData();
            //自动播放
            autoPlay();
            //给按钮绑定事件
            binEvent();
            //播放状态
            playStatus();

        }
    }
})();

music.init();
