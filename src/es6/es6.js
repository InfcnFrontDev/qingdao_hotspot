import Vue from 'vue'

Vue.config.debug = true;            // 只有开发版本可以使用调试模式。
Vue.config.devtools = false;      // 配置是否允许 vue-devtools 检查代码
Vue.config.silent = false;          // 取消 Vue.js 所有的日志与警告。


new Vue({
    el: 'body',
    data(){
        return {
            countData: {total: 0, newTotal: 0},
            topicData: [],
            wordList: [],
            contentList: [],
            startDate: '2016-11-01',
            endDate: ''
        }
    },
    ready(){

        this.startDate = '2016-11-01';
        this.endDate = '2016-11-02';

    }
});
