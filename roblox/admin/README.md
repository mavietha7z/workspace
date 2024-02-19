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
mkdir -p /var/www/admin/html
```

```
chown -R $USER:$USER /var/www/admin/html
```

```
chmod -R 755 /var/www/admin
```

### Cấu hình nginx

```
vi /etc/nginx/sites-enabled/admin
```

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/admin/html;
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

<sub>Sửa domain backend lấy api tại file:</sub>

```
/src/utils/index.js
```

Sau đó tải source code lên thư mục `/var/www/admin/html`.
