import Select from 'react-select';
import { useEffect, useState } from 'react';
import makeAnimated from 'react-select/animated';
import { Button, Modal, Table } from 'react-bootstrap';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getServices } from '~/services/service';
import { alertError, alertSuccess } from '~/configs/alert';
import { destroyService, moreServices } from '~/services/category';

const animatedComponents = makeAnimated();

function Service({ show, setShow, setCategories, id }) {
    const [options, setOptions] = useState([]);
    const [services, setServices] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchService = async () => {
                const result = await getServices(id, 'category');

                if (result.code === 200) {
                    const data = result.data.map((service) => {
                        return { value: service._id, label: service.title };
                    });

                    setOptions(data);
                    setServices(result.services);
                } else {
                    alertError(result.error);
                }
            };
            fetchService();
        }
    }, [id]);

    const handleServices = async () => {
        if (!selected) {
            return alertError('Chọn dịch vụ cần thêm');
        }

        const data = selected.map((service) => service.value);

        const result = await moreServices(id, data);

        if (result.code === 200) {
            const clone = options.filter((item) => !data.includes(item.value));
            setOptions(clone);
            setSelected([]);
            setCategories(result.data);
            setServices(result.services);
            alertSuccess(result.message);
        } else {
            alertError(result.error);
        }
    };

    const handleDestroy = async (data, index) => {
        if (!data) {
            return alertError('UID không tồn tại');
        }

        const result = await destroyService(id, data);

        if (result.code === 200) {
            const clone = [...services];
            clone.splice(index, 1);
            setServices(clone);
        } else {
            alertError(result.error);
        }
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Thêm dịch vụ vào danh mục</Modal.Title>
            </Modal.Header>
            <Modal.Body className="my-4">
                <Select
                    isMulti
                    components={animatedComponents}
                    options={options}
                    onChange={setSelected}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={selected}
                />
                <label className="mt-4 mb-1">Dịch vụ đã thêm</label>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.length > 0 ? (
                            services.map((service, index) => (
                                <tr key={service._id}>
                                    <td className="text-left">{service.title}</td>
                                    <td style={{ width: 100 }}>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            title="Xóa"
                                            onClick={() => handleDestroy(service._id, index)}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2}>Chưa có dịch vụ</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="secondary" onClick={() => setShow(false)}>
                    Đóng
                </Button>
                <Button size="sm" onClick={handleServices}>
                    Thêm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Service;
