import React, { useState, useEffect } from "react";
import fetchData from '../../APIRequests/fetchItemsData';
import { Table, Typography } from 'antd';

const { Title } = Typography;

const CustomersData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);
  console.log('Items data: ', data);


  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  return (
    <>
      {/* <div style={{ padding: '20px' }}>
        <Title level={4}>Items</Title>
        {data ? (
          console.log('Items data: ', data),

          <Table columns={columns} dataSource={data[0].items} pagination={false} />
        ) : (
          <p>Loading invoice items...</p>
        )}
      </div> */}
    </>
  );
};

export default CustomersData;