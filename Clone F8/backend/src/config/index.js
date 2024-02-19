import jwt from 'jsonwebtoken';

// Generate accessToken
export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            admin: user.admin,
        },
        'jwt-access-key',
        {
            expiresIn: '365d',
        }
    );
};

// Generate refreshToken
export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            admin: user.admin,
        },
        'jwt-refresh-key',
        {
            expiresIn: '365d',
        }
    );
};

// Hàm chuyển tên người dùng thành username
export const convertNameToUsername = (name) => {
    name = name.toLowerCase();
    name = name.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    name = name.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    name = name.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    name = name.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    name = name.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    name = name.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    name = name.replace(/đ/g, 'd');
    name = name.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
    name = name.replace(/\u02C6|\u0306|\u031B/g, '');

    // Remove whitespace
    const arr = name.split(' ');
    const newStr = arr.join('');

    return newStr;
};

// HTML gửi email
export const contentSendMail = (code) => {
    return `
            <table style="width: 100%">
                <div
                    style="
                        box-sizing: border-box;
                        color: #0a0a0a;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 1.3;
                        margin: 0;
                        min-width: 100%;
                        padding: 0;
                        text-align: left;
                        width: 100% !important;
                        font-family: Helvetica, Arial, sans-serif;
                        background-color: #cccc;
                    "
                >
                    <table
                        style="border-collapse: collapse; border-spacing: 0; height: 100%; vertical-align: top; width: 100%"
                    >
                        <tbody>
                            <tr>
                                <td
                                    align="center"
                                    valign="top"
                                    style="border-collapse: collapse !important; vertical-align: top; word-wrap: break-word"
                                >
                                    <center style="min-width: 580px; width: 100%">
                                        <table
                                            align="center"
                                            style="
                                                background: #fefefe;
                                                border-bottom: 3px solid #b2d600;
                                                border-collapse: collapse;
                                                border-spacing: 0;
                                                float: none;
                                                margin: 60px 40px;
                                                padding: 0;
                                                text-align: center;
                                                vertical-align: top;
                                                width: 580px;
                                            "
                                        >
                                            <tbody>
                                                <tr>
                                                    <th style="padding: 0 18px">
                                                        <center style="min-width: 532px; width: 100%; margin-top: 32px">
                                                            <img
                                                                src="https://fullstack.edu.vn/assets/images/f8_avatar.png"
                                                                align="center"
                                                                style="
                                                                    clear: both;
                                                                    display: block;
                                                                    float: none;
                                                                    margin: 0 auto;
                                                                    max-width: 100%;
                                                                    outline: 0;
                                                                    text-align: center;
                                                                    text-decoration: none;
                                                                    width: 44px;
                                                                "
                                                                data-bit="iit"
                                                                tabindex="0"
                                                            />
                                                        </center>
                                                        <h3
                                                            style="
                                                                color: inherit;
                                                                font-size: 28px;
                                                                font-weight: 600;
                                                                margin: 16px 0 32px 0;
                                                                text-align: center;
                                                                word-wrap: normal;
                                                            "
                                                        >
                                                            Mã xác minh tại F8
                                                        </h3>
                                                        <p
                                                            style="
                                                                font-size: 14px;
                                                                line-height: 24px;
                                                                margin-bottom: 10px;
                                                                font-weight: 400;
                                                                text-align: left;
                                                                margin-top: 0;
                                                            "
                                                        >
                                                            Để xác minh tài khoản của bạn, hãy nhập mã này vào F8:
                                                        </p>
                                                        <div
                                                            style="
                                                                background-color: #ebebeb;
                                                                color: #333;
                                                                font-size: 40px;
                                                                letter-spacing: 8px;
                                                                padding: 16px;
                                                                text-align: center;
                                                                font-weight: 400;
                                                            "
                                                        >
                                                            ${code}
                                                        </div>
                                                        <center style="min-width: 532px; width: 100%">
                                                            <div align="center">
                                                                <p
                                                                    style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        margin-bottom: 10px;
                                                                        text-align: left;
                                                                        font-weight: 400;
                                                                    "
                                                                >
                                                                    Mã xác minh sẽ hết hạn sau 48 giờ.
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        margin-bottom: 6px;
                                                                        font-weight: 400;
                                                                        text-align: left;
                                                                        margin-top: 10px;
                                                                    "
                                                                >
                                                                    <b>Nếu bạn không yêu cầu mã</b>, bạn có thể bỏ qua tin
                                                                    nhắn này.
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        margin-bottom: 10px;
                                                                        text-align: left;
                                                                        font-weight: 400;
                                                                    "
                                                                >
                                                                    Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào hãy liên hệ
                                                                    với chúng tôi qua hòm thư
                                                                    <a
                                                                        href="mailto:contact@fullstack.edu.vn"
                                                                        style="color: #00aa9d; text-decoration: none"
                                                                        target="_blank"
                                                                        >contact@fullstack.edu.vn</a
                                                                    >
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        text-align: left;
                                                                        font-weight: 400;
                                                                        margin-top: 14px;
                                                                    "
                                                                >
                                                                    Trân trọng,
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        margin-bottom: 10px;
                                                                        text-align: left;
                                                                        font-weight: 400;
                                                                        margin-top: 10px;
                                                                    "
                                                                >
                                                                    Đội ngũ phát triển
                                                                    <a href="https://fullstack.edu.vn" target="_blank"
                                                                        >fullstack.edu.vn</a
                                                                    >
                                                                </p>
                                                                <p
                                                                    style="
                                                                        font-size: 14px;
                                                                        line-height: 24px;
                                                                        color: #757575;
                                                                        text-align: left;
                                                                        font-weight: 400;
                                                                        margin-top: 42px;
                                                                    "
                                                                >
                                                                    <i
                                                                        >Đây là email được tạo tự động. Vui lòng không trả
                                                                        lời thư này.</i
                                                                    >
                                                                </p>
                                                            </div>
                                                        </center>
                                                    </th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </center>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </table>`;
};

// Xóa kí tự đặc biệt
export const removeTheSign = (title) => {
    return title.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
    );
};
