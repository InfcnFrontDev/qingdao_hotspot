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
/*
layui.use('flow', function() {
    var flow = layui.flow;
    flow.load({
        elem: '#LAY_demo' //流加载容器
        ,scrollElem: '#LAY_demo' //滚动条所在元素，一般不用填，此处只是演示需要。
        ,done: function(page, next){ //加载下一页
            //模拟插入
            setTimeout(function(){
                var lis = [];
                for(var i = 0; i < 8; i++){
                    lis.push('<li>'+ ( (page-1)*8 + i + 1 ) +'</li>')
                }
                next(lis.join(''), page > 10 ? 0 : 8);
            }, 500);
        }
    });
})*/
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
<<<<<<< HEAD
$.parser.parse('lt-ul');
=======

$( ".datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd'
});
>>>>>>> 534dd11e3efc38c54d7022f70f4c666e79e17144
