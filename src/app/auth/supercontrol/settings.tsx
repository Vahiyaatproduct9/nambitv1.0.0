import React, { useEffect, useState } from 'react'
import css from './settings.module.css'
import { fetchItems } from '@/logic/processedData'
import { addItem, deleteItem } from '@/api/adminaction'
export default function Settings() {
    const [items, setItems] = useState<Items[]>([])
    const [isAdd, setIsAdd] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    type Items = {
        category: string;
        categoryItems: {
            id: number;
            name: string;
            price: string;
            category: string;
            description: string;
            image_url: string;
            is_available: boolean;
            created_at: Date;
        }[]
    }
    useEffect(() => {
        const seeItems = async () => {
            const x = await fetchItems()
            setItems(x as Items[] || [])
        }
        seeItems()
    }, [])
    const categoryBoxes = () => {
        const boxes = items.map(item => {
            const itemBoxes = () => {
                return item.categoryItems.map(item => {
                    return (
                        <div key={item.id} className={css.item}>
                            <div className={css.itemImage}>
                                <img src={item.image_url || '/table.jpg'} />
                            </div>
                            <div className={css.itemInfo}>
                                <div className={css.itemInfoName}>
                                    <div>{item.name}</div>
                                    <div>₹{item.price}</div>
                                </div>
                                <div className={css.itemInfoDesc}>
                                    <div>{item.description}</div>
                                    <button onClick={() => {
                                        deleteItem(item.id.toString(), item.image_url)
                                        setItems(items.filter(i => i.category !== item.category))
                                    }}>Delete</button>
                                </div>
                            </div>
                        </div>)
                })
            }
            return (
                <div key={item.category} className={css.category}>
                    <div className={css.categoryHead}>
                        <span>{item.category}</span>
                    </div>
                    <div className={css.itemContainer}>
                        {itemBoxes()}
                    </div>
                </div>
            )
        })
        return boxes
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get('name')?.toString()
        const price = formData.get('price')?.toString()
        const description = formData.get('description')?.toString()
        const category = formData.get('category')?.toString()
        if (name !== undefined && price !== undefined && description !== undefined && category !== undefined) {
            const data = await addItem(file, name, price, description, category)
        }
        setIsAdd(false)
        setFile(null)
        const x = await fetchItems()
        setItems(x as Items[] || [])
    }
    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        setFile(file || null)
    }
    const addItemBox = () => {
        return (
            <div className={css.addItemBox}>
                <form onSubmit={handleSubmit}>
                    <span>Add Item</span>
                    {file ? <div className={css.uploadImage}>
                        <img src={URL.createObjectURL(file)} />
                    </div> : <button type='button' onClick={() => {
                        document.getElementById('image')?.click()
                    }}>Choose Image</button>}
                    <input type='file' onChange={handleImage} hidden name='image' id='image' itemType='image/*' required />
                    <input type='text' name='name' placeholder='Name' required />
                    <input type='number' name='price' placeholder='Price' required />
                    <input type='text' name='description' placeholder='Description' required />
                    <input type='text' name='category' placeholder='Category' required />
                    <button>Add</button>
                </form>
            </div>
        )
    }
    return (
        <div className={css.container}>
            <div className={css.head}>
                <span>Add new Item:</span>
                <div className={css.newcategory}>
                    {isAdd ? addItemBox() : null}
                    <button onClick={() => { setIsAdd(!isAdd) }} style={{ background: isAdd ? 'orangered' : 'orange' }}>{!isAdd ? '+ New' : 'Close'}</button>
                </div>
            </div>
            <div className={css.body}>
                {categoryBoxes()}
            </div>
        </div>
    )
}
