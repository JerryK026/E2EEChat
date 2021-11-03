node version : 14.17.3

set env
`npm install`

start chat app
`node index`

---

공개키의 경우 .env에 저장해 client들 끼리 공유하고 있다고 전제합니다.  
js의 경우 crypto를 이용하면, pem 형식을 이용하기 때문에 pem 형식 특성상 \n이 들어가게 되므로 온전하게 전송할 수 없습니다.
