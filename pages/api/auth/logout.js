import { serialize } from "cookie"
import { verify } from "jsonwebtoken"

export default function logoutHandler(req, res){
    const {myTokenName} = req.cookies

    if(!myTokenName){
        return res.status(401).json({error: "no token"})
    }

    try {
        verify(myTokenName, "secret")
        const serialized = serialize("myTokenName", null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/" 
        })
        res.setHeader("Set-Cookie", serialized);
        return res.status(200).send("logout succesfully");
    } catch (error) {
       return res.status(401).json({error: "invalid token"})
    }
}