import { Input } from 'antd';
import React, { useState } from 'react';

const Total = ({ invoice }) => {
    const [discount, setDiscount] = useState(0); 

    const handleDiscountChange = (e) => {
        const discountValue = parseFloat(e.target.value);
        setDiscount(isNaN(discountValue) ? 0 : discountValue); 
    };

    const totalToPay = invoice?.totalAmount - (invoice?.totalAmount * discount / 100);

    return (
        <div className='totals-container'>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '350px' }}>
                <h4>Total VAT Value: {invoice?.totalVatAmount.toFixed(2)} Leke</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '350px' }}>
                <h4>Total To Pay: {totalToPay.toFixed(2)} Leke</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '350px' }}>
                <div className="form-control">
                    <p>Discount:</p>
                    <Input addonAfter="%" onChange={handleDiscountChange} />
                </div>            
            </div>
        </div>
    );
}

export default Total;
