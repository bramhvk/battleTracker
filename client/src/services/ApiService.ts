export enum Method {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export const apiCall = async <T>(method: Method, url: string, fallback: T): Promise<T> => {
    try {
        const response = await fetch(url, { method: method });
        if (!response.ok) throw new Error(`Failed to ${method} ${url}`);
        return (await response.json()) as T;
    } catch (err) {
        console.error(`Error ${method} ${url}:`, err);
        return fallback;
    }
};


export const apiCallBodied = async <T, B>(method: Method, url: string, body: B, fallback: T): Promise<T> => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(`Failed to ${method} to ${url}`);
        return (await response.json()) as T;
    } catch (err) {
        console.error(`Error ${method} ${url}:`, err);
        return fallback;
    }
};
