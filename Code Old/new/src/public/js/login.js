document.querySelector('.form-login').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const data = {
        email,
        password,
    };

    try {
        const result = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const dataJson = await result.json();

        if (dataJson.status === 200) {
            Swal.fire('THÔNG BÁO', dataJson.message, 'success');

            setTimeout(() => {
                window.location.href = '/admincp';
            }, 600);
        } else {
            Swal.fire('THÔNG BÁO', dataJson.error, 'error');
        }
    } catch (error) {
        Swal.fire('THÔNG BÁO', 'Đã xảy ra lỗi khi gửi yêu cầu', 'error');
    }
});
