import jwt from "jsonwebtoken"

export function authenticateToken(req,res,next){
    const authHeader = req.headers["authorization"];
    const Token = authHeader && authHeader.split(" ")[1];

    if(!Token) return res.sendStatus(401);

    jwt.verify(Token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err) return res.sendStatus(401);
        req.user = user;
        next();
    })
}