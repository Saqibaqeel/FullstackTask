const express=require('express');
const todo=require('./model/todo')

const mongoose=require('mongoose');
const methodOverride=require('method-override')
const path=require ('path');
const ejsMate=require ('ejs-mate');

const app=express();
const PORT=3000;

const URL='mongodb://127.0.0.1:27017/todo'
main().then(()=>{
    console.log("connection success");

}).catch((e)=>{
    console.log(e);

})

async function main(){
    await mongoose.connect(URL);

}
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public')));

app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}))



app.use(methodOverride('_method'));


app.get('/',async(req,res)=>{

    try{

    
    let list= await todo.find({});
    res.render('index.ejs',{list});

    }
    catch(err){
        res.status(500).send('Something went wrong please try after some time');
    }

    
})


app.get('/show/:id', async (req, res) => {
    try{

    
    const id = req.params.id;

   
       
    let todoId = await todo.findById(id);
    res.render('show.ejs',{todoId})

    }
    catch(err){
        res.status(500).send('Something went wrong please try after some time');

    }

       
   
});



app.post('/todo/add', async (req, res) => {
    try {
        const { title } = req.body;
        console.log(title)

        
        const newTask = new todo({
            taskName: title,
          
        });

       
        await newTask.save();

        
        res.redirect('/');
    } catch (error) {
       
        res.status(500).send('Something went wrong please try after some time');
    }
});

app.delete('/todo/delete/:id',async(req,res)=>{
    try{
    let id =req.params.id
   let deleteTask= await todo.findByIdAndDelete(id)
   console.log(deleteTask)
   res.redirect('/');
    }
    catch(err){
        res.status(500).send('cannot delete');

    }

})


app.get('/todo/edit/:id',async(req,res)=>{
    try{
    let id =req.params.id
    let edit= await todo.findById(id)
    res.render("edit.ejs",{edit})
    }
    catch(err){
        res.status(500).send('Something went wrong please try after some time');

    }

})

app.put('/todo/edit/:id',async(req,res)=>{
    try{
    const { id } = req.params; 
    const { taskName } = req.body; 
    await todo.findByIdAndUpdate(id, { taskName });
    res.redirect('/');
    }
    catch(err){
        res.status(500).send('Something went wrong please try after some time');

    }


})



app.listen(PORT,()=>{
    console.log(`app is listen on port ${PORT}`)
})
