export const baseUrl = 'http://localhost:8080/api';

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data.status === 200) {
            message = data.message;
        } else {
            message = data.error;
        }

        return { error: true, message };
    }

    return data.data;
};

export const getRequest = async (url) => {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data.status === 200) {
            message = data.message;
        } else {
            message = data.error;
        }

        return { error: true, message };
    }

    return data.data;
};
