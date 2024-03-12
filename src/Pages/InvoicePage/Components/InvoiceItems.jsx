import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Select, Table } from 'antd';
import { PlusCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import fetchData from "../../../APIRequests/fetchInvoicesData";
import { checkCellValue } from '../../../Helpers/utils';

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
        initialValue={record[dataIndex] === "" ? undefined : record[dataIndex]} // Render empty string as undefined for initial value
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
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {record[dataIndex] === "" ? <span style={{ color: "#bfbfbf" }}>Enter {title}</span> : children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const InvoicesData = ({ invoice, setInvoice, itemDefault }) => {

  const vatOptions =
    [
      { value: 0, label: '0%' },
      { value: 0.06, label: '6%' },
      { value: 0.1, label: '10%' },
      { value: 0.2, label: '20%' },
    ];

  const [data, setData] = useState(null);

  const handleDelete = (key) => {
    const newData = invoice.invoiceLines.filter((item) => item.key !== key);
    setInvoice((state) => ({ ...state, invoiceLines: newData }));
  };

  const defaultColumns = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: '5%',
    },
    {
      title: 'Code',
      dataIndex: 'itemCode',
      width: '15%',
      editable: true
    },
    {
      title: 'Name',
      dataIndex: 'itemName',
      editable: true,
      width: '20%',
    },
    {
      title: 'Price',
      dataIndex: 'unitPrice',
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
      title: 'VAT',
      dataIndex: 'vatRate',
      render: (record) => {
        return invoice.invoiceLines.length >= 1 ? (
          <Select
            value={invoice?.invoiceLines?.find(line => line.key == record.key)?.vatRate}
            options={vatOptions}
            onChange={(_, option) => handleSave({ ...record, vatRate: option.value })}
            showSearch
            placeholder="Select vat rate"
            optionFilterProp="children"
            filterOption={false}
          />
        ) : null
      }

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
        invoice.invoiceLines.length >= 1 ? (
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
      ...itemDefault,
      key: invoice.invoiceLines.length,
    };
    setInvoice((state) => ({ ...state, invoiceLines: [...invoice.invoiceLines, newData] }))
  };


  const calculateItemTotals = (item) => {
    let totalPrice = ((parseFloat(checkCellValue(item.unitPrice ?? 0)) * parseFloat(checkCellValue(item.vatRate ?? 0))) + parseFloat(checkCellValue(item.unitPrice ?? 0))) * parseInt(checkCellValue(item.quantity ?? 0));
    totalPrice = totalPrice.toFixed(2)
    return {
      ...item,
      totalPrice
    };
  };

  const calculateInvoiceTotals = (invoiceLines) => {
    let totalVatAmount = 0;
    let totalAmount = 0;

    invoiceLines.forEach(item => {
      const price = parseFloat(item.unitPrice || 0);
      const quantity = parseInt(item.quantity || 0);
      const vatRate = parseFloat(item.vatRate || 0);

      const totalPrice = price * quantity;
      const totalVATValue = totalPrice * vatRate;

      totalVatAmount += totalVATValue;
      totalAmount += totalPrice + totalVATValue;
    });

    return {
      totalVatAmount,
      totalAmount
    };
  };

  // handle save on creating new row or on cells' value change
  const handleSave = (row) => {
    const newData = [...invoice.invoiceLines];
    const index = newData.findIndex((item) => row.key === item.key);
    const updatedItem = { ...newData[index], ...row };
    newData.splice(index, 1, updatedItem);

    const modifiedItem = calculateItemTotals(row);
    newData.splice(index, 1, modifiedItem);
    let invoiceTotals = calculateInvoiceTotals(newData)

    setInvoice((state) => ({ ...state, invoiceLines: newData, ...invoiceTotals }));
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
          dataSource={invoice.invoiceLines}
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
    </>
  );
};

export default InvoicesData;
