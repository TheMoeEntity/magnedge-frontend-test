'use client'
import { deleteUser } from '@/actions/admin/deleteUser';
import { tableType } from '@/app/users/page'
import { useConfirmBox } from '@/lib/context/confirmbox';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const UsersTable = ({ users }: { users: tableType[] }) => {
    const [show, setShow] = useState<boolean>(false)
    const deleteAction = async (id: string) => {
        console.log('sfsfsfsfsfsf')
        await deleteUser(id).then((data) => {
            if (data.status == 'success') {
                toast.success(data.message, { duration: 5000 })
            } else {
                toast.error(data.message, { duration: 5000 })
            }
        })
            .catch(err => {
                toast.error(err)
            })
    }
    const [userId, setUserId] = useState<string>('')
    return (
        <div className="flex flex-col w-full shadow-md overflow-x-scroll rounded-lg">
            <table className="w-full rounded-lg  max-w-full min-w-full text-sm text-left rtl:text-right ">
            {
                show && (
                    <div className="fixed top-0 flex flex-col justify-center items-center left-0 w-full h-full bg-[rgba(0,0,0,0.7)] z-[99999]">
                        <div className="bg-white  w-fit min-w-[350px] pt-5 rounded shadow-lg">
                            <p className='px-3 py-3 text-lg'>Confirm action</p>
                            <hr />
                            <p className="mb-4 p-5 text-center border-black border-t-[0.5px]">
                                Are you sure you want to delete this user?
                            </p>
                            <hr />
                            <div style={{ paddingRight: '20px' }} className="flex justify-end py-3 space-x-4 ">
                                <button
                                    onClick={() => setShow(false)}
                                    className="px-4 py-2 bg-[#1C2435] text-white rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    style={{ backgroundColor: 'red', marginLeft: '15px' }}
                                    className="px-4 py-2 ml-2 bg-red text-white rounded"
                                    onClick={() => {
                                        deleteAction(userId);
                                        setShow(false)
                                    }}
                                >
                                    DELETE
                                </button>

                            </div>
                        </div>
                    </div>
                )
            }

            <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-white">
                Delete Users
                <p className="mt-1 text-sm font-normal text-gray-500">Browse a list of our products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Full name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Customer ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                        <span>ACTION</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => (
                        <tr key={user._id} className="bg-white border-b ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.firstname + " " + user.lastname}
                            </th>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.customerId}
                            </td>
                            <td className="px-6 py-4">
                                {user.role}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() => { setUserId(user.customerId); setShow(true) }} className="font-medium text-red hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}

export default UsersTable