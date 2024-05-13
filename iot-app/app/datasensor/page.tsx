'use client'

import NavBar from "@/components/NavBar";
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import { Pagination, Input, Select } from "antd";
import axios from "axios";
import { formatISODate } from "@/helpers/formatTimeDB";

const { Search } = Input;

interface DataArray {
  id: number;
  temperature?: number;
  humidity?: number;
  light?: number;
  randomSensor?: number;
  time: string;
}

// const DataSensor = () => {

//   const [totalItems, setTotalItems] = useState(0);
//   const [dataRender, setDataRender] = useState<DataArray[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [columns, setColumns] = useState([
//     { label: 'id', view: true },
//     { label: 'temperature', view: true },
//     { label: 'humidity', view: true },
//     { label: 'light', view: true },
//     { label: 'time', view: true }
//   ]);

//   const [options, setOptions] = useState({
//     type: 'all',
//     search: '',
//     column: 'all',
//     order: true,
//     page: 1,
//     pageSize: 10
//   });

//   const [loading, setLoading] = useState(true);

//   // const generateRandomData = (count: number) => {
//   //   const data = [];
//   //   for (let i = 0; i < count; i++) {
//   //     const temperature = Math.floor(Math.random() * 50) + 20; // Random từ 20 đến 70
//   //     const humidity = Math.floor(Math.random() * 100); // Random từ 0 đến 100
//   //     const light = Math.floor(Math.random() * 2000) + 1000; // Random từ 1000 đến 2999

//   //     // Định dạng thời gian làm giả lập, bạn có thể sử dụng một thư viện như 'moment.js' để xử lý định dạng thời gian một cách chính xác hơn
//   //     const currentTime = new Date().toISOString().replace('T', ' ').slice(0, 19);

//   //     data.push({
//   //       id: i + 1,
//   //       temperature,
//   //       humidity,
//   //       light,
//   //       time: currentTime
//   //     });
//   //   }
//   //   return data;
//   // };

//   const handlePageChange = (newPage: number) => {
//     setOptions(prev => ({
//       ...prev,
//       page: newPage
//     }));
//   };

//   const handleChangeSelect = (value: string) => {
//     setOptions(prev => ({
//       ...prev,
//       search: '',
//       column: 'all',
//       type: value,
//       order: true,
//       page: 1
//     }));
//     setInputValue('');
//     setColumns(prev =>
//       prev.map(item => ({
//         ...item,
//         view: value === 'all' || item.label === 'id' || item.label === 'time' || item.label === value
//       }))
//     );
//   };

//   const handleEnterInput = (e: any) => {
//     setOptions(prev => ({
//       ...prev,
//       search: e.target.value,
//       page: 1
//     }));
//   }

//   const handleSort = (value: string) => {
//     setOptions(prev => ({
//       ...prev,
//       column: value,
//       order: prev.column === value ? !prev.order : true,
//     }));
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       // const response = await axios.post('http://localhost:5000/api/sensor', options);
//       let api = `http://localhost:5000/api/sensor/history?type=${options.type}&column=${options.column}&order=${options.order ? 'asc' : 'desc'}&page=${options.page}&pageSize=${options.pageSize}` + `${options.search ? `&search=${options.search}` : ''}`;

//       const response = await axios.get(api);
//       setTotalItems(response.data.data.totalItems);
//       setDataRender(response.data.data.dataRender);
//       setLoading(false);
//     }

//     console.log("RENDER COMPONENT");
//     fetchData();
//   }, [options]);

