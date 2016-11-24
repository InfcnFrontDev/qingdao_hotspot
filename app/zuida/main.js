$this.size=10;
$('#zuida1').find('.topn').children().change(function(){
    $this.setSize(this.value,'abnormalWord','zuida1');
});
update('abnormalWord','zuida1');
wenZhangShow();

/*
abnormalWord*/
