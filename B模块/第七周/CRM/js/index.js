var indexRender=(function(){
    var content=document.getElementById('content');

    function bindHTML(result){
        var str=``;
        for(var i=0,len=result.length;i<len;i++){
            var cur=result[i];
            str+=`<li>
                    <span>${cur.id}</span>
                    <span>${cur.name}</span>
                    <span>
                        <a href="detail.html?id=${cur.id}">修改</a>
                        <a href="javascript:;" data-id="${cur.id}">删除</a>
                    </span>
                </li>`
        }
        content.innerHTML=str;
    }

    function bindEvent(){
        content.onclick=function(e){
            e=e || window.event;
            var tar=e.target || e.srcElement;
            if(tar.tagName.toUpperCase()=== 'A' && tar.innerHTML==='删除'){
                var customId=tar.getAttribute('data-id'),
                    flag=confirm('确定要删除['+customId+']的信息吗？');
                if(flag===false) return;
                ajax({
                    url:'/removeInfo',
                    method:'GET',
                    dataType:'JSON',
                    cache:false,
                    data:{id:customId},
                    success:function(result){
                        if(result && result.code===0){
                            alert('删除成功');
                            content.removeChild(tar.parentNode.parentNode);
                        }else {
                            alert('删除失败');
                        }
                    }
                });
            }
        }
    }

    return{
        init:function(){
            ajax({
                url:'/getAllList',
                method:'GET',
                dataType:'JSON',
                cache:false,
                success:function(result){
                    if(result && result.code===0){
                        result= result['data'];

                        bindHTML(result);

                        bindEvent();
                    }
                }
            })
        }
    }
})();

indexRender.init();