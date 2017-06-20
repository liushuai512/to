/*var arr = [1,2,3];
/!*var num1 = arr[0];
var num2 = arr[1];*!/

var [num3] = arr;
console.log(num3);*/


let obj = {name:'zfpx',age:8,home:{province:'山东',city:'济南'},hobby:['smoking','drinking']};
//let name = obj.name;
//let age  = obj.age;
//let {name:name1,age:age1} = obj;
let {home:{province,city},hobby:[one]}=obj;

console.log(province,city,one);

