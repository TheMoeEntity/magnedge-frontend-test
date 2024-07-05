import { getSingle } from '@/actions/fetch/getSingle'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import SingleTransactionForm from '@/components/FormElements/SingleTransaction'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { notFound } from 'next/navigation'
import React from 'react'

const SingleTransaction = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params
    const data = await getSingle(slug)
    if (data.data == null) {
        notFound()
    }
    console.log(data)
    return (
        <DefaultLayout>
            <div className="mx-auto max-w-242.5">
                <Breadcrumb pageName="Single Transaction" />
            </div>
            <div className="flex lg:min-h-[350px] rounded-lg flex-col mt-5 p-8 font-light shadow-md w-full bg-white">
                <SingleTransactionForm data={data.data} id={slug} />
            </div>
        </DefaultLayout>
    )
}

export default SingleTransaction