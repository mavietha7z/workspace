const express = require('express');
const startProject = require('../browser');
const app = express();

app.get('/', (req, res) => {
    let i = 0;
    function runProject() {
        startProject();
        console.log('Chạy lần thứ:', i);
        i++;

        if (i < 1) {
            setTimeout(runProject, 10000);
        }
    }

    // Gọi hàm runProject để bắt đầu quá trình
    runProject();

    res.send('Đã hoàn tất!');
});

app.listen(3000, () => {
    console.log('Server đang chạy tại localhost:3000');
});
