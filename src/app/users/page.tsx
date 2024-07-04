import { getAllUsers } from '@/actions/fetch/getAllUsers'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import UsersTable from '@/components/Tables/UsersTable'
import React from 'react'
export type tableType = {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    customerId: string,
    userId:string
    role: 'USER' | "ADMIN",
}
const AllUsers = async () => {
    const users = await getAllUsers().then(x => x)
    const usersTable = users.data as tableType[]
    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName="Users" />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <UsersTable users={usersTable} />
                </div>
            </DefaultLayout>
        </div>
    )
}

export default AllUsers