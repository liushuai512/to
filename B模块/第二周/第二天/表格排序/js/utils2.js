/**
 * Created by lenovo on 2017/1/5.
 */
var utils={
    toArray:function(likeAry){
        try {
            return Array.prototype.slice.call(likeAry);
        }catch (e){
            var ary=[];
            for(var i=0;i<likeAry.length;i++){
                ary.push(likeAry[i]);
            }
        }
        return ary;
    },
    jsonParse:function(jsonstr){
        return "JSON" in window? JSON.parse(jsonstr):eval('('+jsonstr+')');
    }
};