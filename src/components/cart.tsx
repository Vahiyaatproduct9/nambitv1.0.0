import React, { useEffect } from 'react'
import css from './cart.module.css'
import { useRouter } from 'next/navigation'
import Message from '../app/message/message'
import OrdersPopup from '../components/popuporder'
import { checkUserExists } from '@/api/checkuserexist'

function Cart({ selectedItems, menuSliderData }: { selectedItems: { name: string, price: number, amount: number }[]; menuSliderData: { name: string, price: number, amount: number }[] }) {
    // Example usage: calculate total price
    useEffect(() => {
        localStorage.getItem('orders') && setPopupShown(true);
    }, [])
    const [popupShown, setPopupShown] = React.useState(false);
    const router = useRouter();
    const flattenedSelectedItems = selectedItems.flatMap(item =>
        Array(item.amount).fill({ name: item.name, price: item.price })
    )
    const flattenedMenuSlider = menuSliderData.flatMap(item =>
        Array(item.amount).fill({ name: item.name, price: item.price }))
    const flattened: { name: string, price: number }[] = [...flattenedMenuSlider, ...flattenedSelectedItems]
    const totalPriceFromselectedItems = selectedItems.reduce((acc, item) => acc + item.price * item.amount, 0);
    const totalPriceFromMenuSlider = menuSliderData.reduce((acc, item) => acc + item.price * item.amount, 0);

    const totalPrice = totalPriceFromMenuSlider + totalPriceFromselectedItems

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
        {totalPrice !== 0 ? (
            <div className={css.container}>
                <div className={css.leftContainer}>
                    <span style={{ color: totalPrice < 100 || totalPrice > 500 ? 'red' : 'green' }}>₹{totalPrice}</span>
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
