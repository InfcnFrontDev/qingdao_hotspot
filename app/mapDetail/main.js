$('#bumenD1').find('.topn').children().change(function () {
    $this.redianSetSize(this.value, update);
});
$('#bumenD1').find('.topn').children().val($this.redianSize);

//地图
console.log($this.mapName)
areaData($this.startDate, $this.endDate);
zhexianData_map($('#rediantu'), $this.mapName);
keyWordTu_MAP($this.mapName,10)
$('.map_quname').html($this.mapName);


//词云
function keyWordTu_MAP(area,size) {
    TopicApi.keyWord_map(area,size,function (result){
        var html="<div class=\"row\" style='height:250px'>"
            +"<div  class=\"col-xs-12\" id=\"keywordClound\"  style=\"height:300px;\" >"
            +"</div>"
            +"</div> "

        $('#box-tu').html(html);
        console.log(result.obj)
        keyWord_cloud(result.obj,$('#keywordClound'))
    }, function (error) {

    })
};

/*
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
*/



function areaData(start,end){
    TopicApi.area(start,end ,function (result) {
        if (result.obj.length > 0) {
            var mapData=result.obj

            var li = '';
            for (var i = 0; i < mapData.length; i++) {
               var selected = $this.mapName== mapData[i].key ? ' selected' : '';
                /* var num=keywords=="changeDepart"?$this.topicData[i].upNum:$this.topicData[i].doc_count*/

                li +=
                    "<li class=\"cc"+ selected +"\">"+
                    "<div class=\"col-xs-2 height-word\"><span class=\"s-left\" >" + parseInt(i + 1) + "</span></div>" +
                    "<div class=\"col-xs-8 height-word\"><span class=\"s-cente guanjianci\">" + mapData[i].key + "</span></div>" +
                    "<div class=\"col-xs-2 height-word\"><span class=\"s-right\">" +mapData[i].doc_count + "</span></div>" +
                    "</li>"
            }
            $('.words-list').html(li);
            $('.words-list').children().on('click', function () {
                $this.biandongzhuti=$(this).parent().parent().parent().find('.text-left').text();

                var guanjianci = $(this).find('.guanjianci').text();
                $(this).addClass('selected');
                $(this).siblings().removeClass('selected');

                enter(guanjianci);

            });
            for (var i = 0; i < 3; i++) {
                $('.words-list').children().eq(i).find('.s-left').addClass('s-hot');
            }
        }


    }, function (error) {

    })

}
/*var update = function () {

    bumenupdateWords('hotWord', 'bumenD1', $this.redianSize,$this.bumenWord ,function (words) {
        //bumenCycle($('#rediantu'), 3, words.join(','), $this.startDate, $this.endDate);

        $('.text-left').html($this.mapWord);
        if (words.length > 0) {
//折
            bumenDetailCycle($('#rediantu'),$this.bumenWord);


        }
        else {
            $('.words-list').html('');
            $('.nodata').removeClass('hidden');
            $('#ztcbox').addClass('hidden');
        }
    });

};*/
function  zhexianData_map(element,area) {
    var id = element;
    var key = id.parents(".zhuanti").find('.guanjianci').text();
    TopicApi.mapChangeData(area, function (result) {
        var obj = result.obj;
        var tagarr = [];
        var now = [];
        for (var i in obj) {
            var word = obj[i];
            var year = word.key_as_string.substr(0, 4);
            var month = word.key_as_string.substr(4, 2);
            var item = year + "/" + month
            tagarr.push(item);
            now.push(word.doc_count);
        }
        ;

        var myChart = echarts.init(id[0], chart_theme);
        option = {
            title: {
                text: area
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                x: 40,
                x2: 30,
                y2: 30
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    itemStyle: {normal: {label: {show: true}}},
                    axisLabel: {
                        interval: 11
                    },
                    data: tagarr,
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '数量',
                    type: 'line',
                    itemStyle: {normal: {label: {show: true}}},
                    data: now
                }
            ]
        };

        // 为echarts对象加载数据
        myChart.setOption(option);
    })


}

var enter = function (word) {
    keyWordTu_MAP($this.mapName,10)
    zhexianData_map($('#rediantu'), word);
};

update();

