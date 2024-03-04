import React, { useState, useEffect } from "react";
import fetchData from "../../APIRequests/fetchCustomerData";
import { Typography, Input } from 'antd';

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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '50vh' }}>
      <>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white' }}>
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
      </>
    </div>
  );
};

export default CustomersData;