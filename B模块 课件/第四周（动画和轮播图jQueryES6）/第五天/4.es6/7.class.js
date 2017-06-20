/**
 * 类
 */
//es6
/*class Person{
    //类的构造函数 初始化实例的私有变量
    //构造函数是初始化实例的实例的时候调用一个函数
  constructor(name){
    this.name = name;
  }
  getName(){
      console.log(this.name);
  }
  //不需通过实例来调用
  static desc(){
      console.log('我是一个类，好累');
  }
}
//子类继承父类
class Student extends Person{
    constructor(name,age){
        //super指的是调用父类的构造函数，使用父类构造函数用来初始化父类的私有属性
        super(name);
        this.age = age;//再初始化自己的私有属性
    }
    getAge(){
        console.log(this.age);
    }
}*/
//es5



function Person(name){
  this.name = name;
}
Person.prototype.getName = function(){
    console.log(this.name);
}
//静态文件，不需要创建实例可以通过类直接调用方法
Person.desc = function(){
    console.log('我是一个类，好累');
}

function Student(name,age){
    //调用父类的构造函数来初始化父类的私有属性，把属性赋给了子类的实例
    Person.call(this,name);
    this.age = age;
}
function create(prototype){
  let Fn = function(){};
  Fn.prototype = prototype;
  return new Fn();
}
//X Student.prototype = Person.prototype;
//Student.prototype = Object.create(Person.prototype);
Student.prototype = {__proto__:Person.prototype};

Student.prototype.getAge = function(){
    console.log(this.age);
}

let p1 = new Person('zfpx');
p1.getName();
let s1 = new Student('zfpx',8);
s1.getName();
s1.getAge();
//Person
console.log(s1.constructor);
