import React, { useState } from 'react';
import CustomersData from './Components/Customers/CustomersData';
// import ItemsData from './Components/Items/ItemsData';
import InvoicesData from './Components/Invoices/InvoicesData';
import Total from './Components/Total/Total';
import { Button } from 'antd';
import { createInvoice, createInvoiceRequest } from './APIRequests/fetchInvoicesData';


function App() {
  const [invoice, setInvoice] = useState({
    "invoiceDate": "2024-03-06T21:10:56.579Z",
    "invoiceNumber": "string",
    "customerId": 0,
    "totalAmount": 0,
    "totalVatAmount": 0,
    "totalDiscountAmount": 0,
    "isPaid": true,
    "notes": "string",
    "user": "string",
    "invoiceLines": [
      {
        "itemId": 0,
        "itemName": "string",
        "itemCode": "string",
        "vatRate": 0,
        "quantity": 0,
        "uom": "string",
        "unitPrice": 0,
        "discountPercent": 0,
        "notes": "string"
      }
    ]
  })

  console.log({ invoice })
  const submitInvoice=()=>{
    createInvoiceRequest(invoice)
  }

  return (
    <>
      <main>
        <header>
          <div>
            <h2 className='text-3xl'>Invoice</h2>
          </div>
        </header>
        <div>
          <div><Button type="primary" onClick={submitInvoice}>Save</Button></div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: "flex", justifyContent: "left", paddingLeft: '20px', paddingRight: '20px' }}>
              <CustomersData invoice={invoice} setInvoice={setInvoice} />
            </div>

          </div>
          <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <InvoicesData invoice={invoice} setInvoice={setInvoice} />
          </div>
          <div>
            <Total invoice={invoice} setInvoice={setInvoice} />
          </div>
        </div>

      </main>
    </>
  );
}

export default App;
