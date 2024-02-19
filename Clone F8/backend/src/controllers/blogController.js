import slugify from 'slugify';
import mongoose from 'mongoose';
import { removeTheSign } from '../config';
import { User } from '../model/user.model';
import { Blog } from '../model/blog.model';

const blogController = {
    // Thêm mới bài viết
    createNewPosts: async (req, res) => {
        try {
            const { title, metaTitle, metaDescription, contentHTML, contentMarkdown, imagePreview, readingTime, tags } =
                req.body;
            const { id } = req.user;

            const newTitle = removeTheSign(title);
            // Tạo slug bài viết
            let slug = slugify(newTitle, { remove: /[*+~<>|&#$%^._=()\/'["!:@?,]/g });
            slug = slug.slice(0, 90).toLowerCase();
            let checkSlug = await Blog.findOne({ slug: slug });

            // Nếu slug đã tồn tại lặp qua đến khi nào gặp slug chưa tồn tại thì đặt cái đó làm slug
            if (checkSlug) {
                let count = 1;
                while (await Blog.exists({ slug: `${slug}${count}` })) {
                    count++;
                }
                slug = `${slug}${count}`;
            }

            const newBlog = new Blog({
                title,
                metaTitle,
                metaDescription,
                author: id,
                contentHTML,
                contentMarkdown,
                slug,
                readingTime,
                imagePreview,
                tags,
            });

            const saveBlog = await newBlog.save();
            await User.findByIdAndUpdate(id, { $push: { myBlogs: saveBlog._id } });

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
                data: saveBlog,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy bài viết theo trang
    getPostsByPage: async (req, res) => {
        try {
            const { page, type } = req.query;

            const numberPage = Number(page);
            const pageSize = 10;
            const skip = (numberPage - 1) * pageSize;

            if (!page) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Tham số không hợp lệ',
                });
            } else if (type === 'all') {
                const count = await Blog.countDocuments({});
                const totalPages = Math.ceil(count / pageSize);

                const pages = await Blog.find({})
                    .select(
                        'metaTitle metaDescription author slug readingTime imagePreview homePage tags status createdAt updatedAt'
                    )
                    .populate({
                        path: 'author',
                        model: 'User',
                        select: 'username avatar name tick admin',
                    })
                    .skip(skip)
                    .limit(pageSize)
                    .sort({ createdAt: -1 })
                    .exec();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: pages,
                    totalPages: totalPages,
                });
            } else {
                const count = await Blog.countDocuments({ status: true });
                const totalPages = Math.ceil(count / pageSize);

                const pages = await Blog.find({ status: true })
                    .select(
                        'metaTitle metaDescription author slug readingTime imagePreview tags status createdAt updatedAt'
                    )
                    .populate({
                        path: 'author',
                        model: 'User',
                        select: 'username avatar name tick admin',
                    })
                    .skip(skip)
                    .limit(pageSize)
                    .sort({ createdAt: -1 })
                    .exec();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: pages,
                    totalPages: totalPages,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Thay đổi trạng thái bài viết
    toggleStatusPosts: async (req, res) => {
        try {
            const { id, type } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const posts = await Blog.findById(id);

            if (!posts) {
                return res.status(404).json({
                    statusCode: 2,
                    message: 'Bài viết không tồn tại',
                });
            }

            if (type === 'status') {
                posts.status = !posts.status;
                await posts.save();

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                });
            } else if (type === 'home') {
                posts.homePage = !posts.homePage;
                await posts.save();

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
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy bài viết theo slug
    getPostBySlug: async (req, res) => {
        try {
            const { slug } = req.params;

            const post = await Blog.findOne({ slug: slug })
                .select('author comments contentHTML createdAt reactions readingTime tags title updatedAt status')
                .populate({
                    path: 'author',
                    model: 'User',
                    select: 'username avatar bio myBlogs name tick admin',
                    populate: {
                        path: 'myBlogs',
                        model: 'Blog',
                        select: 'metaTitle slug',
                    },
                });

            if (post) {
                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: post,
                });
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Bài viết không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Xóa tất cả bài viết
    deletePosts: async (req, res) => {
        try {
            const { id: postsId } = req.query;
            const { admin, id } = req.user;

            if (postsId.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            const posts = await Blog.findById(postsId);

            if (posts) {
                if (posts.createdAt > new Date('2023-02-13')) {
                    if (admin) {
                        await posts.delete();

                        res.status(200).json({
                            statusCode: 0,
                            message: 'Yêu cầu thành công',
                        });
                    } else {
                        if (posts.author.toString() === id) {
                            await posts.delete();

                            res.status(200).json({
                                statusCode: 0,
                                message: 'Yêu cầu thành công',
                            });
                        } else {
                            res.status(403).json({
                                statusCode: 2,
                                message: 'Bạn không có quyền này',
                            });
                        }
                    }
                } else {
                    res.status(403).json({
                        statusCode: 3,
                        message: 'Forbidden - Cannot delete data before 13-02-2023',
                    });
                }
            } else {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Bài viết không tồn tại',
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy tất cả bài viết của người dùng đã đăng
    getMyPosts: async (req, res) => {
        try {
            const { id } = req.user;

            const myPost = await User.findById(id).select('myBlogs').populate({
                path: 'myBlogs',
                model: 'Blog',
                select: 'title readingTime slug createdAt',
            });

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
                data: myPost.myBlogs,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Lấy bài viết theo chủ đề
    getTopics: async (req, res) => {
        try {
            const { slug } = req.params;
            const { page } = req.query;

            if (!page) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Số trang là bắt buộc',
                });
            }

            const numberPage = Number(page);
            const pageSize = 10;
            const skip = (numberPage - 1) * pageSize;
            const count = await Blog.countDocuments({ 'tags.value': slug, status: true });
            const totalPages = Math.ceil(count / pageSize);

            const allPostsByTopic = await Blog.find({ 'tags.value': slug, status: true })
                .select('metaTitle metaDescription author slug readingTime imagePreview tags status')
                .populate({
                    path: 'author',
                    model: 'User',
                    select: 'username avatar name tick admin',
                })
                .skip(skip)
                .limit(pageSize)
                .sort({ createdAt: -1 })
                .exec();

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
                data: allPostsByTopic,
                totalPages: totalPages,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Yêu thích bài viết
    reactionPosts: async (req, res) => {
        try {
            const { postsId } = req.body;
            const { id } = req.user;

            if (postsId.length < 24) {
                return res.status(404).json({
                    statusCode: 2,
                    message: 'Uid không hợp lệ',
                });
            }

            let user = await User.findById(id);
            let post = await Blog.findById(postsId)
                .select('-metaDescription -metaTitle -homePage -imagePreview')
                .populate({
                    path: 'author',
                    model: 'User',
                    select: 'username avatar bio myBlogs name tick admin',
                    populate: {
                        path: 'myBlogs',
                        model: 'Blog',
                        select: 'metaTitle slug',
                    },
                });

            if (!post) {
                res.status(404).json({
                    statusCode: 2,
                    message: `Bài viết không tồn tại`,
                });
            } else {
                const checkLiked = user.activities.find((activity) => activity.linkTo === `/blog/${post.slug}`);

                if (post.reactions.includes(id)) {
                    // Nếu đã thích bài viết thì bỏ thích
                    const userIdObject = mongoose.Types.ObjectId(id);

                    post.reactions = post.reactions.filter((id) => id.toString() !== userIdObject.toString());
                    await post.save();

                    if (checkLiked) {
                        await user.updateOne({ $pull: { activities: { linkTo: `/blog/${post.slug}` } } });
                    }

                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                        data: post,
                    });
                } else {
                    post.reactions.push(id);

                    if (!checkLiked) {
                        const activity = {
                            postTitle: post.title,
                            linkTo: `/blog/${post.slug}`,
                            partner: post.author._id,
                            reaction: 'clap',
                            type: 'reaction-post',
                            user: user._id,
                        };
                        await user.updateOne({ $push: { activities: activity } });
                    }

                    await post.save();
                    res.status(200).json({
                        statusCode: 0,
                        message: 'Yêu cầu thành công',
                        data: post,
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default blogController;
