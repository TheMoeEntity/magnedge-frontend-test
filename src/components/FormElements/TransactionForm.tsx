'use client'
import { Helpers } from '@/lib/Helpers'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../common/Spinner'
import { transactions } from '@/actions/users/transactions'

const TransactionForm = () => {
    const [currentNetwork, setCurrentNetwork] = useState<string>('MTN')
    const [done, setDone] = useState<boolean>(true)
    const [type, setType] = useState<string>('Deposit')
    const [denomination, setDenomination] = useState<string>('100')
    const [quantity, setQuantity] = useState<number | string>(1)
    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const target = event.target as HTMLFormElement
        const formData = {
            transactionName: type,
            transactionStatus: 'completed',
            transactionDate: new Date().toLocaleDateString(),
            receiverName: (target[1] as HTMLInputElement).value,
            bankName: (target[2] as HTMLInputElement).value,
            transactionAmount: quantity,
            transactionType: "Debit",

        }
        console.log(formData)
        setDone(false)
        try {
            const response = await transactions(formData)
            if (response.status === 'success') {
                toast.success(response.message, { duration: 5000 })
            } else {
                toast.error(response.message, { duration: 5000 })
            }

        } catch (err) {
            console.log(err)
            toast.error('An error occured')
        } finally {
            setDone(true);
        }


    }
    return (
        <form onSubmit={event => submitForm(event)} className="flex py-12 md:py-8 text-sm flex-col gap-5 md:p-8">
            <Spinner done={done} />
            <h1 className='text-2xl font-medium'>SEND MONEY</h1>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-lg font-medium'>Transaction Type:</label>
                <select
                    onChange={e => { setType((e.target as HTMLSelectElement).value) }}
                    className="custom-select outline-none w-full p-3 bg-transparent border-b-[1px]"
                    style={{ width: "100%", padding: '10px 10px', color: 'gray', border: '1px solid #eef5ff' }}
                >
                    <option disabled>Select Network</option>
                    <option>{"Deposit"}</option>
                    <option>{"Transfer"}</option>
                    <option>{"Withdrawal"}</option>
                </select>
            </div>
            <div className='flex flex-col gap-3 flex-1'>
                <label htmlFor="" className='text-md font-medium'>Receivers name</label>
                <input type="text" readOnly placeholder={`Enter Receivers name`} className='w-full flex-1 py-3 bg-transparent outline-none border-b-[1px]' />
            </div>
            <div className='flex flex-col gap-3 flex-1'>
                <label htmlFor="" className='text-md font-medium'>Bank name</label>
                <input type="text" placeholder={`Enter Bank name`} className='w-full flex-1 py-3 bg-transparent outline-none border-b-[1px]' />
            </div>
            <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-lg font-medium'>Transaction Amount:</label>
                <input type="number" min={1} value={quantity} onChange={e => setQuantity((e.target.value))} className='border-b-[1px] p-2 outline-none' name="" id="" />
            </div>
            <div className="mx-auto w-fit">
                <button type="submit" className="bg-[#1C2436] rounded-md text-white px-12 py-3">PROCEED</button>
            </div>
        </form>
    )
}

export default TransactionForm