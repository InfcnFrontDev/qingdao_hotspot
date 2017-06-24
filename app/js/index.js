var chart_theme = 'macarons';


$(window).on('hashchange', function () {
    checkURL();
});

// ready
$(function () {

    checkURL();


    TopicApi.statistical(function (result) {
        $('.nav-text:first').html(result.obj.all + "条");
        $('.nav-text').eq(1).html(result.obj.month + "条");
        $('.nav-text').eq(2).html(result.obj.d7 + "条");
        $('.nav-text:last').html(result.obj.d30 + "条");
    }, function (error) {
        $('.error').addClass('hidden')
    });


    $('#sybtn').on('click', function () {
        $('#sybtn').addClass('navth-click')
        $('#sybtn').siblings().removeClass('navth-click');

        $this.word = null;
        window.location.hash = 'home'
    });
    $('#rdbtn').on('click', function () {
        $('#rdbtn').addClass('navth-click');
        $('#rdbtn').siblings().removeClass('navth-click');

        $this.word = null;
        window.location.hash = 'redian'
    });
    $('#bmbtn').on('click', function () {
        $('#bmbtn').addClass('navth-click')
        $('#bmbtn').siblings().removeClass('navth-click')

        $this.word = null;
        window.location.hash = 'bumen'
    });
    $('#bdbtn').on('click', function () {
        $('#bdbtn').addClass('navth-click')
        $('#bdbtn').siblings().removeClass('navth-click')

        $this.word = null;
        window.location.hash = 'biandong'
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

    updateDate(dateInterval(12));
    $('.layui-btn').on('click', function () {
        $('.btn-qiehuan').removeClass('selected');
        update();
    })

    $('.btn-qiehuan').eq(2).addClass('selected');
    $('.btn-qiehuan').on('click', function () {
        $(this).addClass('selected');
        $(this).parent().siblings().children().removeClass('selected');

        if ($(this).text() == "一周内") {
            updateDate(7);
        }
        if ($(this).text() == "一个月内") {
            updateDate(dateInterval(1));
        }
        if ($(this).text() == "三个月内") {
            updateDate(dateInterval(3));
        }
        if ($(this).text() == "半年内") {
            updateDate(dateInterval(6));
        }
        if ($(this).text() == "一年内") {
            updateDate(dateInterval(12));
        }

        update();

    });
});
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return decodeURIComponent(r[2]); return null;
}

function checkURL(url) {
    var hash = location.hash.replace(/^#/, '');

    $this.hash = hash;

    if (hash && hash != '') {
        loadURL(hash + '/index.html', $('#ztcbox'));
        $('.navth-content a[href="#' + hash + '"]').addClass('navth-click')
        $('.navth-content a[href="#' + hash + '"]').siblings().removeClass('navth-click')
    } else {
        //update hash
        window.location.hash = 'home';
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


var $this = {
    countData: {total: 0, newTotal: 0},// 接口count数据
    topicData: [],  // 接口topic数据
    bumenWord:'',
    biandongzhuti:'',
    //
    allPageSize: 0,
    lastDay: '30',
    startDate: '',
    endDate: '',
    redianSize: 10,
    zuidaSize: 10,
    yichangSize: 10,
    bumenSize:10,
    bumenBDSize:10,
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

        if (val) {
            $(".text-left").text("热点主题词");
        } else {
            $(".text-left").text("异常变动主题词");
        }
    },
    setLastDay: function (val) {
        $this.lastDay = val;
        updateDate(val);
        update();
    },
    redianSetSize: function (val, fn) {
        $this.redianSize = val;
        if(fn) fn();
    },
    zuidaSetSize: function (val, fn) {
        $this.zuidaSize = val;
        if(fn) fn();
    },
    yichangSetSize: function (val, fn) {
        $this.yichangSize = val;
        if(fn) fn();
    },
//================================
   bumenSetSize: function (val, fn) {
        $this.bumenSize = val;
        if(fn) fn();
    },
    bumenBDSetSize: function (val, fn) {
        $this.bumenBDSize = val;
        if(fn) fn();
    }
//================================
};
//时间间隔
var dateInterval = function (val) {
    var nowdate = new Date();
    var year = nowdate.getFullYear();
    var mouth = nowdate.getMonth() + 1;
    var days;
    var zongshu = 0;
    for (var i = 0; i < val; i++) {
        mouth--;
        if (mouth == 0) {
            mouth = 12
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
var updateDate = function (val) {
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
/*var areaData = function (element, size,startDate,endDate,successCallback) {
    var id=element;
    var num =size ;
    var startDate=startDate;
    var endDate=endDate;
    TopicApi.area('area', num,startDate,endDate, function (result) {

    }, function (error) {

    })

}*/

var updateWords = function (keywords, id, size, successCallback) {
    console.log(keywords);
    // $('#ztcbox').addClass('hidden');
    // $('.loading').removeClass('hidden')
    // $('.nodata').addClass('hidden');
    // $('.error').addClass('hidden');
    var $ztcbox = $('#ztcbox');

    $('#' + id + '').find('.words-list').html('');
    TopicApi.topic(keywords, $this.startDate, $this.endDate, size, function (result) {
        $('.nodata').addClass('hidden');
        $('#ztcbox').removeClass('hidden');

        var words = [];
        if (result.obj.length > 0) {
            $this.topicData = result.obj;

            var li = '';
            for (var i = 0; i < $this.topicData.length; i++) {
                var selected = $this.word == $this.topicData[i].key ? ' selected' : '';
                var num=keywords=="changeDepart"?$this.topicData[i].upNum:$this.topicData[i].doc_count
                li += "<li class=\"cc"+ selected +"\">" +
                    "<div class=\"col-xs-2 height-word\"><span class=\"s-left\" >" + parseInt(i + 1) + "</span></div>" +
                    "<div class=\"col-xs-8 height-word\"><span class=\"s-cente guanjianci\">" + $this.topicData[i].key + "</span></div>" +
                    "<div class=\"col-xs-2 height-word\"><span class=\"s-right\">" +num + "</span></div>" +
                    "</li>"

                if (i < 5) {
                    words.push($this.topicData[i].key);
                }
            }
            $('#' + id + '').find('.words-list').html(li);
            $('#' + id + '').find('.words-list').children().on('click', function () {
                $this.biandongzhuti=$(this).parent().parent().parent().find('.text-left').text();

                var guanjianci = $(this).find('.guanjianci').text();

                console.log(guanjianci);
                $(this).addClass('selected');
                $(this).siblings().removeClass('selected');

                enterWord(guanjianci, id);

            });
            // $('#' + id + '').find('.words-list').children().eq(0).addClass("selected");
            for (var i = 0; i < 3; i++) {
                $('#' + id + '').find('.words-list').children().eq(i).find('.s-left').addClass('s-hot');
            }
        }

        if (successCallback)
            successCallback(words);

    }, function (error) {
        $('.loading').addClass('hidden');
        $('.error').removeClass('hidden');
        $('#ztcbox').addClass('hidden');
        if (error.status == 500) {
            var obj = JSON.parse(error.responseText)
            $('.error').text(obj.message);
        } else {
            $('.error').text("服务器出现异常！“" + error.status + "，" + error.statusText + "”");
        }
    });
};

var bumenupdateWords = function (keywords, id, size, dept, successCallback) {
    var $ztcbox = $('#ztcbox');
    $('#' + id + '').find('.words-list').html('');
    TopicApi.bumentopic(keywords, $this.startDate, $this.endDate, size, dept, function (result) {
        $('.nodata').addClass('hidden');
        $('#ztcbox').removeClass('hidden');

        var words = [];
        if (result.obj.length > 0) {
            $this.topicData = result.obj;

            var li = '';
            for (var i = 0; i < $this.topicData.length; i++) {
                var selected = $this.word == $this.topicData[i].key ? ' selected' : '';
                var num=keywords=="changeDepart"?$this.topicData[i].upNum:$this.topicData[i].doc_count
                li += "<li class=\"cc"+ selected +"\">" +
                    "<div class=\"col-xs-2 height-word\"><span class=\"s-left\" >" + parseInt(i + 1) + "</span></div>" +
                    "<div class=\"col-xs-8 height-word\"><span class=\"s-cente guanjianci\">" + $this.topicData[i].key + "</span></div>" +
                    "<div class=\"col-xs-2 height-word\"><span class=\"s-right\">" +num + "</span></div>" +
                    "</li>"

                if (i < 5) {
                    words.push($this.topicData[i].key);
                }
            }
            $('#' + id + '').find('.words-list').html(li);
            $('#' + id + '').find('.words-list').children().on('click', function () {
                var guanjianci = $(this).find('.guanjianci').text();

                console.log(guanjianci);
                $(this).addClass('selected');
                $(this).siblings().removeClass('selected');

                enterWord(guanjianci, id);

            });
            // $('#' + id + '').find('.words-list').children().eq(0).addClass("selected");
            for (var i = 0; i < 3; i++) {
                $('#' + id + '').find('.words-list').children().eq(i).find('.s-left').addClass('s-hot');
            }
        }

        if (successCallback)
            successCallback(words);

    }, function (error) {
        $('.loading').addClass('hidden');
        $('.error').removeClass('hidden');
        $('#ztcbox').addClass('hidden');
        if (error.status == 500) {
            var obj = JSON.parse(error.responseText)
            $('.error').text(obj.message);
        } else {
            $('.error').text("服务器出现异常！“" + error.status + "，" + error.statusText + "”");
        }
    });
};



//全部文章分页
var fenye = function (qishi, size) {
    TopicApi.searchByQuery(qishi, size,$this.startDate,$this.endDate, function (result) {
        var arr = result.obj.hits.hits;
        $this.wordDocs = arr;
        var li = '';
        for (var i = 0; i < arr.length; i++) {
            li += "<div id=\"" + arr[i]._id + "\" class=\"w-item\">" +
                "<a href=\"" + arr[i]._source.pageurl + "\" target='_blank'>" +
                "<div class=\"col-xs-7 col-title cc\">" +
                "<div class=\"w-title cc\">" +
                arr[i]._source.title +
                "</div>" +
                "</div>" +
                "<div class=\"col-xs-2 cc\">" +
                "<div class=\"w-unit cc\" title=\"" + arr[i]._source.units + "\">" +
                arr[i]._source.units
                + "</div>" +
                "</div>" +
                "<div class=\"col-xs-3 cc\">" +
                "<div class=\"w-datetime cc\">" + Tools.dateFormat(isoDateStrToDate(arr[i]._source.question_time), Tools.yyyyMMddHHmm_) + "</div>" +
                "</div>" +
                "<div class=\"clear\"></div>" +
                "</a>" +
                "</div>"
        }

        $('.wenzhang-list').html(li);
        $('.wenzhang-list').children().on('mouseover', function () {
            showSummary($(this).attr("id"))
        })

    }, function (error) {

    })
}
//全部文章显示
var wenZhangShow = function () {
    fenye(0, Config.pageSize);
    TopicApi.searchByQuery(0, Config.pageSize,$this.startDate,$this.endDate, function (result) {
        console.log(result)
        var numm = result.obj.hits.total
        if (Math.ceil(numm / Config.pageSize) > 1) {
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
                    var a = (num-1) * Config.pageSize
                    fenye(a, Config.pageSize);
                }
            });
        } else {
            $('#page').addClass('hidden')
        }
    }, function () {
    })
}
// 加载文章摘要
var showSummary = function (id) {
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
        }, function (error) {
        });
    }
};
//文章详情分页
var fenyeTag = function (qishi, size, tag) {
    TopicApi.searchByQueryTag(qishi, size, tag, $this.startDate, $this.endDate, function (result) {
        var arr = result.obj.hits.hits;
        var zongshu = result.obj.hits.total;
        $this.wordDocs = arr;
        var li = '';
        for (var i = 0; i < arr.length; i++) {
            li += "<div id=\"" + arr[i]._id + "\" class=\"w-item\">" +
                "<a href=\"" + arr[i]._source.pageurl + "\" target='_blank'>" +
                "<div class=\"col-xs-7 col-title cc\">" +
                "<div class=\"w-title cc\">" +
                arr[i]._source.title +
                "</div>" +
                "</div>" +
                "<div class=\"col-xs-2 cc\">" +
                "<div class=\"w-unit cc\" title=\"" + arr[i]._source.units + "\">" +
                arr[i]._source.units
                + "</div>" +
                "</div>" +
                "<div class=\"col-xs-3 cc\">" +
                "<div class=\"w-datetime cc\">" + Tools.dateFormat(isoDateStrToDate(arr[i]._source.question_time), Tools.yyyyMMddHHmm_) + "</div>" +
                "</div>" +
                "<div class=\"clear\"></div>" +
                "</a>" +
                "</div>"
        }


        // console.log(arr[0]);
        // console.log(arr[0]._source.question_time);
        // console.log(new Date(arr[0]._source.question_time));




        $('.wenzhang-list').html(li);
        $('.wenzhang-list').children().on('mouseover', function () {
            showSummary($(this).attr("id"))
        })

    }, function (error) {

    })

}
//文章详情显示
var wenZhangShowTag = function (tag) {

    tag = encodeURI(tag);

    fenyeTag(0, Config.pageSize, tag)
    TopicApi.searchByQueryTag(0, Config.pageSize, tag, $this.startDate, $this.endDate, function (result) {
        if (Math.ceil(result.obj.hits.total / Config.pageSize) > 1) {
            $('#page').removeClass('hidden');
            $('#pagination1').jqPaginator({
                totalPages: Math.ceil(result.obj.hits.total / Config.pageSize) - 1,
                visiblePages: Config.pageSize,
                currentPage: 1,
                prev: '<li class="prev"><a href="javascript:void(0);"><i class="arrow arrow2"><\/i>上一页<\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);">下一页<i class="arrow arrow3"><\/i><\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                onPageChange: function (num, type) {
                    $('#text').html('当前第' + num + '页');
                    var a = (num-1) * Config.pageSize
                    fenyeTag(a, Config.pageSize, tag);
                }
            });
        } else {
            $('#page').addClass('hidden')
        }
    })
}

