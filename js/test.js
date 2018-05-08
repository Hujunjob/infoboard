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
var value = "0";
var allCount = 0;

initPageData();

$("#btn_refresh").click(function () {
    refreshData();
});

function refreshData () {
    // body...
    var to = dappAddress;
    var value = "0";
    var callFunction = "forEach";
    var start = 0;
    var end = 10;
    var callArgs = "[\"" + start + "\",\"" + end + "\"]"; //in the form of ["args"]
    nebPay.simulateCall(to, value, callFunction, callArgs, {    //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
        listener: refreshPage      //指定回调函数
    });
}

function initPageData () {
    // body...
    // body...
    var to = dappAddress;
    var value = "0";
    var callFunction = "len";
    var start = 0;
    var end = 2;
    // var callArgs = "[\"" + start + "\",\"" + end + "\"]"; //in the form of ["args"]
    nebPay.simulateCall(to, value, callFunction, "[]", {    //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
        listener: function(resp){
            var result = resp.result;
            allCount = parseInt(result);
            console.log("allcount="+allCount);
            refreshData();
        }      //指定回调函数
    });
}



function refreshPage(resp) {
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

        $("#info_table").html("");

        var arrar = result.split("|");
        var len = arrar.length;

        for (var i = 0; i < arrar.length-1; i++) {

        var result1 = arrar[i];
        var obj = JSON.parse(result1);


        var author = obj.author;
        var nickname = obj.nickname;
        var timestamp = obj.timestamp;
        var longitude = obj.longitude;
        var latitude = obj.latitude;
        var message = obj.message;
        var contact = obj.contact;

        if (obj.nickname==="") {
            nickname = author;
        };

        if (obj.contact === "") {
            contact = "无";
        };

        var html = "<tr><td>"+message+"</td><td>"+nickname+"</td><td>"+contact+"</td></tr>";

        $("#info_table").append(html);

        console.log("message="+message);
        // $("#message").html(message);
        // $("#author").html(nickname);
        // $("#contact").html(contact);
        };


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

$('#world-map').vectorMap({
        map: 'world_mill',
        scaleColors: ['#C8EEFF', '#0071A4'],
    normalizeFunction: 'polynomial',
    hoverOpacity: 0.7,
    hoverColor: false,
    markerStyle: {
      initial: {
        fill: '#F8E23B',
        stroke: '#383f47'
      }
    },
    backgroundColor: '#383f47',
    markers: [
      {latLng: [41.90, 12.45], name: 'Vatican City'},
      {latLng: [43.73, 7.41], name: 'Monaco'},
      {latLng: [-0.52, 166.93], name: 'Nauru'},
      {latLng: [-8.51, 179.21], name: 'Tuvalu'},
      {latLng: [43.93, 12.46], name: 'San Marino'},
      {latLng: [47.14, 9.52], name: 'Liechtenstein'},
      {latLng: [7.11, 171.06], name: 'Marshall Islands'},
      {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
      {latLng: [3.2, 73.22], name: 'Maldives'},
      {latLng: [35.88, 14.5], name: 'Malta'},
      {latLng: [12.05, -61.75], name: 'Grenada'},
      {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
      {latLng: [13.16, -59.55], name: 'Barbados'},
      {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
      {latLng: [-4.61, 55.45], name: 'Seychelles'},
      {latLng: [7.35, 134.46], name: 'Palau'},
      {latLng: [42.5, 1.51], name: 'Andorra'},
      {latLng: [14.01, -60.98], name: 'Saint Lucia'},
      {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
      {latLng: [1.3, 103.8], name: 'Singapore'},
      {latLng: [1.46, 173.03], name: 'Kiribati'},
      {latLng: [-21.13, -175.2], name: 'Tonga'},
      {latLng: [15.3, -61.38], name: 'Dominica'},
      {latLng: [-20.2, 57.5], name: 'Mauritius'},
      {latLng: [26.02, 50.55], name: 'Bahrain'},
      {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
    ]
      });
