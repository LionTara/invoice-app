import React from 'react';

const Total = ({ invoice }) => {
        return (
            <div>
                <h2 className='font-bold'>Total VAT Value: {invoice?.totalVatAmount.toFixed(2)} Leke</h2>
                <h2>Total To Pay: {invoice?.totalAmount.toFixed(2)} Leke</h2>
            </div>
        );
    }



export default Total;
