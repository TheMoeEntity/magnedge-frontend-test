import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import TransactionForm from '@/components/FormElements/TransactionForm'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import React from 'react'

const Transactions = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName='Transactions'></Breadcrumb>

        <div className="flex lg:min-h-[350px] rounded-lg flex-col mt-5 p-8 font-light shadow-md w-full bg-white">
          <TransactionForm />
        </div>
      </DefaultLayout>
    </>
  )
}

export default Transactions