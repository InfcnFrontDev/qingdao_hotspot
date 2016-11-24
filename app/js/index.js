// ready
$(function () {

    TopicApi.searchByQuery(0,Config.pageSize, function (result) {
        if(result.obj.hits.total>10000){
            $this.allPageSize=10000;
        }else{
            $this.allPageSize=result.obj.hits.total;
        }
    },function(){

    })
    TopicApi.statistical(function (result) {
        $('.nav-text:first').html(result.obj.all+"条");
        $('.nav-text').eq(1).html(result.obj.month+"条");
        $('.nav-text').eq(2).html(result.obj.d7+"条");
        $('.nav-text:last').html(result.obj.d30+"条");
    }, function (error) {
        $('.error').addClass('hidden')
    });
    checkURL('home');
    var url=location.hash.replace(/^#/, '');
    checkURL(url);
    $('#sybtn').on('click',function(){
        $('#sybtn').addClass('navth-click')
        $('#sybtn').siblings().removeClass('navth-click')
        container = $('#ztcbox');
        loadURL( 'home/index.html', container);
    });
    $('#rdbtn').on('click',function(){
        container = $('#ztcbox');
        loadURL('redian/index.html', container);
        $('#rdbtn').addClass('navth-click')
        $('#rdbtn').siblings().removeClass('navth-click')
    });
    $('#zdbtn').on('click',function(){
        $('#zdbtn').addClass('navth-click')
        $('#zdbtn').siblings().removeClass('navth-click')
        container = $('#ztcbox');
        loadURL('zuida/index.html', container);
    });
    $('#ycbtn').on('click',function(){
        $('#ycbtn').addClass('navth-click')
        $('#ycbtn').siblings().removeClass('navth-click')
        container = $('#ztcbox');
        loadURL( 'yichang/index.html', container);
    });

    // 初始化日期控件
    $("#startDate").datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText, inst) {
            $('#lastDay').val('-');
            //刷新select选择框渲染
            $this.startDate = dateText;
        }
    });
    // 初始化日期控件
    $("#endDate").datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText, inst) {
            $('#lastDay').val('-');
            //刷新select选择框渲染

            $this.endDate = dateText;
        }
    });
    $('.layui-btn').on('click',function(){
        update('hotWord','redian1');
        update('abnormalWord','zuida1');
        update('changeWord','yichang1');
        $('.btn-qiehuan').removeClass('selected');
    })


    updateDate(7);
    $('.btn-qiehuan:first').addClass('selected');
    $('.btn-qiehuan').on('click',function(){
        $(this).addClass('selected');
        $(this).parent().siblings().children().removeClass('selected');
        if($(this).text()=="一周内"){
            updateDate(7);
            update('hotWord','redian1');
            update('abnormalWord','zuida1');
            update('changeWord','yichang1');
        }
        if($(this).text()=="一个月内") {
            updateDate(dateInterval(1));
            update('hotWord','redian1');
            update('abnormalWord','zuida1');
            update('changeWord','yichang1');
        }
        if($(this).text()=="三个月内"){
            updateDate(dateInterval(3));
            update('hotWord','redian1');
            update('abnormalWord','zuida1');
            update('changeWord','yichang1');
        }
        if($(this).text()=="半年内"){
            updateDate(dateInterval(6));
            update('hotWord','redian1');
            update('abnormalWord','zuida1');
            update('changeWord','yichang1');
        }
        if($(this).text()=="一年内"){
            updateDate(dateInterval(12));
            update('hotWord','redian1');
            update('abnormalWord','zuida1');
            update('changeWord','yichang1');
        }
    });
});

/*$(window).on('hashchange', function () {
    checkURL();
});*/

