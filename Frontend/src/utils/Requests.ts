const BASE_URL = import.meta.env.VITE_API_URL as string;

const request = async (url: string, method: string, body?: any, customHeaders?: any) => {
    const headers = {
        'Content-Type': 'application/json',
        ...customHeaders
    };

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    };

    console.log("Request:", url, options.body);
    try {
        const response = await fetch(`${BASE_URL}${url}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        return data;
    } catch (error) {        
        throw error;
    }
};

export const get = async (url: string, customHeaders?: any) => {
    return request(url, 'GET', undefined, customHeaders);
};

export const post = async (url: string, body: any, customHeaders?: any) => {
    return request(url, 'POST', body, customHeaders);
};

export const put = async (url: string, body: any, customHeaders?: any) => {
    return request(url, 'PUT', body, customHeaders);
};

export const del = async (url: string, customHeaders?: any) => {
    return request(url, 'DELETE', undefined, customHeaders);
}