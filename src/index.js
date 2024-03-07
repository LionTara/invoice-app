import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './input.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#000000',
        },
      }}
    > */}
      {/* <StyleProvider hashPriority="high"> */}
        <App />
      {/* </StyleProvider> */}
    {/* </ConfigProvider> */}
  </React.StrictMode>,
);

