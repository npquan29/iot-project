'use client'

import NavBar from "@/components/NavBar";
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import { Pagination, Input, Select } from "antd";
import axios from "axios";
import { formatISODate } from "@/helpers/formatTimeDB";

interface DataArray {
  id: number;
  temperature?: number;
  humidity?: number;
  light?: number;
  time: string;
}

const DataSensor = () => {

  const [totalItems, setTotalItems] = useState(0);
  const [dataRender, setDataRender] = useState<DataArray[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [columns, setColumns] = useState([
    { label: 'id', view: true },
    { label: 'temperature', view: true },
    { label: 'humidity', view: true },
    { label: 'light', view: true },
    { label: 'time', view: true }
  ]);

  const [options, setOptions] = useState({
    type: 'all',
    search: '',
    column: 'all',
    order: true,
    page: 1
  });

  const [loading, setLoading] = useState(true);

  // const generateRandomData = (count: number) => {
  //   const data = [];
  //   for (let i = 0; i < count; i++) {
  //     const temperature = Math.floor(Math.random() * 50) + 20; // Random từ 20 đến 70
  //     const humidity = Math.floor(Math.random() * 100); // Random từ 0 đến 100
  //     const light = Math.floor(Math.random() * 2000) + 1000; // Random từ 1000 đến 2999

  //     // Định dạng thời gian làm giả lập, bạn có thể sử dụng một thư viện như 'moment.js' để xử lý định dạng thời gian một cách chính xác hơn
  //     const currentTime = new Date().toISOString().replace('T', ' ').slice(0, 19);

  //     data.push({
  //       id: i + 1,
  //       temperature,
  //       humidity,
  //       light,
  //       time: currentTime
  //     });
  //   }
  //   return data;
  // };

  const handlePageChange = (newPage: number) => {
    setOptions(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleChangeSelect = (value: string) => {
    setOptions(prev => ({
      ...prev,
      search: '',
      column: 'all',
      type: value,
      order: true,
      page: 1
    }));
    setInputValue('');
    setColumns(prev =>
      prev.map(item => ({
        ...item,
        view: value === 'all' || item.label === 'id' || item.label === 'time' || item.label === value
      }))
    );
  };

  const handleEnterInput = (e: any) => {
    setOptions(prev => ({
      ...prev,
      search: e.target.value,
      page: 1
    }));
  }

  const handleSort = (value: string) => {
    setOptions(prev => ({
      ...prev,
      column: value,
      order: prev.column === value ? !prev.order : true,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post('http://localhost:5000/api/sensor', options);
      setTotalItems(response.data.data.totalItems);
      setDataRender(response.data.data.dataRender);
      setLoading(false);
    }

    console.log("RENDER COMPONENT");
    fetchData();
  }, [options]);

  // console.log(columns);
  // console.log(options);

  return (
    <>
      <NavBar />
      <div className="py-[30px] px-[60px]">
        {loading ? (
          <>
            <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center">Loading data...</h1>
          </>
        ) : (
          <>
            <div className="w-[80%] mx-auto">
              {/* Search and Select */}
              <div className="flex justify-between space-x-[30px]">
                <div className="flex-1">
                  <Input onPressEnter={handleEnterInput}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="font-poppin" size="large" placeholder="Search by time..." />
                </div>

                <div className="w-[15%]">
                  <Select
                    className="w-full h-full font-poppin"
                    defaultValue="All"
                    onChange={handleChangeSelect}
                    options={[
                      { value: 'all', label: 'All' },
                      { value: 'temperature', label: 'Temperature' },
                      { value: 'humidity', label: 'Humidity' },
                      { value: 'light', label: 'Light' }
                    ]}
                  />
                </div>
              </div>
              {/* End Search and Select */}

              {/* Data Table */}
              {dataRender.length > 0 ? (
                <table className="mt-[30px] bg-white border border-third border-collapse w-full sensor-table">
                  <thead>
                    <tr>
                      {columns.map((it, idx) => (
                        it.view && (
                          <th onClick={() => handleSort(it.label)} key={idx} className={`${options.column === it.label ? `bg-second text-main` : ``} uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}>{it.label}</th>
                        )
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRender.map(it => (
                      <tr key={it.id}>
                        <td>{it.id}</td>
                        {it.temperature !== undefined && (<td>{it.temperature}</td>)}
                        {it.humidity !== undefined && (<td>{it.humidity}</td>)}
                        {it.light !== undefined && (<td>{it.light}</td>)}
                        <td>{formatISODate(it.time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center uppercase">No data</h1>
              )}
              {/* End Data Table */}
            </div>

            {/* Pagination */}
            {totalItems > 0 && (
              <div className="flex justify-center mt-[30px] pagination-table">
                <Pagination current={options.page} onChange={handlePageChange} total={totalItems} showSizeChanger={false} />
              </div>
            )}
            {/* End Pagination */}
          </>
        )}
      </div>
    </>
  )
}

export default DataSensor;