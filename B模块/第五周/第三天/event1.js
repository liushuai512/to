/**
 * Created by lenovo on 2017/2/11.
 */
//处理IE里面的兼容问题
function on(ele,type,fn){
    if(ele.addEventListener){//标准
        ele.addEventListener(type,fn);//这里不需要规定捕获还是冒泡
    }else{//IE
        //ele.attachEvent()
        if(!ele['AAA'+type]){//判断元素不存在
            ele['AAA'+type]=[];//添加一个空的元素
            ele.attachEvent('on'+type,/*run*/function(){
                run.call(ele);
            });
        }
        var a=ele['AAA'+type];
        for(var i=0;i< a.length;i++){
            if(a[i]==fn){
                return;
            }
        }
        a.push(fn);
    }
}

function run(e){
    e=window.event;
    e.target= e.srcElement;
    e.pageX= e.clientX+(document.documentElement.scrollLeft || document.body.scrollLeft);
    e.pageY= e.clientY+(document.documentElement.scrollTop || document.body.scrollTop);
    e.stopPropagation=function(){e.cancelBubble=true;};//阻止默认行为
    e.preventDefault=function(){e.returnValue=false;}//阻止事件传播

    var a=this['AAA'+ e.type];
    if(a && a.length){
        for(var i=0;i< a.length;i++){//为了依次执行
            if(typeof a[i]=='function'){
                a[i].call(this.e)
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}

function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn);
    }else {
        var a=ele['AAA'+type];
        if(a && a.length){
            for(var i=0;i< a.length;i++){
                if(a[i]==fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
}


