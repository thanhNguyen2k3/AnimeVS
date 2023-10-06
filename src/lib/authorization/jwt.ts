import jwt, { JwtPayload } from 'jsonwebtoken';

interface SignOption {
    expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: '1m',
};

export const signJwtAccessToken = (payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) => {
    const secretKey = process.env.GOOGLE_CLIENT_SECRET;
    const token = jwt.sign(payload, secretKey!, options);

    return token;
};

export const verifyJwtAccessToken = (token: string) => {
    try {
        const secret_key = process.env.GOOGLE_CLIENT_SECRET;
        const decoded = jwt.verify(token, secret_key!);
        return decoded as JwtPayload;
    } catch (error) {
        console.log(error);
        return null;
    }
};
