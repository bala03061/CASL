const express =require('express')

const mongoose = require('mongoose')

const cors =require("cors")

const bcrypt =require('bcrypt')
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const EmployeeModel =require("./models/Employee")
const itemRoutes = require('./routes/itemRoutes');


const app =express()
app.use (express.json())
app.use(cors({
    origin: ["http://localhost:5173"], 
    methods: ["GET", "POST","PUT","DELETE"], 
    credentials: true 
}));

app.use (cookieParser())

app.use('/api/items', itemRoutes);


mongoose.connect('mongodb://localhost:27017/employee');


app.post ('/register', (req,res)=>{
    const {name ,email,password} =req.body
    bcrypt.hash (password,10)
    .then (hash =>{
        EmployeeModel.create({name ,email,password:hash})
        .then (employee =res.json('success'))
        .catch (err =>res.json(err))
    }).catch (err => res.json(err))
})



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    EmployeeModel.findOne({ email: email })
        .then(employee => {
            if (employee) {
                bcrypt.compare(password, employee.password, (err, response) => {
                    

                    if (response) {
                        const token = jwt.sign(
                            { email: employee.email, role: employee.role },
                            'jwt-secret-key', 
                            { expiresIn: '1d' })
                            res.cookie('token' ,token)
                        
                        return res.json({status : "success" ,role :employee.role}); 
                    } else {
                        return res.status(401).json({ message: 'The password is incorrect' });
                    }
                });
            } else {
                return res.status(404).json({ message: 'No records found' });
            }
        })
        .catch(err => {
            return res.status(500).json({ message: 'Internal server error', error: err });
        });
});


app.listen (3001 ,() =>{
    console.log('server is running');
    
})