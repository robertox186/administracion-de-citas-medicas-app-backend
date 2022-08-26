const express=require('express');
const app=express.Router();
const {register,selectUsers,selectCitaPaciente,cancelarCitaPaciente,updatePacienteUser} = require('../controllers/paciente')
const {createUser,loginUser,selectAllUsers,deleteuser,UpdateClave,UpdateEmail,updatePerfil,UpdateEspecialidad,UpdateArea,UpdateLastname,UpdateName} =require('../controllers/users')
 const {VerifyToken,isAdmin}=require('../middlewares/auth');
const {selectAllAreas,createArea,updateAreas,DeleteArea} =require('../controllers/area');
const { createCita ,selectCitas,updateCita,CancelarCita,deleteCita,selectCola} =require( '../controllers/medico');
const{createCola ,updateCola,selectAllCola} =require('../controllers/cola')
//routes users
     app.post("/login",loginUser);
     app.post("/register",register);
     app.post("/createuser",VerifyToken,isAdmin,createUser)
     app.post('/selectarea',VerifyToken,selectAllAreas);
     app.post('/selectallusers',VerifyToken,isAdmin,selectAllUsers);
     app.post('/updatename',VerifyToken,isAdmin,UpdateName);
     app.post('/updatelastname',VerifyToken,isAdmin,UpdateLastname);
     app.post('/updateEmail',VerifyToken,isAdmin,UpdateEmail);
     app.post('/updateclave',VerifyToken,isAdmin,UpdateClave);
     app.post('/updateespecialidad',VerifyToken,isAdmin,UpdateEspecialidad);
     app.post('/updatearea',VerifyToken,isAdmin,UpdateArea);
     app.post('/deleteuser',VerifyToken,isAdmin,deleteuser);
     app.post('/createarea',VerifyToken,isAdmin,createArea);
     app.post('/updateareas',VerifyToken,isAdmin,updateAreas);
     app.post('/deletearea',VerifyToken,isAdmin,DeleteArea);
      app.post('/createcita',VerifyToken,createCita);
      app.post('/selectcita',VerifyToken,selectCitas);
      app.post('/updatecita',VerifyToken,updateCita);
        app.post('/cancelarcitamedico',VerifyToken,CancelarCita);
      app.post('/deletecita',VerifyToken,deleteCita);
      app.post('/selectmedico',VerifyToken,selectUsers);
      app.post('/createcola',VerifyToken,createCola);
      app.post('/selectcitapaciente',VerifyToken,selectCitaPaciente);
      app.post('/cancelarcitapaciente',VerifyToken,cancelarCitaPaciente);
      app.post('/updateperfilpaciente',VerifyToken,updatePacienteUser);
      app.post('/selectcola',VerifyToken,selectCola);
      app.post('/updateperfilmedico',VerifyToken,updatePerfil);
      app.post('/updatecola',VerifyToken,updateCola);
//routes post



module.exports=app; 