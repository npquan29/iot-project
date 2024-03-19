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

const ActionHistory = () => {

    const [totalItems, setTotalItems] = useState(0);
    const [dataRender, setDataRender] = useState<ActionData[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [columns, setColumns] = useState([
        { label: 'id', view: true },
        { label: 'device', view: true },
        { label: 'state', view: true },
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
            // const response = await axios.post('http://localhost:5000/api/action/history', options);
            let api = `http://localhost:5000/api/action?type=${options.type}&column=${options.column}&order=${options.order}&page=${options.page}` + `${options.search ? `&search=${options.search}` : '' }`;
            const response = await axios.get(api);
            setTotalItems(response.data.data.totalItems);
            setDataRender(response.data.data.dataRender);
            setLoading(false);
        }

        fetchData();
    }, [options]);

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
                                            { value: 'led', label: 'Led' },
                                            { value: 'fan', label: 'Fan' },
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

export default ActionHistory;