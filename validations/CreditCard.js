const creditCardType = require("credit-card-type");

module.exports.validateCreditCard = async function (body) {
    if (
        ! body.hasOwnProperty('name') ||
        ! body.hasOwnProperty('cardnumber') ||
        ! body.hasOwnProperty('expirationdate') ||
        ! body.hasOwnProperty('securitycode')
    )
        throw new Error('Not all parameters exist!')

    if (body.name.length === 0) {
        throw new Error("Please, send the name.")
    }
    let card = creditCardType(body.cardnumber.substr(0, 4))
    if (body.cardnumber.length !== 16 || card.length === 0 ||  ! /^[0-9]{16}$/.test(body.cardnumber)) {
        throw new Error("Invalid card")
    }
    if (!/^[0-9]{2}\/[0-9]{2}$/.test(body.expirationdate)) {
        throw new Error("Invalid expiration date.")
    }
    if (body.securitycode.length.toString() !== card[0].code.size.toString() || ! /^[0-9]*$/.test(body.securitycode)) {
        throw new Error("Invalid security code.")
    }
    return  true
}
