import React from 'react';

const Total = ({ invoice }) => {
    return (
        <div className='totals-container'>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '350px' }}>
                <h4>Total VAT Value: {invoice?.totalVatAmount.toFixed(2)} Leke</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '350px' }}>
                <h4>Total To Pay: {invoice?.totalAmount.toFixed(2)} Leke</h4>
            </div>
        </div>
    );
}



export default Total;
