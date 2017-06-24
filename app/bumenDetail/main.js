$('#bumenD1').find('.topn').children().change(function () {
    $this.redianSetSize(this.value, update);
});
$('#bumenD1').find('.topn').children().val($this.redianSize);


var update = function () {

    bumenupdateWords('hotWord', 'bumenD1', $this.redianSize,$this.bumenWord ,function (words) {
        console.log(words);

        //bumenCycle($('#rediantu'), 3, words.join(','), $this.startDate, $this.endDate);


        $('.text-left').html($this.bumenWord+'-热点主题词');
        if (words.length > 0) {
            console.log(this.word);

                bumenDetailCycle($('#rediantu'), 3, words.join(','), $this.startDate, $this.endDate,$this.bumenWord);
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
    zhexianData($('#rediantu'), word);
    wenZhangShowTag(word);
};

update();
