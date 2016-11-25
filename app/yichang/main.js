$this.size=10;
$('#yichang1').find('.topn').children().change(function(){
    $this.setSize(this.value, update);
});


var update = function () {

    updateWords('changeWord', 'yichang1', function (words) {

        if($this.word){
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