/**
 * Created by lenovo on 2017/1/9.
 */
/*
var utils = {
    toArray: function (likeAry) {
        try {
            return Array.prototype.slice.call(likeAry);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeAry.length; i++) {
                ary.push(likeAry[i]);
            }
        }
        return ary;
    },
    jsonParse: function (jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }
}*/
/*
var utils={
    toArray:function(likeAry){
        try{
            return Array.prototype.slice.call(likeAry);
        }catch (e){
            var ary=[];
            for(var i=0;i<likeAry.length;i++){
                ary.push(likeAry[i]);
            }
        }
        return ary;
    },
    jsonParse:function(jsonStr){
        return "JSON" in window? JSON.parse(jsonStr):eval('('+jsonStr+')');
    }
}*/
var utils={
    toArray:function(likeAry){
        try {
            return Array.propertyIsEnumerable.slice.call(likeAry);
        }catch (e){
            var ary=[];
            for(var i=0;i<likeAry.length;i++){
                ary.push(likeAry[i]);
            }
        }
        return ary;
    },
    jsonParse:function(jsonStr){
        return "JSON" in window? JSON.parse(jsonStr):eval('('+jsonStr+')');
    }
};