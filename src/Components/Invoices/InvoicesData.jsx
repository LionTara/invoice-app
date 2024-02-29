import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchData from "../../APIRequests/fetchInvoicesData";
import { Button, Form, Input, Popconfirm, Table } from 'antd';

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
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
      name: emptyObject,
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
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      editable: true,
    },
    {
      title: 'TVSH',
      dataIndex: 'vatRate',
      editable: true,
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `.`,
      price: 0,
      vatRate: 0.2,
      totalPrice: null
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const calculateTotal = (item) => {
    let totalPrice = (parseFloat(item.price ?? 0) * parseFloat(item.vatRate ?? 0)) + parseFloat(item.price ?? 0);
    console.log({ item, totalPrice });
    return {
      ...item,
      totalPrice
    };
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const modifiedItem = calculateTotal(row);
    newData.splice(index, 1, modifiedItem);
    console.log({ modifiedItem, newData, row });
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
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
      {/* <div>
        {data ? (
          <div>
            {console.log('Invoices data: ', data)}
            <ul>
              {data.map(invoice => (
                <li key={invoice.id}>{invoice.invoiceLines.itemName} - ${invoice.price}</li>

              ))}
            </ul>
            <div>
              <p> {data[1].itemName}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
    </>
  );
};

export default InvoicesData;