//   return (
//     <>
//       <NavBar />
//       <div className="py-[30px] px-[60px]">
//         {loading ? (
//           <>
//             <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center">Loading data...</h1>
//           </>
//         ) : (
//           <>
//             <div className="w-[80%] mx-auto">
//               {/* Search and Select */}
//               <div className="flex justify-between space-x-[40px]">
//                 <div className="flex flex-1">
//                   <Input onPressEnter={handleEnterInput}
//                     value={inputValue}
//                     onChange={(e) => setInputValue(e.target.value)}
//                     className="font-poppin rounded-r-none" size="large" placeholder={`${options.type === 'all' ? 'Search all...': `Search by time or ${options.type}`}`} />
//                   {/* Button Search isn't used */}
//                   <button className="border-[1px] border-main bg-main hover:bg-third hover:border-third rounded-[8px] rounded-s-none px-3 text-second ms-[-1px]">Search</button>
//                 </div>

//                 <div className="w-[25%] font-poppin flex items-center">
//                   <span className="text-[16px]">Search by</span>
//                   <Select
//                     className="flex-1 h-full ml-[15px]"
//                     defaultValue="All"
//                     onChange={handleChangeSelect}
//                     options={[
//                       { value: 'all', label: 'All' },
//                       { value: 'temperature', label: 'Temperature' },
//                       { value: 'humidity', label: 'Humidity' },
//                       { value: 'light', label: 'Light' }
//                     ]}
//                   />
//                 </div>
//                 <div className="w-[12%] flex items-center">
//                   <span className="font-poppin text-[16px]">Limit</span>
//                   <Select
//                     className="h-full w-full font-poppin ml-[15px]"
//                     defaultValue={10}
//                     // onChange={handleChangeSelect}
//                     options={[
//                       { value: 10, label: 10 },
//                       { value: 20, label: 20 },
//                       { value: 50, label: 50 },
//                       { value: 100, label: 100 }
//                     ]}
//                   />
//                 </div>
//               </div>
//               {/* End Search and Select */}

