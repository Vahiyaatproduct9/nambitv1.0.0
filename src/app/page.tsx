'use client'
import { useEffect, useState } from 'react';
import Loading from './Loading'
import Main from './main';
import { AnimatePresence } from 'framer-motion';
export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  return (
    <AnimatePresence>
      {loading ? <Loading key={'loading'} /> : <Main key={'main'} />}
    </AnimatePresence>
  );
}