document.querySelector('.form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const code = document.querySelector('input[name="code"]').value;
    const telco = document.querySelector('select[name="telco"]').value;
    const serial = document.querySelector('input[name="serial"]').value;
    const amount = document.querySelector('select[name="amount"]').value;
    const account_id = document.querySelector('input[name="account_id"]').value;

    const data = {
        code,
        telco,
        serial,
        amount,
        account_id,
    };

    try {
        const result = await fetch('/chargingws/v2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const dataJson = await result.json();

        if (dataJson.status === 200) {
            Swal.fire('THÔNG BÁO', dataJson.message, 'success');
        } else {
            Swal.fire('THÔNG BÁO', dataJson.error, 'error');
        }
    } catch (error) {
        Swal.fire('THÔNG BÁO', 'Đã xảy ra lỗi khi gửi yêu cầu', 'error');
    }
});
