$this.size=10;
$('#redian1').find('.topn').children().change(function(){
    $this.setSize(this.value, update1);
});
$('#zuida1').find('.topn').children().change(function(){
    $this.setSize(this.value, update2);
});
$('#yichang1').find('.topn').children().change(function(){
    $this.setSize(this.value, update3);
});

var update = function () {
    update1();
    update2();
    update3();
};

var update1 = function () {
    updateWords('hotWord','redian1', function (words) {
        redianCycle($('#rediantu'),3,encodeURI(words.join(',')),$this.startDate,$this.endDate);
    });
};

var update2 = function () {
    updateWords('abnormalWord','zuida1', function (words) {
        zuidaCycle($('#zuidatu'),2,encodeURI(words.join(',')),$this.startDate,$this.endDate);
    });
};

var update3 = function () {
    updateWords('changeWord','yichang1', function (words) {
        yichangCycle($('#yichangtu'),2,encodeURI(words.join(',')),$this.startDate,$this.endDate);
    });
};


var enterWord = function(word, id) {
    var id = id.substring(0, id.length-1);
    $this.word = word;
    window.location.hash = id;
};

update();




