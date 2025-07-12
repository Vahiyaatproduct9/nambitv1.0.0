import React, { useEffect, useState } from 'react'
import css from './menu.module.css'
import { fetchHotItems } from '../api/fetchItems'
import Cart from '@/components/cart'

function Menu() {
    // const [items, setItems] = useState<{
    //     id: number;
    //     name: string;
    //     description: string;
    //     price: number;
    //     image_url: string;
    // }[]>([]);

    // useEffect(() => {
    //     const getItems = async () => {
    //         const fetchedItems: {
    //             id: number;
    //             name: string;
    //             description: string;
    //             price: number;
    //             image_url: string;
    //         }[] = (await fetchItems('all')) || [];
    //         setItems(fetchedItems);
    //     };
    //     getItems();
    // }, []);
    const [hotItems, setHotItems] = useState<{ name: string; price: number; description: string; image_url: string; }[]>([]);

    useEffect(() => {
        const getHotItems = async () => {
            const items = await fetchHotItems();
            if (Array.isArray(items)) {
                setHotItems(items);
            }
        };
        getHotItems();

    }, []);
    const [selectedItems, setSelectedItems] = useState<{ name: string; price: number; amount: number }[]>([])

    useEffect(() => {
        const initialSelected = hotItems.map(item => ({
            name: item.name,
            price: item.price,
            amount: 0
        }))
        setSelectedItems(initialSelected)
    }, [hotItems])

    const hotItemsMap = hotItems.map((item, index) => {
        const selected = selectedItems[index] || { amount: 0 } // fallback if not yet ready

        return (
            <div key={index} className={css.itemsContainer}>
                <div className={css.imageContainer}>
                    <img src={item.image_url || './table.jpg'} alt={item.name} />
                </div>
                <div className={css.itemDetails}>
                    <div className={css.itemName}>
                        <h1>{item.name}</h1>
                        <p>{item.description || "This is the description"}</p>
                    </div>
                    <div className={css.subs}>
                        <span>₹{item.price}</span>
                        {selected.amount === 0 ? (
                            <button onClick={() => {
                                setSelectedItems(prev => prev.map(it => it.name === item.name ? { ...it, price: item.price, amount: 1 } : it))
                            }}>+ Add</button>
                        ) : (
                            <>
                                <button onClick={() => {
                                    setSelectedItems(prev =>
                                        prev.map((it, i) =>
                                            i === index && it.amount > 0
                                                ? { ...it, price: item.price, amount: it.amount - 1 }
                                                : it
                                        )
                                    )
                                }}>-</button>
                                {selected.amount}
                                <button onClick={() => {
                                    setSelectedItems(prev =>
                                        prev.map((it, i) =>
                                            i === index ? { ...it, price: item.price, amount: it.amount + 1 } : it
                                        )
                                    )
                                }}>+</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    })
    return (<>

        <div className={css.container}>
            <div className={css.title}>
                <h1>Menu</h1> </div>
            <div className={css.items}>
                {hotItemsMap}

            </div>

        </div>
        <Cart selectedItems={selectedItems} />
    </>
    )
}

export default Menu
