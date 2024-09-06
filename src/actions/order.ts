"use server"

export const getOrdersAPI = async(storeId: string | string[]) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/orders`);

    const orders = await res.json();

    return orders;
}

export const deleteOrderAPI = async(storeId: string | string[], orderId: string) => {
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/orders/${orderId}`, {
        cache: 'no-cache',
        method: 'DELETE',
        body: JSON.stringify({})
    });

    const order = await res.json();

    return order
}

export const changeStatusAPI = async(storeId: string | string[], orderId: string, newStatus: string) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/orders/${orderId}`, {
        cache: 'no-cache',
        method: 'PUT',
        body: JSON.stringify({orderStatus: newStatus})
    });

    const updatedOrder = await res.json();

    return updatedOrder;
}

export const getOrderAPI = async(storeId: string | string[], orderId: string | string[]) =>{
    const res = await fetch(`http://localhost:3000/api/stores/${storeId}/orders/${orderId}`);

    const order = await res.json();

    return order;
}