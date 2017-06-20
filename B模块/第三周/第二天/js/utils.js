/**
 * Created by lenovo on 2017/1/4.
 */
var utils = {//utils 工具   key value 键值对
    toArray: function (likeAry) {
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
    },

    jsonParse: function (jsonstr) {
        return "JSON" in window ? JSON.parse(jsonstr) : eval('(' + jsonstr + ')');
    },

    getRandom: function (n, m) {
        //n=Number(n);
        //m=Number(m);
        if(isNaN(n) || isNaN(m)){
            return Math.random();
        }
        if(n>m){
            var tmp=n;
            n=m;
            m=tmp;
        }
        return Math.round(Math.random()*(m-n)+n);
    },

    prev: function (ele) {
        if (ele.previousElementSibling) {
            return ele.previousElementSibling;
        } else {
            var pre = pre.previousSibling;
            while (pre && pre.nodeType != 1) {
                pre = pre.previousSibling;
            }
            return pre;
        }
    },

    next: function (ele) {
        if (ele.nextElementSibling) {
            return ele.nextElementSibling;
        } else {
            var nex = nex.nextSibling;
            while (nex && nex.nodeType != 1) {
                nex = nex.nextSibling;
            }
            return nex;
        }
    },

    children: function (ele) {
        var childs=ele.childNodes;
        var ary=[];
        for(var i=0;i<childs.length;i++){
            if(childs[i].nodeType==1){
                ary.push(childs[i]);
            }

        }
        return ary;

    }


};