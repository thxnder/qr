sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/reclamoServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
], function (Controller, MessageToast, UIComponent, JSONModel, reclamoServices,utilString) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Reclamos.RecVisualizar", {
        onInit: function () {

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        //Pendientes:
        //--Asesor
        //--Factura / Boleta
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            var oData = {
                enabled:false,
                nombre:"",
                numReclamo: window.numeroReclamo,
                ////////Inicio Documento Ventas////////////
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
                    "Sector": "", //00",
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
                ///////Fin Visualizar Reclamo//////////////
            };
            var datalstAsesores = {
            };
            var datalstZipCodes = {
            };
            if (oEvent.getParameter("name") == "appRecVisualizar") {
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
                this.getView().byId("btn_guardar1").setVisible(false);
                this.getView().byId("btn_guardar2").setVisible(false);
                this.getView().byId("btn_guardar3").setVisible(false);
                this.getView().byId("btn_guardar4").setVisible(false);
                this.getView().byId("btnCopiarPersonaContactoRec").setVisible(false);
                this.getView().byId("btnBuscarClienteRec").setVisible(true);

                this.getView().byId("txt_cantRecla1").setValueState("None");
                this.getView().byId("txt_cantRecla2").setValueState("None");
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_rec_visualizar_inicio").open();
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
                //this.getView().getModel().setProperty("/nombre", "Visualizar Reclamo");
                this.getView().getModel().refresh();
                //
                var numPedidoRecVisualizar = sessionStorage.numReclamoRecVisualizar==undefined || sessionStorage.numReclamoRecVisualizar=="undefined"? "":JSON.parse(sessionStorage.numReclamoRecVisualizar);
                            if(numPedidoRecVisualizar==""){
                                sessionStorage.clear();
                            }else{
                                this.getView().byId("dlg_rec_visualizar_inicio").close();
                                this.getView().getModel().setProperty("/nombre",JSON.parse((sessionStorage.nombreRecVisualizar==undefined)? "":sessionStorage.nombreRecVisualizar));
                                this.getView().getModel().setProperty("/numReclamo",JSON.parse((sessionStorage.numReclamoRecVisualizar==undefined)? "":sessionStorage.numReclamoRecVisualizar));
                                this.getView().getModel().setProperty("/listaMateriales",JSON.parse((sessionStorage.listaMaterialesRecVisualizar==undefined)? "":sessionStorage.listaMaterialesRecVisualizar));
                                this.getView().getModel().setProperty("/recNuevo",JSON.parse((sessionStorage.recNuevoRecVisualizar==undefined)? "":sessionStorage.recNuevoRecVisualizar));
                                this.getView().getModel().setProperty("/Texto",JSON.parse((sessionStorage.TextoRecVisualizar==undefined)? "":sessionStorage.TextoRecVisualizar));
                                this.getView().getModel().setProperty("/interlocutores",JSON.parse((sessionStorage.interlocutoresRecVisualizar==undefined)? "":sessionStorage.interlocutoresRecVisualizar));
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
        sessionStorageRecVisualizar: function(){
            sessionStorage.setItem("nombreRecVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/nombre"))));
            sessionStorage.setItem("numReclamoRecVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/numReclamo"))));
            sessionStorage.setItem("listaMaterialesRecVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/listaMateriales"))));
            sessionStorage.setItem("recNuevoRecVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/recNuevo"))));
            sessionStorage.setItem("TextoRecVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/Texto"))));
            sessionStorage.setItem("interlocutoresRecVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/interlocutores"))));
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
        this.sessionStorageRecVisualizar();
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
        this.sessionStorageRecVisualizar();
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
            this.sessionStorageRecVisualizar();
        },
        onContinuarDlg_rec_nuevo_inicio: function ()
        {
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
                        self.getView().byId("dlg_rec_visualizar_inicio").close();
                        self.getView().getModel().setProperty("/nombre", "Visualizando Reclamo");
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
                        self.sessionStorageRecVisualizar();
                            
                } else
                {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                }
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
        goHome: function ()
        {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onCloseDlgRecNuevo: function (oEvent)
        {
            this.getView().byId("dlg_rec_visualizar_inicio").close()
        },
        onOpenDlgBuscarRecNuevo: function ()
        {
            this.getView().byId("dlg_buscar_rec_nuevo").open();
        },
        onCloseDlgBuscarRecNuevo: function ()
        {
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
    });
});
