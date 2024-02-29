import React, { useState, useEffect } from "react";
import fetchData from "../../APIRequests/fetchCustomerData";
import { Typography, Input } from 'antd';
// import { Input } from 'antd';


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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <>
        {data ? (
          console.log('Customers data: ', data)
        ) : (
          <p>Loading...</p>
        )}
      </>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white' }}>
        <Title level={2}>Invoice</Title>
        <div style={{ marginBottom: '20px' }}>
          <Title level={4}>Billed to:</Title>
          {data ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <p style={{ width: '100px', marginRight: '10px' }}>Name:</p>
                <Input style={{ flex: 1 }} placeholder="Name" />
              </div>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <p style={{ width: '100px', marginRight: '10px' }}>Address:</p>
                <Input style={{ flex: 1 }} placeholder="Billing address" />
              </div>
              <div style={{ display: 'flex' }}>
                <p style={{ width: '100px', marginRight: '10px' }}>Phone:</p>
                <Input style={{ flex: 1 }} placeholder="Phone No." />
              </div>            
            </div>
          ) : (
            <p>Loading customer information...</p>
          )}
        </div>
      </div>

    </div>

  );
};

export default CustomersData;