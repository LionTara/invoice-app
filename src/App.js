import React from 'react';
import CustomersData from './Components/Customers/CustomersData';
import ItemsData from './Components/Items/ItemsData';
import InvoicesData from './Components/Invoices/InvoicesData';


function App() {
  return (
    <>
      <main>
        <header>
          <div>
            <h2>Invoice</h2>
          </div>
          <div>
            <ul>
              <li>Print</li>
              <li>Download</li>
              <li>Send</li>
            </ul>
          </div>
        </header>
        <div>
          <CustomersData />
        </div>
        <div>
          <ItemsData />
        </div>
        <div>
          <InvoicesData />
        </div>

      </main>
    </>
  );
}

export default App;
