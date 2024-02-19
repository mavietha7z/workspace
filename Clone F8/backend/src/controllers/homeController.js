import { Banner } from '../model/banner.model';
import { Blog } from '../model/blog.model';
import { Course } from '../model/course.model';
import { Video } from '../model/video.model';

const homeController = {
    // Thêm mới 1 slideshow
    createNewSlideShow: async (req, res) => {
        try {
            const { title, description, color, background, link, textBtn } = req.body;

            if (!title || !description || !color || !background || !link || !textBtn) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Nhập đầy đủ thông tin',
                });
            } else if (!req.file) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Bạn đang không gửi ảnh',
                });
            } else {
                const { path } = req.file;

                const newSlideShow = new Banner({
                    title,
                    image: path,
                    description,
                    color,
                    background,
                    link,
                    textBtn,
                });

                await newSlideShow.save();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy tất cả slideshow
    getAllSlideShow: async (req, res) => {
        try {
            const { type } = req.query;

            if (type === 'all') {
                const allSlideShow = await Banner.find({}).sort({ createdAt: -1 });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: allSlideShow,
                });
            } else {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Yêu cầu không hợp lệ',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thay đổi trạng thái của slide
    toggleStatusSlide: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const slideshow = await Banner.findById(id);

            if (slideshow) {
                slideshow.status = !slideshow.status;
                await slideshow.save();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Slideshow không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Xóa slideshow
    deleteSlideshow: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const slideshow = await Banner.findById(id);

            if (slideshow) {
                if (slideshow.createdAt > new Date('2023-02-13')) {
                    await slideshow.delete();

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
                    message: 'Slideshow không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy dữ liệu trang chủ
    getDataHomePage: async (req, res) => {
        try {
            const { type } = req.query;

            if (type == 'tab') {
                const slideshow = await Banner.find({ status: true });

                const coursesPro = await Course.find({ pro: true, status: true })
                    .select(
                        'image priority slug userLearning comingSoon published selling oldPrice preOrderPrice title price'
                    )
                    .sort({ priority: 1 });

                const coursesFree = await Course.find({ pro: false, status: true, price: 0 })
                    .select(
                        'image priority slug userLearning comingSoon published selling oldPrice preOrderPrice title'
                    )
                    .sort({ priority: 1 });

                const videos = await Video.find({ status: true, homePage: true })
                    .select('-homePage')
                    .sort({ priority: 1 })
                    .limit(8);

                const blogs = await Blog.find({ status: true, homePage: true })
                    .sort({ priority: 1 })
                    .limit(8)
                    .select('metaTitle slug readingTime imagePreview author')
                    .populate({
                        path: 'author',
                        model: 'User',
                        select: 'name avatar tick admin username',
                    });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: {
                        slideshow,
                        coursesPro,
                        coursesFree,
                        blogs,
                        videos,
                    },
                });
            } else {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Yêu cầu không hợp lệ',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default homeController;
