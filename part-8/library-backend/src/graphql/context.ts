import { verifyToken } from "../auth";

export default async ({ req }: { req: any; }) => {
    const auth = req ? req.headers.authorization as string : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const user = await verifyToken(auth.substring(7));
        return { user };
    }
    
    return;
};