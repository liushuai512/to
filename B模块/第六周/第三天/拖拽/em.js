/**
 * Created by lenovo on 2017/2/16.
 */
// new Drag(div1)
//on off fire
function Emitter(){}
Emitter.prototype.on=function(type,fn){
    if(!this.ele[/*this.*/type]){
        this.ele[/*this.*/type]=[];
    }
    var a=this.ele[/*this.*/type];
    for(var i=0;i< a.length;i++){//为了防止重复绑定
        if(/*this.*/fn===a[i]){
            return
        }
    }
    a.push(fn);
    return this;//保证链式写法，函数执行后返回一个实例
};
Emitter.prototype.off=function(type,fn){
    var a = this.ele[type];
    if(a && a.length){
        for(var i = 0; i < a.length; i++){
            if(a[i] === fn){
                a[i] = null;
                break;
            }
        }
    }
    return this;
};
Emitter.prototype.fire=function(type,e){
    var a=this.ele[type];
    for(var i=0;i< a.length;i++){
        if(typeof a[i]=='function'){
            a[i].call(this.ele,e);
        }else{
            a.splice(i,1);
            i--;
        }
    }

};

var drag=new Drag(div1);
drag1.on('selfdragstart',start);



function Drag(ele){
    this.ele=ele;//把属性保存到变量元素上
    this.l=null;//构造函数原型实力上
    this.t=null;
    this.DOWN=processThis(this.down,this);//把this.down中的this改成this
    this.MOVE=processThis(this.move,this);//this.down指的是Drag.prototype.down;只是一个读取
    this.UP=processThis(this.up,this);

    on(this.ele,'mousedown',this.down);


}
//继承Emitter类，为了直接能调用on方法
Drag.prototype=new Emitter();
Drag.prototype.constructor=Drag;
Drag.prototype.down=function(){//鼠标按下所做的
    //保证实例原型上的方法
    this.l= e.pageX-this.ele.offsetLeft;//this不能做为元素，他身上没有方法
    this.t= e.pageY-this.ele.offsetTop;
    if(this.ele.canCompile){//看是否有canCompile 方法
        this.ele.canCompile();
        on(this.ele,'mousemove',this.MOVE);
        on(this.ele,'mouseup',this.UP);
    }else{
        on(document,'monsemove',this.MOVE);
        on(document,'moveup',this.UP);
    }
    fire.call(this.ele,'selfdragstart',e);
};
Drag.prototype.move=function(){
    //保证实例原型上的方法
    var left= e.pageX-this.l;
    var top= e.pageX-this.t;
    this.ele.style.left=left+'px';
    this.ele.style.top=top+'px';
    e.preventDefault();
    fire(this.ele,'selfdragging',e);
};
Drag.prototype.up=function(){
    //保证实例原型上的方法
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.MOVE);
        off(this.ele,'monseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    file(this.ele,'selfdragend',e);
};



function processThis(fn,context){//context：传谁就是谁
    //我要把fn中的this处理成context
    return function (e){
        fn.call(context,e);
    };
}



