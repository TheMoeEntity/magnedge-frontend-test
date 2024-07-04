import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Link from 'next/link'
import React from 'react'

const Forbidden = () => {
    return (

        <DefaultLayout>
            <Breadcrumb pageName="ACCESS RESTRICTED" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className='flex justify-center items-center min-h-screen text-[var(--ditco-primary)'>
                    <div className="flex flex-col justify-center items-center text-center gap-8 leading-tight text-[var(--ditco-primary)]">
                        <h1 className='text-9xl font-bold text-[var(--ditco-tertiary)]'>403</h1>
                        <h1 className='text-5xl font-bold'>ACCESS DENIED</h1>
                        <h2 className='text-xl px-3'>The page you are looking for is restricted to only admins</h2>
                        <Link href={'/'} className='bg-[#1C2435] rounded-md w-fit text-white px-5 py-5'>GO TO DASHBOARD</Link>
                    </div>
                </div>
            </div>
        </DefaultLayout>

    )
}

export default Forbidden