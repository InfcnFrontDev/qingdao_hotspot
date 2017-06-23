$('#redian1').find('.topn').children().change(function () {
    $this.redianSetSize(this.value, update1);
});

$('#bumen1').find('.topn').children().change(function () {
    $this.bumenSetSize(this.value, update4);
});

var tc = 0;

var update = function () {
    tc = 0;
    //首页热点，图
    update1();
    //首页最大变动，图
    update2();
    //首页异常，图
    update3();
    //首页异常，图
    update4();
//地图
    areaData($('#area'),10,$this.startDate, $this.endDate);
};

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
    updateWords('changeWord', 'zuida1', $this.zuidaSize, function (words) {
        zuidaCycle($('#zuidatu'), 2, words.join(','), $this.startDate, $this.endDate);
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

var update3 = function () {
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
};

var update4 = function () {
    updateWords('depart', 'bumen1', $this.bumenSize, function (words) {

        bumenCycle($('#bumen-tu'), 3, words.join(','), $this.startDate, $this.endDate);
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

var enterWord = function (word, id) {
    var id = id.substring(0, id.length - 1);
    $this.word = word;
    window.location.hash = id;
};

update();




