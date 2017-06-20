/*if(true){
    let a = 10;
}
console.log(a);*/
//console.log(global.a);
//console.log(this.a);
//console.log(window.a);

for(let i=0;i<3;i++){
    for(let i=0;i<3;i++){
        console.log(i);
    }
}
//9 3
// let 没有预解释，没有变量提升 num is not defined
let num = 10;
{

    console.log(num);
    //let num = 5;
    //同一作用域不能重复声明，但是不同作用域内可以重复声明变量名
    let num = 15;//Identifier 'num' has already been declared
}
//  5 10 undefined 报错

~function(){
    var name = 'zfpx';
}()
{
    let name = 'zfpx';
}
