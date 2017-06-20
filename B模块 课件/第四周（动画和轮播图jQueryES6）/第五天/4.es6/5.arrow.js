//如果有且仅有一个参数，那么参数列表可以不用小括号包裹
/*let double = num => num*2;
console.log(double(2));*/
//如果多于一个参数，或者没有参数的话，参数列表需要用小括号包裹
/*let add = (a,b) => a+b;
console.log(add(1,2));
//如果函数体不只有返回值的话，那么需要用花括号包裹，且如果有返回值还必须用return
let add = (a,b) => {
    console.log(a,b);
    return a+b;
}*/

/**
 * 1.在数组中用  map filter find sort
 * 2.在回调函数里用
 **/
/**
 * JS 方法调用的 原型方法里 全局方法用 call/apply bind
 **/
/**
 * 1. 通过箭头定义函数
 * 2. 箭头函数没有自己的this,会引用外层的this
 *
 */
let obj = {
    name:'zfpx',
    getName(){
        console.log(this);
        //箭头函数没有自己this指针，只会引用外层的this指针
        setTimeout(()=>{
            console.log(this);//window 报错 本身(timer对象本身)
        },2000);
    }
}
/*
//obj.getName();
let getName2 = obj.getName;
getName2();// zfpx
//在node 里,this指向 exports 也等于module.exports
exports.age = 8;
console.log(this);//global*/
exports.age = 100;
//let getAge = ()=>this.age;

var obj2 = {
    age:8,
    getAge
}
console.log(obj2.getAge());
