var infoManage = require('./infoboard');

// infoManage.init();

test("1","1","1","1","1");



function test(nickname,longitude,latitude,message,contact){
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

        LocalContractStorage.put("1", "1");

        //存储递增数据
        this.arrayMap.put(this.size,dataKey);
        this.size +=1;
};

