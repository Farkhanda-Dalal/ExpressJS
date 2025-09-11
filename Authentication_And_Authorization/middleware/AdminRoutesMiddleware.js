export const checkRole=(req, res, next)=>{

    //Uses req.userInfo passed by preceeding checkAuth middleware
    if(req.userInfo.role !== "admin"){
        return res.json({
            success: false,
            message: "Only admin can access this page"
        })
    }

    next();
}