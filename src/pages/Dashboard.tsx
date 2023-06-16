import React from 'react'
import { getAuth } from 'firebase/auth'
import { Outlet } from 'react-router'
import InvoiceList from '../components/InvoiceList'
import { useInvoicesByUser } from '../util/db'

function Dashboard() {

  const auth = getAuth()

const {data , isLoading, error} = useInvoicesByUser(auth?.currentUser?.uid)

console.log(data)

  return (
    <>
        <InvoiceList invoiceList={data}/>
    </>
  )
}

export default Dashboard