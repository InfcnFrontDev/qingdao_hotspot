$this.size=10;
$('#yichang1').find('.topn').children().change(function(){
    $this.setSize(this.value,'changeWord','yichang1');
});
update('changeWord','yichang1');
wenZhangShow();

/*
changeWord*/
