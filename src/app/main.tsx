'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Menu from '@/components/menu'
import css from '../css/main.module.css'
import Footer from '../components/Footer'

const Main = () => {
    return (
        <motion.div className={css.container} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Header />
            <Hero />
            <Menu />
            <Footer />
        </motion.div>
    )
}

export default Main
