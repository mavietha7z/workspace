import { isNaN } from '../configs';

const telcosValidator = {
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

    // [POST] /api/telcos/create
    telco: (req, res, next) => {
        const { telco, product_code, value, priority, code_length, serial_length } = req.body;

        if (!telco) {
            return res.status(400).json({
                error: 'Tên là bắt buộc',
            });
        }

        if (!product_code) {
            return res.status(400).json({
                error: 'Mã sản phẩm là bắt buộc',
            });
        }

        if (value.length < 2) {
            return res.status(400).json({
                error: 'Tối thiểu 2 mệnh giá thẻ',
            });
        }

        if (!priority) {
            return res.status(400).json({
                error: 'Sắp xếp là bắt buộc',
            });
        }

        if (!code_length) {
            return res.status(400).json({
                error: 'Độ dài mã thẻ là bắt buộc',
            });
        }

        if (!serial_length) {
            return res.status(400).json({
                error: 'Độ dài serial là bắt buộc',
            });
        }

        next();
    },

    // [GET] /api/telcos
    getTelcos: (req, res, next) => {
        const { id, page } = req.query;

        if (id && !page) {
            return next();
        }

        telcosValidator.checkPage(req, res, () => {
            next();
        });
    },

    // [PUT] /api/telcos/update
    updateTelco: (req, res, next) => {
        const { id, type } = req.query;

        if (type && type !== 'status') {
            return res.status(400).json({
                error: 'Tham số không hợp lệ',
            });
        }

        if (id && type === 'status') {
            return next();
        }

        telcosValidator.telco(req, res, () => {
            if (!id) {
                res.status(400).json({
                    error: 'Tham số là bắt buộc',
                });
            } else {
                next();
            }
        });
    },

    // [POST] /api/telcos/actions
    actionsTelcos: async (req, res, next) => {
        const { type } = req.query;

        if (!type) {
            return res.status(400).json({
                error: 'Tham số là bắt buộc',
            });
        }

        next();
    },

    // [POST] /api/telcos/search
    searchTelcos: (req, res, next) => {
        const { type, keyword } = req.query;

        if (!type) {
            return res.status(400).json({
                error: 'Điều kiện là bắt buộc',
            });
        }

        if (!keyword) {
            return res.status(400).json({
                error: 'Từ khóa là bắt buộc',
            });
        }

        next();
    },
};

export default telcosValidator;
