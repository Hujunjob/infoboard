'use strict';

//消息类
var InfoItem = function (text){
    if (text) {
        var obj = JSON.parse(text);
        //发表用户的钱包地址
        this.author = obj.author;
        //用户填写的昵称
        this.nickname = obj.nickname;
        //发表时间戳
        this.timestamp  =obj.timestamp;
        //地理位置坐标
        //经纬度都保留6位有效数字
        this.longitude = obj.longitude;
        this.latitude = obj.latitude;
        //发表内容
        this.message = obj.message;
        //联系方式
        this.contact = obj.contact;

    }else{
        this.author = "";
        this.nickname = "";
        this.timestamp = new BigNumber(0);
        this.longitude = 0.0;
        this.latitude = 0.0;
        this.message = "";
        this.contact = "";
    }
};

InfoItem.prototype = {
    toString:function(){
        return JSON.stringify(this);
    }
};

//消息管理类
var InfoManager = function(){
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new InfoItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

InfoManager.prototype = {
    init:function(){
        this.size = 0;
    },

    save:function(key,nickname,timestamp,longitude,latitude,message,contact){
        nickname = nickname.trim();
        message = message.trim();
        contact = contact.trim();
        if (message === "") {
            throw new Error("message cannot be empty");
        };

        if (message.length>256*256) {
            throw new Error("message exceed limit length");
        };

/*
        this.author = "";
        this.nickname = "";
        this.timestamp = new BigNumber(0);
        this.longitude = 0.0;
        this.latitude = 0.0;
        this.message = "";
        this.contact = "";*/

        var from = Blockchain.transaction.from;
        var info = new InfoItem();
        info.author = from;
        info.nickname = nickname;
        info.timestamp = timestamp;
        info.longitude = longitude;
        info.latitude = latitude;
        info.message = message;
        info.contact = contact;

        // var key = this.size;

        this.repo.put(key,info);
        this.size +=1;
    },
    get:function(key){
        return this.repo.get(key);
    }
};

module.exports = InfoManager;

