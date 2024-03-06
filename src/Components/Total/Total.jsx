import React from 'react';

const Total = ({ items }) => {
    if (items) {
        // Calculate total without VAT, total VAT value, and total to pay
        const calculateTotals = () => {
            let totalWithoutVAT = 0;
            let totalVAT = 0;
            let totalToPay = 0;

            items.forEach(item => {
                const price = parseFloat(item.price || 0);
                const quantity = parseInt(item.quantity || 0);
                const vatRate = parseFloat(item.vatRate || 0);

                const totalPrice = price * quantity;
                const totalVATValue = totalPrice * vatRate;

                totalWithoutVAT += totalPrice;
                totalVAT += totalVATValue;
                totalToPay += totalPrice + totalVATValue;
            });

            return {
                totalWithoutVAT,
                totalVAT,
                totalToPay
            };
        };

        const { totalWithoutVAT, totalVAT, totalToPay } = calculateTotals();

        return (
            <div>
                <h2>Total Without VAT: {totalWithoutVAT.toFixed(2)} Leke</h2>
                <h2>Total VAT Value: {totalVAT.toFixed(2)} Leke</h2>
                <h2>Total To Pay: {totalToPay.toFixed(2)} Leke</h2>
            </div>
        );
    }


};

export default Total;
