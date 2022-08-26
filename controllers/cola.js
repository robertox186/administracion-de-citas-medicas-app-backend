const { Client } = require('pg');
var conString = "postgres://postgres:123@localhost:5432/postgres";




module.exports.createCola= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    let fecha=info.fecha_cre
    console.log("client "+client);
    console.log(info.fecha_cre)
   
await  client.query("insert into cola (fecha_cre,estado,id_paciente,id_usuario) values ($1,$2,$3,$4)returning *",[info.fecha_cre,"pendiente",info.id_paciente,info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows[0],status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}

module.exports.selectAllCola= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    let fecha=info.fecha_cre
    console.log("client "+client);
    console.log(info.fecha_cre)
   
await  client.query("select * from cola inner join paciente on (cola.id_paciente=paciente.id_paciente and cola.id_usuario = $1 and cola.estado=$2)",[info.id_usuario,"pendiente"]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows[0],status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

     

}


     

module.exports.updateCola= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    let fecha=info.fecha_cre
    console.log("client "+client);
    console.log(info.fecha_cre)
   
await  client.query("update cola set estado = $1 where id_cola=$2",[info.estado,info.id_cola]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows[0],status:200})
}).catch(err=>{
console.error(err)
res.json({status:400,error:err});

})

     

}