/**
 * Created by Administrator on 2017/2/19.
 */
;(function(){
    function addmousewheelEvent(ele,fn/*handler*/){
        if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!==-1){//firefox
            ele.addEventListener('DOMMouseScroll',handler) ;
        }else{//chrome  ie
            ele.onmousewheel=handler;
        }
        function handler(e){
            e=e||window.event;
            var isDown=null;
            if(e.wheelDelta){
                isDown= e.wheelDelta<0?true:false;
            }else{
                isDown= e.detail>0?true:false;
            }
            fn.call(ele,isDown,e);
            e.preventDefault? e.preventDefault(): e.returnValue=false;
        }
    }
    window.addMouseWheelEvent=addmousewheelEvent;
})()
addMouseWheelEvent(document.body,function(isDown,e){
    console.log(isDown);
})