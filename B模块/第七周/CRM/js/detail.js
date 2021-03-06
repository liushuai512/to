var but = document.getElementById('submit'),
    userName = document.getElementById('userName');

String.prototype.myQueryURLParameter = function () {
    var reg = /([^?&#=]+)=([^?&#=]+)/g,
        obj = {};
    this.replace(reg, function () {
        obj[arguments[1]] = arguments[2]
    });
    return obj;
};

var urlObj = window.location.href.myQueryURLParameter(),
    customId = urlObj['id'];
if (typeof customId !== "undefined") {
    ajax({
        url: "/getInfo",
        method: "GET",
        dataType: 'JSON',
        cache: false,
        data: {
            id: customId
        },
        success: function (result) {
            if (result && result.code == 0) {
                userName.value = result["data"]["name"];
            }
        }
    });
}


but.onclick = function () {
    var val = userName.value;

    if (typeof customId !== 'undefined') {
        ajax({
            url: '/updateInfo',
            method: 'POST',
            dataType: 'JSON',
            data: {
                id: customId,
                name: val
            },
            success: function (result) {
                if (result && result.code == 0) {
                    alert('修改成功');
                    window.location.href = 'index.html';
                } else {
                    alert('修改失败');
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
            name: val
        },
        success: function (result) {
            if (result && result.code === 0) {
                alert('添加成功');
                window.location.href = 'index.html';
            } else {
                alert('添加失败');
            }
        }
    })
};

