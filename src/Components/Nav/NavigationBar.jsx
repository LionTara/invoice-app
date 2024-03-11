import React, { useState } from 'react';
// import './index.css';
import { GoldOutlined, FileTextOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { routes } from '../../Helpers/static';
import { useNavigate } from "react-router-dom";



const NavigationBar = () => {
  const [current, setCurrent] = useState('mail');
  const navigate = useNavigate();


  const onClick = (e) => {
    console.log('click ', e);
    navigate(e.key)
    setCurrent(e.key);
  };

  const items = [
    {
      label: "Create Invoice",
      icon: React.createElement(FileTextOutlined, null),
      key: routes.invoice,
    },
    {
      label: 'My Items',
      key: routes.items,
      icon: React.createElement(GoldOutlined, null),
    },
    {
      label: 'My Invoices',
      key: routes.myInvoices,
      icon: React.createElement(GoldOutlined, null),
    },
  ];
  

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  )
};

export default NavigationBar;
