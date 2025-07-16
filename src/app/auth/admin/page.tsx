'use client'
import React from 'react'
import css from './admin.module.css'
import { checkAdmin } from '@/api/checkadmin'
import { useRouter } from 'next/navigation'

function Admin() {
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const user = (data.get('username'))?.toString()
        const pass = (data.get('password'))?.toString()
        const c = checkAdmin(user !== undefined ? user : '', pass !== undefined ? pass : '')
        if (c) {
            localStorage.setItem('admin', JSON.stringify({ username: user, password: pass }))
            router.push('/auth/supercontrol')
        }
        else {
            alert('Invalid username or password')
        }

    }
    return (
        <div className={css.container}>
            <div className={css.title}>Admin Login</div>
            <form onSubmit={handleSubmit}>
                <div className={css.body}>
                    <div className={css.input}>
                        <input type="text" name="username" placeholder='Username' />
                    </div>
                    <div className={css.input}>
                        <input type="password" name='password' placeholder='Password' />
                    </div>
                    <div className={css.button}>
                        <button>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Admin
