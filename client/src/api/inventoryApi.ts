type Status = 'ok' | 'error'

type InventoryAddResponse = {
	status: Status,
	data: {
		id: number,
        title: string,
        description: string,
	}
}
type InventoryDeleteResponse = {
	status: Status,
	data: number
}
type InventoryEditResponse = {
    status: Status,
    data: {
        id: number,
        key: string,
        value: string
    }
}

/* 

const deleteInventoryItem = (id: number): Promise<InventoryDeleteResponse> => {
    return new Promise((resolve, reject) => {
        resolve({
            status: 'ok',
            data: 1
        });
    })
}
const addInventoryItem = (title: string, description: string): Promise<InventoryAddResponse> => {
    return new Promise((resolve, reject) => {
        resolve({
            status: 'ok',
            data: {
                title: 'New title',
                description: 'New description',
                id: 1
            }
        });
    })
}
const editInventoryItem = (id: number, changes: {[key: string]: string | number | null | ''}): Promise<InventoryEditResponse> => {
    return new Promise((resolve, reject) => {
        resolve({
            status: 'ok',
            data: {
                key: 'title',
                value: 'New Value goes here...',
                id: 1
            }
        });
    })
} */

const getInventory = () => fetch(`/api/inventory/get`)
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const addInventoryItem = (title: string, description: string) => fetch('/api/inventory/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: title,
        description: description
    }),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const deleteInventoryItem = (id:number) => fetch('/api/inventory/delete', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: id,
    }),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const editInventoryItem = (id: number, changes: {[key: string]: string | number | null | ''}) => fetch('/api/inventory/edit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: id,
        changes: changes
    }),
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

export {
    getInventory,
    addInventoryItem,
    deleteInventoryItem,
    editInventoryItem
}