var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();

$("#search_value").attr("disabled", true)
$("#search").attr("disabled", true)


//to check if the extension is installed
//if the extension is installed, var "webExtensionWallet" will be injected in to web page
if (typeof (webExtensionWallet) === "undefined") {
    //alert ("Extension wallet is not installed, please install it first.")
    $("#noExtension").removeClass("hide")
} else {
    $("#search_value").attr("disabled", false)
    $("#search").attr("disabled", false)
}

var dappAddress = "n1unJNMNpDDdMu2kPKyevXbVsLxPZ4ycCoe";

// 搜索功能: 查找Super-Dictionary 中有没有该词条
$("#search").click(function () {
    // $("#search_value").val() 搜索框内的值

    var to = dappAddress;
    var value = "0";
    var callFunction = "get";
    var callArgs = "[\"" + $("#search_value").val() + "\"]"; //in the form of ["args"]
    nebPay.simulateCall(to, value, callFunction, callArgs, {    //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
        listener: cbSearch      //指定回调函数
    });
})

//return of search,
function cbSearch(resp) {
    var result = resp.result
    console.log("return of rpc call: " + JSON.stringify(result))

    if (result === 'null') {
        $(".add_banner").addClass("hide");
        $(".result_success").addClass("hide");

        $("#result_faile_add").text($("#search_value").val())

        $(".result_faile").removeClass("hide");
    } else {
        //if result is not null, then it should be "return value" or "error message"
        try {
            result = JSON.parse(result)
        } catch (err) {
            //result is the error message
        }

        if (!!result.key) {      //"return value"
            $(".add_banner").addClass("hide");
            $(".result_faile").addClass("hide");

            $("#search_banner").text($("#search_value").val())
            $("#search_result").text(result.value)
            $("#search_result_author").text(result.author)

            $(".result_success").removeClass("hide");
        } else {        //"error message"
            $(".add_banner").addClass("hide");
            $(".result_faile").addClass("hide");

            $("#search_banner").text($("#search_value").val())
            $("#search_result").text(result)
            $("#search_result_author").text("")

            $(".result_success").removeClass("hide");
        }

    }

}

// 添加信息功能: 像super-dictionary 中添加词条
$("#add").click(function () {
    $(".result_faile").addClass("hide");
    $(".add_banner").removeClass("hide");

    $("#add_value").val("")
})

$("#push").click(function () {

    var to = dappAddress;
    var value = "0";
    var callFunction = "save"
    var callArgs = "[\"" + $("#search_value").val() + "\",\"" + $("#add_value").val() + "\"]"
    console.log("test call args: " + callArgs);
    nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: cbPush
    });
});

function cbPush(resp) {
    console.log("response of push: " + resp)
}