var isoDateStrToDate = function(isoDateStr){

    var dateStr1 = isoDateStr.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');

    var date1 = new Date(
        dateStr1.substr(0,4),
        dateStr1.substr(5,2) - 1,
        dateStr1.substr(8,2),
        dateStr1.substr(11,2),
        dateStr1.substr(14,2),
        dateStr1.substr(17,2)
    );
    var date2 = new Date(date1.getTime() + (8*3600*1000));

    return date2;

};

//加载echarts对比图
var redianCycle = function (element, num, tags, startDate, endDate) {
    var id = element;
    var num = num;
    var tags = tags;
    var startDate = startDate;
    var endDate = endDate;
    tags = encodeURI(tags)
    TopicApi.searchCycleData(tags, num, startDate, endDate, function (result) {
        var obj = result.obj;

        var tagarr = [];
        var now = [];
        var pre = [];
        var prepre = [];
        for (var i in obj) {
            var word = obj[i];
            tagarr.push(word.tag);
            prepre.push(word.buckets[0].doc_count);
            pre.push(word.buckets[1].doc_count);
            now.push(word.buckets[2].doc_count);
        }
        ;

        var myChart = echarts.init(id[0], chart_theme);
        option = {
            title: {
                text: '最近三个周期对比'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                x: 40,
                x2: 10,
                y2: 30

            },
            legend: {
                data: ['上上周期', '上周期', '本周期']
            },
            xAxis: [
                {
                    type: 'category',
                    data: tagarr
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '上上周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: prepre
                },
                {
                    name: '上周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: pre
                },
                {
                    name: '本周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: now
                }
            ]
        };

        // 为echarts对象加载数据
        myChart.setOption(option);


    }, function (error) {

    })


}

