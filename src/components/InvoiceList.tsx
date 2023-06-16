import { getAuth } from 'firebase/auth'
import React from 'react'
import {useInvoices, useInvoicesByUser} from '../util/db'
// import * as dayjs from 'dayjs'

type invoice = {
    id: string,
    fee: number,
    date: string,
    venue: string,
    band: string
}

type invoiceListProps = {
    invoiceList: invoice[]
}

function InvoiceList(props: invoiceListProps) {

  const {invoiceList} = props


    const auth = getAuth()

    // const {
    //     data: invoices, 
    //     isLoading: isInvoicesLoading, 
    //     error: invoicesError
    // } = useInvoicesByUser(auth?.currentUser?.uid)


  return (
    <div>
<h1> invoices</h1>
     {invoiceList?.map((invoice) => {
          return (
              <div key={invoice.id}>
                  <p>{invoice.id}</p>
                  <p>{invoice.fee}</p>
                  {/* <p>{dayjs(invoice.date).format('ddd DD-MM-YYYY')}</p> */}
                  <p>{invoice.venue}</p>
                  <p>{invoice.band}</p>
              </div>
          )
     })

     } 
    </div>
  )
}

export default InvoiceList