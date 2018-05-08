


$("#btn_start").click(function() {

    console.log("click");
    getLocation();


});

function cbPush(resp) {
    // var result = resp.result;
    // console.log("response of push: " + result);
    // if (result!='null') {

    // };
}

function getLocation()
        {
            console.log("getLocation")
            var options = {
                enableHighAccuracy:true,
                maximumAge:1000
            };
            if (navigator.geolocation) {
                //浏览器支持geolocation
                navigator.geolocation.getCurrentPosition(onSuccess, onError, options);//调用成功则调用onSuccess函数，失败则调用onError函数
            } else {
                //浏览器不支持geolocation
                error();//调用error函数提示用户
            }
        }
        function error()
        {
            alert("sorry , your brower is not  used   for this position!  ");
        }
        function onError(position)
        {
            console.log(position);//打印错误信息
        }
        function onSuccess(position)
        {
            console.log(position);//打印位置信息
            var lat = position.coords.latitude; //纬度 
            var lag = position.coords.longitude; //经度 
            var lt = lat.toFixed(6);
            var lg = lag.toFixed(6);
            var key = getKey(lg,lt,1);
            console.log("lag="+lg+",lat="+lt+",key="+key);
           
        }

function getKey (lag,lat,num) {
    // body...
    var lagStr = lag * 1000000;
    var latStr = lat * 1000000;
    var str = latStr+","+lagStr + "," +num;
    return str;
}

