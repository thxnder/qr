sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/reclamoServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString",
    'sap/m/Button',
    'sap/m/Dialog',    
    'sap/m/Text'
], function (Controller, MessageToast, UIComponent, JSONModel, reclamoServices,materialServices,utilString,Button,Dialog,Text) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Reclamos.RecNuevo", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            var oData = {
                nombre:"",
                numReclamo: "",
                crearReclamo: {
                    "pNumPedido": "",
                    "accion": "ver",
                    "modo": "reclamo"
                },
                ////////Documento Ventas///////////////
                listaMateriales: [],
                ////////Fin Documento Ventas//////////////
                ///////Inicio Visualizar Reclamo///////////
                recNuevo:{
                    "pNumeroReclamo": "", //0100004626",
                    "fechaI": "", //2017-07-07T05:00:00.000Z",
                    "fechaF": "", //2017-07-07T05:00:00.000Z",
                    "horaReclamoI": "", //16:59:29",
                    "horaReclamoF": "", //16:59:29",
                    "empresa": "", //0000101317",
                    "numeroPedido": "", //0000238187",
                    "comentario": "", //Julio Edgardo Pingo Moreno",
                    "material1": "", //11000004",
                    "material2": "", //",
                    "cantRecla1": "", //3.000",
                    "cantRecla2": "", //",
                    "montoRecla1": "", //             630.18",
                    "montoRecla2": "", //",
                    "reclamoRef": "", //",
                    "TextoTratemInicial": "", //SS",
                    "TextoNotaDireccion": "", //I",
                    "TextoSeguimiento": "", //I",
                    "TextoDiagnostico": "", //I",
                    "TextoSolucion": "", //I",
                    "TextoPersonaContacto": "", //I",
                    "TextoDatosFacturacion": "", //I",
                    "TextoPedidoReferencia": "", //I",
                    "TextoMotivosOtros": "", //I",
                    "mail": "", //",
                    "_nif": "", //",
                    "PersonaContacto": "", //nomAP",
                    "NomPContac": "", //nomAP",
                    "DirPContac": "", //direAP",
                    "NIFCont": "", //",
                    "TelfCont": "", //telfAP",
                    "CodpPContac": "", //LIMA 02",
                    "NomCliente": "", //sfdsf Velapatiño Fernandez",
                    "EmpresaDet": "", //0000101317",
                    "NomEmpresa": "", //sfdsf Velapatiño Fernandez",
                    "DirEmpresa": "", //PRUEBA",
                    "TelfEmpre": "", //13354",
                    "CodpEmpresa": "", //LIMA 03",
                    "CodDestMerc": "", //{36}",
                    "NomDestMerc": "", //{37}",
                    "DirDestMerc": "", //{38}",
                    "CodpDestMerc": "", //{39}",
                    "CodECom": "", //{40}",
                    "NomECom": "", //{41}",
                    "codigoEmpResp": "", //00001802",
                    "nombreEmpResp": "", //Julio Edgardo Pingo Moreno",
                    "CodResPago": "", //00001802",
                    "NomResPago": "", //Julio Edgardo Pingo Moreno",
                    "OrgVenta": "", //1000",
                    "Canal": "", //10",
                    "OfiVenta": "", //1010",
                    "Motivo": "", //A01",
                    "Resultado": "", //004",
                    "JustificResul": "", //001",
                    "Sector": "00", //00",
                    "Status": "", //0",
                    "UsuarioStatus": "", //{55}",
                    "Descripcion": "", //{56}",
                    "fechaSts": "", //02/03/2018"
                },
                Texto: {
                        "0001": {
                            "CodTexto": "",
                            "Descripcion": ""
                        },
                        "0004": {
                            "CodTexto": "",
                            "Descripcion": "I"
                        },
                        "Z006": {
                            "CodTexto": "",
                            "Descripcion": "I"
                        },
                        "Z007": {
                            "CodTexto": "",
                            "Descripcion": "I"
                        },
                        "Z008": {
                            "CodTexto": "",
                            "Descripcion": "I"
                        },
                        "Z009": {
                            "CodTexto": "",
                            "Descripcion": "I"
                        },
                        "Z010": {
                            "CodTexto": "",
                            "Descripcion": "I"
                        },
                        "Z011": {
                            "CodTexto": "",
                            "Descripcion": "I"
                        },
                        "Z012": {
                            "CodTexto": "",
                            "Descripcion": "I"
                        },
                    },
                interlocutores: {
                    "AG": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Distrito": "",                            
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": "",
                            "NIF":"",
                            "Titulo":""
                        },
                        "Funcion": "AG",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": "",
                            "Telefono": ""
                        }
                    },
                    "AP": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Distrito": "",                            
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": "",
                            "NIF":"",
                            "Titulo":""
                        },
                        "Funcion": "AP",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": "",
                            "Telefono": ""
                        }
                    },
                    "RE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Distrito": "",                            
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": "",
                            "NIF":"",
                            "Titulo":""
                        },
                        "Funcion": "RE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": "",
                            "Telefono": ""
                        }
                    },
                    "RG": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Distrito": "",                            
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": "",
                            "NIF":"",
                            "Titulo":""
                        },
                        "Funcion": "RG",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": "",
                            "Telefono": ""
                        }
                    },
                    "WE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Distrito": "",                            
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": "",
                            "NIF":"",
                            "Titulo":""
                        },
                        "Funcion": "WE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": "",
                            "Telefono": ""
                        }
                    },
                    "VE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Distrito": "",                            
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": "",
                            "NIF":"",
                            "Titulo":""
                        },
                        "Funcion": "VE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": "",
                            "Telefono": ""
                        }
                    },
                    "ZM": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "",
                            "Distrito": "",                            
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": "",
                            "NIF":"",
                            "Titulo":""
                        },
                        "Funcion": "ZM",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": "",
                            "Telefono": ""
                        }
                    }                                                      
                }
            };
            var datalstAsesores = {
            };
            var datalstZipCodes = {
            };
            if (oEvent.getParameter("name") == "appRecNuevo") {
                this.getView().byId("SplitAppId").setMode("HideMode");
                this.getView().setModel(new JSONModel(oData));
                ////Inicio Ampliar Listado de Asesores en el ComboBox////////
                datalstAsesores = window.dataIni.lstAsesores;
                this.getView().setModel(new JSONModel(datalstAsesores),"modellstAsesores");
                this.getView().getModel("modellstAsesores").setSizeLimit(500);
                this.getView().getModel("modellstAsesores").refresh(true);
                ////End Ampliar Listado de Asesores en el ComboBox////////
                ////Inicio Ampliar Listado de Codigo Postal en el ComboBox////////
                datalstZipCodes = window.dataIni.lstZipCodes;
                this.getView().setModel(new JSONModel(datalstZipCodes),"modellstZipCodes");
                this.getView().getModel("modellstZipCodes").setSizeLimit(700);
                this.getView().getModel("modellstZipCodes").refresh(true);
                ////End Ampliar Listado de Codigo Postal en el ComboBox////////
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().byId("btn_guardar1").setVisible(true);
                this.getView().byId("btn_guardar2").setVisible(true);
                this.getView().byId("btn_guardar3").setVisible(true);
                this.getView().byId("btn_guardar4").setVisible(true);
                this.getView().byId("btnCopiarPersonaContactoRec").setVisible(false);
                this.getView().byId("btnBuscarClienteRec").setVisible(true);

                this.getView().byId("txt_cantRecla1").setValueState("None");
                this.getView().byId("txt_cantRecla2").setValueState("None");
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_rec_nuevo_inicio").open();

                var tipoCabecera = [];
                tipoCabecera.push({
                    codigo: 1,
                    descripcion: 'Datos Iniciales'
                });
                tipoCabecera.push({
                    codigo: 2,
                    descripcion: 'Interlocutores'
                });
                tipoCabecera.push({
                    codigo: 3,
                    descripcion: 'Datos Reclamo'
                });
                /*tipoCabecera.push({
                    codigo: 4,
                    descripcion: 'Cambiar Status'
                });*/
                this.getView().getModel().setProperty("/tipoCabeceraModel", tipoCabecera);
                this.getView().getModel().setProperty("/nombre", "Nuevo Reclamo");
                this.getView().getModel().refresh();
                //
                var numPedidoRecNuevo = sessionStorage.crearReclamoRecNuevo==undefined || sessionStorage.crearReclamoRecNuevo=="undefined"? "":JSON.parse(sessionStorage.crearReclamoRecNuevo);
                            if(numPedidoRecNuevo==""){
                                sessionStorage.clear();
                            }else{
                                this.getView().byId("dlg_rec_nuevo_inicio").close();
                                this.getView().getModel().setProperty("/nombre",JSON.parse((sessionStorage.nombreRecNuevo==undefined)? "":sessionStorage.nombreRecNuevo));
                                this.getView().getModel().setProperty("/numReclamo",JSON.parse((sessionStorage.numReclamoRecNuevo==undefined)? "":sessionStorage.numReclamoRecNuevo));
                                this.getView().getModel().setProperty("/crearReclamo",JSON.parse((sessionStorage.crearReclamoRecNuevo==undefined)? "":sessionStorage.crearReclamoRecNuevo));
                                this.getView().getModel().setProperty("/listaMateriales",JSON.parse((sessionStorage.listaMaterialesRecNuevo==undefined)? "":sessionStorage.listaMaterialesRecNuevo));
                                this.getView().getModel().setProperty("/recNuevo",JSON.parse((sessionStorage.recNuevoRecNuevo==undefined)? "":sessionStorage.recNuevoRecNuevo));
                                this.getView().getModel().setProperty("/Texto",JSON.parse((sessionStorage.TextoRecNuevo==undefined)? "":sessionStorage.TextoRecNuevo));
                                this.getView().getModel().setProperty("/interlocutores",JSON.parse((sessionStorage.interlocutoresRecNuevo==undefined)? "":sessionStorage.interlocutoresRecNuevo));
                                this.byId("SplitAppId").to(this.createId(sessionStorage.PageSelect));
                            }
                //
            }
            
        },
        CambioTabFilter: function () {
            if (this.getView().byId("tabRecInterlocutores").getSelectedKey() === "filterCliente") {
                this.getView().byId("btnCopiarPersonaContactoRec").setVisible(false);
                this.getView().byId("btnBuscarClienteRec").setVisible(true);
            }
            if (this.getView().byId("tabRecInterlocutores").getSelectedKey() === "filterPersonaContacto") {
                this.getView().byId("btnCopiarPersonaContactoRec").setVisible(true);
                this.getView().byId("btnBuscarClienteRec").setVisible(false);
            }
            if (this.getView().byId("tabRecInterlocutores").getSelectedKey() === "filterCodigoAsesor") {
                this.getView().byId("btnCopiarPersonaContactoRec").setVisible(false);
                this.getView().byId("btnBuscarClienteRec").setVisible(false);
            }
            if (this.getView().byId("tabRecInterlocutores").getSelectedKey() === "filterEncargadoComercial") {
                this.getView().byId("btnCopiarPersonaContactoRec").setVisible(false);
                this.getView().byId("btnBuscarClienteRec").setVisible(false);
            }
            this.sessionStorageRecNuevo();
        },
        sessionStorageRecNuevo: function(){
            sessionStorage.setItem("nombreRecNuevo",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/nombre"))));
            sessionStorage.setItem("numReclamoRecNuevo",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/numReclamo"))));
            sessionStorage.setItem("crearReclamoRecNuevo",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/crearReclamo"))));
            sessionStorage.setItem("listaMaterialesRecNuevo",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/listaMateriales"))));
            sessionStorage.setItem("recNuevoRecNuevo",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/recNuevo"))));
            sessionStorage.setItem("TextoRecNuevo",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/Texto"))));
            sessionStorage.setItem("interlocutoresRecNuevo",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/interlocutores"))));
        },
        mostrarReclamo: function(docVentas,reclamo){
                this.getView().getModel().setProperty("/recNuevo/fechaI",reclamo.fechaI);
                this.getView().getModel().setProperty("/recNuevo/fechaF",reclamo.fechaF);
                this.getView().getModel().setProperty("/recNuevo/horaReclamoI",reclamo.horaReclamoI);
                this.getView().getModel().setProperty("/recNuevo/horaReclamoF",reclamo.horaReclamoF);
                this.getView().getModel().setProperty("/recNuevo/empresa",docVentas.objPedido.CodCliente);
                this.getView().getModel().setProperty("/recNuevo/numeroPedido",docVentas.objPedido.NumPedido);
                this.getView().getModel().setProperty("/recNuevo/material1"," ");
                this.getView().getModel().setProperty("/recNuevo/material2","");
                this.getView().getModel().setProperty("/recNuevo/cantRecla1","");
                this.getView().getModel().setProperty("/recNuevo/cantRecla2","");
                this.getView().getModel().setProperty("/recNuevo/montoRecla1","");
                this.getView().getModel().setProperty("/recNuevo/montoRecla2","");
                this.getView().getModel().setProperty("/recNuevo/reclamoRef","");
                this.getView().getModel().setProperty("/recNuevo/EmpresaDet","");
                this.getView().getModel().setProperty("/recNuevo/mail", ""); //docVentas.objPedido._mail
                this.getView().getModel().setProperty("/recNuevo/NomCliente",docVentas.objCliente.Descripcion);
                this.getView().getModel().setProperty("/recNuevo/codigoEmpResp",docVentas.objPedido.CodCliente ); // = this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR"); //"00001802" ;
                this.getView().getModel().setProperty("/recNuevo/Motivo", "A01"); // = this.getView().getModel().getProperty("/reclamo/Motivo"); //"A01" ;
                this.getView().getModel().setProperty("/recNuevo/Status",window.dataIni.person.pwdStatus ); // = this.getView().getModel().getProperty("/reclamo/Status"); //"0" ;
                this.getView().getModel().setProperty("/recNuevo/Resultado", "004"); // = this.getView().getModel().getProperty("/reclamo/Resultado"); //"004" ;
                this.getView().getModel().setProperty("/recNuevo/JustificResul", "001"); // = this.getView().getModel().getProperty("/reclamo/JustificResul"); //"001" ;
                this.getView().getModel().setProperty("/recNuevo/OrgVenta",docVentas.OrgVtas ); // = this.getView().getModel().getProperty("/objReclamo/Contactos/VKORG"); //"1000" ;
                this.getView().getModel().setProperty("/recNuevo/Canal",docVentas.CanalDist ); // = this.getView().getModel().getProperty("/objReclamo/Contactos/VTWEG"); //"10" ;
                this.getView().getModel().setProperty("/recNuevo/Sector",docVentas.objPedido.Sector ); // = this.getView().getModel().getProperty("/objReclamo/Contactos/SPART"); //"00" ;
                this.getView().getModel().setProperty("/recNuevo/OfiVenta",docVentas.oficina ); // = this.getView().getModel().getProperty("/objReclamo/Contactos/VKBUR"); //"1010" ;
                this.getView().getModel().setProperty("/recNuevo/comentario","" ); // = comentario; //"" ;
                this.getView().getModel().setProperty("/recNuevo/pNumeroReclamo", ""); // = this.getView().getModel().getProperty("/numReclamo");
                this.getView().getModel().setProperty("/recNuevo/Sysnr",window.dataIni.user.Sysnr ); // = this.getView().getModel().getProperty("/numReclamo");
                this.getView().getModel().setProperty("/recNuevo/UsuarioStatus","" );
                this.getView().getModel().setProperty("/recNuevo/Descripcion","" );
                this.getView().getModel().setProperty("/recNuevo/codAsesorPedVenta",docVentas.CodVendedor1 );
                this.getView().getModel().setProperty("/recNuevo/asesorPedVenta",docVentas.NomVendedor1 );
                this.getView().getModel().setProperty("/recNuevo/asesorGenRec",window.dataIni.person.Descripcion );
                this.getView().getModel().setProperty("/recNuevo/codAsesorGenRec",window.dataIni.person.PerNr );
                this.sessionStorageRecNuevo();
        },
        mostrarInterlocutores:function(objPedido){
            var interlocutoresOriginal = objPedido.Interlocutores;
            var reclamo = this.getView().getModel().getProperty("/recNuevo");
                            var interlocutoresMod = this.getView().getModel().getProperty("/interlocutores");
                            var cliente = null, tipoInterlocutor = null, persona=null;
                            var inter = [
                                {Funcion:"AG"},
                                {Funcion: "RE"},
                                {Funcion: "RG"},
                                {Funcion: "VE"},
                                {Funcion: "WE"},
                                {Funcion: "ZM"}
                                ];
                            

                            for (var i = 0; i < inter.length; i++) {
                                tipoInterlocutor = inter[i].Funcion;
                                var interlocutores = interlocutoresOriginal.filter(function(el) {
                                        return el.Funcion == (tipoInterlocutor=="ZM" ? "VE" : tipoInterlocutor) ;
                                });
                                if(interlocutores.length>0){
                                    cliente = interlocutores[0].Cliente;
                                    persona = interlocutores[0].Persona; 

                                    interlocutoresMod[tipoInterlocutor].Cliente.Codigo = cliente.Codigo;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Titulo= cliente.Titulo;       
                                    interlocutoresMod[tipoInterlocutor].Cliente.CodigoPostal= cliente.CodigoPostal;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Pais= cliente.Pais;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Ciudad= cliente.CodigoPostal;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Distrito= cliente.Distrito;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Descripcion= cliente.Descripcion;
                                    interlocutoresMod[tipoInterlocutor].Cliente.DireccionCompleta= cliente.DireccionCompleta;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Direccion= cliente.Direccion;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Mail= tipoInterlocutor == "AG" ? objPedido.Mail : cliente.Mail;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Ruc= cliente.Ruc;
                                    interlocutoresMod[tipoInterlocutor].Cliente.PersonaFisica= cliente.PersonaFisica;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Eventual= cliente.Eventual;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Telefono= cliente.Telefono;
                                    interlocutoresMod[tipoInterlocutor].Cliente.TelefonoMovil= cliente.TelefonoMovil;
                                    interlocutoresMod[tipoInterlocutor].Cliente.NIF= cliente.Ruc;


                                    interlocutoresMod[tipoInterlocutor].Persona.ApeSoltero= persona.ApeSoltero;
                                    interlocutoresMod[tipoInterlocutor].Persona.Apellido= persona.Apellido;
                                    interlocutoresMod[tipoInterlocutor].Persona.CodPersona= tipoInterlocutor == "ZM" ? reclamo.codAsesorGenRec : persona.CodPersona;
                                    interlocutoresMod[tipoInterlocutor].Persona.Descripcion= tipoInterlocutor == "ZM" ? reclamo.asesorGenRec : persona.Descripcion;
                                    interlocutoresMod[tipoInterlocutor].Persona.Dni= persona.Dni;
                                    interlocutoresMod[tipoInterlocutor].Persona.Nombre= persona.Nombre;
                                    interlocutoresMod[tipoInterlocutor].Persona.Telefono= persona.Telefono;

                                }
                                
                            }
                        this.getView().getModel().setProperty("/interlocutores",interlocutoresMod);
            this.sessionStorageRecNuevo();
        },
        onContinuarDlg_rec_nuevo_inicio: function (){
            var numero_pedido = this.getView().getModel().getProperty("/crearReclamo/pNumPedido");
            if (numero_pedido != "")
            {
                var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () 
                {
                    var crearReclamo = self.getView().getModel().getProperty("/crearReclamo");
                    //var result1 = reclamoServices.documentoVentas(crearReclamo);
                    reclamoServices.documentoVentas(crearReclamo, function(result1) { 
                sap.ui.core.BusyIndicator.show(0);
                    if (result1.c === "s")
                    {
                        if (result1.data.success)
                        {
                            var pNumPedido = self.getView().getModel().getProperty("/crearReclamo/pNumPedido");
                            self.getView().getModel().setProperty("/docVentas", result1.data);
                            self.getView().getModel().refresh();
                            var docVentas = self.getView().getModel().getProperty("/docVentas");
                            //////////////////////////////////////////////////////////////////////////
                            var arrayMatRec = [];
                            var objMatRec = {
                                "CodMaterialCorto":" ",
                                "DescMaterial":"Seleccione Material"
                            };
                            var matRec = docVentas.objPedido.Detalle;
                            arrayMatRec.push(objMatRec);
                            for (var i = 0; i < matRec.length ; i++) {
                                arrayMatRec.push(matRec[i]);
                            }
                            self.getView().getModel().setProperty("/listaMateriales",arrayMatRec);
                            self.sessionStorageRecNuevo();
                            //var result = reclamoServices.crearReclamo(crearReclamo);
                            reclamoServices.crearReclamo(crearReclamo, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                            if (result.c === "s")
                            {
                                if (result.data.success)
                                {
                                    //////////////////////////////////////////////////////////////////
                                    self.mostrarReclamo(result1.data,result.data.reclamo[0]);
                                    self.mostrarInterlocutores(result1.data.objPedido);
                                    self.getView().getModel().setProperty("/nombre", "Creando Nuevo Reclamo");
                                    self.getView().byId("dlg_rec_nuevo_inicio").close();
                                    self.sessionStorageRecNuevo();
                                    /////////////////////////////////////////////////////////////////
                                    /////////////////////////////////////////////////////////////////
                                } else
                                {
                                    sap.m.MessageToast.show(result.data.errors.reason, {
                                        duration: 3000
                                    });
                                }
                            } else
                            {
                                sap.m.MessageToast.show(result.m, {
                                    duration: 3000
                                });
                            }
                            sap.ui.core.BusyIndicator.hide();
                        });
                        } else
                        {
                            sap.m.MessageToast.show(result1.data.errors.reason, {
                                duration: 3000
                            });
                        }
                    } else
                    {
                        sap.m.MessageToast.show(result1.m, {
                            duration: 3000
                        });
                    }
                sap.ui.core.BusyIndicator.hide();
            });
            }, 1000);
                
            }
            else
            {
                sap.m.MessageToast.show("Ingrese pedido", {
                        duration: 3000
                    });
            }    
        },
        /////////////////////////////////////////////////////////////////////
        crearInterlocutores: function() {
            var listaInterlocutores = new Array();
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var reclamo = this.getView().getModel().getProperty("/recNuevo");
            var cont = 0;
            var cliente = null, tipoInterlocutor = null, persona=null;
            var inter = [
                        {Funcion:"AG"},
                        {Funcion: "VE"},
                        {Funcion: "ZM"},
                        {Funcion: "AP"}
                        ];
                            

        for (var i = 0; i < inter.length; i++) {
                var interlocutor = new Object(); 
                tipoInterlocutor = inter[i].Funcion;
            if(interlocutores[tipoInterlocutor]){ 
                cont = cont + 1;              
                interlocutor.id = cont ;
                interlocutor.PedidoId = 0 ;
                interlocutor.Funcion = interlocutores[tipoInterlocutor].Funcion ;
                interlocutor.Codigo = interlocutores[tipoInterlocutor].Cliente.Codigo == null ? "" : interlocutores[tipoInterlocutor].Cliente.Codigo ;
                interlocutor.Ruc = interlocutores[tipoInterlocutor].Cliente.Ruc ;
                interlocutor.Descripcion = interlocutores[tipoInterlocutor].Cliente.Descripcion == null ? "" : interlocutores[tipoInterlocutor].Cliente.Descripcion ;
                interlocutor.Titulo = interlocutores[tipoInterlocutor].Cliente.Titulo == null ? "" : interlocutores[tipoInterlocutor].Cliente.Titulo ;
                interlocutor.Direccion = interlocutores[tipoInterlocutor].Cliente.Direccion ;
                interlocutor.DireccionCompleta = interlocutores[tipoInterlocutor].Cliente.DireccionCompleta;
                interlocutor.Ciudad = interlocutores[tipoInterlocutor].Cliente.CodigoPostal; //this.getView().byId("com_distrito_solicitante").getSelectedItem().getText();
                interlocutor.Pais = tipoInterlocutor == "AP" ? interlocutores["AG"].Cliente.Pais : interlocutores[tipoInterlocutor].Cliente.Pais ;
                interlocutor.CodigoPostal = interlocutores[tipoInterlocutor].Cliente.CodigoPostal ;
                interlocutor.Distrito = interlocutores[tipoInterlocutor].Cliente.Distrito == null ? "" : interlocutores[tipoInterlocutor].Cliente.Distrito;
                interlocutor.Telefono = interlocutores[tipoInterlocutor].Cliente.Telefono ;
                interlocutor.TelefonoMovil = interlocutores[tipoInterlocutor].Cliente.TelefonoMovil ;
                interlocutor.Mail = tipoInterlocutor == "AG" ? reclamo.mail : interlocutores[tipoInterlocutor].Cliente.Mail == null ? "" : interlocutores[tipoInterlocutor].Cliente.Mail ;
                interlocutor.PersonaFisica = interlocutores[tipoInterlocutor].Cliente.PersonaFisica ;
                interlocutor.Eventual = interlocutores[tipoInterlocutor].Cliente.Eventual;
                interlocutor.CodPersona = interlocutores[tipoInterlocutor].Persona.CodPersona;
                interlocutor.Nombre = interlocutores[tipoInterlocutor].Persona.Descripcion; //interlocutores[tipoInterlocutor].Cliente.Nombre ;
                ///Guardar Codigo Asesor ///
                interlocutor.ADRNR = tipoInterlocutor == "ZM" ? interlocutores["VE"].Persona.CodPersona : ""; //interlocutores[tipoInterlocutor].Cliente.ADRNR ;
                ///
                interlocutor.DescripcionP = ""; //interlocutores[tipoInterlocutor].Cliente.DescripcionP ;
                interlocutor.POSNR = "000000"; //interlocutores[tipoInterlocutor].Cliente.POSNR ;
                interlocutor.PARVW = interlocutores[tipoInterlocutor].Funcion ;
                interlocutor.NOMBRE = interlocutores[tipoInterlocutor].Cliente.Descripcion ;
                interlocutor.Name1 = interlocutores[tipoInterlocutor].Cliente.Descripcion ;
                interlocutor.Calle = interlocutores[tipoInterlocutor].Cliente.Direccion ;
                interlocutor.KUNNR = interlocutores[tipoInterlocutor].Cliente.Codigo ;
                interlocutor.NIF = interlocutores[tipoInterlocutor].Cliente.Ruc ;
                interlocutor.CPOSTAL = interlocutores[tipoInterlocutor].Cliente.CodigoPostal ;
                interlocutor.CodPostal = interlocutores[tipoInterlocutor].Cliente.CodigoPostal ;         
                interlocutor.DIRECCION = interlocutores[tipoInterlocutor].Cliente.Direccion ;         
                interlocutor.TELEFONO = interlocutores[tipoInterlocutor].Cliente.Telefono ;         
                interlocutor.PCONTACTO = interlocutores[tipoInterlocutor].Cliente.Descripcion ;
                interlocutor.PERNR = interlocutores[tipoInterlocutor].Persona.CodPersona ;  
                            
                listaInterlocutores.push(interlocutor);
            }
            }
            this.sessionStorageRecNuevo();
            return listaInterlocutores;
        },        
        crearListaReclamo: function (material1,material2,recRef,txt0001,txt0004,txtZ006,txtZ007,txtZ008,txtZ009,txtZ010, txtZ011,txtZ012) {
            var texto = this.getView().getModel().getProperty("/Texto");
            var recNuevo = this.getView().getModel().getProperty("/recNuevo");
            var listaReclamo = new Object();
          listaReclamo.pNumeroReclamo = recNuevo.pNumeroReclamo;
          listaReclamo.fechaI = recNuevo.fechaI;
          listaReclamo.fechaF = recNuevo.fechaF;
          listaReclamo.horaReclamoI = recNuevo.horaReclamoI;
          listaReclamo.horaReclamoF = recNuevo.horaReclamoF;
          listaReclamo.empresa = recNuevo.codigoEmpResp;
          listaReclamo.numeroPedido = recNuevo.numeroPedido;
          listaReclamo.comentario = recNuevo.comentario;
          listaReclamo.material1 = "";
          listaReclamo.material2 = "";
          listaReclamo.material11 = "";
          listaReclamo.material12 = "";
          listaReclamo.material21 = material1; //"11000004";
          listaReclamo.material22 = material2; //"";
          listaReclamo.cantRecla1 = recNuevo.cantRecla1;
          listaReclamo.cantRecla2 = recNuevo.cantRecla2;
          listaReclamo.montoRecla1 = recNuevo.montoRecla1;
          listaReclamo.montoRecla2 = recNuevo.montoRecla2;
          listaReclamo.reclamoRef = recRef; //"";
          listaReclamo.TextoTratemInicial = txt0001; //texto["0001"].Descripcion;
          listaReclamo.TextoNotaDireccion = txt0004; //texto["0004"].Descripcion;
          listaReclamo.TextoSeguimiento = txtZ006; //texto["Z006"].Descripcion;
          listaReclamo.TextoDiagnostico = txtZ007; //texto["Z007"].Descripcion;
          listaReclamo.TextoSolucion = txtZ008; //texto["Z008"].Descripcion;
          listaReclamo.TextoPersonaContacto = txtZ009; //texto["Z009"].Descripcion;
          listaReclamo.TextoDatosFacturacion = txtZ010; //texto["Z010"].Descripcion;
          listaReclamo.TextoPedidoReferencia = txtZ011; //texto["Z011"].Descripcion;
          listaReclamo.TextoMotivosOtros = txtZ012; //texto["Z012"].Descripcion;
          listaReclamo.mail = ""; //recNuevo.mail;
          listaReclamo._nif = "";
          listaReclamo.PersonaContacto = "";
          listaReclamo.NomPContac = "";
          listaReclamo.DirPContac = "";
          listaReclamo.NIFCont = "";
          listaReclamo.TelfCont = "";
          listaReclamo.CodpPContac = "";
          listaReclamo.NomCliente = recNuevo.NomCliente;
          listaReclamo.EmpresaDet = recNuevo.codigoEmpResp;
          listaReclamo.NomEmpresa = "";
          listaReclamo.DirEmpresa = "";
          listaReclamo.TelfEmpre = "";
          listaReclamo.CodpEmpresa = "";
          listaReclamo.CodDestMerc = "";
          listaReclamo.NomDestMerc = "";
          listaReclamo.DirDestMerc = "";
          listaReclamo.CodpDestMerc = "";
          listaReclamo.CodECom = "";
          listaReclamo.NomECom = "";
          listaReclamo.codigoEmpResp = recNuevo.codAsesorPedVenta;
          listaReclamo.nombreEmpResp = recNuevo.asesorPedVenta;
          listaReclamo.CodResPago = recNuevo.codAsesorGenRec;
          listaReclamo.NomResPago = recNuevo.asesorGenRec;
          listaReclamo.OrgVenta = recNuevo.OrgVenta;
          listaReclamo.Canal = recNuevo.Canal;
          listaReclamo.OfiVenta = recNuevo.OfiVenta;
          listaReclamo.Motivo = recNuevo.Motivo;
          listaReclamo.Resultado = recNuevo.Resultado;
          listaReclamo.JustificResul = recNuevo.JustificResul;
          listaReclamo.Sector = recNuevo.Sector;
          listaReclamo.Status = recNuevo.Status;
          listaReclamo.UsuarioStatus = "";
          listaReclamo.Descripcion = "";
          listaReclamo.fechaSts = recNuevo.fechaI
        this.sessionStorageRecNuevo();
        return listaReclamo;        
        },
        crearNuevoReclamo: function (material1,material2,cantRecla1,cantRecla2,comentario,pIndiceResultado) {
            var recNuevo = this.getView().getModel().getProperty("/recNuevo");
            var reclamo = new Object();
                    reclamo.material11 = "";
                    reclamo.material12 = "";
                    reclamo.material21 = material1;
                    reclamo.material22 = material2;
                    reclamo.cantRecla1 = cantRecla1;
                    reclamo.cantRecla2 = cantRecla2;
                    reclamo.reclamoRef = recNuevo.reclamoRef;
                    reclamo.numeroPedido = recNuevo.numeroPedido;
                    reclamo.EmpresaDet = recNuevo.codigoEmpResp; //"0000101317" ;
                    reclamo.NomCliente = recNuevo.NomCliente; //"Cliente Eventual La Molina" ;
                    reclamo.codigoEmpResp = recNuevo.codAsesorGenRec; //"00001802" ;
                    //reclamo.nombreEmpRes = recNuevo.asesorPedVenta;
                    reclamo.Motivo = recNuevo.Motivo; //"A01" ;
                    reclamo.Status = recNuevo.Status; //"0" ;
                    reclamo.Resultado = recNuevo.Resultado; //"004" ;
                    reclamo.JustificResul = recNuevo.JustificResul; //"001" ;
                    reclamo.OrgVenta = recNuevo.OrgVenta; //"1000" ;
                    reclamo.Canal = recNuevo.Canal; //"10" ;
                    reclamo.Sector = recNuevo.Sector; //"00" ;
                    reclamo.OfiVenta = recNuevo.OfiVenta; //"1010" ;
                    reclamo.comentario = comentario; //"" ;
                    reclamo.pNumeroReclamo = recNuevo.pNumeroReclamo; //"0100004422" ;
                        //enviar listaReclamo como array
                    reclamo.pIndiceResultado = pIndiceResultado.substr(2);
        this.sessionStorageRecNuevo();
        return reclamo;        
        },
        onGuardarReclamo: function () {
            var self = this
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () 
                {
            //////////////////////////////////////////////////////////////////////////////////////////////////
            var pIndiceResultado = self.getView().byId("cbo_Resultado").getSelectedKey();
            if (self.getView().getModel().getProperty("/recNuevo/material1"))
            {
                var material1Model = self.getView().getModel().getProperty("/recNuevo/material1");
            } else
            {
                var material1Model = "";
            }
            if (self.getView().getModel().getProperty("/recNuevo/material2"))
            {
                var material2Model = self.getView().getModel().getProperty("/recNuevo/material2");
            } else
            {
                var material2Model = "";
            }
            if (self.getView().getModel().getProperty("/recNuevo/comentario"))
            {
                var comentarioModel = self.getView().getModel().getProperty("/recNuevo/comentario");
            } else
            {
                var comentarioModel = "";
            }
            if (self.getView().getModel().getProperty("/recNuevo/cantRecla1"))
            {
                var cantRecla1Model = self.getView().getModel().getProperty("/recNuevo/cantRecla1");
            } else
            {
                var cantRecla1Model = "";
            }
            if (self.getView().getModel().getProperty("/recNuevo/cantRecla2"))
            {
                var cantRecla2Model = self.getView().getModel().getProperty("/recNuevo/cantRecla2");
            } else
            {
                var cantRecla2Model = "";
            }
            ///////////////////////////////////////////////////////////////////
            var modelo = "";
            if (self.getView().getModel().getProperty("/Texto/0001/Descripcion"))
            {
                var modelo0001 = self.getView().getModel().getProperty("/Texto/0001/Descripcion");
            } else
            {
                var modelo0001 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/0004/Descripcion"))
            {
                var modelo0004 = self.getView().getModel().getProperty("/Texto/0004/Descripcion");
            } else
            {
                var modelo0004 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/Z006/Descripcion"))
            {
                var modeloZ006 = self.getView().getModel().getProperty("/Texto/Z006/Descripcion");
            } else
            {
                var modeloZ006 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/Z007/Descripcion"))
            {
                var modeloZ007 = self.getView().getModel().getProperty("/Texto/Z007/Descripcion");
            } else
            {
                var modeloZ007 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/Z008/Descripcion"))
            {
                var modeloZ008 = self.getView().getModel().getProperty("/Texto/Z008/Descripcion");
            } else
            {
                var modeloZ008 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/Z009/Descripcion"))
            {
                var modeloZ009 = self.getView().getModel().getProperty("/Texto/Z009/Descripcion");
            } else
            {
                var modeloZ009 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/Z010/Descripcion"))
            {
                var modeloZ010 = self.getView().getModel().getProperty("/Texto/Z010/Descripcion");
            } else
            {
                var modeloZ010 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/Z011/Descripcion"))
            {
                var modeloZ011 = self.getView().getModel().getProperty("/Texto/Z011/Descripcion");
            } else
            {
                var modeloZ011 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/Z012/Descripcion"))
            {
                var modeloZ012 = self.getView().getModel().getProperty("/Texto/Z012/Descripcion");
            } else
            {
                var modeloZ012 = "";
            }
            /////////////////////////////////////////////////////////////////////////////////////////
            if (self.getView().getModel().getProperty("/recNuevo/reclamoRef"))
            {
                var reclamoRefModel = self.getView().getModel().getProperty("/recNuevo/reclamoRef");
            } else
            {
                var reclamoRefModel = "";
            }
            if (self.getView().getModel().getProperty("/recNuevo/mail")=="")
            {
                sap.ui.core.BusyIndicator.hide();
                return sap.m.MessageToast.show("Falta ingresar Correo Cliente", {
                                duration: 3000
                            });
            }
            ////////////////////////////////////////////////////////////////////////////////////////
            var nuevoReclamo = self.crearNuevoReclamo(material1Model,material2Model,cantRecla1Model,cantRecla2Model,comentarioModel,pIndiceResultado);
            var listaIntJsonLleno = JSON.stringify(self.crearInterlocutores());
            var listaReclamoLleno = JSON.stringify([self.crearListaReclamo(material1Model,material2Model,reclamoRefModel,
                                                                            modelo0001,modelo0004,modeloZ006,modeloZ007,
                                                                            modeloZ008,modeloZ009,modeloZ010,modeloZ011,modeloZ012)]);
            
            if(nuevoReclamo && listaReclamoLleno && listaIntJsonLleno)
            {
                
                    //var result = reclamoServices.guardarReclamo(guardarReclamo, listaReclamoLleno, listaIntJsonLleno);
                    reclamoServices.guardarReclamo(nuevoReclamo, listaReclamoLleno, listaIntJsonLleno, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                    if (result.c === "s")
                    {
                        if (result.data.success)
                        {
                            window.numeroReclamo = result.data.nroRec;
                            window.isRecModificar= true;
                            self.getView().byId("dlg_MensajeAvisoGeneralReclamo").open();
                            self.getView().byId("txt_aviso_general_reclamo").setText("Se creó el reclamo con el número: " + result.data.nroRec);
                            sap.ui.core.BusyIndicator.hide();
                            self.sessionStorageRecNuevo();
                        }
                        else
                        {
                            sap.m.MessageToast.show(result.data.errors.reason, {
                                duration: 3000
                            });
                            sap.ui.core.BusyIndicator.hide();
                        }
                        
                    } else
                    {
                        sap.m.MessageToast.show(result.m, {
                            duration: 3000
                        });
                        sap.ui.core.BusyIndicator.hide();
                    }
                    sap.ui.core.BusyIndicator.hide();
                    });
            }

                }, 1000);  
        },
        onOkDlg_MensajeAvisoGeneralReclamo: function ()
        {
            sessionStorage.clear();
            this.getView().byId("dlg_MensajeAvisoGeneralReclamo").close();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("appRecModificar");
        },
        //////////////////////////////////////////////////////////////     
        goHome: function ()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onOpenDlgBuscarRecNuevo: function ()
        {
            //this.getView().byId("dlg_buscar_rec_nuevo").open();
            var material_primero = this.getView().byId("cbo_Motivo").getSelectedItem();
            this.getView().getModel().setProperty("/Motivo", material_primero);
            var material1 = this.getView().getModel().getProperty("/Motivo/mProperties/key");
            console.log(material_primero);
        },
        onCloseDlgBuscarRecNuevo: function ()
        {
            this.getView().byId("dlg_buscar_rec_nuevo").close();
        },
        onBuscarRecNuvoInterlocutores: function ()
        {
            this.byId("SplitAppId").toMaster(this.createId("MasterRecNuevo"));
            this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_interlocutores"));
            this.getView().byId("dlg_buscar_rec_nuevo").close();
        },
        onListMasterDatos: function (oEvent)
        {
            var obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            if (obj.codigo === 1)
            {
                this.byId("SplitAppId").to(this.createId("pag_rec_nuevo_reclamo")); 
                sessionStorage.setItem("PageSelect","pag_rec_nuevo_reclamo");   
            }
            if (obj.codigo === 2)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_interlocutores"));
                sessionStorage.setItem("PageSelect","detail_rec_nuevo_interlocutores");
            }
            if (obj.codigo === 3)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_datos_reclamo"));
                sessionStorage.setItem("PageSelect","detail_rec_nuevo_datos_reclamo");
            }
            if (obj.codigo === 4)
            {
                this.byId("SplitAppId").to(this.createId("detail_rec_nuevo_cambiar_status"));
                sessionStorage.setItem("PageSelect","detail_rec_nuevo_cambiar_status");
            }
        },
        onCerraDialog: function ()
        {
            this.getView().byId("dlg_mostrar_reclamo").close();
        },
        //Abrir Dialog Buscar Cliente
        onDocNuevoBuscarCliente: function ()
        {
            this.limpiarCamposBusCliente();
            this.getView().byId("dlg_buscar_rec_nuevo").open()
        },
        limpiarCamposBusCliente:function(){
            this.getView().byId("txt_ruc_cliente_busqueda").setValue("");
            this.getView().byId("txt_nombre_cliente_busqueda").setValue("");
            this.sessionStorageRecNuevo();
        },
        onDocReclamoBuscarClienteAccion: function (oEvent)
        {
            var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
            var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();
            if (ruc || nombre)
            {
                var self = this;
                sap.ui.core.BusyIndicator.show(0);
                reclamoServices.buscarCliente(ruc, nombre, function(result) { 
                sap.ui.core.BusyIndicator.hide();
                if (result.c === "s")
                {
                    if (result.data.success)
                    {   

                        self.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
                        self.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
                        utilString.cambiarSelectedListaFragment(self, "0","listaClientesReclamoNuevo",false);
                        self.getView().byId("dlg_buscar_rec_nuevo").close();
                        self.getView().getModel().refresh();
                        self.sessionStorageRecNuevo();
                    } else
                    {
                        sap.m.MessageToast.show(result.data.errors.reason, {
                            duration: 3000
                        });
                    }
                } else
                {
                    sap.m.MessageToast.show(result.m, {
                        duration: 3000
                    });
                }
            });
            } else
            {
                sap.m.MessageToast.show('Ingrese RUC ó Razón social', {
                    duration: 1000
                });
                return;
            }
        },
        SeleccionaCliente: function (evt) {
            this.getView().byId("dlg_buscar_rec_nuevo").close()
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/clienteSeleccionado", obj);
            //var result = reclamoServices.reemplazarCiente(obj.codigo);
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            reclamoServices.reemplazarCiente(obj.codigo, function(result) {
            sap.ui.core.BusyIndicator.hide(); 
            if (result.c === "s")
            {
                if (result.data.success)
                {
                    self.getView().getModel().refresh();
                    for (var i = 0; i < result.data.Interlocutores.length; i++)
                    {
                        if (result.data.Interlocutores[i].Funcion = "AG")
                        {
                            self.getView().getModel().setProperty("/interlocutores/AG/Cliente/Codigo", result.data.Interlocutores[0].Cliente.Codigo);
                            self.getView().getModel().setProperty("/interlocutores/AG/Cliente/Descripcion", result.data.Interlocutores[0].Cliente.Descripcion);
                            self.getView().getModel().setProperty("/interlocutores/AG/Cliente/Direccion", result.data.Interlocutores[0].Cliente.Direccion);
                            self.getView().getModel().setProperty("/interlocutores/AG/Cliente/CodigoPostal", result.data.Interlocutores[0].Cliente.CodigoPostal);
                            self.getView().getModel().setProperty("/interlocutores/AG/Cliente/Telefono", result.data.Interlocutores[0].Cliente.Telefono);
                            self.getView().getModel().setProperty("/interlocutores/AG/Cliente/NIF", result.data.Interlocutores[0].Cliente.Ruc);
                            self.getView().getModel().setProperty("/recNuevo/mail", result.data.Interlocutores[0].Cliente.Mail);
                            self.getView().getModel().refresh();
                            self.sessionStorageRecNuevo();
                        }
                    }
                    self.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
                } else
                {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                }
            } else
            {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
            }
        });
        },
        onCopiarCliente: function (){
            var nombre = this.getView().byId("txt_nombre").getValue();
            var direccion = this.getView().byId("txt_direccion").getValue();
            var ubicacion = this.getView().byId("cbo_ubicacion").getSelectedKey();
            var telefono = this.getView().byId("txt_telefono").getValue();
            this.getView().getModel().setProperty("/interlocutores/AP/Cliente/Descripcion", nombre);
            this.getView().getModel().setProperty("/interlocutores/AP/Cliente/Direccion", direccion);
            this.getView().getModel().setProperty("/interlocutores/AP/Cliente/CodigoPostal", ubicacion);
            this.getView().getModel().setProperty("/interlocutores/AP/Cliente/Telefono", telefono);
            this.getView().byId("dlg_MensajeAvisoGeneralRec").open();
            this.sessionStorageRecNuevo();
        },
        onOkDlg_MensajeAvisoGeneral:function(){
            this.getView().byId("dlg_MensajeAvisoGeneralRec").close();
        },
        onCerrarListado: function ()
        {
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
        },
        crearDialogAvisoGeneral: function(data) {  
            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({ text: data }),
                beginButton: new Button({
                    text: 'OK',
                    type: 'Accept',
                    press: function () {
                        if(window.dataIni.person.Langu=="X"){//Cuando es "X" es Call Center, se encuentra en la tabla ZCONSTANTES
                            dialog.destroy();
                        }else{
                            if(data=="Material Inactivo o descontinuado"){
                            }else{
                                this.getView().getModel().setProperty("/recNuevo/material1"," ");
                                this.getView().getModel().setProperty("/recNuevo/cantRecla1","");
                                this.getView().byId("txt_cantRecla1").setValueState("None");  
                                this.sessionStorageRecNuevo();
                            }
                        dialog.destroy();
                        }
                    }.bind(this)
                }),
                afterClose: function() {
                    dialog.destroy();
                }.bind(this)
            });

            dialog.open();
        },
        onSeleccionarMatRec:function(oEvent){
///////Inicio Garantia Reclamo//////////////////////////////////////////////////
            var self = this;
            var pedido = self.getView().getModel().getProperty("/recNuevo/numeroPedido"); 
            var material = oEvent.getSource().mProperties.selectedKey;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
            reclamoServices.buscarGarantiaMaterial(material,pedido,"garantia", function(result) { 
                sap.ui.core.BusyIndicator.hide();
            if (result.data.success) {
                //self.crearDialogAvisoGeneral(result.data.errors.reason);
            } else {
                self.crearDialogAvisoGeneral(result.data.errors.reason);
                //sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
            }            
            
            });
            
                    }, 1000);
///////End Garantia Reclamo///////////////////////////////////////////////////////
            if(this.getView().byId("txt_cantRecla1").getValue()=="" && this.getView().byId("cbo_material21").getSelectedKey()!==" "){
                this.getView().byId("txt_cantRecla1").setValueState("Error");
                this.getView().byId('txt_cantRecla1').focus();
                this.getView().byId("txt_cantRecla1").setValueStateText("Ingresar Cantidad Obligatorio");

            }else{
                this.getView().byId("txt_cantRecla1").setValueState("None");
            }

            if(this.getView().byId("txt_cantRecla2").getValue()=="" && this.getView().byId("cbo_material22").getSelectedKey()!==" "){
                this.getView().byId("txt_cantRecla2").setValueState("Error");
                this.getView().byId('txt_cantRecla2').focus();
                this.getView().byId("txt_cantRecla2").setValueStateText("Ingresar Cantidad Obligatorio");
            }else{
                this.getView().byId("txt_cantRecla2").setValueState("None");
            }


            if(this.getView().byId("txt_cantRecla1").getValue()!="" && this.getView().byId("cbo_material21").getSelectedKey()==" "){
                this.getView().byId("txt_cantRecla1").setValue("");

            }
            if(this.getView().byId("txt_cantRecla2").getValue()!="" && this.getView().byId("cbo_material22").getSelectedKey()==" "){
                this.getView().byId("txt_cantRecla2").setValue("");

            }

        },
        onInputCantMatRec:function(){
            if (this.getView().byId("txt_cantRecla1").getValue()=="" && this.getView().byId("cbo_material21").getSelectedKey()!==" ") {
                this.getView().byId("txt_cantRecla1").setValueState("Error");
                this.getView().byId("txt_cantRecla1").setValueStateText("Ingresar Cantidad Obligatorio");
            }else{
                this.getView().byId("txt_cantRecla1").setValueState("None");
            }

            if (this.getView().byId("txt_cantRecla2").getValue()=="" && this.getView().byId("cbo_material22").getSelectedKey()!==" ") {
                this.getView().byId("txt_cantRecla2").setValueState("Error");
                this.getView().byId("txt_cantRecla2").setValueStateText("Ingresar Cantidad Obligatorio");
            }else{
                this.getView().byId("txt_cantRecla2").setValueState("None");
            }
        }
    });
});