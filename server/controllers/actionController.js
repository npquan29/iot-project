import { db } from "../db.js";
import { client } from "../controllers/mqttController.js";

const limit = 10;

export const getActions = async (req, res) => {
    try {
        const type = req.query.type;
        const column = req.query.column;
        const order = req.query.order === 'true' ? 'ASC' : 'DESC';
        const page = parseInt(req.query.page);
        const search = req.query.search || '';

        let sql = 'SELECT * FROM `action` WHERE 1 = 1 ';
        if (type !== 'all') sql += 'AND `device` = ' + `'` + type + `'`;
        if (search) sql += ' AND `time` LIKE ' + "'%" + search + "%'";
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

export const postAction = async (req, res, next) => {
    try {
        const { device, status } = req.body;
        const sql = 'INSERT INTO `action`(`device`, `status`, `time`) VALUES (?, ?, NOW())';
        const values = [device, status ? '1' : '0'];
        let actionSuccess = false;

        const confirmHandler = (topic, payload) => {
            if (topic === 'confirm/led') {
                actionSuccess = true;
                if(payload == 'on') {
                    processAction('led', 'on'); // Tiến hành xử lý hành động
                }
                else {
                    processAction('led', 'off');
                }
                client.off('message', confirmHandler); // Ngừng lắng nghe sự kiện sau khi nhận được xác nhận
            }
            else if(topic === 'confirm/fan') {
                actionSuccess = true;
                if(payload == 'on') {
                    processAction('fan', 'on'); // Tiến hành xử lý hành động
                }
                else {
                    processAction('fan', 'off');
                }
                client.off('message', confirmHandler); // Ngừng lắng nghe sự kiện sau khi nhận được xác nhận
            }
        };

        client.on('message', confirmHandler);

        const processAction = async (device, status) => {
            if (actionSuccess) {
                const [result, fields] = await db.execute(sql, values);
                console.log("ADD ACTION SUCCESS");
                res.status(201).json({ message: 'Add action success', data: {device, status} });
            } else {
                res.status(500).json({ message: 'Failed to confirm action' });
            }
        };

        if (device === 'led') {
            if (status === true) {
                client.publish('control/led', 'on');
            } else {
                client.publish('control/led', 'off');
            }
        } else {
            if (status === true) {
                client.publish('control/fan', 'on');
            } else {
                client.publish('control/fan', 'off');
            }
        }
    } catch (error) {
        res.status(409).send({ message: error.message });
    }
}

export const filterAction = async (req, res) => {
    try {
        const { type, search, column, order, page } = req.body;

        let sql = 'SELECT * FROM `action` WHERE 1 = 1 ';
        if (type !== 'all') sql += 'AND `device` = ' + `'` + type + `'`;
        if (search) sql += ' AND `time` LIKE ' + "'%" + search + "%'";
        if (column !== 'all') sql += ' ORDER BY ' + column + ` ${order ? 'ASC' : 'DESC'}`;
        
        console.log(sql);

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