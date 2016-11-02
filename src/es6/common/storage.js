/**
 * Created by yangkk on 2016/9/27.
 */
export default {
    // 图表主题
    getChartTheme: () => localStorage.chartTheme || '',
    setChartTheme: (value) => localStorage.chartTheme = value,

    // 服务器
    getServer: () => localStorage.server ? JSON.parse(localStorage.server) : Config.servers[0],
    setServer: (value) => localStorage.server = JSON.stringify(value),

    // 其他
    get: (name) => localStorage[name],
    set: (name, value) => localStorage[name] = value,
}
