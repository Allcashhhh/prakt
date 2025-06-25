const apiUrl = "http://localhost:8080";

export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    maximumFractionDigits: 0,
});

export async function createTransaction(requestUrl: string, formData: {
    amount: number;
    description: string;
    time: string
}, token: string | null) {
    return await fetch(apiUrl + requestUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function signup(formData: { password: string; name: string; email: string }) {
    return fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-type": "application/json",
        },
    });
}


export function login(formData: { password: string; email: string }) {
    return fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-type": "application/json",
        },
    });
}


export function createCategory(formData: { title: string; ratio: number }, token: string | null) {
    return fetch(`${apiUrl}/api/categories`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function deleteCategory(categoryId: number, token: string | null) {
    return fetch(
        `${apiUrl}/api/categories/${categoryId}`,
        {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

export const getCategories = async (token: string | null) => {
    const response = await fetch(`${apiUrl}/api/categories`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const isAuthenticated = async (token: string | null) => {
    const response = await fetch(`${apiUrl}/api/users`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.ok;
};

export const getSavings = async (token: string | null) => {
    const response = await fetch(`${apiUrl}/expenses/totalSpending`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    const totalIncome = await getTotalncome(token);

    return totalIncome - (isNaN(data.totalSpending) ? 0 : data.totalSpending);
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const getUsername = async (token: string | null) => {
    const response = await fetch(`${apiUrl}/api/users`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();

    return data.username;
};

export const getIncome = async (token: string | null) => {
    const response = await fetch(`${apiUrl}/api/income`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
};

export const deleteExpense = async (token: string | null, expenseId: number) => {
    await fetch(`${apiUrl}/api/expenses/${expenseId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteIncome = async (token: string | null, incomeId: number) => {
    await fetch(`${apiUrl}/api/income/${incomeId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getExpenses = async (
    token: string | null,
    categoryId: number
) => {
    const response = await fetch(`${apiUrl}/api/categories/${categoryId}/expenses`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

export const getTotalncome = async (token: string | null) => {
    const response = await fetch(`${apiUrl}/api/income/total`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return isNaN(data.totalIncome) ? 0 : data.totalIncome;
};
