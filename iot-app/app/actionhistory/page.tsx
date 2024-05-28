'use client'

import NavBar from "@/components/NavBar"
import { useEffect, useState } from "react";
import { Pagination, Input, Select } from "antd";
import axios from "axios";
import { formatISODate } from "@/helpers/formatTimeDB";

interface ActionData {
    id: number;
    device: string;
    status: number;
    time: string;
}

// const ActionHistory = () => {

//     const [totalItems, setTotalItems] = useState(0);
//     const [dataRender, setDataRender] = useState<ActionData[]>([]);
//     const [inputValue, setInputValue] = useState("");
//     const [columns, setColumns] = useState([
//         { label: 'id', view: true },
//         { label: 'device', view: true },
//         { label: 'state', view: true },
//         { label: 'time', view: true }
//     ]);

//     const [options, setOptions] = useState({
//         type: 'all',
//         search: '',
//         column: 'all',
//         order: true,
//         page: 1,
//         pageSize: 10
//     });

//     const [loading, setLoading] = useState(true);

//     const handlePageChange = (newPage: number) => {
//         setOptions(prev => ({
//             ...prev,
//             page: newPage
//         }));
//     };

//     const handleChangeSelect = (value: string) => {
//         setOptions(prev => ({
//             ...prev,
//             search: '',
//             column: 'all',
//             type: value,
//             order: true,
//             page: 1
//         }));
//         setInputValue('');
//     };

//     const handleEnterInput = (e: any) => {
//         setOptions(prev => ({
//             ...prev,
//             search: e.target.value,
//             page: 1
//         }));
//     }

//     const handleSort = (value: string) => {
//         setOptions(prev => ({
//             ...prev,
//             column: value,
//             order: prev.column === value ? !prev.order : true,
//         }));
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             // const response = await axios.post('http://localhost:5000/api/action/history', options);
//             let api = `http://localhost:5000/api/action?type=${options.type}&column=${options.column}&order=${options.order ? 'asc' : 'desc'}&page=${options.page}&pageSize=${options.pageSize}` + `${options.search ? `&search=${options.search}` : '' }`;
//             const response = await axios.get(api);

//             setTotalItems(response.data.data.totalItems);
//             setDataRender(response.data.data.dataRender);
//             setLoading(false);
//         }

//         fetchData();
//     }, [options]);

//     // console.log(options);

//     return (
//         <>
//             <NavBar />
//             <div className="py-[30px] px-[60px]">
//                 {loading ? (
//                     <>
//                         <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center">Loading data...</h1>
//                     </>
//                 ) : (
//                     <>
//                         <div className="w-[80%] mx-auto">
//                             {/* Search and Select */}
//                             <div className="flex justify-between space-x-[30px]">
//                                 <div className="flex-1">
//                                     <Input onPressEnter={handleEnterInput}
//                                         value={inputValue}
//                                         onChange={(e) => setInputValue(e.target.value)}
//                                         className="font-poppin" size="large" placeholder={`${options.type === 'all' ? 'Search all.' : `Search by status or time` }`} />
//                                 </div>

//                                 <div className="w-[15%]">
//                                     <Select
//                                         className="w-full h-full font-poppin"
//                                         defaultValue="All"
//                                         onChange={handleChangeSelect}
//                                         options={[
//                                             { value: 'all', label: 'All' },
//                                             { value: 'led', label: 'Led' },
//                                             { value: 'fan', label: 'Fan' },
//                                         ]}
//                                     />
//                                 </div>
//                             </div>
//                             {/* End Search and Select */}

//                             {/* Data Table */}
//                             {dataRender.length > 0 ? (
//                                 <table className="mt-[30px] bg-white border border-third border-collapse w-full sensor-table">
//                                     <thead>
//                                         <tr>
//                                             {columns.map((it, idx) => (
//                                                 it.view && (
//                                                     <th
//                                                         key={idx}
//                                                         onClick={it.label === 'id' || it.label === 'time' ? () => handleSort(it.label) : undefined}
//                                                         className={`${options.column === it.label ? `bg-second text-main` : ``
//                                                             } uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}
//                                                     >
//                                                         {it.label}
//                                                     </th>
//                                                 )
//                                             ))}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {dataRender.map(it => (
//                                             <tr key={it.id}>
//                                                 <td>{it.id}</td>
//                                                 <td className="capitalize">{it.device}</td>
//                                                 <td>{it.status ? 'ON' : 'OFF'}</td>
//                                                 <td>{formatISODate(it.time)}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             ) : (
//                                 <>
//                                     <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center uppercase">No data</h1>
//                                 </>
//                             )}
//                             {/* End Data Table */}
//                         </div>

