import React, { useState, useEffect } from "react";
import fetchData from '../../APIRequests/fetchItemsData';
import { Table, Typography } from 'antd';

const { Title } = Typography;

const ItemsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);
  console.log('Items data: ', data);


  const itemsColumns = [
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
      title: 'Price Per Unit',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  return (
    <>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
        <Table className="customer" dataSource={data} columns={itemsColumns} />
      </div>
    </>
  );
};

export default ItemsPage;