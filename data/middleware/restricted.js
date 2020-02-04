const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

module.exports = () => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization
            const decoded = jwt.verify(token, secrets.jwt)
            
            req.userId = decoded.subject
            next()
        }
        catch (err) {
            console.log(err)
            return res.status(401).json({
                message: `You must be logged in to view this resource`
            })
        }
    }
}