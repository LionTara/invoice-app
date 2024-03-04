import React from 'react';
import CustomersData from './Components/Customers/CustomersData';
// import ItemsData from './Components/Items/ItemsData';
import InvoicesData from './Components/Invoices/InvoicesData';
import Total from './Components/Total/Total';


function App() {
  return (
    <>
      <main>
        <header>
          <div>
            <h2>Invoice</h2>
          </div>
        </header>
        <div>
          <CustomersData />
        </div>
        <div>
          <InvoicesData />
        </div>
        <div>
          <Total />
        </div>
      </main>
    </>
  );
}

export default App;
