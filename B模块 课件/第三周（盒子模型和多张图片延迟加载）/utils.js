
/*var uitls = {
    toArray : function (likeAry){

        try{
            return Array.prototype.slice.call(likeAry,0);
        }catch(e){
            var ary = [];
            for(var i = 0 ; i < likeAry.length; i++){
                ary.push(likeAry[i]);
            }
            return ary;
        }
    },
    jsonParse : function (jsonStr){

        return "JSON" in window ? JSON.parse(jsonStr) : eval('('+jsonStr+')');
    },
    getRandom : function (n,m){
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        return Math.round(Math.random()*(m-n)+n);
    },
    prev : function (ele){

        var prev = ele.previousSibling; // comment text  element
        while ( prev && prev.nodeType != 1){
            prev = prev.previousSibling;
        }
        return prev;
    },
    next : function (ele){

        if("previousElementSibling" in ele){
            return ele.previousElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType != 1){
            next = next.nextSibling;
        }
        return next;
    },
    children : function (ele,tagName){
        var childs = ele.childNodes;
        var ary = [];
        for(var i = 0; i < childs.length; i++){
            if(childs[i].nodeType == 1){
                ary.push(childs[i]);
            }
        }

        if(typeof tagName == "string"){
            for( i = 0; i < ary.length; i++ ){
                // 'SPAN'  'DIV'
                if(ary[i].nodeName !== tagName.toUpperCase()){
                    ary.splice(i,1);
                    i--;
                }
            }
        }
        return ary;
    }
};*/



var utils = (function (){
    var toArray = function (likeAry){

        try{
            return Array.prototype.slice.call(likeAry,0);
        }catch(e){
            var ary = [];
            for(var i = 0 ; i < likeAry.length; i++){
                ary.push(likeAry[i]);
            }
            return ary;
        }
    },
        jsonParse = function (jsonStr){

            return "JSON" in window ? JSON.parse(jsonStr) : eval('('+jsonStr+')');
        },
        getRandom = function (n,m){

            if(isNaN(n)||isNaN(m)){
                return Math.random();
            }
            return Math.round(Math.random()*(m-n)+n);
        },
        prev = function (ele){

            var prev = ele.previousSibling; // comment text  element
            while ( prev && prev.nodeType != 1){
                prev = prev.previousSibling;
            }
            return prev;
        },
        next = function (ele){

            if("previousElementSibling" in ele){
                return ele.previousElementSibling;
            }
            var next = ele.nextSibling;
            while (next && next.nodeType != 1){
                next = next.nextSibling;
            }
            return next;
        },
        children = function (ele,tagName){
            var childs = ele.childNodes;
            var ary = [];
            for(var i = 0; i < childs.length; i++){
                if(childs[i].nodeType == 1){
                    ary.push(childs[i]);
                }
            }

            if(typeof tagName == "string"){
                for( i = 0; i < ary.length; i++ ){
                    // 'SPAN'  'DIV'
                    if(ary[i].nodeName !== tagName.toUpperCase()){
                        ary.splice(i,1);
                        i--;
                    }
                }
            }
            return ary;
        }

    function win(attr,val){
        if(typeof val !== 'undefined'){
            document.documentElement[attr] = val;
            document.body[attr] = val;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    }

    return {
        win : win,
        toArray : toArray,
        //jsonParse : jsonParse,
        getRandom : getRandom,
        prev : prev,
        next : next,
        children : children
    };

})();








