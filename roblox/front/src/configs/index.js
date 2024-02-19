export const convertCurrency = (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ' : '0đ';
};
