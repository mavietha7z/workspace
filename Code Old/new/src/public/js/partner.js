// Update partner
document.addEventListener('DOMContentLoaded', function () {
    const updateButtons = document.querySelectorAll('.update-button');

    updateButtons.forEach((button) => {
        button.addEventListener('click', async function () {
            const row = this.closest('tr');

            const partner_id = row.querySelector('[name=partner_id]').value;
            const partner_key = row.querySelector('[name=partner_key]').value;
            const partner_name = row.querySelector('[name=partner_name]').value;

            const data = {
                partner_id,
                partner_key,
            };

            try {
                const result = await fetch(`/api/partners?type=tab&partner_name=${partner_name}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const dataJson = await result.json();

                if (dataJson.status === 403) {
                    window.location.href = '/admincp/login';
                } else if (dataJson.status === 200) {
                    Swal.fire('THÔNG BÁO', dataJson.message, 'success');
                } else {
                    Swal.fire('THÔNG BÁO', dataJson.error, 'error');
                }
            } catch (error) {
                Swal.fire('THÔNG BÁO', 'Đã xảy ra lỗi khi gửi yêu cầu', 'error');
            }
        });
    });
});

// Handle status change
document.addEventListener('DOMContentLoaded', function () {
    const switchDiv = document.querySelectorAll('.switch.round.status');

    switchDiv.forEach((div) => {
        div.addEventListener('click', async function () {
            const partner_name = this.getAttribute('partner_name');

            try {
                const result = await fetch(`/api/partners?type=status&partner_name=${partner_name}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const dataJson = await result.json();

                if (dataJson.status === 403) {
                    window.location.href = '/admincp/login';
                } else if (dataJson.status === 200) {
                    this.classList.toggle('on');
                    this.classList.toggle('off');
                } else {
                    Swal.fire('THÔNG BÁO', dataJson.error, 'error');
                }
            } catch (error) {
                Swal.fire('THÔNG BÁO', 'Đã xảy ra lỗi khi gửi yêu cầu', 'error');
            }
        });
    });
});

// Handle active change
document.addEventListener('DOMContentLoaded', function () {
    const switchDiv = document.querySelectorAll('.switch.round.active');

    switchDiv.forEach((div) => {
        div.addEventListener('click', async function () {
            const partner_name = this.getAttribute('partner_name');

            try {
                const result = await fetch(`/api/partners?type=active&partner_name=${partner_name}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const dataJson = await result.json();

                if (dataJson.status === 403) {
                    window.location.href = '/admincp/login';
                } else if (dataJson.status === 200) {
                    this.classList.toggle('on');
                    this.classList.toggle('off');
                } else {
                    Swal.fire('THÔNG BÁO', dataJson.error, 'error');
                }
            } catch (error) {
                Swal.fire('THÔNG BÁO', 'Đã xảy ra lỗi khi gửi yêu cầu', 'error');
            }
        });
    });
});
