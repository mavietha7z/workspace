import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

function PageTitle({ name }) {
    return (
        <Col xl={5}>
            <h1 className="wrapper-title">{name}</h1>

            <div className="nav">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link className="link" to="/">
                            Bảng quản trị
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link className="link link-next">{name}</Link>
                    </li>
                </ol>
            </div>
        </Col>
    );
}

export default PageTitle;
