import React, { useState, useEffect } from "react";
import fetchData from '../../APIRequests/fetchInvoicesData';
import { Table, Typography } from 'antd';

const MyInvoicesPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);
  console.log('Invoices data: ', data);


  const invoicesColumns = [
    {
      title: 'No.',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Customer',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Created By',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Date Created',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Is Paid',
      dataIndex: 'isPaid',
      key: 'isPaid',
    },
  ];

  return (
    <>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
        <Table className="customer" dataSource={data} columns={invoicesColumns} />
      </div>
    </>
  );
};

export default MyInvoicesPage