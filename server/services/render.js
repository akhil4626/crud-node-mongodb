const axios =require('axios');


exports.homeRoutes =(req,res)=>{
    axios.get('http://localhost:3000/api/users')
    .then(data=>{
        console.log(data);
        res.render('index',{users:data.data});
    })
    .catch(err => {
        res.send(err);
    })
    
}

exports.add_user =(req,res)=>{
    res.render('add_user');
}

exports.update_user =(req,res)=>{
    res.render('update_user');
}
