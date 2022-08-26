const { Client } = require('pg');
var conString = "postgres://postgres:123@localhost:5432/postgres";

module.exports.selectAllAreas= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);
    
await  client.query("select * from area").then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows,status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}

module.exports.createArea= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);
    
await  client.query("insert into area (name_area,ubicacion,pais,ciudad) values ($1,$2,$3,$4)returning *",[info.name_area,info.ubicacion,info.pais,info.ciudad]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows[0],status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}

module.exports.updateAreas= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);
    info.id_area=parseInt(info.id_area);
    console.log(info)
await  client.query("update area set name_area=$1,ubicacion=$2,pais=$3,ciudad=$4 where id_area=$5",[info.name_area,info.ubicacion,info.pais,info.ciudad,parseInt(info.id_area)]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{
console.error(err)
res.json({status:400,error:err});

})

      

}
module.exports.DeleteArea= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
    console.log("client "+client);
    
await  client.query("delete from area where id_area =$1",[info.id_area]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows,status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}