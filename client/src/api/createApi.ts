import { InventoryItem } from "../types";
type Status = 'ok' | 'error'
type CreateResponse = {
    status: Status,
    data: any
}
const create = (currentRecipes: string[], inventory: string[], signal: AbortSignal) => fetch('/api/create/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        currentRecipes: currentRecipes,
        inventory: inventory
    }),
    signal: signal
})
.then((data) => data.json())
.catch((err) => { throw new Error(err) });

export {
    create,
}