import { isNaN } from '../configs';
import { Partner, Telco } from '../models';

const statValidator = {
    checkPage: (req, res, next) => {
        const { page } = req.query;

        if (!page) {
            return res.status(400).json({
                error: 'Tham số là bắt buộc',
            });
        }

        const numberPage = Number(page);
        if (numberPage < 1 || typeof numberPage !== 'number' || isNaN(numberPage)) {
            return res.status(400).json({
                error: 'Tham số không hợp lệ',
            });
        }

        req.page = numberPage;
        next();
    },

    // [GET] /api/statistic/chargings
    getChargings: async (req, res, next) => {
        const { telco, amount, partner, date_start, date_end, status, code, serial, type } = req.query;

        if (type && type === 'tab') {
            return next();
        }

        statValidator.checkPage(req, res, async () => {
            const checkPartner = await Partner.findOne({ partner_name: partner }).select('partner_name');
            let objectSearch = { status: { $in: [1, 2, 3, 4, 99, 100] } };

            if (status && status === 'null') {
                return res.status(400).json({
                    error: 'Tham số không hợp lệ',
                });
            }

            const checkTelco = await Telco.findOne({ telco });

            if (telco) {
                objectSearch.telco = checkTelco._id;
            }
            if (amount) {
                objectSearch.declared_value = amount;
            }
            if (checkPartner) {
                objectSearch.partner = checkPartner._id;
            }
            if (date_start && !date_end) {
                let start = new Date(date_start);

                objectSearch.createdAt = { $gte: start, $lte: new Date() };
            }
            if (date_end && !date_start) {
                return res.status(400).json({
                    error: 'Thời gian bắt đầu là bắt buộc',
                });
            }
            if (date_start && date_end) {
                let start = new Date(date_start);
                let end = new Date(date_end);

                if (start.getTime() === end.getTime()) {
                    start.setHours(0, 0, 0);
                    end.setHours(23, 59, 59);
                }

                objectSearch.createdAt = { $gte: start, $lte: end };
            }
            if (status && status !== 'all') {
                objectSearch.status = status;
            }
            if (code) {
                objectSearch.code = code;
            }
            if (serial) {
                objectSearch.serial = serial;
            }

            req.objectSearch = objectSearch;
            next();
        });
    },
};

export default statValidator;
