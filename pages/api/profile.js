import {verify} from "jsonwebtoken";

export default function profileHandler(req, res){
    const { myTokenName } = req.cookies;
    if(!myTokenName){
        return res.status(401).json({error: "no token"})
    }
    try {
        const user = verify(myTokenName, "secret");
        res.json({firstname: user.firstname, lastname: user.lastname, email: user.email});
    } catch (error) {
        return res.status(401).json({error: "invalid token"});
    }
}