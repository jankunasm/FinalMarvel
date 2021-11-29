let token = `4fb5b0d3c9dc60a5901d7a7b7538eca054162402a91b2666`

export const server_calls = {
    get: async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/characters` , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch data Noob')
        }
        return await response.json()
    },
    create: async (data: any = {}) => {
        const response = await fetch(`http://127.0.0.1:5000/api/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Failed to Create a new Character on Server')
        }
        return await response.json()
    },
    update: async (id: string, data: any = {}) => {
        const response = await fetch(`http://127.0.0.1:5000/api/characters/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Failed to Update a Character on Server')
        }
        return await response.json()
    },
    delete: async (id: string) => {
        const response = await fetch(`http://127.0.0.1:5000/api/characters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
        if(!response.ok){
            throw new Error('Failed to Delete a Character on Server')
        }
        return await response.json()
    }
}