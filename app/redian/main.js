$this.size=10;
$('#redian1').find('.topn').children().change(function(){
    $this.setSize(this.value,'hotWord','redian1');
});
update('hotWord','redian1');
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
    $('.btn-qiehuan').removeClass('selected');
})
$('.btn-qiehuan').on('click',function(){
    $(this).addClass('selected');
    $(this).parent().siblings().children().removeClass('selected');
    if($(this).text()=="一周内"){
        updateDate(7);
        update('hotWord','redian1');
    }
    if($(this).text()=="一个月内") {
        updateDate(dateInterval(1));
        update('hotWord','redian1');
    }
    if($(this).text()=="三个月内"){
        updateDate(dateInterval(3));
        update('hotWord','redian1');
    }
    if($(this).text()=="半年内"){
        updateDate(dateInterval(6));
        update('hotWord','redian1');
    }
    if($(this).text()=="一年内"){
        updateDate(dateInterval(12));
        update('hotWord','redian1');
    }
});


