var content = document.getElementById('content');
//  刚开始加载页面的时候，
ajax({
    url: '/getAllList',
    method: 'get',
    dataType: 'JSON',
    cache: false,
    success: function (result) {
        //console.log(result);
        //把获取的数据展示在页面中
        if (result && result.code === 0) {
            //-->成功之后，把获取的数据展示在页面中（es6中的字符串模板）
            result = result.data;
            var str = ``;
            for (var i = 0, len = result.length; i < len; i++) {
                var cur = result[i];
                str += `<li>
                    <span>${cur.id}</span>
                    <span>${cur.name}</span>
                    <span>
                        <a href="detail.html?id=${cur.id}">修改</a>
                        <a href="javascript:;" data-id="${cur.id}">删除</a><!--阻止A标签的默认行为-->
                    </span>
                </li>`;
            }
            content.innerHTML = str;
        }
    }
});

//采用事件委托实现删除按钮的点击操作
content.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    //  删除
    if(tar.tagName.toUpperCase() === 'A' && tar.innerHTML === '删除'){
        /*
        自己写一篇关于弹出框的文章

        * JS中浏览器经常弹出的提示框
        * - alert([content]);提示框，只有确认按钮
        * - confirm([content]); 确认提示框，里面既有确定按钮也有取消按钮，我们可以定义一个变量来接收他的返回值，返回值为true说明点击的事确定；
        * - prompt([content]):在confirm基础上可以写原因，填写的内容可以通过变量接收
        * */
        var customId=tar.getAttribute('data-id'),
            flag=window.confirm('确定要删除编号为['+customId
                +']的信息吗？');
        if(flag){
            ajax({
               url:'/removeInfo',
                data:{
                    id:customId
                },
                cache:false,
                success:function(result){
                    if(result && result.code===0){
                        alert('亲，删除成功');
                        // 此时只是后台服务器上存储的数据删除了，我们还需要自己把容器中的元素也移除掉才可以（移除当前事件源的爷爷->Li一行信息）
                        content.removeChild(tar.parentNode.parentNode);
                    }else {
                        alert('亲，删除失败');
                    }
                }
            });
        }

    }
};

/*
* 自定义属性:他是整个JS编程中最伟大的思想，只要是后续的木一个操作需要用到之前的一个值，我们就在之前把这个值用自定义属性存储起来，后期需要直接的获取即可
* 自定义属性约定俗称的起名规范：data-xxx;
* */