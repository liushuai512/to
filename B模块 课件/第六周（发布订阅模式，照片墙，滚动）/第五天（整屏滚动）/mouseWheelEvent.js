
;(function (){
    function addMouseWheelEvent(ele,fn){
        if(window.navigator.userAgent.toLowerCase().indexOf('firefox') === -1){//如果等于-1，就不是火狐浏览器，而是标准浏览器
            ele.onmousewheel = handler;//标准浏览器的鼠标滚轮事件
        }else{ // ff
            ele.addEventListener('DOMMouseScroll',handler);//火狐浏览器特定的鼠标滚轮事件
        }
        function handler(e){
            e = e || window.event;
            var isDown = null;
            if(e.wheelDelta){//标准浏览器
                isDown = e.wheelDelta < 0;
            }else{ // e.detail 火狐
                isDown = e.detail > 0;
            }
            fn.call(ele,isDown,e);
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }
    }
    window.addMouseWheelEvent = addMouseWheelEvent;
})();
