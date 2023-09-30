type Status = 'ok' | 'error'

/* type InventoryAddResponse = {
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
} */

const _getInventory = () => fetch(`/api/inventory/get`)
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

const _addInventoryItem = (title: string, description: string) => fetch('/api/inventory/add', {
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

const _deleteInventoryItem = (id:number) => fetch('/api/inventory/delete', {
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

const _editInventoryItem = (id: number, changes: {[key: string]: string | number | null | ''}) => fetch('/api/inventory/edit', {
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
    _getInventory,
    _addInventoryItem,
    _deleteInventoryItem,
    _editInventoryItem
}