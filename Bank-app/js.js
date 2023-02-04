// Data
const account1 = {
  owner: "furkan",
  movements: [3000, 450, -400],
  movementdate: ["02 / 01 / 2023", "02 / 03 / 2023", "02 / 04 / 2023"],
  movementstype: ["comming", "credit", "send"],
  password: 123,
};

const account2 = {
  owner: "ali",
  movements: [3000, 3400, -150],
  movementdate: ["02 / 01 / 2023", "02 / 03 / 2023", "02 / 04 / 2023"],
  movementstype: ["send", "credit", "send"],
  password: 123,
};

const account3 = {
  owner: "veli",
  movements: [2000, -200, 340],
  movementdate: ["02 / 01 / 2023", "02 / 03 / 2023", "02 / 04 / 2023"],
  movementstype: ["comming", "send", "comming"],
  password: 123,
};

const account4 = {
  owner: "ayse",
  movements: [430, 1000, 700, 50, 90],
  movementdate: [02 / 12 / 2023, 02 / 13 / 2023, 02 / 14 / 2023],
  password: 123,
};

const accounts = [account1, account2, account3, account4];

const username_input = document.querySelector("#input-login-username");
const userpswd_input = document.querySelector("#password");
let btn_login = document.querySelector("#btn-login");

let input_manytransfer_to_who = document.querySelector(
  "#input-transfer-monet-to-who"
);
let input_transfer_moneyamount = document.querySelector(
  "#input-transfer-money-amount"
);
let btn_transfer_money = document.querySelector("#btn-transfer-money");

let input_kredi_money_amount = document.querySelector(
  "#input-kredi-money-amount"
);
let btn_request_loan = document.querySelector("#btn-request-loan");

let input_close_account_hesap_adı = document.querySelector(
  "#input-close-account-hesap-adı"
);

let input_close_account_şifrsi = document.querySelector(
  "#input-close-account-şifrsi"
);

let main = document.querySelector(".main");
let infodiv = document.querySelector(".info");
const account_summary_div = document.querySelector(".account-summary");
let acc_movments_info_div = document.querySelector(".acc-movments-info");
let btn_close_account = document.querySelector("#close");

let currence_balance = document.querySelector("#current-balance");
let warning_message = document.querySelector(".warning-message");
let btn_popup = document.querySelector("#btn_popup");

let current_time = document.querySelector("#currennt-time");
let username;
let current_account;

current_time.innerHTML = creatTime();
displaynone();
prompt(
  "kulanmak için bu dataları kullanın lütfen kulanıcı adı:furkan , şifre:123; kulanıcı adı:ali , şifre:123; kulanıcı adı:veli , şifre:123;"
);

function check() {
  value = false;

  for (i = 0; i < accounts.length; i++) {
    if (
      accounts[i].owner == username_input.value &&
      accounts[i].password == Number(userpswd_input.value)
    ) {
      value = true;
      current_account = accounts[i];
      updatepage(current_account);
      clear_log_inputs(username_input);
      clear_log_inputs(userpswd_input);
      displayAgain();

      break;
    }
  }
  if (!value) {
    warning_message.children[0].innerHTML = `lütfen kulanıcı adı ve şifrenizi doğru girini`;
    popup(`lütfen kulanıcı adı ve şifrenizi doğru giriniz`);
  }
}

function updatepage(current_account) {
  account_summary_div.innerHTML = "";
  for (i = 0; i < current_account.movements.length; i++) {
    let type = determine_movment_tye(current_account.movementstype[i]);
    const html = `
    <div id="summary">
      <div style="display: flex; align-items: center">
        <p id="${current_account.movementstype[i]}">
          <span id="count">${i + 1}</span>
          <span>${type}</span>
        </p>
        <p style="margin-left: 10px">
          <span id="time">${current_account.movementdate[i]}</span>
        </p>
      </div>
      <div>
        <p><span id="amount"></span>${current_account.movements[i]} TL</p>
      </div>
    </div>
    <hr />
    `;
    account_summary_div.insertAdjacentHTML("afterbegin", html);
  }
  calcCurrenceBallance();
  acc_movments_info_div.innerHTML = `<h3> Hoşgeldin   ${current_account.owner}</h3> <h3>Hesap Hareketleri</h3>`;
}

function clear_log_inputs(inputname) {
  inputname.value = "";
  inputname.value = "";
}

