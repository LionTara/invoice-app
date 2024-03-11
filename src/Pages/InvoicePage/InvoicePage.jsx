import React,{useState} from 'react'
import { createInvoiceRequest } from '../../APIRequests/fetchInvoicesData'
import { Button } from 'antd'
import CustomersData from "./Components/CustomersData"
import InvoicesData from "./Components/InvoiceItems"
import Total from "./Components/Total"
import "./invoice-style.css"
import dayjs from 'dayjs'

const InvoicePage = () => {
   const itemDefault= {
    "key":0,
    "itemId": 0,
    "itemName": "",
    "itemCode": "",
    "vatRate": 0.2,
    "quantity": '',
    "uom": "",
    "unitPrice": '',
    "discountPercent": 0,
    "notes": "string"
}

    const [invoice, setInvoice] = useState({
        "invoiceDate": "",
        "invoiceNumber": "string",
        "customerId": 0,
        "totalAmount": 0,
        "totalVatAmount": 0,
        "totalDiscountAmount": 0,
        "isPaid": true,
        "notes": "string",
        "user": "string",
        "invoiceLines": [
            itemDefault
        ]
    })

    console.log({invoice})
    const submitInvoice = () => {
        const parsedInvoice={
            ...invoice,
            invoiceDate:invoice?.invoiceDate?.$d?dayjs(invoice.invoiceDate.$d).toISOString():null
        }
        console.log({parsedInvoice})
        createInvoiceRequest(parsedInvoice)
    }

    return (
        <div className='invoice-page'>
            <h2 className='text-3xl'>Invoice</h2>
            <div><Button type="primary" onClick={submitInvoice}>Save</Button></div>
            <div style={{}}>
                <div style={{}}>
                    <CustomersData invoice={invoice} setInvoice={setInvoice} />
                </div>

            </div>
            <div style={{}}>
                <InvoicesData invoice={invoice} setInvoice={setInvoice} itemDefault={itemDefault} />
            </div>
            <div>
                <Total invoice={invoice} setInvoice={setInvoice} />
            </div>
        </div>)
}

export default InvoicePage