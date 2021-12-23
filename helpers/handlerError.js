const rou = require('../helpers/routes')
const date = require('date-and-time');

//handel err 404
const handleError404 = (req, res) => {
    res.status(404).render('error/404', {
        title: "404 - Page Not Found",
        rou,
        date: date.format(new Date(), 'YYYY/MM/DD - HH:mm'),
    })
}
//handel err Server
const handleErrorServer = (err, req, res, next) => {
    console.log(err.stack)
    res.status(500).render('error/serverError',{
        title: "Server Error"
    })
}

module.exports = {
    handleError404,
    handleErrorServer
}