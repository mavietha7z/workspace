import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const alertSuccess = (message) => {
    MySwal.fire('Thành công', message, 'success');
};

export const alertError = (error) => {
    MySwal.fire('Lỗi', error || 'Lỗi hệ thống vui lòng thử lại', 'error');
};
