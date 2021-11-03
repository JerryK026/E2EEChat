const net = require("net");
const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("crypto");

const keyGenerator = require("./keyGenerator");
const { base64decode, base64encode } = require("./encoder");
const makeMsg = require("./makeMsg");
const makeKeyMsg = require("./makeKeyMsg");
const encryption = require("./encryption");

const publicKey = keyGenerator.getPublicKey("base64");
const privateKey = keyGenerator.getPrivateKey("base64");

let userName = "";
let endPoint = "";
let endPointPublicKey = "";
let symmetricKey = "WhnmchdhP6aS28bbp6WXElQacdJK59cGwlTDY0FKmKU=";
let encryptedSKey = "";
let endPointSymmetricKey = "";
let endPointEncryptedSKey = "";
let iv = "";

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

console.log("publicKey : " + publicKey);
console.log("privateKey : " + privateKey);

console.log("loading...");

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("chat");
});

app.post("/setUser", (req, res) => {
  userName = req.body.userName;
  endPoint = req.body.endPoint;
  console.log("userName : " + userName);
  console.log("endPoint : " + endPoint);
  client.write(`3EPROTO CONNECT\nCredential: ${userName}`);
});

app.get("/connection", (req, res) => {
  const keyMsg = makeKeyMsg(userName, endPoint, publicKey);
  console.log(keyMsg);
  client.write(keyMsg);
});

app.post("/send", (req, res) => {});

const client = net.connect(
  { port: 8080, host: "homework.islab.work" },
  () => {}
);

client.on("data", (data) => {
  const msg = base64decode(data);
  console.log(msg);

  // 키를 전달받은 경우 키를 저장한다.
  if (msg.split("\n")[0] == "3EPROTO KEYXCHG") {
    const keyMsg = msg.split("\n")[6].trim();

    // 1번째 키를 받은 경우, 공개키다
    if (endPointPublicKey == "") {
      console.log("get public key : \n" + keyMsg);
      endPointPublicKey = keyMsg;
      // encryptedSKey = encryption.cipherKey(symmetricKey, endPointPublicKey);
      client.write(`3EPROTO KEYXCHG\nAlgo: AES-256-CBC\nFrom: CNU-InfoSecUser\nTo: CNU-InfoSecUser2\n\n\
      ${encryptedSKey}\nf8uA/XqfIIpdnED+yFj0+w==\n    `);
    }
    // 2번째 키를 받은 경우, 암호화된 대칭키다.
    else {
      iv = msg.split("\n")[7].trim();
      endPointEncryptedSKey = keyMsg;
      // endPointSymmetricKey = encryption.decipherKey(symmetricKey, publicKey);
      console.log("get symmetric key : \n" + keyMsg);
      console.log("get iv : \n" + iv);
    }
  }

  // 접속 실패했을 경우. 대부분 credential이 중복된 경우 발생한다.
  if (msg.split("\n")[0] == "3EPROTO DENY") {
    // client.on("end", () => {
    //   console.log("Client connection false. Check overlaped username");
    // });
    process.exit();
  }

  // 키 교환에 정상적으로 성공한 경우, 메세지를 전송한다.
  if (msg.split("\n")[0] == "3EPROTO KEYXCHGOK") {
    // 메세지 암호화하는 기능을 추가해야 한다.
    let inputMsg = "";
    console.log("message : ");
    rl.on("line", (line) => (inputMsg = line));

    const sendMsg = makeMsg(userName, endPoint);
    console.log(sendMsg);
    client.write(sendMsg);
  }

  // 키 교환에 실패한 경우 이미 키를 교환했거나, 사용자가 키 교환 요청 처리 중 오류가 발생한 경우다.
  if (msg.split("\n")[0] == "3EPROTO KEYXCHGFAIL") {
    // console.log(msg);
    // 키를 수정할 때 다음을 이용한다.
    // client.write(`3EPROTO KEYXCHGRST\n...`)
  }

  // 메세지 송신에 성공한 경우 발생한다.
  if (msg.split("\n")[0] == "3EPROTO MSGSENDOK") {
    console.log("msg send complete!");
  }

  // 메세지 송신에 실패한 경우 발생한다.
  if (msg.split("\n")[0] == "3EPROTO MSGSENDFAIL") {
    console.log("msg send fail");
  }

  // 메세지 수신에 성공한 경우 발생한다.
  if (msg.split("\n")[0] == "3EPROTO MSGRECV") {
    console.log("msg get complete!");
  }

  // 서버와 연결 끊어진 경우
  if (msg.split("\n")[0] == "3EPROTO BYE") {
    client.on("end", () => console.log("Client disconnected"));
    process.exit();
  }
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
