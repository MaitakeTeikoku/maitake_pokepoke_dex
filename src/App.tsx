import { useState, useEffect } from 'react'

function App() {
  const gasUrl = "https://script.google.com/macros/s/AKfycbxT5iaocweZFKTm7O-qdFhmdk24SRzgm0kR7RQpl7mARzlXYxUX9jK4Md8uFRQ0tNNtAQ/exec";

  const [data, setData] = useState<[]>([]);

  useEffect(() => {
    const fetchGAS = async () => {
      const response = await fetch(gasUrl);
      const data = await response.json();
      console.log(data);
      setData(data);
    }

    fetchGAS();
  }, []);

  return (
    <>
      {data.map((item) => (
        <div key={item[0]}>
          <img src={`https://lh3.google.com/u/0/d/${item[3]}`} alt={item[1]} />
        </div>
      ))}
    </>
  )
}

export default App
