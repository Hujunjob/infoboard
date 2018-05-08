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
    //用于存储地址对应的数据
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new InfoItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    //用于按照size递增存储data，便于遍历数据
    LocalContractStorage.defineMapProperty(this, "arrayMap");
    //用于存储某个地址有多少条数据
    LocalContractStorage.defineMapProperty(this, "sizeMap");
    // this.size = 0;
    
};

InfoManager.prototype = {
    init:function(){
        // this.size = 0;
        //存储size
        LocalContractStorage.put("storage_size",0);
    },
    save:function(nickname,longitude,latitude,message,contact){

        nickname = nickname.trim();
        message = message.trim();
        contact = contact.trim();
        if (message === "") {
            throw new Error("message cannot be empty");
        };

        if (message.length>256*256) {
            throw new Error("message exceed limit length");
        };

        var d = new Date();
        var timestamp = d.toString();

        var from = Blockchain.transaction.from;
        var info = new InfoItem();
        info.author = from;
        info.nickname = nickname;
        info.timestamp = timestamp;
        info.longitude = longitude;
        info.latitude = latitude;
        info.message = message;
        info.contact = contact;

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        if (latitude>90 || latitude<-90) {
            throw new Error("latitude exceed limit range");
        };

        if (longitude>180 || longitude<-180) {
            throw new Error("longitude exceed limit range");
        };

        var key = latitude.toFixed(4) + "," +longitude.toFixed(4);

        var size = this.sizeMap.get(key);
        var dataKey = key;
        if (size) {
            //如果该地址已经存储了数据
            dataKey = key + ","+ size;
            size+=1;
        }else{
            //如果该地址没有存储数据
            dataKey = key + ",0";
            size = 1;
        }
        //存储某地址含有的数据个数
        this.sizeMap.put(key,size);

        //存储地图数据
        this.repo.put(dataKey,info);

        var size = LocalContractStorage.get("storage_size");
        // throw new Error(size);
        
        LocalContractStorage.put("1", size);
        //存储递增数据
        this.arrayMap.put(size,dataKey);
        LocalContractStorage.set("storage_size",parseInt(size)+1);

    },
    getByKey:function(key){
        return this.repo.get(key);
    },
    getKeyByIndex:function(index){
        return this.arrayMap.get(index);
    },
    len:function(){
        return LocalContractStorage.get("storage_size");
    },
    //根据经纬度和区域大小了获得数据
    getByLocation:function(latitude,longitude,area){

    },
    //根据有数据的位置来获取
    forEach:function(start,end){
        start = parseInt(start);
        end = parseInt(end);
        var size = LocalContractStorage.get("storage_size");
        size = parseInt(size);
        if (start>size || start<0) {
            throw new Error("start exceed limit range");
        };
        if (end<start) {
            throw new Error("end exceed limit range");
        };
        if(end>size){
            end = size;
        }
        var result="";

        for (var i = start; i < end; i++) {
            var key = this.arrayMap.get(i.toString());
            if (!key)continue;
            var item = this.repo.get(key);
            if(!item)continue;
            result += item+"|";
        };

        return result;
    }


};

module.exports = InfoManager;

