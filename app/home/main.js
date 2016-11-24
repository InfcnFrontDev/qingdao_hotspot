$this.size=10;
$('#redian1').find('.topn').children().change(function(){
    $this.setSize(this.value,'hotWord','redian1');
});
$('#zuida1').find('.topn').children().change(function(){
    $this.setSize(this.value,'abnormalWord','zuida1');

});
$('#yichang1').find('.topn').children().change(function(){
    $this.setSize(this.value,'changeWord','yichang1');

});
update('hotWord','redian1');
update('abnormalWord','zuida1');
update('changeWord','yichang1');
$('#redian1').find('.words-list').children().on('click',function(){


    checkURL('redian');
    /*searchWord($(this).find('.s-cente').text());*/
});
$('#zuida1').find('.words-list').children().on('click',function(){
    checkURL('zuida');
    /*searchWord($(this).find('.s-cente').text());*/
});
$('#yichang1').find('.words-list').children().on('click',function(){
    checkURL('yichang');
    /*searchWord($(this).find('.s-cente').text());*/
});

$('.btn-qiehuan').on('click',function(){
    $(this).addClass('selected');
    $(this).parent().siblings().children().removeClass('selected');
    if($(this).text()=="一周内"){
        updateDate(7);
        update('hotWord','redian1');
        update('abnormalWord','zuida1');
        update('changeWord','yichang1');
    }
    if($(this).text()=="一个月内") {
        updateDate(dateInterval(1));
        update('hotWord','redian1');
        update('abnormalWord','zuida1');
        update('changeWord','yichang1');
    }
    if($(this).text()=="三个月内"){
        updateDate(dateInterval(3));
        update('hotWord','redian1');
        update('abnormalWord','zuida1');
        update('changeWord','yichang1');
    }
    if($(this).text()=="半年内"){
        updateDate(dateInterval(6));
        update('hotWord','redian1');
        update('abnormalWord','zuida1');
        update('changeWord','yichang1');
    }
    if($(this).text()=="一年内"){
        updateDate(dateInterval(12));
        update('hotWord','redian1');
        update('abnormalWord','zuida1');
        update('changeWord','yichang1');
    }
});
$("#startDate").datepicker({
    dateFormat: 'yy-mm-dd',
    onSelect: function (dateText, inst) {
        $('#lastDay').val('-');
        //刷新select选择框渲染
        $this.startDate = dateText;

    }
});
// 初始化日期控件
$("#endDate").datepicker({
    dateFormat: 'yy-mm-dd',
    onSelect: function (dateText, inst) {
        $('#lastDay').val('-');
        //刷新select选择框渲染

        $this.endDate = dateText;
    }
});
$('.layui-btn').on('click',function(){
    update('hotWord','redian1');
    update('abnormalWord','zuida1');
    update('changeWord','yichang1');
    $('.btn-qiehuan').removeClass('selected');
})



