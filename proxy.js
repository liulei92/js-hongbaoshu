/*
 * @Description: 代理js
 * @Date: 2021-02-10 10:02:47
 * @Author: LeiLiu
 */
// 基础语法
const target = {
  message1: "hello",
  message2: "everyone"
}

const handler = {};

const proxy = new Proxy(target, handler);
// receiver 接收器
// 进阶1
const bankAccount = {
  balance: 2020,
  name: "yu"
};

const handler = {
  get: function (target, prop, receiver) {
    console.log(target, prop, receiver);
    if (prop === "balance") {
      console.log(`Current Balance Of: ${target.name} Is: ${target.balance} `);
    }
    return target[prop];
  },
  set: function(target, prop, value, receiver) {
    console.log(target, prop, value, receiver);
    if (prop === "balance") {
      console.log(`${target.balance}, new : ${value}`);
      if (isNaN(value) || value < 0) {
        console.log("balance is error");
        return false; // 更新失败
      }
      target[prop] = value;
      return true; // 更新成功
    }
    
  }
};

const wrappedBankAcount = new Proxy(bankAccount, handler);