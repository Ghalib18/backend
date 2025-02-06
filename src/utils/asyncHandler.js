const asyncHandler=async(requestHandler)=>{
   (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).
    catch((err)=>next(err))
 }
}
export {asyncHandler}


// we are passing requesthandler as a function which need to address under asycnornously so 
// we used here Promise with resolve and catch consists if error ocurrs then it will be pass to error handling 