/*import a from './A1';
let avg = ()=> {
    arguments.__proto__ = Array.prototype;
    arguments.sort(function (a, b) {
        return a - b;
    });
    arguments.shift();
    arguments.pop();

    return (a.sum(...arguments) / arguments.length).toFixed(2);
};
export {avg};*/


/*
箭头函数版求平均数
let ary= () =>{
    arguments.__proto__ = Array.prototype;
    arguments.sort(function(a,b){
        return a-b;
    });
    arguments.shift();
    arguments.pop();

    return  ary
}
ary=[1.23,1.35,2.45,6.22,5.88,5.94]
console.log((eval(ary.join('+'))/ary.length).toFixed(1))*/
