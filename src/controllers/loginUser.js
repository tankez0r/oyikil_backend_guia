import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';


export const login = async (req, res) => {
    const { body } = req;
    const { username, password } = body;
    const user = username.toLowerCase() === process.env.POST_USER ? // ||
        username.toLowerCase() : null;


    const passwordCorrect = user === null ?
        false : process.env.POST_PASS === password;  // 




    try {
        if (!(user && passwordCorrect)) {
            res.status(401).json({
                message: 'Las credenciales son incorrectas'
            });
        } else {

            const userForToken = ({
                id: 'admin',
                username: user

            });

            const token = sign(userForToken, process.env.POST_SECRET); //
            const tokenSerialized = serialize('adminToken', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                domain: ".cooperativaoyikil.com.ar",
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            });




            res.setHeader('Set-Cookie', tokenSerialized);

            res.send({
                id: 'admin',
                username: user,
                logedin: true
            });


        }


    } catch (error) {
        res.send({ error })
    }



};


export const logout = async (_req, res) => {
    try {
        const tokenSerialized = serialize('adminToken', 'null', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: ".cooperativaoyikil.com.ar",
            maxAge: -1,
            path: '/'
        });




        res.setHeader('Set-Cookie', tokenSerialized);

        res.send({
            logedin: false
        });


    }


    catch (error) {
        console.log(error);
    }



};