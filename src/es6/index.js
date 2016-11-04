import Vue from 'vue'

Vue.config.debug = Config.debug;            // 只有开发版本可以使用调试模式。
Vue.config.devtools = Config.devtools;      // 配置是否允许 vue-devtools 检查代码
Vue.config.silent = Config.silent;          // 取消 Vue.js 所有的日志与警告。


import TopicApi from './common/TopicApi'
import Tools from './common/Tools'


Vue.filter('datetime', function (value) {
    return Tools.dateFormat(new Date(value), Tools.yyyyMMddHHmm_);
})

new Vue({
    el: 'body',
    data(){
        return {
            countData: {total: 0, newTotal: 0},// 接口count数据
            topicData: [],  // 接口topic数据
            //

            lastDay: '30',
            startDate: '',
            endDate: '',
            size: 10,
            sortByFreq: true,

            pageSize: Config.pageSize,
            word: undefined,
            wordDocs: [], // 全部内容列表
            page: 1,
            pageDocs: [], // 分页后内容列表

            loading: false,
            nodata: false,
            sortByFreqText: '热点主题词'
        }
    },
    watch: {
        'sortByFreq': function (val, oldVal) {
            this.sortByFreqText = val ? '热点主题词' : '异常变动主题词';
            this.update();
        },
        'size': function (val, oldVal) {
            this.update();
        }
    },
    ready(){
        let $this = this;

        // 监听下拉列表select事件
        layui.form().on('select(lastDay)', function (data) {
            $this.updateDate(data.value);
        });
        layui.form().on('select(size)', function (data) {
            $this.size = data.value;
        });

        // 初始化日期控件
        $("#startDate").datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function (dateText, inst) {
                $('#lastDay').val('-');
                layui.form().render('select'); //刷新select选择框渲染

                $this.startDate = dateText;
            }
        });
        // 初始化日期控件
        $("#endDate").datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function (dateText, inst) {
                $('#lastDay').val('-');
                layui.form().render('select'); //刷新select选择框渲染

                $this.endDate = dateText;
            }
        });


        // 加载count数据
        TopicApi.count().then(function (result) {
            $this.countData = result.obj;
        }, function (error) {
            console.log(error)
        })

        // 初始时间段设置
        this.updateDate(this.lastDay);
    },
    methods: {
        // 选择最n天内，更新时间段
        updateDate(val){
            if (val != '-') {
                // 初始化时间区间，默认30天内
                let date1, date2 = new Date();
                date1 = Tools.dateAdd(date2, -(val * 24 * 60 * 60));
                this.startDate = Tools.dateFormat(date1, Tools.yyyyMMdd_);
                this.endDate = Tools.dateFormat(date2, Tools.yyyyMMdd_);

                $('#startDate').val(this.startDate);
                $('#endDate').val(this.endDate);

                this.update();
            }
        },
        // 更新数据
        update(){
            this.isw = true;
            this.isc = false;
            let $this = this;

            this.loading = true;
            this.nodata = false;
            TopicApi.topic(this.startDate, this.endDate, this.size, this.sortByFreq).then(function (result) {
                $this.loading = false;
                $('.option-content').removeClass('hidden');

                if (result.obj) {
                    $this.topicData = result.obj;
                    $this.searchWord();
                } else {
                    $this.nodata = true;
                }
                //layer.msg("success", {icon: 6});
            }, function (error) {
                $this.loading = false;

                console.log(error);
                layer.msg("error", {icon: 5});
            })
        },
        // 选择主题词
        searchWord(word){
            this.word = word;
            this.wordDocs = [];
            if (this.topicData && this.topicData.length > 0) {
                let data = this.topicData.filter(d => d.name == word);
                if (data.length > 0) {
                    this.wordDocs = data[0].docs;
                } else {
                    this.wordDocs = this.topicData[0].docs;
                    this.word = this.topicData[0].name;
                }
                // 去空
                this.wordDocs = this.wordDocs.filter(d => d._id);
            }

            let $this = this;
            layui.laypage({
                cont: 'page',
                pages: Math.ceil(this.wordDocs.length / this.pageSize), //得到总页数
                skin: '#0077dd',
                jump: function (obj) {
                    $this.listPage(obj.curr);
                }
            });

            this.listPage(1);
        },
        // 选择分页
        listPage(pageIndex){
            let list = this.wordDocs;
            let docs = [];
            let pagenum = pageIndex - 1;
            for (let i = 0; i < this.pageSize; i++) {
                let dai = parseInt(pagenum * this.pageSize) + parseInt(i)
                if (dai < list.length) {
                    docs.push(list[dai]);
                }
            }
            this.pageDocs = docs;
        },
        // 加载摘要
        showSummary(id){
            if ($('#' + id).find('.w-jianjie').length == 0) {
                TopicApi.findById(id).then(function (result) {
                    if (result.ok) {
                        let div = '<div class="w-jianjie"><img src="images/lan-jiantou.png" />' +
                            //'<h1>简介:</h1>' +
                            '<p>' + result.obj.question.substring(0, 150) + '</p>' +
                            '</div>';
                        $('#' + id).find('.col-title').append(div);
                    }
                }, this.showError)
            }
        },
        openUrl(url){
            window.open(url);
        },
        // 显示错误信息
        showError(error){
            console.log(error)
        }
    }
});
