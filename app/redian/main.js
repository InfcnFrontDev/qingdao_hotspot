$this.size=10;
$('#redian1').find('.topn').children().change(function(){
    $this.setSize(this.value, update);
});


var update = function () {

    updateWords('hotWord','redian1', function (words) {

        if($this.word){
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


