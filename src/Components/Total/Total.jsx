import React from 'react';

const Total = ({ invoice }) => {
        // Calculate total without VAT, total VAT value, and total to pay
        return (
            <div>
                {/* <h2>Total Without VAT: {invoice?.totalWithoutVAT.toFixed(2)} Leke</h2> */}
                <h2 className='font-bold'>Total VAT Value: {invoice?.totalVatAmount.toFixed(2)} Leke</h2>
                <h2>Total To Pay: {invoice?.totalAmount.toFixed(2)} Leke</h2>
            </div>
        );
    }



export default Total;
