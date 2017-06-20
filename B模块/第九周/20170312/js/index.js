/**
 * Created by lenovo on 2017/3/12.
 */
let menuRender=(()=>{
    let $menu = $('#menu'),
        $nav = $('#nav');
    let isBlock=false;
    return {
        init (){
            $menu.tap(function(){
                if(isBlock){
                    //->当前是展开的我们需要让其隐藏
                    $nav.css({
                        padding:' 0',
                        height: '0'
                    });
                    return;
                }
                $nav.css({
                    padding:'.1rem 0',
                    height: '2.22rem'
                });
                isBlock=true;
            });
        }
    }
})();
menuRender.init();