var zuidaCycle=function(element,num,tags,startDate,endDate){
    var id=element;
    var num =num ;
    var tags=tags;
    var startDate=startDate;
    var endDate=endDate;
    tags=encodeURI(tags)
    TopicApi.searchCycleData(tags,num, startDate,endDate, function (result){
        var obj=result.obj;

        var tagarr=[];
        var now=[];
        var pre=[];
        for(var i in obj){
            var word = obj[i];
            tagarr.push(word.tag);

            pre.push(word.buckets[0].doc_count);
            now.push(word.buckets[1].doc_count);
        };
        var zlArr=[];
        var sumArr = [];
        for(i in now){
            var zl=Math.abs(now[i]-pre[i]);
            zlArr.push(zl);
            sumArr.push(0);
        }
        var myChart = echarts.init(id[0], chart_theme);
        option = {
            title : {
                text: '本周期与上周期对比增量',
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params){
                    return params[0].name + '<br/>'
                        + params[2].seriesName + ' : ' + params[2].value + '<br/>'
                        + params[0].seriesName + ' : ' + (params[1].value + params[2].value) + '<br/>'
                        + params[1].seriesName + ' : ' + params[1].value;
                }
            },
            legend: {
                selectedMode:false,
                data:['增量', '上周期']
            },
            toolbox: {
                show : true,
            },
            grid:{
                x:40,
                x2:40,
                y2:30

            },
            xAxis : [
                {
                    type : 'category',
                    data : tagarr
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    boundaryGap: [0, 0.1]
                }
            ],
            series : [
                {
                    name:'上周期',
                    type:'bar',
                    stack: 'sum',
                    barCategoryGap: '50%',
                    itemStyle: {
                        normal: {
                            label : {
                                show: true,
                                position: 'inside'
                            }
                        }
                    },
                    data:pre
                },
                {
                    name:'增量',
                    type:'bar',
                    stack: 'sum',
                    itemStyle: {
                        normal: {
                            label : {
                                show: true,
                                position: 'inside'
                            }
                        }
                    },
                    data:zlArr
                },
                {
                    name:'本周期',
                    type:'bar',
                    stack: 'sum',
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            barBorderColor: 'tomato',
                            barBorderWidth: 6,
                            barBorderRadius:0,
                            label : {
                                show: true,
                                position: 'top',
                                formatter: function (params) {
                                    for (var i = 0, l = option.xAxis[0].data.length; i < l; i++) {
                                        if (option.xAxis[0].data[i] == params.name) {
                                            return option.series[0].data[i] + option.series[1].data[i];
                                        }
                                    }
                                },
                                textStyle: {
                                    color: 'tomato'
                                }
                            }
                        }
                    },
                    data:sumArr
                }

            ]

        };
        // 为echarts对象加载数据
        myChart.setOption(option);



    }, function (error) {

    })


}
var yichangCycle=function(element,num,tags,startDate,endDate){
    var id=element;
    var num =num ;
    var tags=tags;
    var startDate=startDate;
    var endDate=endDate;
    tags=encodeURI(tags)
    TopicApi.searchCycleData(tags,num, startDate,endDate, function (result){
        var obj=result.obj;

        var tagarr=[];
        var now=[];
        var pre=[];
        for(var i in obj){
            var word = obj[i];
            tagarr.unshift(word.tag);
            pre.unshift(word.buckets[0].doc_count);
            now.unshift(word.buckets[1].doc_count);
        };

        var myChart = echarts.init(id[0], chart_theme);
        option = {
            title : {
                text: '异常变动'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter:function(params,ticket,callback){
                    return params[0].name + '<br>'
                        + params[1].seriesName +' : '+ params[1].value +'<br>'
                        + params[0].seriesName +' : '+ params[0].value;
                }
            },
            grid:{
                x2:40,
                y2:30

            },
            legend: {
                data:['本周期', '上周期']
            },
            xAxis : [
                {
                    type : 'value'
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    data : tagarr
                }
            ],
            series : [
                {
                    name:'上周期',
                    type:'bar',
                    itemStyle : { normal: {label : {show: true, position: 'right'}}},
                    data:pre
                },
                {
                    name:'本周期',
                    type:'bar',
                    itemStyle : { normal: {label : {show: true, position: 'right'}}},
                    data:now
                }
            ]
        };
        // 为echarts对象加载数据
        myChart.setOption(option);



    }, function (error) {
    })


}
var bumenCycle=function(element,num,tags,startDate,endDate){
    var id=element;
    var num =num ;
    var tags=tags;
    var startDate=startDate;
    var endDate=endDate;
    tags=encodeURI(tags)
    TopicApi.searchBMCycleData(tags, num, startDate, endDate, function (result) {
        var obj = result.obj;
        console.log(obj);

        var tagarr = [];
        var now = [];
        var pre = [];
        var prepre = [];
        for (var i in obj) {
            var word = obj[i];
            tagarr.push(word.tag);
            prepre.push(word.buckets[0].doc_count);
            pre.push(word.buckets[1].doc_count);
            now.push(word.buckets[2].doc_count);
        }
        ;

        var myChart = echarts.init(id[0], chart_theme);
        option = {
            title: {
                text: '最近三个周期对比'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                x: 40,
                x2: 10,
                y2: 30

            },
            legend: {
                data: ['上上周期', '上周期', '本周期']
            },
            xAxis: [
                {
                    type: 'category',
                    data: tagarr
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '上上周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: prepre
                },
                {
                    name: '上周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: pre
                },
                {
                    name: '本周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: now
                }
            ]
        };

        // 为echarts对象加载数据
        myChart.setOption(option);


    }, function (error) {

    })


}
var bumenDetailCycle=function(element,num,tags,startDate,endDate,depts){
    var id=element;
    var num =num ;
    var tags=tags;
    var startDate=startDate;
    var endDate=endDate;
    tags=encodeURI(tags)
    TopicApi.bumensearchCycleData(tags, num, startDate, endDate,depts, function (result) {
        var obj = result.obj;
        console.log(obj);

        var tagarr = [];
        var now = [];
        var pre = [];
        var prepre = [];
        for (var i in obj) {
            var word = obj[i];
            tagarr.push(word.tag);
            prepre.push(word.buckets[0].doc_count);
            pre.push(word.buckets[1].doc_count);
            now.push(word.buckets[2].doc_count);
        }
        ;

        var myChart = echarts.init(id[0], chart_theme);
        option = {
            title: {
                text: '最近三个周期对比'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                x: 40,
                x2: 10,
                y2: 30

            },
            legend: {
                data: ['上上周期', '上周期', '本周期']
            },
            xAxis: [
                {
                    type: 'category',
                    data: tagarr
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '上上周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: prepre
                },
                {
                    name: '上周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: pre
                },
                {
                    name: '本周期',
                    type: 'bar',
                    itemStyle: {normal: {label: {show: true, position: 'top'}}},
                    data: now
                }
            ]
        };

        // 为echarts对象加载数据
        myChart.setOption(option);


    }, function (error) {

    })


}

