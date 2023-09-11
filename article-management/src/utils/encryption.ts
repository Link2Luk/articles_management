import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

export function getKey() {
  const random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let str = ''
  for (let i = 0; i < 16; i++) {
    str = str + random.charAt(Math.random() * random.length)
  }
  return str
}

const aesKey = getKey()
const ivKey = getKey()

export const encrypt = (message: string) => {
  const msg = CryptoJS.enc.Utf8.parse(message)
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const iv = CryptoJS.enc.Utf8.parse(ivKey)
  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv
  })
  return encrypted.toString()
}

export const decrypt = (cipherText: string) => {
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const iv = CryptoJS.enc.Utf8.parse(ivKey)
  const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv
  })
  return decrypted.toString()
}

// RSA
// const JSEncrypt = require ('jsencrypt')

// const privateKey1 ='MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALowGqa+nWxQpinJqobwwz1P3ZR6e+eM3VC3qZVK/fhFoEEAyryjcfnxrRA9yVMXNJGNxnZ66rfVOxm9QPDGMuCn0QDas5N7C56bsMh1xNpFg7dDNdtoQ/pj/SFKBF1dko76/jhuLHvzoh2qegVNXjVnX2abD547uiKHw1QseZKDAgMBAAECgYAvB3uT5s4I0A5Iu+HRF/uY/xVvLckiYdh9TQcO6NRh4+RoxvRu1bIyejNGyPSTgmcK5Q7eWonzSW8WP1Gp/8ZVvcr0Kms3f1GyCia5ipFkzTUu45cOkqdV62FWijuzVr0DmTFXu3Ov5Xas6KizYWXxZJom08ni0imUuLoj5fhqAQJBAPS0P8IIQgEoGx+5q+n8mlK0evbkBSaWBDsMTFuvzB1wn4bqgv6OjgIlnyKsWwH/dY8ay/DErVb3i1B4pCyBgQMCQQDCyFl2dKr6AmvzF59q+6H7/uVQR4j4IbB3M+sNSWCvYQaF+Go8MNpJGXwJF802OZ9MiZW3rIsysffVazcYrTCBAkEAkiJ62QNZd5td52pYkln6R13k+UBfGxYH3MORbkfkG8jAXC/8nsy/XeTdzjUj/GN070tPc6/g3Mjkd+A0GygTxQJAPc+QPDvnqfCsyvabGzsA+1O291PMDlm6gwlRtOStLtpOVKMxKyqhioLwzn3kHCoK+CHNBf1WKt8481vTnxwOgQJBALIAFDvxZXz9PYP+iUFe6TeWzuxAzDiZXJLcTsUyEyAVMFzS+DHZc4FXh5HT8T/6O912xzbLW97Dr/662ktZMmQ='
// const publicKey1 = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6MBqmvp1sUKYpyaqG8MM9T92UenvnjN1Qt6mVSv34RaBBAMq8o3H58a0QPclTFzSRjcZ2euq31TsZvUDwxjLgp9EA2rOTewuem7DIdcTaRYO3QzXbaEP6Y/0hSgRdXZKO+v44bix786IdqnoFTV41Z19mmw+eO7oih8NULHmSgwIDAQAB'

// const privateKey2 = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAM/HE3CUXGik0DveZnZ2uZr4xta/ZIE9aN1qETrGTHOXgeRpkXw/NsuRt4o5B/9NHnHenzUVKv3+pM4acQaVnu6orvfFtmauzvzVWkoJynCIYo/pA7Dw6GdeVeAyEXcCqM10L0ftCCEfSDImpyyTWiiv+98Jq3tQhDXf0/fzZ8b9AgMBAAECgYEAwfErpxkEzLSSnl9wusEFbK8sQsUx1iTxHkNkQ71XHUpdd0xG/Xev+QJSFNY5LcfZVCad6xmQILexM6SgvampR6NYANLJYiyLtDi1nPHNNccyMqYUPplvdgNVcOePYlF3MgnLuXqmzeNvv/Kf5Qhcj328oSjEfFQ4Zplk5MdDrkECQQDqF9LHsPXXdWnE6nUITV4KCUxa1oeLEtfKSppy87cC3KeJM8zusKpZTrh1bxWlRo2PbwquLNnrxJRB9ztEmuBNAkEA4zjQIws1Kl6Y5n0TClOKEeCdf89tMZlARaJ9uR9OqVYUKV8B9Sebn8fnd763vG7x9z2tenwnET2vHAZvJ1BZcQJAWkmX/XcuSsy5X77CJtKYS6ysa3jEzIoW+qntihqf4pWydIOrLgCro0hucrTGl3lvzfuZFfaskne+avbtQBewHQJACyEbQLwpzHt5rcBukFDrMFj6HeqBBK7m8QI2ejzIU479ydD3fZSFENxvv/O9eCNPArcoqhkuqK+Gxi6ifyB2YQJBANtTp6bCM0Konk0siVmLnFRUTaTMFGhNC/4/uDBY+TODq38gCPBTUff25LD7vvR4de+fcLTx9zxiFGw+FtBIJF8='
// const publicKey2 = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDPxxNwlFxopNA73mZ2drma+MbWv2SBPWjdahE6xkxzl4HkaZF8PzbLkbeKOQf/TR5x3p81FSr9/qTOGnEGlZ7uqK73xbZmrs781VpKCcpwiGKP6QOw8OhnXlXgMhF3AqjNdC9H7QghH0gyJqcsk1oor/vfCat7UIQ139P382fG/QIDAQAB'

export const getRSAVal = (message: string, publicKey: string) => {
  const jse = new JSEncrypt()
  jse.setPublicKey(publicKey)
  return jse.encrypt(message)
}
export const getDecryptVal = (message: string, privateKey: string) => {
  const jse = new JSEncrypt()
  jse.setPrivateKey(privateKey)
  return jse.decrypt(message)
}
