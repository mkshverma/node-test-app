var beautify = require('js-beautify');
module.exports = {
    html: function(req, res){
        var text = req.body.text || '';
        let encoded = beautify.html(text);
        res.render('text',{
            title:'Beautify HTML',
            result: encoded,
            id: 'beautify',
            text: text,
            headingOne: 'Enter html here',
            headingTwo: 'Formatted Html'
        });
    },
    js: function(req, res){
        var text = req.body.text || '';
        let decoded = beautify(text);
        res.render('text',{
            title:'Beautify JS',
            result: decoded,
            id: 'beautify',
            text: text,
            headingOne: 'Enter text here',
            headingTwo: 'Formatted JS'
        });
    },
    css: function(req, res){
        var text = req.body.text || '';
        let decoded = beautify.css(text);
        res.render('text',{
            title:'Beautify CSS',
            result: decoded,
            id: 'beautify',
            text: text,
            headingOne: 'Enter text here',
            headingTwo: 'Formatted CSS'
        });
    },
}