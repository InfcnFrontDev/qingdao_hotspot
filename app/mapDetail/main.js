$this.size=10;
$('#bumenD1').find('.topn').children().change(function () {
    $this.redianSetSize(this.value, update);
});
$('#bumenD1').find('.topn').children().val($this.redianSize);

//地图
window.update=function(){
    areaData($this.startDate, $this.endDate);
    zhexianData_map($('#rediantu'), $this.mapName);
    keyWordTu_MAP($this.mapName,10)
    wenZhangShowTag_SQ($this.mapName);
    $('.map_quname').html($this.mapName);
}



//词云
function keyWordTu_MAP(area,size) {
    TopicApi.keyWord_map(encodeURI(area),size,function (result){
        var html="<div class=\"row\" style='height:250px'>"
            +"<div  class=\"col-xs-12\" id=\"keywordClound\"  style=\"height:250px;\" >"
            +"</div>"
            +"</div> "

        $('#box-tu').html(html);
        keyWord_cloud(result.obj,$('#keywordClound'))
    }, function (error) {

    })
};

function areaData(start,end){
    TopicApi.area(start,end ,function (result) {
        if (result.obj.length > 0) {
            var mapData=result.obj

            var li = '';
            for (var i = 0; i < mapData.length; i++) {
               var selected = $this.mapName== mapData[i].key ? ' selected' : '';

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
function  zhexianData_map(element,area) {
    var id = element;
    var key = id.parents(".zhuanti").find('.guanjianci').text();
    TopicApi.mapChangeData(encodeURI(area), function (result) {
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

    keyWordTu_MAP(word,10)
    zhexianData_map($('#rediantu'), word);
    wenZhangShowTag_SQ(word);
};

update();

