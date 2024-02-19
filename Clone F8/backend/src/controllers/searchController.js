import { Blog } from '../model/blog.model';
import { Course } from '../model/course.model';
import { Video } from '../model/video.model';

const searchController = {
    // Tìm khóa học theo tên
    searchByName: async (req, res) => {
        try {
            const { type, q } = req.query;

            if (!q) {
                return res.status(404).json({
                    message: 'Parameter không được để trống',
                    statusCode: 1,
                    data: [],
                });
            }

            let params = [];
            let objWhere = {};
            params.q = q;

            if (params.q.length > 1) {
                objWhere.title = new RegExp(params.q, 'i');
                objWhere.status = true;
                objWhere.comingSoon = false;
            }

            let courses = await Course.find(objWhere).select('title image slug description');
            let blogs = await Blog.find(objWhere).select('title imagePreview slug');
            let videos = await Video.find(objWhere).select('title image urlVideo');

            if (type === 'all') {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: [courses, blogs, videos],
                });
            } else if (type === 'odd') {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: {
                        courses,
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

export default searchController;
