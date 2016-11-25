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
    statistical:function(success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/statistical';
        return $ajax(url, success, error);
    },
    /**
     * 获取问政数据
     */
    topic: function(krywords,startDate, endDate, size, success, error) {
        var url = apiPath() + '/QingDaoDataInfoApi/'+krywords+'?begin=' + startDate + '&end=' + endDate + '&size=' + size ;
        return $ajax(url, success, error);
    },
    /**
     * 获取全部文章
     */
    searchByQuery: function(onset,size, success, error){
        var url = apiPath() + '/MssSearchApi/searchByQuery?tableNames=network_asked&from='+ onset+'&size='+size;
        return $ajax(url, success, error);
    },
    /**
     * 获取详细文章
     */
    searchByQueryTag: function(onset,size,tag,startTime,endTime, success, error){
        var url = apiPath() + '/MssSearchApi/searchByQuery?tableNames=network_asked&from='+ onset+'&size='+size+'&query=tags:"'+tag+'"&filter=question_time:['+startTime+'%20TO%20'+endTime+']';
        return $ajax(url, success, error);
    },
    findById: function(id, success, error){
        var url = apiPath() + '/MssDataApi/findById?name=network_asked&id=' + id;
        return $ajax(url, success, error);
    },
    /**
     * 获取热点周期对比
     */
    searchCycleData: function(tags,num,begin ,end,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/tagsGraph?tags=' + tags + '&num=' + num + '&begin=' + begin+ '&end=' + end ;
        return $ajax(url, success, error);
    },
    /**
     * 获取关键词变化数据
     */
    searchkeyData: function(tag,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/monthGraph?tag=' + tag;
        return $ajax(url, success, error);
    }
};

/*
http://192.168.10.9:9095/api/MssSearchApi/searchByQuery?tableNames=network_asked&from=0&size=20&sort=question_time|desc&query=tags:"教育"*/