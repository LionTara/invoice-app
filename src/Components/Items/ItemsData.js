import React, {useState, useEffect} from "react";
import fetchData from '../../APIRequests/fetchItemsData';

const UserData = () => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        const fetchedData = await fetchData();
        setData(fetchedData);
      };
  
      getData();
    }, []);
  
    return (
      <div>
        {data ? (
          console.log('Items data: ', data)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  
  export default UserData;