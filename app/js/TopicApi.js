var $ajax = function (url, success, error) {
    jQuery.support.cors = true;
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

var apiPath = function () {
    return Config.apiPath.replace(/\/?$/, '');
};


var TopicApi = {
    /**
     * 获取全部数据
     */
    count: function(success, error) {
        var url = apiPath() + '/QingDaoTopicApi/count';
        return $ajax(url, success, error);
    },
    /**
     * 获取问政数据
     */
    topic: function(startDate, endDate, size, sortByFreq, success, error) {
        var url = apiPath() + '/QingDaoTopicApi/topic?startDate=' + startDate + '&endDate=' + endDate + '&size=' + size + '&sortByFreq=' + sortByFreq;
        return $ajax(url, success, error);
    },
    /**
     * 获取详细
     */
    findById: function(id, success, error){
        var url = apiPath() + '/MssDataApi/findById?name=network_asked&id=' + id;
        return $ajax(url, success, error);
    }
};
