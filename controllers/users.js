const bcryptjs = require('bcryptjs');
const { Client } = require('pg');
var conString = "postgres://postgres:123@localhost:5432/postgres";
const jwt=require('jsonwebtoken');

module.exports.createUser= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
  
    info.clave=bcryptjs.hashSync(info.clave,16);
    info.id_area=parseInt(info.id_area);
      console.log(info);
await  client.query("insert into usuario (name,lastname,clave,email,especialidad,admin,id_area)values($1,$2,$3,$4,$5,$6,$7) returning *",[info.name,info.lastname,info.clave,info.email,info.especialidad,info.admin, info.id_area]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows[0],status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}
module.exports.selectAllUsers= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);

await  client.query("select * from usuario inner join area on (usuario.id_area =area.id_area )").then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows,status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}
module.exports.loginUser= async (req,res)=>{
    const client = new Client({connectionString:conString})
       var info=req.body;
   await isUser(info,client).then(async (res2)=>{
   
   client.end();
   let resp=res2;
   console.log(resp)

   if(resp.rows.length == 0){



   console.log('----------------------------------')

   const client2 = new Client({connectionString:conString})
     await isPaciente(info,client2).then(resp1=>{

console.log(resp1)
            client.end(); 
            console.log(resp1.rows.length)
            if(resp1.rows.length ==0){
            
                res.json({auth:false})
            }
            if(bcryptjs.compareSync(info.clave,resp1.rows[0].clave)){
            console.log(true)
            const token= jwt.sign({id:resp1.rows[0].id_paciente},'secretKey',{expiresIn:60*60*24});
            
            
          res.json( {auth:true,body:resp1.rows[0],user:'paciente',token})
            }else{
              
              
                res.json({auth:false,body:resp.rows[0]} ) 
            }
            
            
             
                 
              
            }).catch(err=>{
            console.error(err)
                return {auth:false}
            })
    }else{
        if(bcryptjs.compareSync(info.clave,resp.rows[0].clave)){
            console.log(true)
            const token= jwt.sign({id:resp.rows[0].id_usuario,admin:resp.rows[0].admin},'secretKey',{expiresIn:60*60*24});
            let rese={auth:true,body:resp.rows[0],user:'user',token}
            console.log(rese)
            console.log('++++++++++++++')
            return res.json(rese)
            
            }else{
              
              
             res.json({auth:false,body:resp.rows[0],token})  
            }
            
    }



})//usser
}
async function isPaciente(info,client){
   
    client.connect()
    
    console.log("client "+info.email);
    
return client.query(" select * from paciente where email=$1",[info.email])
}

async function isUser  (info,client){
   
    client.connect()
    
    console.log("client "+info.email);
    
return  client.query(" select * from usuario where email=$1",[info.email])
     
  

}

module.exports.UpdateName= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);

await  client.query("update usuario set name =$1 where id_usuario=$2",[info.name,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}
module.exports.UpdateLastname= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);

await  client.query("update usuario set lastname =$1 where id_usuario=$2",[info.lastname,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}
module.exports.UpdateEspecialidad= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);

await  client.query("update usuario set especialidad =$1 where id_usuario=$2",[info.especialidad,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}
module.exports.UpdateEmail= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);

await  client.query("update usuario set email =$1 where id_usuario=$2",[info.email,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}
module.exports.UpdateClave= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);
info.clave=bcryptjs.hashSync(info.clave);
await  client.query("update usuario set clave =$1 where id_usuario=$2",[info.clave,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}
module.exports.UpdateArea= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);
info.id_area=parseInt(info.id_area);
await  client.query("update usuario set id_area =$1 where id_usuario=$2",[info.id_area,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}
module.exports.deleteuser= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);
info.id_area=parseInt(info.id_area);
await  client.query("update usuario set id_area =$1,email=$2,especialidad=$3 where id_usuario=$4",[info.id_area,info.email,info.especialidad,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}

module.exports.updatePerfil= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    let fecha=info.fecha_cre
    console.log("client "+client);
    console.log(info.fecha_cre)
   
await  client.query("update usuario set email=$1,especialidad=$2,id_area=$3 where id_usuario =$4",[info.email,info.especialidad,info.id_area,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows[0],status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}