$this.size=10;
$('#redian1').find('.topn').children().change(function () {
    $this.redianSetSize(this.value, update1);
});

$('#bumen1').find('.topn').children().change(function () {
    $this.bumenSetSize(this.value, update4);
});
$('#biandong1').find('.topn').children().change(function () {
    $this.zuidaSetSize(this.value, update2);
});

$('.qu_img').on('click', function () {
    $this.mapName=$(this).find("h1").text()
    window.location.hash = 'mapDetail';
});

var tc = 0;

function areaData(start,end){

    TopicApi.area(start,end ,function (result) {

        var data_map =[
            {doc_count: 0, key: "市北区"},
            {doc_count: 0, key: "李沧区"},
            {doc_count: 0, key: "即墨市"},
            {doc_count: 0, key: "黄岛区"},
            {doc_count: 0, key: "城阳区"},
            {doc_count: 0, key: "胶州市"},
            {doc_count: 0, key: "市南区"},
            {doc_count: 0, key: "崂山区"},
            {doc_count: 0, key: "平度市"},
            {doc_count: 0, key: "莱西市"}
        ];
        $.each(data_map, function(val, item) {
            $.each(result.obj, function(val, item2) {
                if(item.key == item2.key) {
                   $.extend(item, item2)
                }
            })
        });
        var html='';
        for(var i=0;i<data_map.length;i++){
            html+= "<li>"+ data_map[i].key+"<span>"+data_map[i].doc_count+"</span></li>"
        }
        $.each(data_map,function(){
            var self=this;
            $('.map .div').each(function(){
               if($(this).find("h1").text()==self.key){
                   $(this).find("span").html(self.doc_count)
               }
            });
        })


        $('#shiqu_num').html(html)

    }, function (error) {

    })

}
var update1 = function () {
    updateWords('hotWord', 'redian1', $this.redianSize, function (words) {
       /* redianCycle($('#rediantu'), 3, words.join(','), $this.startDate, $this.endDate);*/

        if (words.length > 0) {
            tc++;
        }
        if(tc == 0){
            $('.words-list').html('');
            $('.wenzhang-list').html('');
            $('.nodata').removeClass('hidden');
            $('#ztcbox').addClass('hidden');

        }
    });
};

var update2 = function () {
    updateWords('changeWord', 'biandong1', $this.zuidaSize, function (words) {
        if(words.length!=0){
            zuidaCycle($('#biandongtu'), 2, words.join(','), $this.startDate, $this.endDate);
        }
        if (words.length > 0) {
            tc++;
        }
        if(tc == 0){
            $('.words-list').html('');
            $('.wenzhang-list').html('');
            $('.nodata').removeClass('hidden');
            $('#ztcbox').addClass('hidden');
        }
    });
};

/*var update3 = function () {
    updateWords('abnormalWord', 'yichang1', $this.yichangSize, function (words) {
        yichangCycle($('#yichangtu'), 2, words.join(','), $this.startDate, $this.endDate);
        if (words.length > 0) {
            tc++;
        }
        if(tc == 0){
            $('.words-list').html('');
            $('.wenzhang-list').html('');
            $('.nodata').removeClass('hidden');
            $('#ztcbox').addClass('hidden');
        }
    });
};*/

var update4 = function () {
    updateWords('depart', 'bumen1', $this.bumenSize, function (words) {
        bumenCycle($('#bumentu'), 3, words.join(','), $this.startDate, $this.endDate);
        if (words.length > 0) {
            tc++;
        }
        if(tc == 0){
            $('.words-list').html('');
            $('.wenzhang-list').html('');
            $('.nodata').removeClass('hidden');
            $('#ztcbox').addClass('hidden');
        }
    });
};

var enterWord2 = function (type,word, id) {
    console.log(id)
    var id = id.substring(0, id.length - 1);
    $this.word = word;
    window.location.hash = id;
};
var enterWord = function (word, id) {
    console.log('home')
    var id = id.substring(0, id.length - 1);
    $this.word = word;
    window.location.hash = id;
};
(window.update = function () {
    tc = 0;
    //首页热点，图
    update1();
    //首页最大变动，图
    update2();
    //首页异常，图
    //update3();
    //首页异常，图
    update4();
    //地图
    areaData($this.startDate, $this.endDate);
})();




