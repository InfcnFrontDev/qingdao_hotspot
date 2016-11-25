$this.size=10;
$('#zuida1').find('.topn').children().change(function(){
    $this.zuidaSetSize(this.value, update);
});
$('#zuida1').find('.topn').children().val($this.zuidaSize);
var update = function () {

    updateWords('abnormalWord','zuida1',$this.zuidaSize, function (words) {

        if($this.word){
            zhexianData($('#zuidatu'), $this.word);
            wenZhangShowTag($this.word);
        }else{
            zuidaCycle($('#zuidatu'),2,words.join(','),$this.startDate,$this.endDate);
            wenZhangShow();
        }

    });

};

var enterWord = function(word) {
    zhexianData($('#zuidatu'), word);
    wenZhangShowTag(word);
};


update();
