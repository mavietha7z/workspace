import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '~/components/Breadcrumb';
import { getDetailsService } from '~/services/services';
import classNames from 'classnames/bind';
import styles from './DetailsService.module.scss';
import moment from 'moment';

const cx = classNames.bind(styles);

interface Service {
    title: string;
    content_html: string;
    createdAt: string;
    views_count: number;
    comments: string[];
}

function DetailsService() {
    const [service, setService] = useState<Service>();
    console.log('service: ', service);

    const { slug } = useParams();

    useEffect(() => {
        const fetch = async () => {
            const result = await getDetailsService(slug);

            result.code === 200 ? setService(result.data) : setService(result.data);
        };
        fetch();
    }, [slug]);

    return (
        <div className="main">
            <Breadcrumb listItem={[{ title: 'Thiết kế website...', path: slug }]} />

            <div className="bg-white py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            <div className={cx('title')}>
                                <h1>{service?.title}</h1>
                            </div>
                            <div className={cx('meta')}>
                                <span>
                                    Người đăng: <b>ADMIN</b>
                                </span>
                                <span>
                                    Ngày đăng: <b>{moment(service?.createdAt).format('DD/MM/YYYY HH:mm')}</b>
                                </span>
                                <span>
                                    Lượt xem: <b>{service?.views_count}</b>
                                </span>
                            </div>

                            <div
                                className={cx('content')}
                                dangerouslySetInnerHTML={{ __html: service?.content_html || '' }}
                            ></div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsService;
