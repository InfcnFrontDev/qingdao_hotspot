/**
 * Created by yangkk on 2016/9/27.
 */
export default {
    get: (name) => localStorage[name],
    set: (name, value) => localStorage[name] = value
}
