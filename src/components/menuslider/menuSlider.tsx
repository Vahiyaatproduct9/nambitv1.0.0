import React, { useEffect, useState } from 'react'
import css from './menuslider.module.css'
type MenuItem = { name: string, price: number, description: string, image_url: string, category: string };
type items = { name: string, price: number, amount: number }

function MenuSlider(props: { category: MenuItem[], setMenuSliderData: React.Dispatch<React.SetStateAction<items[]>> }) {
    const [selected, setSelected] = useState<items[]>([])
    useEffect(() => {
        let varSelected = selected.filter(item => item.amount !== 0)
        props.setMenuSliderData(prev => {
            // Get all item names that belong to this slider's category
            const categoryItemNames = new Set(props.category.map(item => item.name));

            // Filter out items from the previous state that belong to this slider
            const otherSlidersItems = prev.filter(item => !categoryItemNames.has(item.name));

            // Combine items from other sliders with the new selected items from this slider
            return [...otherSlidersItems, ...varSelected];
        });
    }, [selected, props.setMenuSliderData, props.category]);
    const boxes = () => {
        return props.category.map((item, index) => { // Use map to create an array of JSX elements
            const selectedItem = selected.find(selected => selected.name === item.name);

            const handleAdd = () => {
                setSelected(prev => {
                    const itemInArray = prev.find(it => it.name === item.name);
                    if (itemInArray) {
                        // If item is already in the array (must be with amount 0), increment its amount
                        return prev.map(it => it.name === item.name ? { ...it, amount: it.amount + 1 } : it);
                    } else {
                        // If item is not in the array, add it
                        return [...prev, { name: item.name, price: item.price, amount: 1 }];
                    }
                });
            }
            const handlePlus = () => {
                setSelected(prev => prev.map(it => it.name === item.name ? { ...it, amount: it.amount + 1 } : it));
            }
            const handleMinus = () => {
                setSelected(prev => prev.map(it => it.name === item.name ? { ...it, amount: it.amount - 1 } : it));
            }

            return (
                <div key={index} className={css.itemContainer}>
                    <div className={css.itemImage} style={{ backgroundImage: item.image_url !== '' ? `url(${item.image_url})` : 'url(/table.jpg)' }} />
                    <div className={css.itemDetails}>
                        <div className={css.itemName}>
                            <h1>{item.name}</h1>
                            <span>₹{item.price}</span>
                        </div>
                        <div className={css.subs}>
                            {selectedItem && selectedItem?.amount > 0 ? (
                                <div className={css.buttonContainer}>
                                    <button onClick={handleMinus}>-</button>
                                    {selectedItem.amount}
                                    <button onClick={handlePlus}>+</button>
                                </div>
                            ) : (
                                <button onClick={handleAdd}>Add</button>
                            )}
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className={css.container}>
            {boxes()}
        </div>
    )
}

export default MenuSlider
