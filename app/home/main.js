$('#redian1').find('.topn').children().change(function () {
    $this.redianSetSize(this.value, update1);
});
$('#zuida1').find('.topn').children().change(function () {
    $this.zuidaSetSize(this.value, update2);
});
$('#yichang1').find('.topn').children().change(function () {
    $this.yichangSetSize(this.value, update3);
});
$('#redian1').find('.topn').children().val($this.redianSize);
$('#zuida1').find('.topn').children().val($this.zuidaSize);
$('#yichang1').find('.topn').children().val($this.yichangSize);

var tc = 0;

var update = function () {
    tc = 0;
    update1();
    update2();
    update3();
};

var update1 = function () {
    updateWords('hotWord', 'redian1', $this.redianSize, function (words) {
        redianCycle($('#rediantu'), 3, words.join(','), $this.startDate, $this.endDate);
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


var enterWord = function (word, id) {
    var id = id.substring(0, id.length - 1);
    $this.word = word;
    window.location.hash = id;
};

update();




