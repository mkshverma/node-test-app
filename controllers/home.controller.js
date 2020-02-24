const nodemailer = require('nodemailer');
module.exports = {
    index: function(req, res){
        res.render('index',{title:'Home'});
    },
    emicalculator: function(req, res){
        res.render('emi-calulator',{title:'EMI Calculator'});
    },
    smtpchecker: function(req, res){
        res.render('smtper',{title:'SMTP Checker'});
    },
    checksmtp: function(req, res){
        var {host, port, from, to, tls, auth, username, password} = req.body;
        var options = {
            host: host,
            port: port,
            secure: tls?true:false, // true for 465, false for other ports
            auth: {
              user: username, // generated ethereal user
              pass: password // generated ethereal password
            }
          };
          if(auth) options.auth = {
            user: username, // generated ethereal user
            pass: password // generated ethereal password
          }
        let transporter = nodemailer.createTransport(options);
          // send mail with defined transport object
        let info = transporter.sendMail({
            from: from, // sender address
            to: to, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
        }).then(info=>{
            console.log(info);
            res.json({status: true});
        }).catch(err => {
            res.json({status: false, message: err.message});
        });
    }
}