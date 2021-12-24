//not used for this project
const breakTimer = (input, res, rou = "/") => {
    //timer for break request POST /auth/forget
    const timer = setInterval(() => {
        if (!input) {
            clearInterval(timer);
            return res.status(302).redirect(rou)
        } else if (input) {
            clearInterval(timer);
        }
    }, 3000);
}

module.exports = breakTimer