module.exports = (handler)=>{
    return (res,req,next)=>{
        try{
            handler(res,req);
            //console.log("here")
        }
        catch(exp){
            //console.log("there")
            next(exp);
        }       
    }
}