// 5 columns and 1000 rows

// I will use reactTable here for showing table like data.
// and its too much data to load once will cause issue or lagging
// so we can use lazy function available in react or use memo hook to memorize the values and not re-render those values again
// we can show or start from 50 rows from start on scroll and then it will go on last means 50th
// then it will load more 50 rows like streams in node.js
// and for showing i will use simple table and td tags etc.
// and use 3 map functions
// 1 for header or columns of the table
// 2nd for the showing all the records available in row from on base id or serial number
// 3rd for each cell available in each row

// it will show every record in out not because of using useMemo hook we also avoid lagging
// then closed tags and export that component
import { useState, useEffect, useMemo, useRef } from "react";

const genData = () => {
  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 30),
    email: `user${i + 1}@gmail.com`,
    country: ["JS", "JavaScript", "TypeScript", "TS", "HTML"][i % 5],
  }));
};

function App() {
  const data = useMemo(
    () => genData() /* data export here or in file data*/,
    []
  );
  // use memo hook to memorize the values and not re-render those values again

  const [showData, setShowData] = useState(data.slice(0, 50));
  const hookRef = useRef(null);
  // use lazy function available in react
  const loadMore = () => {
    if (showData.length < data.length) {
      const newData = data.slice(0, showData.length + 50);
      // we can show or start from 50 rows from start on scroll and then it will go on last means 50th
      setShowData(newData);
    }
  };

  useEffect(() => {
    hookRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );
    console.log(showData);
    const lastRow = document.querySelector("#loadMore");
    if (lastRow) hookRef.current.observe(lastRow);

    return () => hookRef.current?.disconnect();
  }, [showData]);

  return (
    <div>
      <table>
        <thead>
          {/* use 3 map functions */}
          <tr>
            {/* 1 for header or columns of the table  */}

            {["ID", "Name", "Age", "Email", "Country"].map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {showData.map((row) => (
            // 2nd for the showing all the records available in row from on base id or serial number
            <tr key={row.id}>
              {Object.values(row).map((cell, i) => (
                // 3rd for each cell available in each row
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div id="loadMore" />
    </div>
  );
}

export default App;
