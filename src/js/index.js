// ready
$(function () {

    // 加载count数据
    TopicApi.count(function (result) {


        $('.nav-text:first').text(result.obj.total+"条");
        $('.nav-text:last').text(result.obj.newTotal+"条");

    }, function (error) {
        console.log(error);
    });

    $this.setSortByFreq(true);
    $('.btn-qiehuan:first').addClass('selected');

    $('.btn-qiehuan').on('click',function(){
        $(this).addClass('selected');
        $(this).parent().siblings().children().removeClass('selected');
        if($(this).text()=="热点主题"){
            $this.setSortByFreq(true);
        }
        if($(this).text()=="异常变动主题"){
            $this.setSortByFreq(false);
        }
    });



    /*$("#startDate").datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText, inst) {
            $('#lastDay').val('-');
            layui.form().render('select'); //刷新select选择框渲染

            startDate = dateText;
        }
    });
    layui.form().on('select(lastDay)', function (data) {
        updateDate(data.value);
    });
    layui.form().on('select(size)', function (data) {
        size = data.value;
    });*/

    // 初始化日期控件
    /*$("#startDate").datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText, inst) {
            $('#lastDay').val('-');
            layui.form().render('select'); //刷新select选择框渲染

            startDate = dateText;
        }
    });*/
    // 初始化日期控件
    /*$("#endDate").datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect: function (dateText, inst) {
            $('#lastDay').val('-');
            layui.form().render('select'); //刷新select选择框渲染

            endDate = dateText;
        }
    });*/



    // 初始时间段设置
    updateDate(30);

    /*$( ".datepicker" ).datepicker({
        dateFormat: 'yy-mm-dd'
    });*/


});
var $this={
    countData: {total: 0, newTotal: 0},// 接口count数据
    topicData: [],  // 接口topic数据
    //

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

    loading: false,
    nodata: false,
    error: true,
    errorMessage: '',
    sortByFreqText: '热点主题词',
    setSortByFreq: function (val) {
        $this.sortByFreq = val;

        if(val){
            $(".text-left").text("热点主题词");
        }else{
            $(".text-left").text("异常变动主题词");
        }
        update()
    },
    setLastDay: function (val) {
        this.lastDay = val;
        updateDate(val);
    }
};

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
        update();
    }
};
// 更新数据
var update=function(){


    TopicApi.topic($this.startDate, $this.endDate, $this.size, $this.sortByFreq, function (result) {

        $('.option-content').removeClass('hidden');

        if (result.obj) {
            $this.topicData = result.obj;
            var li='';
            for(var i=0; i<$this.topicData.length; i++){
                li +="<li onclick=\"searchWord("+$this.topicData[i].name+")\">"+
                "<div class=\"col-xs-2\"><span class=\"s-left\" >"+i+"</span></div>"+
                "<div class=\"col-xs-8\"><span class=\"s-cente\">"+$this.topicData[i].name+"</span></div>"+
                "<div class=\"col-xs-2\"><span class=\"s-right\">"+$this.topicData[i].size+"</span></div>"+
                "</li>"
            }
            $('.words-list').html(li);

            searchWord($this.topicData[0].name);
        } else {

        }
    }, function (error) {


        var obj = JSON.parse(error.responseText)
        error = true;
        $this.errorMessage = obj.message;
    });
};
// 选择主题词
var searchWord=function(words){
    $this.word = words;
    $this.wordDocs = [];

    if ($this.topicData && $this.topicData.length > 0) {
        var arr=[];
        for(var i=0; i<$this.topicData.length; i++){
            if($this.topicData[i].name == words){
                arr.push($this.topicData[i])
            }
        }

        if (arr.length > 0) {
            $this.wordDocs = arr[0].docs;
            var li='';
            for(var i=0; i<$this.wordDocs.length; i++){
                li+="<div id=\"{{item._id}}\" class=\"w-item\">"+
                "<div class=\"col-xs-7 col-title\">"+
                "<div class=\"w-title\">"+
                    $this.wordDocs[i].title+
                "</div>"+
                "<span title=\"有{{item.sames&&item.sames.length}}个同样内容。\" ></span>"+
                "</div>"+
                "<div class=\"col-xs-2\">"+
                "<div class=\"w-unit\" title=\"{{item.units}}\">"+
                    $this.wordDocs[i].units
                    +"</div>"+
                "</div>"+
                "<div class=\"col-xs-3\">"+
                "<div class=\"w-datetime\">"+Tools.dateFormat(new Date($this.wordDocs[i].question_time), Tools.yyyyMMddHHmm_)+"</div>"+
                "</div>"+
                "<div class=\"clear\"></div>"+
                "</div>"
            }
            $('.wenzhang-list').html(li);

        } else {
            $this.wordDocs = $this.topicData[0].docs;
            $this.word = $this.topicData[0].name;
        }
        // 去空
        //this.wordDocs = this.wordDocs.filter(d => d._id);
    }


    layui.laypage({
        cont: 'page',
        pages: Math.ceil($this.wordDocs.length / $this.pageSize), //得到总页数
        skin: '#0077dd',
        jump: function (obj) {
            listPage(obj.curr);
        }
    });

    listPage(1);
};
// 选择分页
var listPage=function(pageIndex){
    var list = $this.wordDocs;
    var docs = [];
    var pagenum = pageIndex - 1;
    for (var i = 0; i < this.pageSize; i++) {
        var dai = parseInt(pagenum * this.pageSize) + parseInt(i)
        if (dai < list.length) {
            docs.push(list[dai]);
        }
    }
    this.pageDocs = docs;
};
// 加载摘要
var showSummary=function(id){
    if ($('#' + id).find('.w-jianjie').length == 0) {
        TopicApi.findById(id, function (result) {
            if (result.ok) {

                var question = result.obj.question;
                if (question.length > 120) {
                    question = question.substring(0, 120) + '...';
                }

                var div = '<div class="w-jianjie"><img src="images/lan-jiantou.png" />' +
                      '<p>' + question + '</p>' +
                      '</div>';
                $('#' + id).find('.col-title').append(div);
            }
        }, function (error) {
            console.log(error);
        })
    }
};


