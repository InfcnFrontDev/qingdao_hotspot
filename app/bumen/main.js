$this.size=10;
$('#bumen1').find('.topn').children().change(function(){
    $this.bumenSetSize(this.value, update4);
});
$('#bumen1').find('.topn').children().val($this.bumenSize);

$('#zuidabumen1').find('.topn').children().change(function(){
    $this.bumenBDSetSize(this.value, update5);
});
$('#zuidabumen1').find('.topn').children().val($this.bumenBDSize);
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
window.update = function () {

    tc = 0;
    update4();
    update5();
};


var update4 = function () {
    updateWords('depart', 'bumen1', $this.bumenSize, function (words) {
        $('.bumenliebiao').html('部门列表');
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

var update5 = function () {
    updateWords('changeDepart', 'zuidabumen1', $this.bumenBDSize, function (words) {
        $('.zuidabiandong').html('最大变动部门');
       bumenBDCycle($('#zuidabumentu'),'changeDepart', $this.startDate, $this.endDate);

        if (words.length > 0) {
           tc++;
           $('#zuidabumen1').show()
        }else{
            $('#zuidabumen1').hide()
        }
        if(tc == 0){
            $('.words-list').html('');
            $('.wenzhang-list').html('');
            $('.nodata').removeClass('hidden');
            $('#ztcbox').addClass('hidden');
        }
    });
};

var enterWord = function (type,word, id) {
   /* console.log(type,word)
    zhexianData($('#bumentu'), word);*/
   /* wenZhangShowTag_Bm(word);*/
    var id = id.substring(0, id.length - 1);
    $this.flag_bumen=false;
    window.location =window.location.pathname+'#bumenDetail'+'?depart='+word;
    $this.bumenWord=word;
};

    update();

