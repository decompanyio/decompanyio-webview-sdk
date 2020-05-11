

## 직접실행

```bash
docker run --rm -p 80:80 -v "$(pwd)"/build:/usr/share/nginx/html:ro -v "$(pwd)"/nginx.conf:/etc/nginx/nginx.conf:ro nginx
```

## Docker 이미지 생성하기 

```
docker build . -t ps-sdk
```

## Docker 이미지 (재)생성하기 

```
docker build . --no-cache -t ps-sdk
```

## 생성된 이미지 구동시키기

```bash
docker run --rm -p 80:80 ps-sdk
```


