import React, { useEffect } from 'react'
import css from './cart.module.css'
import { useRouter } from 'next/navigation'
import Message from '../app/message/message'
import OrdersPopup from '../components/popuporder'
import { checkUserExists } from '@/api/checkuserexist'

function Cart({ selectedItems }: { selectedItems: { name: string, price: number, amount: number }[] }) {
    // Example usage: calculate total price
    useEffect(() => {
        localStorage.getItem('orders') && setPopupShown(true);
    }, [])
    const [popupShown, setPopupShown] = React.useState(false);
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.amount, 0);
    const router = useRouter();
    const flattened = selectedItems.flatMap(item =>
        Array(item.amount).fill({ name: item.name, price: item.price })
    )
    const totalPrice = flattened.reduce((acc, item) => acc + item.price, 0);

    const c = async () => {
        const ordersData = { flattened, totalPrice }
        localStorage.setItem('orders', JSON.stringify(ordersData))
        const result = await checkUserExists();
        if (result === 0) {
            <Message message="Please login to order" color='red' time={3} />
            router.push('/auth/signup');
        }
        else if (result === 1) {
            <Message message="Please fill your details before ordering" color='red' time={3} />
            router.push('/auth/additionalinfo');
        }
        else if (result === 3) {
            router.push('/confirmorders');
        }
        return c
    }
    return (<>
        {popupShown && <OrdersPopup setPopupShown={setPopupShown} />}
        {total !== 0 ? (
            <div className={css.container}>
                <div className={css.leftContainer}>
                    <span>₹{total}</span>
                </div>
                <div className={css.rightContainer}>
                    <button className={css.addToCart} onClick={() => c()}>
                        Order
                    </button>
                </div>
            </div>
        ) : null}
    </>)

}

export default Cart
