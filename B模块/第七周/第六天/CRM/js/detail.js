String.prototype.myQueryURLParameter = function () {
    //this->我们要处理的这个字符串
    var reg = /([^?&=#]+)=([^?&=#]+)/g,
        obj = {};
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
    });
    return obj;
};
var userName = document.getElementById('userName'),
    submit = document.getElementById('submit');

/*
 * 1、获取url地址栏问号后面传递的参数ID；
 * -->myQueryURLParameter
 * -->执行这个方法获取我们的参数值
 *
 *
 * */
var urlObj = window.location.href.myQueryURLParameter(),
    customId = urlObj['id'];


if (typeof customId !== 'undefined') {
    //->修改：从服务器获取当前客户的信息,把用户名展示在文本框中
    ajax({
        url: '/getInfo',
        data: {
            id: customId
        },
        cache: false,
        success: function (result) {
            if (result && result.code == 0) {
                result = result['data'];
                userName.value = result['name'];
            }
        }
    });

}
//增加
submit.onclick = function () {
    var value = userName.value;
    //修改
    if (typeof customId !== 'undefined') {
        ajax({
            url: '/updateInfo',
            method: 'POST',
            dataType: 'JSON',
            data: {
                id: customId,
                name: value
            },
            success: function (result) {
                if (result && result.code == 0) {
                    alert('亲，恭喜修改成功啦！');
                    window.location.href = 'index.html';
                } else {
                    alert('亲，很遗憾修改失败！');
                }
            }
        });
        return;
    }

    ajax({
        url: '/addInfo',
        method: 'POST',
        dataType: 'JSON',
        data: {
            name: value
        },
        success: function (result) {
            if (result && result.code == 0) {
                window.location.href = 'index.html';
                alert('添加成功');
            } else {
                alert('添加失败');
            }
        }
    });
};