import React, { useState, useEffect } from "react";
import fetchData from "../../../APIRequests/fetchCustomerData";
import { Typography, Input, Select, DatePicker } from 'antd';
import { Dayjs } from "dayjs";
const { Title } = Typography;
const { Option } = Select;

const CustomersData = ({ invoice, setInvoice }) => {

  const [data, setData] = useState(null);
  const [cityOptions, setCityOptions] = useState([
    'Tiranë',
    'Durrës',
    'Shkodër',
    'Vlorë',
    'Korçë',
    'Fier'
  ]);

  const onDateChange = (date, dateString) => {
    console.log({ date, dateString });

    setInvoice((state) => ({ ...state, invoiceDate: date }))
  };

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

  const handleCitySearch = value => {
    if (!value) {
      setCityOptions([
        'Tiranë',
        'Durrës',
        'Shkodër',
        'Vlorë',
        'Korçë',
        'Fier'
      ]);
      return;
    }

    const filteredOptions = cityOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setCityOptions(filteredOptions);
  };


  return (
    <div className="customer" style={{ display: 'flex', flexDirection: 'column' }}>
      <>
        <div style={{}}>
          <div style={{}}>
            <Title level={4}>Billed to:</Title>
          </div>
        </div>
        <div className="form" style={{}}>
          <div className="form-control">
            <p>Full Name:</p>
            <Input placeholder="Name Surname" />
          </div>
          <div className="form-control">
            <p style={{ paddingRight: '10px', width: '90px' }}>Address:</p>
            <Input placeholder="Billing address" />
          </div>
          <div className="form-control">
            <p>City:</p>
            <Select
              className="form-input"
              showSearch
              placeholder="Select city"
              optionFilterProp="children"
              filterOption={false}
              onSearch={handleCitySearch}
            >
              {cityOptions.map(city => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-control">
            <p>Phone:</p>
            <Input placeholder="Phone No." />
          </div>
        </div>
        <div style={{}}>
          <div style={{}}>
            <Title level={4}>Invoice Data:</Title>
          </div>
        </div>
        <div className="form invoice-data">
          <div className="form-control">
            <p>Date:</p>
            <DatePicker style={{ width: "100%" }} className="form-input" onChange={onDateChange} value={invoice.invoiceDate} />
          </div>
          <div className="form-control">
            <p>Note:</p>
            <Input style={{}} placeholder="Write a note" />
          </div>
        </div>

      </>
    </div>
  );
};

export default CustomersData;