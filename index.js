const net = require("net");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const { base64decode, base64encode } = require("./encoder");
const makeSessionKey = require("./makeKeyMsg");
const makeMsg = require("./makeMsg");
const makeKey = require("./makeSessionKey");

let userName = "";
const endPoint = "";
let endPointPublicKey = "";

console.log("loading...");

const setUserInformation = (f) => {
  userName = "";
  rl.question("set user name : ", (line) => {
    userName = line;
    rl.close();
    console.log("userName : " + userName);
    f();
  });
};

const setEndPointInformation = (f) => {
  rl.question("set end user name : ", (line) => {
    endPoint = line;
    rl.close();
    console.log("end user name : " + endPoint);
    f();
  });
};

const client = net.connect({ port: 8080, host: "homework.islab.work" }, () => {
  setUserInformation(() => {
    client.write(`3EPROTO CONNECT\nCredential: ${userName}`);
  });
  console.log(userName);

  // new Promise(() => {
  //   rl.question("set user name : ", function (line) {
  //     userName = line;
  //     rl.close();
  //   });
  // })
  //   .then(() => {
  //     rl.question("set user endPoint : ", function (line) {
  //       endPoint = line;
  //       rl.close();
  //     });
  //   })
  //   .then(() => {
  //     // connection
  //     client.write(`3EPROTO CONNECT\nCredential: ${userName}`);
  //   });
});

client.on("data", (data) => {
  const msg = base64decode(data);
  console.log(msg);

  // 서버와 연결 성공한 경우 키를 교환한다.
  if (msg.split("\n")[0] == "3EPROTO ACCEPT") {
    console.log("set end point name : ");
    // rl.on("line", (line) => (userName = line));
    setEndPointInformation(() => {
      // const keyMsg = makeSessionKey(userName, endPoint);
      // console.log(keyMsg);
      // client.write(keyMsg);
    });
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
