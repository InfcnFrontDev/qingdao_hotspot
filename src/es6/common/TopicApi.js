let $ajax = function (url, success, error) {
    $.ajax({
        url: url,
        cache: false,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            success && success(data, textStatus, jqXHR);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            error && error(XMLHttpRequest, textStatus, errorThrown);
        }
    });
};

let newPromise = function (url) {
    return new Promise(function (resolve, reject) {
        $ajax(url, function (result) {
            resolve(result)
        }, function (error) {
            reject(error)
        });
    })
};

let apiPath = function () {
    return Config.apiPath.replace(/\/?$/, '');
};

export default {
    /**
     * 获取全部数据
     */
    count() {
        let url = apiPath() + '/QingDaoTopicApi/count';
        return newPromise(url)
    },
    topic(startDate, endDate,size,sortByFreq) {
        let url = apiPath() + '/QingDaoTopicApi/topic';
        url += '?startDate=' + startDate+'&endDate='+ endDate+'&size='+ size+'&sortByFreq='+sortByFreq;
        return newPromise(url)
    }
}