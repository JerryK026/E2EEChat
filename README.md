node version : 14.17.3

시작하기 앞서 현재 디렉터리에서 실행합니다.  
`npm install`

각각의 클라이언트를 실행합니다.  
`node client1`
`node client2`

---

공개키의 경우 .env에 저장해 client들 끼리 공유하고 있다고 전제합니다.  
js의 경우 crypto를 이용하면, pem 형식을 이용하기 때문에 pem 형식 특성상 \n이 들어가게 되므로 온전하게 전송할 수 없기 때문입니다.
