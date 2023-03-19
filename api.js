const u = 'http://localhost:5500';

const c = '/contratos/'
const r = '/recibos/'


const header = {
    headers: {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500'
    }
}
var reciboLevantado = [];
var contratoLevantado = [];

async function getContrato(searchParam){
    const res = await fetch(u+c+searchParam, {
      method: 'GET',
      mode: 'cors'
    })
    const data = await res.json()
    console.log('url: ',u+c+searchParam)
    console.log('contrato',data)
    contratoLevantado = data;
}
async function getRecibos(searchParam){
    const res = await fetch(u+r+searchParam, {
      method: 'GET',
      mode: 'cors'
    })
    const data = await res.json()
    console.log('url: ',u+r+searchParam)
    console.log('recibo', data)
    reciboLevantado = data;
    //await getContrato(parseInt(reciboLevantado[0]["idContrato"]))
}
//getContrato(435)
//getRecibos(13)

const r17 = {
  "numeroRecibo": 17,
  "fechaRecibo": "2021-10-04T03:00:00.000Z",
  "propietario": "Fernanda Ramirez",
  "inquilino": "Juana Colleman",
  "montoAlquiler": 57000,
  "fechaVencimiento": "2023-10-30T03:00:00.000Z",
  "textoTotal": "Cincuenta y siete mil",
  "detalles": [
    [
      "gas",
      -3000
    ],
    [
      "abl",
      -500
    ]
  ],
  "observaciones": "Adjunto recibo expensas mar 2023, luz mar 2023",
  "tipoHonorarios": "administracion",
  "idContrato": 435
}

async function addRecibo(recibo){
  var numRecibo = recibo["numeroRecibo"]
  console.log(numRecibo)
  var chkRecibo = await getRecibos(numRecibo);
  console.log(reciboLevantado)
  console.log(reciboLevantado.length)
  if (reciboLevantado.length == 0) {
    const nuevoRecibo = await fetch(u+r, {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(recibo)
  })
    //const data = await nuevoRecibo.json();
    console.log(nuevoRecibo)
  } else {
    editRecibo(recibo)
    //console.log('Ya existe un recibo con ese numero, corregi la info')
  }    
}
  
async function addContrato(contrato){
  // var numContrato = parseInt(contrato["idContrato"])
  // console.log(numContrato)
  // var chkContrato = await getContrato(numContrato);
  // console.log(contratoLevantado)
  // //console.log(chkContrato.length)
  // if (contratoLevantado.length == 0) {
    const nuevoContrato = await fetch(u+c, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contrato),
    })
    console.log(nuevoContrato);
    alert(`Creaste un nuevo contrato en calle ${contrato.direccion} con el ID: ${contrato.idContrato}`)
  // } else {
  //   console.log('el idContrato ya exite, verificá la informacion')
  // }
}

async function editRecibo(dataNueva){
  searchParam = reciboLevantado[0]["numeroRecibo"];
  const recibo = await fetch(u+r+searchParam, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataNueva)
  })
  console.log(recibo)
  console.log('Recibo n°'+searchParam+' editado')
}

async function editContrato(dataNueva){
  searchParam = contratoLevantado[0]["idContrato"];
  const contrato = await fetch(u+c+searchParam, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataNueva)
  })
  console.log(contrato);
  console.log('Contrato n°'+searchParam+' editado')
}

async function deleteContrato(searchParam){
  if(confirm('Vas a eliminar definitivamente el contrato N° '+contratoLevantado[0]["idContrato"])){
    const deleted = await fetch(u+c+searchParam, {
      method: 'DELETE'
    })
    console.log('Contrato n°'+contratoLevantado["idContrato"]+' eliminado')
  }  
}


async function sd(){
  await fetch(u+'/close',{
  method: 'POST'
})
  window.close()
}

// const patchRecibo = {
//   "propietario": "Maria Scurra",
//   "inquilino": "Martina Rodriguez",
//   "montoAlquiler": 46500
// }

// const ContratoFrontend = {
//   "idContrato": 777,
//   "propietario": {
//     "nombre": "Fernanda",
//     "apellido": "Perez",
//     "dni": "37123654",
//     "cbu": "155-2037123000006544",
//     "celular": "1122223333",
//     "email": "ferperez@gmail.com",
//     "direccionP": "juncal 322 5° B"
//   },
//   "inquilino": {
//     "nombre": "Alicia",
//     "apellido": "Gonzalez",
//     "dni": "24556676",
//     "cbu": "271-112232487000022625",
//     "celular": "1155554444",
//     "email": "Aliciagon@gmail.com",
//     "garantia": "caucion P345f6"
//   },
//   "departamento": {
//     "direccion": "Junin 435",
//     "propietario": "Fernanda Perez",
//     "inquilino": "Alicia Gonzalez",
//     "inicioContrato": "2023-03-01",
//     "inicioContratoHISP": "28/2/2023",
//     "valor1": 44000,
//     "inicioP2": "28/2/2024",
//     "valor2": 49000,
//     "inicioP3": "28/2/2025",
//     "valor3": 56000,
//     "renovacion": "28/2/2026",
//     "obligacionesInq": "",
//     "descripcion": "",
//     "imagenes": [],
//     "observaciones": ""
//   }
// }
// const bodyContrato = {
//     idContrato:ContratoFrontend.idContrato,
//     nombrePropietario:ContratoFrontend.propietario.nombre,
//     apellidoPropietario:ContratoFrontend.propietario.apellido,
//     dniPropietario:ContratoFrontend.propietario.dni,
//     cbuPropietario:ContratoFrontend.propietario.cbu,
//     celularPropietario:ContratoFrontend.propietario.celular,
//     emailPropietario:ContratoFrontend.propietario.email,
//     direccionPropietario:ContratoFrontend.propietario.direccionP,
//     nombreInquilino:ContratoFrontend.inquilino.nombre,
//     apellidoInquilino:ContratoFrontend.inquilino.apellido,
//     dniInquilino:ContratoFrontend.inquilino.dni,
//     cbuInquilino:ContratoFrontend.inquilino.cbu,
//     celularInquilino:ContratoFrontend.inquilino.celular,
//     emailInquilino:ContratoFrontend.inquilino.email,
//     garantiaInquilino:ContratoFrontend.inquilino.garantia,
//     direccion:ContratoFrontend.departamento.direccion,
//     propietario:ContratoFrontend.departamento.propietario,
//     inquilino:ContratoFrontend.departamento.inquilino,
//     inicioContrato:ContratoFrontend.departamento.inicioContrato,
//     inicioContratoHISP: ContratoFrontend.departamento.inicioContratoHISP,
//     valor1:ContratoFrontend.departamento.valor1,
//     valor2:ContratoFrontend.departamento.valor2,
//     valor3:ContratoFrontend.departamento.valor3,
//     inicioP2: ContratoFrontend.departamento.inicioP2,
//     inicioP3: ContratoFrontend.departamento.inicioP3,
//     renovacion: ContratoFrontend.departamento.renovacion,
//     descripcion:ContratoFrontend.departamento.descripcion,
//     imagenes: ContratoFrontend.departamento.imagenes,
//     observaciones:ContratoFrontend.departamento.observaciones
// }