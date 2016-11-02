import Vue from 'vue'

Vue.config.debug = Config.debug;            // 只有开发版本可以使用调试模式。
Vue.config.devtools = Config.devtools;      // 配置是否允许 vue-devtools 检查代码
Vue.config.silent = Config.silent;          // 取消 Vue.js 所有的日志与警告。

import Topic from './common/topic.api'

new Vue({
    el: 'body',
    data(){
        return {
            message: 'hello vuejs!',
            countData:{}
        }
    },
    ready(){
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
