"use strict"
let logger = require('../logger/log').logger('redisUtils');
let sqlclient = require('../config/sqlclient');
//let redisCli = null;//获得redisClient连接

//redisCli为默认连接
let redisCli = (sourceId) => {
	return sqlclient.redisCli[sourceId];
};
redisCli = redisCli('local');
/**会覆盖更新key*/
let set = (key,value,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.set(key,value, function(err, reply){
			if(callback)
			    {
			        callback();
			    }
			});
    }
  });
};

/**
不会覆盖，如果存在不设置，并且返回0
*/
let setnx = (key,value,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.setnx(key,value, function(err, reply){
			if(callback)
			{
			    callback();
			}
		});
    }
  });
};

/**
和set类似，可以指定有效期，单位秒
*/
let setex = (key,value,limit,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.setex(key,limit, value,function(err, reply){
		    if(callback)
			{
			    callback(err, reply);
		    }
		});
    }
  });
};


/**
hash表操作，
*/
let hset = (hash,field,value,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.hset(hash,field,value,function(err, reply){
			if(callback)
				{
					callback();
				}
			});
    }
  });
};

/**
hash表长度
*/
let hlen = (hash,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.hlen(hash,function(err, reply){
			if(callback)
			{
				callback();
			}
		});
    }
  });
};

/**
hash所有的keys
*/
let hkeys = (hash,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.hkeys(hash,function(err, reply){
			if(callback)
			{
				callback();
			}
		});
    }
  });
};

/**
rpush在key对应list的尾部添加字符串元素：
*/
let rpush = (key,value,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.rpush(key,value,function(err, reply){
			if(callback)
			{
				callback();
			}
		});
    }
  });
};


/**
lrem从key对应list中删除count个和value相同的元素。
count=0时，删除全部count>0时，按从头到尾的顺序删除　count<0时，按从尾到头的顺序删除
*/
let lrem = (key,count,value,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.lrem(key,count,value,function(err, reply){
			if(callback)
			{
				callback();
			}
		});
    }
  });
};

/**
ltrim删除数据
*/
let ltrim = (key,from,to,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.ltrim(key,from,to,function(err, reply){
			if(callback)
			{
				callback();
			}
		});
    }
  });
}
/**
返回List里面数据的长度
*/
let llen = (key,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.llen(key,function(err, reply){
		   if(callback)
			{
				callback(reply);
			}
		});
    }
  });
};

/**
根据索引返回List里面数据
*/
let lindex = (key,index,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error(error);
    } else {
		redisCli.lindex(key,index,function(err, reply){
			  if(callback)
			{
				callback();
			}
		});
    }
  });
};

let get = (key,callback,datasource) => {
	/*redisCli.on('connect', function(){
    client.get(key, function(err, reply){
        return reply.toString();
    });
	})*/
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error('[redis]获取数据异常：'+error);
    } else {
		redisCli.get(key, function(err, reply){
			if(callback)
			{
				callback(err,reply);
			}
		});
    }
  });
};

let lrange = (key,from,to,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error('[redis]获取数据异常：'+error);
    } else {
		redisCli.lrange(key, from,to,function(err, reply){
			if(callback)
			{
				callback(reply);
			}
		});
    }
  });
};
/**
获得key的过期时间
*/
let ttl = (key,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error('[redis]获取数据异常：'+error);
    } else {
		redisCli.ttl(key,function(err, reply){
			if(callback)
			{
				callback(reply);
			}
		});
    }
  });
};
let zadd = (key,score, member,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error('[redis zadd]获取数据异常：'+error);
    } else {
		redisCli.zadd(key,score,member,function(err, reply){
			if(callback)
			{
				callback();
			}
		});
    }
  });
};

let zscore = (key,score,callback,datasource) => {
	redisCli.select(datasource?datasource:'0', function(error){
    if(error) {
        logger.error('[redis zscore]获取数据异常：'+error);
    } else {
		redisCli.zscore(key,score,function(err, reply){
			if(callback)
			{
				callback(reply);
			}
		});
    }
  });
};

let redisUtils = {
	set:set,
	setnx:setnx,
	setex:setex,
	get:get,
	hset:hset,
	hlen:hlen,
	hkeys:hkeys,
	rpush:rpush,
	lrem:lrem,
	llen:llen,
	lindex:lindex,
	lrange:lrange,
	ltrim:ltrim,
	ttl:ttl,
	zadd:zadd,
	zscore:zscore
	
};
module.exports = redisUtils;
 
