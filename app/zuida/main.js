$this.size=10;
$('#zuida1').find('.topn').children().change(function(){
    $this.setSize(this.value, update);
});

var update = function () {

    updateWords('abnormalWord','zuida1', function (words) {

        if($this.word){
            zhexianData($('#zuidatu'), $this.word);
            wenZhangShowTag($this.word);
        }else{
            zuidaCycle($('#zuidatu'),2,encodeURI(words.join(',')),$this.startDate,$this.endDate);
            wenZhangShow();
        }

    });

};

var enterWord = function(word) {
    zhexianData($('#zuidatu'), word);
    wenZhangShowTag(word);
};


update();
