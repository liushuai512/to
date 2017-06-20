var animate = (function (){
    return function (){
    }
})();

;(function (){
    function animate(option){
        var linear = function (t,b,c,d){
            return b + t/d*c;
        };
        var ele = option.ele;
        var target = option.target;
        var time = 0;
        var begin = {};
        var change = {};
        var duration = option.duration || 1000;
        var callback = option.callback;
        for(var key in target){
            begin[key] = utils.getCss(ele,key);
            change[key] = target[key] - begin[key];
        }
        //负责动画
        window.clearInterval(ele.timer);
        ele.timer = window.setInterval(function (){
            time += 10;
            if(time >= duration){
                window.clearInterval(ele.timer);
                for(var key in target){
                    utils.setCss(ele,key,target[key]);
                }
                //回调函数
                if(typeof callback == 'function'){//保证callback是一个函数
                    callback.call(ele);
                }//回调函数中的this就是运动的那个元素
                return;
            }
            for(var key in change){
                var val = linear(time,begin[key],change[key],duration);
                utils.setCss(ele,key,val);
            }
        },10);
    }
    window.animate = animate;
})();



/*
animate({
    ele : div1,
    target : {
        left : 500
    }
});*/
