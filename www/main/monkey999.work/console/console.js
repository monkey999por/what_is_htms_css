// APIたたいてみたい
//resultを改行させる

const commands = [
  {
    // example : ssh 111.221.1.1@usert
    name: "ssh",
    // ssh mock
    func: (args) => {
      console.log(args);
      const sshFormat = /[0-9]{3}\.[0-9]{3}\.[0-9]{1,3}\.[0-9]{1,3}@.+/gi;
      if (!sshFormat.test(args)) {
        return `access rejected`;
      }
      const server = document.querySelector(".server");
      const user = document.querySelector(".user");

      server.textContent = args.split("@")[0];
      user.textContent = args.split("@")[1];

      return `login to ${args}`;
    },
  },
  {
    name: "cls",
    func: () => {
      console.log("clear console");
      document.querySelector(".logs").innerHTML = "";
    },
  },
  {
    name: "dummy",
    func: () => {
      return "ああああああああああ<br>ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ";
    },
  },
  {
    name: "exit",
    func: () => {
      if (confirm("logout?")) {
        location.href = "/";
      }
    },
  },
];

const commandHistory = [];
let keyPressCount = 0;

// Main
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const input = document.querySelector('input[type="text"]#command');
    input.focus();
    input.addEventListener(
      "keydown",
      (e) => {
        // 上押下
        if (e.keyCode === 38) {
          if (commandHistory) {
            if (commandHistory.length >= keyPressCount + 1) {
              keyPressCount++;
            }

            const temp = commandHistory[commandHistory.length - keyPressCount];
            input.value = temp ? temp : "";
          }
        } else if (e.keyCode === 40) {
          // 下押下
          if (
            commandHistory.length >= keyPressCount - 1 &&
            commandHistory.length <= keyPressCount - 1
          ) {
            keyPressCount--;
          }
          console.log(commandHistory.length - keyPressCount);
          const temp = commandHistory[commandHistory.length - keyPressCount];
          input.value = temp ? temp : "";
        }

        // Enter押下時
        if (e.keyCode === 13) {
          keyPressCount = 0;
          runCommand(input.value);
          input.value = "";
        }
        // 一番下にスクロール
        const element = document.documentElement;
        const bottom = element.scrollHeight - element.clientHeight;
        window.scroll(0, bottom);
      },
      false
    );

    // 画面クリックでコマンド入力にフォーカス
    document.addEventListener("click", () => input.focus(), false);
  },
  false
);

/**
 * コマンドを実行して結果を表示
 *
 * @param commandFunc 実行するコマンド
 * @param args コマンドの引数
 */
const runCommand = (inputInfo) => {
  // コマンド実行
  const [inputCommandName, args] = inputInfo.split(/(?<=^[^\s]+)\s/);
  console.log(inputCommandName);
  const command = commands.filter(
    (command) => inputCommandName === command.name
  );

  const result = command[0]
    ? command[0]?.func(args)
    : (() => {
        try {
          eval(inputInfo);
        } catch (e) {
          console.log(e);
        } finally {
          return "run eval";
        }
      })();
  // : `${inputCommandName} is not a command`;

  // 履歴の保存
  const logs = document.querySelector(".logs");
  const server = document.querySelector(".server");
  const user = document.querySelector(".user");
  // 上ボタン、下ボタンで使う。
  commandHistory.push(inputInfo);

  // 結果生成
  // 実行したコマンド
  const historyElement = document.createElement("p");
  historyElement.textContent = `${server.textContent}@${user.textContent}$ ${inputInfo}`;

  // コマンドの結果
  const resultElement = document.createElement("p");
  resultElement.textContent = result;

  const group = document.createElement("div");
  group.setAttribute("class", "histories");

  group.appendChild(historyElement);
  group.appendChild(resultElement);
  logs.appendChild(group);
};
