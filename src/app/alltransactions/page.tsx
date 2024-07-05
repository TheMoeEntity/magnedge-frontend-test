import { getAllTransactions } from '@/actions/fetch/getAllTransactions'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Link from 'next/link'
import React from 'react'
export type transaction = {
    _id: string,
    userId: string,
    transactionType: 'Debit' | 'Credit',
    transactionAmount: number,
    transactionStatus: 'completed' | 'pending' | 'cancelled' | 'in progress',
    receiverName: string,
    bankName: string,
    transactionName: 'Withdrawal' | 'Transfer' | 'Deposit',
    accountBalance: number,
    transactionDate: string,
    createdAt: string,
    updatedAt: string,
    __v: 0
}
const AllTransactions = async () => {
    const transactions = await getAllTransactions()
    console.log(transactions)
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-242.5">
                <Breadcrumb pageName="All Transactions" />
            </div>
            <table className="w-full text-sm text-left rtl:text-right ">

                <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-white">
                    View All transactions
                    <p className="mt-1 text-sm font-normal text-gray-500">Browse a list of our products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Transaction ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Transaction amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Transaction type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Transaction status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Transaction name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Receivers name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Balance
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.data && transactions.data.map((user) => (
                            <tr key={user._id} className="bg-white border-b ">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <Link className='font-bold underline' href={'/alltransactions/' + user._id}>
                                        {user._id}
                                    </Link>
                                </th>
                                <td className="px-6 py-4">
                                    {user.transactionAmount}
                                </td>
                                <td className="px-6 py-4">
                                    {user.transactionType}
                                </td>
                                <td className="px-6 py-4">
                                    {user.transactionStatus}
                                </td>
                                <td className="px-6 py-4">
                                    {user.transactionName}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {user.receiverName}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {user.accountBalance}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </DefaultLayout>
    )
}

export default AllTransactions