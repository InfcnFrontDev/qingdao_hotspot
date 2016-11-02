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
}

let newPromise = function (type, monitorDate, interval) {
    let apiPath = Config.apiPath.replace(/\/?$/, '');
    let url = apiPath + '/IFCMonitorServlet?type=' + type;
    if (monitorDate != null) {
        url += '&monitorDate=' + monitorDate;
        if(interval != null){
            url += '&interval=' + interval;
        }
    }else{
        url += '&realtime=true';
    }
    return new Promise(function (resolve, reject) {
        $ajax(url, function (result) {
            resolve(result)
        }, function (error) {
            reject(error)
        });
    })
}

export default {
    /**
     * 获取全部数据
     */
    getAll(monitorDate, interval) {
        return newPromise('all', monitorDate, interval);
    },
    /**
     * 获取CPU信息
     */
    getCpus(monitorDate, interval) {
        return newPromise('cpu', monitorDate, interval);
    },
    /**
     * 获取系统物理内存信息
     */
    getMem(monitorDate, interval) {
        return newPromise('sys', monitorDate, interval);
    },
    /**
     * 获取操作系统信息
     */
    getOperatingSystem(monitorDate, interval) {
        return newPromise('os', monitorDate, interval);
    },
    /**
     * 获取系统用户信息
     */
    getUsers(monitorDate, interval) {
        return newPromise('user', monitorDate, interval);
    },
    /**
     * 获取文件系统信息
     */
    getFileSystems(monitorDate, interval) {
        return newPromise('fs', monitorDate, interval);
    },
    /**
     * 获取网络信息
     */
    getNets(monitorDate, interval) {
        return newPromise('net', monitorDate, interval);
    },
    /**
     * 获取目录信息
     */
    getDirectorys(monitorDate, interval) {
        return newPromise('directory', monitorDate, interval);
    },
    /**
     * 获取JVM类加载信息
     */
    getJVMClassLoading(monitorDate, interval) {
        return newPromise('jvmclassloading', monitorDate, interval);
    },
    /**
     * 获取JVM类编译信息
     */
    getJVMCompilation(monitorDate, interval) {
        return newPromise('jvmcompilation', monitorDate, interval);
    },
    /**
     * 获取JVM垃圾收集信息
     */
    getJVMGarbageCollectors(monitorDate, interval) {
        return newPromise('jvmgc', monitorDate, interval);
    },
    /**
     * 获取JVM内存信息
     */
    getJVMMemoryManagers(monitorDate, interval) {
        return newPromise('jvmmemmgr', monitorDate, interval);
    },
    /**
     * 获取内存管理器信息
     */
    getJVMMemoryPool(monitorDate, interval) {
        return newPromise('jvmmempool', monitorDate, interval);
    },
    /**
     * 获取JVM内存池信息
     */
    getJVMMemory(monitorDate, interval) {
        return newPromise('jvmmem', monitorDate, interval);
    },
    /**
     * 获取JVM所在操作系统信息
     */
    getJVMOperatingSystem(monitorDate, interval) {
        return newPromise('jvmos', monitorDate, interval);
    },
    /**
     * 获取JVM运行时参数及其它信息
     */
    getJVMRuntime(monitorDate, interval) {
        return newPromise('jvmrt', monitorDate, interval);
    },
    /**
     * 获取JVM线程相关信息
     */
    getJVMThread(monitorDate, interval) {
        return newPromise('jvmthd', monitorDate, interval);
    },
    /**
     * 获取Http Request
     */
    getHttpRequest(monitorDate, interval) {
        return newPromise('httprequest', monitorDate, interval);
    },
    /**
     * 获取Http Session
     */
    getHttpSession(monitorDate, interval) {
        return newPromise('httpsession', monitorDate, interval);
    },

    /**
     * 获取cpu,sys,jvmos
     */
    getCpuAndMemAndLoad(monitorDate, interval) {
        return newPromise('cpu,sys,jvmos', monitorDate, interval);
    },
    /**
     * 获取jvmrt,jvmcompilation
     */
    getJVMRuntimeAndJVMCompilation(monitorDate, interval) {
        return newPromise('jvmrt,jvmcompilation', monitorDate, interval);
    }
}