import React, { useContext, useEffect, useRef, useState } from 'react';

import { Form, Input, InputNumber, Popconfirm, Table } from 'antd';
import { PlusCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import fetchData from "../../APIRequests/fetchInvoicesData";
import Total from '../Total/Total';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {dataIndex === 'quantity' ? (
          <InputNumber ref={inputRef} min={1} onPressEnter={save} onBlur={save} />
        ) : (
          <Input ref={inputRef} min={1} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const emptyObject = '.'

const InvoicesData = () => {

  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      number: 1,
      code: null,
      name: emptyObject,
      quantity: 0,
      price: 0,
      vatRate: 0.2,
      totalPrice: null
    },
  ]);

  const [data, setData] = useState(null);

  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: '',
      dataIndex: 'number',
      width: '5%',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      width: '15%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
      width: '20%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true,
      width: '15%',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      editable: true,
      width: '10%',
    },
    {
      title: 'VAT Category',
      dataIndex: 'vatRate',
      editable: true,
    },
    {
      title: 'Total with VAT',
      dataIndex: 'totalPrice',
      width: '20%',
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '5%',

      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <CloseCircleFilled
              style={{ fontSize: '15px', color: 'grey' }}
            />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      number: count,
      code: null,
      name: `.`,
      quantity: 0,
      price: 0,
      vatRate: 0.2,
      totalPrice: null
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const calculateTotal = (item) => {
    let totalPrice = ((parseFloat(item.price ?? 0) * parseFloat(item.vatRate ?? 0)) + parseFloat(item.price ?? 0)) * parseInt(item.quantity ?? 0);
    totalPrice = totalPrice.toFixed(2)
    return {
      ...item,
      totalPrice
    };
  };

  // handle save on creating new row or on cells' value change
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const updatedItem = { ...newData[index], ...row };
    newData.splice(index, 1, updatedItem);

    const modifiedItem = calculateTotal(row);
    newData.splice(index, 1, modifiedItem);
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);


  return (
    <>
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          footer={() => (
            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "none" }}>
              <PlusCircleFilled
                onClick={handleAdd} type="primary"
                style={{ fontSize: '23px', color: '#1677ff' }}
              />
            </div>
          )}
        />
      </div>

      <Total items={dataSource} />

    </>
  );
};

export default InvoicesData;