//                         {/* Pagination */}
//                         {totalItems > 0 && (
//                             <div className="flex justify-center mt-[30px] pagination-table">
//                                 <Pagination current={options.page} onChange={handlePageChange} total={totalItems} showSizeChanger={false} />
//                             </div>
//                         )}
//                         {/* End Pagination */}
//                     </>
//                 )}
//             </div>
//         </>
//     )
// }

/* Show Case 1 */
const ActionHistory = () => {

    const [totalItems, setTotalItems] = useState(0);
    const [dataRender, setDataRender] = useState<ActionData[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchType, setSearchType] = useState("all");
    const [columns, setColumns] = useState([
        { label: 'id', view: true },
        { label: 'device', view: true },
        { label: 'state', view: true },
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

    const getData = async () => {
        let api = `http://localhost:5000/api/action/history-v1?searchType=${searchType}&column=${options.column}&order=${options.order ? 'ASC' : 'DESC'}&page=${options.page}&pageSize=${options.pageSize}` + `${searchValue ? `&search=${searchValue}` : ''}`;
        const response = await axios.get(api);
        setTotalItems(response.data.data.totalItems);
        setDataRender(response.data.data.dataRender);
        setLoading(false);
    }

    const handleEnterInput = (e: any) => {
        setOptions(prev => ({
            ...prev,
            column: 'all',
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
        getData();
    }, [options]);

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
                                        onClick={handleEnterInput}
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
                                            { value: 'device', label: 'Device' },
                                            { value: 'status', label: 'State' },
                                            { value: 'time', label: 'Time' },
                                        ]}
                                    />
                                </div>
                                <div className="w-[12%] font-poppin flex items-center">
                                    <span className="text-[16px]">Limit</span>
                                    <Select
                                        className="h-full w-full ml-[15px]"
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
                                <div className="mt-[30px]">
                                    <table className="bg-white border-collapse w-full sensor-table">
                                        <thead>
                                            <tr>
                                                {columns.map((it, idx) => (
                                                    it.view && (
                                                        <th
                                                            key={idx}
                                                            onClick={it.label === 'id' || it.label === 'time' ? () => handleSort(it.label) : undefined}
                                                            className={`${options.column === it.label ? `bg-second text-main` : ``
                                                                } uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}
                                                        >
                                                            {it.label}
                                                        </th>
                                                    )
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataRender.map(it => (
                                                <tr key={it.id}>
                                                    <td>{it.id}</td>
                                                    <td className="capitalize">{it.device}</td>
                                                    <td>{it.status ? 'ON' : 'OFF'}</td>
                                                    <td>{formatISODate(it.time)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <>
                                    <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center uppercase">No data</h1>
                                </>
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

/* Addition Device */
// const ActionHistory = () => {

//     const [totalItems, setTotalItems] = useState(0);
//     const [dataRender, setDataRender] = useState<ActionData[]>([]);
//     const [searchValue, setSearchValue] = useState("");
//     const [searchType, setSearchType] = useState("all");
//     const [columns, setColumns] = useState([
//         { label: 'id', view: true },
//         { label: 'device', view: true },
//         { label: 'state', view: true },
//         { label: 'time', view: true }
//     ]);

//     const [options, setOptions] = useState({
//         column: 'all',
//         order: true,
//         page: 1,
//         pageSize: 10
//     });

//     const [loading, setLoading] = useState(true);

//     const handlePageChange = (newPage: number) => {
//         setOptions(prev => ({
//             ...prev,
//             page: newPage
//         }));
//     };

//     const handleChangeSearchType = (value: string) => {
//         setSearchType(value);
//     };

//     const handleChangeLimit = (value: number) => {
//         setOptions(prev => ({
//             ...prev,
//             pageSize: value,
//             page: 1
//         }));
//     }

//     const getData = async () => {
//         let api = `http://localhost:5000/api/action/history-v1?searchType=${searchType}&column=${options.column}&order=${options.order ? 'ASC' : 'DESC'}&page=${options.page}&pageSize=${options.pageSize}` + `${searchValue ? `&search=${searchValue}` : ''}`;
//         const response = await axios.get(api);
//         setTotalItems(response.data.data.totalItems);
//         setDataRender(response.data.data.dataRender);
//         setLoading(false);
//     }

//     const handleEnterInput = (e: any) => {
//         setOptions(prev => ({
//             ...prev,
//             column: 'all',
//             page: 1
//         }));
//     }

//     const handleSort = (value: string) => {
//         setOptions(prev => ({
//             ...prev,
//             column: value,
//             order: prev.column === value ? !prev.order : true,
//         }));
//     };

//     useEffect(() => {
//         getData();
//     }, [options]);

//     return (
//         <>
//             <NavBar />
//             <div className="py-[30px] px-[60px]">
//                 {loading ? (
//                     <>
//                         <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center">Loading data...</h1>
//                     </>
//                 ) : (
//                     <>
//                         <div className="w-[80%] mx-auto">
//                             {/* Search and Select */}
//                             <div className="flex justify-between space-x-[40px]">
//                                 <div className="flex flex-1">
//                                     <Input
//                                         onPressEnter={handleEnterInput}
//                                         value={searchValue}
//                                         onChange={(e) => setSearchValue(e.target.value)}
//                                         className="font-poppin rounded-r-none"
//                                         size="large"
//                                         placeholder={`${searchType === 'all' ? 'Search all' : `Search by ${searchType}`}`}
//                                     />
//                                     <button
//                                         className="border-[1px] border-main bg-main hover:bg-third hover:border-third rounded-[8px] rounded-s-none px-3 text-second ms-[-1px]"
//                                         onClick={handleEnterInput}
//                                     >
//                                         Search
//                                     </button>
//                                 </div>

//                                 <div className="w-[25%] font-poppin flex items-center">
//                                     <span className="text-[16px]">Search by</span>
//                                     <Select
//                                         className="flex-1 h-full ml-[15px]"
//                                         defaultValue="All"
//                                         onChange={handleChangeSearchType}
//                                         options={[
//                                             { value: 'all', label: 'All' },
//                                             { value: 'device', label: 'Device' },
//                                             { value: 'status', label: 'State' },
//                                             { value: 'time', label: 'Time' },
//                                         ]}
//                                     />
//                                 </div>
//                                 <div className="w-[12%] font-poppin flex items-center">
//                                     <span className="text-[16px]">Limit</span>
//                                     <Select
//                                         className="h-full w-full ml-[15px]"
//                                         defaultValue={10}
//                                         onChange={handleChangeLimit}
//                                         options={[
//                                             { value: 10, label: 10 },
//                                             { value: 20, label: 20 },
//                                             { value: 50, label: 50 },
//                                             { value: 100, label: 100 }
//                                         ]}
//                                     />
//                                 </div>
//                             </div>
//                             {/* End Search and Select */}

//                             {/* Data Table */}
//                             {dataRender.length > 0 ? (
//                                 <div className="mt-[30px]">
//                                     <table className="bg-white border-collapse w-full sensor-table">
//                                         <thead>
//                                             <tr>
//                                                 {columns.map((it, idx) => (
//                                                     it.view && (
//                                                         <th
//                                                             key={idx}
//                                                             onClick={it.label === 'id' || it.label === 'time' ? () => handleSort(it.label) : undefined}
//                                                             className={`${options.column === it.label ? `bg-second text-main` : ``
//                                                                 } uppercase cursor-pointer hover:bg-main hover:text-second transition-all`}
//                                                         >
//                                                             {it.label}
//                                                         </th>
//                                                     )
//                                                 ))}
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {dataRender.map(it => (
//                                                 <tr key={it.id}>
//                                                     <td>{it.id}</td>
//                                                     <td className="capitalize">{it.device}</td>
//                                                     <td>{it.status ? 'ON' : 'OFF'}</td>
//                                                     <td>{formatISODate(it.time)}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             ) : (
//                                 <>
//                                     <h1 className="p-4 text-3xl text-black font-poppin font-[500] block text-center uppercase">No data</h1>
//                                 </>
//                             )}
//                             {/* End Data Table */}
//                         </div>

//                         {/* Pagination */}
//                         {totalItems > 0 && (
//                             <div className="flex justify-center mt-[30px] pagination-table">
//                                 <Pagination current={options.page} onChange={handlePageChange} pageSize={options.pageSize} total={totalItems} showSizeChanger={false} />
//                             </div>
//                         )}
//                         {/* End Pagination */}
//                     </>
//                 )}
//             </div>
//         </>
//     )
// }
/* End Addition Device */

export default ActionHistory;