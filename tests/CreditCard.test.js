'use strictg'
const validation = require('./../validations/CreditCard');

test('Check valid credit card validation', async () => {
    const body = {
        name: 'Pablo de Jesús',
        cardnumber: '4111236987452143',
        expirationdate: '11/87',
        securitycode: '145'
    }
    let res = await validation.validateCreditCard(body)
    expect(res).toBe(true)
})

test('Check not existed value', async () => {
    const body = {
        cardnumber: '411123698745214e',
        expirationdate: '11/87',
        securitycode: '145'
    }
    await expect(validation.validateCreditCard(body)).rejects.toThrowError(new Error("Not all parameters exist!"))
})


test('Check invalid name', async () => {
    const body = {
        name: '',
        cardnumber: '4111236987452143',
        expirationdate: '11/87',
        securitycode: '145'
    }
    await expect(validation.validateCreditCard(body)).rejects.toThrowError(new Error("Please, send the name."))
})

test('Check invalid expiration date', async () => {
    const body = {
        name: 'Pablo de Jesús',
        cardnumber: '4111236987452144',
        expirationdate: '11-87',
        securitycode: '145'
    }
    await expect(validation.validateCreditCard(body)).rejects.toThrowError(new Error("Invalid expiration date."))
})

test('Check invalid security code', async () => {
    const body = {
        name: 'Pablo de Jesús',
        cardnumber: '4111236987452144',
        expirationdate: '11/87',
        securitycode: '@@@'
    }
    await expect(validation.validateCreditCard(body)).rejects.toThrowError(new Error("Invalid security code."))
})
