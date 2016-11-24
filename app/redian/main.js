$this.size=10;
$('#redian1').find('.topn').children().change(function(){
    $this.setSize(this.value,'hotWord','redian1');
});

update('hotWord','redian1');
/*$('#redian1').find('select').val(reSelectval)*/
/*$this.setSize(reSelectval,'hotWord','redian1');*/
wenZhangShow();


