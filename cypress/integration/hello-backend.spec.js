/// <reference types="cypress" />



describe('Test suite', () => {
    Cypress.Commands.add('authenticate', () => {
        const USER_CREDENTIALS = {
            "username":"tester01",
            "password":"GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
        }

        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/login',
            headers: {
                'Content-Type':'application/json'
            },
            body: USER_CREDENTIALS
        }).then((response => {
            expect(response.status).to.eq(200)
            Cypress.env({loginToken:response.body})
            cy.log(response.body)
        }))
    })

    //curl "http://localhost:3000/api/clients" 
    //-H "Content-Type: application/json" 
    //-H "X-User-Auth: {""username"":""tester01"",""token"":""0f36c47dbf43f5f68c48967997938cbd""}"

    it('GET request towards /api/clients', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/clients',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                }
            }) 
        })).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
            cy.log(JSON.stringify(response.body[1]))
        }))
    })


    it('GET request towards /api/client/1', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/client/1',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                //cy.log(JSON.stringify(response.body))

            }))
        }))

    })
    

    it('POST request towards api/client/new', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST', 
                url:'http://localhost:3000/api/client/new',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:{
                    "name":"Filip",
                    "email":"filip@email.com",
                    "telephone":"987654321"
                }


            }).then((response => {
                expect(response.status).to.eq(200)
            }))

        }))

    })


    it('PUT request towards api/client/1', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'PUT', 
                url:'http://localhost:3000/api/client/1',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:{
                    "id":1,
                    "name":"Filip",
                    "email":"filip@email.com",
                    "telephone":"987654321"
                }


            }).then((response => {
                expect(response.status)
            }))
        }))

    })


    it.only('DELETE request towards api/client/1', () => {
        cy.authenticate().then((response => {
            //Create request /api/new

            // request /api/clients to extract the last iD

            // request /api/client/lastid

            cy.request({
                method: 'POST', 
                url:'http://localhost:3000/api/client/new',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:{
                    "name":"Filip",
                    "email":"filip@email.com",
                    "telephone":"987654321"
                }


            }).then((response => {
                expect(response.status).to.eq(200)
            }))

            cy.request({
                method: 'GET', 
                url: 'http://localhost:3000/api/clients', 
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response =>{
                expect(response.status).to.eq(200)
                //Save the id of the last client into a variable
                let lastID = response.body[response.body.length -1].id
                cy.log(lastID)

                //The GET / PUT / DELETE request towards the client with the lastID.
                // The URL is build by appending the variable lastID in the end of the endpoint
                cy.request({
                    method: 'DELETE', 
                    url: 'http://localhost:3000/api/client/'+lastID, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    }
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))

                cy.request({
                    method: 'POST', 
                    url:'http://localhost:3000/api/logout',
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                        'Content-Type': 'application/json'
                    },
    
                }).then((response => {
                    expect(response.status).to.eq(200)
                }))

            }))

            /* cy.request({
                method: 'DELETE', 
                url:'http://localhost:3000/api/client/1',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response => {
                expect(response.status)
            })) */
        }))

    })



    it('POST request towards api/logout', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST', 
                url:'http://localhost:3000/api/logout',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },

            }).then((response => {
                expect(response.status).to.eq(200)
            }))
        }))

    })


    it('Create a client', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST', 
                url:'http://localhost:3000/api/client/new',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:{
                    "name":"Filip",
                    "email":"filip@email.com",
                    "telephone":"987654321"
                }


            }).then((response => {
                expect(response.status).to.eq(200)
            }))


            cy.request({
                method: 'POST', 
                url:'http://localhost:3000/api/logout',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },

            }).then((response => {
                expect(response.status).to.eq(200)
            }))


        }))
    })

})