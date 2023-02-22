const User = require("../models/user");
var jwt = require('jsonwebtoken');
var AWS = require('aws-sdk');
exports.hashId = function (id) {
    return jwt.sign({id}, process.env.SECRET);
}

exports.isAuthentic = async(req,res,next)=>{
    try {
        const hash = req.headers.athentication;
        var decoded = jwt.verify(hash, process.env.SECRET);
        // console.log(decoded.id.id);
        req.user =  await User.findOne({_id:decoded.id});
        if(req.user) return next();
        // console.log("incomming");
        res.status(401).send("Login first")
    } catch (error) {
        res.status(401).send("Login first")
    }
}  

exports.updateLastTime = async(req,res,next)=>{
//    console.log( req.user.lastTime);
   req.user.lastTime = Date.now();
   await req.user.save();
   next();
}
    exports.isPrimium= async(req,res,next)=>{
        if(req.user.isPrimium) return next();
        return res.status(401).json({message:"Not a primium user"});
    }

    exports.uploadToAWS = async(data,name)=>{
       const s3Bucket = new AWS.S3({
            accessKeyId:process.env.AWS_access,
            secretAccessKey:process.env.AWS_secret,
            Bucket:"expensetraker"
        })
        var params={
            Bucket:"expensetraker",
            Key:name,
            Body:data,
            ACL:"public-read"
        }

        return new Promise ((resolve,reject)=>{
            s3Bucket.upload(params,(err,AWSres)=>{
            if(err) reject( err);
            else { //console.log(AWSres);
                resolve(AWSres.Location);
            }
        })})
    }