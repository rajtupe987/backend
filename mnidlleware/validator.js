const validator = (req, res, next) => {


    const { name,
        pass,
        age,
        city } = req.body;


    if (
        !name ||
        !pass ||
        !age ||
        !city) {
        res.send({ msg: "few fiels are missing plx fill it" })
    } else {
        next()
    }
}

module.exports = {
    validator
}