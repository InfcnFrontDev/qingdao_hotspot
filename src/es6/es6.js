import Vue from 'vue'

Vue.config.debug = true;            // 只有开发版本可以使用调试模式。
Vue.config.devtools = false;      // 配置是否允许 vue-devtools 检查代码
Vue.config.silent = false;          // 取消 Vue.js 所有的日志与警告。

import Topic from './common/topic.api'

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
            message: 'hello vuejs!',
            countData:{}
        }
    },
    ready(){

        this.startDate = '2016-11-01';
        this.endDate = '2016-11-02';

        let $this = this;

        Topic.count().then(function (result) {
            $this.countData = result.obj;
        }, function (error) {
            console.log(error)
        })
        Topic.topic('2015-05-01', '2015-05-31',10,false).then(function(result){
            if(result.ok){
                $this.topicData = result.obj;
            }
            console.log($this.topicData.length)
        },function(error){
            console.log(error)
        })

    }
});
