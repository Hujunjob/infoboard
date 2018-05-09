var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var myneb = new Neb();
myneb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));
var account, tx, txhash;
var dapp_address = "n1u1mn29qxUV2BV8TXyZfTi12qgKwkGAjYk";

$(function() {
    var arrs = [];

    // function init() {
    //     var initLength = 5,
    //         i = 1;
    //     $.create(arrs[0]);
    //     var timer = setInterval(function() {
    //         $.create(arrs[i]);
    //         i++;
    //         if (i == initLength) clearInterval(timer);
    //     }, 2000);
    //     $('.main').css('height', $('.container').height() - $('.top').height() + 'px');
    // }

    myneb.api.call({
        from: dapp_address,
        to: dapp_address,
        value: 0,
        contract: {
            function: "forEach",
            args: JSON.stringify([0, 5])
        },
        gasPrice: 1000000,
        gasLimit: 2000000,
    }).then(function(tx) {
        arrs = JSON.parse(tx.result);
        console.log(arrs);
        // init();
        // setTimeout(function() {
        //     setInterval(function() {
        //         $.create(arrs[i]);
        //         $.destroy($($('.row').get(-1)));
        //         i++;
        //         if (i == arrs.length) i = 0;
        //     }, 3500);
        // }, 8000);
    });
    // var i = 6;
    // $('#help-img').click(function() {
    //     $('#help').show();
    // });
    // $('#help .close').click(function() {
    //     $('.mask').hide();
    // });
    // $('#write-img').click(function() {
    //     $('#write').show();
    // });
    // $('#write .close').click(function() {
    //     $('.mask').hide();
    // });
    // $('#submit').click(function() {
    //     if ($('#text').val().length > 200) {
    //         alert('error');
    //         return;
    //     }
    //     if ($('#name').val().length > 20) {
    //         alert('error');
    //         return;
    //     }
    //     window.postMessage({
    //         "target": "contentscript",
    //         "data": {
    //             "to": dapp_address,
    //             "value": "0",
    //             "contract": {
    //                 "function": "set",
    //                 "args": JSON.stringify([$('#text').val(), $('#name').val()])
    //             }
    //         },
    //         "method": "neb_sendTransaction"
    //     }, "*");
    // });
    // $('#search-img').click(function() {
    //     $('#search').show();
    // });
    // $('#search .close').click(function() {
    //     $('.mask').hide();
    // });
    // $('#submit-addr').click(function() {
    //     myneb.api.call({
    //         from: dapp_address,
    //         to: dapp_address,
    //         value: 0,
    //         contract: {
    //             function: "get",
    //             args: JSON.stringify([$('#address').val().trim()])
    //         },
    //         gasPrice: 1000000,
    //         gasLimit: 2000000,
    //     }).then(function(tx) {
    //         var res = JSON.parse(tx.result);
    //         if (res)
    //             $('#search-res').html("<div class=\"row\"><div>" + res.text + "</div><div class=right>——" + res.name + "</div></div>");
    //         else
    //             $('#search-res').html("<div class=\"row\"><div>这个用户还没有发布过告白哦</div></div>");
    //     });
    // })

});