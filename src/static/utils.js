export default{
    // 时间戳转换
    getDateDiff: function (dateTimeStamp) {
        if(typeof dateTimeStamp == 'string'){
            dateTimeStamp = Number(dateTimeStamp)
        }
        var result = ''
        var minute = 1000 * 60;
        var hour = minute * 60;

        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (hourC >= 1 && hourC < 24) {
            result = parseInt(hourC) + "小时前";
        } else if (minC >= 1 && minC <= 60) {
            result = parseInt(minC) + "分钟前";
        } else if(minC < 1) {
            result = "1分钟前";
        } else {
            var date = new Date(Number(dateTimeStamp));
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
            result = Y+M+D+h+m+s
        }  
        return result;
    },
    debounce(fn, delay) {
        let time = null;
        let timer = null;
        let newTime = null;
        function task() {
          newTime = +new Date();
          if (newTime - time < delay) {
            timer = setTimeout(task, delay);
          } else {
            fn();
            timer = null;
          }
          time = newTime;
        }
        return function () {
          // 更新时间戳
          time = +new Date();
          if (!timer) {
            timer = setTimeout(task, delay);
          }
        };
      },
}
