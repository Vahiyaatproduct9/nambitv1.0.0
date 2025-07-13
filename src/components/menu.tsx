import React, { useEffect, useState } from 'react'
import css from './menu.module.css'
import { fetchItems, fetchHotItems, fetchCategory } from '../api/fetchItems'
import Cart from '@/components/cart'
import Loading from './fetchLoading/loading';
import MenuSlider from './menuslider/menuSlider';

function Menu() {
    const [hotItems, setHotItems] = useState<{ name: string; price: number; description: string; image_url: string; }[]>([]);
    const [menuLoading, setMenuLoading] = useState(true)
    useEffect(() => {
        const getHotItems = async () => {
            const items = await fetchHotItems().finally(() => setMenuLoading(false));
            if (Array.isArray(items)) {
                setHotItems(items);
            }
        };
        getHotItems();

    }, []);
    const [selectedItems, setSelectedItems] = useState<{ name: string; price: number; amount: number }[]>([])
    const [menuSliderData, setMenuSliderData] = useState<{ name: string; price: number; amount: number }[]>([])

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
                            <div className={css.buttonContainer}>
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
                                }}>+</button></div>
                        )}

                    </div>
                </div>
            </div>
        )
    })

    const fetchCategories = async () => {
        const data = await fetchCategory();
        return data
    }
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            if (Array.isArray(data)) {
                setUniqueCategories([...new Set(data.map(item => item.category))]);
            }
        };
        getCategories();
    }, []);
    const [categoryItems, setCategoryItems] = useState<
        { category: string; items: { name: string; price: number; description: string; image_url: string; category: string }[] }[]
    >([]);

    useEffect(() => {
        const fetchAllCategoryItems = async () => {
            const results = await Promise.all(
                uniqueCategories.map(async (category) => {
                    const items = await fetchItems(category) ?? [];
                    return { category, items };
                })
            );
            setCategoryItems(results);
        };
        if (uniqueCategories.length > 0) {
            fetchAllCategoryItems();
        }
    }, [uniqueCategories]);
    return (<>

        <div className={css.container}>
            <div className={css.title}>
                <h1>Today's HotList</h1> </div>
            <div className={css.items}>
                {menuLoading ? <Loading /> : hotItemsMap}
            </div>
            {categoryItems.map(({ category, items }) => {
                return (<div key={category} className={css.menuslider}>
                    <div className={css.title}>{category}</div>
                    <MenuSlider setMenuSliderData={setMenuSliderData} category={items} />
                </div>)
            })}
        </div>
        <Cart menuSliderData={menuSliderData} selectedItems={selectedItems} />
    </>
    )
}

export default Menu
