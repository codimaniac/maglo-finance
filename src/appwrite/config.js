import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
import App from './../App';

const account = new Account(client);
const databases = new Databases(client);

const createUser = async (userName, userEmail, userPassword) => {
    try {
        const user = await account.create({
            userId: ID.unique(),
            name: userName,
            email: userEmail,
            password: userPassword
        });

        return user;
    } catch (error) {
        const AppwriteError = {
            message: error.message,
            code: error.code
        };

        throw AppwriteError;
    }
}

const loginUser = async (userEmail, userPassword, rememberUser) => {
    try {
        const session = await account.createEmailPasswordSession({
            email: userEmail, 
            password: userPassword
        });
        
        if (rememberUser) {
            localStorage.setItem('rememberMe', 'true')
        } else {
            localStorage.setItem('rememberMe', 'false')
        }

        return session;
    } catch (error) {
        const AppwriteError = {
            message: error.message,
            code: error.code
        };

        throw AppwriteError;
    }
}

const updateName = async (name) => {
    try {
        const response = await account.updateName(newName);
        console.log('User name updated:', response);
    } catch (error) {
        console.error('Error updating name:', error.message);
    }
}

const checkSession = async () => {
    try {
        const user = await account.get();
        console.log('Session active:', user);
        return user; // user is logged in
    } catch (error) {
        console.log('No active session');
        return null; // no session
    }
}

export { client, account, databases, createUser, loginUser, updateName, checkSession };