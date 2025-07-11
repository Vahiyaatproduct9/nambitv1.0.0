import React, { useEffect, useState } from 'react'
import css from './menu.module.css'
import fetchItems from '../api/fetchItems'

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

    return (
        <div className={css.container}>
            <div className={css.title}>
                <h1>Menu</h1> </div>
            <div className={css.items}>
                <div className={css.itemsContainer}>
                    <div className={css.imageContainer}>
                        <img src='./table.jpg' alt='item1' />
                    </div>
                    <div className={css.itemDetails}>
                        <div className={css.itemName}>
                            <h1>Item Name</h1>
                            <p>This is the smooth amazing description</p>
                        </div>
                        <div className={css.subs}>
                            <span>₹100</span>
                            <button>+ Add</button>
                        </div>
                    </div>
                </div>
                <div className={css.itemsContainer}>
                    <div className={css.imageContainer}>
                        <img src='./table.jpg' alt='item1' />
                    </div>
                    <div className={css.itemDetails}>
                        <div className={css.itemName}>
                            <h1>Item Name</h1>
                            <p>This is the smooth amazing description</p>
                        </div>
                        <div className={css.subs}>
                            <span>₹100</span>
                            <button>+ Add</button>
                        </div>
                    </div>
                </div>
                <div className={css.itemsContainer}>
                    <div className={css.imageContainer}>
                        <img src='./table.jpg' alt='item1' />
                    </div>
                    <div className={css.itemDetails}>
                        <div className={css.itemName}>
                            <h1>Item Name</h1>
                            <p>This is the smooth amazing description</p>
                        </div>
                        <div className={css.subs}>
                            <span>₹100</span>
                            <button>+ Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Menu
