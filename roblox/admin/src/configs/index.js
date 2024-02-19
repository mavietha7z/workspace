import routes from './routes';
import sidebar from './sidebar';

const config = {
    routes,
    sidebar,
};

export const convertCurrency = (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ' : '0đ';
};

export default config;
