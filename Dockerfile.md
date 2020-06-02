

## 프로젝트 빌드
```
npm run build
```


## 빌드된 React App 직접실행

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

## Docker 이미지 등록하기

```
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 197966029048.dkr.ecr.ap-northeast-2.amazonaws.com
```

```
docker build -t decompany/dev/ps-sdk .
or
docker build -t 197966029048.dkr.ecr.ap-northeast-2.amazonaws.com/decompany/dev/ps-sdk:latest .
```

```
docker tag decompany/dev/ps-sdk:latest 197966029048.dkr.ecr.ap-northeast-2.amazonaws.com/decompany/dev/ps-sdk:latest
```

```
docker push 197966029048.dkr.ecr.ap-northeast-2.amazonaws.com/decompany/dev/ps-sdk:latest
```