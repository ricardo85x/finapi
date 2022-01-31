const express = require('express');
const { v4: uuidv4 } = require('uuid')

const app = express();

app.use(express.json())

const customers = []

// Middleware
function verifyIfExistsAccountCPF(req, res, next) {

    const { cpf } = req.headers;
    const customer = customers.find((customer) => customer.cpf === cpf)

    if(!customer) {
        return res.status(400).json({ error: "Customer not found"})
    }

    req.customer = customer

    return next();
}

app.post("/account", (req, res) => {
    const { cpf, name } = req.body
    const id = uuidv4()


    const customerAlreadyExists = customers.some(
        c => c.cpf === cpf
    )
    if(customerAlreadyExists){
        return res.status(400).json({ error: 'Customer already exists'})
    }

    customers.push({
        cpf, name, id, statement: []
    })

    return res.status(201).send()
})



app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {

    const { customer } = req

    return res.json(customer.statement)
})

app.get('/', (req, res) => {
    return res.json({ message: 'Hello, world!' });
})

app.listen(3333, () => console.log('listening on port 3333'))