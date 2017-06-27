$('#bumenD1').find('.topn').children().change(function () {
    $this.redianSetSize(this.value, update);
});
$('#bumenD1').find('.topn').children().val($this.redianSize);


var update = function () {

    bumenupdateWords('hotWord', 'bumenD1', $this.redianSize,$this.bumenWord ,function (words) {
        //bumenCycle($('#rediantu'), 3, words.join(','), $this.startDate, $this.endDate);

        $('.text-left').html($this.bumenWord+'-热点主题词');
        if (words.length > 0) {
//折
                bumenDetailCycle($('#rediantu'),$this.bumenWord);
                wenZhangShowTag(words[0]);

        }
        else {
            $('.words-list').html('');
            $('.wenzhang-list').html('');
            $('.nodata').removeClass('hidden');
            $('#ztcbox').addClass('hidden');
        }
    });

};


var enterWord = function (word) {
    //部门-热点导力图
    relevantWordTu_BM(word,$this.bumenWord,$this.startDate, $this.endDate,10);
    //部门-词云
    keyWordTu_BM(word,$this.bumenWord,10)

    zhexianData($('#rediantu'), word);
    console.log(word+"00000000000000000000")
    wenZhangShowTag(word);
};

update();