function checkURL(url) {
    //get the url by removing the hash
    var val=$('#'+url+'1').find('.topn').children().val()
        $('#'+url+'1').find('.topn').children().val(val);

    container = $('#ztcbox');
    // Do this if url exists (for page refresh, etc...)
    if (url) {
        // parse url to jquery
        loadURL(url+ '/index.html', container);
        $('.navth-content a[href="#' + url + '"]').addClass('navth-click')
        $('.navth-content a[href="#' + url + '"]').siblings().removeClass('navth-click')
    } else {
        // grab the first URL from nav
       /* $this = $('.navth-content > a[href!="#"]');
        //update hash
        window.location.hash = $this.attr('href');*/
    }
}

function loadURL(url, container) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        cache: true, // (warning: this will cause a timestamp and will call the request twice)
        success: function (data) {
            container.html(data)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            container.html(
                '<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>'
            );
            drawBreadCrumb();
        }
    });
}


var $this={
    countData: {total: 0, newTotal: 0},// 接口count数据
    topicData: [],  // 接口topic数据
    //
    allPageSize:0,
    lastDay: '30',
    startDate: '',
    endDate: '',
    size: 10,
    sortByFreq: true,
    pageSize: Config.pageSize,
    word: undefined,
    wordDocs: [], // 全部内容列表
    page: 1,
    pageDocs: [], // 分页后内容列表
    /*loading: false,
    nodata: false,
    error: true,*/
    errorMessage: '',
    sortByFreqText: '热点主题词',
    setSortByFreq: function (val) {
        $this.sortByFreq = val;
        update();

        if(val){
            $(".text-left").text("热点主题词");
        }else{
            $(".text-left").text("异常变动主题词");
        }
    },
    setLastDay: function (val) {
        $this.lastDay = val;
        updateDate(val);
        update();
    },
    setSize:function(val,keywords,id){
        $this.size = val;
        update(keywords,id);
    }
};
//时间间隔
var dateInterval=function(val){
    var nowdate = new Date();
    var year = nowdate.getFullYear();
    var mouth = nowdate.getMonth()+1;
    var days;
    var zongshu=0;
    for (var i=0; i<val; i++){
        mouth--;
        if(mouth==0){
            mouth=12
        }
        if (mouth == 2) {
            days = year % 4 == 0 ? 29 : 28;
        }
        else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
            //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
            days = 31;
        }
        else {
            //其他月份，天数为：30.
            days = 30;
        }
        zongshu += days
    }
    return zongshu
}
// 选择最n天内，更新时间段
var updateDate=function(val){
    if (val != '-') {
        // 初始化时间区间，默认30天内
        var date1, date2 = new Date();
        date1 = Tools.dateAdd(date2, -(val * 24 * 60 * 60));
        $this.startDate = Tools.dateFormat(date1, Tools.yyyyMMdd_);
        $this.endDate = Tools.dateFormat(date2, Tools.yyyyMMdd_);



        $('#startDate').val($this.startDate);
        $('#endDate').val($this.endDate);
        /*update();*/
    }
};
// 更新数据