//               {/* Data Table */}
//               {dataRender.length > 0 ? (
//                 <table className="mt-[30px] bg-white border border-third border-collapse w-full sensor-table">
//                   <thead>
//                     <tr>
//                       {columns.map((it, idx) => (
//                         it.view && (
//                           <th onClick={() => handleSort(it.label)} key={idx} className={`${options.column === it.label ? `bg-second text-main` : ``} uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}>{it.label}</th>
//                         )
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {dataRender.map(it => (
//                       <tr key={it.id}>
//                         <td>{it.id}</td>
//                         {it.temperature !== undefined && (<td>{it.temperature}</td>)}
//                         {it.humidity !== undefined && (<td>{it.humidity}</td>)}
//                         {it.light !== undefined && (<td>{it.light}</td>)}
//                         <td>{formatISODate(it.time)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center uppercase">No data</h1>
//               )}
//               {/* End Data Table */}
//             </div>

//             {/* Pagination */}
//             {totalItems > 0 && (
//               <div className="flex justify-center mt-[30px] pagination-table">
//                 <Pagination current={options.page} onChange={handlePageChange} total={totalItems} showSizeChanger={false} />
//               </div>
//             )}
//             {/* End Pagination */}
//           </>
//         )}
//       </div>
//     </>
//   )
// }

/* Show Case 1 */
const DataSensor = () => {

  const [totalItems, setTotalItems] = useState(0);
  const [dataRender, setDataRender] = useState<DataArray[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [columns, setColumns] = useState([
    { label: 'id', view: true },
    { label: 'temperature', view: true },
    { label: 'humidity', view: true },
    { label: 'light', view: true },
    { label: 'time', view: true }
  ]);

  const [options, setOptions] = useState({
    column: 'all',
    order: true,
    page: 1,
    pageSize: 10
  });

  const [loading, setLoading] = useState(true);

  const handlePageChange = (newPage: number) => {
    setOptions(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleChangeSearchType = (value: string) => {
    setSearchType(value);
  };

  const handleChangeLimit = (value: number) => {
    setOptions(prev => ({
      ...prev,
      pageSize: value,
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

  const getData = async () => {
    let api = `http://localhost:5000/api/sensor/history-v1?searchType=${searchType}&column=${options.column}&order=${options.order ? 'ASC' : 'DESC'}&page=${options.page}&pageSize=${options.pageSize}` + `${searchValue ? `&search=${searchValue}` : ''}`;
    const response = await axios.get(api);
    setTotalItems(response.data.data.totalItems);
    setDataRender(response.data.data.dataRender);
    setLoading(false);
  }

  const handleEnterInput = () => {
    setOptions(prev => ({
      ...prev,
      column: 'all',
      page: 1
    }));
  }

  const handleClickSearch = () => {
    setOptions(prev => ({
      ...prev,
      column: 'all',
      page: 1
    }));
  }

  useEffect(() => {
    getData();
  }, [options])

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
              <div className="flex justify-between space-x-[40px]">
                <div className="flex flex-1">
                  <Input 
                    onPressEnter={handleEnterInput}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="font-poppin rounded-r-none" 
                    size="large" 
                    placeholder={`${searchType === 'all' ? 'Search all' : `Search by ${searchType}`}`}
                  />
                  <button 
                    className="border-[1px] border-main bg-main hover:bg-third hover:border-third rounded-[8px] rounded-s-none px-3 text-second ms-[-1px]"
                    onClick={handleClickSearch}
                  >
                    Search
                  </button>
                </div>

                <div className="w-[25%] font-poppin flex items-center">
                  <span className="text-[16px]">Search by</span>
                  <Select
                    className="flex-1 h-full ml-[15px]"
                    defaultValue="All"
                    onChange={handleChangeSearchType}
                    options={[
                      { value: 'all', label: 'All' },
                      { value: 'temperature', label: 'Temperature' },
                      { value: 'humidity', label: 'Humidity' },
                      { value: 'light', label: 'Light' },
                      { value: 'time', label: 'Time' }
                    ]}
                  />
                </div>
                <div className="w-[12%] flex items-center">
                  <span className="font-poppin text-[16px]">Limit</span>
                  <Select
                    className="h-full w-full font-poppin ml-[15px]"
                    defaultValue={10}
                    onChange={handleChangeLimit}
                    options={[
                      { value: 10, label: 10 },
                      { value: 20, label: 20 },
                      { value: 50, label: 50 },
                      { value: 100, label: 100 }
                    ]}
                  />
                </div>
              </div>
              {/* End Search and Select */}

              {/* Data Table */}
              {dataRender.length > 0 ? (
                // <div className="mt-[30px] max-h-[405.6px] overflow-y-scroll scrollbar-hidden">
                //   <table className="bg-white border-collapse w-full sensor-table">
                //     <thead className="sticky top-0">
                //       <tr>
                //         {columns.map((it, idx) => (
                //           it.view && (
                //             <th onClick={() => handleSort(it.label)} key={idx} className={`${options.column === it.label ? `bg-second text-main` : `bg-white`} uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}>{it.label}</th>
                //           )
                //         ))}
                //       </tr>
                //     </thead>
                //     <tbody>
                //       {dataRender.map(it => (
                //         <tr key={it.id}>
                //           <td>{it.id}</td>
                //           <td>{it.temperature}</td>
                //           <td>{it.humidity}</td>
                //           <td>{it.light}</td>
                //           <td>{formatISODate(it.time)}</td>
                //         </tr>
                //       ))}
                //     </tbody>
                //   </table>
                // </div>
                <div className="mt-[30px]">
                  <table className="bg-white border-collapse w-full sensor-table">
                    <thead>
                      <tr>
                        {columns.map((it, idx) => (
                          it.view && (
                            <th onClick={() => handleSort(it.label)} key={idx} className={`${options.column === it.label ? `bg-second text-main` : `bg-white`} uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}>{it.label}</th>
                          )
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dataRender.map(it => (
                        <tr key={it.id}>
                          <td>{it.id}</td>
                          <td>{it.temperature}</td>
                          <td>{it.humidity}</td>
                          <td>{it.light}</td>
                          <td>{formatISODate(it.time)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center uppercase">No data</h1>
              )}
              {/* End Data Table */}
            </div>

            {/* Pagination */}
            {totalItems > 0 && (
              <div className="flex justify-center mt-[30px] pagination-table">
                <Pagination current={options.page} onChange={handlePageChange} pageSize={options.pageSize} total={totalItems} showSizeChanger={false} />
              </div>
            )}
            {/* End Pagination */}
          </>
        )}
      </div>
    </>
  )
}
/* End Show Case 1 */

// Addition Sensor
// const DataSensor = () => {

//   const [totalItems, setTotalItems] = useState(0);
//   const [dataRender, setDataRender] = useState<DataArray[]>([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchType, setSearchType] = useState("all");
//   const [columns, setColumns] = useState([
//     { label: 'id', value: 'id', view: true },
//     { label: 'temperature', value: 'temperature', view: true },
//     { label: 'humidity', value: 'humidity', view: true },
//     { label: 'light', value: 'light', view: true },
//     { label: 'new sensor', value: 'randomSensor', view: true },
//     { label: 'time', value: 'time', view: true }
//   ]);

//   const [options, setOptions] = useState({
//     column: 'all',
//     order: true,
//     page: 1,
//     pageSize: 10
//   });

//   const [loading, setLoading] = useState(true);

//   const handlePageChange = (newPage: number) => {
//     setOptions(prev => ({
//       ...prev,
//       page: newPage
//     }));
//   };

//   const handleChangeSearchType = (value: string) => {
//     setSearchType(value);
//   };

//   const handleChangeLimit = (value: number) => {
//     setOptions(prev => ({
//       ...prev,
//       pageSize: value,
//       page: 1
//     }));
//   }
  
//   const handleSort = (value: string) => {
//     setOptions(prev => ({
//       ...prev,
//       column: value,
//       order: prev.column === value ? !prev.order : true,
//     }));
//   };

//   const getData = async () => {
//     let api = `http://localhost:5000/api/sensor/history-v1?searchType=${searchType}&column=${options.column}&order=${options.order ? 'ASC' : 'DESC'}&page=${options.page}&pageSize=${options.pageSize}` + `${searchValue ? `&search=${searchValue}` : ''}`;
//     const response = await axios.get(api);
//     setTotalItems(response.data.data.totalItems);
//     setDataRender(response.data.data.dataRender);
//     setLoading(false);
//   }

//   const handleEnterInput = () => {
//     setOptions(prev => ({
//       ...prev,
//       column: 'all',
//       page: 1
//     }));
//   }

//   const handleClickSearch = () => {
//     setOptions(prev => ({
//       ...prev,
//       column: 'all',
//       page: 1
//     }));
//   }

//   useEffect(() => {
//     getData();
//   }, [options])

//   return (
//     <>
//       <NavBar />
//       <div className="py-[30px] px-[60px]">
//         {loading ? (
//           <>
//             <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center">Loading data...</h1>
//           </>
//         ) : (
//           <>
//             <div className="w-[80%] mx-auto">
//               {/* Search and Select */}
//               <div className="flex justify-between space-x-[40px]">
//                 <div className="flex flex-1">
//                   <Input 
//                     onPressEnter={handleEnterInput}
//                     value={searchValue}
//                     onChange={(e) => setSearchValue(e.target.value)}
//                     className="font-poppin rounded-r-none" 
//                     size="large" 
//                     placeholder={`${searchType === 'all' ? 'Search all' : `Search by ${searchType}`}`}
//                   />
//                   <button 
//                     className="border-[1px] border-main bg-main hover:bg-third hover:border-third rounded-[8px] rounded-s-none px-3 text-second ms-[-1px]"
//                     onClick={handleClickSearch}
//                   >
//                     Search
//                   </button>
//                 </div>

//                 <div className="w-[25%] font-poppin flex items-center">
//                   <span className="text-[16px]">Search by</span>
//                   <Select
//                     className="flex-1 h-full ml-[15px]"
//                     defaultValue="All"
//                     onChange={handleChangeSearchType}
//                     options={[
//                       { value: 'all', label: 'All' },
//                       { value: 'temperature', label: 'Temperature' },
//                       { value: 'humidity', label: 'Humidity' },
//                       { value: 'light', label: 'Light' },
//                       { value: 'randomSensor', label: 'New Sensor' },
//                       { value: 'time', label: 'Time' }
//                     ]}
//                   />
//                 </div>
//                 <div className="w-[12%] flex items-center">
//                   <span className="font-poppin text-[16px]">Limit</span>
//                   <Select
//                     className="h-full w-full font-poppin ml-[15px]"
//                     defaultValue={10}
//                     onChange={handleChangeLimit}
//                     options={[
//                       { value: 10, label: 10 },
//                       { value: 20, label: 20 },
//                       { value: 50, label: 50 },
//                       { value: 100, label: 100 }
//                     ]}
//                   />
//                 </div>
//               </div>
//               {/* End Search and Select */}

//               {/* Data Table */}
//               {dataRender.length > 0 ? (
//                 // Scroll
//                 // <div className="mt-[30px] max-h-[405.6px] overflow-y-scroll scrollbar-hidden">
//                 //   <table className="bg-white border-collapse w-full sensor-table">
//                 //     <thead className="sticky top-0">
//                 //       <tr>
//                 //         {columns.map((it, idx) => (
//                 //           it.view && (
//                 //             <th onClick={() => handleSort(it.label)} key={idx} className={`${options.column === it.label ? `bg-second text-main` : `bg-white`} uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}>{it.label}</th>
//                 //           )
//                 //         ))}
//                 //       </tr>
//                 //     </thead>
//                 //     <tbody>
//                 //       {dataRender.map(it => (
//                 //         <tr key={it.id}>
//                 //           <td>{it.id}</td>
//                 //           <td>{it.temperature}</td>
//                 //           <td>{it.humidity}</td>
//                 //           <td>{it.light}</td>
//                 //           <td>{formatISODate(it.time)}</td>
//                 //         </tr>
//                 //       ))}
//                 //     </tbody>
//                 //   </table>
//                 // </div>
//                 // End Scroll

//                 // No Scroll
//                 <div className="mt-[30px]">
//                   <table className="bg-white border-collapse w-full sensor-table-v1">
//                     <thead>
//                       <tr>
//                         {columns.map((it, idx) => (
//                           it.view && (
//                             <th onClick={() => handleSort(it.value)} key={idx} className={`${options.column === it.value ? `bg-second text-main` : `bg-white`}  uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}>{it.label}</th>
//                           )
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {dataRender.map(it => (
//                         <tr key={it.id}>
//                           <td className="w-[10%]">{it.id}</td>
//                           <td className="w-[17%]">{it.temperature}</td>
//                           <td className="w-[17%]">{it.humidity}</td>
//                           <td className="w-[17%]">{it.light}</td>
//                           <td className="w-[17%]">{it.randomSensor}</td>
//                           <td className="w-[22%]">{formatISODate(it.time)}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 // End No Scroll
//               ) : (
//                 <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center uppercase">No data</h1>
//               )}
//               {/* End Data Table */}
//             </div>

//             {/* Pagination */}
//             {totalItems > 0 && (
//               <div className="flex justify-center mt-[30px] pagination-table">
//                 <Pagination current={options.page} onChange={handlePageChange} pageSize={options.pageSize} total={totalItems} showSizeChanger={false} />
//               </div>
//             )}
//             {/* End Pagination */}
//           </>
//         )}
//       </div>
//     </>
//   )
// }
// Addition Sensor

export default DataSensor;