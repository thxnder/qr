sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/reclamoServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
], function (Controller, MessageToast, UIComponent, JSONModel, reclamoServices,utilString) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Reclamos.RecModificar", {
        onInit: function () {

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            var oData = {
                nombre:"",
                numReclamo: window.numeroReclamo,
                ////////Documento Ventas///////////////
                listaMateriales: [],
                ////////Fin Documento Ventas//////////////
                ///////Inicio Visualizar Reclamo///////////
                recNuevo:{
                    "pNumeroReclamo": window.numeroReclamo, //0100004626",
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
            if (oEvent.getParameter("name") == "appRecModificar") {
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
                this.getView().byId("SplitAppId").setMode("HideMode");
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().byId("btn_guardar1").setVisible(true);
                this.getView().byId("btn_guardar2").setVisible(true);
                this.getView().byId("btn_guardar3").setVisible(true);
                this.getView().byId("btn_guardar4").setVisible(true);
                this.getView().byId("btnCopiarPersonaContactoRec").setVisible(false);

                this.getView().byId("txt_cantRecla1").setValueState("None");
                this.getView().byId("txt_cantRecla2").setValueState("None");
                this.getView().byId("btnBuscarClienteRec").setVisible(true);
                if(window.isRecModificar){
                    //this.getView().getModel().setProperty("/numReclamo",window.numeroReclamo);
                }
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_rec_modificar_inicio").open();
                this.getView().byId("dlg_rec_modificar_inicio").close();
                this.getView().byId("dlg_rec_modificar_inicio").open();
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
                this.getView().getModel().refresh();
                //
                var numPedidoRecModificar = sessionStorage.numReclamoRecModificar==undefined || sessionStorage.numReclamoRecModificar=="undefined"? "":JSON.parse(sessionStorage.numReclamoRecModificar);
                            if(numPedidoRecModificar==""){
                                sessionStorage.clear();
                            }else{
                                this.getView().byId("dlg_rec_modificar_inicio").close();
                                this.getView().byId("dlg_rec_modificar_inicio").open();
                                this.getView().byId("dlg_rec_modificar_inicio").close();
                                this.getView().getModel().setProperty("/nombre",JSON.parse((sessionStorage.nombreRecModificar==undefined)? "":sessionStorage.nombreRecModificar));
                                this.getView().getModel().setProperty("/numReclamo",JSON.parse((sessionStorage.numReclamoRecModificar==undefined)? "":sessionStorage.numReclamoRecModificar));
                                this.getView().getModel().setProperty("/listaMateriales",JSON.parse((sessionStorage.listaMaterialesRecModificar==undefined)? "":sessionStorage.listaMaterialesRecModificar));
                                this.getView().getModel().setProperty("/recNuevo",JSON.parse((sessionStorage.recNuevoRecModificar==undefined)? "":sessionStorage.recNuevoRecModificar));
                                this.getView().getModel().setProperty("/Texto",JSON.parse((sessionStorage.TextoRecModificar==undefined)? "":sessionStorage.TextoRecModificar));
                                this.getView().getModel().setProperty("/interlocutores",JSON.parse((sessionStorage.interlocutoresRecModificar==undefined)? "":sessionStorage.interlocutoresRecModificar));
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
        },
        sessionStorageRecModificar: function(){
            sessionStorage.setItem("nombreRecModificar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/nombre"))));
            sessionStorage.setItem("numReclamoRecModificar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/numReclamo"))));
            sessionStorage.setItem("listaMaterialesRecModificar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/listaMateriales"))));
            sessionStorage.setItem("recNuevoRecModificar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/recNuevo"))));
            sessionStorage.setItem("TextoRecModificar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/Texto"))));
            sessionStorage.setItem("interlocutoresRecModificar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/interlocutores"))));
        },
        mostrarReclamo: function(objReclamo,reclamo){
            var clienteAG =  objReclamo.Interlocutor.filter(function(el) {
                                        return el.PARVW == "AG" ;
                                });
            var clienteVE =  objReclamo.Interlocutor.filter(function(el) {
                                        return el.PARVW == "ZM" ;
                                });
            var z_reclamo = objReclamo.Z_Reclamo;

                this.getView().getModel().setProperty("/recNuevo/fechaI",reclamo.fechaI);
                this.getView().getModel().setProperty("/recNuevo/fechaF",reclamo.fechaF);
                this.getView().getModel().setProperty("/recNuevo/horaReclamoI",reclamo.horaReclamoI);
                this.getView().getModel().setProperty("/recNuevo/horaReclamoF",reclamo.horaReclamoF);
                this.getView().getModel().setProperty("/recNuevo/empresa",reclamo.CodCliente);
                this.getView().getModel().setProperty("/recNuevo/numeroPedido",reclamo.numeroPedido);
                this.getView().getModel().setProperty("/recNuevo/material1",reclamo.material1);
                this.getView().getModel().setProperty("/recNuevo/material2",reclamo.material2);
                this.getView().getModel().setProperty("/recNuevo/cantRecla1",z_reclamo.CANTRECLA1);
                this.getView().getModel().setProperty("/recNuevo/cantRecla2",z_reclamo.CANTRECLA2);
                this.getView().getModel().setProperty("/recNuevo/montoRecla1",z_reclamo.MONTORECLA1);
                this.getView().getModel().setProperty("/recNuevo/montoRecla2",z_reclamo.MONTORECLA2);
                this.getView().getModel().setProperty("/recNuevo/reclamoRef",reclamo.reclamoRef);
                this.getView().getModel().setProperty("/recNuevo/EmpresaDet",reclamo.EmpresaDet);
                this.getView().getModel().setProperty("/recNuevo/mail", reclamo.mail);
                this.getView().getModel().setProperty("/recNuevo/NomCliente",clienteAG[0].NOMBRE);
                this.getView().getModel().setProperty("/recNuevo/codigoEmpResp",reclamo.EmpresaDet ); // = this.getView().getModel().getProperty("/objReclamo/Interlocutor/ZM/PERNR"); //"00001802" ;
                this.getView().getModel().setProperty("/recNuevo/Motivo", reclamo.Motivo); // = this.getView().getModel().getProperty("/reclamo/Motivo"); //"A01" ;
                this.getView().getModel().setProperty("/recNuevo/Status",reclamo.Status ); // = this.getView().getModel().getProperty("/reclamo/Status"); //"0" ;
                this.getView().getModel().setProperty("/recNuevo/Resultado", reclamo.Resultado); // = this.getView().getModel().getProperty("/reclamo/Resultado"); //"004" ;
                this.getView().getModel().setProperty("/recNuevo/JustificResul", reclamo.JustificResul); // = this.getView().getModel().getProperty("/reclamo/JustificResul"); //"001" ;
                this.getView().getModel().setProperty("/recNuevo/OrgVenta",reclamo.OrgVenta ); // = this.getView().getModel().getProperty("/objReclamo/Contactos/VKORG"); //"1000" ;
                this.getView().getModel().setProperty("/recNuevo/Canal",reclamo.Canal ); // = this.getView().getModel().getProperty("/objReclamo/Contactos/VTWEG"); //"10" ;
                this.getView().getModel().setProperty("/recNuevo/Sector",reclamo.Sector ); // = this.getView().getModel().getProperty("/objReclamo/Contactos/SPART"); //"00" ;
                this.getView().getModel().setProperty("/recNuevo/OfiVenta",reclamo.OfiVenta ); // = this.getView().getModel().getProperty("/objReclamo/Contactos/VKBUR"); //"1010" ;
                this.getView().getModel().setProperty("/recNuevo/comentario",reclamo.comentario ); // = comentario; //"" ;
                this.getView().getModel().setProperty("/recNuevo/pNumeroReclamo", reclamo.pNumeroReclamo); // = this.getView().getModel().getProperty("/numReclamo");
                this.getView().getModel().setProperty("/recNuevo/Sysnr",window.dataIni.user.Sysnr ); // = this.getView().getModel().getProperty("/numReclamo");
                this.getView().getModel().setProperty("/recNuevo/UsuarioStatus",reclamo.UsuarioStatus );
                this.getView().getModel().setProperty("/recNuevo/Descripcion",reclamo.Descripcion );
                this.getView().getModel().setProperty("/recNuevo/codAsesorPedVenta",clienteVE.length > 0 ? clienteVE[0].ADRNR : "");
                this.getView().getModel().setProperty("/recNuevo/asesorGenRec",reclamo.comentario );

                this.getView().getModel().setProperty("/recNuevo/CodDestMerc",reclamo.CodDestMerc );
                this.getView().getModel().setProperty("/recNuevo/CodECom",reclamo.CodECom );
                this.getView().getModel().setProperty("/recNuevo/CodpDestMerc",reclamo.CodpDestMerc );
                this.getView().getModel().setProperty("/recNuevo/DirDestMerc",reclamo.DirDestMerc );
                this.getView().getModel().setProperty("/recNuevo/DirEmpresa",reclamo.DirEmpresa );
                this.getView().getModel().setProperty("/recNuevo/DirPContac",reclamo.DirPContac );
                this.getView().getModel().setProperty("/recNuevo/NomDestMerc",reclamo.NomDestMerc );
                this.getView().getModel().setProperty("/recNuevo/NomECom",reclamo.NomECom );
                this.getView().getModel().setProperty("/recNuevo/NomPContac",reclamo.NomPContac ); 
                this.getView().getModel().setProperty("/recNuevo/fechaSts",reclamo.fechaSts ); 
                this.getView().getModel().setProperty("/recNuevo/CodpPContac",reclamo.CodpPContac ); 
                this.getView().getModel().setProperty("/recNuevo/TelfCont",reclamo.TelfCont );
                this.getView().getModel().setProperty("/recNuevo/TelfEmpre",reclamo.TelfEmpre ); 
                this.getView().getModel().setProperty("/recNuevo/CodpEmpresa",reclamo.CodpEmpresa );
                this.getView().getModel().setProperty("/recNuevo/NomDestMerc",reclamo.NomDestMerc ); 
                this.getView().getModel().setProperty("/recNuevo/nombreEmpResp",reclamo.nombreEmpResp ); 
                this.getView().getModel().setProperty("/recNuevo/NomResPago",reclamo.NomResPago );
                this.getView().getModel().setProperty("/recNuevo/CodResPago",reclamo.CodResPago );
        sessionStorage.setItem("reclamoOriginal",JSON.stringify(this.getView().getModel().getProperty("/recNuevo")));
            this.sessionStorageRecModificar();
        },
        mostrarInterlocutores:function(data){
            var interlocutoresOriginal = data.objReclamo.Interlocutor;
                            var interlocutoresMod = this.getView().getModel().getProperty("/interlocutores");
                            var cliente = null, tipoInterlocutor = null, persona=null;
                            var inter = [
                                {Funcion:"AG"},
                                {Funcion: "ZM"}
                                ];
                            for (var i = 0; i < inter.length; i++) {
                                tipoInterlocutor = inter[i].Funcion;
                                var interlocutores = interlocutoresOriginal.filter(function(el) {
                                        return el.PARVW == tipoInterlocutor ;
                                });
                                if(interlocutores.length>0){
                                    cliente = interlocutores[0]; 

                                    interlocutoresMod[tipoInterlocutor].Cliente.Codigo = cliente.KUNNR==null ? "":cliente.KUNNR;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Titulo= cliente.Titulo == undefined ? "":cliente.Titulo ;       
                                    interlocutoresMod[tipoInterlocutor].Cliente.CodigoPostal= cliente.CodPostal;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Pais= cliente.Pais==undefined ? "":cliente.Pais;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Ciudad= cliente.CodPostal;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Distrito= cliente.Distrito==undefined ? "":cliente.Distrito;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Descripcion= cliente.NOMBRE;
                                    interlocutoresMod[tipoInterlocutor].Cliente.DireccionCompleta= "";
                                    interlocutoresMod[tipoInterlocutor].Cliente.Direccion= cliente.Direccion;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Mail= tipoInterlocutor=="AG" ? data.reclamo[0].mail : cliente.Mail;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Ruc= cliente.Ruc;
                                    interlocutoresMod[tipoInterlocutor].Cliente.PersonaFisica= cliente.PersonaFisica;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Eventual= cliente.Eventual;
                                    interlocutoresMod[tipoInterlocutor].Cliente.Telefono= cliente.Telefono;
                                    interlocutoresMod[tipoInterlocutor].Cliente.TelefonoMovil= cliente.TelefonoMovil;
                                    interlocutoresMod[tipoInterlocutor].Cliente.NIF= cliente.Ruc;
                                    interlocutoresMod[tipoInterlocutor].Cliente.ADRNR= cliente.ADRNR;
                                    interlocutoresMod[tipoInterlocutor].Cliente.POSNR= cliente.POSNR;
                                    interlocutoresMod[tipoInterlocutor].Persona.CodPersona= cliente.PERNR;

                                    if(tipoInterlocutor=="ZM"){
                                        interlocutoresMod["VE"].Persona.CodPersona = cliente.ADRNR
                                        var asesor = window.dataIni.lstAsesores.filter(function(el) {
                                            return el.Codigo == cliente.ADRNR ;
                                    });
                                        interlocutoresMod["VE"].Persona.Descripcion = asesor[0].Descripcion ;
                                    }

                                }
                                
                            }
                        this.getView().getModel().setProperty("/interlocutores",interlocutoresMod);
            this.sessionStorageRecModificar();
        },
        mostrarTextos:function(objReclamo){
            var textos = objReclamo.Texto;
            var textoMod = this.getView().getModel().getProperty("/Texto");

                for (var i = 0; i < textos.length; i++) {
                    var tipoTexto = textos[i].CodTexto;
                    textoMod[tipoTexto].CodTexto = textos[i].CodTexto;
                    textoMod[tipoTexto].Descripcion = textos[i].Descripcion;
                            }
            this.getView().getModel().setProperty("/Texto",textoMod);
            this.sessionStorageRecModificar();
        },
        onContinuarDlg_rec_modificar_inicio: function () {
            var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () 
                {
            var numReclamo = self.getView().getModel().getProperty("/numReclamo");
            //var result = reclamoServices.verReclamos(numReclamo);
            reclamoServices.verReclamos(numReclamo, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            if (result.c === "s")
            {
                    if (result.data.success)
                    {
                        var mat1 = result.data.reclamo[0].material1;
                        var mat2 = result.data.reclamo[0].material2;
                        
                        var mats = [];
                        var obj ={
                                    "CodMaterialCorto":" ",
                            };
                        var obj1 ={
                                    "CodMaterialCorto":mat1,
                                    "DescMaterial":mat1!=""? "":"No hay Material 1"
                            };
                            var obj2 ={
                                    "CodMaterialCorto":mat2,
                                    "DescMaterial":mat2!=""? "":"No hay Material 2"
                            };
                        mats.push(obj);
                        mats.push(obj1);
                        mats.push(obj2);
                        self.getView().byId("dlg_rec_modificar_inicio").close();
                        self.getView().getModel().setProperty("/nombre", "Modificando Reclamo");
                        self.getView().getModel().setProperty("/listaMateriales",mats);
                        ///////Seteando AP//////////////////////////////////////////////////////
                        self.getView().getModel().setProperty("/interlocutores/AP/Cliente/Codigo",result.data.reclamo[0].EmpresaDet );
                        self.getView().getModel().setProperty("/interlocutores/AP/Cliente/Descripcion",result.data.reclamo[0].PersonaContacto );
                        self.getView().getModel().setProperty("/interlocutores/AP/Cliente/Direccion",result.data.reclamo[0].DirPContac );
                        self.getView().getModel().setProperty("/interlocutores/AP/Cliente/CodigoPostal",result.data.reclamo[0].CodpPContac );
                        self.getView().getModel().setProperty("/interlocutores/AP/Cliente/Telefono",result.data.reclamo[0].TelfCont );
                        ////////////////////////////////////////////////////////////////////////
                        self.mostrarInterlocutores(result.data);
                        self.mostrarTextos(result.data.objReclamo);
                        self.mostrarReclamo(result.data.objReclamo,result.data.reclamo[0]);
                        self.getView().getModel().refresh();
                        self.sessionStorageRecModificar();
                    } else
                    {
                        sap.m.MessageToast.show(result.data.errors.reason, {
                            duration: 3000
                        });
                    } 
                    window.numeroReclamo = "";
                    self.getView().byId("loadingControl").close();
                
            } else
            {
                sap.ui.core.BusyIndicator.hide();
                    sap.m.MessageToast.show(result.m, {
                        duration: 3000
                    });
            }
            sap.ui.core.BusyIndicator.hide();
        });
            }, 1000);
        },
        /////////////////////////////////////////////////////////////////
        crearInterlocutores: function() {
            var listaInterlocutores = new Array();
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var reclamo = this.getView().getModel().getProperty("/recNuevo");
            var cont = 0;
            var cliente = null, tipoInterlocutor = null, persona=null;
            var inter = [
                        {Funcion:"AG"},
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
                interlocutor.Codigo = interlocutores[tipoInterlocutor].Cliente.Codigo ;
                interlocutor.Ruc = interlocutores[tipoInterlocutor].Cliente.Ruc==undefined ? "":interlocutores[tipoInterlocutor].Cliente.Ruc ;
                interlocutor.Descripcion = interlocutores[tipoInterlocutor].Cliente.Descripcion ;
                interlocutor.Titulo = interlocutores[tipoInterlocutor].Cliente.Titulo ;
                interlocutor.Direccion = interlocutores[tipoInterlocutor].Cliente.Direccion ;
                interlocutor.DireccionCompleta = interlocutores[tipoInterlocutor].Cliente.DireccionCompleta;
                interlocutor.Ciudad = interlocutores[tipoInterlocutor].Cliente.CodigoPostal; 
                interlocutor.Pais = tipoInterlocutor == "AP" ? interlocutores["AG"].Cliente.Pais : interlocutores[tipoInterlocutor].Cliente.Pais ;
                interlocutor.CodigoPostal = interlocutores[tipoInterlocutor].Cliente.CodigoPostal ;
                interlocutor.Distrito = interlocutores[tipoInterlocutor].Cliente.Distrito;
                interlocutor.Telefono = interlocutores[tipoInterlocutor].Cliente.Telefono ;
                //interlocutor.TelefonoMovil = interlocutores[tipoInterlocutor].Cliente.TelefonoMovil ;
                interlocutor.Mail = tipoInterlocutor == "AG" ? reclamo.mail : interlocutores[tipoInterlocutor].Cliente.Mail ;
                interlocutor.PersonaFisica = false;
                interlocutor.Eventual = false;
                interlocutor.CodPersona = interlocutores[tipoInterlocutor].Persona.CodPersona == undefined ? "":interlocutores[tipoInterlocutor].Persona.CodPersona;
                interlocutor.Nombre = interlocutores[tipoInterlocutor].Cliente.Descripcion; 
                interlocutor.ADRNR = interlocutores[tipoInterlocutor].Cliente.ADRNR ==undefined ? "":interlocutores[tipoInterlocutor].Cliente.ADRNR; 
                interlocutor.DescripcionP = ""; 
                interlocutor.POSNR = interlocutores[tipoInterlocutor].Cliente.POSNR ==undefined ? "":interlocutores[tipoInterlocutor].Cliente.POSNR; 
                interlocutor.PARVW = interlocutores[tipoInterlocutor].Funcion ;
                interlocutor.NOMBRE = interlocutores[tipoInterlocutor].Cliente.Descripcion ;
                interlocutor.Name1 = interlocutores[tipoInterlocutor].Cliente.Descripcion ;
                interlocutor.Calle = interlocutores[tipoInterlocutor].Cliente.Direccion ;
                interlocutor.KUNNR = interlocutores[tipoInterlocutor].Cliente.Codigo ;
                //interlocutor.NIF = interlocutores[tipoInterlocutor].Cliente.Ruc ;
                interlocutor.CPOSTAL = interlocutores[tipoInterlocutor].Cliente.CodigoPostal ;
                interlocutor.CodPostal = interlocutores[tipoInterlocutor].Cliente.CodigoPostal ;         
                interlocutor.DIRECCION = interlocutores[tipoInterlocutor].Cliente.Direccion ;         
                interlocutor.TELEFONO = interlocutores[tipoInterlocutor].Cliente.Telefono ;         
                interlocutor.PCONTACTO = interlocutores[tipoInterlocutor].Cliente.Descripcion ;
                interlocutor.PERNR = interlocutores[tipoInterlocutor].Persona.CodPersona == undefined ? "":interlocutores[tipoInterlocutor].Persona.CodPersona ;  
                            
                listaInterlocutores.push(interlocutor);
            }
            }
            this.sessionStorageRecModificar();
            return listaInterlocutores;
        },        
        crearListaReclamo: function (txt0001,txt0004,txtZ006,txtZ007,txtZ008,txtZ009,txtZ010, txtZ011,txtZ012) {
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
          listaReclamo.material1 = recNuevo.material1;
          listaReclamo.material2 = recNuevo.material2;
          listaReclamo.material11 = recNuevo.material1;
          listaReclamo.material12 = recNuevo.material2;
          listaReclamo.material21 = ""; //"11000004";
          listaReclamo.material22 = ""; //"";
          listaReclamo.cantRecla1 = recNuevo.cantRecla1;
          listaReclamo.cantRecla2 = recNuevo.cantRecla2;
          listaReclamo.montoRecla1 = recNuevo.montoRecla1;
          listaReclamo.montoRecla2 = recNuevo.montoRecla2;
          listaReclamo.reclamoRef = recNuevo.reclamoRef; //"";
          listaReclamo.TextoTratemInicial = txt0001; //texto["0001"].Descripcion;
          listaReclamo.TextoNotaDireccion = txt0004; //texto["0004"].Descripcion;
          listaReclamo.TextoSeguimiento = txtZ006; //texto["Z006"].Descripcion;
          listaReclamo.TextoDiagnostico = txtZ007; //texto["Z007"].Descripcion;
          listaReclamo.TextoSolucion = txtZ008; //texto["Z008"].Descripcion;
          listaReclamo.TextoPersonaContacto = txtZ009; //texto["Z009"].Descripcion;
          listaReclamo.TextoDatosFacturacion = txtZ010; //texto["Z010"].Descripcion;
          listaReclamo.TextoPedidoReferencia = txtZ011; //texto["Z011"].Descripcion;
          listaReclamo.TextoMotivosOtros = txtZ012; //texto["Z012"].Descripcion;
          listaReclamo.mail = JSON.parse(sessionStorage.reclamoOriginal).mail; //recNuevo.mail;
          listaReclamo._nif = recNuevo._nif;
          listaReclamo.PersonaContacto = recNuevo.NomPContac;
          listaReclamo.NomPContac = recNuevo.NomPContac;
          listaReclamo.DirPContac = recNuevo.DirPContac;
          listaReclamo.NIFCont = "";
          listaReclamo.TelfCont = recNuevo.TelfCont;
          listaReclamo.CodpPContac = recNuevo.CodpPContac;
          listaReclamo.NomCliente = recNuevo.NomCliente;
          listaReclamo.EmpresaDet = recNuevo.codigoEmpResp;
          listaReclamo.NomEmpresa = recNuevo.NomCliente;
          listaReclamo.DirEmpresa = recNuevo.DirEmpresa;
          listaReclamo.TelfEmpre = recNuevo.TelfEmpre;
          listaReclamo.CodpEmpresa = recNuevo.CodpEmpresa;
          listaReclamo.CodDestMerc = recNuevo.CodDestMerc;
          listaReclamo.NomDestMerc = recNuevo.NomDestMerc;
          listaReclamo.DirDestMerc = recNuevo.DirDestMerc;
          listaReclamo.CodpDestMerc = recNuevo.CodpDestMerc;
          listaReclamo.CodECom = recNuevo.CodECom;
          listaReclamo.NomECom = recNuevo.NomECom;
          listaReclamo.codigoEmpResp = recNuevo.CodResPago;
          listaReclamo.nombreEmpResp = recNuevo.nombreEmpResp;
          listaReclamo.CodResPago = recNuevo.CodResPago;
          listaReclamo.NomResPago = recNuevo.NomResPago;
          listaReclamo.OrgVenta = recNuevo.OrgVenta;
          listaReclamo.Canal = recNuevo.Canal;
          listaReclamo.OfiVenta = recNuevo.OfiVenta;
          listaReclamo.Motivo = recNuevo.Motivo;
          listaReclamo.Resultado = recNuevo.Resultado;
          listaReclamo.JustificResul = recNuevo.JustificResul;
          listaReclamo.Sector = recNuevo.Sector;
          listaReclamo.Status = recNuevo.Status;
          listaReclamo.UsuarioStatus = recNuevo.UsuarioStatus;
          listaReclamo.Descripcion = recNuevo.Descripcion;
          listaReclamo.fechaSts = recNuevo.fechaI
        this.sessionStorageRecModificar();
        return listaReclamo;        
        },
        crearNuevoReclamo: function (pIndiceResultado) {
            var recNuevo = this.getView().getModel().getProperty("/recNuevo");
            var reclamo = new Object();
                    reclamo.material11 = recNuevo.material1;
                    reclamo.material12 = recNuevo.material2;
                    reclamo.material21 = "";
                    reclamo.material22 = "";
                    reclamo.cantRecla1 = recNuevo.cantRecla1;
                    reclamo.cantRecla2 = recNuevo.cantRecla2;
                    reclamo.reclamoRef = recNuevo.reclamoRef;
                    reclamo.numeroPedido = recNuevo.numeroPedido;
                    reclamo.EmpresaDet = recNuevo.codigoEmpResp; //"0000101317" ;
                    reclamo.NomCliente = recNuevo.NomCliente; //"Cliente Eventual La Molina" ;
                    reclamo.codigoEmpResp = recNuevo.CodResPago; //"00001802" ;
                    reclamo.Motivo = recNuevo.Motivo; //"A01" ;
                    reclamo.Status = recNuevo.Status; //"0" ;
                    reclamo.Resultado = recNuevo.Resultado; //"004" ;
                    reclamo.JustificResul = recNuevo.JustificResul; //"001" ;
                    reclamo.OrgVenta = recNuevo.OrgVenta; //"1000" ;
                    reclamo.Canal = recNuevo.Canal; //"10" ;
                    reclamo.Sector = recNuevo.Sector; //"00" ;
                    reclamo.OfiVenta = recNuevo.OfiVenta; //"1010" ;
                    reclamo.comentario = recNuevo.comentario; //"" ;
                    reclamo.pNumeroReclamo = recNuevo.pNumeroReclamo; //"0100004422" ;
                        //enviar listaReclamo como array
                    reclamo.pIndiceResultado = pIndiceResultado.substr(2);
        this.sessionStorageRecModificar();
        return reclamo;        
        },
        onGuardarReclamo: function ()
        {
            var self = this
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () 
                {
            var indice_resultado = self.getView().byId("cbo_Resultado").getSelectedItem();
            var pIndiceResultado = indice_resultado.mProperties.key;
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
            if (self.getView().getModel().getProperty("/Texto/Z011/Descripcion")) {
                var modeloZ011 = self.getView().getModel().getProperty("/Texto/Z011/Descripcion");
            } else {
                var modeloZ011 = "";
            }
            if (self.getView().getModel().getProperty("/Texto/Z012/Descripcion")) {
                var modeloZ012 = self.getView().getModel().getProperty("/Texto/Z012/Descripcion");
            } else {
                var modeloZ012 = "";
            }
            ///////////////////////////////////////////////////////////////////////////////////////////////////////
            
            var nuevoReclamo = self.crearNuevoReclamo(pIndiceResultado);
            var listaIntJsonLleno = JSON.stringify(self.crearInterlocutores());
            var listaReclamoLleno = JSON.stringify([self.crearListaReclamo(modelo0001,modelo0004,modeloZ006,modeloZ007,
                                                                            modeloZ008,modeloZ009,modeloZ010,modeloZ011,modeloZ012)]);
            

            console.log("nuevoReclamo////"+nuevoReclamo);
            console.log("listaIntJsonLleno////"+listaIntJsonLleno);
            console.log("listaReclamoLleno////"+listaReclamoLleno);
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
                                self.getView().byId("txt_aviso_general_reclamo").setText("Se modificó el reclamo con el número: " + result.data.nroRec);
                                self.sessionStorageRecModificar();
                            }
                            else
                            {
                                sap.m.MessageToast.show(result.data.errors.reason, {
                                    duration: 3000
                                });
                                /*sap.m.MessageToast.show(result.data.errors.reason=="Ingrese el tratamiento inicial." ? "Ingrese Motivo de Reclamo":result.data.errors.reason, {
                                    duration: 3000
                                });*/
                            }
                            sap.ui.core.BusyIndicator.hide();
                    } 
                    else
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
            this.goHome();
        },
        ///////////////////////////////////////////////////////////////////////77
        goHome: function ()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
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
        //Abrir Dialog Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.limpiarCamposBusCliente();
            this.getView().byId("dlg_buscar_rec_nuevo").open()
        },
        limpiarCamposBusCliente:function(){
            this.getView().byId("txt_ruc_cliente_busqueda").setValue("");
            this.getView().byId("txt_nombre_cliente_busqueda").setValue("");
        },
        onDocReclamoBuscarClienteAccion: function (oEvent) {
            var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
            var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();
            if (ruc || nombre)
            {
                var self = this;
                //var result = reclamoServices.buscarCliente(ruc, nombre);
                reclamoServices.buscarCliente(ruc, nombre, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                if (result.c === "s")
                {
                    if (result.data.success)
                    {
                        self.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
                        self.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
                        utilString.cambiarSelectedListaFragment(self, "0","listaClientesReclamoModificar",false);
                        self.getView().byId("dlg_buscar_rec_nuevo").close();
                        self.getView().getModel().refresh();
                        self.sessionStorageRecModificar();
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
            reclamoServices.reemplazarCiente(obj.codigo, function(result) { 
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
                        }
                    }
                    self.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
                    self.sessionStorageRecModificar();
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
            this.sessionStorageRecModificar();
        },
        onOkDlg_MensajeAvisoGeneral:function(){
            this.getView().byId("dlg_MensajeAvisoGeneralRec").close();
        },
        onCerrarListado: function ()
        {
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close();
        },
        onSeleccionarMatRec:function(){
            


            if(this.getView().byId("txt_cantRecla1").getValue()=="" && (this.getView().byId("cbo_material21").getSelectedKey()!==" " && this.getView().byId("cbo_material21").getSelectedKey()!=="") ){
                this.getView().byId("txt_cantRecla1").setValueState("Error");
                this.getView().byId("txt_cantRecla1").setValueStateText("Ingresar Cantidad Obligatorio");

            }else{
                this.getView().byId("txt_cantRecla1").setValueState("None");
            }

            if(this.getView().byId("txt_cantRecla2").getValue()=="" && (this.getView().byId("cbo_material22").getSelectedKey()!==" " && this.getView().byId("cbo_material22").getSelectedKey()!=="")){
                this.getView().byId("txt_cantRecla2").setValueState("Error");
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

            if(this.getView().byId("txt_cantRecla1").getValue()!="" && this.getView().byId("cbo_material21").getSelectedKey()==""){
                this.getView().byId("txt_cantRecla1").setValue("");

            }
            if(this.getView().byId("txt_cantRecla2").getValue()!="" && this.getView().byId("cbo_material22").getSelectedKey()==""){
                this.getView().byId("txt_cantRecla2").setValue("");

            }

        },
        onInputCantMatRec:function(){
            if (this.getView().byId("txt_cantRecla1").getValue()=="" && (this.getView().byId("cbo_material21").getSelectedKey()!==" " && this.getView().byId("cbo_material21").getSelectedKey()!=="")) {
                this.getView().byId("txt_cantRecla1").setValueState("Error");
                this.getView().byId("txt_cantRecla1").setValueStateText("Ingresar Cantidad Obligatorio");
            }else{
                this.getView().byId("txt_cantRecla1").setValueState("None");
            }

            if (this.getView().byId("txt_cantRecla2").getValue()=="" && (this.getView().byId("cbo_material22").getSelectedKey()!==" " && this.getView().byId("cbo_material21").getSelectedKey()!=="")) {
                this.getView().byId("txt_cantRecla2").setValueState("Error");
                this.getView().byId("txt_cantRecla2").setValueStateText("Ingresar Cantidad Obligatorio");
            }else{
                this.getView().byId("txt_cantRecla2").setValueState("None");
            }
        }
    });
});
