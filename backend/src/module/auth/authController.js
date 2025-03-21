import { authServices } from "./authService.js";
const {student,  admin, reviewer} = authServices

export const studentLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(406)
                .json({
                    success: false,
                    message: 'Invalid Crendtials',
                })
        }
        const {accessToken, refreshToken,username } =await student.login(email, password);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res
            .status(200)
            .json({
                success: true,
                message: "User Login Successfully",
                username,
            })


    } catch (error) {
        next(error)
    }

}

export const studentRegister = async (req, res, next) => {
    try {
        const { email, password, username, name,   } = req.body;
        if (!email || !password || !username) {
            return res
                .status(406)
                .json({
                    success: false,
                    message: 'Invalid Crendtials',
                })
        }
        await student.register(email, password, username);
        res
            .status(200)
            .json({
                success: true,
                message: "User Register Successfully",
            });
    } catch (error) {
        next(error)
    }
}
