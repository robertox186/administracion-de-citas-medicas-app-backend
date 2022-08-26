const bcryptjs = require('bcryptjs');
const { Client } = require('pg');
var conString = "postgres://postgres:123@localhost:5432/postgres";
const jwt=require('jsonwebtoken');




module.exports.createCita= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
  
      console.log(info);
await  client.query("insert into paciente (name,lastname,email,telefono,cedula,fecha_nac,nacionalidad)values($1,$2,$3,$4,$5,$6,$7) returning *",[info.name,info.lastname,info.email,info.telefono,info.cedula, info.fecha_nac,info.nacionalidad]).then(resp=>{

     let h=resp;
     console.log(h)
     let finaly=crearcita(info,h);
     res.json({status:200,body:finaly})
     client.end(); 
}).catch(err=>{
console.error(err)
res.json({status:400,error:err});

})
}

module.exports.selectCitas= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
      console.log(info);
await  client.query("select * from cita inner join paciente on (paciente.id_paciente = cita.id_paciente and cita.id_usuario =$1)",[info.id_usuario]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows,status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}
module.exports.CancelarCita=async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    info.estado_cita='cancelada'
      console.log(info);
await  client.query("UPDATE cita SET  estado_cita=$2,motivo_anulacion=$3 WHERE id_cita=$1;",[info.id_cita,info.estado_cita,info.motivo_anulacion]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}
module.exports.updateCita= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
      console.log(info);
await  client.query("UPDATE cita SET descripcion=$2, titulo=$3, hora_fin=$4, hora_salida=$5, hora_inicio=$6, hora_llegada=$7, motivo_anulacion=$8, fecha=$9, estado_cita=$10 WHERE id_cita=$1;",[info.id_cita,info.descripcion,info.titulo,info.hora_fin,info.hora_salida,info.hora_inicio,info.hora_llegada,info.motivo_anulacion,info.fecha,info.estado_cita]).then(resp=>{
let h=resp;
client.end(); 
res.json({status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}

module.exports.deleteCita= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
      console.log(info);
await  client.query("delete from cita where id_cita=$1",[info.id_cita]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows,status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}

async function  crearcita(info,h){
    const client = new Client({connectionString:conString})
    client.connect()

    await  client.query("insert into cita (titulo,descripcion,hora_inicio,fecha,id_usuario,id_paciente,estado_cita)values($1,$2,$3,$4,$5,$6,$7) returning *",[info.titulo,info.descripcion,info.hora_inicio,info.fecha,info.id_usuario, h.rows[0].id_paciente,info.estado_cita]).then(resp2=>{
        let h2=resp2.rows;
          
        client.end(); 
        
        return h2[0];
            }).catch(err2=>{
                console.error(err2)
                return err2
                
            })
}


module.exports.selectCola= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
      console.log(info);
await  client.query("select * from cola inner join paciente on (cola.id_paciente =paciente.id_paciente and cola.id_usuario =$1 and cola.estado =$2)",[info.id_usuario,'pendiente']).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows,status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}