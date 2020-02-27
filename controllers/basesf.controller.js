module.exports = {
    encode: function(req, res){
        var text = req.body.text || '';
        let buff = new Buffer(text);
        let encoded = buff.toString('base64');
        res.render('text',{
            title:'Base64 Encoder',
            result: encoded,
            id: 'base64',
            text: text,
            headingOne: 'Enter text here',
            headingTwo: 'Encoded Value'
        });
    },
    decode: function(req, res){
        var text = req.body.text || '';
        let buff = new Buffer(text, 'base64');
        let decoded = buff.toString();
        res.render('text',{
            title:'Base64 Decoder',
            result: decoded,
            id: 'base64',
            text: text,
            headingOne: 'Enter text here',
            headingTwo: 'Decoded Value'
        });
    },
}