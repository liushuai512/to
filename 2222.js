/**
 * Created by lenovo on 2017/4/28.
 */
function Parent() {
    this.name ='欲泪成雪';
    this.age = 22;
};
Parent.prototype.lev = function () {
    return this.name;

};
var x = new Parent();