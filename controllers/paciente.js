const bcryptjs = require('bcryptjs');
const { Client } = require('pg');
var conString = "postgres://postgres:123@localhost:5432/postgres";
const jwt=require('jsonwebtoken');

module.exports.createPaciente= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
  
    info.clave=bcryptjs.hashSync(info.clave,16);
    info.id_area=parseInt(info.id_area);
      console.log(info);
await  client.query("insert into paciente (name,lastname,email,telefono,cedula,fecha_nac)values($1,$2,$3,$4,$5,$6) returning *",[info.name,info.lastname,info.email,info.telefono,info.cedula, info.fecha_nac]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows[0],status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}
module.exports.createPaciente= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
  
    info.clave=bcryptjs.hashSync(info.clave,16);
    info.id_area=parseInt(info.id_area);
      console.log(info);
await  client.query("insert into paciente (name,lastname,email,telefono,cedula,fecha_nac)values($1,$2,$3,$4,$5,$6) returning *",[info.name,info.lastname,info.email,info.telefono,info.cedula, info.fecha_nac]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows[0],status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}
module.exports.register= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
  
    info.clave=bcryptjs.hashSync(info.clave,16);
 
      console.log(info);

await  client.query("insert into paciente (name,lastname,email,telefono,cedula,fecha_nac,clave,nacionalidad)values($1,$2,$3,$4,$5,$6,$7,$8) returning *",[info.name,info.lastname,info.email,info.telefono,info.cedula, info.fecha_nac,info.clave,info.nacionalidad]).then(resp=>{
let h=resp;
client.end(); 
const token= jwt.sign({id:h.rows[0].id_paciente},'secretKey',{expiresIn:60*60*24});
console.log(h)
res.json({body:h.rows[0],status:200,auth:true,token})
}).catch(err=>{
console.error(err)
res.json({status:400,error:err,auth:false});

})
}
module.exports.selectAllPaciente= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
    
  
    info.clave=bcryptjs.hashSync(info.clave,16);
    info.id_area=parseInt(info.id_area);
      console.log(info);
await  client.query(" select * from paciente").then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows,status:200})
}).catch(err=>{

res.json({status:400,error:err});

})
}

module.exports.selectUsers=async (req,res)=>{

    const client = new Client({connectionString:conString})
    let info=req.body;
        client.connect()
        
    
          console.log(info);
    await  client.query(" select * from usuario inner join area on(usuario.id_area=area.id_area and usuario.admin=$1 )",[false]).then(resp=>{
    let h=resp;
    client.end(); 
    res.json({body:h.rows,status:200})
    }).catch(err=>{
    
    res.json({status:400,error:err});
    
    })
}
module.exports.selectCitaPaciente= async (req,res)=>{
    const client = new Client({connectionString:conString})
let info=req.body;
    client.connect()
 
    console.log("client "+client);
  
await  client.query("select * from cita inner joun usuario on (usuario.id_usuario = cita.id_usuario and paciente.cedula=$1  and cita.estado_cita=$2)",[info.cedula,"en espera"]).then(resp=>{
let h=resp;
client.end(); 
res.json({body:h.rows,status:200})
}).catch(err=>{

res.json({status:400,error:err});

})

}

module.exports.cancelarCitaPaciente=async (req,res)=>{

    const client = new Client({connectionString:conString})
    let info=req.body;
        client.connect()
        
    
          console.log(info);
    await  client.query(" update cita set motivo_anulacion=$1,estado_cita=$2 where id_cita=$3 )",[info.motivo_anulacion,"cancelada",info.id_cita]).then(resp=>{
    let h=resp;
    client.end(); 
    res.json({body:h.rows,status:200})
    }).catch(err=>{
    console.error(err)
    res.json({status:400,error:err});
    
    })
}

module.exports.updatePacienteUser=async (req,res)=>{

    const client = new Client({connectionString:conString})
    let info=req.body;
        client.connect()
        
    
          console.log(info);
    await  client.query("update paciente set email=$1,telefono=$2 where cedula=$3",[info.email,info.telefono,info.cedula]).then(resp=>{
    let h=resp;
    client.end(); 
    res.json({body:h.rows,status:200})
    }).catch(err=>{
    console.error(err)
    res.json({status:400,error:err});
    
    })
}