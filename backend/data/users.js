import bcrypt from 'bcryptjs'
const users = [
     {
     name: "Shirshak kandel",
     email: "shirshakkandel@gmail.com",
     password:bcrypt.hashSync('@info123', 10),
     isAdmin:true,
     accountType:'individual',
     number:"+9779846863569",
     },

     {
     name: "Sulav Tiwari",
     email: "sulavtiwari@gmail.com",
     password:bcrypt.hashSync('@info123', 10),
     isAdmin:false,
     accountType:'individual',
     number:"+9779846863569",
     },
]
export default users