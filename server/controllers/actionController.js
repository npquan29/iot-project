import { db } from "../db.js";
import { client } from "../controllers/mqttController.js";

export const getActionHistory = async (req, res) => {
    try {
        const type = req.query.type;
        const column = req.query.column;
        const order = req.query.order;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.pageSize);
        let search = req.query.search || '';

        let sql = 'SELECT * FROM `action` WHERE 1 = 1 ';
        if (type !== 'all') sql += 'AND `device` = ' + `'` + type + `'`;
        if (search) {
            if(type === 'all') {
                sql += ' AND (`device` LIKE ' + `'${search}'` + `${(search === 'on' || search === 'off') ? ' OR `status` LIKE ' + `${search === 'on' ? '1' : '0' }` : ''}` + ' OR `time` LIKE ' + `'%${search}%')`; 
            }
            else {
                sql += ' AND (' + `${(search === 'on' || search === 'off') ? ' `status` LIKE ' + `${search === 'on' ? '1 OR ' : '0 OR ' }` : ''}` + '`time` LIKE ' + `'%${search}%')`; 
            }
        }
        if (column !== 'all') sql += ' ORDER BY ' + column + ` ${order}`;

        // console.log(sql);

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

// Show Case 1 Post Action
export const postAction = async (req, res, next) => {
    try {
        const { device, status } = req.body;
        const sql = 'INSERT INTO `action`(`device`, `status`, `time`) VALUES (?, ?, NOW())';
        const values = [device, status ? '1' : '0'];
        let actionSuccess = false;

        const confirmHandler = (topic, payload) => {
            if (topic === 'confirm/led') {
                actionSuccess = true;
                if (payload == 'on') {
                    processAction('led', 'on'); // Tiến hành xử lý hành động
                }
                else {
                    processAction('led', 'off');
                }
                client.off('message', confirmHandler); // Ngừng lắng nghe sự kiện sau khi nhận được xác nhận
            }
            else if (topic === 'confirm/fan') {
                actionSuccess = true;
                if (payload == 'on') {
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
                res.status(201).json({ message: 'Add action success', data: { device, status } });
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
        } 
        else if(device === 'fan') {
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
// End Show Case 1 Post Action

// Addition Device Post Action
export const postActionV1 = async (req, res, next) => {
    try {
        const { device, status } = req.body;
        const sql = 'INSERT INTO `action-v1`(`device`, `status`, `time`) VALUES (?, ?, NOW())';
        const values = [device, status ? '1' : '0'];
        let actionSuccess = false;

        const confirmHandler = (topic, payload) => {
            if (topic === 'confirm/led') {
                actionSuccess = true;
                if (payload == 'on') {
                    processAction('led', 'on'); // Tiến hành xử lý hành động
                }
                else {
                    processAction('led', 'off');
                }
                client.off('message', confirmHandler); // Ngừng lắng nghe sự kiện sau khi nhận được xác nhận
            }
            else if (topic === 'confirm/fan') {
                actionSuccess = true;
                if (payload == 'on') {
                    processAction('fan', 'on'); // Tiến hành xử lý hành động
                }
                else {
                    processAction('fan', 'off');
                }
                client.off('message', confirmHandler); // Ngừng lắng nghe sự kiện sau khi nhận được xác nhận
            }
            else if (topic === 'confirm/door') {
                actionSuccess = true;
                if (payload == 'on') {
                    processAction('door', 'on'); // Tiến hành xử lý hành động
                }
                else {
                    processAction('door', 'off');
                }
                client.off('message', confirmHandler); // Ngừng lắng nghe sự kiện sau khi nhận được xác nhận
            }
        };

        client.on('message', confirmHandler);

        const processAction = async (device, status) => {
            if (actionSuccess) {
                const [result, fields] = await db.execute(sql, values);
                console.log("ADD ACTION SUCCESS");
                res.status(201).json({ message: 'Add action success', data: { device, status } });
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
        } 
        else if(device === 'fan') {
            if (status === true) {
                client.publish('control/fan', 'on');
            } else {
                client.publish('control/fan', 'off');
            }
        }
        else {
            if (status === true) {
                client.publish('control/door', 'on');
            } else {
                client.publish('control/door', 'off');
            }
        }
    } catch (error) {
        res.status(409).send({ message: error.message });
    }
}
// End Additon Device Post Action

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

// Show Case 1 Get Action History
export const getActionData = async (req, res) => {
    try {
        const searchType = req.query.searchType;
        const column = req.query.column;
        const order = req.query.order;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.pageSize);
        let search = req.query.search || '';

        let sql = 'SELECT * FROM `action` WHERE 1 = 1';
        if(search) {
            if(searchType === 'all') {
                sql += ' AND (`device` LIKE ' + `'%${search}%'` + `${(search === 'on' || search === 'off') ? ' OR `status` LIKE ' + `${search === 'on' ? '1' : '0' }` : ''}` + ' OR `time` LIKE ' + `'%${search}%')`;
            }
            else if(searchType === 'status') {
                sql += `${(search === 'on' || search === 'off') ? ' AND `status` LIKE ' + `${search === 'on' ? '1' : '0' }` : ''}`;
            }
            else {
                sql += ` AND ${searchType} LIKE ` + `'%${search}%'`;
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
        // res.status(200).send("OKE");
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}
// End Show Case 1 Get Action History

// Addition Device Get Action History
export const getActionDataV1 = async (req, res) => {
    try {
        const searchType = req.query.searchType;
        const column = req.query.column;
        const order = req.query.order;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.pageSize);
        let search = req.query.search || '';

        let sql = 'SELECT * FROM `action-v1` WHERE 1 = 1';
        if(search) {
            if(searchType === 'all') {
                sql += ' AND (`device` LIKE ' + `'%${search}%'` + `${(search === 'on' || search === 'off') ? ' OR `status` LIKE ' + `${search === 'on' ? '1' : '0' }` : ''}` + ' OR `time` LIKE ' + `'%${search}%')`;
            }
            else if(searchType === 'status') {
                sql += `${(search === 'on' || search === 'off') ? ' AND `status` LIKE ' + `${search === 'on' ? '1' : '0' }` : ''}`;
            }
            else {
                sql += ` AND ${searchType} LIKE ` + `'%${search}%'`;
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
        // res.status(200).send("OKE");
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}
// End Addition Device Get Action History