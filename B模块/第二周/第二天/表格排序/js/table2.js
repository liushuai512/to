/**
 * Created by lenovo on 2017/1/5.
 */
(function () {
    //获取元素
    var table = document.getElementById('tab');
    var ths = table.tHead.rows[0].cells;
    var tBody = table.tBodies[0];
    var tBodyTrs = tBody.rows;//tBody下所有的行
    var data = null;
   console.log(tBody)
    //获取数据
    getData();
    function getData() {
        var xhr = new XMLHttpRequest();
        xhr.open('get','data.txt',false);
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4 && xhr.status == 200){
                window.data = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }

    console.log(data)

    //绑定数据
    dataBind();
    function dataBind() {
        var frg = document.createDocumentFragment();
        for(var i = 0; i<data.length; i++){
            var dataObj = data[i];
            var tr = document.createElement('tr');
            for (var key in dataObj) {
                var td = document.createElement('td');
                if (key === 'developed') {
                    dataObj[key] = dataObj[key] == 0 ? "发展中" : "发达";
                }
                td.innerHTML = dataObj[key];
                tr.appendChild(td);
            }
            frg.appendChild(tr);
        }
        tBody.appendChild(frg);
        frg = null;
    }

    //隔行变色
    changeColor();
    function changeColor() {
        for (var i = 0; i < tBodyTrs.length; i++) {
            tBodyTrs[i].className = "bg" + i % 3;
        }
    }

    //bindEvent  绑定点击事件  给所有的表头绑定点击事件
    bindEvent();
    function bindEvent() {

        for (var i = 0; i < ths.length; i++) {
            ths[i].index = i;//给表头各列都添加一个自定义属性，保存索引值
            ths[i].sortFlag *= -1;//每一个表头列都存在一个自定义属性-1；
            if (ths[i].className == 'cursor') {
                ths[i].onclick = function () {
                    sort.call(this, this.index);
                    changeColor();
                }
            }
        }
    }

    function sort(n) {
        for (var i = 0; i < ths.length; i++) {
            if (ths[i] !== this) {
                ths[i].sortFlag = -1;
            }
        }
        var that = this;
        that.sortFlag *= -1;
        //类数组转数组
        var tBodyTrsAry = Array.prototype.slice.call(tBodyTrs);
        //sort排序
        tBodyTrsAry.sort(function (str1, str2) {
            var a = str1.cells[n].innerHTML;
            var b = str2.cells[n].innerHTML;
            if (isNaN(a) && isNaN(b)) {
                return (a.localeCompare(b)) * that.sortFlag;
            }
            return (a - b) * that.sortFlag;
        });
        //将排好序的重新插入页面
        var frg = document.createDocumentFragment();
        for (var i = 0; i < tBodyTrsAry.length; i++) {
            frg.appendChild(tBodyTrsAry[i]);
        }
        tBody.appendChild(frg);
        frg = null;

    }


})();