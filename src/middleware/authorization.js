import jwt from 'jsonwebtoken';
const authorization = (req, res, next) => {

    const { adminToken } = req.cookies;


    const decodeToken = adminToken ? jwt.verify(adminToken, process.env.POST_SECRET) : null; //process.env.POST_SECRET
    const user = { id: 'admin', username: process.env.POST_USER }; //process.env.POST_USER ||

    try {
        if (decodeToken) {
            next();
        }
        else if (!adminToken || decodeToken.username != user.username || decodeToken.id != user.id) {
            return res.json({
                message: 'la sesion actual ha expirado o el token es nulo',
                logedin: false,
            });
        }
    } catch (error) {
        next();
    }

};

export default authorization;