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
        console.log(req.body, 'Body')
        const { email, password, fullname, phone, dob } = req.body;
        console.log(email, password, fullname, phone, dob)
        if (!email || !password || !phone || !fullname || !dob) {
            console.log('lok ')
            return res
                .status(406)
                .json({
                    success: false,
                    message: 'Invalid Crendtials',
                })
        }
        let result = await studentAuthService.register({ email, password, fullname, phone, dob });
        if (!result) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Some thing is happened',
                })
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



export const studentRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Unauthorised',
                })
        }
        const result = await studentAuthService.refreshTokeh(refreshToken);
        if (!result) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Unauthorised',
                })
        }
        console.log(result, 'newToken')
        res.cookie('accessToken', result, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res
            .status(200)
            .json({
                succes: true,
                accessToken: result
            })
    } catch (error) {
        next(error)
    }
}


export const studentLogout = async (req, res, next) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true, // Make sure to match the options used when setting the cookie
            secure: process.env.NODE_ENV === 'production', // Only true in production environments
            sameSite: 'Lax', // Adjust the sameSite attribute if needed
        });
        return res
            .status(200)
            .json({
                success: true,
                message: 'Logout Successfully'
            })
    } catch (error) {
        next(error)
    }
}





//  Reviwer Controllers

export const reviewerLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body, '\ivdd')
        if (!email || !password) {
            return res
                .status(406)
                .json({
                    success: false,
                    message: 'Invalid Crendtials',
                })
        }
        const { accessToken, refreshToken, username } = await reviewerAuthService.reviewerLogin(email, password);
        res.cookie('reviewerRefreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie('reviewerAccessToken', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res
            .status(200)
            .json({
                success: true,
                message: "Reviewer Login Successfully",
                username,
            })


    } catch (error) {
        next(error)
    }

}

export const reviewerRegistration = async (req, res, next) => {
    try {
        const reviwerData = req.body;
        console.log(req.body)
        let result = await reviewerAuthService.createReviwer(reviwerData);
        if (!result) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Some thing is happened',
                })
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "Reviwer Register Successfully",
            });

    } catch (error) {
        next(error)
    }

}

export const reviewrRefreshToken = async (req, res, next) => {
    try {
        const { reviewerRefreshToken } = req.cookies;
        if (!reviewerRefreshToken) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Unauthorised',
                })
        }
        const result = await reviewerAuthService.reviewrRefreshToken(reviewerRefreshToken);
        if (!result) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Unauthorised',
                })
        }
        console.log(result, 'newToken'  )
        res.cookie('reviewerAccessToken', result, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res
            .status(200)
            .json({
                succes: true,
                accessToken: result
            })
    } catch (error) {
        next(error)
    }

}


export const reviewerLogout = async (req, res, next) => {
    try {
        res.clearCookie('reviewerRefreshToken', {
            httpOnly: true, // Make sure to match the options used when setting the cookie
            secure: process.env.NODE_ENV === 'production', // Only true in production environments
            sameSite: 'Lax', // Adjust the sameSite attribute if needed
        });
        res.clearCookie('reviewerAccessToken', {
            httpOnly: true, // Make sure to match the options used when setting the cookie
            secure: process.env.NODE_ENV === 'production', // Only true in production environments
            sameSite: 'Lax', // Adjust the sameSite attribute if needed
        });

        return res
            .status(200)
            .json({
                success: true,
                message: 'Logout Successfully'
            })
    } catch (error) {
        next(error)
    }
}





// Admin Authentication Controllers 

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return res
                .status(406)
                .json({
                    success: false,
                    message: 'Invalid Crendtials my',
                })
        }
        console.log(email, password)
        
        const { accessToken, refreshToken, username } = await adminAuthService.adminLogin(email, password);
        res.cookie('adminRefreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie('adminAccessToken', accessToken, {
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

};

export const adminRegister = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password ) {
            return res
                .status(406)
                .json({
                    success: false,
                    message: 'Invalid Crendtials',
                })
        }
        let result = await adminAuthService.adminRegister({ email, password });
        if (!result) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'Some thing is happened',
                })
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

export const adminLogout = async (req, res, next) => {
    try {
        res.clearCookie('adminRefreshToken', {
            httpOnly: true, // Make sure to match the options used when setting the cookie
            secure: process.env.NODE_ENV === 'production', // Only true in production environments
            sameSite: 'Lax', // Adjust the sameSite attribute if needed
        });
        return res
            .status(200)
            .json({
                success: true,
                message: 'Logout Successfully'
            })
    } catch (error) {
        next(error)
    }
}

export const adminRefreshToken = async (req, res, next) => {
    try {
        const { adminRefreshToken } = req.cookies;
        if (!adminRefreshToken) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Unauthorised',
                })
        }
        const result = await adminAuthService.adminRefreshToken(adminRefreshToken);
        if (!result) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Unauthorised',
                })
        }
        return res
            .status(200)
            .json({
                succes: true,
                accessToken: result
            })
    } catch (error) {
        next(error)
    }
}