var bumenBDCycle=function(element,keywords,startDate,endDate){
    var id=element;
    var startDate=startDate;
    var endDate=endDate;
    TopicApi.topic(keywords,startDate, endDate,10,function (result) {
        var obj=result.obj;
        var tagarr=[];
        var now=[];
        for(var i in obj){
            var word = obj[i];
            tagarr.push(word.key);
            now.push(word.upNum);
        };
        var myChart = echarts.init(id[0], chart_theme);
        option = {
            title : {
                text: '本周期与上周期对比增量',
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params){
                    return params[0].name + '<br/>'
                        + params[2].seriesName + ' : ' + params[2].value + '<br/>'
                        + params[0].seriesName + ' : ' + (params[1].value + params[2].value) + '<br/>'
                        + params[1].seriesName + ' : ' + params[1].value;
                }
            },
            legend: {
                selectedMode:false,
                data:['增量']
            },
            toolbox: {
                show : true,
            },
            grid:{
                x:40,
                x2:40,
                y2:70

            },
            xAxis : [
                {
                    data :tagarr,
                    axisLabel:{
                        rotate: -30,
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    boundaryGap: [0, 0.1]
                }
            ],
            series : [
                {
                    name:'增量',
                    type:'bar',
                    stack: 'sum',
                    itemStyle: {
                        normal: {
                            label : {
                                show: true,
                                position: 'inside'
                            }
                        }
                    },
                    data:now
                },
            ]

        };
        // 为echarts对象加载数据
        myChart.setOption(option);



    }, function (error) {

    })


}

