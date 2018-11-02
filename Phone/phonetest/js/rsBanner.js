/**
 * Created by Administrator on 2016/10/25.
 */
var $rs={
    init:function(){
        $(".rsBanner").each(function(){
            var that=this;
            var len=$(that).find("li").length;

        });
    }
}

/*初始化插件*/
document.onload=function(){
    $rs.init();
}();