var revalue,zuivalue,yivalue,reSelectval=10,zuiSelectval=10,yiSelectval=10;;
var update=function(keywords,id){
    $('#ztcbox').addClass('hidden');
    $('.loading').removeClass('hidden')
    $('.nodata').addClass('hidden');
    $('.error').addClass('hidden');
    var $ztcbox =$('#ztcbox')
    TopicApi.topic(keywords,$this.startDate, $this.endDate, $this.size, function (result) {
        $('.loading').addClass('hidden');
        $ztcbox.removeClass('hidden');
        if (result.obj.length>0) {
            $this.topicData = result.obj;

            var li='';
            for(var i=0; i<$this.topicData.length; i++){
                li +="<li class=\"cc\">"+
                "<div class=\"col-xs-2 height-word\"><span class=\"s-left\" >"+parseInt(i+1)+"</span></div>"+
                "<div class=\"col-xs-8 height-word\"><span class=\"s-cente\">"+$this.topicData[i].key+"</span></div>"+
                "<div class=\"col-xs-2 height-word\"><span class=\"s-right\">"+$this.topicData[i].doc_count+"</span></div>"+
                "</li>"
            }
            $('#'+id+'').find('.words-list').html(li);

            $('#'+id+'').find('.words-list').children().on('click',function(){
                reSelectval=$('#redian1').find('select').val()
                zuiSelectval=$('#zuida1').find('select').val()
                yiSelectval=$('#yichang1').find('select').val()
                $(this).addClass('selected');
                $(this).siblings().removeClass('selected');
                var url=id.replace('1','')
                if(id=='redian1'){
                    revalue=$(this).children().eq(0).text()-1;
                }
                if(id=='zuida1'){
                    zuivalue=$(this).children().eq(0).text()-1;
                }
                if(id=='yichang1'){
                    yivalue=$(this).children().eq(0).text()-1;
                }
                console.log($(this).parent().children().scrollTop());


                var hrf=location.hash.replace(/^#/, '');
                if(url!=hrf){
                    checkURL(url)
                }
                window.location.hash=url;

                wenZhangShowTag($(this).find('.s-cente').text());
                /*searchWord($(this).find('.s-cente').text());*/

            });
            $('#'+id+'').find('.words-list').children().eq(0).addClass('selected');
            if(keywords=='hotWord'){
                $('#redian1').find('.words-list').children().eq(revalue).addClass('selected');
                $('#redian1').find('.words-list').children().eq(revalue).siblings().removeClass('selected');
            }
            if(keywords=='abnormalWord'){
                $('#zuida1').find('.words-list').children().eq(zuivalue).addClass('selected');
                $('#zuida1').find('.words-list').children().eq(zuivalue).siblings().removeClass('selected');
                $('#zuida1').find('select').val(zuiSelectval)
            }
            if(keywords=='changeWord'){
                $('#yichang1').find('.words-list').children().eq(yivalue).addClass('selected');
                $('#yichang1').find('.words-list').children().eq(yivalue).siblings().removeClass('selected');
                $('#yichang1').find('select').val(yiSelectval)
            }


            for(var i=0; i<3; i++){
                $('#'+id+'').find('.words-list').children().eq(i).find('.s-left').addClass('s-hot');
            }

            /*searchWord($this.topicData[0].name);*/
        } else {
            $('.words-list').html('');
            $('.wenzhang-list').html('');
            $('.nodata').removeClass('hidden');
            $('#ztcbox').addClass('hidden');
        }
    }, function (error) {
        $('.loading').addClass('hidden');
        $('.error').removeClass('hidden');
        if(error.status == 500){
            var obj = JSON.parse(error.responseText)
            $('.error').text(obj.message);
        }else{
            $('.error').text("服务器出现异常！“" + error.status +"，"+ error.statusText + "”");
        }
    });
};
//全部文章分页
var fenye=function(qishi,size){
    TopicApi.searchByQuery(qishi,size,function(result){
        var arr=result.obj.hits.hits;
        $this.wordDocs = arr;
        var li='';
        for(var i=0; i<arr.length; i++){
            li+="<div id=\""+arr[i]._id+"\" class=\"w-item\">"+
                "<a href=\""+arr[i]._source.pageurl+"\" target='_blank'>"+
                "<div class=\"col-xs-7 col-title cc\">"+
                "<div class=\"w-title cc\">"+
                arr[i]._source.title+
                "</div>"+
                "</div>"+
                "<div class=\"col-xs-2 cc\">"+
                "<div class=\"w-unit cc\" title=\""+arr[i]._source.units+"\">"+
                arr[i]._source.units
                +"</div>"+
                "</div>"+
                "<div class=\"col-xs-3 cc\">"+
                "<div class=\"w-datetime cc\">"+Tools.dateFormat(new Date(arr[i]._source.question_time), Tools.yyyyMMddHHmm_)+"</div>"+
                "</div>"+
                "<div class=\"clear\"></div>"+
                "</a>"+
                "</div>"
        }
        $('.wenzhang-list').html(li);
        $('.wenzhang-list').children().on('mouseover',function(){
            showSummary($(this).attr("id"))
        })

    },function(error){

    })
}
//全部文章显示
var wenZhangShow=function(){
    fenye(0,Config.pageSize)
    TopicApi.searchByQuery(0,Config.pageSize,function(result){
        var numm=result.obj.hits.total
        if(Math.ceil(numm/ Config.pageSize)>1){
            $('#page').removeClass('hidden')
            $('#pagination1').jqPaginator({
                totalPages: Math.ceil(numm / Config.pageSize),
                visiblePages: Config.pageSize,
                currentPage: 1,
                prev: '<li class="prev"><a href="javascript:void(0);"><i class="arrow arrow2"><\/i>上一页<\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页<i class="arrow arrow3"><\/i><\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                onPageChange: function (num, type) {
                    $('#text').html('当前第' + num + '页');
                    var a=num*Config.pageSize
                    fenye(a,Config.pageSize);
                }
            });
        }else{
            $('#page').addClass('hidden')
        }
    },function(){
    })
}
// 加载文章摘要
var showSummary=function(id){
    if ($('#' + id).find('.w-jianjie').length == 0) {
        TopicApi.findById(id, function (result) {
            if (result.ok) {

                var question = result.obj.question;
                if (question.length > 120) {
                    question = question.substring(0, 120) + '...';
                }

                var div = '<div class="w-jianjie cc"><img src="images/lan-jiantou.png" />' +
                    '<p>' + question + '</p>' +
                    '</div>';
                $('#' + id).find('.col-title').append(div);
            }
        }, function (error) {});
    }
};
//文章详情分页
var fenyeTag=function(qishi,size,tag){
    TopicApi.searchByQueryTag(qishi,size,tag,$this.startDate, $this.endDate,function(result){
        var arr=result.obj.hits.hits;
        var zongshu=result.obj.hits.total;
        $this.wordDocs = arr;
        var li='';
        for(var i=0; i<arr.length; i++){
            li+="<div id=\""+arr[i]._id+"\" class=\"w-item\">"+
                "<a href=\""+arr[i]._source.pageurl+"\" target='_blank'>"+
                "<div class=\"col-xs-7 col-title cc\">"+
                "<div class=\"w-title cc\">"+
                arr[i]._source.title+
                "</div>"+
                "</div>"+
                "<div class=\"col-xs-2 cc\">"+
                "<div class=\"w-unit cc\" title=\""+arr[i]._source.units+"\">"+
                arr[i]._source.units
                +"</div>"+
                "</div>"+
                "<div class=\"col-xs-3 cc\">"+
                "<div class=\"w-datetime cc\">"+Tools.dateFormat(new Date(arr[i]._source.question_time), Tools.yyyyMMddHHmm_)+"</div>"+
                "</div>"+
                "<div class=\"clear\"></div>"+
                "</a>"+
                "</div>"
        }
        $('.wenzhang-list').html(li);
        $('.wenzhang-list').children().on('mouseover',function(){
            showSummary($(this).attr("id"))
        })

    },function(error){

    })

}
//文章详情显示
var wenZhangShowTag=function(tag){
    fenyeTag(0,Config.pageSize,tag)
    TopicApi.searchByQueryTag(0,Config.pageSize,tag,$this.startDate,$this.endDate,function(result){
        if(Math.ceil(result.obj.hits.total / Config.pageSize)>1){
            $('#page').removeClass('hidden');
            $('#pagination1').jqPaginator({
                totalPages: Math.ceil(result.obj.hits.total/Config.pageSize)-1,
                visiblePages: Config.pageSize,
                currentPage: 1,
                prev: '<li class="prev"><a href="javascript:void(0);"><i class="arrow arrow2"><\/i>上一页<\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页<i class="arrow arrow3"><\/i><\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                onPageChange: function (num, type) {
                    $('#text').html('当前第' + num + '页');
                    var a=num*Config.pageSize
                    fenyeTag(a,Config.pageSize,tag);
                }
            });
        }else{
            $('#page').addClass('hidden')
        }
    })
}





