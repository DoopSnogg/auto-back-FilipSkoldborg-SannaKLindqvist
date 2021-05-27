const faker = require ('faker')

function createBillPayload(){
    let billPayload = {
        "value": faker.commerce.price()
    }

    return billPayload
}

function createBillRequest(){
    cy.request({
        method: 'POST', 
        url:'http://localhost:3000/api/bill/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:createBillPayload()           
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))

}

function deleteBillRequest() {
    cy.request({
        method: 'GET', 
        url: 'http://localhost:3000/api/bills', 
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }
    }).then((response =>{
        expect(response.status).to.eq(200)
        let lastID = response.body[response.body.length -1].id
        cy.log(lastID)

        cy.request({
            method: 'DELETE', 
            url: 'http://localhost:3000/api/bill/'+lastID, 
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                'Content-Type': 'application/json'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))

    }))
}

module.exports = {
    createBillPayload,
    createBillRequest,
    deleteBillRequest
}