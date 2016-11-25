
$('#redian1').find('.topn').children().change(function(){
    $this.redianSetSize(this.value, update);
});
$('#redian1').find('.topn').children().val($this.redianSize);


var update = function () {

    updateWords('hotWord','redian1',$this.redianSize, function (words) {
        if($this.word){

            // 滚动条定位
            $('.theme-words').scrollTop($('.words-list .selected').position().top);

            zhexianData($('#rediantu'), $this.word);
            wenZhangShowTag($this.word);
        }else{
            redianCycle($('#rediantu'),3,words.join(','),$this.startDate,$this.endDate);
            wenZhangShow();
        }
    });

};


var enterWord = function(word) {
    zhexianData($('#rediantu'), word);
    wenZhangShowTag(word);
};

update();


