
$('#redian1').find('.topn').children().change(function(){
    $this.redianSetSize(this.value, update1);
});
$('#zuida1').find('.topn').children().change(function(){
    $this.zuidaSetSize(this.value, update2);
});
$('#yichang1').find('.topn').children().change(function(){
    $this.yichangSetSize(this.value, update3);
});
$('#redian1').find('.topn').children().val($this.redianSize);
$('#zuida1').find('.topn').children().val($this.zuidaSize);
$('#yichang1').find('.topn').children().val($this.yichangSize);

var update = function () {
    update1();
    update2();
    update3();
};

var update1 = function () {
    updateWords('hotWord','redian1',$this.redianSize, function (words) {
        redianCycle($('#rediantu'),3,words.join(','),$this.startDate,$this.endDate);
    });
};

var update2 = function () {
    updateWords('changeWord','zuida1',$this.zuidaSize, function (words) {
        zuidaCycle($('#zuidatu'),2,words.join(','),$this.startDate,$this.endDate);
    });
};

var update3 = function () {
    updateWords('abnormalWord','yichang1',$this.yichangSize, function (words) {
        yichangCycle($('#yichangtu'),2,words.join(','),$this.startDate,$this.endDate);
    });
};


var enterWord = function(word, id) {
    var id = id.substring(0, id.length-1);
    $this.word = word;
    window.location.hash = id;
};

update();




