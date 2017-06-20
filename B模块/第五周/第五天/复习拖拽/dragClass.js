/**
 * Created by lenovo on 2017/2/12.
 */

/*
*
* new Drag(div1)
* 类的封装：方法放在原型上，属性放在私有属性上
* 用公用方法去操作私有属性，实例本身作为乘上启下的载体
* */
;(function(){
    function Drag(ele,range){
        this.ele=ele;  //把要拖拽的元素存在实例的ele私有属性上
        this.ele.l=null;
        this.ele.t=null;
        this.ele.range=range;
        var that=this;//that是实例
        this.ele.DOWN=function (e){
            that.down(e);//和this.down.call(that,e)
        };
        this.ele.MOVE=function(e){
            that.move(e);
        };
        this.ele.UP=function(e){
            that.up(e);
        };


        on(this.ele,'mousedown',this.ele.DOWN);//绑定事件当鼠标按下的时刻，执行原型上的down方法，down方法中的this就是ele了 ==>类的封装必须保证原型上方法中的this是实例
    }
    Drag.prototype.down=function(e){
        //事件发生执行的时刻this是实例
        this.ele.l= e.pageX-this.ele.offsetLeft;
        this.ele.t= e.pageY-this.ele.offsetTop;
        if(this.ele.setCapture){//给IE 绑定一个牵引事件，在拖动时，不会丢失
            this.ele.setCapture();
            on(this.ele,'mousemove',this.ele.MOVE);
            on(this.ele,'mouseup',this.ele.UP);
        }else{
            on(document,'mousemove',this.ele.MOVE);
            on(document,'mouseup',this.ele.UP);
        }
    };
    Drag.prototype.move=function(e){
        var left= e.pageX-this.ele.l;
        var top= e.pageY-this.ele.t;
        var minLeft= 0,minTop=0;
        //这个范围有可能没有，这个range有可能是undefined
        var maxLeft = this.ele.range ? this.ele.range.left : (document.documentElement.clientWidth|| document.body.clientWidth) - this.ele.offsetWidth;
        var maxTop = this.ele.range ? this.ele.range.top : (document.documentElement.clientHeight || document.body.clientHeight) - this.ele.offsetHeight;
        left = left < minLeft ? minLeft : left > maxLeft ? maxLeft : left;
        top = top > maxTop ? maxTop : top < minTop ? minTop : top;
        this.ele.style.left=left+'px';
        this.ele.style.top=top+'px';
        e.preventDefault();

    };
    Drag.prototype.up=function(e){
        if(this.ele.releaseCapture){//解除IE 的绑定事件
            this.ele.releaseCapture();
            off(this.ele,'mousemove',this.ele.MOVE);
            off(this.ele,'moveup',this.ele.UP);
        }else{
            off(document,'mousemove',this.ele.MOVE);
            off(document,'mouseup',this.ele.UP);
        }


    };
    window.Drag=Drag;
})();