function determine_movment_tye(type) {
  if (type == "send") {
    return "para gönderimi";
  } else if (type == "credit") {
    return "kredi çekimi";
  } else {
    return "para alımı";
  }
}

function check_money_transfer() {
  let value = false;
  let whoseAccount;

  for (i = 0; i < accounts.length; i++) {
    if (current_account.owner == input_manytransfer_to_who.value) {
      value = true;
      popup("kendinize para gönderemezsiniz   :)");
      break;
    } else if (
      accounts[i].owner == input_manytransfer_to_who.value &&
      Number(input_transfer_moneyamount.value) > 0
    ) {
      value = true;
      whoseAccount = accounts[i];
      send_money(
        current_account,
        whoseAccount,
        Number(input_transfer_moneyamount.value)
      );
      clear_log_inputs(input_manytransfer_to_who);
      clear_log_inputs(input_transfer_moneyamount);
      updatepage(current_account);

      break;
    }
  }

  if (!value) {
    popup(
      "lütfen gönerdi miktrı sıfırdan büyük ve alıcının ismini doğru giriniz"
    );
  }
}

function send_money(currentAccount, whoseAccount, amount) {
  console.log(whoseAccount, currentAccount);

  let fullYear = creatTime();
  whoseAccount.movementdate.push(fullYear);
  whoseAccount.movementstype.push("comming");
  whoseAccount.movements.push(amount);

  currentAccount.movementstype.push("send");
  currentAccount.movementdate.push(fullYear);
  currentAccount.movements.push(-amount);
}

function requestloan() {
  if (Number(input_kredi_money_amount.value) > 0) {
    let fullYear = creatTime();
    current_account.movementstype.push("credit");
    current_account.movementdate.push(fullYear);
    current_account.movements.push(Number(input_kredi_money_amount.value));
    updatepage(current_account);
    clear_log_inputs(input_kredi_money_amount);
  } else {
    popup("lütfen kredi miktarını için pozit bir sayı girin");
    clear_log_inputs(input_kredi_money_amount);
  }
}

function closeAccount() {
  if (
    current_account.owner == input_close_account_hesap_adı.value &&
    current_account.password == Number(input_close_account_şifrsi.value)
  ) {
    let indexCurrentAcc = accounts.indexOf(current_account);
    accounts.splice(indexCurrentAcc, 1);
    clear_log_inputs(input_close_account_hesap_adı);
    clear_log_inputs(input_close_account_şifrsi);
    displaynone();
  } else {
    popup("lütfen kulanıcı adınınızı ve şifrenizi doğru giriniz");
  }
}
function creatTime() {
  let time = new Date();
  let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  let month = time.getMonth() < 10 ? "0" + time.getMonth() : time.getMonth();
  let year = 2023;

  return `${day}/${month}/${year}`;
}

function displaynone() {
  main.classList.toggle("displaynone");
  infodiv.classList.toggle("displaynone");
  acc_movments_info_div.classList.toggle("displaynone");
}

function displayAgain() {
  main.classList.remove("displaynone");
  infodiv.classList.remove("displaynone");
  acc_movments_info_div.classList.remove("displaynone");
}

function calcCurrenceBallance() {
  let currentBalance = current_account.movements.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  currence_balance.innerHTML = `<h1> ${currentBalance}TL</h1>`;
}

function popup(message) {
  warning_message.classList.remove("displaynone");
  warning_message.children[0].innerHTML = message;
  document.querySelector(".container").style.opacity = 0.4;
}

function close_popup() {
  warning_message.classList.add("displaynone");
  clear_log_inputs(input_close_account_hesap_adı);
  clear_log_inputs(input_close_account_şifrsi);
  clear_log_inputs(input_kredi_money_amount);
  clear_log_inputs(input_manytransfer_to_who);
  clear_log_inputs(input_transfer_moneyamount);
  clear_log_inputs(username_input);
  clear_log_inputs(userpswd_input);
  document.querySelector(".container").style.opacity = 1;
}

// Add event linsteners
btn_login.addEventListener("click", check);
btn_transfer_money.addEventListener("click", check_money_transfer);
btn_request_loan.addEventListener("click", requestloan);
btn_close_account.addEventListener("click", closeAccount);
btn_popup.addEventListener("click", close_popup);
