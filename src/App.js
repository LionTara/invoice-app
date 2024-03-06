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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',backgroundColor:"red" }}>
            <div style={{ display: "flex", justifyContent: "left", paddingLeft: '20px', paddingRight: '20px' }}>
              <CustomersData />
            </div>

          </div>
          <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <InvoicesData />
          </div>
          <div>
              <Total />
            </div>
        </div>

      </main>
</>
  );
}

export default App;
