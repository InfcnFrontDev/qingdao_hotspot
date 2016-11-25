$this.size=10;
$('#yichang1').find('.topn').children().change(function(){
    $this.yichangSetSize(this.value, update);
});
$('#yichang1').find('.topn').children().val($this.yichangSize);

var update = function () {

    updateWords('abnormalWord', 'yichang1',$this.yichangSize, function (words) {

        if($this.word){

            // 滚动条定位
            $('.theme-words').scrollTop($('.words-list .selected').position().top);

            zhexianData($('#yichangtu'), $this.word);
            wenZhangShowTag($this.word);
        }else{
            yichangCycle($('#yichangtu'), 2, words.join(','), $this.startDate, $this.endDate);
            wenZhangShow();
        }

    });
};

var enterWord = function(word) {
    zhexianData($('#yichangtu'), word);
    wenZhangShowTag(word);
};

update();