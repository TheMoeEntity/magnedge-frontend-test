import { transaction } from '@/app/alltransactions/page'
import React from 'react'

const SingleTransactionForm = ({ id, data }: { id: string, data: transaction | null }) => {
    return (
        <form className="flex py-12 md:py-8 text-sm flex-col gap-5 md:p-8">
            <h1 className='text-2xl font-medium'>TRANSACTION ID</h1>
            <h1 className='text-md font-medium'>{id}</h1>
            <div className='flex flex-col gap-3 flex-1'>
                <label htmlFor="" className='text-md font-medium'>Receivers name</label>
                <input type="text" readOnly defaultValue={data?.receiverName} placeholder={`Enter Receivers name`} className='w-full flex-1 py-3 bg-transparent outline-none border-b-[1px]' />
            </div>
            <div className='flex flex-col gap-3 flex-1'>
                <label htmlFor="" className='text-md font-medium'>Bank name</label>
                <input type="text" readOnly defaultValue={data?.bankName} placeholder={`Enter Receivers name`} className='w-full flex-1 py-3 bg-transparent outline-none border-b-[1px]' />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-lg font-medium'>Transaction Amount:</label>
                <input type="text" defaultValue={data?.transactionAmount} readOnly className='border-b-[1px] p-2 outline-none' name="" id="" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-lg font-medium'>Transaction Status:</label>
                <input type="text" defaultValue={data?.transactionStatus} readOnly className='border-b-[1px] p-2 outline-none' name="" id="" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-lg font-medium'>Transaction Type:</label>
                <input type="text" defaultValue={data?.transactionType} readOnly className='border-b-[1px] p-2 outline-none' name="" id="" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-lg font-medium'>Transaction Date:</label>
                <input type="text" defaultValue={data?.transactionDate} readOnly className='border-b-[1px] p-2 outline-none' name="" id="" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-lg font-medium'>Balance:</label>
                <input type="text" defaultValue={data?.accountBalance} readOnly className='border-b-[1px] p-2 outline-none' name="" id="" />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-lg font-medium'>Transaction Name:</label>
                <input type="text" defaultValue={data?.transactionName} readOnly className='border-b-[1px] p-2 outline-none' name="" id="" />
            </div>
        </form>
    )
}

export default SingleTransactionForm