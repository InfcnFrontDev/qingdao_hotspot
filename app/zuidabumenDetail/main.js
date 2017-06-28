$('#zuidabumenD1').find('.topn').children().change(function () {
    $this.redianSetSize(this.value, update);
});
$('#zuidabumenD1').find('.topn').children().val($this.redianSize);


window.update  = function () {

    updateWords('changeDepart', 'zuidabumenD1', $this.redianSize, function (words) {
        if (words.length > 0) {
            if ($this.word) {

                // 滚动条定位
                $('.theme-words').scrollTop($('.words-list .selected').position().top);

                zhexianData($('#rediantu'), $this.word);
                wenZhangShowTag($this.word);
            } else {
                redianCycle($('#rediantu'), 3, words.join(','), $this.startDate, $this.endDate);
                wenZhangShowTag(words[0]);
            }
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
    //热点主题-热点导力图
   /* relevantWordTu_RD($('#relevantWord'),word,$this.startDate, $this.endDate,10);
    //热点主题-词云
    keyWordTu_RD($('#keywordClound'),word,10)*/
    zhexianData($('#rediantu'), word);
    wenZhangShowTag(word);
};

update();
