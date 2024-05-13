import { db } from "../db.js";

import { client } from './mqttController.js';

export const getLatestSensorData = async (req, res) => {
    try {
        const sql = 'SELECT * FROM `sensor` ORDER BY time DESC LIMIT 1;';
        const [results] = await db.execute(sql);
        res.status(200).send({ message: 'success', results: results });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

// Get Data Dashboard Addition
export const getLatestSensorDataV1 = async (req, res) => {
    try {
        const sql = 'SELECT * FROM `sensor-v1` ORDER BY time DESC LIMIT 1;';
        const [results] = await db.execute(sql);
        res.status(200).send({ message: 'success', results: results });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}
// End Get Data Dashboard Addition

export const insertSensorData = async ({ temperature, humidity, bright }) => {
    const sql = 'INSERT INTO `sensor`(`temperature`, `humidity`, `light`, `time`) VALUES (?, ?, ?, NOW())';
    const values = [temperature, humidity, bright];
    const [result, fields] = await db.execute(sql, values);
    console.log('INSERT SENSOR DATA SUCCESS');
}

// Insert Addition
export const insertV1 = async ({ temperature, humidity, bright, randomSensor }) => {
    const sql = 'INSERT INTO `sensor-v1`(`temperature`, `humidity`, `light`, `randomSensor`, `time`) VALUES (?, ?, ?, ?, NOW())';
    const values = [temperature, humidity, bright, randomSensor];
    const [result, fields] = await db.execute(sql, values);
    console.log('INSERT SENSOR DATA SUCCESS');
}
// End Insert Addition

export const getHistorySensorDatas = async (req, res) => {
    try {
        // const { type, search, column, order, page } = req.body;
        const type = req.query.type;
        const column = req.query.column;
        const order = req.query.order;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.pageSize);
        const search = req.query.search || '';

        let sql = '';
        if (type === 'all') {
            sql = 'SELECT * FROM `sensor`';
        }
        else {
            sql = 'SELECT `id`, ' + '`' + type + '`, ' + '`time` FROM `sensor`';
        }
        if (search){
            if(type === 'all'){
                sql += ' WHERE `temperature` LIKE ' + `'${search}'` + ' OR `humidity` LIKE ' + `'${search}'` + ' OR `light` LIKE ' + `'${search}'` + ' OR `time` LIKE ' + `'%${search}%'`;
            }
            else {
                sql += ` WHERE ${type} LIKE ` + `'${search}'` + ' OR `time` LIKE ' + `'%${search}%'`;
            }
        }
        if (column !== 'all') sql += ' ORDER BY ' + column + ` ${order}`;
        const [results, fields] = await db.execute(sql);
        const totalItems = results.length;
        let currentPage = page;
        const totalPages = (totalItems % limit == 0 ? totalItems / limit : (Math.floor(totalItems / limit) + 1));
        if (page > totalPages) currentPage = 1;
        const index = (currentPage - 1) * limit;
        const dataRender = results.slice(index, Math.min(index + limit, results.length));
        res.status(200).send({ message: 'success', data: { dataRender, totalItems } });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

// Get Data Sensor Show Case 1
export const getSensorData = async (req, res) => {
    try {
        const searchType = req.query.searchType;
        const column = req.query.column;
        const order = req.query.order;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.pageSize);
        const search = req.query.search || '';

        let sql = 'SELECT * FROM `sensor`';
        if(search) {
            if(searchType === 'all') {
                sql += ' WHERE `temperature` LIKE ' + `'${search}'` + ' OR `humidity` LIKE ' + `'${search}'` + ' OR `light` LIKE ' + `'${search}'` + ' OR `time` LIKE ' + `'%${search}%'`;
            }
            else if(searchType === 'time') {
                sql += ' WHERE `time` LIKE ' + `'%${search}%'`;
            }
            else {
                sql += ` WHERE ${searchType} LIKE ` + `'${search}'`;
            }
        }
        if (column === 'all') {
            sql += ' ORDER BY id DESC'; 
        }
        else {
            sql += ' ORDER BY ' + column + ` ${order}`;
        };
        const [results, fields] = await db.execute(sql);
        const totalItems = results.length;
        let currentPage = page;
        const totalPages = (totalItems % limit == 0 ? totalItems / limit : (Math.floor(totalItems / limit) + 1));
        if (page > totalPages) currentPage = 1;
        const index = (currentPage - 1) * limit;
        const dataRender = results.slice(index, Math.min(index + limit, results.length));
        res.status(200).send({ message: 'success', data: { dataRender, totalItems } });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}
// End Get Data Sensor Show Case 1

// Get Data Sensor Addition Sensor
export const getSensorDataV1 = async (req, res) => {
    try {
        const searchType = req.query.searchType;
        const column = req.query.column;
        const order = req.query.order;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.pageSize);
        const search = req.query.search || '';

        let sql = 'SELECT * FROM `sensor-v1`';
        if(search) {
            if(searchType === 'all') {
                sql += ' WHERE `temperature` LIKE ' + `'${search}'` + ' OR `humidity` LIKE ' + `'${search}'` + ' OR `light` LIKE ' + `'${search}'` + ' OR `randomSensor` LIKE ' + `'${search}'` + ' OR `time` LIKE ' + `'%${search}%'`;
            }
            else if(searchType === 'time') {
                sql += ' WHERE `time` LIKE ' + `'%${search}%'`;
            }
            else {
                sql += ` WHERE ${searchType} LIKE ` + `'${search}'`;
            }
        }
        if (column === 'all') {
            sql += ' ORDER BY id DESC'; 
        }
        else {
            sql += ' ORDER BY ' + column + ` ${order}`;
        };
        const [results, fields] = await db.execute(sql);
        const totalItems = results.length;
        let currentPage = page;
        const totalPages = (totalItems % limit == 0 ? totalItems / limit : (Math.floor(totalItems / limit) + 1));
        if (page > totalPages) currentPage = 1;
        const index = (currentPage - 1) * limit;
        const dataRender = results.slice(index, Math.min(index + limit, results.length));
        res.status(200).send({ message: 'success', data: { dataRender, totalItems } });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}
// End Get Data Sensor Addition Sensor

const topicSensor = 'sensor';

client.on('message', async (topic, payload) => {
    if(topic === topicSensor) {
        const data = JSON.parse(payload.toString());
        console.log(data);
        await insertSensorData(data);
        // await insertV1(data);
    }
})
