const imageController = {
    // Upload ảnh lấy url
    uploadImage: async (req, res) => {
        try {
            if (!req.file) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Bạn đang không chọn ảnh',
                });
            } else {
                const { path } = req.file;

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: {
                        urlImage: path,
                    },
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default imageController;
