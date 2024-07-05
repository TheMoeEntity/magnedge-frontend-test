import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className='flex justify-center items-center min-h-screen text-[var(--ditco-primary)'>
            <div className="flex flex-col justify-center items-center text-center gap-8 leading-tight text-[var(--ditco-primary)]">
                <h1 className='text-9xl font-bold text-[var(--ditco-tertiary)]'>404</h1>
                <h1 className='text-5xl font-bold'>Page Not Found</h1>
                <h2 className='text-xl px-3'>The page you are looking for doesn't exist or has been moved</h2>
                <Link href={'/'} className='bg-[#1C2435] rounded-md w-fit text-white px-5 py-5'>GO TO DASHBOARD</Link>
            </div>
        </div>
    )
}

export default NotFound