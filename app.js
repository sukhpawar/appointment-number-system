const express= require("express");
const ejs= require("ejs")
const customer= require("./model/cutomer")
const mongoose= require("mongoose")
const bodyParser= require("body-parser")

const app= express();

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb://localhost:27017/customer",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false},(err)=>{
    if(!err){console.log("connected to db")}
    else{
        console.log("Please start the mongo DB Server")
    }
})
app.get("/", (req,res)=>{

   customer.deleteMany(
       {date:{$lte:  new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()-1)}},(err)=>{
      if(err){ console.log(err)}
       
   })





    customer.find({date: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())},(err,customers)=>{
       
        res.render("index",{customers:customers})
    })
   

})

app.get("/addCustomerForm",(req,res)=>{

    res.render("addCustomerForm")
   
})


app.post("/addCustomer",(req,res)=>{

    let totalNumberOfCustomers=0;
    customer.find({date: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())},(err, customers)=>{
           
        if(!err){
            totalNumberOfCustomers= customers.length;
            let newCustomer= new customer({
                date: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()),
                name:req.body.name,
                mobile:req.body.mobile,
                time:req.body.time,
                seqNumber:totalNumberOfCustomers+1,
         });
         newCustomer.save(err=>{
             if(err){console.log(err)}
             res.redirect("/")
         })
        }

    })
   
    
})

app.post("/served",(req,res)=>{
    
             customer.findByIdAndDelete({_id:req.body.isServed},(err,cus)=>{
                 if(!err){

                   let counter=1;

                   customer.find({date: new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())},
                    (req,customers)=>{
                     
                        let totalNumberOfCustomers= customers.length;

                           customers.forEach(customer=>{
                               customer.seqNumber=counter;
                               counter++;
                               customer.save(err=>{if(err){console.log(err)}})
                           })
                           

                    })



                     res.redirect("/")
                 }
                 else{
                     if(err){res.send(err)}
                     
                     res.redirect("/")
                 }
             })

})

app.post("/getAddCommentForm",(req,res)=>{
    let id= req.body.addCommentId;
    
   res.render("getAddCommentForm",{id:id})
})

app.post("/addComment",(req,res)=>{
    let _id= req.body.customerId;
   

     customer.findByIdAndUpdate({_id:_id},{comment:req.body.comment},(err=>{
         if(!err){ res.redirect("/")}
         else{
             console.log(err);
             res.redirect("/")
         }
     }))
   
    })



app.listen(3000)