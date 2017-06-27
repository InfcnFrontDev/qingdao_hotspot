/**
 * Created by dell on 2017/1/9.
 */
$(function(){
    $(".nav li").mouseover(function(){
        $(this).addClass("hovor")
            $(this).children("div").show();

    })
    $(".nav li").mouseout(function(){
        $(this).removeClass("hovor")
            $(this).children("div").hide();
    })
    $(".lwlz").click(function(){
        $(this).siblings("ul").toggle();
        $(this).children("span").toggleClass("hovy")
    })
    $(".g_main_left div li").click(function(){
        $(this).children("img").show();
        $(this).css("color","#0aa796");
        $(this).siblings("li").children("img").hide();
        $(this).siblings("li").css("color","#808080");
    })
    $(".g_main_left div .lw").click(function(){
            $(".lunwen").show();
            $(".lunzhu").hide();
    })
    $(".g_main_left div .lz").click(function(){
            $(".lunwen").hide();
            $(".lunzhu").show();
    })
    $(".g_main_left a h1").click(function(){
        $(this).addClass("hov");
        $(this).parents().siblings().children("h1").removeClass("hov");
        $(".hid").hide();
        $(this).children("img").show();
        $(this).parents().siblings().children("h1").children("img").hide();
        $(".lwlz").children("span").removeClass("hovy")
    })
    $(".g_main_left div h1").click(function(){
        $(this).addClass("hov");
        $(this).parents().siblings().children("h1").removeClass("hov");
        $(this).parents().siblings().children("h1").children("img").hide();
    })


})