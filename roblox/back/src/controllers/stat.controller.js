import { Stat, User } from '../models';
import statService from '../services/stat.service';

const statController = {
    // [GET] /api/statistic/chargings
    getChargings: async (req, res) => {
        try {
            const { type } = req.query;

            if (type) {
                const todays = new Date();
                todays.setHours(0, 0, 0, 0);

                const total = await Stat.find({ status: { $in: [1, 2, 3, 4, 99, 100] } })
                    .select('telco code serial declared_value status message createdAt')
                    .populate({
                        path: 'telco',
                        select: 'telco -_id',
                        modal: 'Telco',
                    })
                    .sort({ createdAt: -1 })
                    .limit(8);

                const countTotal = await Stat.countDocuments({ status: { $in: [1, 2, 3, 4, 99, 100] } });
                const countTotalNew = await Stat.countDocuments({
                    status: { $in: [1, 2, 3, 4, 99, 100] },
                    createdAt: { $gte: todays },
                });

                const success = await Stat.find({ status: 1 })
                    .select('telco code serial declared_value status message createdAt')
                    .populate({
                        path: 'telco',
                        select: 'telco -_id',
                        modal: 'Telco',
                    })
                    .sort({ createdAt: -1 })
                    .limit(8);

                const countSuccess = await Stat.countDocuments({ status: 1 });
                const countSuccessNew = await Stat.countDocuments({ createdAt: { $gte: todays }, status: 1 });

                return res.status(200).json({
                    status: 200,
                    data: {
                        total: {
                            data: total,
                            new: countTotalNew,
                            total: countTotal,
                        },
                        success: {
                            data: success,
                            new: countSuccessNew,
                            total: countSuccess,
                        },
                    },
                });
            }

            const pageSize = 20;
            const skip = (req.page - 1) * pageSize;
            const count = await Stat.countDocuments(req.objectSearch);
            const pages = Math.ceil(count / pageSize);

            const stat = await Stat.find(req.objectSearch)
                .select('-__v')
                .populate({
                    path: 'partner',
                    select: 'partner_name -_id',
                    model: 'Partner',
                })
                .populate({
                    path: 'telco',
                    select: 'telco -_id',
                    model: 'Telco',
                })
                .skip(skip)
                .limit(pageSize)
                .sort({ createdAt: -1 })
                .exec();

            res.status(200).json({
                status: 200,
                data: stat,
                pages,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [GET] /api/statistic/total-chargings
    getTotalChargings: async (req, res) => {
        try {
            const { type } = req.query;

            const result = await Stat.find({}).select('declared_value value amount createdAt -_id');

            let realValue = 0;
            let receiveValue = 0;
            let declaredValue = 0;

            let todayRealValue = 0;
            let todayReceiveValue = 0;
            let todayDeclaredValue = 0;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            today.setHours(today.getHours() + 7);

            for (let i = 0; i < result.length; i++) {
                realValue += result[i].value;
                receiveValue += result[i].amount;
                declaredValue += result[i].declared_value;

                const createdAt = new Date(result[i].createdAt);
                createdAt.setHours(0, 0, 0, 0);
                createdAt.setHours(createdAt.getHours() + 7);
                if (type === 'tab' && today.toISOString() === createdAt.toISOString()) {
                    todayRealValue += result[i].value;
                    todayReceiveValue += result[i].amount;
                    todayDeclaredValue += result[i].declared_value;
                }
            }

            if (type === 'tab') {
                return res.status(200).json({
                    status: 200,
                    data: {
                        realValue,
                        receiveValue,
                        declaredValue,
                        todayRealValue,
                        todayReceiveValue,
                        todayDeclaredValue,
                    },
                });
            }

            res.status(200).json({
                status: 200,
                realValue,
                receiveValue,
                declaredValue,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [GET] /api/statistic/daily-stats
    getDailyStats: async (req, res) => {
        try {
            const start = new Date().setHours(0, 0, 0);
            const end = new Date().setHours(23, 59, 59);

            const today = await Stat.find({ createdAt: { $gte: start, $lte: end } }).populate({
                path: 'telco',
                select: 'telco',
            });
            const total = statService.getDailyStats(today);

            const date_start = new Date().setDate(new Date().getDate() - 10);
            const result = await Stat.aggregate([
                {
                    $match: { createdAt: { $gte: new Date(date_start), $lt: new Date() } },
                },
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' },
                            day: { $dayOfMonth: '$createdAt' },
                        },
                        data: { $push: '$$ROOT' },
                        declared_value: { $sum: '$declared_value' },
                        amount: { $sum: '$amount' },
                    },
                },
                { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
                {
                    $project: {
                        _id: 1,
                        declared_value: 1,
                        amount: 1,
                    },
                },
            ]);

            const data = statService.calculateOldData(result);

            res.status(200).json({
                status: 200,
                data,
                total,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },

    // [GET] /api/statistic/users-yield
    getUsersYield: async (req, res) => {
        try {
            const pageSize = 20;
            const skip = (req.page - 1) * pageSize;
            const count = await User.countDocuments({ chargings: { $exists: true, $not: { $size: 0 } } });
            const pages = Math.ceil(count / pageSize);

            const stat = await User.find({ chargings: { $exists: true, $not: { $size: 0 } } })
                .select('account_id nickname chargings')
                .populate({
                    path: 'chargings',
                    select: '-_id declared_value receive_value createdAt',
                    model: 'Stat',
                })
                .skip(skip)
                .limit(pageSize)
                .sort({ createdAt: 1 })
                .exec();

            const data = statService.getUsersYield(stat);
            data.sort((a, b) => b.success - a.success);

            res.status(200).json({
                status: 200,
                data,
                pages,
            });
        } catch (error) {
            res.status(500).json({ error: 'Error server' });
        }
    },
};

export default statController;
