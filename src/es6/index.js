import Vue from 'vue'

Vue.config.debug = true;            // 只有开发版本可以使用调试模式。
Vue.config.devtools = false;      // 配置是否允许 vue-devtools 检查代码
Vue.config.silent = false;          // 取消 Vue.js 所有的日志与警告。

import TopicApi from './common/TopicApi'
import Tools from './common/Tools'

new Vue({
    el: 'body',
    data(){
        return {
            countData: {total: 0, newTotal: 0},
            topicData: [],

            lastDay: 30,

            startDate: '2016-11-01',
            endDate: '2016-11-01',
            size: 10,
            sortByFreq: true,

            words: undefined,
            page: 1

        }
    },
    watch: {
        'sortByFreq': function (val, oldVal) {
            this.update();
        }
    },
    computed: {
        // 仅读取，值只须为函数
        docs: function () {
            if (this.topicData || this.topicData.length > 0) {
                if (this.words) {
                    let data = this.topicData.filter(d => d.name == this.words);
                    if (data.length > 0)
                        return data[0].docs;
                }
                return this.topicData[0].docs;
            }
            return []
        }
    },
    ready(){
        let $this = this;

        // 初始化时间区间，默认30天内
        let date1, date2 = new Date();
        date1 = Tools.dateAdd(date2, -(30 * 24 * 60 * 60));
        this.startDate = Tools.dateFormat(date1, Tools.yyyyMMdd_);
        this.endDate = Tools.dateFormat(date2, Tools.yyyyMMdd_);

        // 初始化日期控件
        $(".datepicker").datepicker({
            dateFormat: 'yy-mm-dd'
        });


        // 加载count数据
        TopicApi.count().then(function (result) {
            $this.countData = result.obj;
        }, function (error) {
            console.log(error)
        })

        // 刷新数据
        this.update();

        // 初始化分页组件
        layui.laypage({
            cont: 'page'
            , pages: 100
            , skin: '#0077dd'
        })
    },
    methods: {
        update(){
            let $this = this;
            TopicApi.topic(this.startDate, this.endDate, this.size, this.sortByFreq).then(function (result) {
                if (result.ok) {
                    $this.topicData = result.obj;
                }
            }, function (error) {
                console.log(error)
            })
        },
        listPage(list, pageSize, pageIndex){
            var arr = [];
            var pagenum = pageIndex - 1;
            for (var i = 0; i < pageSize; i++) {
                var dai = parseInt(pagenum * pageSize) + parseInt(i)
                arr.push(list[dai])
            }
            console.log(arr);
            return arr;
        }
    }
});
