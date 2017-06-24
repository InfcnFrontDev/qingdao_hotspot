$this.size=10;
$('#bumen1').find('.topn').children().change(function(){
    $this.bumenSetSize(this.value, update4);
});
$('#bumen1').find('.topn').children().val($this.bumenSize);

$('#bd-bumen1').find('.topn').children().change(function(){
    $this.bumenBDSetSize(this.value, update5);
});
$('#bd-bumen1').find('.topn').children().val($this.bumenBDSize);
/*
$('#zuida1').find('.topn').children().change(function () {
    $this.zuidaSetSize(this.value, update2);
});
$('#yichang1').find('.topn').children().change(function () {
    $this.yichangSetSize(this.value, update3);
});
$('#zuida1').find('.topn').children().val($this.zuidaSize);
$('#yichang1').find('.topn').children().val($this.yichangSize);*/


var tc = 0;

var update = function () {
    tc = 0;
    update4();
    update5();
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

var update5 = function () {
    updateWords('changeDepart', 'bd-bumen1', $this.bumenBDSize, function (words) {
        bumenBDCycle($('#bd-bumen-tu'),'changeDepart', $this.startDate, $this.endDate);
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