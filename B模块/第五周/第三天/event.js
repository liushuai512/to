/**
 * Created by lenovo on 2017/2/9.
 */


/*
*
* 1.this  2.顺序  3.重复
*
* */
/*
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn);
    }else {
        if(!ele['AAA'+type]){
            ele['AAA'+type]=[];
            ele.attachEvent('on'+type,/!*run*!/function(){
                run.call(ele);
            });
        }
        var a=ele['AAA'+type];
        for(var i=0;i< a.length;i++){
            if(a[i]===fn){
                return;
            }
        }
        //ele['AAA'+type].push(fn);
        a.push(fn);
    }

}
function run(e){
    e=window.event;
    e.target= e.srcElement;
    //处理兼容
    e.pageX= e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft);
    e.pagey= e.clientY+(document.documentElement.scrollTop || document.body.scrollTop);
    e.preventDefault=function(){
        e.returnValue=false;
    };
    e.stopPropagation=function(){
        e.cancelBubble=true;
    };

    var a=/!* e.target*!/this['AAA'+ e.type];
    console.log(a);
    if(a && a.length){
        for(var i=0;i< a.length;i++){
            if(typeof a[i]=='function'){
                a[i].call(/!*e.target*!/this,e);//第二个参数e是传给fn1,fn2等函数。这个e是已经处理好兼容问题的
            }else {
                a.splice(i,1);//如果是null就把当前的这个null删掉，此刻是函数的执行，必须保证每个每一项都执行
                i--;//保证每一条都执行；
            }
        }
    }
}
function off(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn);
    } else {
        //先获取到AAAclick这个自定义属性数组，然后把数组中的fn函数删除
        var a = ele['AAA' + type];
        if (a && a.length) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] == fn) {//条件符合就移除那个函数
                    //a.splice(i, 1);//以前的splice删除是在排序  循环执行中，所以要处理塌陷，，现在的splice未执行
                    a[i]=null;
                    //保证数组不塌陷，只要在run按照顺序执行的过程中
                    //
                    break;//停止代码执行
                }
            }
        }
    }
}*/
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn);
    }else{
        if(!ele['AAA'+type]){
            ele['AAA'+type]=[];
            ele.attachEvent('on'+type,run);
        }
        var a=ele['AAA'+type];
        a.push(fn);
    }
}
function run(e){
    e=window.event;
    e.target= e.srcElement;//事件源
    e.pageX= e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft);//相对于整个网页的水平坐标
    e.tageY= e.clientY+(document.documentElement.scrollTop || document.body.scrollTop);  //相对于整个网页的垂直坐标
    e.preventDefault=function(){
        e.returnValue=false;
    };//阻止默认行为
    e.stopPropagation=function(){
        e.cancelBubble=true;
    }; //阻止默认事件

    var a= a.target['AAA'+type];
    if(a && a.length){
        for(var i=0;i< a.length;i++){
            if(typeof a[i]==='function'){
                a[i].call(a.target);
            }
        }
    }
}
