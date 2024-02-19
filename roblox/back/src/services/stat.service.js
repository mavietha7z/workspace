const statService = {
    // [GET] /api/statistic/daily-stats
    getDailyStats: (today) => {
        let VIE_total = 0;
        let VIE_success = 0;
        let VIN_total = 0;
        let VIN_success = 0;
        let MOB_total = 0;
        let MOB_success = 0;
        let VIT_total = 0;
        let VIT_success = 0;
        let ZIN_total = 0;
        let ZIN_success = 0;
        let GAT_total = 0;
        let GAT_success = 0;
        let GAR_total = 0;
        let GAR_success = 0;
        let VCO_total = 0;
        let VCO_success = 0;
        let total = 0;
        let success = 0;

        for (let i = 0; i < today.length; i++) {
            if (today[i].telco?.telco === 'VIETTEL') {
                VIE_total += today[i].declared_value;
                VIE_success += today[i].receive_value;
            }
            if (today[i].telco?.telco === 'VINAPHONE') {
                VIN_total += today[i].declared_value;
                VIN_success += today[i].receive_value;
            }
            if (today[i].telco?.telco === 'MOBIFONE') {
                MOB_total += today[i].declared_value;
                MOB_success += today[i].receive_value;
            }
            if (today[i].telco?.telco === 'VIETNAMOBILE') {
                VIT_total += today[i].declared_value;
                VIT_success += today[i].receive_value;
            }
            if (today[i].telco?.telco === 'ZING') {
                ZIN_total += today[i].declared_value;
                ZIN_success += today[i].receive_value;
            }
            if (today[i].telco?.telco === 'GATE') {
                GAT_total += today[i].declared_value;
                GAT_success += today[i].receive_value;
            }
            if (today[i].telco?.telco === 'GARENA') {
                GAR_total += today[i].declared_value;
                GAR_success += today[i].receive_value;
            }
            if (today[i].telco?.telco === 'VCOIN') {
                VCO_total += today[i].declared_value;
                VCO_success += today[i].receive_value;
            }
            total += today[i].declared_value;
            success += today[i].receive_value;
        }

        return [
            {
                telco: 'VIETTEL',
                total: VIE_total,
                success: VIE_success,
            },
            {
                telco: 'VINAPHONE',
                total: VIN_total,
                success: VIN_success,
            },
            {
                telco: 'MOBIFONE',
                total: MOB_total,
                success: MOB_success,
            },
            {
                telco: 'VIETNAMOBILE',
                total: VIT_total,
                success: VIT_success,
            },
            {
                telco: 'ZING',
                total: ZIN_total,
                success: ZIN_success,
            },
            {
                telco: 'GATE',
                total: GAT_total,
                success: GAT_success,
            },
            {
                telco: 'GARENA',
                total: GAR_total,
                success: GAR_success,
            },
            {
                telco: 'VCOIN',
                total: VCO_total,
                success: VCO_success,
            },
            {
                telco: null,
                total,
                success,
            },
        ];
    },

    // [GET] /api/statistic/daily-stats
    calculateOldData: (data) => {
        const date = new Date();

        // Lặp qua các ngày từ 9 ngày trước đến ngày hiện tại
        for (let i = 9; i >= 0; i--) {
            const currentDate = new Date();
            currentDate.setDate(date.getDate() - i);

            // Kiểm tra xem dữ liệu cho ngày hiện tại đã tồn tại trong kết quả hay chưa
            const existingData = data.find((item) => {
                return (
                    item._id.year === currentDate.getFullYear() &&
                    item._id.month === currentDate.getMonth() + 1 &&
                    item._id.day === currentDate.getDate()
                );
            });

            // Nếu không tìm thấy dữ liệu, thêm ngày tháng năm và các giá trị mặc định
            if (!existingData) {
                data.push({
                    _id: {
                        year: currentDate.getFullYear(),
                        month: currentDate.getMonth() + 1,
                        day: currentDate.getDate(),
                    },
                    declared_value: 0,
                    receive_value: 0,
                });
            }
        }

        // Sắp xếp lại kết quả theo thứ tự ngày tháng năm
        data.sort((a, b) => {
            const dateA = new Date(a._id.year, a._id.month - 1, a._id.day);
            const dateB = new Date(b._id.year, b._id.month - 1, b._id.day);
            return dateA - dateB;
        });

        // Xóa dữ liệu hôm nay, trả về dữ liệu 9 ngày trước không có hôm nay
        let newData = data.slice();
        newData.pop();
        return newData;
    },

    // [GET] /api/statistic/users-yield
    getUsersYield: (stat) => {
        const today = new Date().toISOString().slice(0, 10);

        return stat.map((item) => {
            // Tính tổng declared_value và receive_value
            const total = item.chargings.reduce((sum, charging) => sum + charging.declared_value, 0);
            const success = item.chargings.reduce((sum, charging) => sum + charging.receive_value, 0);

            // Tính giá trị receive_value của hôm nay
            const todayValue = item.chargings.reduce((sum, charging) => {
                const chargingDate = charging.createdAt.toISOString().slice(0, 10);

                if (chargingDate === today) {
                    return sum + charging.receive_value;
                }

                return sum;
            }, 0);

            return {
                _id: item._id,
                nickname: item.nickname,
                account_id: item.account_id,
                total,
                success,
                today: todayValue,
            };
        });
    },
};

export default statService;
