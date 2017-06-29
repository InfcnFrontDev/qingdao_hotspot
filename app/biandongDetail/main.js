$this.size=10;

$('#biandongD1').find('.topn').children().change(function () {
    $this.SetSize(this.value, update);
});
$('#biandongD1').find('.topn').children().val($this.zuidaSize);

if($this.biandongzhuti==''){
    $this.biandongzhuti="最大变动主题词";
}
window.update = function () {
    if($this.biandongzhuti=="最大变动主题词"){
        updateWords('changeWord', 'biandongD1', $this.zuidaSize,function (words) {
            $('.text-left').html("最大变动主题词")

            if (words.length > 0) {
                if ($this.word) {

                    // 滚动条定位
                    $('.theme-words').scrollTop($('.words-list .selected').position().top);
                    relevantWordTu_RD($this.word,$this.startDate, $this.endDate,10);
                    //热点主题-词云
                    keyWordTu_RD($this.word,10)
                    zhexianData($('#rediantu'), $this.word);
                    wenZhangShowTag($this.word);
                } else {
                    relevantWordTu_RD(words[0],$this.startDate, $this.endDate,10);
                    //热点主题-词云
                    keyWordTu_RD(words[0],10)
                    redianCycle($('#rediantu'), 3, words.join(','), $this.startDate, $this.endDate);
                    wenZhangShowTag(words[0]);
                    $('.words-list').find('li:first').addClass('selected')
                }
            }
            else {
                $('.words-list').html('');
                $('.wenzhang-list').html('');
                $('.nodata').removeClass('hidden');
                $('#ztcbox').addClass('hidden');
            }
        });
    }
    if($this.biandongzhuti=="异常变动主题词"){
        updateWords('abnormalWord', 'biandongD1', $this.yichangSize,function (words) {
            $('.text-left').html("异常变动主题词")
            if (words.length > 0) {
                if ($this.word) {

                    // 滚动条定位
                    $('.theme-words').scrollTop($('.words-list .selected').position().top);
                    relevantWordTu_RD($this.word,$this.startDate, $this.endDate,10);
                    //热点主题-词云
                    keyWordTu_RD($this.word,10)
                    zhexianData($('#rediantu'), $this.word);
                    wenZhangShowTag($this.word);
                } else {
                    relevantWordTu_RD($this.word,$this.startDate, $this.endDate,10);
                    //热点主题-词云
                    keyWordTu_RD($this.word,10)
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
    }



};


var enterWord = function (word) {
    //热点主题-热点导力图
    relevantWordTu_RD(word,$this.startDate, $this.endDate,10);
    //热点主题-词云
    keyWordTu_RD(word,10)
    zhexianData($('#rediantu'), word);
    wenZhangShowTag(word);
};

update();

