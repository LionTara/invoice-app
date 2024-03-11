import React, { useState } from 'react';
import NavigationBar from './Components/Nav/NavigationBar'
import InvoicePage from './Pages/InvoicePage/InvoicePage';
import ItemsPage from './Pages/ItemsPage/ItemsPage';
import { routes } from './Helpers/static';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyInvoicesPage from './Pages/MyInvoicesPage/MyInvoicesPage';



function App() {

  return (
    <>
      <BrowserRouter>
        <main>
          <header>
            <div>
            </div>
          </header>
          <NavigationBar />
          <div className='wrapper'>
          <Routes>
            <Route path={routes.invoice} element={<InvoicePage />} />
            <Route path={routes.items} element={<ItemsPage />} />
            <Route path={routes.myInvoices} element={<MyInvoicesPage />} />
          </Routes>
          </div>
        </main>
      </BrowserRouter>

    </>
  );
}

export default App;
