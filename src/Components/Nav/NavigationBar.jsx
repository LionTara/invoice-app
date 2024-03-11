import React, { useState } from 'react';
import { GoldOutlined, FileTextOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { routes } from '../../Helpers/static';
import { useNavigate } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";





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
      icon: <IoCreateOutline />
    },
    {
      label: 'My Items',
      key: routes.items,
      icon: React.createElement(GoldOutlined, null),
    },
    {
      label: 'My Invoices',
      key: routes.myInvoices,
      icon: <LiaFileInvoiceSolid />

    },
  ];


  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  )
};

export default NavigationBar;
