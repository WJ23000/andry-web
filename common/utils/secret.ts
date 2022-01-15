// 引用AES源码js
import CryptoJS from "crypto-js";

// 十六位十六进制数作为密钥
const key = CryptoJS.enc.Utf8.parse("andryandryandryandry");
// 十六位十六进制数作为密钥偏移量
const iv = CryptoJS.enc.Utf8.parse("andryandryandryandry");

// 解密方法
function Decrypt(pwd) {
  const bytes = CryptoJS.AES.decrypt(pwd, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return bytes.toString(CryptoJS.enc.Utf8);
}

// 加密方法
function Encrypt(pwd) {
  const srcs = CryptoJS.enc.Utf8.parse(pwd);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  encrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return encrypted.toString();
}

export { Decrypt, Encrypt };
