
;(function (){
    function Banner(banner,url,interval){
        this.interval = interval || 2000;
        this.banner = banner;
        this.bannerInner = utils.getElesByClass('bannerInner',this.banner)[0];
        this.focusUl = utils.getElesByClass('focusUl',this.banner)[0];
        this.left = utils.getElesByClass('left',this.banner)[0];
        this.right = utils.getElesByClass('right',this.banner)[0];
        this.imgs = this.bannerInner.getElementsByTagName('img');
        this.lis = this.focusUl.getElementsByTagName('li');
        this.data = null;
        this.url = url; // 每个轮播需要不同的数据
        this.index = 0; // 每个轮播图记录自己的当前播放哪一张
        this.timer = null;
        this.init(); // 入口
    }
    Banner.prototype.getData = function (){
        // this => 实例
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.url+'?_='+Math.random(),false);
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4 && xhr.status == 200){
                that.data = utils.jsonParse(xhr.responseText);
            }
        }
        xhr.send(null);
    }
    Banner.prototype.bindDate = function (){
        if(this.data){
            var str = '';
            var str1 = '';
            for(var i = 0; i < this.data.length; i++){
                str += '<div><img src="" real="'+ this.data[i].src +'"></div>';
                str1 += i == 0 ? '<li class="cur"></li>' : '<li></li>';
            }
            this.bannerInner.innerHTML = str;
            this.focusUl.innerHTML = str1;
        }
    }
    Banner.prototype.imgsDelayLoad = function (){
        var that = this;
        for(var i = 0; i < this.imgs.length; i++){
            var tempImg = document.createElement('img');
            tempImg.index = i;
            tempImg.src = this.imgs[i].getAttribute('real');
            tempImg.onload = function (){
                that.imgs[this.index].src = this.src;
                if(this.index == 0){
                    utils.setCss(that.imgs[0].parentNode,'zIndex',1);
                    animate({
                        ele :  that.imgs[0].parentNode,
                        target : {
                            opacity : 1
                        },
                        duration : 500
                    });
                }
            }
            tempImg = null;
        }
    }
    Banner.prototype.autoPlay = function (){
        this.index++; // window
        if(this.index == this.data.length){
            this.index = 0;
        }
        this.setImg();
    }
    Banner.prototype.setImg = function (){
        for(var i = 0; i < this.imgs.length; i++){
            if(i == this.index){
                utils.setCss(this.imgs[i].parentNode,'zIndex',1);
                animate({
                    ele : this.imgs[i].parentNode,
                    target : {
                        opacity : 1
                    },
                    duration : 500,
                    callback : function (){
                        var  siblings = utils.siblings(this);
                        for(var i = 0; i < siblings.length; i++){
                            utils.setCss(siblings[i],'opacity',0);
                        }
                    }
                })
            }else{
                utils.setCss(this.imgs[i].parentNode,'zIndex',0);
            }
        }
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].className = i == this.index ? 'cur' : '';
        }
    }
    Banner.prototype.bindEventForBanner = function (){
        var that = this;
        this.banner.onmouseover = function (){
            window.clearInterval(that.timer);
            that.left.style.display = that.right.style.display = 'block';
        }
        this.banner.onmouseout = function (){
            // 时刻保证原型上方法中的this是实例，所有要操作的属性都在实例上保存着呢。
            that.timer = window.setInterval(function (){
                // this => window => 一般情况下定时器和事件中的this修改我们会包含一个匿名函数
                that.autoPlay();
            },2000);//??
            that.left.style.display = that.right.style.display = 'none';
        }
    }
    Banner.prototype.bindEventForBtn = function (){
        var that = this;
        this.left.onclick = function (){
            that.index--;
            if(that.index == -1){
                that.index = that.data.length-1;
            }
            that.setImg();
        }
        this.right.onclick = function (){
            // this => right按钮
            // 如果直接绑定那么这个autoplay方法中的this就变成这个按钮了。而autoplay方法中还需要通过this实例来获取index等实例上的其他属性。所以保证autoplay方法中的this是实例。为了避免冲突，我们把事件包含了一个匿名函数，匿名函数中的this仍然是这个right按钮。
            that.autoPlay(); // 这个函数中的this已经是前面的that也就是实例了
        };
    }
    Banner.prototype.bindEventForLis = function (){
        var that = this;
        for(var i = 0; i < this.lis.length; i++){
            this.lis[i].index = i;
            this.lis[i].onclick = function (){
                that.index = this.index;
                that.setImg();
            }
        }

    }
    Banner.prototype.init = function (){
        var that = this;
        this.getData();
        this.bindDate();
        this.imgsDelayLoad();
        this.timer = window.setInterval(function (){
            that.autoPlay();
        },this.interval);
        this.bindEventForBanner();
        this.bindEventForBtn();
        this.bindEventForLis();
    }
    window.Banner = Banner;
})();













