new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        words: [],
        list: []
    },
    ready: function(){

    }
})
layui.use('form', function(){
    var form = layui.form();

    //各种基于事件的操作，下面会有进一步介绍
});
$(".wenzhang-ul").mousemove(function(e){
    $(".wenzhang-ul").mouseover(function(){
        $(".floatbox").show();
    });
    var $fWidth=$(".floatbox").width()*1/2;
    $(".floatbox").css({left:e.pageX+10-$fWidth,top:e.pageY+10});

    $(".wenzhang-ul").mouseout(function(){
        $(".floatbox").hide();
    });

});