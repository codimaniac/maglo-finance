import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
import App from '../App';
import { data } from "react-router";

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

        if (error.message == "Failed to fetch") {
            AppwriteError.message = 'Network connection failed!'
        }

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

        if (error.message == "Failed to fetch") {
            AppwriteError.message = 'Network connection failed!'
        }

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

        return user; // user is logged in
    } catch (error) {
        if (error.code === 401) {
            console.error('No active session')
        }
        if (error.message == "Failed to fetch") {
            console.error('Network connection failed!')
        }

        throw error; // no session
    }
}

const checkIfDocumentExists = async (databaseId, collectionId, documentId) => {
    try {
        const doc = await databases.getDocument(databaseId, collectionId, documentId);
        return !!doc;
    } catch (error) {
        if (error.code === 404) {
            return false;
        }
        console.error('Error checking document existence:', error.message);
        throw error;
    }
}

const logoutUser = async () => {
    try {
        await account.deleteSession('current');
    }
    catch (error) {
        console.error('Error logging out:', error.message);

        throw error;
    }
}

export { client, account, databases, createUser, loginUser, updateName, checkSession, logoutUser, checkIfDocumentExists };