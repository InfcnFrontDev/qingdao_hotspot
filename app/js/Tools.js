var Tools = {

    yyyyMMddHHmmss: 'yyyyMMddHHmmss',
    yyyyMMddHHmmss_: 'yyyy-MM-dd HH:mm:ss',
    yyyyMMddHHmm: 'yyyyMMddHHmm',
    yyyyMMddHHmm_: 'yyyy-MM-dd HH:mm',
    yyyyMMdd: 'yyyyMMdd',
    yyyyMMdd_: 'yyyy-MM-dd',
    MMdd: 'MMdd',
    MMdd_: 'MM-dd',
    HHmmss: 'HHmmss',
    HHmmss_: 'HH:mm:ss',
    HHmm: 'HHmm',
    HHmm_: 'HH:mm',

    dateFormat: function (date, formatStr) {
        var str = formatStr || this.yyyyMMddHHmm;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];

        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

        str = str.replace(/MM/, date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
        str = str.replace(/M/g, date.getMonth() + 1);

        str = str.replace(/w|W/g, Week[date.getDay()]);

        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());

        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());

        str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());

        return str;
    },
    dateParse: function (dateStr, formatStr) {
        var yyyy = 0, MM = 0, dd = 0, HH = 0, mm = 0, ss = 0;
        var format = formatStr || this.yyyyMMddHHmm;

        if (format == this.yyyyMMddHHmmss) {
            yyyy = dateStr.substring(0, 4), MM = dateStr.substring(4, 6), dd = dateStr.substring(6, 8), HH = dateStr.substring(8, 10), mm = dateStr.substring(10, 12), ss = dateStr.substring(12, 14)
        } else if (format == this.yyyyMMddHHmmss_) {
            yyyy = dateStr.substring(0, 4), MM = dateStr.substring(5, 7), dd = dateStr.substring(8, 10), HH = dateStr.substring(11, 13), mm = dateStr.substring(14, 16), ss = dateStr.substring(17, 19)
        } else if (format == this.yyyyMMddHHmm) {
            yyyy = dateStr.substring(0, 4), MM = dateStr.substring(4, 6), dd = dateStr.substring(6, 8), HH = dateStr.substring(8, 10), mm = dateStr.substring(10, 12)
        } else if (format == this.yyyyMMddHHmm_) {
            yyyy = dateStr.substring(0, 4), MM = dateStr.substring(5, 7), dd = dateStr.substring(8, 10), HH = dateStr.substring(11, 13), mm = dateStr.substring(14, 16)
        } else if (format == this.yyyyMMdd) {
            yyyy = dateStr.substring(0, 4), MM = dateStr.substring(4, 6), dd = dateStr.substring(6, 8)
        } else if (format == this.yyyyMMdd_) {
            yyyy = dateStr.substring(0, 4), MM = dateStr.substring(5, 7), dd = dateStr.substring(8, 10)
        }
        return new Date(yyyy, MM, dd, HH, mm, ss);
    },
    dateAdd: function (date, n) {
        var time = date.valueOf();
        time += n * 1000;
        return new Date(time);
    }

};
