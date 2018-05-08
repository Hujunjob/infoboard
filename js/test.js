var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();


//to check if the extension is installed
//if the extension is installed, var "webExtensionWallet" will be injected in to web page
if (typeof (webExtensionWallet) === "undefined") {

} else {
    $("#wallet_alert").hide();
}

var dappAddress = "n1sgsPCNuR9sw2Nekr8qFNRtQG2ySj5fLfD";
// var dappAddress = "n1unJNMNpDDdMu2kPKyevXbVsLxPZ4ycCoe";

$("#btn_refresh").click(function () {
    var to = dappAddress;
    var value = "0";
    var callFunction = "forEach";
    var start = 0;
    var end = 2;
    var callArgs = "[\"" + start + "\",\"" + end + "\"]"; //in the form of ["args"]
    nebPay.simulateCall(to, value, callFunction, callArgs, {    //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
        listener: cbSearch      //指定回调函数
    });

    // nebPay.simulateCall(to,value,"getTest","[\"" + "1" + "\"]",{
    //     listener:function(resp){
    //         var result = resp.result;
    //         console.log("getTest "+result);
    //     }
    // });

});

//return of search,
function cbSearch(resp) {
    var result = resp.result;
    console.log("return of rpc call: " + JSON.stringify(result))

    if (result === 'null') {
        $("#noinfo_alert").show();
    } else {
        //if result is not null, then it should be "return value" or "error message"
        try {
            result = JSON.parse(result)
        } catch (err) {
            //result is the error message
        }
        console.log("result " + result);

        var arrar = result.split("|");

        var result1 = arrar[0];
        var obj = JSON.parse(result1);
        

        var author = obj.author;
        var nickname = obj.nickname;
        var timestamp = obj.timestamp;
        var longitude = obj.longitude;
        var latitude = obj.latitude;
        var message = obj.message;
        var contact = obj.contact;

        console.log("message="+message);
        $("#message").html(message);
        $("#author").html(nickname);
        $("#contact").html(contact);

    }

}


$("#btn_submit").click(function () {


    getLocation();


});

function cbPush(resp) {
    // var result = resp.result;
    // console.log("response of push: " + result);
    // if (result!='null') {

    // };
}

function getLocation() {
    console.log("getLocation")
    var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
    };
    if (navigator.geolocation) {
        //浏览器支持geolocation
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);//调用成功则调用onSuccess函数，失败则调用onError函数
    } else {
        //浏览器不支持geolocation
        error();//调用error函数提示用户
    }
}
function error() {
    alert("sorry , your brower is not  used   for this position!  ");
}
function onError(position) {
    console.log(position);//打印错误信息
}
function onSuccess(position) {
    console.log(position);//打印位置信息
    var lat = position.coords.latitude; //纬度 
    var lag = position.coords.longitude; //经度 
    var message = $("#exampleInputContent").val();
    console.log("message " + message);
    var contact = $("#exampleInputContact").val();
    var nickname = $("#exampleInputNickname").val();
    var timestamp = new Date().getTime();

    var to = dappAddress;
    var value = "0";
    var callFunction = "save";
    // var key = "key1";

    var callArgs = "[\"" + nickname + "\",\"" + lag + "\",\"" + lat + "\",\"" + message + "\",\"" + contact + "\"]";

    nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: cbPush
    });
}

