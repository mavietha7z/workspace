![](https://i.imgur.com/U4VvxM4.png)

### Cập nhật và nâng cấp ubuntu

```
apt update
```

```
apt upgrade
```

### Tải và nâng cấp các package cần thiết

<sub>Tải nginx và kiểm tra</sub>

```
apt install nginx
```

```
systemctl status nginx
```

<sub>Cấu hình và tải nodejs</sub>

```
curl -sL https://deb.nodesource.com/setup_19.x -o /tmp/nodesource_setup.sh
```

```
bash /tmp/nodesource_setup.sh
```

```
apt install nodejs
```

```
node -v
```

`Output: v19.19.0`

<sub>Tải npm</sub>

```
apt-get install aptitude
```

```
aptitude install npm
```

```
npm -v
```

`Output: Npm version`

<sub>Cấu hình và tải mongodb</sub>

```
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
```

`Output: OK`

```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
```

```
apt update
```

```
apt install mongodb-org
```

```
systemctl start mongod.service
```

<sub>Tải pm2</sub>

```
npm i pm2 -g
```

### Tạo thư mục và cấp quyền cho thư mục

```
mkdir -p /var/www/back/html
```

```
chown -R $USER:$USER /var/www/back/html
```

```
chmod -R 755 /var/www/back
```

### Cấu hình nginx

```
vi /etc/nginx/sites-enabled/back
```

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/back/html;
        index index.js index.html index.htm index.nginx-debian.html;

        server_name domain.com www.domain.com;

        location / {
                proxy_pass http://localhost:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
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

<sub>Thêm domain vào file:</sub>

```
/src/views/index.ejs
```

Sau đó upload source code vào thư mục `/var/www/back/html`

### Cấu hình mongodb

<sub>Tạo database</sub>

```
mongo
```

```
use "code-old"
```

<sub>Tải lên các file dữ liệu có sẵn</sub>

```
mongoimport --db code-old --collection auths --file /var/www/back/html/auths.json --jsonArray
```

### Chạy dự án

<sub>Sau khi upload source code vào thư mục</sub>

```
cd /var/www/back/html
```

```
npm i
```

```
pm2 start index.js
```
