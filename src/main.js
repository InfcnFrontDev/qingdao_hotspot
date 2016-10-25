import Vue from 'vue'

Vue.config.debug = true;            // 只有开发版本可以使用调试模式。
Vue.config.devtools = false;      // 配置是否允许 vue-devtools 检查代码
Vue.config.silent = false;          // 取消 Vue.js 所有的日志与警告。


import Chart from './components/Chart.vue'
import Chart1 from './components/Chart.vue'

new Vue({
    el: 'body',
    components: {
        Chart, Chart1
    },
    data(){
        return {
            title: 'yangkk'
        }
    }
});
