import jwt from 'jsonwebtoken';
const logedin = (req, res, next) => {

    const { adminToken } = req.cookies;


    const decodeToken = adminToken ? jwt.verify(adminToken, process.env.POST_SECRET) : null;
    const user = { id: 'admin', username: process.env.POST_USER };

    try {
        if (decodeToken) {
            res.status(202).json({ logedin: true });
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

export default logedin;