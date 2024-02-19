import { Blog } from '../model/blog.model';
import { Comment } from '../model/comment.model';
import { Lesson } from '../model/lesson.model';
import { User } from '../model/user.model';

const commentController = {
    // Lấy tất cả bình luận của bài viết
    getAllComments: async (req, res) => {
        try {
            const { type, id } = req.query;

            if (id.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            if (type === 'lesson') {
                const lesson = await Lesson.findById(id);
                const comments = await Comment.find({ lessonId: id })
                    .populate({
                        path: 'author',
                        select: 'name username avatar admin tick',
                    })
                    .sort({ createdAt: -1 });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: comments,
                    total: lesson.comments.length,
                });
            } else if (type === 'posts') {
                const posts = await Blog.findById(id);
                const comments = await Comment.find({ postsId: id })
                    .populate({
                        path: 'author',
                        select: 'name username avatar admin tick',
                    })
                    .sort({ createdAt: -1 });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: comments,
                    total: posts.comments.length,
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

    // Lấy bình luận trả lời
    getCommentReplies: async (req, res) => {
        try {
            const { id } = req.query;

            if (id.length < 24) {
                res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            } else {
                const comment = await Comment.findById(id).populate({
                    path: 'replies',
                    model: 'Comment',
                    populate: {
                        path: 'author authorReply',
                        select: 'name username avatar admin tick',
                    },
                });

                if (comment) {
                    const { replies, ...other } = comment._doc;

                    setTimeout(() => {
                        res.status(200).json({
                            statusCode: 0,
                            message: 'Yêu cầu thành công',
                            data: replies,
                        });
                    }, 800);
                } else {
                    res.status(404).json({
                        statusCode: 2,
                        message: 'Bình luận không tồn tại',
                    });
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Bình luận bài viết
    createComment: async (req, res) => {
        try {
            const { id } = req.user;
            const { type } = req.query;
            const { contentHTML, contentMarkdown } = req.body;

            let model;
            let modelIdKey;

            switch (type) {
                case 'posts':
                    model = Blog;
                    modelIdKey = 'postsId';
                    break;
                case 'lesson':
                    model = Lesson;
                    modelIdKey = 'lessonId';
                    break;
                default:
                    return res.status(400).json({
                        statusCode: 1,
                        message: 'Yêu cầu không hợp lệ',
                    });
            }

            const [modelId, modelObject] = await Promise.all([
                req.body[modelIdKey],
                model.findById(req.body[modelIdKey]),
            ]);

            if (!modelId || modelId.length < 24) {
                return res.status(400).json({
                    statusCode: 1,
                    message: 'Uid không hợp lệ',
                });
            }

            if (!modelObject) {
                return res.status(404).json({
                    statusCode: 2,
                    message: `${model.modelName} không tồn tại`,
                });
            }

            const newComment = new Comment({
                [modelIdKey]: modelId,
                author: id,
                contentHTML,
                contentMarkdown,
            });

            const comment = await (
                await newComment.save()
            ).populate({
                path: 'author',
                select: 'name username avatar admin tick',
            });

            await User.findByIdAndUpdate(id, { $push: { myComments: comment._id } });
            await modelObject.updateOne({ $push: { comments: comment._id } });

            res.status(200).json({
                statusCode: 0,
                message: 'Yêu cầu thành công',
                data: comment,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Trả lời bình luận
    replyComment: async (req, res) => {
        try {
            const { ownerComment, authorReply, contentHTML, contentMarkdown } = req.body;
            const author = req.user.id;

            const checkComment = await Comment.findById(ownerComment);
            const checkAuthorReply = await User.findById(authorReply);

            if (!checkComment) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Bình luận cha không tồn tại',
                });
            } else if (!checkAuthorReply) {
                res.status(404).json({
                    statusCode: 2,
                    message: 'Trả lời người dùng không tồn tại',
                });
            } else {
                const commentReply = new Comment({
                    authorReply,
                    author,
                    contentHTML,
                    contentMarkdown,
                });

                const comment = await (
                    await commentReply.save()
                ).populate({
                    path: 'author authorReply',
                    select: 'name username avatar admin tick',
                });

                await checkComment.updateOne({ $push: { replies: comment._id } });
                await User.findByIdAndUpdate(author, { $push: { myComments: comment._id } });

                res.status(200).json({
                    statusCode: 0,
                    message: 'Yêu cầu thành công',
                    data: comment,
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

export default commentController;
