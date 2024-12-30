```javascript
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const MyComponent = () => {
  const [mounted, setMounted] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setMounted(true);
    const fetchData = async () => {
      try {
        const response = await fetch('someUrl');
        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      setMounted(false);
      console.log('Cleanup function executed');
      // Additional cleanup logic here
    };
  }, []);

  if (!mounted) return null;

  return (
    <View>
      {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Loading...</Text>}
    </View>
  );
};

export default MyComponent; 
```