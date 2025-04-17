import { decodeAccessToken } from "../utils/jwtUtil.js";

export const AuthenticateReviewer = async (req, res, next) => {
    const accessToken = req.cookies?.reviewerAccessToken;

    // Check if access token is missing
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Login Only" });
    }

    try {
        const decodedToken = await decodeAccessToken(accessToken);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.reviewer = decodedToken.userId; // Attach user ID to request
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};


export const AuthenticateAdmin = async (req, res, next) => {
    const accessToken = req.cookies?.adminAccessToken;

    // Check if access token is missing
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Login Only" });
    }

    try {
        const decodedToken = await decodeAccessToken(accessToken);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.admin = decodedToken.userId; // Attach user ID to request
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};  

export const AuthenticateUser = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    // Check if access token is missing
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Login Only" });
    }

    try {
        const decodedToken = await decodeAccessToken(accessToken);

        if (!decodedToken) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.user = decodedToken.userId; // Attach user ID to request
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};