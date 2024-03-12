
const fetchData = async () => {
  try {
    const response = await fetch('http://sad1.ivaelektronik.com:8081/api/Invoices', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};


export const createInvoiceRequest = async (invoice) => {
  try {
    const response = await fetch('http://sad1.ivaelektronik.com:8081/api/Invoices', {
      method: 'POST',
      body: JSON.stringify(invoice),
      headers: {
        'Accept': '*/*',
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


export default fetchData;
