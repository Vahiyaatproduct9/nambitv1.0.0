import { orderbuttonpress } from '../api/order'
export function orderfood(itemlist: { name: string, price: number, amount: number }[]) {
    const flattened = itemlist.flatMap(item =>
        Array(item.amount).fill({ name: item.name, price: item.price })
    )
    const totalPrice = flattened.reduce((acc, item) => acc + item.price, 0);


    const c = async () => {
        const g = await orderbuttonpress(flattened, totalPrice)
        return g
    }
    return c
}