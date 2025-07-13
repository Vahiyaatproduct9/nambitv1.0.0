import React from 'react'
import css from './admin.module.css'

function Admin() {
    return (
        <div className={css.container}>
            <div className={css.title}>Admin Login</div>
            <form>
                <div className={css.body}>
                    <div className={css.input}>
                        <input type="text" placeholder='Username' />
                    </div>
                    <div className={css.input}>
                        <input type="password" placeholder='Password' />
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
