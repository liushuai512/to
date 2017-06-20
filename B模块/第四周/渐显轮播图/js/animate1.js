/**
 * Created by lenovo on 2017/2/4.
 */
;(function(){
    function animate1(option){//option:选项
        var linear=function(t,b,c,d){
            return b+t/d*c;
        };
        var time=0;
        var begin={};
        var change={};
        var duration=option.duration || 1000;//多长时间完成运动
        var ele=option.ele;//你让谁运动，就是谁
        var target=option.target;//运动到哪（终点）
        var callback=option.callback;//当动画完成后你要干什么（回调函数）
        for(var key in target){
            begin[key]=getCss(ele,key);
            change[key]=target[key]-begin[key];
        }

        //负责动画
        window.clearInterval(ele.timer);// 清空上一次的定时器
        ele.timer=window.setInterval(function(){
            time+=10;
            if(time>=duration){
                // 到达终点要做的事
                window.clearInterval(ele.timer);
                for(var key in target){//把最后的值全部设置为target终点
                    setCss(ele,key,getTag[key]);
                }
                //回调函数
                if(typeof callback=='function'){ // 保证callback是一个函数
                    callback.call(ele);//改变this的，把callback的this改成ele；
                }
                return
            }
            var val=linear(time,begin[key],change[key],duration);
            setCss(ele,key,val);
        },10);


    }
    window.animate1=animate1;
})();