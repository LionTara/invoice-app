import React, { useState, useEffect } from "react";
import fetchData from "../../APIRequests/fetchCustomerData";
import { Typography, Input } from 'antd';

const { Title } = Typography;

const CustomersData = ({invoice,setInvoice}) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <>
        <div style={{ borderRight: '1px solid #ccc', backgroundColor: 'white' }}>
          <div style={{ paddingLeft: '20px' }}>
            <Title level={4}>Billed to:</Title>
          </div>
        </div>
        <div style={{ borderRight: '1px solid #ccc', backgroundColor: 'white' }}>
          <div style={{ marginBottom: '20px', padding: '20px' }}>
            {/* {data ? ( */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <p style={{ width: '100px', marginRight: '10px' }}>Full Name:</p>
                  <Input style={{ flex: 1 }} placeholder="Name Surname" />
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
            {/* ) : ( */}
              {/* <p>Loading customer information...</p> */}
            {/* )} */}
          </div>
        </div>
      </>
    </div>
  );
};

export default CustomersData;