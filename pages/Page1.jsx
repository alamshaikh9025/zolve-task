import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom';


export default function Page1() {
  useEffect(() => {
    getdata();
  }, []);

  const [data, setdata] = useState([]);
  const [option, setoption] = useState({
    page: '',
    pagesize: '',
    order: "desc",
    sort: "popular",
    fromdate: '',
    todate: ''
  });

  async function getdata() {
    const url = `https://api.stackexchange.com/2.2/tags?page=${option.page}&pagesize=${option.pagesize}&order=${option.order}&sort=${option.sort}&fromdate=${option.fromdate}&todate=${option.todate}&filter=default&site=stackoverflow`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      const mappeddata = responseData.items.map(node => ({
        name: node.name,
        count: node.count
      }));

      setdata(mappeddata);
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      alert("Data not supplied properly");
    }
  }

  function handlechange(event) {
    const { name, value } = event.target;
    setoption(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <>
    <div className="page1body">
    <div className="page-container">
      <p className="title">Zolve Task 1</p>
      <div className="spacebox-pg1"></div>
      <div className="nameclass">
        <label>
          Page:
          <input
            type="number"
            name="page"
            value={option.page}
            onChange={handlechange}
          />
        </label>

        <label>
          Page Size:
          <input
            type="number"
            name="pagesize"
            value={option.pagesize}
            onChange={handlechange}
          />
        </label>

        <label>
          From Date:
          <input
            type="date"
            name="fromdate"
            value={option.fromdate}
            onChange={handlechange}
          />
        </label>

        <label>
          To Date:
          <input
            type="date"
            name="todate"
            value={option.todate}
            onChange={handlechange}
          />
        </label>

        <select
          value={option.sort}
          onChange={handlechange}
          name="sort"
          className="sort"
        >
          <option value="popular">popular</option>
          <option value="activity">activity</option>
          <option value="name">name</option>
        </select>

        <select
          value={option.order}
          onChange={handlechange}
          name="order"
          className="order"
        >
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>

        <button onClick={getdata} className="getdata">Get Data</button>
      </div>

      <Chart
        width={'1200px'}
        height={'600px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['Name', 'Count'],
          ...data.map(item => [item.name, item.count])
        ]}
        options={{
          chart: {
            title: 'Tag Count',
            subtitle: 'Tag count from Stack Overflow API'
          },
          vAxis: {
            format: '0' // Use 0 to display whole numbers
          }
        }}
      />
    </div>
    </div>
    </>
  );
}
