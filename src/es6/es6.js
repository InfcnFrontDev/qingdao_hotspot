import Vue from 'vue'

Vue.config.debug = Config.debug;            // 只有开发版本可以使用调试模式。
Vue.config.devtools = Config.devtools;      // 配置是否允许 vue-devtools 检查代码
Vue.config.silent = Config.silent;          // 取消 Vue.js 所有的日志与警告。


new Vue({
    el: 'body',
    data(){
        return {
            message: 'hello vuejs!'
        }
    },
    ready(){
      alert('')
    }
});
