'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Menu from '@/components/menu'
const Main = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Header />
            <Hero />
            <Menu />
        </motion.div>
    )
}

export default Main
