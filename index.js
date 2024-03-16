const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
const cors = require('cors')


app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.obhaluk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    try {
        client.connect();


        app.get('/transactions', async (req, res) => {

            const transactionsInfo = await transactions.find().toArray()
            res.send(destination)

        })
        app.get('/transactions/summery', async (req, res) =>{
            try {
                // Retrieve transactions from the database
                const transactions = await db.collection('transactions').find().toArray();
        
                // Initialize variables for total income, total expenses, and savings
                let totalIncome = 0;
                let totalExpenses = 0;
        
                // Calculate total income and total expenses
                transactions.forEach(transaction => {
                    if (transaction.type === 'income') {
                        totalIncome += transaction.amount;
                    } else if (transaction.type === 'expense') {
                        totalExpenses += transaction.amount;
                    }
                });
        
                // Calculate savings
                const savings = totalIncome - totalExpenses;
        
                // Construct summary object
                const summary = {
                    totalIncome,
                    totalExpenses,
                    savings
                };
        
                // Send the summary as the response
                res.json(summary);
            } catch (error) {
                console.error('Error retrieving transaction summary:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })

        app.post('/transactions', async (req, res) => {
            const addingTransaction=req?.body

            const destination = await transactions.insertOne(addingTransaction)
            res.send(destination)

        })



        app.delete('/transactions/:id', async (req, res) => {
            try {
                const transactionId = req.params.id;
        
                // Validate transactionId - ensure it's a valid ObjectId
                if (!ObjectId.isValid(transactionId)) {
                    return res.status(400).json({ error: 'Invalid transaction ID' });
                }
        
                // Delete the transaction from the database
                const result = await db.collection('transactions').deleteOne({ _id: ObjectId(transactionId) });
        
                // Check if the transaction was found and deleted
                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: 'Transaction not found' });
                }
        
                // Send success response
                res.json({ message: 'Transaction deleted successfully' });
            } catch (error) {
                console.error('Error deleting transaction:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        










    }
    finally {

    }
}


run().catch(console.dir)


app.listen(PORT, function (err) {

    console.log(`listening at ${PORT}`);
});

