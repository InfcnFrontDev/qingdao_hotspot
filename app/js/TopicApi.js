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
    bumentopic: function(krywords,startDate, endDate, size, dept, success, error) {
        var url = apiPath() + '/QingDaoDataInfoApi/'+krywords+'?begin=' + startDate + '&end=' + endDate + '&size=' + size+'&dept='+ dept ;
        return $ajax(url, success, error);
    },
    /**
     * 获取地图数据
     */
    area: function(startDate, endDate,success, error) {
        var url = apiPath() + '/QingDaoDataInfoApi/area?begin=' + startDate + '&end=' + endDate;
        return $ajax(url, success, error);
    },
    /**
     * 获取区域变化数据
     */
    mapChangeData: function(area,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/monthGraph?area=' + area;
        return $ajax(url, success, error);
    },
    /**
     * 获取全部文章
     */
    searchByQuery: function(onset,size,startTime,endTime, success, error){
        var url = apiPath() + '/MssSearchApi/searchByQuery?tableNames=network_asked&from='+ onset+'&size='+size+'&filter=question_time:['+startTime+'%20TO%20'+endTime+']';
        return $ajax(url, success, error);
    },
    /**
     * 获取详细文章
     */
    searchByQueryTag: function(onset,size,tag,startTime,endTime, success, error){
        var url = apiPath() + '/MssSearchApi/searchByQuery?tableNames=network_asked&from='+ onset+'&size='+size+'&query=tags:"'+tag+'"&filter=question_time:['+startTime+'%20TO%20'+endTime+']';
        // var url = apiPath() + '/MssSearchApi/searchByQuery?tableNames=network_asked&from='+ onset+'&size='+size+'&query=title:"'+ tag +'"^20 or tags:"'+tag+'"&filter=question_time:['+startTime+' TO '+endTime+']';

        return $ajax(url, success, error);
    },
    /**
     * 获取详细文章-市区
     */
    searchByQueryTag_SQ: function(onset,size,area,startTime,endTime, success, error){
        var url = apiPath() + '/MssSearchApi/searchByQuery?tableNames=network_asked&from='+ onset+'&size='+size+'&query=areas:"'+area+'"&filter=question_time:['+startTime+'%20TO%20'+endTime+']';
        // var url = apiPath() + '/MssSearchApi/searchByQuery?tableNames=network_asked&from='+ onset+'&size='+size+'&query=title:"'+ tag +'"^20 or tags:"'+tag+'"&filter=question_time:['+startTime+' TO '+endTime+']';

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
     * 获取部门变化折线
     */
    bumensearchCycleData: function(dept,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/monthGraph?dept=' + dept
        return $ajax(url, success, error);
    },
    /**
     * 获取部门周期对比
     */
    searchBMCycleData: function(tags,num,begin ,end,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/tagsGraph?depts=' + tags + '&num=' + num + '&begin=' + begin+ '&end=' + end ;
        return $ajax(url, success, error);
    },

    /**
     * 获取关键词变化数据
     */
    searchkeyData: function(tag,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/monthGraph?tag=' + tag;
        return $ajax(url, success, error);
    },

    /**
     * 力导向图
     */
    //热点词
    relevantWord: function(tag,begin,end,size,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/relevantWord?tag=' + tag+'&begin=' + begin+ '&end=' + end+ '&size=' + size;
        return $ajax(url, success, error);
    },
    //部门-热点词
    relevantWord_BM: function(tag,dept,begin,end,size,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/relevantWord?dept='+dept+'&tag='+tag+'&begin=' + begin+ '&end=' + end+ '&size=' + size;
        return $ajax(url, success, error);
    },


    /**
     * 关键词云
     */
    //热点词云
    keyWord: function(tag,size,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/keyword?tag=' + tag+ '&size=' + size;
        return $ajax(url, success, error);
    },
    //市区词云
    keyWord_map: function(area,size,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/keyword?area=' + area+ '&size=' + size;
        return $ajax(url, success, error);
    },
    //部门-词云
    keyWord_BM: function(tag,dept,size,success, error){
        var url = apiPath() + '/QingDaoDataInfoApi/keyword?dept='+dept+'&tag='+tag+ '&size=' + size;
        return $ajax(url, success, error);
    },


};

/*
http://192.168.10.9:9095/api/MssSearchApi/searchByQuery?tableNames=network_asked&from=0&size=20&sort=question_time|desc&query=tags:"教育"*/