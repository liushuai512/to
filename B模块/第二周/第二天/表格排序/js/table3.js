/**
 * Created by lenovo on 2017/1/6.
 */
(function () {
    //获取元素
    var table = document.getElementById('tab');//获取整个表单
    var ths = table.tHead.rows[0].cells;//获取表头那一列
    var tBody = table.tBodies[0];//获取第一个表身
    var tBodyTrs = tBody.rows;//获取表身的每一列
    var data = null;
    //console.log(tBodyTrs)
    //获取数据
    getData();
    function getData() {
        //创建一个xhr对象
        var xhr = new XMLHttpRequest();
        //打开地址
        xhr.open('get', 'data.txt', false);//get获取  false异步
        //响应请求
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
                data = utils.jsonParse(xhr.responseText);
            };

        };
        xhr.send();
    }

    //console.log(data)

    //动态创建绑定数据
    bind();
    function bind() {
        var frg = document.createDocumentFragment();
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');//创建tBody每一行
            var dataObj = data[i];
            for (var key in dataObj) {
                var td = document.createElement('td');//创建tBody每一行中的列
                if (key === 'developed') {//通过键值对判断发达与发展
                    dataObj[key] = dataObj[key] == 0 ? '发展中' : '发达';
                }
                td.innerHTML = dataObj[key];//将内容赋值给td
                tr.appendChild(td);//将td插入tr
            }
            frg.appendChild(tr);
        }
        tBody.appendChild(frg);
        frg = null;
    }

    //隔行变色
    changeColor();
    function changeColor() {
        for (var i = 0; i < tBodyTrs.length; i++) {//比较的每一行
            tBodyTrs[i].className = 'bg' + i % 3;
        }
    }

    //绑定事件  给所有的表头绑定点击事件
    bindEvent();
    function bindEvent(){
        for(var i=0;i<ths.length;i++){
            ths[i].index=i;//给表头各列都添加一个自定义属性，保存索引值
            ths[i].sortFlag*=-1;//每一个表头列都存在一个自定义属性-1；
            if(ths[i].className=='cursor'){//ths满足鼠标变小手的条件。才执行点击事件
                ths[i].onclick=function(){
                    sort.call(this,this.index);
                    changeColor();
                }
            }
        }

        function sort(n){
            for(var i=0;i<ths.length;i++){
                if(ths[i]!==this){//冒泡的思想，点亮一个，其他都还原
                    ths[i].sortFlag*=-1;
                }
            }
            var that=this;
            that.sortFlag*=-1;
            //类数组转数组
             var tBodyTrsAry=Array.prototype.slice.call(tBodyTrs);
            //sort排序
            tBodyTrsAry.sort(function(str1,str2){
                var a=str1.cells[n].innerHTML;
                var b=str2.cells[n].innerHTML;
                if (isNaN(a) || isNaN(b)){
                    return a.localeCompare(b)*that.sortFlag
                }
                return (a-b)*that.sortFlag;
            });
            //重新插入
            var frg=document.createDocumentFragment();
            for(var i=0;i<ths.length;i++){
                frg.appendChild(tBodyTrsAry[i]);
            }
            tBody.appendChild(frg);
            frg=null;
        }
    }

})();
