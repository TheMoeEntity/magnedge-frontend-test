import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getAccountDetails } from "@/actions/fetch/getAccountDetails";
import { getSessionData } from "@/actions/fetch/getSession";
import { isAdmin } from "@/actions/auth/isAdmin";
import { getAllUsers } from "@/actions/fetch/getAllUsers";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  const users = await getAllUsers()
  const usersCount = users.data?.length
  const details = await getAccountDetails()
  const fullName = await getSessionData()
  const userdata = {
    balance: details.data?.balance,
    createdAt: details.data?.createdAt,
    updatedAt: details.data?.createdAt
  }
  //get user role
  const isAdminUser = await isAdmin()
  return (
    <>
      <DefaultLayout isAdmin={isAdminUser}>
        <ECommerce isAdmin={isAdminUser} fullName={fullName} usersCount={usersCount}  details={userdata} />
      </DefaultLayout>
    </>
  );
}
