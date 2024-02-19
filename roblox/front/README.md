### Cập nhật và nâng cấp ubuntu

```
apt update
```

```
apt upgrade
```

### Tải và kiểm tra nginx

```
apt install nginx
```

```
systemctl status nginx
```

#### Tạo thư mục và cấp quyền cho thư mục

```
mkdir -p /var/www/front/html
```

```
chown -R $USER:$USER /var/www/front/html
```

```
chmod -R 755 /var/www/front
```

### Cấu hình nginx

```
vi /etc/nginx/sites-enabled/front
```

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/front/html;
        index index.html index.htm index.nginx-debian.html;

        server_name domain www.domain;

        location / {
                try_files $uri /index.html;
        }
}
```

```
nginx -t
```

```
service nginx reload
```

### Sửa code trong source

<sub>Sửa domain react-helmet tại file:</sub>

```
/public/index.html
```

```
/src/layouts/DefaultLayout.js
```

<sub>Sửa domain backend lấy api tại file:</sub>

```
/src/utils/index.js
```

<sub>Xóa hết comment trong source</sub>

Sau đó tải source code lên thư mục `/var/www/front/html`.
