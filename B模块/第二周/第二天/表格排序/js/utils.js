/**
 * Created by lenovo on 2017/1/4.
 */
var utils = (function () {//utils 工具   key value 键值对
    function toArray(likeAry) {
            try {
                //return [].slice.call(likeAry);
                return Array.prototype.slice.call(likeAry, 0);
            } catch (e) {
                var ary = [];
                for (var i = 0; i < likeAry.length; i++) {
                    ary.push(likeAry[i]);
                }
                return ary;
            }
        }
    function jsonParse(jsonstr) {
            return "JSON" in window ? JSON.parse(jsonstr) : eval('(' + jsonstr + ')');
        }
    function getRandom(n, m) {
            //n=Number(n);
            //m=Number(m);
            if (isNaN(n) || isNaN(m)) {
                return Math.random();
            }
            if (n > m) {
                var tmp = n;
                n = m;
                m = tmp;
            }
            return Math.round(Math.random() * (m - n) + n);
        }
    function prev(ele) {
            if ("previousElementSibling" in ele) {
                return ele.previousElementSibling;
            }
            var prev = ele.previousSibling;
            while (prev && prev.nodeType != 1) {
                prev = prev.previousSibling;
            }
            return prev;
        }
    function next(ele) {
            if ("nextElementSibling" in ele) {
                return ele.nextElementSibling;
            }
            var next = ele.nextSibling;
            while (next && next.nodeType != 1) {
                next = next.nextSibling;
            }
            return next;
        }
    function children(ele, tagName){//元素 类名
            var childs = ele.childNodes;
            var ary = [];
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].nodeType == 1) {//判断是否元素
                    ary.push(childs[i]);
                }

            }
            if (typeof tagName == "string") {//检测元素类型
                for (i = 0; i < ary.length; i++) {
                    if (ary[i].nodeName !== tagName.toUpperCase()) {//检测重复元素，
                        ary.splice((i, 1));//存在相同元素  删除
                        i--;
                    }
                }
            }
            return ary;

        }
    function firstChild(curEle) {
        var children = this.getChildren(curEle);
        return children[0];
    }
    function lastChild(curEle) {
        var children = this.getChildren(curEle);
        return children[children.length - 1];
    }
    function appendChild(curEle, parent) {
        parent.appendChild(curEle);
    }
    function prependChild(curEle, parent) {
        var first = this.firstChild(parent);
        if (first) {
            parent.insertBefore(curEle, first);
        } else {
            parent.appendChild(curEle);
        }
    }
    function insertBefore(curEle, oldEle) {
        oldEle.parentNode.insertBefore(curEle, oldEle);
    }
    function insertAfter(curEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(curEle, nex);
        } else {
            oldEle.parentNode.appendChild(curEle);
        }
    }
    function win(attr, val) {
            if (typeof val !== 'undefined') {
                document.documentElement[attr] = val;
                document.body[attr] = val;
                return;
            }
            return document.documentElement[attr] || document.body[attr];
        }
    function offset(ele) {//偏移量
            var l = 0, t = 0;
            l += ele.offsetLeft;
            t += ele.offsetTop;
            var par = ele.offsetParent;
            while (par) {
                if (window.navigator.userAgent.indexOf('MSIE 8') === -1) {
                    l += par.clientLeft;
                    t += par.clientTop;
                }
                l += par.offsetLeft;
                t += par.offsetTop;
                par = par.offsetParent;
            }
            return {left: l, top: t};
        }


    function getCss(ele, attr){
            var val = null;
            if (window.getComputedStyle) {
                val = window.getComputedStyle(ele)[attr];
            } else {
                if (attr == 'opacity') {
                    val = ele.currentStyle.filter;
                    var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                    val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                } else {
                    val = ele.currentStyle[attr];
                }
            }
            // -5.5px
            var reg = /^-?\d+(\.\d+)?(px|pt|em|rem|deg)?$/;
            return reg.test(val) ? parseFloat(val) : val;
        }
    function setCss(ele, attr, val){
            if (attr == 'opacity') {
                ele.style.opacity = val;
                ele.style.filter = 'alpha(opacity=' + val * 100 + ')';
                return;
            }
            if (attr == 'float') {
                ele.style.cssFloat = val;
                ele.style.styleFloat = val;
                return;
            }
            var reg = /^(width|height|left|top|right|bottom|(margin|padding)(Left|Top|Right|Bottom)?)$/;
            if (reg.test(attr)) {
                if (!isNaN(val)) {
                    val += 'px';
                }
            }
            ele.style[attr] = val;
        }
    function setGroupCss(curEle, opt) {
        if (Object.prototype.toString.call(opt) !== '[object Object]') return;
        for (var attr in opt) {
            this.setCss(curEle, attr, opt[attr]);
        }

    }



    function css(curEle) {
        var argTwo = arguments[1];
        if (typeof argTwo === 'string') {
            var argThree = arguments[2];
            if (argThree === undefined) {//第三个参数没有-获取
                return this.getCss(curEle, argTwo);
            } else {//当有第三个参数-设置一个样式
                this.setCss(curEle, argTwo, argThree);
            }
        }
        if ({}.toString.call(argTwo) === '[object Object]') {
            this.setGroupCss(curEle, argTwo);
        }
    }
    function getElesByClass(className,context){
        context=context ||document;
        if(context.getElementsByClassName){
            return context.getElementsByClassName(className);
        }
        var classNameAry=className.replace(/(^ +| +$)/g,'').split(/ +/);
        var tags=context.getElementsByName('*');
        var ary=[];
        for(var i=0;i<tags.length;i++){
            var curTag=tags[i];
            var tagIsOk=true;
            for(var j=0;j<classNameAry.length;j++){
                var reg=new RegExp("(^| +)"+classNameAry[j]+"( +|$)");
                if(!reg.test(curTag.className)){
                    tagIsOk=false;
                    break;
                }
            }
            if(tagIsOk){ary.push(curTag)};
        }
        return ary;
    }
    function hasClass(ele,className){
        var reg=new RegExp('(^| +)'+className+'( +|$)');
        return reg.test(ele.className);
    }
    function addClass(ele,className){
        var classNameAry=className.replace(/(^ +| +$)/g,'').split(/ +/);
        for(var i=0;i<classNameAry.length;i++){
            var curClass=classNameAry[i];
            if(!hasClass(ele,curClass)){
                ele.className+=' '+curClass;
            }
        }
    }
    function removeClass(ele,className){
        var classNameAry=className.replace(/(^ +| +$)/g,'').split(/ +/);
        for(var i=0;i<classNameAry.length;i++){
            var curClass=classNameAry[i];
            var reg=new RegExp("(^| +)"+curClass+"( +|$)","g");
            ele.className=ele.className.replace(reg,' ');
        }
    }
    function toggleClass(ele,className){
        if(hasClass(ele,className)){
            removeClass(ele,className);
        }else{
            addClass(ele,className);
        }
    }
    function prevAll(ele){
        var ary=[];
        var pre=prev(ele);
        while (pre){
            ary.unshift(pre);
            pre=prev(pre);
        }
        return ary;
    }
    function nextAll(ele){
        var ary=[];
        var nex=next(ele);
        while (nex){
            ary.push(nex);
            nex=next(nex);
        }
        return ary;
    }
    function siblings(ele){
        return prevAll(ele).concat(nextAll(ele));
    }
    function sibling(ele){
        var ary=[];
        var pre=prev(ele);
        var nex=next(ele);
        pre && ary.push(pre);
        nex && ary.push(nex);
        return ary;
    }
    function index(ele){
        return prevAll(ele).length;
    }







    return {
        //index:当前容器下第一个子元素
        index:index,
        //siblings:获取当前容器下所有的兄弟元素
        siblings:siblings,
        //sibling:获取当前容器所有的哥哥元素
        sibling:sibling,
        //nextAll:获取当前容器下所有的弟弟元素
        nextAll:nextAll,
        //prevAll:获取当前容器下所有的哥哥元素
        prevAll:prevAll,
        //
        toggleClass:toggleClass,
        //removeClass:从元素身上批量删除class名
        removeClass:removeClass,
        //addClass:给元素身上批量添加class名
        addClass:addClass,
        //hasClass:判断元素身上是否有某个class名
        hasClass:hasClass,
        //getElesByClass:通过class名。可以限制范围的获取元素
        getElesByClass:getElesByClass,
        //toArray:类数组转数组
        toArray: toArray,
        //jsonParse:把JSON格式的字符串转成JSON格式的数据（对象）
        jsonParse: jsonParse,
        //getRandom:求出一定范围的随机数，包含最大值
        getRandom: getRandom,
        //prev：获取当前元素的上一个哥哥元素
        prev: prev,
        //next:获取当前元素的下一个弟弟元素
        next: next,
        //children:获取当前元素下的所有子元素（可以通过标签名过滤子元素）
        children: children,
        //firstChild:获取当前容器下第一个子元素
        firstChild: firstChild,
        //lastChild:获取当前容器下最后一个子元素
        lastChild: lastChild,
        //appendChild:把新元素插入到父容器的末尾；
        appendChild: appendChild,
        //prependChild:把新元素插入到父容器的开头；
        prependChild: prependChild,
        //insertAfter:把新元素插入到指定元素的后面；
        insertAfter: insertAfter,
        //insertBefore:把新元素插入到指定元素的前面
        insertBefore: insertBefore,
        //win:浏览器盒子模型的兼容处理
        win: win,
        //setCss:给元素设置一个样式
        setCss: setCss,
        //getCss:获取非行间样式
        getCss: getCss,
        //setGroupCss:给元素设置一组样式
        setGroupCss: setGroupCss,
        //css:集获取，设置一个，设置一组为一体；
        css: css,
        //offset:元素偏移量的兼容处理；
        offset: offset
    };


})();