const jwt = require('jsonwebtoken');


verify = (req, res, next) => {

    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if(err) res.status(401).json('invalid Token !')

            req.user = user;

            console.log('authentificated');

        })

    } else {

        return res.status(401).json('You ara not Authentificated !')
    }
    next()
}

module.exports = verify;