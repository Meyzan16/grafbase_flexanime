import { ProjectForm } from '@/common.types';
import { createUserMutation, getUserQuery, createProjectMutation } from '@/graphql';
import  { GraphQLClient} from 'graphql-request';


const isProduction = process.env.NODE_ENV  === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : '1234';

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);


export const fetchToken = async () => {
    try {
        const res = await fetch(`${serverUrl}/api/auth/token`);
        return res.json();
    } catch (error) {
        throw error;
    }
}

const makeGraphQLRequest = async (query: string, variables = {}) => {

    try {
        //client request
        return await client.request(query, variables);

    } catch (error) {   
         throw(error);
    }

}

//model get user untuk session
export const  getUser = (email:string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, {email})
};


//model create user terbaru
export const createUser = (name: string, email:string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name , email , avatarUrl
        }
    }
    return makeGraphQLRequest(createUserMutation, variables)
}

export const  uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({path: imagePath})
        })
        return response.json();
    } catch (error) {
        throw error;

    }
}

//model creaet a new project
export const createNewProject = async (form: ProjectForm, creatorId: string, token:string) => {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url){
        client.setHeader("Authorization", `Bearer ${token}`);
        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId,
                }
            }
        }
        return makeGraphQLRequest(createProjectMutation, variables);
    }
}

