sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/util/utilString",
    "pe/com/seidor/sap/decor/ventas/util/utilDocumentoDocModificar"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, documentosServices, jQuery,utilString,utilDocumentoDocModificar) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocVisualizar", {        
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            //this.validProveedor();
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            var oData = {
                "menuMaster":{
                    listPanelDatos:true,
                    listPanelFacturacion:true,
                    listPanelDatosVisita:true,
                    listPanelDatosInstalacion:true,
                    listPanelPedidosAsociados:true,
                    listPanelDatosServicio:true
                },
                "OcultarCampos": false,
                "btnStock":true,
                "valueProfesional":false,
                /////Grupo Forecast//////////////////////////////////
                "GrupoForeAction": false,
                "TipoForeAction": false,
                "visibleCombTipoVisita": false,
                ////////////////////////////////////////////////////
                "pedido": {
                    "validInterlocutores":false,
                    "enabled": true,
                    "enabledBtnGuardar": true,
                    "enabledBtnCopiar": true,
                    "enabledBtnBuscar": true,
                    "OrgVentas": "",
                    "CanalDist": "",
                    "CodOficina": "",
                    "CondPago": "",
                    "Moneda": "",
                    "TipoCambio": 3.282,
                    "PesoTotal": 90,
                    "FechaFacturacion": "",
                    "NombreBanco": "",
                    "BloqueoEntrega": "",
                    "BloqueoFactura": "",
                    "Motivo": "",
                    "OrdenCompra": "",
                    "CondExp": "",
                    "Fecha": "",
                    "FechaValidez": "",
                    "FechaEntrega": "",
                    "nomProyecto": "",
                    "codProyecto": "",
                    "codVersion": "",
                    "TipoVisita": "",
                    "Reenbolsable": false,
                    "GrupoForecast": "",
                    "TipoForecast": "",
                    "Certificado": "",
                    "FechaVisita": ""
                },
                "observaciones": {
                    "ZP01": {
                        "CodTexto": "ZP01",
                        "Descripcion": ""
                    },
                    "ZP05": {
                        "CodTexto": "ZP05",
                        "Descripcion": ""
                    },
                    "ZP06": {
                        "CodTexto": "ZP06",
                        "Descripcion": ""
                    },
                    "ZP07": {
                        "CodTexto": "ZP07",
                        "Descripcion": ""
                    }
                },
                "interlocutores": {
                    "AG": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "AG",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "RE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "RE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "RG": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "RG",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "VE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "VE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "V2": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "V2",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "V3": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "V3",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "WE": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "WE",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    },
                    "Z3": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "CodigoPostal": "LIMA 31",
                            "Descripcion": "",
                            "Direccion": "Pinar del Rio",
                            "DireccionCompleta": "Pinar del Rio LIMA 31",
                            "Mail": "",
                            "NOMBRE": "",
                            "Pais": "PE",
                            "Ruc": "",
                            "Telefono": "998109779",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "Z3",
                        "Persona": {
                            "ApeSoltero": "",
                            "Apellido": "",
                            "CodPersona": "",
                            "Descripcion": "",
                            "Dni": "",
                            "Nombre": ""
                        }
                    }
                },
                "profesionales": {
                    "CodProfesional": "",
                    "NomProfesional": "",
                    "CodProfesional2": "",
                    "NomProfesional2": ""
                },
                "cliente": {
                    "APMAT": "soto",
                    "APPAT": "malca",
                    "CODIG": "",
                    "Ciudad": "Lima",
                    "CodigoPostal": "LIMA 09",
                    "DIREC": "",
                    "EDAD": "0",
                    "RANGOED": "",
                    "NIVELSE" : "",
                    "FECNAC": "",
                    "GRAINS": "10",
                    "Mail": "",
                    "NOMBRE": "",
                    "Pais": "PE",
                    "Ruc": null,
                    "SEXO": "1",
                    "Telefono": "",
                    "TelefonoMovil": null
                },
                "preguntas": {
                    "1": {
                        "CODP": "1",
                        "CODR": ""
                    },
                    "10": {
                        "CODP": "10",
                        "CODR": ""
                    },
                    "15": {
                        "CODP": "15",
                        "CODR": ""
                    },
                    "20": {
                        "CODP": "20",
                        "CODR": ""
                    },
                    "25": {
                        "CODP": "25",
                        "CODR": ""
                    },
                    "35": {
                        "CODP": "35",
                        "CODR": ""
                    }
                },
                "clienteEventual": {
                    "codigoCliente": "", 
                    "nombreCliente": "", 
                    "esEventual": true, 
                },
                "listaMaterial": [{
                        "Posicion": "",
                        "PosicionCorto": "",                        
                        "CodMaterial": "",
                        "CodMaterialCorto": "",
                        "DescMaterial": "",
                        "Cantidad": null,
                        "CantConfirmada": null,
                        "CodUMedida": "",
                        "Rendimiento": "",
                        "UMedidaRendimiendo": "",
                        "ValorRendimiento": null,
                        "CodAlmacen": "",
                        "CodCentro": "",
                        "CodLote": "",
                        "DescCentro": "",
                        "DescAlmacen": "",
                        "Zservicio": false,
                        "Peso": null,
                        "PesoNeto": null,
                        "PrecioUnitario": null,
                        "DesGrupoMat": "",
                        "SubTotal": null,
                        "Reparto": "",
                        "Ambiente": "",
                        "Opcion": "",
                        "MotivoRechazo": "",
                        "PrioridadEntrega": "",
                        "Descontinuado": "",
                        "StockPos": "",
                        "JerarquiaPrincipalDesc": "",
                        "link": null,
                        "DescMovil": "",
                        "Descripcion": "",
                        "EsEstiba": false,
                        "EsFlete": false,
                        "EspecialServ": false,
                        "jerarquia": "",
                        "MSTAE": "",
                        "PrecioUnit": null,
                        "Stock": null,
                        "StockTotal": null,
                        "TieneServ": false,
                        "Tipo": "",
                        "TipoMaterial": "",  
                        "PrecioTotal": null,
                        "PrecioUnitario": null,
                        "IgvUnitario": null,
                        "IgvTotal": null,
                        "TotalDctos": null,
                        "SubTotal": null,
                        "TotPercep": "",
                        "SubTotalLista": null,
                        "ConversionUMedida":"",
                        "DivisionRendimiento":null,
                        "DsctoMontTotal":null,
                        "Peso":null,
                        "PrecioConIGV":null,
                        "PrecioSinIGV":null,
                        "Total":null,
                        "TotalImpresion":null,  
                        "TipoPosAnt": "", 
                        "Vdscto": 0,                     
                        "Repartos": [{
                                "CantConf": null,
                                "CantPed": null,
                                "CodUMedida": null,
                                "FechaEntrega": "",
                                "Pos": "",
                                "PosCorto": "",
                                "TipoReparto": "",
                                "matPosicion":""
                            }],
                        "DescuentoPrincipal": [{
                                "Condicion": "",
                                "Denominacion": "",
                                "Importe": null,
                                "ImporteAnterior": null,
                                "LimiteInferior": null,
                                "Moneda": null,
                                "Posicion": "",
                                "Recalcular": "",
                                "Valor": null,
                                "esPorcentaje": true,
                                "matPosicion": ""
                            }],
                        "DescuentoOtros": [{
                                "Condicion": "",
                                "Denominacion": "",
                                "Importe": null,
                                "ImporteAnterior": null,
                                "LimiteInferior": null,
                                "Moneda": null,
                                "Posicion": "",
                                "Recalcular": "",
                                "Valor": null,
                                "esPorcentaje": true,
                                "matPosicion": ""
                            }],
                        "stockDetallado" : [{
                                "CodAlmacen":"",
                                "CodCentro":"",
                                "CodLote":"",
                                "CodMaterial":"",
                                "DescAlmacen":"",
                                "DescCentro":"",
                                "DescDisp":"",
                                "DescMaterial":"",
                                "FechaStock":"",
                                "StockDisponible":null,
                                "StockLibre":null,
                                "ValorCaracteristica":""
                        }]
                    }]
            };
            var datalstAsesores = {
            };
            var datalstZipCodes = {
            };
            if (oEvent.getParameter("name") == "appDocVisualizar") {
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
                utilString.destruirFragments(this);
                utilString.cargarFragments(this);
                this.validProveedor();
                /////////Filtrado Combos dataIni//////////////////////////////////////////////////////////
                
                var arrayIni = [];
                var objIni = {};
                    var primero = window.dataIni.lstCPag.filter(function(el) {
                                         return el.Codigo == " ";
                    });
                    objIni.Codigo = primero[0].Codigo;
                    objIni.Descripcion = primero[0].Descripcion;
                    arrayIni.push(objIni);
                    var e000 = window.dataIni.lstCPag.filter(function(el) {
                                         return el.Codigo == "E000";
                    });
                    objIni = {};
                    objIni.Codigo = e000[0].Codigo;
                    objIni.Descripcion = e000[0].Descripcion;
                    arrayIni.push(objIni);
                    var td00 = window.dataIni.lstCPag.filter(function(el) {
                                         return el.Codigo == "TD00";
                    });
                    objIni = {};
                    objIni.Codigo = td00[0].Codigo;
                    objIni.Descripcion = td00[0].Descripcion;
                    arrayIni.push(objIni);
                    var tc00 = window.dataIni.lstCPag.filter(function(el) {
                                         return el.Codigo == "TC00";
                    });
                    objIni = {};
                    objIni.Codigo = tc00[0].Codigo;
                    objIni.Descripcion = tc00[0].Descripcion;
                    arrayIni.push(objIni);
                    var d000 = window.dataIni.lstCPag.filter(function(el) {
                                         return el.Codigo == "D000";
                    });
                    objIni = {};
                    objIni.Codigo = d000[0].Codigo;
                    objIni.Descripcion = d000[0].Descripcion;
                    arrayIni.push(objIni);
                    var h002 = window.dataIni.lstCPag.filter(function(el) {
                                         return el.Codigo == "H002";
                    });
                    objIni = {};
                    objIni.Codigo = h002[0].Codigo;
                    objIni.Descripcion = h002[0].Descripcion;
                    arrayIni.push(objIni);

                    var otros = window.dataIni.lstCPag.filter(function(el) {
                                         return el.Codigo != " " && el.Codigo != "E000" && el.Codigo != "TD00" && el.Codigo != "TC00" && el.Codigo != "D000" && el.Codigo != "H002";
                    });
                    for (var i = 0; i < otros.length; i++) {
                        objIni = {};
                        objIni.Codigo = otros[i].Codigo;
                        objIni.Descripcion = otros[i].Descripcion;
                        arrayIni.push(objIni);
                    }
                    window.dataIni.lstCPag = arrayIni;
                ////////////////////////////////////////////////////////////////////////////
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.tabDetailDefault();
                /////////////////////////////////////////////
                //var itemSeleccionado = this.getView().byId("listPanelDatos").getItems()[0];
                //this.getView().byId("listPanelDatos").setSelectedItem(itemSeleccionado,true);
                //this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));
                this.byId("SplitAppId").to(this.createId("DocProductosDetallado"));
                /////////////////////////////////////////////
                ///Inicio Boton Multiselect//////////
                /*this.btnSelectAllCerrados(false);*/
                /*this.btnSelectCerrados(false);
                this.getView().byId("btnMulti").setVisible(true);*/
                ///End Boton Multiselect/////////////
                this.btnSelectAllCerrados(false);
                this.getView().byId("btnSelectAll").setVisible(true);
                
                if(window.IsDocVisualizar==true){
                    this.getView().getModel().setProperty("/NumeroDocumentoReferencia", window.numeroDocumento);
                }
                this.listaMasterDatos(false);
                if(window.IsDocVisualizar==false){
                    this.onContinuarDlg_DialogDocVisualizar();
                    sap.ui.getCore().byId("dlg_DialogDocVisualizar").close();
                }else{
                    this.panelesNoSeleccionados();
                    sap.ui.getCore().byId("dlg_DialogDocVisualizar").open();
                }
                this.getView().getModel().refresh(true);
            var tipoCabecera = [];
            tipoCabecera.push({
                codigo: 1,
                descripcion: 'Datos de Clientes'
            });
            tipoCabecera.push({
                codigo: 2,
                descripcion: 'Interlocutores'
            });
            tipoCabecera.push({
                codigo: 3,
                descripcion: 'Observaciones'
            });
            this.getView().getModel().setProperty("/tipoCabeceraModel", tipoCabecera);
            this.getView().getModel().refresh();
            this.setDataInit(); 
            ///LocalStorage
                var tituloDocVisualizar = sessionStorage.tituloDocumentoDocVisualizar==undefined || sessionStorage.tituloDocumentoDocVisualizar=="undefined"? "":JSON.parse(sessionStorage.tituloDocumentoDocVisualizar);
                            if(tituloDocVisualizar==""){
                                sessionStorage.clear();
                            }else{
                                sap.ui.getCore().byId("dlg_DialogDocVisualizar").close();
                                //this.getView().getModel().setProperty("/layoutTxtUnidRendimiento",(sessionStorage.layoutTxtUnidRendimiento==undefined || sessionStorage.layoutTxtUnidRendimiento=="undefined")? "L12 M12 S12":JSON.parse(sessionStorage.layoutTxtUnidRendimiento));
                                //this.getView().getModel().setProperty("/validCamposTocetos",(sessionStorage.validCamposTocetos==undefined || sessionStorage.validCamposTocetos=="undefined")? false:JSON.parse(sessionStorage.validCamposTocetos));

                                this.getView().getModel().setProperty("/menuMaster",JSON.parse((sessionStorage.menuMaster==undefined)? "":sessionStorage.menuMaster));
                                this.getView().getModel().setProperty("/pedido",JSON.parse((sessionStorage.pedidoDocVisualizar==undefined)? "":sessionStorage.pedidoDocVisualizar));
                                this.getView().getModel().setProperty("/listaMaterial",JSON.parse((sessionStorage.listaMaterialDocVisualizar==undefined)? "":sessionStorage.listaMaterialDocVisualizar));
                                this.getView().getModel().setProperty("/interlocutores",JSON.parse((sessionStorage.interlocutoresDocVisualizar==undefined)? "":sessionStorage.interlocutoresDocVisualizar));
                                var dd = this.getView().getModel().getProperty("/listaMaterial");
                                this.getView().getModel().setProperty("/tituloDocumento",sessionStorage.tituloDocumentoDocVisualizar=="undefined"? "":JSON.parse(sessionStorage.tituloDocumentoDocVisualizar));
                                this.getView().getModel().setProperty("/NumeroDocumentoReferencia",JSON.parse((sessionStorage.NumeroDocumentoReferenciaDocVisualizar==undefined)? "":sessionStorage.NumeroDocumentoReferenciaDocVisualizar));
                                this.getView().getModel().setProperty("/listaLinea",JSON.parse((sessionStorage.listaLineaDocVisualizar==undefined)? "":sessionStorage.listaLineaDocVisualizar));
                                this.getView().getModel().setProperty("/listaMarca",JSON.parse((sessionStorage.listaMarcaDocVisualizar==undefined)? "":sessionStorage.listaMarcaDocVisualizar));
                                this.getView().getModel().setProperty("/listacaract",JSON.parse((sessionStorage.listacaractDocVisualizar==undefined)? "":sessionStorage.listacaractDocVisualizar));
                                this.getView().getModel().setProperty("/documentoNuevo",JSON.parse((sessionStorage.documentoNuevoDocVisualizar==undefined)? "":sessionStorage.documentoNuevoDocVisualizar));
                                
                                this.getView().getModel().setProperty("/observaciones",JSON.parse((sessionStorage.observacionesDocVisualizar==undefined)? "":sessionStorage.observacionesDocVisualizar));
                                
                                this.getView().getModel().setProperty("/cliente",JSON.parse((sessionStorage.clienteDocVisualizar==undefined)? "":sessionStorage.clienteDocVisualizar));
                                this.getView().getModel().setProperty("/clienteEventual",JSON.parse((sessionStorage.clienteEventualDocVisualizar==undefined)? "":sessionStorage.clienteEventualDocVisualizar));
                                this.getView().getModel().setProperty("/preguntas",JSON.parse((sessionStorage.preguntasDocVisualizar==undefined)? "":sessionStorage.preguntasDocVisualizar));
                                
                                this.getView().getModel().setProperty("/busquedaCliente",JSON.parse((sessionStorage.busquedaClienteDocVisualizar==undefined)? "":sessionStorage.busquedaClienteDocVisualizar));
                                this.getView().getModel().setProperty("/planFacturacion",JSON.parse((sessionStorage.planFacturacionDocVisualizar==undefined)? "":sessionStorage.planFacturacionDocVisualizar));
                                this.getView().getModel().setProperty("/visita",JSON.parse((sessionStorage.visitaDocVisualizar==undefined)? "":sessionStorage.visitaDocVisualizar));
                                
                                this.getView().getModel().setProperty("/lstGrupoForAnt",(sessionStorage.lstGrupoForAntDocVisualizar==undefined || sessionStorage.lstGrupoForAntDocVisualizar=="undefined")? "":JSON.parse(sessionStorage.lstGrupoForAntDocVisualizar));
                                this.getView().getModel().setProperty("/lstGrupoFor",(sessionStorage.lstGrupoForDocVisualizar==undefined || sessionStorage.lstGrupoForDocVisualizar=="undefined")? "":JSON.parse(sessionStorage.lstGrupoForDocVisualizar));
                                this.getView().getModel().setProperty("/lstTipoFor",(sessionStorage.lstTipoForDocVisualizar==undefined || sessionStorage.lstTipoForDocVisualizar=="undefined")? "":JSON.parse(sessionStorage.lstTipoForDocVisualizar));
                                
                                //this.getView().getModel().setProperty("/validCmbOpcionAmbiente",JSON.parse((sessionStorage.validCmbOpcionAmbiente==undefined)? "":sessionStorage.validCmbOpcionAmbiente));
                                
                                this.getView().byId("listPanelDatos").setVisible(true);

                                this.byId("SplitAppId").to(this.createId(sessionStorage.PageSelect));
                                this.getView().byId("txt_pago_pesoTotal").setValue(this.getView().getModel().getProperty("/pedido/PesoTotal")+" "+"kg");
                                //this.getView().byId("com_tipoForecast_proyectoVisita").setSelectedKey(" ");
                            }
                //
            }else{
                utilString.destruirFragments(this);
            }
            
        },
        btnSelectAllCerrados:function(valor){
            this.getView().byId("btnSelectAll").setVisible(valor);
            this.getView().byId("btnSelectNothing").setVisible(valor);
        },
        sessionStorageDocVisualizar: function(){
            sessionStorage.setItem("tituloDocumentoDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/tituloDocumento"))));
            sessionStorage.setItem("NumeroDocumentoReferenciaDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/NumeroDocumentoReferencia"))));
            sessionStorage.setItem("listaLineaDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/listaLinea"))));
            sessionStorage.setItem("listaMarcaDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/listaMarca"))));
            sessionStorage.setItem("listacaractDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/listacaract"))));
            sessionStorage.setItem("documentoNuevoDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/documentoNuevo"))));
            sessionStorage.setItem("pedidoDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/pedido"))));
            sessionStorage.setItem("observacionesDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/observaciones"))));
            sessionStorage.setItem("interlocutoresDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/interlocutores"))));
            sessionStorage.setItem("clienteDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/cliente"))));
            sessionStorage.setItem("clienteEventualDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/clienteEventual"))));
            sessionStorage.setItem("preguntasDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/preguntas"))));
            sessionStorage.setItem("listaMaterialDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/listaMaterial"))));
            sessionStorage.setItem("busquedaClienteDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/busquedaCliente"))));
            sessionStorage.setItem("planFacturacionDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/planFacturacion"))));
            sessionStorage.setItem("visitaDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/visita"))));
            sessionStorage.setItem("lstGrupoForAntDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/lstGrupoForAnt"))));
            sessionStorage.setItem("lstGrupoForDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/lstGrupoFor"))));
            sessionStorage.setItem("lstTipoForDocVisualizar",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/lstTipoFor"))));
            
            sessionStorage.setItem("validCmbOpcionAmbiente",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/validCmbOpcionAmbiente"))));
            sessionStorage.setItem("menuMaster",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/menuMaster"))));
            sessionStorage.setItem("layoutTxtUnidRendimiento",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/layoutTxtUnidRendimiento"))));
            sessionStorage.setItem("validCamposTocetos",JSON.stringify(utilString.convertirTiposUndefined(this.getView().getModel().getProperty("/validCamposTocetos"))));
        },
        setDataInit: function () {
            //if(sessionStorage.listaMaterialDocModificar==undefined){
                this.getView().getModel().setProperty("/listaMaterial", null);
            //} 
            //Lista Respuestas de Lista Preguntas
            //Tipo de cliente
            this.getView().getModel().setProperty("/listaRespuestas", dataIni.lstPreguntas[0].listaResp);
            //Tipo de construcción
            this.getView().getModel().setProperty("/listaRespuestas1", dataIni.lstPreguntas[1].listaResp);
            //Tipo de proyecto - Residencial
            this.getView().getModel().setProperty("/listaRespuestas2", dataIni.lstPreguntas[2].listaResp);
            //Tipo de proyecto - Institucional
            this.getView().getModel().setProperty("/listaRespuestas3", dataIni.lstPreguntas[3].listaResp);
            //Presupuesto para el proyecto
            this.getView().getModel().setProperty("/listaRespuestas4", dataIni.lstPreguntas[4].listaResp);
            //Ambiente 1
            this.getView().getModel().setProperty("/listaRespuestas5", dataIni.lstPreguntas[5].listaResp);
            //Estilo 1
            this.getView().getModel().setProperty("/listaRespuestas6", dataIni.lstPreguntas[6].listaResp);
            //Ambiente 2
            this.getView().getModel().setProperty("/listaRespuestas7", dataIni.lstPreguntas[7].listaResp);
            //Estilo 2
            this.getView().getModel().setProperty("/listaRespuestas8", dataIni.lstPreguntas[8].listaResp);
            //Ambiente 3
            this.getView().getModel().setProperty("/listaRespuestas9", dataIni.lstPreguntas[9].listaResp);
            //Estilo 3
            this.getView().getModel().setProperty("/listaRespuestas10", dataIni.lstPreguntas[10].listaResp);
        },
        validProveedor:function(){
            var  usu_ser = window.dataIni.person.UsuarioServ;
            if(usu_ser=="X")
            {
                this.getView().byId("txtDetNoProveedor").setVisible(false);
                this.getView().byId("txtDetProveedor").setVisible(true);
                sap.ui.getCore().byId("txtDetBusMatNoProveedor").setVisible(false);
                sap.ui.getCore().byId("txtDetBusMatProveedor").setVisible(true);

                this.getView().byId("txt_Total").setVisible(false);
                this.getView().byId("txt_TotalDet").setVisible(false);
                this.getView().byId("txt_Dscto").setVisible(false);
                this.getView().byId("txt_DsctoDet").setVisible(false);

                this.getView().byId("txtPreUnitCIGV").setVisible(false);
                this.getView().byId("tabDetalleMaterialDescuento").setVisible(false);
                this.getView().byId("txtDetDescuentos").setVisible(false);
                this.getView().byId("txtDetSubTotal").setVisible(false);
            }
            else
            {
                this.getView().byId("txtDetNoProveedor").setVisible(true);
                this.getView().byId("txtDetProveedor").setVisible(false);
                sap.ui.getCore().byId("txtDetBusMatNoProveedor").setVisible(true);
                sap.ui.getCore().byId("txtDetBusMatProveedor").setVisible(false);

                this.getView().byId("txt_Total").setVisible(true);
                this.getView().byId("txt_TotalDet").setVisible(true);
                this.getView().byId("txt_Dscto").setVisible(true);
                this.getView().byId("txt_DsctoDet").setVisible(true);

                this.getView().byId("txtPreUnitCIGV").setVisible(true);
                this.getView().byId("tabDetalleMaterialDescuento").setVisible(true);
                this.getView().byId("txtDetDescuentos").setVisible(true);
                this.getView().byId("txtDetSubTotal").setVisible(true);
            }
            //Usuario Proveedor:
        },
        creacionMaster:function(tipoDocCodigo){
            
                    if (tipoDocCodigo == 'Z004') {
                        this.getView().getModel().setProperty("/menuMaster/listPanelDatos",true);
                        this.getView().getModel().setProperty("/menuMaster/listPanelFacturacion",true);
                        /*thisComponent.remove('tab4');
                        thisComponent.remove('tab5');
                        thisComponent.remove('tab6');
                        thisComponent.remove('tab7');*/
                    }
                    if (tipoDocCodigo == 'Z036') {
                        this.getView().getModel().setProperty("/menuMaster/listPanelDatos",true);
                        this.getView().getModel().setProperty("/menuMaster/listPanelDatosVisita",true);
                        /*thisComponent.remove('tab3');
                        thisComponent.remove('tab5');
                        thisComponent.remove('tab6');
                        thisComponent.remove('tab7');*/
                    }
                    if (tipoDocCodigo == 'Z037') {
                        this.getView().getModel().setProperty("/menuMaster/listPanelDatos",true);
                        this.getView().getModel().setProperty("/menuMaster/listPanelPedidosAsociados",true);
                        this.getView().getModel().setProperty("/menuMaster/listPanelDatosInstalacion",true);
                        /*thisComponent.remove('tab3');
                        thisComponent.remove('tab4');
                        thisComponent.remove('tab7');*/
                    }

                    if (tipoDocCodigo == 'Z035') {
                        this.getView().getModel().setProperty("/menuMaster/listPanelDatos",true);
                        this.getView().getModel().setProperty("/menuMaster/listPanelDatosServicio",true);
                        /*thisComponent.remove('tab3');
                        thisComponent.remove('tab5');
                        thisComponent.remove('tab6');
                        thisComponent.remove('tab4');*/
                    }
                    if (tipoDocCodigo != 'Z004' && tipoDocCodigo != 'Z035' && tipoDocCodigo != 'Z036' && tipoDocCodigo != 'Z037') {
                        this.getView().getModel().setProperty("/menuMaster/listPanelDatos",true);
                        /*thisComponent.remove('tab3');
                        thisComponent.remove('tab4');
                        thisComponent.remove('tab5');
                        thisComponent.remove('tab6');
                        thisComponent.remove('tab7');*/
                    }
        }, 
        //Continuar Dialog Visualizar
        onContinuarDlg_DialogDocVisualizar: function (oEvent) {
            if(window.IsDocVisualizar==false){
                var numDocumento = window.numeroDocumento;
            }else{
                var numDocumento = sap.ui.getCore().byId("txt_numero_documento").getValue();
            }
            
            if(numDocumento!=""){
            }else{
                return MessageToast.show("Ingresar número de Documento");
            }
            var self = this;


            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function(){
            documentosServices.visualizarDocumento("","ver", numDocumento,function(result) {
                sap.ui.core.BusyIndicator.hide();
                try{
        if (result.c === "s") {
            if (result.data.success) {
                var data = result.data;
                var pedidoSer = result.data.objPedido;
                window.numeroDocumento = "";
                self.getView().getModel().setProperty("/tituloDocumento", "Visualizando Documento "+pedidoSer.CodTipoDoc+" - Nro.: "+parseInt(numDocumento));
                self.getView().getModel().setProperty("/clienteEventual/nombreCliente",pedidoSer.Interlocutores[0].Cliente.Descripcion);
                self.getView().getModel().setProperty("/clienteEventual/codigoCliente",pedidoSer.Interlocutores[0].Cliente.Codigo);
                self.getView().getModel().refresh();
                self.setDataProyecto(data.lstGrupoFor, data.lstTipoFor);
                self.obtenerPedido(data.objPedido);
                self.obtenerObservaciones(data.objPedido.Textos);
                utilDocumentoDocModificar.obtenerInterlocutores(self, data.objPedido.Interlocutores ,data);
                //self.obtenerInterlocutores(data);
                self.obtenerMateriales(self,data.objPedido.CodTipoDoc,data.objPedido.Detalle);
                //self.agregarDetalleMateriales(pedidoSer.Detalle);
                self.getView().getModel().setProperty("/pedido/enabled", false);
                self.getView().getModel().setProperty("/pedido/validInterlocutores", false);
                self.getView().byId("com_tipoVisita_proyectoVisita").setEnabled(false)
                self.getView().getModel().setProperty("/pedido/enabledBtnCopiar", false);
                self.getView().getModel().setProperty("/pedido/enabledBtnBuscar", false);
                self.getView().getModel().setProperty("/pedido/enabledBtnGuardar", false);
                ///Inicio Agregar ListaMaster///////////////////////////////////
             /*tab1        listPanelDatos
             tab3        listPanelFacturacion
             tab4        listPanelDatosVisita
             tab6        listPanelDatosInstalacion
             tab5        listPanelPedidosAsociados
             tab7        listPanelDatosServicio*/
                    var tipoDocCodigo = result.data.objPedido.CodTipoDoc;
                    console.log("tipo Doc//////////");
                    console.log(tipoDocCodigo);
                    self.creacionMaster(tipoDocCodigo);

            ///End Agregar ListaMaster//////////////////////////////////////
            self.getView().byId("txt_pago_pesoTotal").setValue(pedidoSer.PesoTotal+" "+"kg");
            sap.ui.getCore().byId("dlg_DialogDocVisualizar").close();
            self.sessionStorageDocVisualizar();
            } else {
                sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
            }
            } else {
                            sap.m.MessageToast.show(result.m, {
                                duration: 3000
                            });
                            sap.ui.core.BusyIndicator.hide();
                        }
            }catch(ex){
                if(result.status!=0){
                    //sap.m.MessageToast.show("El documento no existe", {duration: 3000});
                    }
                self.getView().getModel().setProperty("/tituloDocumento", "");
                sap.ui.getCore().byId("dlg_DialogDocVisualizar").open();
                sap.ui.core.BusyIndicator.hide();}
            });
},1000);
        },
        setDataProyecto: function (lstGrupoFor, lstTipoFor) {
            this.getView().getModel().setProperty("/lstGrupoFor", lstGrupoFor);
            this.getView().getModel().setProperty("/lstTipoFor", lstTipoFor);
            this.getView().getModel().refresh();
        },
        obtenerPedido: function (pedido) {
            var fechFactura = moment(pedido.FechaFacturacion).format('DD/MM/YYYY');
            var fechPedido = moment(pedido.Fecha).format('DD/MM/YYYY');
            var fechValidez = moment(pedido.FechaValidez).format('DD/MM/YYYY');
            var fechEntrega = moment(pedido.FechaEntrega).format('DD/MM/YYYY');
            var fechVisita = moment(pedido.FechaVisita).format('DD/MM/YYYY');
            this.getView().getModel().setProperty("/pedido", pedido);
            this.getView().getModel().setProperty("/pedido/FechaFacturacion", fechFactura);
            this.getView().getModel().setProperty("/pedido/Fecha", fechPedido);
            this.getView().getModel().setProperty("/pedido/FechaValidez", fechValidez);
            this.getView().getModel().setProperty("/pedido/FechaEntrega", fechEntrega);
            this.getView().getModel().setProperty("/pedido/FechaVisita", fechVisita);
        },
        obtenerObservaciones: function (observaciones) {
            for (var indice in observaciones) {
                this.getView().getModel().setProperty("/observaciones/" + observaciones[indice].CodTexto, observaciones[indice]);
            }
        },
        obtenerInterlocutores: function (data) {
            var clienteSer = data.datoReniec[0];
            ////Hay interlocutores con FECNAC = null o undefined//////////////////////
            if(clienteSer.FECNAC!=null){
                    var fechNacimiento = moment(clienteSer.FECNAC).format('DD/MM/YYYY');
            }else{
                var fechNacimiento = clienteSer.FECNAC;
            }
            //////////////////////////////////////////////////////////////////////////
            this.getView().getModel().setProperty("/cliente", clienteSer);
            this.getView().getModel().setProperty("/cliente/FECNAC", fechNacimiento);
            var interlocutores = data.objPedido.Interlocutores;
            for (var indice in interlocutores) {
                this.getView().getModel().setProperty("/interlocutores/" + interlocutores[indice].Funcion, interlocutores[indice]);
            }
            this.getView().getModel().setProperty("/profesionales/CodProfesional", data.CodProfesional);
            this.getView().getModel().setProperty("/profesionales/NomProfesional", data.NomProfesional);
            this.getView().getModel().setProperty("/profesionales/CodProfesional2", data.CodProfesional2);
            this.getView().getModel().setProperty("/profesionales/NomProfesional2", data.NomProfesional2);
            var clienDatosAdic = data.listCliPregResp;
            for (var indice in clienDatosAdic) {
                this.getView().getModel().setProperty("/preguntas/" + clienDatosAdic[indice].CODP, clienDatosAdic[indice]);
            }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
                var interAGCliente = this.getView().getModel().getProperty("/interlocutores/AG/Cliente");
                this.getView().getModel().setProperty("/cliente/Ruc", interAGCliente.Ruc); 
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
        },
        obtenerMateriales: function (self, CodTipoDoc, materiales) {
            var listaMateriales = new Array();
            for (var indice in materiales) {
                var material = materiales[indice];
                var fechCantidad = moment(material.FechaCantConf).format('DD/MM/YYYY');
                material.FechaCantConf = fechCantidad; 

                ////Inicio Ultima Posicion//////////////
                sessionStorage.setItem("ultimaPosCortoMaterialPedOriginal", utilString.convertStringSumar(material.PosicionCorto,10) );
                sessionStorage.setItem("ultimaPosMaterialPedOriginal",utilString.pad( utilString.convertStringSumar(material.PosicionCorto,10), 6 ));
                ////End Ultima Posicion////////////////
                if(material.CodGrupoMat != null) {
                    //material
                    if(material.CodGrupoMat == "") {material.CodGrupoMat = " ";}
                    else {
                        var ambientes = dataIni.lstPreguntas[5].listaResp;
                        var grupMaterial = jQuery.grep(ambientes, function(item, i){ // just use arr
                          return (item.Codigo == material.CodGrupoMat) ;
                        });
                        material.DesGrupoMat = grupMaterial[0].Descripcion;
                    }
                    if (CodTipoDoc == "Z025") { material.PrecioUnitario = material.PrecioSinIGV; }
                    material.Diferencia.Denominacion = " Mat.Diferencia";
                    material.PreZP08.Denominacion = " Pr.Srv.Transp.Manual";
                    //descuentos
                    var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                        {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
                    var descPrincipal = this.obtenerDescuento(material, listaPrincipal);
                    var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                        {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}, {"codigoSer": "DsctoAdicionalZD13"}, {"codigoSer": "Precio"}];
                    var descOtros = this.obtenerDescuento(material, listaOtros);
                    material.DescuentoPrincipal = descPrincipal;
                    material.DescuentoOtros = descOtros;
                    //valor descuento         
                    material.Vdscto = this.obtenerValorDescuento(material);

                    

                    //repartos                   
                    for(var indice in material.Repartos) {
                        var reparto = material.Repartos[indice];
                        var fechaEntrega =  moment(reparto.FechaEntrega).format('DD/MM/YYYY');
                        reparto.FechaEntrega = fechaEntrega;
                        reparto.FechaEntregaConf = fechaEntrega;
                        reparto.matPosicion = material.PosicionCorto;
                    }

                    //////Inicio Stock////////////////////////////////////////////////////////
                    
            //////End Stock////////////////////////////////////////////////////////
                //Inicio Agregar mas detalles al Material/////////////
                            material.EsFlete = material.Material.EsFlete;
                            material.EsEstiba = material.Material.EsEstiba;
                            material.EspecialServ = material.Material.EspecialServ;
                            material.Tipo = material.Material.Tipo;
                            material.TieneServ = material.Material.TieneServ;
                            material.PrecioUnit = material.Material.PrecioUnit;
                            material.Stock = material.Material.Stock;
                            material.DescMovil = material.Material.DescMovil;
                //End Agregar mas detalles al Material///////////////
                    listaMateriales.push(material);
                }
                ////Materiales de Servicio material.CodGrupoMat=null////////////////////////////////////////////////////////////////
                if(CodTipoDoc=="ZO02" || CodTipoDoc=="Z035" || CodTipoDoc=="Z036" || CodTipoDoc=="Z037"){
                if(material.CodGrupoMat == null) {
                    //material
                    if(material.CodGrupoMat == "") {material.CodGrupoMat = " ";}
                    else {
                        var ambientes = dataIni.lstPreguntas[5].listaResp;
                        var grupMaterial = jQuery.grep(ambientes, function(item, i){ // just use arr
                          return (item.Codigo == material.CodGrupoMat) ;
                        });
                        if(grupMaterial.length>0){
                        material.DesGrupoMat = grupMaterial[0].Descripcion;
                        }
                    }
                    if (CodTipoDoc == "Z025") { material.PrecioUnitario = material.PrecioSinIGV; }
                    material.Diferencia.Denominacion = " Mat.Diferencia";
                    material.PreZP08.Denominacion = " Pr.Srv.Transp.Manual";
                    //descuentos
                    var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                        {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
                    var descPrincipal = this.obtenerDescuento(material, listaPrincipal);
                    var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                        {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}, {"codigoSer": "DsctoAdicionalZD13"}, {"codigoSer": "Precio"}];
                    var descOtros = this.obtenerDescuento(material, listaOtros);
                    material.DescuentoPrincipal = descPrincipal;
                    material.DescuentoOtros = descOtros;
                    //valor descuento         
                    material.Vdscto = this.obtenerValorDescuento(material);

                    

                    //repartos                   
                    for(var indice in material.Repartos) {
                        var reparto = material.Repartos[indice];
                        var fechaEntrega =  moment(reparto.FechaEntrega).format('DD/MM/YYYY');
                        reparto.FechaEntrega = fechaEntrega;
                        reparto.FechaEntregaConf = fechaEntrega;
                        reparto.matPosicion = material.PosicionCorto;
                    }
            //////End Stock////////////////////////////////////////////////////////
                //Inicio Agregar mas detalles al Material/////////////
                            material.EsFlete = material.Material.EsFlete;
                            material.EsEstiba = material.Material.EsEstiba;
                            material.EspecialServ = material.Material.EspecialServ;
                            material.Tipo = material.Material.Tipo;
                            material.TieneServ = material.Material.TieneServ;
                            material.PrecioUnit = material.Material.PrecioUnit;
                            material.Stock = material.Material.Stock;
                            material.DescMovil = material.Material.DescMovil;
                //End Agregar mas detalles al Material///////////////
                    listaMateriales.push(material);
                }
                var tipoFore = self.getView().getModel().getProperty("/pedido/TipoForecast");
                self.getView().getModel().setProperty("/pedido/TipoForecast",(tipoFore !="" )? (tipoFore != undefined) ? tipoFore: "" : "" );

                }
                
                self.getView().getModel().setProperty("/listaMaterial", listaMateriales);
            }
        },
        obtenerDescuento: function (material, descuentos) {
            var listaDescuento = [];
            for (var indice in descuentos) {
                material[descuentos[indice].codigoSer].matPosicion = material.PosicionCorto;
                if(descuentos[indice].codigoSer == "ZP02") {
                    if(material.Precio.Condicion == "ZP02" && material.Precio.Valor != 0){}
                    else{ 
                        material[descuentos[indice].codigoSer].ImpAnterior = Math.abs(material[descuentos[indice].codigoSer].Importe);//21-05-2018 Roy flag agregar Descuentos en cero
                        listaDescuento.push(material[descuentos[indice].codigoSer]); 
                    }
                } else {
                    material[descuentos[indice].codigoSer].ImpAnterior = Math.abs(material[descuentos[indice].codigoSer].Importe);//21-05-2018 Roy flag agregar Descuentos en cero
                    listaDescuento.push(material[descuentos[indice].codigoSer]);
                }
            }
            return listaDescuento;
        },
        obtenerValorDescuento: function (material) {
            var acumulado = 0;
            var listaDescuento = material.DescuentoPrincipal.concat(material.DescuentoOtros);
          //  listaDescuento.concat(material.DescuentoOtros);
            for(var indice in listaDescuento) {
                var descuento = listaDescuento[indice];
                var tipo = descuento.Condicion; 
                var condicion = tipo.substring(0, 2);
                if (descuento.Importe != 0 && condicion == "ZD" && tipo != "ZD03"){
                    var importe = descuento.Importe;
                    if (importe < 0) { importe = importe * -1; }
                    acumulado = acumulado + importe; 
                }
            }
            return acumulado;
        },  
        onMasterProductoSeleccionarMaterial: function (oEvent) {
            this.onSelectAll(false);
            var item =  oEvent.getSource().getBindingContext().getPath();
            var numb = item.match(/\d/g);
            numb = numb.join("");
            var firstItem = this.getView().byId("listaMasterMateriales").getItems()[numb]; 
                            this.getView().byId("listaMasterMateriales").setSelectedItem(firstItem,true);
        
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
            this.getView().byId("tabDetalleProducto").setSelectedKey("filterDetalleProducto1");
            var material = this.getView().byId("listaMasterMateriales").getSelectedItem().getBindingContext().getObject();
            var materialDet = jQuery.extend({}, material);
            materialDet.path = numb;
            this.getView().getModel().setProperty("/material", materialDet);
            this.getView().getModel().refresh();
            console.log(this.getView().getModel().getProperty("/material"));
            
        },
        onSelectAll:function(valor){
            //this.onMultiSelect();
                 var itemSeleccionado = this.getView().byId("listaMasterMateriales").getItems();
                 for (var i = 0; i < itemSeleccionado.length; i++) {
                        this.getView().byId("listaMasterMateriales").setSelectedItem(itemSeleccionado[i],valor);
                        itemSeleccionado[i].setSelected(valor);
                 }
        },
        obtonerDescuento: function (material, descuentos) {
            var listaDescuento = [];
            for (var indice in descuentos) {
                listaDescuento.push(material[descuentos[indice].codigoSer]);
            }
            return listaDescuento;
        },
        onOpenRepartoDetail: function (oEvent) {
            this.getView().byId("dlg_DialogDocReparto").open();
            var material = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            var fechaEntrega = moment(material.FechaEntrega).format('DD/MM/YYYY');
            this.getView().getModel().setProperty("/repartoDetail", material);
            this.getView().getModel().setProperty("/repartoDetail/FechaEntrega", fechaEntrega);
        },
        onCloseRepartoDetail: function (oEvent) {
            this.getView().byId("dlg_DialogDocReparto").close();
        },
        onShowHello: function () {
            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },
        //Boton Home
        goHome: function () {
            utilString.destruirFragments(this);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        //Boton Master Datos
        onDocNuevoMasterDatos: function (oEvent) {
            this.getView().byId("buttonMasterDatos").setSelectedKey("datos");/////
            this.getView().byId("buttonMasterProductos").setSelectedKey("productos");/////
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoDatos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));
        },
        //Boton Master Producto
        onDocNuevoMasterProductos: function (oEvent) {
            ///Inicio Quitar Seleccion Lista Master Datos///
                this.panelesNoSeleccionados();
            ///End Lista Master Datos///////////////////////
            /*this.getView().byId("buttonMasterDatos").setSelectedKey("datos");/////
            this.getView().byId("buttonMasterProductos").setSelectedKey("productos");////
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductos"));*/
            this.byId("SplitAppId").to(this.createId("DocProductosDetallado"));
        },
        panelesNoSeleccionados:function(){
                var datosItem = this.getView().byId("listPanelDatos").getSelectedItem();
                this.getView().byId("listPanelDatos").setSelectedItem(datosItem,false);
                var facturaItem = this.getView().byId("listPanelFacturacion").getSelectedItem();
                this.getView().byId("listPanelFacturacion").setSelectedItem(facturaItem,false);
                var visitaItem = this.getView().byId("listPanelDatosVisita").getSelectedItem();
                this.getView().byId("listPanelDatosVisita").setSelectedItem(visitaItem,false);
                var instalacionItem = this.getView().byId("listPanelDatosInstalacion").getSelectedItem();
                this.getView().byId("listPanelDatosInstalacion").setSelectedItem(instalacionItem,false);
                var pedidosItem = this.getView().byId("listPanelPedidosAsociados").getSelectedItem();
                this.getView().byId("listPanelPedidosAsociados").setSelectedItem(pedidosItem,false);
                var servicioItem = this.getView().byId("listPanelDatosServicio").getSelectedItem();
                this.getView().byId("listPanelDatosServicio").setSelectedItem(servicioItem,false);
        },  
        /////Inicio Nuevo Master Datos///////////////////////////
        listaMasterDatos:function(valor){
            this.getView().getModel().setProperty("/menuMaster/listPanelDatos",valor);
            this.getView().getModel().setProperty("/menuMaster/listPanelFacturacion",valor);
            this.getView().getModel().setProperty("/menuMaster/listPanelDatosVisita",valor);
            this.getView().getModel().setProperty("/menuMaster/listPanelDatosInstalacion",valor);
            this.getView().getModel().setProperty("/menuMaster/listPanelPedidosAsociados",valor);
            this.getView().getModel().setProperty("/menuMaster/listPanelDatosServicio",valor);
        },
        /////End Nuevo Master Datos//////////////////////////////
        ////Inicio Seleccionar Item Master Datos///////////////////////////////////
        selectMasterDetail:function(oEvt){
            var datoMaster = oEvt.getSource().getSelectedItem().getTitle();
            console.log(datoMaster);
            if(datoMaster=="Datos Cliente"){
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));
                sessionStorage.setItem("PageSelect","pagDocNuevo_datos_detail1");
            }
            if(datoMaster=="Interlocutores"){
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail2"));
                sessionStorage.setItem("PageSelect","pagDocNuevo_datos_detail2");
            }
            if(datoMaster=="Observaciones"){
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail3"));
                sessionStorage.setItem("PageSelect","pagDocNuevo_datos_detail3");
            }
            if(datoMaster=="Plan de Facturación"){
                this.byId("SplitAppId").to(this.createId("pagDocPlan_facturacion_detail1"));
                sessionStorage.setItem("PageSelect","pagDocPlan_facturacion_detail1");
            }          
            if(datoMaster=="Datos de Visita"){
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail4"));
                sessionStorage.setItem("PageSelect","pagDocNuevo_datos_detail4");
            }
            if(datoMaster=="Datos del Servicio"){
                this.byId("SplitAppId").to(this.createId("pagDocDatos_servicio_detail1"));
                sessionStorage.setItem("PageSelect","pagDocDatos_servicio_detail1");
            }
            if(datoMaster=="Datos de Instalación"){
                this.byId("SplitAppId").to(this.createId("DocInstalacion_datosInstalacion"));
                sessionStorage.setItem("PageSelect","DocInstalacion_datosInstalacion");
            }
            if(datoMaster=="Pedidos Asociados"){
                this.byId("SplitAppId").to(this.createId("DocInstalacion_pedidosAsociados"));
                sessionStorage.setItem("PageSelect","DocInstalacion_pedidosAsociados");
            }            

            this.seleccionarItemMenu(datoMaster); 
            this.tabDetailDefault();
        },
        seleccionarItemMenu: function(item) {
            var datosItem = this.getView().byId("listPanelDatos").getSelectedItem();
            if(datosItem != null && datosItem.getTitle() != item) {
                this.getView().byId("listPanelDatos").setSelectedItem(datosItem,false);
            }
            var facturaItem = this.getView().byId("listPanelFacturacion").getSelectedItem();
            if(facturaItem != null && facturaItem.getTitle() != item) {
                this.getView().byId("listPanelFacturacion").setSelectedItem(facturaItem,false);
            }
            var visitaItem = this.getView().byId("listPanelDatosVisita").getSelectedItem();
            if(visitaItem != null && visitaItem.getTitle() != item) {
                this.getView().byId("listPanelDatosVisita").setSelectedItem(visitaItem,false);
            }
            var instalacionItem = this.getView().byId("listPanelDatosInstalacion").getSelectedItem();
            if(instalacionItem != null && instalacionItem.getTitle() != item) {
                this.getView().byId("listPanelDatosInstalacion").setSelectedItem(instalacionItem,false);
            }    
            var pedidosItem = this.getView().byId("listPanelPedidosAsociados").getSelectedItem();
            if(pedidosItem != null && pedidosItem.getTitle() != item) {
                this.getView().byId("listPanelPedidosAsociados").setSelectedItem(pedidosItem,false);
            } 
            var servicioItem = this.getView().byId("listPanelDatosServicio").getSelectedItem();
            if(servicioItem != null && servicioItem.getTitle() != item) {
                this.getView().byId("listPanelDatosServicio").setSelectedItem(servicioItem,false);
            }                                                         
        },
        /****04-12-2017*****************************************/
        tabDetailDefault:function(){
            this.getView().byId("tabCliente").setSelectedKey("filterPago");
            this.getView().byId("tabInterlocutores").setSelectedKey("filterSolicitante");
            //this.getView().byId("tabObservaciones").setSelectedKey("filterAtencion");

            this.getView().byId("SplitAppId").setMode("ShowHideMode");
            this.getView().byId("SplitAppId").setMode("HideMode");

        },
        /*******************************************************/        

    });
});
