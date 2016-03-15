/**
 * Created by Rain on 2016/1/28.
 */
var bluebird = require('bluebird');

var fs = bluebird.promisifyAll(require('fs'));

var EmailHelper = require('../common/email_helper');

var getQQs = function (path) {
  var qq_list = fs.readFileAsync(path, "utf-8");

  return qq_list.then((result)=> {
    return result.split(/\s+/);
  });
};

/**
 * 处理邮件内容
 *
 * @param title     标题
 * @param textPath  纯文本内容
 * @param htmlPath  html 内容
 * @returns {Promise.<T>}
 */
var getHtml = function (title, textPath, htmlPath) {
  var email = {};

  email.title = title;
  email.text = textPath || "";

  return fs.readFileAsync(htmlPath, "utf-8").then((result)=> {
    email.html = result || "";
    return email;
  }).catch((err)=> {
    console.log(err);
  });
};

/**
 * 发送邮件工具类
 * @param qqs
 * @param email 标题 ，文本 ，HTML
 * @param second
 */
function sendMail(qqs, email, second) {
  Promise.all([getQQs(qqs), getHtml(email.title, email.textPath, email.htmlPath)]).then((results)=> {
    var qqs = results[0];
    var email = results[1];

    var i = 0;
    setInterval(function () {
      qqs[i] += "@qq.com";
      EmailHelper.sendMail(qqs[i], email.title, email.text, email.html);
      //EmailHelper.sendMail("349256530@qq.com", email.title, email.text, email.html);
      console.log("成功" + qqs[i] + "发送成功");
      i++;
    }, second);
  }).catch((err)=> {
    console.log(err);
  });
}

(function main() {
  var email = {
    title: "神笔优优和您用创意陪孩子玩",
    textPath: "",
    htmlPath: './sbuu.html'
  };

  sendMail("./第一组.txt", email, 9000);
})();