"use client"
import React, { ReactNode, Suspense } from 'react'

import { Toaster } from 'react-hot-toast'

import { usePathname } from 'next/navigation'


const Template = ({ children }: { children: ReactNode }) => {


    return (
        <>
            <Toaster
                toastOptions={{
                    style: {
                        zIndex: '99999',
                    }
                }}
            />
            {children}
        </>
    )
}

export default Template