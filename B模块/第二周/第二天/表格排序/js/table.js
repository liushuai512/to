/**
 * Created by lenovo on 2017/1/4.
 */
(function (){
    //获取元素
    var table=document.getElementById('tab');
    var thead=table.tHead;//获取表格的表头  JS都表格的特殊的获取方式 document.body
    var theadTr=thead.rows[0]; //获取表头下所有行中的第一行
    var theadThs=thead.cells; //表头第一行中的所有列 cells =》单元格
    var tbody=table.tBodies[0]; //所有body的第一个
    var tbodyTrs=tbody.rows; //tbody 下面所有的行
    var data=null;


//console.log(tbody)
//通过ajax来获取数据   ajax ：是异步的

    getData();
    function getData(){
        var xhr = new XMLHttpRequest(); //xhr就是负责到后台获取数据的载体
        xhr.open("get","data.txt",false);//post 方式   ‘data.txt’获取数据的接口 同步/异步
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 && xhr.status == 200){
                //状态
              data = JSON.parse(xhr.responseText); //响应文本就是data.txt的内容 ==》
            }
        };
        xhr.send(null);
    }

    bind();
    function bind(){
        //if(window.data){

            var frg = document.createDocumentFragment();
            for(var i = 0; i < data.length; i++){
                var dataObj=data[i];
                var tr=document.createElement('tr');

                // 向行中添加列
                for(var key in dataObj){
                    // key : country, capital ...
                    var td = document.createElement('td');
                    td.innerHTML = dataObj[key];
                    tr.appendChild(td);
                }
                frg.appendChild(tr);
            }
            tbody.appendChild(frg);
            frg = null;
       // }

    }

    changeColor();
    function changeColor(){
        for(var i=0;i<tbodyTrs.length;i++){
            tbodyTrs[i].className='bg'+i%2;
        }
    }









})();









