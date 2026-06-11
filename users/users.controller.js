import { createUserProvider,loginUserProvider,getUserProvider } from "./users.provider.js";


export async function signupUser(req,res) {
    return await createUserProvider(req,res);
}
export async function loginUser(req,res) {
    return await loginUserProvider(req,res);
}
export async function getUser(req,res) {
    return await getUserProvider(req,res);
}