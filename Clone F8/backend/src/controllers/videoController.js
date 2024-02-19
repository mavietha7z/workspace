import { Video } from '../model/video.model';

const videoController = {
    // Thêm mới video
    createVideo: async (req, res) => {
        try {
            const newVideo = new Video(req.body);
            await newVideo.save();

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy tất cả video
    getVideoByPage: async (req, res) => {
        try {
            const { page } = req.query;

            if (!page) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Parameter không được để trống',
                });
            } else {
                const numberPage = Number(page);
                const pageSize = 10;
                const skip = (numberPage - 1) * pageSize;
                const count = await Video.countDocuments({});
                const totalPages = Math.ceil(count / pageSize);

                const videos = await Video.find({}).skip(skip).limit(pageSize).sort({ createdAt: -1 }).exec();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: videos,
                    totalPages: totalPages,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Xóa tất cả video
    deleteVideo: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length > 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const video = await Video.findById(id);

            if (video) {
                if (video.createdAt > new Date('2023-02-13')) {
                    await video.delete();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else {
                    res.status(403).json({
                        statusCode: 3,
                        message: 'Forbidden - Cannot delete data before 13-02-2023',
                    });
                }
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Video không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thay đổi trạng thái
    toggleStatusChange: async (req, res) => {
        try {
            const { type, id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid video không hợp lệ',
                });
            }
            const video = await Video.findById(id);

            if (video) {
                if (type === 'home') {
                    video.homePage = !video.homePage;
                    await video.save();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else if (type === 'status') {
                    video.status = !video.status;
                    await video.save();

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else {
                    res.status(400).json({
                        statusCode: 1,
                        message: 'Yêu cầu không hợp lệ',
                    });
                }
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Video không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Cập nhật video
    updateVideo: async (req, res) => {
        try {
            const { id } = req.query;
            const { title, image, urlVideo, timeVideo, view, like, comment, priority } = req.body;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid video không hợp lệ',
                });
            }

            if (!title || !image || !urlVideo || !timeVideo || !view || !like || !comment || !priority) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Vui lòng điền đầy đủ thông tin',
                });
            } else {
                const video = await Video.findById(id);

                if (video) {
                    const newVideo = {
                        title,
                        image,
                        urlVideo,
                        timeVideo,
                        view,
                        like,
                        comment,
                        priority,
                    };

                    await video.updateOne({
                        $set: newVideo,
                    });

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                    });
                } else {
                    res.status(404).json({
                        statusCode: 2,
                        message: 'Video không tồn tại',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default videoController;
