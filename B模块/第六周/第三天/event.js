/**
 * Created by lenovo on 2017/2/16.
 */
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn);
    }else{
        if(!ele['AAA'+type]){
            ele['AAA'+type]=[];
            a.attachEvent('on'+type,function(){
                run.call(ele);
            })
        }
        var a=ele['AAA'+type];
        for(var i=0;i< a.length;i++){//去重
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
    e.pageX=e.pageX+(document.documentElement.scrollLeft || document.body.scrollLeft);
    e.pageY=e.pageY+(document.documentElement.scrollTop || document.body.scrollTop);
    e.stopPropagation=function(){e.cancelBubble=true;};
    e.preventDefault=function(){e.returnValue=false;};

}





