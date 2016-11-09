new Vue({
    el: 'body',
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
    $(".wenzhang-ul li").mouseover(function(){
        $(this).find(".floatbox").show();
        $(this).siblings().find(".floatbox").hide();
    });
    /*var $fWidth=$(".floatbox").width()*1/2;
    $(".floatbox").css({left:e.pageX+10-$fWidth,top:e.pageY+10});*/

    $(".wenzhang-ul").mouseout(function(){
        $(".floatbox").hide();
    });

});
$('.btn-qiehuan').click(function(){
    if(!($(this).hasClass('click-color'))){
        $(this).addClass('click-color')
        $(this).parent().siblings().children().removeClass('click-color');
    }
});
layui.use(['laypage', 'layer'], function() {
    var laypage = layui.laypage
    var  layer = layui.layer;
    laypage({
        cont: 'page'
        , pages: 100
        , skin: '#0077dd'
    })
})
$('.lt-ul li').hover(function(){
    $(this).css('background','#c9d5f7');
    $(this).children().css('color','#fff');
    $(this).find('span').css('color','#fff')
},function(){
    $(this).css('background','#fff');
    $(this).children().css('color','#7b7d7c');
    $(this).find('span').css('color','#7b7d7c')
});
$('.wenzhang-ul li').hover(function(){
    $(this).css('background','#d7f4fc');
},function(){
    $(this).css('background','#fff');
})

$( ".datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd'
});