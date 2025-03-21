import { authServices } from "./authService.js";
const { studentAuthService, adminAuthService, reviewerAuthService } = authServices



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
        const { accessToken, refreshToken, username } = await studentAuthService.login(email, password);
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

        return res
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
        const { email, password, fullName, phone, dob } = req.body;
        if (!email || !password || !phone || !fullName || !dob) {
            return res
                .status(406)
                .json({
                    success: false,
                    message: 'Invalid Crendtials',
                })
        }
        let result = await studentAuthService.register({email,password,fullName,phone, dob});
        if(!result){
            return res
            .status(400)
            .json({
                success: false,
                message: 'Some thing is happened',
            } )
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "User Register Successfully",
            });

    } catch (error) {
        next(error)
    }
}




export const studentAuthController = {
    studentLogin,
    studentRegister,

}