//加载echarts折线图
 var zhexianData=function(element,tag){
     var id=element;
     var tag=tag;
     tag=encodeURI(tag)
     var key=id.parents(".zhuanti").find('.guanjianci').text();
     TopicApi.searchkeyData(tag, function (result){
         var obj=result.obj;
        tag= decodeURI(tag)
         var tagarr=[];
         var now=[];
         for(var i in obj){
             var word = obj[i];
            var year= word.key_as_string.substr(0,4);
             var month= word.key_as_string.substr(4,2);
            var item=year+"/"+month
             tagarr.push(item);
             now.push(word.doc_count);
         };

         var myChart = echarts.init(id[0], chart_theme);
         option = {
             title : {
                 text:tag
             },
             tooltip : {
                 trigger: 'axis'
             },
             grid:{
                 x:40,
                 x2:30,
                 y2:30
             },
             xAxis : [
                 {
                     type : 'category',
                     boundaryGap : false,
                     itemStyle : { normal: {label : {show: true}}},
                     axisLabel:{
                         interval:11
                     },
                     data : tagarr,
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],
             series : [
                 {
                     name:'数量',
                     type:'line',
                     itemStyle : { normal: {label : {show: true}}},
                     data:now
                 }
             ]
         };

         // 为echarts对象加载数据
         myChart.setOption(option);
     })


 };


//=================================
/*var zhexianData=function(element,tag){
    var id=element;
    var tag=tag;
    tag=encodeURI(tag)
    var key=id.parents(".zhuanti").find('.guanjianci').text();
    TopicApi.searchkeyData(tag, function (result){
        var obj=result.obj;
        tag= decodeURI(tag)
        var tagarr=[];
        var now=[];
        for(var i in obj){
            var word = obj[i];
            var year= word.key_as_string.substr(0,4);
            var month= word.key_as_string.substr(4,2);
            var item=year+"/"+month
            tagarr.push(item);
            now.push(word.doc_count);
        };

        var myChart = echarts.init(id[0], chart_theme);
        option = {
            title : {
                text:tag
            },
            tooltip : {
                trigger: 'axis'
            },
            grid:{
                x:40,
                x2:30,
                y2:30
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    itemStyle : { normal: {label : {show: true}}},
                    axisLabel:{
                        interval:11
                    },
                    data : tagarr,
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'数量',
                    type:'line',
                    itemStyle : { normal: {label : {show: true}}},
                    data:now
                }
            ]
        };

        // 为echarts对象加载数据
        myChart.setOption(option);
    })


}*/
 //加载地图
/*


*/
