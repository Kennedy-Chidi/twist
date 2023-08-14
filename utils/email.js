const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const dotenv = require("dotenv");
const Transport = require("nodemailer-sendinblue-transport");
dotenv.config({ path: "../config.env" });

module.exports = class Email {
  constructor(
    from,
    user,
    name,
    title,
    banner,
    content,
    headerColor,
    footerColor,
    mainColor,
    greeting,
    warning,
    resetURL
  ) {
    this.from = from;
    this.user = user;
    this.name = name;
    this.title = title;
    this.banner = banner;
    this.content = content;
    this.headerColor = headerColor;
    this.footerColor = footerColor;
    this.mainColor = mainColor;
    this.greeting = greeting;
    this.warning = warning;
    this.resetURL = resetURL;
  }

  // 1) SET CONFIGURATION
  transporter() {
    return nodemailer
      .createTransport(
        new Transport({
          apiKey: process.env.SENDINBLUE_KEY,
        })
      )
      .use(
        "compile",
        hbs({
          viewEngine: {
            partialsDir: path.join(__dirname, "../views/partials"),
            layoutsDir: "../views/layouts",
            defaultLayout: "",
          },
          viewPath: "views",
          extName: ".hbs",
        })
      );
  }

  // 2) SEND EMAIL
  send(template, subject) {
    this.transporter()
      .sendMail({
        from: this.from, // sender address
        to: this.user.email, // list of recipients
        subject: subject, // Subject line
        template: template,
        context: {
          banner: this.banner,
          content: this.content,
          headerColor: this.headerColor,
          footerColor: this.footerColor,
          mainColor: this.mainColor,
          greeting: this.greeting,
          warning: this.warning,
          name: this.user.username,
          resetURL: this.resetURL,
          from: this.from,
        },
      })
      .then((res) => {
        console.log("sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendEmail() {
    this.send(`${this.name}`, `${this.title}`);
  }

  sendForgottenPassword() {
    this.send("password", "Reset password");
  }

  sendWelcome() {
    this.send("welcome", "Login Notification");
  }
};
