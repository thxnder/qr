sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/Button',
    'sap/m/Dialog',    
    'sap/m/Text',    
    "sap/m/MessageToast",
    'sap/m/GroupHeaderListItem',         
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    'jquery.sap.global',  
    "pe/com/seidor/sap/decor/ventas/util/utilString",   
    "pe/com/seidor/sap/decor/ventas/util/utilFunction",   
    "pe/com/seidor/sap/decor/ventas/util/utilDocumentoDocModificar",    
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
    "pe/com/seidor/sap/decor/ventas/services/stockServices",
    "pe/com/seidor/sap/decor/ventas/services/flujoDocumentoServices"
], function (Controller, Button, Dialog, Text, MessageToast, GroupHeaderListItem, UIComponent, JSONModel, jQuery, utilString, utilFunction, utilDocumentoDocModificar, clienteServices, materialServices, documentosServices, stockServices,flujoDocumentoServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocModificar", {
        getGroupHeader: function (oGroup){
            return new GroupHeaderListItem( {
                title: oGroup.key,
                upperCase: false
            } );
        },    
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            //utilString.destruirFragments(this);
            //utilString.cargarFragments(this);
            //this.validProveedor();
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            var oData = {
                "codAmbiente":"",
                "opcAmbiente":"",
                "validCmbOpcionAmbiente":true,
                "OcultarCampos": false,
                "OcultarCertificado": window.dataIni.person.CanalDist=='10' ? true: false,
                "btnStock":true,
                "ocultarTipoVisita":false,
                "menuMaster":{
                    listPanelDatos:true,
                    listPanelFacturacion:true,
                    listPanelDatosVisita:true,
                    listPanelDatosInstalacion:true,
                    listPanelPedidosAsociados:true,
                    listPanelDatosServicio:true
                },
                "valueProfesional":true,
                "visibleCombTipoVisita":false,
                //////Inicio Pedidos Multiples 15-01-2017////////////
                "listaPedidosMultiples":[
                {"codigo":"Z001", "descripcion":"Pedido Mostrador", "numPedido":""},
                {"codigo":"Z034", "descripcion":"Pedido Vta. Tránsito", "numPedido":""},
                {"codigo":"Z004", "descripcion":"Pedido Vta. Calzada", "numPedido":""}
                ],
                "listaMaterialPedMulti":[],
                //////End Pedidos Multiples 15-01-2017///////////////
                //////Observaciones//////////////////////////////////
                "ObsAtencion":window.dataIni.person.CanalDist=='10' ? true: (window.dataIni.person.CanalDist== '40'? true:true ),
                "ObsRefDire":window.dataIni.person.CanalDist=='10' ? true: (window.dataIni.person.CanalDist== '40'? true:true ),
                "ObsAdm":window.dataIni.person.CanalDist=='10' ? false: (window.dataIni.person.CanalDist== '40'? false:true ),
                "ObsRefFac":window.dataIni.person.CanalDist=='10' ? false: (window.dataIni.person.CanalDist== '40'? false:true ),
                /////////////////////////////////////////////////////
                /////Grupo Forecast//////////////////////////////////
                "GrupoForeAction": window.dataIni.person.CanalDist=='10' ? false: (window.dataIni.person.CanalDist== '20'? false:true ),
                "TipoForeAction": window.dataIni.person.CanalDist=='10' ? true: (window.dataIni.person.CanalDist== '20'? true:true ),
                ////////////////////////////////////////////////////
                //////Inicio Roy Tipo Documento//////////////////////
                "tipoDocumento":"",
                "NumeroDocumentoReferencia":"",
                "listaLinea":[{
                    "Codigo": "",
                    "Descripcion": ""
                }],
                
                "listaMarca":[{
                    "Codigo": "",
                    "Descripcion": ""
                }],

                "listacaract":{},
                "documentoNuevo":{
                    "Codigo": "",
                    "Descripcion": "",
                    "Flag1": "",
                    "Flag2": "",
                    "Flag3": "",
                    "Flag4": ""
                },
                "datosInstalacion":{
                        "textoContacto":"",
                        "datosAdicionalesCliente":"",
                        "telefonos":"",
                        "descripcionServInstalacion":""
                },
                //////End Roy Tipo Documento//////////////////////
                "pedido": {
                    "validInterlocutores":true,
                    "enabled": true,
                    "enabledBtnGuardar": true,
                    "enabledBtnCopiar": true,
                    "enabledBtnBuscar": true,
                    "enabledFechaVisita":false,
                    "id": "",
                    "CodTipoDoc": "",
                    "CodTipoDocAnt": "",
                    "DocOriginal": "",
                    "Referencia": "",  
                    "OrgVentas": "",
                    "CanalDist": "",
                    "CodOficina": "",
                    "CodGrupoVend": "",
                    "CondPago": "",
                    "CodigoBanco": "",
                    "BloqueoEntrega": "",
                    "BloqueoFactura": "",
                    "OrdenCompra": "",
                    "CondExp": "",
                    "FechaPedido": "",
                    "FechaPrecio": "",
                    "FechaValidez": "",
                    "FechaEntrega": "",
                    "FechaResult": "",  
                    "FechaVisita": "",
                    "FechaFacturacion": "", 
                    "nomProyecto": "",
                    "codProyecto": "",
                    "codVersion": "",
                    "TipoVisita": "",
                    "Reenbolsable": false,
                    "GrupoForecast": "",
                    "TipoForecast": "",
                    "Motivo": "",   
                    "Certificado": "",
                    "Percepcion": "",
                    "Sector": "",
                    "Sociedad": "",
                    "PesoTotal": "",  
                    "Moneda": "",
                    "TipoCambio": "",   
                    "Igv": "",  
                    "SubTotal": "",
                    "SubtotalImp": "",
                    "Total": "",
                    "TotalConIgv": "",
                    "TotalDcto": "",
                    "TotalImp": "",
                    "CodVendedorWeb": "",
                    "NomVendedorWeb": "",
                    "codigoCliente": "",
                    "GrupoCond": "",
                    "NoImpFac": "",
                    "NumPedido": "",
                    "dsctoAdicionalZD12": "",
                    "dsctoAdicionalZD12tmp": "",
                    "Zasensor": false,
                    "Zncservicio": false,
                    "Znpiso": "",
                    "Ztransporte": ""                                      
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
                    },
                    "ZP09": {
                        "CodTexto": "ZP09",
                        "Descripcion": ""
                    },
                    "ZP10": {
                        "CodTexto": "ZP10",
                        "Descripcion": ""
                    },
                    "ZP11": {
                        "CodTexto": "ZP11",
                        "Descripcion": ""
                    },
                    "ZP12": {
                        "CodTexto": "ZP12",
                        "Descripcion": ""
                    },
                    "ZP13": {
                        "CodTexto": "ZP13",
                        "Descripcion": ""
                    },
                    "ZP14": {
                        "CodTexto": "ZP14",
                        "Descripcion": ""
                    }
                },
                "interlocutores": {
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
                            "TelefonoMovil": ""
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
                            "TelefonoMovil": ""
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
                            "TelefonoMovil": ""
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
                            "TelefonoMovil": ""
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
                            "TelefonoMovil": ""
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
                    "V2": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "Distrito": "",                            
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "V2",
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
                    "V3": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "Distrito": "",                            
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "V3",
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
                    "V4": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "Distrito": "",                            
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "V4",
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
                    "Z2": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "Distrito": "",                            
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "NOMBRE": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "Z2",
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
                    "Z3": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "Distrito": "",                            
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "NOMBRE": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "Z3",
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
                    "Z5": {
                        "Cliente": {
                            "Ciudad": "",
                            "Codigo": "",
                            "Distrito": "",                            
                            "CodigoPostal": "",
                            "Descripcion": "",
                            "Direccion": "",
                            "DireccionCompleta": "",
                            "Mail": "",
                            "NOMBRE": "",
                            "Pais": "",
                            "Ruc": "",
                            "PersonaFisica": false,
                            "Eventual": false,                              
                            "Telefono": "",
                            "TelefonoMovil": ""
                        },
                        "Funcion": "Z5",
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
                },
                "cliente": {
                    "APMAT": "",
                    "APPAT": "",
                    "CODIG": "",
                    "Codigo": "",
                    "Ciudad": "",
                    "CodigoPostal": "",
                    "DIREC": "",
                    "EDAD": "",
                    "RANGOED": "",
                    "FECNAC": "",
                    "GRAINS": "",
                    "NIVELSE" : "",
                    "Mail": "",
                    "NOMBRE": "",
                    "Pais": "",
                    "Ruc": null,
                    "PersonaFisica": false,
                    "Eventual": false,                      
                    "SEXO": "",
                    "Telefono": "",
                    "TelefonoMovil": null
                },
                "clienteEventual": {
                    "codigoCliente": "", 
                    "nombreCliente": "", 
                    "esEventual": true, 
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
                    }],
                "busquedaCliente": {
                    "dniRuc": "",
                    "razonSocial": "",
                    "tipoInterlocutor": "",
                    "copiarDatos": false
                },
                "planFacturacion":[{
                            "AFDAT": "",
                            "BONBA": 0,
                            "CCACT": "",
                            "CMPRE": 0,
                            "CMPRE_FLT": 0,
                            "FAKCA": "",
                            "FAKSP": "",
                            "FAKWR": 0,
                            "FAREG": "",
                            "FKARV": "",
                            "FKDAT": "",
                            "FKSAF": "",
                            "FPFIX": "",
                            "FPLAE": "",
                            "FPLNR": "",
                            "FPLTR": "",
                            "FPROZ": 0,
                            "FPTTP": "",
                            "KORTE": "",
                            "KUNRG": "",
                            "KURFP": 0,
                            "KURRF": 0,
                            "KZWI1": 0,
                            "KZWI2": 0,
                            "KZWI3": 0,
                            "KZWI4": 0,
                            "KZWI5": 0,
                            "KZWI6": 0,
                            "MLBEZ": "",
                            "MLSTN": "",
                            "NETPR": 0,
                            "NETWR": 0,
                            "NFDAT": null,
                            "OFKDAT": null,
                            "PERIO": "",
                            "PRSOK": "",
                            "SKFBP": 0,
                            "TAXK1": "",
                            "TAXK2": "",
                            "TAXK3": "",
                            "TAXK4": "",
                            "TAXK5": "",
                            "TAXK6": "",
                            "TAXK7": "",
                            "TAXK8": "",
                            "TAXK9": "",
                            "TEMAN": "",
                            "TETXT": "",
                            "TYPZM": "",
                            "UELNR": "",
                            "UELTR": "",
                            "VALDT": null,
                            "VALTG": "",
                            "WAERS": "",
                            "WAVWR": 0,
                            "ZTERM": ""
                }],

                  "visita":
                {
                    "textoContacto":"",
                    "textoDatosAdicionalesCliente":"",
                    "textoTelefonos":"",
                    "textoDescripcionVisita":"",
                    "textoResultadoVisita":"",
                },

                "ListaMatDsctoGenerado":[]
            };
            var datalstAsesores = {
            };
            var datalstZipCodes = {
            };
            if (oEvent.getParameter("name") == "appDocModificar") {
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
                //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
                var fechaif = new Date();
                var mes0 = (fechaif.getMonth() +1);
                var mes = (fechaif.getMonth() +1);
                var year0 = fechaif.getFullYear();
                var year = fechaif.getFullYear();
                if(mes>=11){
                    if(mes==11){
                        mes = 2;
                        year = year+1;
                    }
                    if(mes==12){
                        mes = 3;
                        year = year+1;
                    }
                }else{
                    mes = mes+3;
                }
                var fechaActual = fechaif.getDate() + "/" + mes0 + "/" + year0;
                var fechaPosterior = fechaif.getDate() + "/" + mes + "/" + year; // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
                ////////Inicio Stock Por Llegar y Por Pedir//////////////////////////////////////////////////////////////
                sap.ui.getCore().byId("date_fec_inicio_stockPorLlegarDocNuevo").setValue(fechaActual); 
                sap.ui.getCore().byId("date_fec_fin_stockPorLlegarDocNuevo").setValue(fechaPosterior); 

                sap.ui.getCore().byId("date_fec_inicio_stockPorLlegarMultiDocNuevo").setValue(fechaActual); 
                sap.ui.getCore().byId("date_fec_fin_stockPorLlegarMultiDocNuevo").setValue(fechaPosterior); 

                sap.ui.getCore().byId("date_fechaInicio_stockPorPedirDocNuevo").setValue(fechaActual); 
                sap.ui.getCore().byId("date_fechaFin_stockPorPedirDocNuevo").setValue(fechaPosterior);

                sap.ui.getCore().byId("date_fechaInicio_stockPorPedirMultiDocNuevo").setValue(fechaActual); 
                sap.ui.getCore().byId("date_fechaFin_stockPorPedirMultiDocNuevo").setValue(fechaPosterior);
                /////////Fin Stock Por Llegar y Por Pedir////////////////////////////////////////////////////////////////
                
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
                this.getView().getModel().setProperty("/dataIni",window.dataIni);
                
                /////////////////////////////////////////////
                //var itemSeleccionado = this.getView().byId("listPanelDatos").getItems()[0];
                //this.getView().byId("listPanelDatos").setSelectedItem(itemSeleccionado,true);
                //this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));
                this.byId("SplitAppId").to(this.createId("DocProductosDetallado"));
                sap.ui.getCore().byId("dlg_DialogDocModificar").open();
                this.tabDetailDefault();
                this.panelesNoSeleccionados();
                /////////////////////////////////////////////
                ///Inicio Boton Multiselect//////////
                this.btnSelectAllCerrados(false);
                this.getView().byId("btnSelectAll").setVisible(true);
                /*this.btnSelectAllCerradosPedMulti(false);
                this.getView().byId("btnSelectAllPedMult").setVisible(true);*/
                this.getView().getModel().setProperty("/cliente/FECNAC", fechaActual);
                this.getView().getModel().setProperty("/NumeroDocumentoReferencia", window.numeroDocumento);
                /*this.btnSelectCerrados(false);
                this.getView().byId("btnMulti").setVisible(true);*/
                ///End Boton Multiselect/////////////
                if(window.IsDocModificar==false){
                    this.getView().getModel().setProperty("/NumeroDocumentoReferencia", window.numeroDocumento);
                }
                if(window.IsDocBuscarModificar == false){
                    sap.ui.getCore().byId("dlg_DialogDocModificar").close();
                    this.getView().getModel().setProperty("/NumeroDocumentoReferencia", window.numeroDocumento);
                    this.onContinuarDlg_DialogDocModificar();
                }
            if(window.pedidoInstalacion){
                sap.ui.getCore().byId("txt_numeroDocumento_DocModificar").setValue(window.pedidoInstalacion);
            }
            var tituloDocModificar = sessionStorage.tituloDocumentoDocModificar==undefined || sessionStorage.tituloDocumentoDocModificar=="undefined"? "":JSON.parse(sessionStorage.tituloDocumentoDocModificar);
                            if(tituloDocModificar==""){
                                sessionStorage.clear();
                            }else{
                                sap.ui.getCore().byId("dlg_DialogDocModificar").close();
                                this.getView().getModel().setProperty("/layoutTxtUnidRendimiento",(sessionStorage.layoutTxtUnidRendimiento==undefined || sessionStorage.layoutTxtUnidRendimiento=="undefined")? "L12 M12 S12":JSON.parse(sessionStorage.layoutTxtUnidRendimiento));
                                this.getView().getModel().setProperty("/validCamposTocetos",(sessionStorage.validCamposTocetos==undefined || sessionStorage.validCamposTocetos=="undefined")? false:JSON.parse(sessionStorage.validCamposTocetos));

                                this.getView().getModel().setProperty("/menuMaster",JSON.parse((sessionStorage.menuMaster==undefined)? "":sessionStorage.menuMaster));
                                this.getView().getModel().setProperty("/pedido",JSON.parse((sessionStorage.pedidoDocModificar==undefined)? "":sessionStorage.pedidoDocModificar));
                                this.getView().getModel().setProperty("/listaMaterial",JSON.parse((sessionStorage.listaMaterialDocModificar==undefined)? "":sessionStorage.listaMaterialDocModificar));
                                this.getView().getModel().setProperty("/interlocutores",JSON.parse((sessionStorage.interlocutoresDocModificar==undefined)? "":sessionStorage.interlocutoresDocModificar));
                                var dd = this.getView().getModel().getProperty("/listaMaterial");
                                this.getView().getModel().setProperty("/tituloDocumento",sessionStorage.tituloDocumentoDocModificar=="undefined"? "":JSON.parse(sessionStorage.tituloDocumentoDocModificar));
                                this.getView().getModel().setProperty("/NumeroDocumentoReferencia",JSON.parse((sessionStorage.NumeroDocumentoReferenciaDocModificar==undefined)? "":sessionStorage.NumeroDocumentoReferenciaDocModificar));
                                this.getView().getModel().setProperty("/listaLinea",JSON.parse((sessionStorage.listaLineaDocModificar==undefined)? "":sessionStorage.listaLineaDocModificar));
                                this.getView().getModel().setProperty("/listaMarca",JSON.parse((sessionStorage.listaMarcaDocModificar==undefined)? "":sessionStorage.listaMarcaDocModificar));
                                this.getView().getModel().setProperty("/listacaract",JSON.parse((sessionStorage.listacaractDocModificar==undefined)? "":sessionStorage.listacaractDocModificar));
                                this.getView().getModel().setProperty("/documentoNuevo",JSON.parse((sessionStorage.documentoNuevoDocModificar==undefined)? "":sessionStorage.documentoNuevoDocModificar));
                                
                                this.getView().getModel().setProperty("/observaciones",JSON.parse((sessionStorage.observacionesDocModificar==undefined)? "":sessionStorage.observacionesDocModificar));
                                
                                this.getView().getModel().setProperty("/cliente",JSON.parse((sessionStorage.clienteDocModificar==undefined)? "":sessionStorage.clienteDocModificar));
                                this.getView().getModel().setProperty("/clienteEventual",JSON.parse((sessionStorage.clienteEventualDocModificar==undefined)? "":sessionStorage.clienteEventualDocModificar));
                                this.getView().getModel().setProperty("/preguntas",JSON.parse((sessionStorage.preguntasDocModificar==undefined)? "":sessionStorage.preguntasDocModificar));
                                
                                this.getView().getModel().setProperty("/busquedaCliente",JSON.parse((sessionStorage.busquedaClienteDocModificar==undefined)? "":sessionStorage.busquedaClienteDocModificar));
                                this.getView().getModel().setProperty("/planFacturacion",JSON.parse((sessionStorage.planFacturacionDocModificar==undefined)? "":sessionStorage.planFacturacionDocModificar));
                                this.getView().getModel().setProperty("/visita",JSON.parse((sessionStorage.visitaDocModificar==undefined)? "":sessionStorage.visitaDocModificar));
                                
                                this.getView().getModel().setProperty("/lstGrupoForAnt",(sessionStorage.lstGrupoForAntDocModificar==undefined || sessionStorage.lstGrupoForAntDocModificar=="undefined")? "":JSON.parse(sessionStorage.lstGrupoForAntDocModificar));
                                this.getView().getModel().setProperty("/lstGrupoFor",(sessionStorage.lstGrupoForDocModificar==undefined || sessionStorage.lstGrupoForDocModificar=="undefined")? "":JSON.parse(sessionStorage.lstGrupoForDocModificar));
                                this.getView().getModel().setProperty("/lstTipoFor",(sessionStorage.lstTipoForDocModificar==undefined || sessionStorage.lstTipoForDocModificar=="undefined")? "":JSON.parse(sessionStorage.lstTipoForDocModificar));
                                
                                this.getView().getModel().setProperty("/validCmbOpcionAmbiente",JSON.parse((sessionStorage.validCmbOpcionAmbiente==undefined)? "":sessionStorage.validCmbOpcionAmbiente));
                                
                                this.getView().byId("listPanelDatos").setVisible(true);

                                this.byId("SplitAppId").to(this.createId(sessionStorage.PageSelect));
                                
                                
                                this.getView().byId("com_tipoForecast_proyectoVisita").setSelectedKey(" ");
                            }
                         
            this.getView().getModel().refresh(true);
            this.validCamposProfesionales();
                this.initView(); 
                var tipoDoc = this.getView().getModel().getProperty("/pedido/CodTipoDoc");
            if(tipoDoc==undefined || tipoDoc==""){
            this.getView().byId("listPanelDatos").setVisible(true);
            this.getView().byId("listPanelFacturacion").setVisible(false);
            this.getView().byId("listPanelDatosVisita").setVisible(false);
            this.getView().byId("listPanelDatosInstalacion").setVisible(false);
            this.getView().byId("listPanelPedidosAsociados").setVisible(false);
            this.getView().byId("listPanelDatosServicio").setVisible(false);
            }else{
                this.creacionMaster(tipoDoc);
            }
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
            }else{
                utilString.destruirFragments(this);
            }
            
        },
        sessionStorageDocNuevo: function(){
            sessionStorage.setItem("tituloDocumentoDocModificar",JSON.stringify(this.getView().getModel().getProperty("/tituloDocumento")));
            sessionStorage.setItem("NumeroDocumentoReferenciaDocModificar",JSON.stringify(this.getView().getModel().getProperty("/NumeroDocumentoReferencia")));
            sessionStorage.setItem("listaLineaDocModificar",JSON.stringify(this.getView().getModel().getProperty("/listaLinea")));
            sessionStorage.setItem("listaMarcaDocModificar",JSON.stringify(this.getView().getModel().getProperty("/listaMarca")));
            sessionStorage.setItem("listacaractDocModificar",JSON.stringify(this.getView().getModel().getProperty("/listacaract")));
            sessionStorage.setItem("documentoNuevoDocModificar",JSON.stringify(this.getView().getModel().getProperty("/documentoNuevo")));
            sessionStorage.setItem("pedidoDocModificar",JSON.stringify(this.getView().getModel().getProperty("/pedido")));
            sessionStorage.setItem("observacionesDocModificar",JSON.stringify(this.getView().getModel().getProperty("/observaciones")));
            sessionStorage.setItem("interlocutoresDocModificar",JSON.stringify(this.getView().getModel().getProperty("/interlocutores")));
            sessionStorage.setItem("clienteDocModificar",JSON.stringify(this.getView().getModel().getProperty("/cliente")));
            sessionStorage.setItem("clienteEventualDocModificar",JSON.stringify(this.getView().getModel().getProperty("/clienteEventual")));
            sessionStorage.setItem("preguntasDocModificar",JSON.stringify(this.getView().getModel().getProperty("/preguntas")));
            sessionStorage.setItem("listaMaterialDocModificar",JSON.stringify(this.getView().getModel().getProperty("/listaMaterial")));
            sessionStorage.setItem("busquedaClienteDocModificar",JSON.stringify(this.getView().getModel().getProperty("/busquedaCliente")));
            sessionStorage.setItem("planFacturacionDocModificar",JSON.stringify(this.getView().getModel().getProperty("/planFacturacion")));
            sessionStorage.setItem("visitaDocModificar",JSON.stringify(this.getView().getModel().getProperty("/visita")));
            sessionStorage.setItem("lstGrupoForAntDocModificar",JSON.stringify(this.getView().getModel().getProperty("/lstGrupoForAnt")));
            sessionStorage.setItem("lstGrupoForDocModificar",JSON.stringify(this.getView().getModel().getProperty("/lstGrupoFor")));
            sessionStorage.setItem("lstTipoForDocModificar",JSON.stringify(this.getView().getModel().getProperty("/lstTipoFor")));
            
            sessionStorage.setItem("validCmbOpcionAmbiente",JSON.stringify(this.getView().getModel().getProperty("/validCmbOpcionAmbiente")));
            sessionStorage.setItem("menuMaster",JSON.stringify(this.getView().getModel().getProperty("/menuMaster")));
            sessionStorage.setItem("layoutTxtUnidRendimiento",JSON.stringify(this.getView().getModel().getProperty("/layoutTxtUnidRendimiento")));
            sessionStorage.setItem("validCamposTocetos",JSON.stringify(this.getView().getModel().getProperty("/validCamposTocetos")));
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
            //Validacion NC ocultar Agregar Materiales
                if(tipoDocCodigo=="Z020" || tipoDocCodigo=="Z021" || tipoDocCodigo=="Z022" || tipoDocCodigo=="Z024" || tipoDocCodigo=="Z025"){
                    this.getView().getModel().setProperty("/pedido/enabledIconoAdd",false);
                    this.getView().getModel().setProperty("/pedido/enabledIconoBuscar",false);
                }else{
                    this.getView().getModel().setProperty("/pedido/enabledIconoAdd",true);
                    this.getView().getModel().setProperty("/pedido/enabledIconoBuscar",true);
                }
            //
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
        validacionBotones:function(CodTipoDoc){
            if(CodTipoDoc=="Z034" || CodTipoDoc=="ZO02" || CodTipoDoc=="Z036" || 
                CodTipoDoc=="Z020" || CodTipoDoc=="Z021" || CodTipoDoc=="Z023" ||
                CodTipoDoc=="Z024" || CodTipoDoc=="Z025"){
                this.getView().getModel().setProperty("/btnStock",false);
            }else{
                this.getView().getModel().setProperty("/btnStock",true);
            }
            
            if(CodTipoDoc=="Z036" || CodTipoDoc=="Z040" || CodTipoDoc=="Z037"){
                this.getView().byId("masterDatosObservaciones").setVisible(false);
            }else{
                this.getView().byId("masterDatosObservaciones").setVisible(true);
            }
                sap.ui.getCore().byId("txt_codigo_proveedor").setEnabled(false);
        },      
        initView: function () {
            if(sessionStorage.listaMaterialDocModificar==undefined){
                this.getView().getModel().setProperty("/listaMaterial", null);
            }            
            this.getView().byId("btnCopiarDatosInterlocutores").setText("Copiar Datos");
            this.getView().byId("btnBuscarInterlocutor").setText("Buscar Solicitante");
            /*this.getView().byId("buttonMasterDatos").setSelectedKey("datos");
            this.getView().byId("buttonMasterProductos").setSelectedKey("productos");*/
            
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
        onContinuarDlg_DialogDocModificar: function (oEvent) {
            var numeroDocumento = sap.ui.getCore().byId("txt_numeroDocumento_DocModificar").getValue();
            this.copiarDocumento(numeroDocumento);
            
        },
        validOpcionAmbiente:function(){
            if(window.dataIni.person.CanalDist=="10"){
                if( this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z036" || 
                this.getView().getModel().getProperty("/documentoNuevo/Codigo")=="Z010" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z035" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO02" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z003" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z004" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z015" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z037" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z038" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z040"){

            
                this.getView().getModel().setProperty("/validCmbOpcionAmbiente",false); 
                }else{
                    this.getView().getModel().setProperty("/validCmbOpcionAmbiente",true);
                }
        }else{
                    this.getView().getModel().setProperty("/validCmbOpcionAmbiente",true);
        }
    },     
    validCamposProfesionales:function(){
        if(window.dataIni.person.CanalDist=='10'){
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO01" ||
                this.getView().getModel().getProperty("/documentoNuevo/Codigo")=="ZO02" ){
                this.getView().getModel().setProperty("/valueProfesional",true);
            }else{
                this.getView().getModel().setProperty("/valueProfesional",false);
            }
        }
    },
    defaultAmbiente:function(){
        var materiales = this.getView().getModel().getProperty("/listaMaterial");
        try{
            var ultMaterial = materiales[materiales.length-1];
            this.getView().getModel().setProperty("/codAmbiente",ultMaterial.CodGrupoMat);
            this.getView().getModel().setProperty("/opcAmbiente",ultMaterial.Opcion);
        }catch(ex){
            this.getView().getModel().setProperty("/codAmbiente","");
            this.getView().getModel().setProperty("/opcAmbiente","");
        }
    }, 
        copiarDocumento: function(referencia) {
                var accion = "editar";
            var self = this;
            var tipovisi=self.getView().getModel().getProperty("/dataIni/lstUsuVis");
            if (tipovisi.length>0) {
                this.getView().getModel().setProperty("/pedido/enabledFechaVisita",true);
            }
            else{
                this.getView().getModel().setProperty("/pedido/enabledFechaVisita",false);   
            }   
sap.ui.core.BusyIndicator.show(0);
setTimeout(function(){

            //var result = documentosServices.modificarDocumento(accion, referencia);
            documentosServices.modificarDocumento(accion, referencia, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                /*sin conexion
                statusText error
                status 0 */


                /*Cuando hay conexion 
                statusText Not Found
                status 0*/
                try{
            if (result.c === "s") {
                if (result.data.success) {
                var data = result.data;
                window.numeroDocumento = "";
                self.validacionBotones(data.objPedido.CodTipoDoc);    
                self.getView().getModel().setProperty("/tipoDocumento",data.objPedido.CodTipoDoc);
                var tipoDocCodigo = data.objPedido.CodTipoDoc;
                self.getView().getModel().setProperty("/tituloDocumento", "Modificando Documento "+tipoDocCodigo+" - Nro.: "+parseInt(data.objPedido.NumPedido));
                /////////Inicio Validacion//////////////////////////////////////////////////////////////////////////
                ///Inicio Agregar ListaMaster///////////////////////////////////
             /*tab1        listPanelDatos
             tab3        listPanelFacturacion
             tab4        listPanelDatosVisita
             tab6        listPanelDatosInstalacion
             tab5        listPanelPedidosAsociados
             tab7        listPanelDatosServicio*/
                    
                    self.creacionMaster(tipoDocCodigo);
            ///End Agregar ListaMaster//////////////////////////////////////   
                /////////End Validacion////////////////////////////////////////////////////////////////////////////

                //////InicioGrupo Forecast///////////////////////////////////////////////////////////////////////////////
                var datosTienda = self.getView().getModel().getProperty("/dataIni/person");
                /////Inicio Para Proveedores/////////////////////////////////////////////////////////////////////
                if(datosTienda.CanalDist==""){
                    datosTienda.CanalDist = "10";
                }
                /////End Para Proveedores////////////////////////////////////////////////////////////////////////
                var listaGroup = utilFunction.getListGrupoFor(datosTienda.CanalDist, data.lstGrupoFor);
                /////Inicio Buscar Cliente Codificado//////////////////////////////////////////////////////
                    if(data.codigoCliente.length==10){
                    //self.obtenerDatosInterlocutorCliente(data.codigoCliente);
                    clienteServices.buscarClienteCodigo(data.codigoCliente, data.codigoCliente, datosTienda.CanalDist, function(result1) {
                        if (result1.c == "s") {
                            var data1 = result1.data;
                            if(datosTienda.CanalDist=="30"){
                                var listaGroup1 = utilFunction.getListGrupoFor(datosTienda.CanalDist, data1.lstGrupoFor);
                                self.getView().getModel().setProperty("/lstGrupoFor", listaGroup1);
                            }else{
                                self.getView().getModel().setProperty("/lstGrupoFor", data1.lstGrupoFor);
                            }
                            var gf = data.objPedido.GrupoForecast;
                            if(gf==""){
                                gf=data1.lstGrupoFor[1].Codigo;
                            }
                            self.getView().getModel().setProperty("/pedido/GrupoForecast",gf);
                            self.getView().getModel().refresh();
                            self.sessionStorageDocNuevo();
                            }
                        });
                        }
                /////End Buscar Cliente Codificado/////////////////////////////////////////////////////////
                self.getView().getModel().setProperty("/lstGrupoForAnt", data.lstGrupoFor);
                self.getView().getModel().setProperty("/lstGrupoFor", listaGroup);
                self.getView().getModel().setProperty("/lstTipoFor", data.lstTipoFor);
                window.lstTipoFor = self.getView().getModel().getProperty("/lstTipoFor");
                        window.lstTipoForOriginal = self.getView().getModel().getProperty("/lstTipoFor");
                //////End Grupo Forecast/////////////////////////////////////////////////////////////////////////////////

                self.getView().getModel().refresh();                                             
                if(data.objPedido.CodTipoDoc == 'ZO02' && data.PedidoVisita42 != '') {
                    sap.ui.getCore().byId("dlg_DialogDocModificar").close();//Probar si sirve en Doc Modificar
                    self.crearDialogAvisoTipoDocumento(data);//Probar si sirve en Doc Modificar
                } else {
                    self.initDataProyecto(data, data.lstGrupoFor, data.lstTipoFor);
                    //Pintar al Nombre de Cliente al añadir referencia
                    if(referencia!=""){
                        self.getView().getModel().setProperty("/clienteEventual/nombreCliente",data.objPedido.Interlocutores[0].Cliente.Descripcion);
                    }  
                    sap.ui.getCore().byId("dlg_DialogDocModificar").close(); 

                    //Inicio Obtiene Opcion y Ambiente de Dialog Add Material///////
                    self.defaultAmbiente();               
                    //End Obtiene Opcion y Ambiente de Dialog Add Material///////
                }
                ////Inicio Fecha Repartos/////////////////////////////////////////////////////////////////////////////////// {
                /*var fecPedido=self.getView().getModel().getProperty("/pedido/FechaPedido");
                var fechaPedidoCalculado = utilString.obtenerFechaDespacho(fecPedido); 
                if(data.objPedido.CodTipoDoc=="Z001" || data.objPedido.CodTipoDoc=="Z003"){
                    for (var i = 0; i < self.getView().getModel().getProperty("/listaMaterial").length; i++) {
                        var fecEntrega = self.getView().getModel().getProperty("/listaMaterial/"+i+"/Repartos/0/FechaEntrega");
                        if(utilString.verificarFechaRepartoModAdd(fecPedido,fecEntrega) ){
                        self.onObtenerFechaReparto(fechaPedidoCalculado,i);
                        }
                        if(utilString.compararFechaActualCon(fecPedido)=="menor"){
                            if(utilString.compararFechaActualCon(fecEntrega)=="menor" || utilString.compararFechaActualCon(fecEntrega)=="igual"){
                                self.onObtenerFechaReparto(utilString.generarFechaActual(),i);
                            }
                        }
                    }
                }*/
                ////End Fecha Repartos/////////////////////////////////////////////////////////////////////////////////// 
                self.validOpcionAmbiente();
                ////Visualizar Materiales/////////////////////////////////////
                self.getView().byId("listaMasterMateriales").setVisible(true);
                self.getView().byId("txt_TotalDet").setVisible(true);
                self.getView().byId("txt_DsctoDet").setVisible(true);
                //////////////////////////////////////////////////////////////
                
                ///Inicio Mensaje Pedidos con entrega de mercaderia/////////////////////
                    flujoDocumentoServices.flujoDocumento(data.objPedido.NumPedido, function(result2) { 
                    sap.ui.core.BusyIndicator.show(0);
                        if (result2.c === "s") {
                            if (result2.data.success) {
                                if(result2.data.detEntrega.length>0 && result.data.pedidoTratado==""){
                                    self.MensajeAvisoInformativo("El Pedido ya cuenta con entrega de mercaderia.");
                                    self.getView().getModel().setProperty("/pedido/TieneEntrega",true);
                                }
                                ////Inicio Mensaje Pedido Facturado///////////////////////////
                                if(result2.data.detEntrega.length==0 && result.data.pedidoTratado=="true"){
                                    self.MensajeAvisoInformativo("El Pedido ya ha sido Facturado.");
                                    self.getView().getModel().setProperty("/pedido/Tratado",true);
                                }
                                if(result2.data.detEntrega.length>0 && result.data.pedidoTratado=="true"){
                                    self.MensajeAvisoInformativo("El Pedido ya cuenta con entrega de mercadería y ha sido Facturado.");
                                    self.getView().getModel().setProperty("/pedido/TieneEntrega",true);
                                    self.getView().getModel().setProperty("/pedido/Tratado",true);
                                }
                                ///End Mensaje Pedido Facturado////////////////
                            } else {
                                sap.m.MessageToast.show(result.data.errors.reason, {
                                    duration: 3000
                                });
                                sap.ui.core.BusyIndicator.hide();
                            }
                        } else {
                            sap.m.MessageToast.show(result.m, {
                                duration: 3000
                            });
                            sap.ui.core.BusyIndicator.hide();
                        }
                        sap.ui.core.BusyIndicator.hide();
                    });
                ///End Mensaje Pedidos con entrega de mercaderia/////////////////////
                self.validProveedor();
                self.validCamposProfesionales();
                self.validCamposDoc();
                self.validMotivoNc();
                self.sessionStorageDocNuevo();                
            } else {
                sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                sap.ui.core.BusyIndicator.hide();
            }  
            sap.ui.core.BusyIndicator.hide(); 
            } else {
                    sap.ui.core.BusyIndicator.hide();
                sap.m.MessageToast.show(result.m, {duration: 3000});
            }
            }catch(ex){
                if(result.status!=0){
                    //sap.m.MessageToast.show("El documento no existe", {duration: 3000});
                    }
                    self.getView().getModel().setProperty("/tituloDocumento", "");
                    sap.ui.getCore().byId("dlg_DialogDocModificar").open();
                    sap.ui.core.BusyIndicator.hide(); 
                }
            });
},1000);    
        },
        listaToArbol:function(list) {
            var map = {};
            var node, roots = [];
            var i = 0;
            for (i = 0; i < list.length; i += 1) {
                map[list[i].id] = i; // initialize the map
                list[i].children = []; // initialize the children
            }
            for (i = 0; i < list.length; i += 1) {
                node = list[i];
                if (node.parentId !== "0") {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map[node.parentId]].children.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        },
        onQuitarCaracter:function(cadena, caracter){
            for (var i = 0; i < (cadena.length)*2; i++) {
                if(cadena.indexOf(caracter)==0){
                    cadena = cadena.replace(caracter, "");
                }else{
                    break;
                }
            }
            return cadena;
        },
        MensajeAvisoInformativo:function(Mensaje){
            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({ text: Mensaje }),
                beginButton: new Button({
                    text: 'Ok',
                    type: 'Accept',
                    press: function () {
                        dialog.destroy();
                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this)
                }),
                afterClose: function() {
                    dialog.destroy();
                }
            });

            dialog.open();

            
        },
        onObtenerFechaRepartoModAdd: function(material, fecPedido,cont) {
            this.getView().getModel().setProperty("/listaMaterial/"+cont+"/Repartos/0/FechaEntrega",fecPedido);
            this.getView().getModel().setProperty("/repartoDetail",this.getView().getModel().getProperty("/listaMaterial/"+cont+"/Repartos/0"));
            this.getView().getModel().setProperty("/material",this.getView().getModel().getProperty("/listaMaterial/"+cont));
            this.getView().getModel().setProperty("/repartoDetail/path",0);
            var repartoDet = this.getView().getModel().getProperty("/repartoDetail");  
            var repartoDetCant = (repartoDet.CantPed != "") ? parseInt(repartoDet.CantPed) : 0;
            ///material/Cantidad
            if(repartoDetCant > 0 ) {
                    var material = this.getView().getModel().getProperty("/material");   
                    var repartos = material.Repartos;
                    var cantidad = material.Cantidad;
                    var cantidadReparto = 0;
                    for(var indice in repartos) {
                        cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
                    }  
                    if(cantidadReparto <= cantidad) {                        
                        if(repartoDet.path === "") {
                            //agregar
                            var repartoNuevo = new Object();
                            repartoNuevo.CantConf = repartoDetCant;                        
                            repartoNuevo.FechaEntrega = repartoDet.FechaEntrega;
                            repartoNuevo.CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartoNuevo.FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////
                            repartos.push(repartoNuevo);                            
                        } else {
                            //editar
                            var indice = repartoDet.path;
                            repartos[indice].CantConf = repartoDetCant;  
                            repartos[indice].FechaEntrega = repartoDet.FechaEntrega;  
                            repartos[indice].CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartos[indice].FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////  
                        }
                        this.getView().getModel().setProperty("/material/Repartos", repartos);
                        this.getView().getModel().refresh();     
                        sap.ui.getCore().byId("dlg_DialogDocModificarReparto").close();                   
                    } else {                        
                        if(cantidadReparto > cantidad) 
                        {             
                            this.getView().getModel().setProperty("/repartoDetail/CantPed",repartoDet.CantConf);
                            this.getView().getModel().setProperty("/repartoDetail/FechaEntrega",repartoDet.FechaEntregaConf);
                            sap.m.MessageToast.show("Aviso, El total de cantidades es superior a la del detalle del pedido:" + cantidad, { duration: 3000 });  
                        }
                        else 
                        {
                            //sap.m.MessageToast.show("No se puede agregar un nuevo reparto.", { duration: 3000 });
                        }  
                    }            
            } else {
                sap.m.MessageToast.show("Debe ingresar una cantida mayor a 0.", { duration: 3000 });    
            }  
        },
        onObtenerFechaRepartoZ034: function(fecPedido,cont) {
            /*var validFecha = utilString.comparacionFechas(this.getView().getModel().getProperty("/listaMaterial/"+cont+"/Repartos/0/FechaEntrega"),"<=",fecPedido,"/");
            if(!validFecha){
                MessageToast.show("La fecha colocada debe ser mayor o igual a la fecha de reparto");
            }*/
            this.getView().getModel().setProperty("/listaMaterial/"+cont+"/Repartos/0/FechaEntrega",fecPedido);
            this.getView().getModel().setProperty("/repartoDetail",this.getView().getModel().getProperty("/listaMaterial/"+cont+"/Repartos/0"));
            this.getView().getModel().setProperty("/material",this.getView().getModel().getProperty("/listaMaterial/"+cont));
            this.getView().getModel().setProperty("/repartoDetail/path",0);
            var repartoDet = this.getView().getModel().getProperty("/repartoDetail");  
            var repartoDetCant = (repartoDet.CantPed != "") ? parseInt(repartoDet.CantPed) : 0;
            ///material/Cantidad
            if(repartoDetCant > 0 ) {
                    var material = this.getView().getModel().getProperty("/material");   
                    var repartos = material.Repartos;
                    var cantidad = material.Cantidad;
                    var cantidadReparto = 0;
                    for(var indice in repartos) {
                        cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
                    }  
                    if(cantidadReparto <= cantidad) {                        
                        if(repartoDet.path === "") {
                            //agregar
                            var repartoNuevo = new Object();
                            repartoNuevo.CantConf = repartoDetCant;                        
                            repartoNuevo.FechaEntrega = repartoDet.FechaEntrega;
                            repartoNuevo.CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartoNuevo.FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////
                            repartos.push(repartoNuevo);                            
                        } else {
                            //editar
                            var indice = repartoDet.path;
                            repartos[indice].CantConf = repartoDetCant;  
                            repartos[indice].FechaEntrega = repartoDet.FechaEntrega;  
                            repartos[indice].CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartos[indice].FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////  
                        }
                        this.getView().getModel().setProperty("/material/Repartos", repartos);
                        this.getView().getModel().refresh();     
                        sap.ui.getCore().byId("dlg_DialogDocModificarReparto").close();                   
                    } else {                        
                        if(cantidadReparto > cantidad) 
                        {             
                            this.getView().getModel().setProperty("/repartoDetail/CantPed",repartoDet.CantConf);
                            this.getView().getModel().setProperty("/repartoDetail/FechaEntrega",repartoDet.FechaEntregaConf);
                            sap.m.MessageToast.show("Aviso, El total de cantidades es superior a la del detalle del pedido:" + cantidad, { duration: 3000 });  
                        }
                        else 
                        {
                            //sap.m.MessageToast.show("No se puede agregar un nuevo reparto.", { duration: 3000 });
                        }  
                    }            
            } else {
                sap.m.MessageToast.show("Debe ingresar una cantida mayor a 0.", { duration: 3000 });    
            }  
        },
        onObtenerFechaReparto: function(fecPedido,cont) {
            this.getView().getModel().setProperty("/listaMaterial/"+cont+"/Repartos/0/FechaEntrega",fecPedido);
            this.getView().getModel().setProperty("/repartoDetail",this.getView().getModel().getProperty("/listaMaterial/"+cont+"/Repartos/0"));
            this.getView().getModel().setProperty("/material",this.getView().getModel().getProperty("/listaMaterial/"+cont));
            this.getView().getModel().setProperty("/repartoDetail/path",0);
            var repartoDet = this.getView().getModel().getProperty("/repartoDetail");  
            var repartoDetCant = (repartoDet.CantPed != "") ? parseInt(repartoDet.CantPed) : 0;
            ///material/Cantidad
            if(repartoDetCant > 0 ) {
                    var material = this.getView().getModel().getProperty("/material");   
                    var repartos = material.Repartos;
                    var cantidad = material.Cantidad;
                    var cantidadReparto = 0;
                    for(var indice in repartos) {
                        cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
                    }  
                    if(cantidadReparto <= cantidad) {                        
                        if(repartoDet.path === "") {
                            //agregar
                            var repartoNuevo = new Object();
                            repartoNuevo.CantConf = repartoDetCant;                        
                            repartoNuevo.FechaEntrega = repartoDet.FechaEntrega;
                            repartoNuevo.CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartoNuevo.FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////
                            repartos.push(repartoNuevo);                            
                        } else {
                            //editar
                            var indice = repartoDet.path;
                            repartos[indice].CantConf = repartoDetCant;  
                            repartos[indice].FechaEntrega = repartoDet.FechaEntrega;  
                            repartos[indice].CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartos[indice].FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////  
                        }
                        this.getView().getModel().setProperty("/material/Repartos", repartos);
                        this.getView().getModel().refresh();     
                        sap.ui.getCore().byId("dlg_DialogDocModificarReparto").close();                   
                    } else {                        
                        if(cantidadReparto > cantidad) 
                        {             
                            this.getView().getModel().setProperty("/repartoDetail/CantPed",repartoDet.CantConf);
                            this.getView().getModel().setProperty("/repartoDetail/FechaEntrega",repartoDet.FechaEntregaConf);
                            sap.m.MessageToast.show("Aviso, El total de cantidades es superior a la del detalle del pedido:" + cantidad, { duration: 3000 });  
                        }
                        else 
                        {
                            //sap.m.MessageToast.show("No se puede agregar un nuevo reparto.", { duration: 3000 });
                        }  
                    }            
            } else {
                sap.m.MessageToast.show("Debe ingresar una cantida mayor a 0.", { duration: 3000 });    
            }  
        },            
        
        validCamposDoc:function(){
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z036" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z037"){
                this.getView().getModel().setProperty("/ocultarTipoVisita",true);
            }
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z037"){
                this.getView().getModel().setProperty("/OcultarCampos",false);
            }else{
                this.getView().getModel().setProperty("/OcultarCampos",false);
            }
            this.getView().getModel().setProperty("/visibleCombTipoVisita",false);
            /**************
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z009" 
                || this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z010" 
                || this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z200"){
                this.getView().getModel().setProperty("/validCamposTocetos",true);
                this.getView().byId("txtUnidRendimiento").setLabel("Unidad de Rendimiento - UM");
                this.getView().getModel().setProperty("/layoutTxtUnidRendimiento","L7 M7 S7");
            }else{
                this.getView().getModel().setProperty("/validCamposTocetos",false);
                this.getView().byId("txtUnidRendimiento").setLabel("Unidad de Rendimiento");
                this.getView().getModel().setProperty("/layoutTxtUnidRendimiento","L12 M12 S12");
            }
            **************/
        },
        validMotivoNc:function(){
            var dataListMotNC = JSON.parse(localStorage.dataIni).lstMotPed;

            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z020" ){
                var lstMotivoNc = dataListMotNC.filter(function(el) {
                                             return el.Codigo == "" || el.Codigo == "NC1" || el.Codigo == "NC2" || el.Codigo == "NC3";
                                        });
                this.getView().getModel().setProperty("/dataIni/lstMotPed",lstMotivoNc);
            }
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z021" ){
                var lstMotivoNc = dataListMotNC.filter(function(el) {
                                             return el.Codigo == "" || el.Codigo == "NC6" || el.Codigo == "NC7";
                                        });
                this.getView().getModel().setProperty("/dataIni/lstMotPed",lstMotivoNc);
            }
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z024" ){
                var lstMotivoNc = dataListMotNC.filter(function(el) {
                                             return el.Codigo == "" || el.Codigo == "NC4" || el.Codigo == "NC7";
                                        });
                this.getView().getModel().setProperty("/dataIni/lstMotPed",lstMotivoNc);
            }
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z025" ){
                var lstMotivoNc = dataListMotNC.filter(function(el) {
                                             return el.Codigo == "" || el.Codigo == "NC5";
                                        });
                this.getView().getModel().setProperty("/dataIni/lstMotPed",lstMotivoNc);
            }
        },
        initDataProyecto: function (data, lstGrupoFor, lstTipoFor) {
            var pedidoSer = data.objPedido;
            var fechaValidezString = moment(pedidoSer.FechaValidez).format('DD/MM/YYYY');
            var fechaEntregaString = moment(pedidoSer.FechaEntrega).format('DD/MM/YYYY');
            var fechaPedidoString = moment(pedidoSer.Fecha).format('DD/MM/YYYY');
            var fechaPrecioString = moment(pedidoSer.FechaPrecio).format('DD/MM/YYYY');
            var fechaFactString = moment(pedidoSer.FechaFacturacion).format('DD/MM/YYYY');
            var fechaVisitString = moment(pedidoSer.FechaVisita).format('DD/MM/YYYY');
            var fechaResultString = moment(pedidoSer.FechaResult).format('DD/MM/YYYY');
            var fechaVisit = "", fechaResul = "";

            if(fechaVisitString == '01/01/0001' && fechaResultString == '01/01/0001') {
            } else if(fechaVisitString != '01/01/0001' && fechaResultString != '01/01/0001') {
                fechaVisit = fechaVisitString;
                fechaResul = fechaResultString;
            } else if(fechaVisitString != '01/01/0001' && fechaResultString == '01/01/0001') {
                fechaVisit = fechaVisitString;
            } else {
                fechaResul = fechaResultString;
            }


            var pedido = this.getView().getModel().getProperty("/pedido");
            this.getView().byId("txt_pago_pesoTotal").setValue(pedidoSer.PesoTotal+" "+"kg");
            pedido.id= 1;
            pedido.CodTipoDoc= pedidoSer.CodTipoDoc;
            pedido.CodTipoDocAnt= pedidoSer.CodTipoDocAnt;
            pedido.DocOriginal= pedidoSer.DocOriginal;  
            pedido.OrgVentas= pedidoSer.OrgVentas;
            pedido.CanalDist= pedidoSer.CanalDist;
            pedido.CodOficina= pedidoSer.CodOficina;
            pedido.CodGrupoVend= pedidoSer.CodGrupoVend;
            pedido.CondPago= pedidoSer.CondPago; // =="" ? "D000":pedidoSer.CondPago;
            pedido.CodigoBanco= "";
            pedido.BloqueoEntrega= data.BloqueoEntrega;
            pedido.BloqueoFactura= data.BloqueoFactura;
            pedido.OrdenCompra= pedidoSer.OrdenCompra;
            pedido.CondExp= pedidoSer.CondExp==" " || pedidoSer.CondExp=="" ? "03" : pedidoSer.CondExp;
            pedido.FechaPedido= fechaPedidoString;
            pedido.FechaPrecio= fechaPrecioString;
            pedido.FechaValidez= fechaValidezString;
            pedido.FechaEntrega= fechaEntregaString;
            pedido.FechaResult= fechaResul;  
            pedido.FechaVisita= fechaVisit;
            pedido.FechaFacturacion= fechaFactString; 
            pedido.nomProyecto= data.NomProyecto;
            pedido.codProyecto= pedidoSer.codProyecto;
            pedido.codVersion= pedidoSer.codVersion;
            pedido.TipoVisita= pedidoSer.TipoVisita;
            pedido.Reenbolsable= pedidoSer.Reenbolsable,
            pedido.GrupoForecast=pedidoSer.GrupoForecast==""?this.getView().getModel().getProperty("/lstGrupoFor/1/Codigo"):pedidoSer.GrupoForecast;
            pedido.TipoForecast= pedidoSer.TipoForecast;
            pedido.RegaloCampania= pedidoSer.RegaloCampania;
            pedido.BonoCampania= pedidoSer.BonoCampania;
            pedido.Motivo= data.Motivo;   
            pedido.Certificado= pedidoSer.Certificado;
            pedido.Percepcion= "";
            pedido.Sector= pedidoSer.Sector;
            pedido.Sociedad= "";
            pedido.PesoTotal= data.PesoTotal;  
            pedido.Moneda= data.Moneda;
            pedido.TipoCambio= data.TipoCambio; 
            if(pedidoSer.NumPedido!="" ){
                pedido.Igv= pedidoSer.Igv;  //data
                pedido.TotalImp= pedidoSer.TotalImp;   //data
            }else{
                pedido.Igv= data.Igv;  //data
                pedido.TotalImp= data.TotalImp;   //data
            }
            pedido.SubTotal= data.SubTotal;
            pedido.SubtotalImp= pedidoSer.SubtotalImp;
            pedido.Total= data.Total;
            pedido.TotalConIgv= data.TotalConIgv;
            pedido.TotalDcto= data.TotalDcto;
            pedido.codigoCliente= data.codigoCliente;
            pedido.GrupoCond= data.GrupoCond;
            pedido.NoImpFac= "";
            pedido.NumPedido= pedidoSer.NumPedido;
            pedido.dsctoAdicionalZD12= pedidoSer.dsctoAdicionalZD12;
            pedido.dsctoAdicionalZD12tmp= pedidoSer.dsctoAdicionalZD12tmp; 
            pedido.Zasensor = pedidoSer.Zasensor;
            pedido.Zncservicio = pedidoSer.Zncservicio;
            pedido.Znpiso = pedidoSer.Znpiso;
            pedido.Ztransporte = pedidoSer.Ztransporte;              
            pedido.PedidoVenta1 = pedidoSer.PedidoVenta1 == "null"? "":pedidoSer.PedidoVenta1;
            pedido.PedidoVenta2 = pedidoSer.PedidoVenta2 == "null"? "":pedidoSer.PedidoVenta2;
            pedido.PedidoVenta3 = pedidoSer.PedidoVenta3 == "null"? "":pedidoSer.PedidoVenta3;
            pedido.PedidoVenta4 = pedidoSer.PedidoVenta4 == "null"? "":pedidoSer.PedidoVenta4;
            pedido.PedidoVisita1 = pedidoSer.PedidoVisita1;
            pedido.PedidoVisita2 = pedidoSer.PedidoVisita3 == "null"? "":pedidoSer.PedidoVisita3;
            pedido.PedidoVisita3 = pedidoSer.PedidoVisita2 == "null"? "":pedidoSer.PedidoVisita2 ;
            pedido.PedidoVisita4 = pedidoSer.PedidoVisita4 == "null"? "":pedidoSer.PedidoVisita4;
            pedido.Referencia = pedidoSer.Referencia;
            //if(true) { pedido.DocOriginal = pedidoSer.NumPedido;} //referencia
            this.getView().getModel().setProperty("/pedido", pedido); 


            //Inicio listaPre////////////////////////////////////////////
            var listaPreLleno = [];
             
            for (var i = 0; i < data.listCliPregResp.length; i++) {
                var listaPre = new Object();
                       listaPre.Codigo = data.listCliPregResp[i].Codigo ; // null,
                       listaPre.Ruc = data.listCliPregResp[i].Ruc ; // null,
                       listaPre.Descripcion = data.listCliPregResp[i].Descripcion ; // null,
                       listaPre.Titulo = data.listCliPregResp[i].Titulo ; // null,
                       listaPre.Direccion = data.listCliPregResp[i].Direccion ; // null,
                       listaPre.DireccionCompleta = data.listCliPregResp[i].DireccionCompleta ; //listaPre.",
                       listaPre.Ciudad = data.listCliPregResp[i].Ciudad ; // null,
                       listaPre.Pais = data.listCliPregResp[i].Pais ; //listaPre.PE",
                       listaPre.CodigoPostal = data.listCliPregResp[i].CodigoPostal ; // null,
                       listaPre.Distrito = data.listCliPregResp[i].Distrito ; // null,
                       listaPre.Telefono = data.listCliPregResp[i].Telefono ; // null,
                       listaPre.TelefonoMovil = data.listCliPregResp[i].TelefonoMovil ; // null,
                       listaPre.Mail = data.listCliPregResp[i].Mail ; // null,
                       listaPre.TranspZone = data.listCliPregResp[i].TranspZone ; // null,
                       listaPre.PersonaFisica = data.listCliPregResp[i].PersonaFisica ; // false,
                       listaPre.Eventual = data.listCliPregResp[i].Eventual ; // false,
                       listaPre.Funcion = data.listCliPregResp[i].Funcion ; // null,
                       listaPre.CODIG = data.listCliPregResp[i].CODIG ; //listaPre.12345678",
                       listaPre.APPAT = data.listCliPregResp[i].APPAT ; // null,
                       listaPre.APMAT = data.listCliPregResp[i].APMAT ; // null,
                       listaPre.NOMBRE = data.listCliPregResp[i].NOMBRE ; // null,
                       listaPre.DIREC = data.listCliPregResp[i].DIREC ; // null,
                       listaPre.ZCODE = data.listCliPregResp[i].ZCODE ; // null,
                       listaPre.FECNAC = data.listCliPregResp[i].FECNAC ; //listaPre.0001-01-01T00:00:00",
                       listaPre.EDAD = data.listCliPregResp[i].EDAD ; // null,
                       listaPre.SEXO = data.listCliPregResp[i].SEXO ; // null,
                       listaPre.GRAINS = data.listCliPregResp[i].GRAINS ; // null,
                       listaPre.CODP = data.listCliPregResp[i].CODP ; //listaPre.1",
                       listaPre.CODR = data.listCliPregResp[i].CODR ; //listaPre.2",
                       listaPre.NIVELSE = data.listCliPregResp[i].NIVELSE ; // null,
                       listaPre.codigoCliente = data.listCliPregResp[i].codigoCliente ; // null,
                       listaPre.RANGOED = data.listCliPregResp[i].RANGOED ; // null,
                       listaPre.P1 = data.listCliPregResp[i].P1 ; // null,
                       listaPre.P10 = data.listCliPregResp[i].P10 ; // null,
                       listaPre.P15 = data.listCliPregResp[i].P15 ; // null,
                       listaPre.P20 = data.listCliPregResp[i].P20 ; // null,
                       listaPre.P25 = data.listCliPregResp[i].P25 ; // null,
                       listaPre.P30 = data.listCliPregResp[i].P30 ; // null,
                       listaPre.P35 = data.listCliPregResp[i].P35 ; // null,
                       listaPre.P40 = data.listCliPregResp[i].P40 ; // null,
                       listaPre.P45 = data.listCliPregResp[i].P45 ; // null,
                       listaPre.P50 = data.listCliPregResp[i].P50 ; // null,
                       listaPre.P55 = data.listCliPregResp[i].P55 ; // null

                       listaPreLleno.push(listaPre);
            }
            this.getView().getModel().setProperty("/listCliPregResp",listaPreLleno); 
            //End listaPre////////////////////////////////////////////
            
            utilDocumentoDocModificar.obtenerObservaciones(this, pedidoSer.Textos);
            utilDocumentoDocModificar.obtenerInterlocutores(this, data.objPedido.Interlocutores ,data);
            utilDocumentoDocModificar.obtenerPreguntas(this, data.listCliPregResp);
            utilDocumentoDocModificar.obtenerMateriales(this, pedido.CodTipoDoc, pedidoSer.Detalle);

            //***********Fidelizacion Clientes*********
            var clienteSer = data.datoReniec[0];
            if(clienteSer==undefined){
                var fechNacimiento = utilString.generarFechaActual();
            }else{
                var fechNacimiento = moment(clienteSer.FECNAC).format('DD/MM/YYYY');
                this.getView().getModel().setProperty("/cliente", clienteSer);
            }        
            this.getView().getModel().setProperty("/cliente/FECNAC", fechNacimiento);

            if (this.getView().getModel().getProperty("/pedido/NumPedido")!="" ){
                this.getView().getModel().setProperty("/cliente/Codigo", data.codigoCliente);
            }
            utilDocumentoDocModificar.obtenerClienteEventual(this, data.objCliente);

            /////////////////////////////////////////////////////////////////////////////////////////////////////////
                var interAGCliente = this.getView().getModel().getProperty("/interlocutores/AG/Cliente");
                this.getView().getModel().setProperty("/cliente/Ruc", interAGCliente.Ruc); 
                if(interAGCliente.Ruc.length==11){
                    this.getView().getModel().setProperty("/pedido/GrupoForecast",this.getView().getModel().getProperty("/lstGrupoFor/1/Codigo"));
                }else{
                    var forec = pedidoSer.GrupoForecast==""?this.getView().getModel().getProperty("/lstGrupoFor/1/Codigo"):pedidoSer.GrupoForecast;
                    this.getView().getModel().setProperty("/pedido/GrupoForecast",forec);
                }
            /////////////////////////////////////////////////////////////////////////////////////////////////////////

            /*this.getView().getModel().setProperty("/lstGrupoFor", data.lstGrupoFor);
            this.getView().getModel().setProperty("/lstGrupoForFiltrado", utilFunction.getListGrupoFor(pedidoSer.CanalDist, data.lstGrupoFor));
            this.getView().getModel().setProperty("/lstTipoFor", data.lstTipoFor);*/

            //para la jerarquia descuento ZD13 @rhuapaya 07092014
            if (data.listJerarquia != null && data.listJerarquia.length > 0) {
                this.getView().getModel().setProperty("/listJerarquia", data.listJerarquia);                                  
            }
            //descuento especial ZD13 @rhuapaya 22/09/2014
            if (data.descespecial != null) {
                this.getView().getModel().setProperty("/descespecial", data.descespecial);
            }  
            if (data.descEspecialPorPedido != null) {
                this.getView().getModel().setProperty("/descEspecialPorPedido", data.descEspecialPorPedido);
            }  
            //condicion de facturacion
            if(pedido.CodTipoDoc == 'Z004') {
                if (data.planFacturacion == null || data.planFacturacion.length <= 0) {
                    var facturacion = this.getView().getModel().getProperty("/planFacturacion/0");
                    var fechaHoy = new Date();                                      
                    var fechaHoyString = moment(fechaHoy.getTime()).format('DD/MM/YYYY');                    
                    var pos = utilString.padLeft(1, 6);                  
                    facturacion.FPLTR = pos;
                    facturacion.FKDAT = fechaHoyString;
                    facturacion.AFDAT = fechaHoyString;
                    facturacion.FAKSP = "02";
                    facturacion.WAERS = "PEN";
                    facturacion.FAREG = "1";
                    facturacion.FKSAF = "A";
                    facturacion.TAXK1 = "I";
                    facturacion.FKARV = "ZFAC";
                    facturacion.MLSTN = "000000000000";                
                    this.getView().getModel().setProperty("/planFacturacion/0", facturacion);    
                } else {
                    for(var indice in data.planFacturacion) {
                        var facturacion = data.planFacturacion[indice];
                        if (facturacion.FKSAF == null || facturacion.FKSAF == "") {
                            facturacion.FKSAF = 'A'; }                        
                        facturacion.AFDAT = moment(facturacion.AFDAT).format('DD/MM/YYYY');
                        facturacion.FKDAT = moment(facturacion.FKDAT).format('DD/MM/YYYY');
                    }
                    this.getView().getModel().setProperty("/planFacturacion", data.planFacturacion);                                       
                }
            } 
            //this.getView().getModel().setProperty("/pedido/TipoForecast"," ");
            //this.getView().getModel().setProperty("/pedido/CondExp","03");
            //this.cambiarTipoDespachoMasivo();
            this.getView().getModel().refresh();
            this.sessionStorageDocNuevo();
        },
        crearDialogAvisoTipoDocumento: function(data) {  
        var self = this;      
            var dialog = new Dialog({
                title: 'Aviso',
                type: 'Message',
                content: new Text({ text: data.PedidoVisita42 + ",desea continuar?" }),
                beginButton: new Button({
                    text: 'Aceptar',
                    press: function () {
                        self.initDataProyecto(data, data.lstGrupoFor, data.lstTipoFor);  
                        dialog.close();
                    }
                }),
                endButton: new Button({
                    text: 'Cancel',
                    press: function () {
                        dialog.close();
                        sap.ui.getCore().byId("dlg_DialogDocNuevo").open();
                    }
                }),
                afterClose: function() {
                    dialog.destroy();
                }
            });

            dialog.open();
        },
        asignarDocumento: function(codTipoDocuemnto, referencia) {
            var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function(){
            //var result = documentosServices.crearDocumento(codTipoDocuemnto, referencia);
            documentosServices.crearDocumento(codTipoDocuemnto, referencia, function(result) {
                sap.ui.core.BusyIndicator.show(0);
                if (result.c === "s") {
                if (result.data.success) {
                    self.initDataDefault(result.data, codTipoDocuemnto);
                    sap.ui.getCore().byId("dlg_DialogDocNuevo").close();
                    self.validOpcionAmbiente();
                    self.sessionStorageDocNuevo();
                    MessageToast.show(codTipoDocuemnto);
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
            } else {
                sap.m.MessageToast.show(result.m, {duration: 3000});
            }
            sap.ui.core.BusyIndicator.hide();
            });
            //self.getView().byId("loadingControl").close();
},1000);
        },        
        initDataDefault: function (data, codigo) {   
            var fechaHoy = new Date();  
            var datosTienda = dataIni.person;            
            var id = fechaHoy.getTime();
            var fechaHoyString = moment(fechaHoy).format('DD/MM/YYYY');
            var fechaValidezString = (codigo == 'ZO01') ? moment(fechaHoy).add(7,'days').format('DD/MM/YYYY') : fechaHoyString;
            var condPago = (utilFunction.containsCode(codigo)) ? "E001": "E000";
            var strCondExp = '03';         
            if (datosTienda.OfVentas == '1080') { strCondExp = '01';  }
            if (datosTienda.CanalDist == "30") {  strCondExp = '01'; }

            var pedido = this.getView().getModel().getProperty("/pedido");
            pedido.id= id;
            //CodVendedor1: codVen, 
            //NomVendedor1: nomVen, 
            pedido.CodTipoDoc = codigo;
            //CodCliente: codCliEventual, 
            pedido.codigoCliente = datosTienda.ClienteEvent;            
            //nombreCliente: desEventual, 
            pedido.CodOficina = datosTienda.OfVentas;
            pedido.CondPago = condPago;
            pedido.OrgVentas = datosTienda.OrgVentas;
            pedido.CanalDist = datosTienda.CanalDist;
            pedido.TipoCambio = data.tipoCambio;
            pedido.CodVendedorWeb = data.CodVendedor1;
            pedido.NomVendedorWeb = data.NomVendedor1;
            pedido.FechaEntrega = fechaHoyString;                
            pedido.FechaFacturacion = fechaHoyString;
            pedido.CondExp = strCondExp;
            pedido.Moneda = "PEN";
            pedido.FechaPedido = fechaHoyString;
            pedido.FechaValidez = fechaValidezString;                                                
            pedido.CodGrupoVend = window.dataIni.person.GrpVend;
            pedido.GrupoForecast = "01";
            this.getView().getModel().setProperty("/pedido", pedido);

            var clienteEventual = this.getView().getModel().getProperty("/clienteEventual");
            clienteEventual.codigoCliente = datosTienda.ClienteEvent;
            clienteEventual.nombreCliente = datosTienda.E_NAME1;  
            this.getView().getModel().setProperty("/clienteEventual", clienteEventual);

            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            interlocutores.AG.Cliente.Codigo = datosTienda.ClienteEvent;
            interlocutores.RE.Cliente.Codigo = datosTienda.ClienteEvent;
            interlocutores.RG.Cliente.Codigo = datosTienda.ClienteEvent;
            interlocutores.WE.Cliente.Codigo = datosTienda.ClienteEvent;
            interlocutores.VE.Persona.CodPersona = datosTienda.PerNr;
            interlocutores.VE.Persona.Descripcion = datosTienda.Descripcion;
            this.getView().getModel().setProperty("/interlocutores", interlocutores);

            var listaGroup = utilFunction.getListGrupoFor(datosTienda.CanalDist, data.lstGrupoFor);
           this.getView().getModel().setProperty("/lstGrupoForAnt", data.lstGrupoFor);
            this.getView().getModel().setProperty("/lstGrupoFor", listaGroup);
            this.getView().getModel().setProperty("/lstTipoFor", data.lstTipoFor);
            //this.getView().getModel().refresh();
        },
        CambioTabFilter: function () {
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterSolicitante") {
                this.getView().byId("btnCopiarDatosInterlocutores").setIcon("sap-icon://action");
                this.getView().byId("btnCopiarDatosInterlocutores").setText("Copiar Datos");
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(true);
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Solicitante");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
                this.getView().byId("buscarClientePrincipal").setVisible(true);                
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDestinoMercancia") {
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Dest. Mcia.");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("buscarClientePrincipal").setVisible(true);    
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDestinoFactura") {
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Dest. Factura");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("buscarClientePrincipal").setVisible(true);    
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterResponsablePago") {
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Resp. Pago");
                this.getView().byId("btnBuscarInterlocutor").setVisible(true);
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("buscarClientePrincipal").setVisible(true);    
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterAgenciaTransporte") {
                //this.getView().byId("btnBuscarInterlocutor").setText("Buscar Ag. Transporte");
                this.getView().byId("btnBuscarInterlocutor").setVisible(false);
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("buscarClientePrincipal").setVisible(true);    
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterEncargadoComercial") {
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("btnBuscarInterlocutor").setVisible(false);
                this.getView().byId("buscarClientePrincipal").setVisible(true);    
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                this.getView().byId("btnCopiarDatosInterlocutores").setIcon("sap-icon://search");
                this.getView().byId("btnCopiarDatosInterlocutores").setText("Buscar Prof. 1");
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("btnBuscarInterlocutor").setText("Buscar Prof. 2");
                this.getView().byId("btnBuscarInterlocutor").setVisible(false);
                this.getView().byId("buscarClientePrincipal").setVisible(true);    
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDatosAdicionales") {
                this.getView().byId("btnCopiarDatosInterlocutores").setVisible(false);
                this.getView().byId("btnBuscarInterlocutor").setVisible(false);
                this.getView().byId("buscarClientePrincipal").setVisible(true);    
            }
        },
        /*         
         * Metodos de la vista de interlocutores
         */
        /** primer boton de busqueda en la vista de interlocutores **/
        onDeseleccionarListaResulCliente:function(){
            //////Deseleccionar Item Buscar Cliente//////////////////////////////////////////////////////////////////////////////////
                var itemSeleccionado = sap.ui.getCore().byId("resultadoListaCliente").getItems()[0];
                sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,true);
                sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,false);
                ////////////////////////////////////////////////////////////////////////////////////////
        },
        onBtnBuscarAgTransporteCodigo:function(){
            this.onDeseleccionarListaResulCliente();
            var interlocutor = this.getView().getModel().getProperty("/interlocutores/Z3/Cliente");
            var tipoInterlocutor = "Z3";
                this.getView().getModel().setProperty("/busquedaCliente/tipoInterlocutor", tipoInterlocutor);
                this.getView().getModel().setProperty("/busquedaCliente/dniRuc", interlocutor.Codigo);
                this.onDocNuevoBuscarClienteAccion();
        },
        onBtnBuscarAgTransporteDescripcion:function(){
            this.onDeseleccionarListaResulCliente();
            var interlocutor = this.getView().getModel().getProperty("/interlocutores/Z3/Cliente");
            var tipoInterlocutor = "Z3";
                this.getView().getModel().setProperty("/busquedaCliente/tipoInterlocutor", tipoInterlocutor);
                this.getView().getModel().setProperty("/busquedaCliente/razonSocial", interlocutor.Descripcion);
                this.onDocNuevoBuscarClienteAccion();
        },
        onBuscarInterlocutores: function () {
            /*if(this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length!=7 && this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length!=8 && this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length!=9 && this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length!=11){
                sap.ui.getCore().byId("txt_aviso_general").setText("Dato incorrecto, valor de DNI debe ser 8 digitos y RUC 11 digitos");
                sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
                return;
            }*/
            if(this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length!=8 && this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length!=11){
                sap.ui.getCore().byId("txt_aviso_general").setText("Dato incorrecto, valor de DNI debe ser 8 digitos y RUC 11 digitos");
                sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
                return;
            }
            var interlocutor = {};
            var profesional = {};
            var tipoInterlocutor = "";
            var tipoBusqueda = "";
            var copiarDatos = false;
            this.onDeseleccionarListaResulCliente();
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterSolicitante") {
                interlocutor = this.getView().getModel().getProperty("/interlocutores/AG/Cliente");
                tipoInterlocutor = "AG";
                copiarDatos = true;
                if (interlocutor.Descripcion != "") { tipoBusqueda = "Nom";}                
                if (interlocutor.Ruc != "") { tipoBusqueda = "Doc"; }             
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDestinoMercancia") {
                tipoInterlocutor = "WE";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterDestinoFactura") {
                tipoInterlocutor = "RE";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterResponsablePago") {
                tipoInterlocutor = "RG";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterAgenciaTransporte") {
                tipoInterlocutor = "Z3";
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                var profesional = this.getView().getModel().getProperty("/interlocutores/Z5/Persona");
                if (profesional.Descripcion != "") {
                    this.obtenerDatosProfesionalNombre(profesional.Descripcion, 2);
                } else {
                    MessageToast.show("Ingresar Nombre del Profesional");
                }
            }

            //invocar popup de busqueda
            if (jQuery.isEmptyObject(interlocutor) && tipoInterlocutor != "") {//busqueda de los inter: WE, RE, RG, Z3
                this.getView().getModel().setProperty("/busquedaCliente/tipoInterlocutor", tipoInterlocutor);
                sap.ui.getCore().byId("dlg_DocNuevobuscarCliente").open();
            } else if (!jQuery.isEmptyObject(interlocutor) && (interlocutor.Descripcion != "" || interlocutor.Ruc != "")) {//busqueda del inter: AG
                if (tipoBusqueda === "Doc") {
                    this.obtenerDatosInterlocutorAgDni(interlocutor);
                }
                if (tipoBusqueda === "Nom") {
                    this.obtenerDatosInterlocutorAgNombre(interlocutor, tipoInterlocutor);
                }
            } else {
                if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                
            }else{
                MessageToast.show("Ingresar datos solicitados");
            }
            }
            this.sessionStorageDocNuevo();
        },
        /** segundo boton de busqueda en la vista de interlocutores **/
        onCopiarDatosInterlocutores: function () {
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterSolicitante") {
                this.registrarDatosInterlocutores();
                    var direcAG = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/CodigoPostal");
                    this.getView().getModel().setProperty("/cliente/CodigoPostal", direcAG);  
                sap.ui.getCore().byId("dlg_MensajeAvisoCopiarDatos").open();
            }
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                var profesional = this.getView().getModel().getProperty("/interlocutores/Z2/Persona");
                if (profesional.Descripcion != "") {
                    this.obtenerDatosProfesionalNombre(profesional.Descripcion, 1);
                } else {
                    MessageToast.show("Ingresar Nombre del Profesional");
                }
            }
            this.sessionStorageDocNuevo();
        },        
        /** boton principal de la buscar Cliente (ubicado en el el menu)**/
        onDocNuevoBuscarCliente: function () {
            this.getView().getModel().setProperty("/busquedaCliente/tipoInterlocutor", "AG");
            this.getView().getModel().setProperty("/busquedaCliente/copiarDatos", true);
            sap.ui.getCore().byId("dlg_DocNuevobuscarCliente").open();
            this.sessionStorageDocNuevo();
        },        
        //funcion de  presionar boton buscar cliente desde el popup (Dialog)
         limpiarBuscarCliente:function(){
           sap.ui.getCore().byId("txt_ruc_cliente_busqueda").setValue(""); 
           sap.ui.getCore().byId("txt_nombre_cliente_busqueda").setValue(""); 
           this.sessionStorageDocNuevo();
        },
        onDocNuevoBuscarClienteAccion: function () {
            var busqueda = this.getView().getModel().getProperty("/busquedaCliente");

            if (busqueda.dniRuc != "" || busqueda.razonSocial != "") {
                    var self = this;
                    sap.ui.core.BusyIndicator.show(0);
                    setTimeout(function () {
                        //var result = clienteServices.buscarCliente(busqueda.dniRuc, busqueda.razonSocial);
                        clienteServices.buscarCliente(busqueda.dniRuc, busqueda.razonSocial, function(result) {
                        sap.ui.core.BusyIndicator.show(0);
                        if (result.c === "s") {
                            if (result.data.success) {
                                sap.ui.getCore().byId("dlg_DocNuevobuscarCliente_resultado").open();
                                self.agregarOpcionBusquedaClientes(result.data.lstClientes, busqueda.tipoInterlocutor, busqueda.copiarDatos);
                                self.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
                                self.limpiarBuscarCliente();
                                self.getView().getModel().refresh();
                                sap.ui.core.BusyIndicator.hide();
                            } else {
                                sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                                sap.ui.core.BusyIndicator.hide();
                            }
                        } else {
                            sap.m.MessageToast.show(result.m, {duration: 3000});
                            sap.ui.core.BusyIndicator.hide();
                        }
                        sap.ui.core.BusyIndicator.hide();
                    });
                    }, 1000);
                
            } else {
                sap.m.MessageToast.show('Ingrese RUC ó Razón social', {duration: 1000});
                return;
            }
            this.sessionStorageDocNuevo();
        },
        /** metodos de selecionar datos del popup **/
        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaCliente: function (evt) {
            var cliente = evt.getSource().getSelectedItem().getBindingContext().getObject();            
            sap.ui.getCore().byId("dlg_DocNuevobuscarCliente_resultado").close();
            if(cliente.copiarDatos) {
                this.obtenerDatosInterlocutorCliente(cliente.codigo);
            } else {
                this.obtenerDatosInterlocutorFuncion(cliente.codigo, cliente.tipoInterlocutor);
            } 
            this.sessionStorageDocNuevo();                   
        },
        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaClienteLista: function (evt) {
            var cliente = evt.getSource().getSelectedItem().getBindingContext().getObject();
            sap.ui.getCore().byId("dlg_DocNuevobuscarClienteLista_resultado").close();
            this.obtenerDatosInterlocutorNombre(cliente.CodPersona, cliente.tipoInterlocutor);
            this.sessionStorageDocNuevo();
        },        
        seleccionaProfesional1: function (evt) {
            var profesional = evt.getSource().getSelectedItem().getBindingContext().getObject();
            if (profesional.ubicacion === 1) {
                this.getView().getModel().setProperty("/interlocutores/Z2/Persona/CodPersona", profesional.codigo);
                this.getView().getModel().setProperty("/interlocutores/Z2/Persona/Descripcion", profesional.nombrecliente);
            }
            if (profesional.ubicacion === 2) {
                this.getView().getModel().setProperty("/interlocutores/Z5/Persona/CodPersona", profesional.codigo);
                this.getView().getModel().setProperty("/interlocutores/Z5/Persona/Descripcion", profesional.nombrecliente);
            }
            this.getView().getModel().refresh();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional_resultado1").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional1").close();
            this.onLimpiarBuscarProfesional();
            this.sessionStorageDocNuevo();
        }, 
        seleccionaProfesional2: function (evt) {
            var profesional = evt.getSource().getSelectedItem().getBindingContext().getObject();
            if (profesional.ubicacion === 1) {
                this.getView().getModel().setProperty("/interlocutores/Z2/Persona/CodPersona", profesional.codigo);
                this.getView().getModel().setProperty("/interlocutores/Z2/Persona/Descripcion", profesional.nombrecliente);
            }
            if (profesional.ubicacion === 2) {
                this.getView().getModel().setProperty("/interlocutores/Z5/Persona/CodPersona", profesional.codigo);
                this.getView().getModel().setProperty("/interlocutores/Z5/Persona/Descripcion", profesional.nombrecliente);
            }
            this.getView().getModel().refresh();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional_resultado2").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional2").close();
            this.onLimpiarBuscarProfesional();
            this.sessionStorageDocNuevo();
        },                         
        /** metodos de funcionalidad **/
        obtenerDatosInterlocutorCliente: function (codigoClienteA) {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var canal = self.getView().getModel().getProperty("/pedido/CanalDist");
                var codigoCliente = self.getView().getModel().getProperty("/clienteEventual/codigoCliente");
                //var result = clienteServices.buscarClienteCodigo(codigoClienteA, codigoCliente, canal);                
                clienteServices.buscarClienteCodigo(codigoClienteA, codigoCliente, canal, function(result) {
                if (result.c == "s") {
                    //cliente eventual
                    var data = result.data;                    
                    var clienteEventual = new Object();
                    var nombreCliente = "";
                    var lstNombreCli = data.lstNombreCli;
                    for(var indice in lstNombreCli) {
                        if(lstNombreCli[indice].Descripcion != "") {
                            nombreCliente = lstNombreCli[indice].Descripcion;
                            break;
                        }                            
                    }
                    clienteEventual.codigoCliente = data.codigoCliente ;
                    clienteEventual.nombreCliente = nombreCliente;
                    clienteEventual.esEventual = data.Eventual;
                    self.getView().getModel().setProperty("/clienteEventual", clienteEventual);
                    //datos de cliente
                    var cliente = { "APMAT": "","APPAT": "","CODIG": "","Codigo": "","Ciudad": "","CodigoPostal": "",
                                    "DIREC": "","EDAD": "","RANGOED": "","FECNAC": "","GRAINS": "","NIVELSE" : "",
                                    "Mail": "","NOMBRE": "","Pais": "","Ruc": null,"PersonaFisica": false,"Eventual": false,  
                                    "SEXO": "","Telefono": "","TelefonoMovil": ""};
                    cliente.FECNAC = moment().format("DD/MM/YYYY");
                    cliente.EDAD = 0;
                    if(data.listCliPregResp) {
                        cliente.CODIG = data.RucCli;  
                        self.registrarDatosPreguntas(data.listCliPregResp);
                    } else {
                        if(data.RucCli != '') {
                            cliente.CODIG = data.RucCli;  
                        } else {}
                    }
                    self.getView().getModel().setProperty("/cliente", cliente);

                    var lstGrupoForFiltrado = utilFunction.getListGrupoFor(canal, data.lstGrupoFor);
                    self.getView().getModel().setProperty("/lstGrupoForAnt", data.lstGrupoFor);
                    self.getView().getModel().setProperty("/lstGrupoFor", lstGrupoForFiltrado);
                    self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                    self.getView().getModel().setProperty("/lstTipoFor", data.lstTipoFor);
                    ///////Grupo Forecast////////////////////////////////////////////////////////////
                    var grupo_for = lstGrupoForFiltrado[1].Codigo;
                    ///////Inicio Canal 10/////////////////////////////////////////////////////////////////
                    if(window.dataIni.person.CanalDist=='10'){
                                if(grupo_for!="01"){
                                    ///////Formateo Tipo Forecast///////////////////////
                                    var tipoFore = self.getView().getModel().getProperty("/lstTipoFor");
                                    var tipoForeFormateado = tipoFore.filter(function(el) {
                                         return el.Codigo != "00" && el.Codigo != "11";
                                    });
                                    self.getView().getModel().setProperty("/lstTipoFor", tipoForeFormateado);
                                    self.getView().getModel().setProperty("/pedido/TipoForecast"," ");
                                    self.getView().getModel().refresh();
                                    ////////////////////////////////////////////////////
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",true);
                                }else{
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                    self.getView().getModel().setProperty("/pedido/TipoForecast"," ");
                                }
                            }
                            ///////End Canal 10/////////////////////////////////////////////////////////////////
                            
                    ////////////////////////////////////////////////////////////////////////////////
                    //pedido
                    var pedido = self.getView().getModel().getProperty("/pedido");
                    if (!utilFunction.containsCode(pedido.CodTipoDoc)) {
                        pedido.CondPago = data.indiceCondicionesPago;
                    }
                    pedido.CondExp = data.CondExp;                    
                    pedido.codigoCliente = data.codigoCliente;                    
                    if(!jQuery.isEmptyObject(lstGrupoForFiltrado) && lstGrupoForFiltrado.length == 2) {
                        for(var indice in lstGrupoForFiltrado) {
                            if(lstGrupoForFiltrado[indice].Codigo != " ") {
                                pedido.GrupoForecast = lstGrupoForFiltrado[indice].Codigo;
                                break;
                            }
                        }                                        
                    } else {
                        pedido.GrupoForecast = "";
                    }                    
                    self.getView().getModel().setProperty("/pedido", pedido);
                    //interlocutores
                    var interlocutores = data.Interlocutores;
                    var interlocutoresMod = self.getView().getModel().getProperty("/interlocutores");
                    var cliente = null, tipoInterlocutor = null;
                    for (var indice in interlocutores) {
                        if (interlocutores[indice].Funcion === "AG" || interlocutores[indice].Funcion === "RE" || interlocutores[indice].Funcion === "RG" || interlocutores[indice].Funcion === "WE") {
                            cliente = interlocutores[indice].Cliente; 
                            tipoInterlocutor = interlocutores[indice].Funcion;
                            interlocutoresMod[tipoInterlocutor].Cliente.Codigo = cliente.Codigo;
                            interlocutoresMod[tipoInterlocutor].Cliente.Titulo= cliente.Titulo;       
                            interlocutoresMod[tipoInterlocutor].Cliente.CodigoPostal= cliente.CodigoPostal;
                            interlocutoresMod[tipoInterlocutor].Cliente.Pais= cliente.Pais;
                            interlocutoresMod[tipoInterlocutor].Cliente.Ciudad= cliente.Ciudad;
                            interlocutoresMod[tipoInterlocutor].Cliente.Distrito= cliente.Distrito;
                            interlocutoresMod[tipoInterlocutor].Cliente.Descripcion= cliente.Descripcion;
                            interlocutoresMod[tipoInterlocutor].Cliente.DireccionCompleta= cliente.DireccionCompleta;
                            interlocutoresMod[tipoInterlocutor].Cliente.Direccion= cliente.Direccion;
                            interlocutoresMod[tipoInterlocutor].Cliente.Mail= cliente.Mail;
                            interlocutoresMod[tipoInterlocutor].Cliente.Ruc= cliente.Ruc;
                            interlocutoresMod[tipoInterlocutor].Cliente.PersonaFisica= cliente.PersonaFisica;
                            interlocutoresMod[tipoInterlocutor].Cliente.Eventual= cliente.Eventual;
                            interlocutoresMod[tipoInterlocutor].Cliente.Telefono= cliente.Telefono;
                        }
                    }
                    self.getView().getModel().setProperty("/interlocutores",interlocutoresMod);
                    if (data.CodVendedor1 != "") {
                        var codVen = dataIni.person.PerNr;
                        var nomVen = dataIni.person.Descripcion;
                        var interVE = self.getView().getModel().getProperty("/interlocutores/VE");
                        var interV2 = self.getView().getModel().getProperty("/interlocutores/V2");
                        interVE.Persona.CodPersona =  data.CodVendedor1;
                        interVE.Persona.Descripcion =  data.NomVendedor1;  
                        if (interV2.Persona.CodPersona == "") {
                                //entender q hace
                            } else {
                                interV2.Persona.CodPersona = "";
                                interV2.Persona.Descripcion = "";
                            }                          
                    }
                    self.getView().getModel().setProperty("/busquedaCliente/copiarDatos", false);
                    /////Copiar Dni en datos adicionale al buscar Cliente/////////////////////////////////////
                    self.getView().getModel().setProperty("/cliente/Ruc",interlocutoresMod.AG.Cliente.Ruc)
                    //////////////////////////////////////////////////////////////////////////////////////////
                    self.getView().getModel().refresh();
                    sap.ui.getCore().byId("dlg_DocNuevobuscarCliente").close();
                    MessageToast.show("Solicitante Encontrado");
                } else {
                    var rpta = (result.data != null) ? result.data.errors.reason : "Error de sistema";
                    sap.m.MessageToast.show(rpta, {duration: 3000});
                }
                
                sap.ui.core.BusyIndicator.hide();
                ///////Inicio Canal 20/////////////////////////////////////////////////////////////////
                            if(window.dataIni.person.CanalDist=='20'){
                                if(window.dataIni.person.OfVentas=="1040"){
                                    if(lstGrupoForFiltrado.length>2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }else if(lstGrupoForFiltrado.length==2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                }
                                if(window.dataIni.person.OfVentas=="1130"){
                                    if(lstGrupoForFiltrado.length>2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[2].Codigo);
                                    }else if(lstGrupoForFiltrado.length==2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                }
                            }
                            ///////End Canal 20////////////////////////////////////////////////////////////////////////
                            ///////Inicio Canal 30/////////////////////////////////////////////////////////////////
                            if(window.dataIni.person.CanalDist=='30'){
                                    self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    //self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    //self.getView().getModel().setProperty("/TipoForeAction",false);
                                
                            }
                            ///////End Canal 30////////////////////////////////////////////////////////////////////////

                //Inicio Bloquear campos Interlocutores//
                self.getView().getModel().setProperty("/pedido/validInterlocutores",false);
                //End Bloquear campos Interlocutores//
                //////Deseleccionar Item Buscar Cliente//////////////////////////////////////////////////////////////////////////////////
                var itemSeleccionado = sap.ui.getCore().byId("resultadoListaCliente").getItems()[0];
                sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,true);
                sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,false);
                self.tabDetailDefault();
                var itemDatosSelect = self.getView().byId("listPanelDatos").getItems()[1];
                self.getView().byId("listPanelDatos").setSelectedItem(itemDatosSelect,true);
                self.byId("SplitAppId").to(self.createId("pagDocNuevo_datos_detail2"));
                self.CambioTabFilter();
                self.sessionStorageDocNuevo();
                ////////////////////////////////////////////////////////////////////////////////////////
                });
            }, 1000);
        }, 
        obtenerDatosInterlocutorFuncion: function (codigoClienteA, tipoInterlocutor) {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var canal = self.getView().getModel().getProperty("/pedido/CanalDist");
                var codigoCliente = self.getView().getModel().getProperty("/clienteEventual/codigoCliente");
                //var result = clienteServices.buscarClienteCodigo(codigoClienteA, codigoCliente, canal);        
                clienteServices.buscarClienteCodigo(codigoClienteA, codigoCliente, canal, function(result) {
                if (result.c == "s") {
                    var interlocutores = result.data.Interlocutores;
                    var interlocutorMod = self.getView().getModel().getProperty("/interlocutores/" + tipoInterlocutor);
                    var tipoInterlocutorValido = (tipoInterlocutor == "Z3")? "AG": tipoInterlocutor;
                    var cliente = null;
                    for (var indice in interlocutores) {
                        if (interlocutores[indice].Funcion == tipoInterlocutorValido) {
                            cliente = interlocutores[indice].Cliente;
                            interlocutorMod.Cliente.Codigo= cliente.Codigo;  
                            interlocutorMod.Cliente.Titulo= cliente.Titulo;       
                            interlocutorMod.Cliente.CodigoPostal= cliente.CodigoPostal;
                            interlocutorMod.Cliente.Pais= cliente.Pais;
                            interlocutorMod.Cliente.Ciudad= cliente.Ciudad;
                            interlocutorMod.Cliente.Distrito= cliente.Distrito;
                            interlocutorMod.Cliente.Descripcion= cliente.Descripcion;
                            interlocutorMod.Cliente.DireccionCompleta= cliente.DireccionCompleta;
                            interlocutorMod.Cliente.Direccion= cliente.Direccion;
                            interlocutorMod.Cliente.Mail= cliente.Mail;
                            interlocutorMod.Cliente.Ruc= cliente.Ruc;
                            interlocutorMod.Cliente.PersonaFisica= cliente.PersonaFisica;
                            interlocutorMod.Cliente.Eventual= cliente.Eventual;
                            interlocutorMod.Cliente.Telefono= cliente.Telefono;
                            break;
                        }
                    }
                    self.getView().getModel().getProperty("/interlocutores/" + tipoInterlocutor,interlocutorMod);
                    self.getView().getModel().refresh();
                    sap.ui.getCore().byId("dlg_DocNuevobuscarCliente").close();
                    //////Deseleccionar Item Buscar Cliente//////////////////////////////////////////////////////////////////////////////////
                    var itemSeleccionado = sap.ui.getCore().byId("resultadoListaCliente").getItems()[0];
                    sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,true);
                    sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,false);
                    self.tabDetailDefault();
                    var itemDatosSelect = self.getView().byId("listPanelDatos").getItems()[1];
                    self.getView().byId("listPanelDatos").setSelectedItem(itemDatosSelect,true);
                    self.byId("SplitAppId").to(self.createId("pagDocNuevo_datos_detail2"));
                    self.CambioTabFilter();
                    ////////////////////////////////////////////////////////////////////////////////////////
                    MessageToast.show("Solicitante Encontrado");
                } else {
                    var rpta = (result.data != null) ? result.data.errors.reason : "Error de sistema";
                    sap.m.MessageToast.show(rpta, {duration: 3000});
                }
                self.sessionStorageDocNuevo();
                sap.ui.core.BusyIndicator.hide();
            });
            }, 1000);
        },        
        obtenerDatosInterlocutorNombre: function (codigoCliente, tipoInterlocutor) {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var dataInit = self.getView().getModel().getProperty("/dataIni"); 
                var busquedaDTO = new Object();         
                busquedaDTO.dni = codigoCliente;
                busquedaDTO.codigo = self.getView().getModel().getProperty("/clienteEventual/codigoCliente");                    
                busquedaDTO.ruc = codigoCliente;
                busquedaDTO.direccion = "";
                busquedaDTO.descripcion = "";
                busquedaDTO.codigoPostal = "";
                busquedaDTO.telefono = "";
                busquedaDTO.mail = "";
                busquedaDTO.userId = dataInit.person.Uname;
                busquedaDTO.pwdId = dataInit.person.Passwd; 
                busquedaDTO.id = dataInit.person.Id; 
                busquedaDTO.orgVentas = dataInit.person.OrgVentas; 
                //var result = clienteServices.buscarClienteNumeroDocumento(busquedaDTO); 
                clienteServices.buscarClienteNumeroDocumento(busquedaDTO, function(result) { 
                sap.ui.core.BusyIndicator.show(0);

                if (!result.data.success) {                    
                    var interlocutorAgMod = {"APMAT": "","APPAT": "","CODIG": "","Codigo": "","Ciudad": "","CodigoPostal": "",
                            "DIREC": "","EDAD": "","RANGOED": "","FECNAC": "","GRAINS": "","NIVELSE" : "",
                            "Mail": "","NOMBRE": "","Pais": "","Ruc": null,"PersonaFisica": false,"Eventual": false,  
                            "SEXO": "","Telefono": "","TelefonoMovil": null};
                    interlocutorAgMod.CODIG = busquedaDTO.codigo;
                    interlocutorAgMod.Codigo = busquedaDTO.codigo;
                    interlocutorAgMod.Ruc = codigoCliente;
                    var interlocutorWeMod = jQuery.extend({}, interlocutorAgMod);
                    var interlocutorReMod = jQuery.extend({}, interlocutorAgMod);
                    var interlocutorRgMod = jQuery.extend({}, interlocutorAgMod);
                    self.getView().getModel().setProperty("/interlocutores/AG/Cliente",interlocutorAgMod);
                    self.getView().getModel().setProperty("/interlocutores/WE/Cliente",interlocutorWeMod);
                    self.getView().getModel().setProperty("/interlocutores/RE/Cliente",interlocutorReMod);
                    self.getView().getModel().setProperty("/interlocutores/RG/Cliente",interlocutorRgMod);
                    var cliente = { "APMAT": "","APPAT": "","CODIG": "","Codigo": "","Ciudad": "","CodigoPostal": "",
                                    "DIREC": "","EDAD": "","RANGOED": "","FECNAC": "","GRAINS": "","NIVELSE" : "",
                                    "Mail": "","NOMBRE": "","Pais": "","Ruc": null,"PersonaFisica": false,"Eventual": false,  
                                    "SEXO": "","Telefono": "","TelefonoMovil": ""};
                    cliente.CODIG = codigoCliente;
                    self.getView().getModel().setProperty("/cliente",cliente);
                    var preguntas = { "1": {"CODP": "1","CODR": ""},"10": { "CODP": "10","CODR": ""},
                                          "15": {"CODP": "15","CODR": ""},"20": {"CODP": "20","CODR": ""},
                                          "25": {"CODP": "25","CODR": ""},"35": {"CODP": "35","CODR": ""} };
                    self.getView().getModel().setProperty("/preguntas", preguntas);  
                    self.getView().getModel().refresh();                  
                    var rpta = (result.data != null) ? result.data.errors.reason : "Error de sistema";
                    sap.m.MessageToast.show(rpta, {duration: 3000});

                } else if(result.c == "s") {
                    var cliente = result.data.objCliente;
                    //interlocutor AG
                    var descripcion = (cliente.APPAT != null) ?  cliente.NOMBRE + " " + cliente.APPAT + " " + cliente.APMAT : "";
                    var ubigeo = self.getView().getModel().getProperty("/dataIni/lstZipCodes"); 
                    var ciudad = jQuery.grep(ubigeo, function(item, i){ 
                          return (item.Codigo == cliente.CodigoPostal) ;
                        });
                    var interlocutorAG = self.getView().getModel().getProperty("/interlocutores/AG");
                    interlocutorAG.Cliente.Ruc= (cliente.CODIG != null) ? cliente.CODIG : "";
                    interlocutorAG.Cliente.Descripcion= (descripcion != null) ? descripcion : "";
                    interlocutorAG.Cliente.DireccionCompleta= (cliente.DireccionCompleta != null) ? cliente.DireccionCompleta : "";
                    interlocutorAG.Cliente.Direccion= (cliente.DIREC != null) ? cliente.DIREC : "";                  
                    interlocutorAG.Cliente.CodigoPostal= (cliente.CodigoPostal != null) ? cliente.CodigoPostal : "";
                    interlocutorAG.Cliente.Ciudad= ciudad.Descripcion;  
                    interlocutorAG.Cliente.Distrito= ciudad.Descripcion;             
                    interlocutorAG.Cliente.Mail= (cliente.Mail != null) ? cliente.Mail : "";                    
                    interlocutorAG.Cliente.Telefono= (cliente.Telefono != null) ? cliente.Telefono : "";
                    self.getView().getModel().setProperty("/interlocutores/AG", interlocutorAG);
                    self.registrarDatosInterlocutores();
                    //cliente
                    self.registrarDatosCliente(cliente,"",result.data.listCliPregResp);
                    self.getView().getModel().refresh();
                    sap.ui.getCore().byId("dlg_DocNuevobuscarCliente").close();
                } else  {
                    var rpta = (result.data != null) ? result.data.errors.reason : "Error de sistema";
                    sap.m.MessageToast.show(rpta, {duration: 3000});
                }   
                self.sessionStorageDocNuevo();
                sap.ui.core.BusyIndicator.hide();
            });
            }, 1000);
        },
        borrarInterlocutores:function(){ 
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var cliente = this.getView().getModel().getProperty("/interlocutores/AG/Cliente");
            for (var indice in interlocutores) {
                if (interlocutores[indice].Funcion === "RE" || interlocutores[indice].Funcion === "RG" || interlocutores[indice].Funcion === "WE" || interlocutores[indice].Funcion === "AG") {
                    if (interlocutores[indice].Funcion === "RG") {
                        interlocutores[indice].Cliente.Ruc = cliente.Ruc;
                    }                
                    interlocutores[indice].Cliente.CodigoPostal = "";
                    interlocutores[indice].Cliente.Ciudad = "";
                    interlocutores[indice].Cliente.Distrito = "";
                    interlocutores[indice].Cliente.Descripcion = "";
                    interlocutores[indice].Cliente.DireccionCompleta = "";
                    interlocutores[indice].Cliente.Direccion = "";
                    interlocutores[indice].Cliente.Mail = "";                    
                    interlocutores[indice].Cliente.PersonaFisica = false;
                    interlocutores[indice].Cliente.Eventual = false;
                    interlocutores[indice].Cliente.Telefono = ""; 
                }
            }
            this.getView().getModel().setProperty("/interlocutores", interlocutores);

            this.getView().getModel().setProperty("/cliente/APPAT", "");
            this.getView().getModel().setProperty("/cliente/APMAT", "");
            this.getView().getModel().setProperty("/cliente/NOMBRE", "");
            this.getView().getModel().setProperty("/cliente/SEXO", "");
            this.getView().getModel().setProperty("/cliente/CodigoPostal", "");
            
            this.getView().getModel().setProperty("/interlocutores/WE/Cliente/TelefonoMovil","");

            this.getView().getModel().setProperty("/preguntas/1/CODR", "");
            this.getView().getModel().setProperty("/preguntas/10/CODR", "");
            this.getView().getModel().setProperty("/preguntas/15/CODR", "");
            this.getView().getModel().setProperty("/preguntas/20/CODR", "");
            this.getView().getModel().setProperty("/preguntas/25/CODR", "");
            this.getView().getModel().setProperty("/preguntas/35/CODR", "");

            this.getView().getModel().setProperty("/clienteEventual/nombreCliente", window.dataIni.person.E_NAME1);
            this.getView().getModel().setProperty("/clienteEventual/codigoCliente", window.dataIni.person.ClienteEvent);

            this.getView().getModel().refresh();          
        },
        obtenerDatosInterlocutorAgDni: function (solicitante) {
            if(utilString.isNumeric(solicitante.Ruc)){
                var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
            var busquedaDTO = new Object();         
            busquedaDTO.canal = self.getView().getModel().getProperty("/pedido/CanalDist");
            busquedaDTO.codOficina = self.getView().getModel().getProperty("/pedido/CodOficina");
            busquedaDTO.codcliente = self.getView().getModel().getProperty("/clienteEventual/codigoCliente");                    
            busquedaDTO.descripcion = solicitante.Descripcion;
            busquedaDTO.direccion = solicitante.Direccion;
            busquedaDTO.distrito = solicitante.CodigoPostal;
            busquedaDTO.telefono = solicitante.Telefono;
            busquedaDTO.mail = solicitante.Mail;
            busquedaDTO.esRuc = utilString.validateIsRuc(solicitante.Ruc);
            busquedaDTO.ruc = solicitante.Ruc;
            busquedaDTO.dni = solicitante.Ruc;
            busquedaDTO.Codigo = busquedaDTO.codcliente;  
                //var result = clienteServices.buscarSolicitante(busquedaDTO);
                clienteServices.buscarSolicitante(busquedaDTO, function(result) { 
                sap.ui.core.BusyIndicator.show(0);

                var cliente = result.data.objCliente;
                if (result.c === "s" && !jQuery.isEmptyObject(cliente)) {
                    var lstGrupoForFiltrado = utilFunction.getListGrupoFor(busquedaDTO.canal, result.data.lstGrupoFor);
                    self.getView().getModel().setProperty("/lstGrupoForAnt", result.data.lstGrupoFor);

                    // Cambiado  ** self.getView().getModel().setProperty("/lstGrupoFor", lstGrupoForFiltrado);
                    self.getView().getModel().setProperty("/lstTipoFor", result.data.lstTipoFor);
                    self.getView().getModel().refresh();    
                        //////////////////////////////////////////////////////////////////////////////
                        //var validCliente = self.validarCliente(solicitante.codigo);
                            self.getView().getModel().setProperty("/lstGrupoFor",lstGrupoForFiltrado);
                            var grupo_for=lstGrupoForFiltrado[1].Codigo;
                            self.getView().getModel().setProperty("/pedido/GrupoForecast",grupo_for);

                            ///////Inicio Canal 10/////////////////////////////////////////////////////////////////
                    if(busquedaDTO.canal=='10' || busquedaDTO.canal=='40'){
                    //if(window.dataIni.person.CanalDist=='10'){
                                if(grupo_for!="01"){
                                    ///////Formateo Tipo Forecast///////////////////////
                                    var tipoFore = self.getView().getModel().getProperty("/lstTipoFor");
                                    var tipoForeFormateado = tipoFore.filter(function(el) {
                                         return el.Codigo != "00" && el.Codigo != "11";
                                    });
                                    self.getView().getModel().setProperty("/lstTipoFor", tipoForeFormateado);
                                    self.getView().getModel().setProperty("/pedido/TipoForecast"," ");
                                    self.getView().getModel().refresh();
                                    ////////////////////////////////////////////////////
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",true);
                                }else{
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                    self.getView().getModel().setProperty("/pedido/TipoForecast"," ");
                                }
                            }
                            ///////End Canal 10/////////////////////////////////////////////////////////////////
                        //////////////////////////////////////////////////////////////////////////////                    
                    //pedido
                    var pedido = self.getView().getModel().getProperty("/pedido");
                    if(lstGrupoForFiltrado.length == 0) {
                        pedido.GrupoForecast = "";
                    }
                    //interlocutor AG
                    var descripcion = (busquedaDTO.esRuc != "") ? cliente.NOMBRE  : cliente.NOMBRE + " " + cliente.APPAT + " " + cliente.APMAT;
                    var ubigeo = self.getView().getModel().getProperty("/dataIni/lstZipCodes"); 
                    var ciudad = jQuery.grep(ubigeo, function(item, i){ 
                          return (item.Codigo == cliente.CodigoPostal) ;
                        });
                    var interlocutorAG = self.getView().getModel().getProperty("/interlocutores/AG");
                    interlocutorAG.Cliente.Ruc= (cliente.CODIG != null) ? cliente.CODIG : "";
                    interlocutorAG.Cliente.Descripcion= (descripcion != null) ? descripcion : "";
                    interlocutorAG.Cliente.DireccionCompleta= (cliente.DireccionCompleta != null) ? cliente.DireccionCompleta : "";
                    interlocutorAG.Cliente.Direccion= (cliente.DIREC != null) ? cliente.DIREC : "";                  
                    interlocutorAG.Cliente.CodigoPostal= (cliente.CodigoPostal != null) ? cliente.CodigoPostal : "";
                    interlocutorAG.Cliente.Ciudad= ciudad.Descripcion;  
                    interlocutorAG.Cliente.Distrito= ciudad.Descripcion;             
                    interlocutorAG.Cliente.Mail= (cliente.Mail != null) ? cliente.Mail : "";                    
                    interlocutorAG.Cliente.Telefono= (cliente.Telefono != null) ? cliente.Telefono : "";
                    self.getView().getModel().setProperty("/interlocutores/AG", interlocutorAG);
                    self.getView().getModel().setProperty("/clienteEventual/nombreCliente", interlocutorAG.Cliente.Descripcion);
                    self.registrarDatosInterlocutores();
                    //cliente
                    self.registrarDatosCliente(cliente,busquedaDTO.esRuc,result.data.listCliPregResp);
                    self.getView().getModel().refresh();
                    MessageToast.show("Solicitante Encontrado");
                    ///////Inicio Canal 20/////////////////////////////////////////////////////////////////
                            if(busquedaDTO.canal=='20'){
                            //if(window.dataIni.person.CanalDist=='20'){
                                if(busquedaDTO.codOficina=="1040"){
                                //if(window.dataIni.person.OfVentas=="1040"){
                                    if(lstGrupoForFiltrado.length>2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }else if(lstGrupoForFiltrado.length==2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                }
                                if(busquedaDTO.codOficina=="1130"){
                                //if(window.dataIni.person.OfVentas=="1130"){
                                    if(lstGrupoForFiltrado.length>2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[2].Codigo);
                                    }else if(lstGrupoForFiltrado.length==2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                }
                            }
                            ///////End Canal 20////////////////////////////////////////////////////////////////////////
                            ///////Inicio Canal 30/////////////////////////////////////////////////////////////////
                            if(busquedaDTO.canal=='30'){
                                    self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    //self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    //self.getView().getModel().setProperty("/TipoForeAction",false);
                                
                            }
                            ///////End Canal 30////////////////////////////////////////////////////////////////////////
                //Inicio Bloquear campos Interlocutores//
                    if(window.dataIni.person.ClienteEvent != self.getView().getModel().getProperty("/clienteEventual/codigoCliente")){
                        self.getView().getModel().setProperty("/pedido/validInterlocutores",false);
                    }else{
                        self.getView().getModel().setProperty("/pedido/validInterlocutores",true);
                    }
                //End Bloquear campos Interlocutores//    
                //////Deseleccionar Item Buscar Cliente//////////////////////////////////////////////////////////////////////////////////
                var itemSeleccionado = sap.ui.getCore().byId("resultadoListaCliente").getItems()[0];
                sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,true);
                sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,false);
                ////////////////////////////////////////////////////////////////////////////////////////
                } else {
                    self.borrarInterlocutores();
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
                self.sessionStorageDocNuevo();
                sap.ui.core.BusyIndicator.hide();
            });
                    }, 1000);
            }else{
                MessageToast.show("Ingrese solo números en DNI / RUC");
            }
            
        },
        obtenerDatosInterlocutorAgDni1: function (solicitante) {
            if(utilString.isNumeric(solicitante.Ruc)){
                var self = this;
            var busquedaDTO = new Object();         
            busquedaDTO.canal = self.getView().getModel().getProperty("/pedido/CanalDist");
            busquedaDTO.codOficina = self.getView().getModel().getProperty("/pedido/CodOficina");
            busquedaDTO.codcliente = self.getView().getModel().getProperty("/clienteEventual/codigoCliente");                    
            busquedaDTO.descripcion = solicitante.Descripcion;
            busquedaDTO.direccion = solicitante.Direccion;
            busquedaDTO.distrito = solicitante.CodigoPostal;
            busquedaDTO.telefono = solicitante.Telefono;
            busquedaDTO.mail = solicitante.Mail;
            busquedaDTO.esRuc = utilString.validateIsRuc(solicitante.Ruc);
            busquedaDTO.ruc = solicitante.Ruc;
            busquedaDTO.dni = solicitante.Ruc;
            busquedaDTO.Codigo = busquedaDTO.codcliente;  
                //var result = clienteServices.buscarSolicitante(busquedaDTO);
                var result = clienteServices.buscarSolicitante1(busquedaDTO);

                var cliente = result.data.objCliente;
                if (result.c === "s" && !jQuery.isEmptyObject(cliente)) {
                    var lstGrupoForFiltrado = utilFunction.getListGrupoFor(busquedaDTO.canal, result.data.lstGrupoFor);
                    self.getView().getModel().setProperty("/lstGrupoForAnt", result.data.lstGrupoFor);

                    // Cambiado  ** self.getView().getModel().setProperty("/lstGrupoFor", lstGrupoForFiltrado);
                    self.getView().getModel().setProperty("/lstTipoFor", result.data.lstTipoFor);
                    self.getView().getModel().refresh();    
                        //////////////////////////////////////////////////////////////////////////////
                        //var validCliente = self.validarCliente(solicitante.codigo);
                            self.getView().getModel().setProperty("/lstGrupoFor",lstGrupoForFiltrado);
                            var grupo_for=lstGrupoForFiltrado[1].Codigo;
                            if(window.dataIni.person.CanalDist=='30'){

                            }else{
                                self.getView().getModel().setProperty("/pedido/GrupoForecast",grupo_for);
                            }

                            ///////Inicio Canal 10/////////////////////////////////////////////////////////////////
                    if(busquedaDTO.canal=='10'){
                    //if(window.dataIni.person.CanalDist=='10'){
                                if(grupo_for!="01"){
                                    ///////Formateo Tipo Forecast///////////////////////
                                    var tipoFore = self.getView().getModel().getProperty("/lstTipoFor");
                                    var tipoForeFormateado = tipoFore.filter(function(el) {
                                         return el.Codigo != "00" && el.Codigo != "11";
                                    });
                                    self.getView().getModel().setProperty("/lstTipoFor", tipoForeFormateado);
                                    /*if(self.getView().getModel().getProperty("/pedido/TipoForecast")=="01"){
                                    self.getView().getModel().setProperty("/pedido/TipoForecast"," ");
                                    }*/
                                    self.getView().getModel().refresh();
                                    ////////////////////////////////////////////////////
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",true);
                                }else{
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                    if(self.getView().getModel().getProperty("/pedido/TipoForecast")=="01"){
                                    self.getView().getModel().setProperty("/pedido/TipoForecast"," ");
                                    }
                                }
                            }
                            ///////End Canal 10/////////////////////////////////////////////////////////////////
                        //////////////////////////////////////////////////////////////////////////////                    
                    //pedido
                    var pedido = self.getView().getModel().getProperty("/pedido");
                    if(lstGrupoForFiltrado.length == 0) {
                        pedido.GrupoForecast = "";
                    }
                    //interlocutor AG
                    var descripcion = (busquedaDTO.esRuc != "") ? cliente.NOMBRE  : cliente.NOMBRE + " " + cliente.APPAT + " " + cliente.APMAT;
                    var ubigeo = self.getView().getModel().getProperty("/dataIni/lstZipCodes"); 
                    var ciudad = jQuery.grep(ubigeo, function(item, i){ 
                          return (item.Codigo == cliente.CodigoPostal) ;
                        });
                    var interlocutorAG = self.getView().getModel().getProperty("/interlocutores/AG");
                    interlocutorAG.Cliente.Ruc= (cliente.CODIG != null) ? cliente.CODIG : "";
                    interlocutorAG.Cliente.Descripcion= (descripcion != null) ? descripcion : "";
                    interlocutorAG.Cliente.DireccionCompleta= (cliente.DireccionCompleta != null) ? cliente.DireccionCompleta : "";
                    interlocutorAG.Cliente.Direccion= (cliente.DIREC != null) ? cliente.DIREC : "";                  
                    interlocutorAG.Cliente.CodigoPostal= (cliente.CodigoPostal != null) ? cliente.CodigoPostal : "";
                    interlocutorAG.Cliente.Ciudad= ciudad.Descripcion;  
                    interlocutorAG.Cliente.Distrito= ciudad.Descripcion;             
                    interlocutorAG.Cliente.Mail= (cliente.Mail != null) ? cliente.Mail : "";                    
                    interlocutorAG.Cliente.Telefono= (cliente.Telefono != null) ? cliente.Telefono : "";
                    self.getView().getModel().setProperty("/interlocutores/AG", interlocutorAG);
                    self.getView().getModel().setProperty("/clienteEventual/nombreCliente", interlocutorAG.Cliente.Descripcion);
                    //self.registrarDatosInterlocutores();
                    //cliente
                    //self.registrarDatosCliente(cliente,busquedaDTO.esRuc,result.data.listCliPregResp);
                    self.getView().getModel().refresh();
                    //MessageToast.show("Solicitante Encontrado");
                    ///////Inicio Canal 20/////////////////////////////////////////////////////////////////
                            if(busquedaDTO.canal=='20'){
                            //if(window.dataIni.person.CanalDist=='20'){
                                if(busquedaDTO.codOficina=="1040"){
                                //if(window.dataIni.person.OfVentas=="1040"){
                                    if(lstGrupoForFiltrado.length>2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }else if(lstGrupoForFiltrado.length==2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                }
                                if(busquedaDTO.codOficina=="1130"){
                                //if(window.dataIni.person.OfVentas=="1130"){
                                    if(lstGrupoForFiltrado.length>2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[2].Codigo);
                                    }else if(lstGrupoForFiltrado.length==2){
                                        self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    }
                                    self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    self.getView().getModel().setProperty("/TipoForeAction",false);
                                }
                            }
                            ///////End Canal 20////////////////////////////////////////////////////////////////////////
                            ///////Inicio Canal 30/////////////////////////////////////////////////////////////////
                            if(busquedaDTO.canal=='30'){
                            //if(window.dataIni.person.CanalDist=='30'){
                                    //self.getView().getModel().setProperty("/pedido/GrupoForecast",lstGrupoForFiltrado[1].Codigo);
                                    //self.getView().getModel().setProperty("/GrupoForeAction",false);
                                    //self.getView().getModel().setProperty("/TipoForeAction",false);
                                
                            }
                            ///////End Canal 30////////////////////////////////////////////////////////////////////////
                    //////Deseleccionar Item Buscar Cliente//////////////////////////////////////////////////////////////////////////////////
                var itemSeleccionado = sap.ui.getCore().byId("resultadoListaCliente").getItems()[0];
                sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,true);
                sap.ui.getCore().byId("resultadoListaCliente").setSelectedItem(itemSeleccionado,false);
                ////////////////////////////////////////////////////////////////////////////////////////
                } else {
                    self.borrarInterlocutores();
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
                self.sessionStorageDocNuevo();
            }else{
                MessageToast.show("Ingrese solo números en DNI / RUC");
            }
            
        },
        obtenerDatosInterlocutorAgNombre: function (solicitante, tipoInterlocutor) {
            var self = this;
            var nombreBuscado = solicitante.Descripcion;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                //var result = clienteServices.buscarSolicitanteNombre("BusNombres", nombreBuscado);
                clienteServices.buscarSolicitanteNombre("BusNombres", nombreBuscado, function(result) { 
                sap.ui.core.BusyIndicator.show(0);

                if (result.c === "s") {
                    sap.ui.getCore().byId("dlg_DocNuevobuscarClienteLista_resultado").open();
                    self.agregarOpcionTipoInterlocutor(result.data.eventuales, tipoInterlocutor);
                    self.getView().getModel().setProperty("/BusquedaClientesLista", result.data.eventuales);
                    self.getView().getModel().refresh();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
                self.sessionStorageDocNuevo();
                sap.ui.core.BusyIndicator.hide();
            });
            }, 1000);
        },
        obtenerDatosProfesionalNombre: function (nombre, ubicacion) {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                //var result = clienteServices.buscarProfesionalNombre(null, nombre, "Profesional");
                clienteServices.buscarProfesionalNombre(null, nombre, "Profesional", function(result) { 
                sap.ui.core.BusyIndicator.show(0);

                if (result.c === "s") {
                    if(ubicacion==1){
                        sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional_resultado1").open();
                    }
                    if(ubicacion==2){
                        sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional_resultado2").open();
                    }
                    self.agregarOpcionPosicion(result.data.profesionales, ubicacion);
                    self.getView().getModel().setProperty("/BusquedaProfesionales", result.data.profesionales);
                    self.getView().getModel().refresh();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
                self.sessionStorageDocNuevo();
                sap.ui.core.BusyIndicator.hide();
            });
            }, 1000);
        },       
        registrarDatosCliente: function (cliente, esRuc, listCliPregResp) {
                    var clienteMod = this.getView().getModel().getProperty("/cliente");
                    var fecha = moment(cliente.FECNAC).format('DD/MM/YYYY');
                    var edad = (cliente.EDAD == "") ? moment().diff(moment(fecha).format('YYYY-MM-DD'), 'years',false): cliente.EDAD;
                        var rangoEdad = "";
                        if (edad <= 30) { rangoEdad = "1"; }
                        else if (edad> 30 && edad< 50) { rangoEdad = "2"; }
                        else { rangoEdad = "3"; }
                    if(esRuc == "") {                                                
                        

                        clienteMod.CODIG  = cliente.CODIG;
                        clienteMod.NOMBRE  = cliente.NOMBRE;
                        clienteMod.APPAT  = cliente.APPAT;
                        clienteMod.APMAT  = cliente.APMAT;
                        clienteMod.FECNAC  = fecha;
                        clienteMod.GRAINS  = cliente.GRAINS=="" || cliente.GRAINS==" " || cliente.GRAINS==undefined? "10":cliente.GRAINS;
                        clienteMod.SEXO  = cliente.SEXO;
                        clienteMod.Ciudad  = cliente.Ciudad;
                        clienteMod.EDAD  = edad;
                        clienteMod.RANGOED  = rangoEdad;
                        clienteMod.NIVELSE  = cliente.NIVELSE;
                        clienteMod.CodigoPostal  = cliente.CodigoPostal;
                        clienteMod.DIREC  = cliente.DIREC;                        
                        clienteMod.Mail  = cliente.Mail;
                        clienteMod.Pais  = cliente.Pais;
                        clienteMod.PersonaFisica  = cliente.PersonaFisica;
                        clienteMod.Eventual  = cliente.Eventual;
                        clienteMod.Telefono  = cliente.Telefono;
                        clienteMod.TelefonoMovil  = cliente.TelefonoMovil;                        
                        this.registrarDatosPreguntas(listCliPregResp);
                    } else {
                        clienteMod.CODIG  = cliente.CODIG;
                        clienteMod.NOMBRE  = "";
                        clienteMod.APPAT  = "";
                        clienteMod.APMAT  = "";
                        clienteMod.FECNAC  = (fecha == undefined) ? moment().format("DD/MM/YYYY"): fecha=="01/01/0001"?utilString.generarFechaActual():fecha;
                        clienteMod.GRAINS  = cliente.GRAINS=="" || cliente.GRAINS==" " || cliente.GRAINS==undefined? "10":cliente.GRAINS;
                        clienteMod.SEXO  = cliente.SEXO==undefined?"1":cliente.SEXO;
                        clienteMod.Ciudad  = cliente.Ciudad==undefined?"":cliente.Ciudad;
                        clienteMod.EDAD  = edad==undefined ? 0 : edad;
                        clienteMod.RANGOED  = rangoEdad==undefined?"":rangoEdad;
                        clienteMod.NIVELSE  = cliente.NIVELSE==undefined?"":cliente.NIVELSE;
                        clienteMod.CodigoPostal  = cliente.CodigoPostal==undefined?"":cliente.CodigoPostal;
                        clienteMod.DIREC  = cliente.DIREC==undefined?"":cliente.DIREC;                       
                        clienteMod.Mail  = cliente.Mail==undefined?"":cliente.Mail;
                        clienteMod.Pais  = cliente.Pais==undefined?"":cliente.Pais;
                        clienteMod.PersonaFisica  = cliente.PersonaFisica==undefined?"":cliente.PersonaFisica;
                        clienteMod.Eventual  = cliente.Eventual; //cliente.Eventual;
                        clienteMod.Telefono  = cliente.Telefono==undefined?"":cliente.Telefono;
                        clienteMod.TelefonoMovil  = cliente.TelefonoMovil==undefined?"":cliente.TelefonoMovil;

                        /*clienteMod.CODIG  = cliente.CODIG;
                        clienteMod.NOMBRE  = "";
                        clienteMod.APPAT  = "";
                        clienteMod.APMAT  = "";
                        clienteMod.FECNAC  = (fecha == undefined) ? moment().format("DD/MM/YYYY"): fecha;
                        clienteMod.GRAINS  = "";
                        clienteMod.SEXO  = "";
                        clienteMod.Ciudad  = "";
                        clienteMod.EDAD  = "0";
                        clienteMod.RANGOED  = "1";
                        clienteMod.NIVELSE  = "";
                        clienteMod.CodigoPostal  = "";
                        clienteMod.DIREC  = "";                       
                        clienteMod.Mail  = "";
                        clienteMod.Pais  = "";
                        clienteMod.PersonaFisica  = "";
                        clienteMod.Eventual  = "";
                        clienteMod.Telefono  = "";
                        clienteMod.TelefonoMovil  = "";  */
                        this.registrarDatosPreguntas(listCliPregResp);
                        /*var preguntas = { "1": {"CODP": "1","CODR": ""},"10": { "CODP": "10","CODR": ""},
                                          "15": {"CODP": "15","CODR": ""},"20": {"CODP": "20","CODR": ""},
                                          "25": {"CODP": "25","CODR": ""},"35": {"CODP": "35","CODR": ""} };
                        this.getView().getModel().setProperty("/preguntas", preguntas);*/
                    }
                    this.onChangeFecNac();
                    this.getView().getModel().setProperty("/cliente", clienteMod);
                    this.sessionStorageDocNuevo();
        },
        registrarDatosPreguntas: function (listaPreguntas) {
            for (var indice in listaPreguntas) {
                if (listaPreguntas[indice].CODP === "1" || listaPreguntas[indice].CODP === "10" || listaPreguntas[indice].CODP === "15" ||
                        listaPreguntas[indice].CODP === "20" || listaPreguntas[indice].CODP === "25" || listaPreguntas[indice].CODP === "35")
                    this.getView().getModel().setProperty("/preguntas/" + listaPreguntas[indice].CODP + "/CODR", listaPreguntas[indice].CODR);
            }
        },
        registrarDatosInterlocutores: function () {
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var cliente = this.getView().getModel().getProperty("/interlocutores/AG/Cliente");
            for (var indice in interlocutores) {
                if (interlocutores[indice].Funcion === "RE" || interlocutores[indice].Funcion === "RG" || interlocutores[indice].Funcion === "WE") {
                    if (interlocutores[indice].Funcion === "RG") {
                        interlocutores[indice].Cliente.Ruc = cliente.Ruc;
                    }                
                    interlocutores[indice].Cliente.CodigoPostal = cliente.CodigoPostal;
                    interlocutores[indice].Cliente.Ciudad = cliente.Ciudad;
                    interlocutores[indice].Cliente.Distrito = cliente.Distrito;
                    interlocutores[indice].Cliente.Descripcion = cliente.Descripcion;
                    interlocutores[indice].Cliente.DireccionCompleta = cliente.DireccionCompleta;
                    interlocutores[indice].Cliente.Direccion = cliente.Direccion;
                    interlocutores[indice].Cliente.Mail = cliente.Mail;                    
                    interlocutores[indice].Cliente.PersonaFisica = cliente.PersonaFisica;
                    interlocutores[indice].Cliente.Eventual = cliente.Eventual;
                    interlocutores[indice].Cliente.Telefono = cliente.Telefono;
                }
            }
            this.getView().getModel().setProperty("/interlocutores", interlocutores);
            this.getView().getModel().refresh();
        },              
        /** botones de cerrar popup **/
        //Cerrar Dialog Seleccionar Cliente
        onDocNuevoCloseBuscarCliente: function () {
            this.limpiarBuscarCliente();
            sap.ui.getCore().byId("dlg_DocNuevobuscarCliente").close();
        }, 
        //Cerrar Dialog Seleccionar Cliente Resultado 
        onDocNuevoCloseSeleccionarCliente: function () {
            sap.ui.getCore().byId("dlg_DocNuevobuscarCliente_resultado").close();
        },        
        //Cerrar Dialog Seleccionar Clientes Resultado
        onDocNuevoCloseSeleccionarClienteLista: function () {
            sap.ui.getCore().byId("dlg_DocNuevobuscarClienteLista_resultado").close();
        },              
        onDocNuevoCloseSeleccionarProfesional: function () {
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional_resultado").close();
        },
        onDlg_MensajeAvisoCopiarDatos: function () {
            sap.ui.getCore().byId("dlg_MensajeAvisoCopiarDatos").close();
        },          
        /** utilitarios **/            
        agregarOpcionBusquedaClientes: function (clientes, tipoInterlocutor, copiarDatos) {
            for (var indice in clientes) {
                clientes[indice].tipoInterlocutor = tipoInterlocutor;
                clientes[indice].copiarDatos = copiarDatos;
            }
        },  
        agregarOpcionTipoInterlocutor: function (clientes, tipoInterlocutor) {
            for (var indice in clientes) {
                clientes[indice].tipoInterlocutor = tipoInterlocutor;
            }
        },        
        agregarOpcionPosicion: function (profesionales, ubicacion) {
            for (var indice in profesionales) {
                profesionales[indice].ubicacion = ubicacion;
            }
        },
        /*         
         * Metodos de la vista de materiales
         */
        //Abrir Dialog para Agregar Producto
        onDocNuevodlg_addProducto: function () {
            /*var listaMaterial = this.getView().getModel().getProperty("/listaMaterial");
            var i = listaMaterial.length-1;
            var ambiente = listaMaterial[i]==undefined?"":listaMaterial[i].CodGrupoMat;
            var opcion = listaMaterial[i]==undefined?"":listaMaterial[i].Opcion;
            this.getView().getModel().setProperty("/Codigo",ambiente);
            this.getView().getModel().setProperty("/opcion",opcion); */
            sap.ui.getCore().byId("dlg_DocNuevoaddProducto").open();
        },

        /** metodos de selecionar datos del popup **/
        limpiarAgregarMaterial:function(){
            sap.ui.getCore().byId("txt_codigo_anadir_material").setValue("") ;
            sap.ui.getCore().byId("txt_cantidad_anadir_material").setValue(1) ;
            sap.ui.getCore().byId("txt_codigo_proveedor").setValue("") ;
        },
        onConsultarTransito:function(materiales,i){
            var self = this;
                var lfdat_inicio = utilString.generarFechaActual();
                var lfdat_fin = utilString.generarFechaPosterior();
                var OfVentas = window.dataIni.person.OfVentas;
                //var result = stockServices.stockporLlegar(matnr,lfdat_inicio,lfdat_fin,OfVentas); 
                stockServices.stockporLlegar(materiales[i].CodMaterialCorto,lfdat_inicio,lfdat_fin,OfVentas, function(result) { 
                sap.ui.core.BusyIndicator.hide(); 
                if (result.c === "s") {
                                if (result.data.success) {
                                    var listaMateriales = self.getView().getModel().getProperty("/listaMaterial");
                                    for (var j = 0; j < listaMateriales.length; j++) {
                                        if(listaMateriales[j].PosicionCorto==materiales[i].PosicionCorto){
                                            var fechaTransitoProxima = utilString.fechaMasProxima(result.data.lstStockCurso,"LFDAT","-");
                                            self.getView().getModel().setProperty("/listaMaterial/"+j+"/Repartos/0/FechaEntrega",fechaTransitoProxima);
                                        }
                                    }
                                }
                            } else {
                                sap.m.MessageToast.show(result.m, {
                                    duration: 3000
                                });
                            }
                            console.log(result.data);
                            sap.ui.core.BusyIndicator.hide(); 
                        });
        },
        onDocNuevoMasterProductosAdd: function () {    
        var codigoMaterial = sap.ui.getCore().byId("txt_codigo_anadir_material").getValue() ;
        var opcionMaterial = sap.ui.getCore().byId("com_opcion_anadir_material").getSelectedKey();
        var codigoAmbiente = sap.ui.getCore().byId("com_ambiente_anadir_material").getSelectedKey() ;
        var cantidad1 = sap.ui.getCore().byId("txt_cantidad_anadir_material").getValue() ;
        var cantidad = cantidad1;//

        if(codigoMaterial!=""){
            
        }else{
            return MessageToast.show("No ha ingresado ningún material"); 
        }
        if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z036" && 
            this.getView().getModel().getProperty("/documentoNuevo/Codigo")!="Z010" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z035" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="ZO02" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z003" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z004" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z015" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z034" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z037" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z038" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z036" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z040"){
        if(window.dataIni.person.CanalDist=="10"){
                if(codigoAmbiente!=""){
                        
                }else{
                    return MessageToast.show("No ha ingresado Ambiente"); 
                }

                if(opcionMaterial!=""){

                }else{
                     return MessageToast.show("No ha ingresado Opcion de Ambiente");
                }
            }

        }

                        var tamanoList = this.obtenerTamaniolLista();
                        var nuevoMaterial = this.crearNuevoMaterial(codigoMaterial, opcionMaterial, codigoAmbiente, cantidad, tamanoList);
                        var self = this;

                        sap.ui.core.BusyIndicator.show(0);
                        setTimeout(function(){
                            //var result = materialServices.anadirMaterialMaster(nuevoMaterial);
                            materialServices.anadirMaterialMaster(nuevoMaterial, function(result) { 
                sap.ui.core.BusyIndicator.show(0);

                            if (result.c === "s") {
                                if (result.data.success) {
                                    
                                    var materialSer = result.data.lstTotal;
                                    var stockSer = result.data.lstStock;

                                            if(materialSer != null) {
                                                var materialesStock = self.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                                                var materiales = self.getView().getModel().getProperty("/listaMaterial");
                                                if(materiales == null) {materiales = new Array();}
                                                for(var indice in materialesStock) {
                                                    materiales.push(materialesStock[indice]);
                                                }                        
                                                self.getView().getModel().setProperty("/listaMaterial/", materiales);                        
                                            //if(window.dataIni.person.CanalDist=='10'){
                                                if(self.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){
                                                    for (var i = 0; i < materialesStock.length; i++) {
                                                        self.onConsultarTransito(materialesStock,i);
                                                    }
                                                }
                                            //}
                                            }
                                            
                                            self.calcularPesoTotal();
                                            self.onSelectAll(false);
                                            self.limpiarAgregarMaterial();
                                            self.getView().getModel().refresh();
                                            //sap.ui.getCore().byId("dlg_DocNuevoaddProducto").close();
                                            sap.ui.core.BusyIndicator.hide();
                                                    //Kit
                                                    /*if( (self.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z035" && 
                                                            self.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z036" && 
                                                            self.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z037" && 
                                                            self.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z038" ) && 
                                                            (window.dataIni.person.CanalDist=="10" || window.dataIni.person.CanalDist=="20" || window.dataIni.person.CanalDist=="30" || window.dataIni.person.CanalDist=="")){

                                                            if(result.data.lstTotal.length>1){//result.data.lstTotal.length>1
                                                                if(result.data.lstTotal[0].CodMaterialCorto.substring(0,1)=="4"){
                                                                    
                                                                    self.AddMaterialNormal(result.data.lstTotal,result.data.lstStock,cantidad);
                                                                }else{
                                                                    self.VerificarOpcionKit(result.data.lstTotal,result.data.lstStock,cantidad);
                                                                }
                                                            }else{
                                                                self.AddMaterialNormal(result.data.lstTotal,result.data.lstStock,cantidad);
                                                            }

                                                    }else{
                                                            self.AddMaterialNormal(result.data.lstTotal,result.data.lstStock,cantidad);
                                                    }*/

                                } else {
                                    self.limpiarAgregarMaterial();
                                    sap.m.MessageToast.show(result.data.errors.reason, { duration: 3000 });
                                    sap.ui.core.BusyIndicator.hide();
                                }
                            } else {
                                self.limpiarAgregarMaterial();
                                sap.m.MessageToast.show(result.m, { duration: 3000 });
                                sap.ui.core.BusyIndicator.hide();
                            } 
                            self.sessionStorageDocNuevo();
                            sap.ui.core.BusyIndicator.hide();
                        });
                        },1000);
             
        },
        ////// Inicio Mejora Seleccionar KIT//////////////////////////////////
        AddMaterialNormal:function(materialSer,stockSer,cantidad){
               if(materialSer != null) {
                   var materialesStock = this.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                   var materiales = this.getView().getModel().getProperty("/listaMaterial");
                   if(materiales == null) {materiales = new Array();}
                       for(var indice in materialesStock) {
                            /*if(materialesStock[indice].TipoMaterial=="NA2" || materialesStock[indice].TipoMaterial=="NA3"){
                            materialesStock[indice].CodCentro="9110";
                            materialesStock[indice].CodAlmacen="0001";
                            }*/  
                            materiales.push(materialesStock[indice]);
                        }                        
                        this.getView().getModel().setProperty("/listaMaterial/", materiales);        
                        //if(window.dataIni.person.CanalDist=='10'){
                        if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){
                            for (var i = 0; i < materialesStock.length; i++) {
                                this.onConsultarTransito(materialesStock,i);
                            }
                        }
                        //}
                        this.calcularPesoTotal();
                        this.onSelectAll(false);
                        this.limpiarAgregarMaterial();
                        this.getView().getModel().refresh();
                        //sap.ui.getCore().byId("dlg_DocNuevoaddProducto").close();
                        this.sessionStorageDocNuevo();
                        sap.ui.core.BusyIndicator.hide();
                }   
        },
        VerificarOpcionKit:function(mats,matsStock,cantidad){
             
            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({ text: "¿Desea agregar vínculos?" }),
                beginButton: new Button({
                    text: 'Si',
                    type: 'Accept',
                    press: function () {
                        dialog.destroy();
                        utilString.cambiarSelectedsLista(this,"listaMaterialesKit",false);
                        this.getView().getModel().setProperty("/listaMaterialKitPrimerItem/", mats[0]);
                        this.getView().getModel().setProperty("/listaMaterialKit/", mats.filter(function(i) { return i.PosSupCorto !== "" }));
                        this.getView().getModel().setProperty("/listaMaterialKit/0/stockKit", matsStock);
                        this.getView().getModel().setProperty("/listaMaterialKit/0/cantidadKit", cantidad);
                        this.getView().getModel().refresh();
                        sap.ui.getCore().byId("dlg_DocNuevoaddProducto").close();
                        sap.ui.getCore().byId("dlg_DialogListaMaterialesSelectKit").open();
                        sap.ui.core.BusyIndicator.hide();
                         return ;
                        
                    }.bind(this)
                }),
                endButton: new Button({
                    text: 'No',
                    type: 'Reject',
                    press: function () {
                             dialog.destroy();
                        var materialSer = mats.filter(function(i) { return i.PosSupCorto == "" });
                        var stockSer = matsStock;
                        this.AddMaterialNormal(materialSer,stockSer,cantidad);
                        return;
                    }.bind(this)
                }),
                afterClose: function() {
                    dialog.destroy();
                }
            });

            dialog.open();

            
        },
        onBtnBuscarCodProveedor:function(){
            var self = this;
            var datosMateriales = {"codigoAntiguo":sap.ui.getCore().byId("txt_codigo_proveedor").getValue()};
            //self.getView().byId("txt_codigo_anadir_material").setValue("");
            if(datosMateriales.codigoAntiguo!=""){
sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
            //var result = documentosServices.buscarmaterial(datosMateriales);
            documentosServices.buscarmaterial(datosMateriales, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            if (result.c === "s") {
                
                if (result.data.success) {
                    for (var i = 0; i < result.data.materiales.length; i++) {
                        if(result.data.materiales[i].MSTAE==""){
                            sap.ui.getCore().byId("txt_codigo_anadir_material").setValue(result.data.materiales[i].CodMaterialCorto);
                        }
                    }
                    
                    sap.ui.core.BusyIndicator.hide();
                } else {
                    sap.ui.getCore().byId("txt_codigo_anadir_material").setValue("");
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                    sap.ui.core.BusyIndicator.hide();
                }
            } else {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
                sap.ui.core.BusyIndicator.hide();
            }
            sap.ui.core.BusyIndicator.hide();
        });
                    }, 1000);
}else{
    MessageToast.show("Ingrese codigo de proveedor");
}
        },
        onCloseDlg_DialogListaMaterialesSelectKit:function(){
            this.getView().getModel().setProperty("/listaMaterialKit",null);
            sap.ui.getCore().byId("dlg_DialogListaMaterialesSelectKit").close();
        },
        onAnadirDlg_DialogListaMaterialesSelectKit:function(){
            var matSelected = sap.ui.getCore().byId("listaMaterialesKit").getSelectedItems();
            var matGenerar = [];

            matGenerar.push(this.getView().getModel().getProperty("/listaMaterialKitPrimerItem/"));
            for (var i = 0; i < matSelected.length; i++) 
                {
                  var item = matSelected[i];
                  var context = item.getBindingContext();
                  var path = context.getPath(); 
                  //Obtener Material////
                  var material = this.getView().getModel().getProperty(path);
                  material.path = path;
                  matGenerar.push(material);
                    
                }

            var materialSer = matGenerar;
            var stockSer = this.getView().getModel().getProperty("/listaMaterialKit/0/stockKit");
            var cantidad = this.getView().getModel().getProperty("/listaMaterialKit/0/cantidadKit");
            if(materialSer != null) {
                var materialesStock = this.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                var materiales = this.getView().getModel().getProperty("/listaMaterial");
                if(materiales == null) {materiales = new Array();}
                    for(var indice in materialesStock) {
                        if(materialesStock[indice].TipoMaterial=="NA2" || materialesStock[indice].TipoMaterial=="NA3"){
                            materialesStock[indice].CodCentro="9110";
                            materialesStock[indice].CodAlmacen="0001";
                        }  
                        materiales.push(materialesStock[indice]);
                    }                        
                    this.getView().getModel().setProperty("/listaMaterial/", materiales);        
                    if(window.dataIni.person.CanalDist=='10'){
                        if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){
                            for (var i = 0; i < materialesStock.length; i++) {
                                this.onConsultarTransito(materialesStock,i);
                            }
                        }
                    }
                    this.calcularPesoTotal();
                    this.onSelectAll(false);
                    this.limpiarAgregarMaterial();
                    this.getView().getModel().refresh();
                    //sap.ui.getCore().byId("dlg_DocNuevoaddProducto").close();
                    this.sessionStorageDocNuevo();
                }
                sap.ui.getCore().byId("dlg_DialogListaMaterialesSelectKit").close();

        },
        ////// End Mejora Seleccionar KIT//////////////////////////////////
        /** metodos de funcionalidad **/
        onAgregarCentroAlmacenLote: function (evt) {//Modificado (Roy) 27-07-17 Agregue DescCentro
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            sap.ui.getCore().byId("lb_datos").setProperty("text", obj.CodCentro +"/"+ obj.DescCentro +"/"+ obj.CodAlmacen  +"/"+ obj.CodLote);  
            sap.ui.getCore().byId("dlg_MensajeAvisoAddCenAlmLot").open();            
        }, 
        onSiMensajeAvisoAddCenAlmLot: function () {//Modificado (Roy) 27-07-17 Falta arreglar el slash
            var material = this.getView().getModel().getProperty("/material");
            var datos = sap.ui.getCore().byId("lb_datos").getProperty("text");
            if(datos != "") {
               var data =  datos.split("/");
               material.CodCentro = data[0];
               material.DescCentro = data[1];//Modificado (Roy) 27-07-17
               material.CodAlmacen = data[2];
               material.CodLote = data[3];
               this.getView().getModel().refresh();
            }        
            sap.ui.getCore().byId("dlg_MensajeAvisoAddCenAlmLot").close(); 
        },  
        onOpenRepartoDetail: function (oEvent) {
            var material = this.getView().getModel().getProperty("/material");   
            var repartos = material.Repartos;
            var cantidad = material.Cantidad;
            var cantidadReparto = 0;
            for(var indice in repartos) {
                cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
            }

            if(cantidadReparto < cantidad) {                
                var reparto = new Object();
                reparto.FechaEntrega = material.FechaEntregaString;
                reparto.CantPed ="";  
                reparto.path ="";                           
                this.getView().getModel().setProperty("/repartoDetail", reparto); 
                sap.ui.getCore().byId("dlg_DialogDocReparto").open(); 
            } else {
                sap.m.MessageToast.show("No se puede agregar un nuevo reparto.", { duration: 3000 });                
            }    
        },  
        onEditarReparto: function(evt) {
            var contexts = this.getView().byId("idReparto").getSelectedContexts();
             if(contexts == ""){
                 sap.m.MessageToast.show("Por favor seleccione una fila para editar");
             } else {
                var path = this.getView().byId("idReparto").getSelectedItem().getBindingContext().getPath();
                var indice = path.substring((path.lastIndexOf("/") + 1),path.length);
                var indiceEdit = (indice != "") ? parseInt(indice) : -1;                
                var reparto = this.getView().byId("idReparto").getSelectedItem().getBindingContext().getObject();
                reparto.path = indiceEdit;
                this.getView().getModel().setProperty("/repartoDetail", reparto); 
                this.getView().getModel().refresh();  
                sap.ui.getCore().byId("dlg_DialogDocModificarReparto").open(); 
             }
        }, 
        onAgregarReparto: function() {   
            var repartoDet = this.getView().getModel().getProperty("/repartoDetail");  
            var repartoDetCant = (repartoDet.CantPed != "") ? repartoDet.CantPed : 0;//parseInt(repartoDet.CantPed) : 0;
            ///material/Cantidad
            if(repartoDetCant > 0 ) {
                    var material = this.getView().getModel().getProperty("/material");   
                    var repartos = material.Repartos;
                    var cantidad = material.Cantidad;
                    var cantidadReparto = 0;
                    for(var indice in repartos) {
                        cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
                    }  
                    if(cantidadReparto + repartoDetCant<= cantidad) {                        
                        if(repartoDet.path === "") {
                            //agregar
                            var repartoNuevo = new Object();
                            if(repartos.length==0){
                                repartoNuevo.CantConf = repartoDetCant;                        
                                repartoNuevo.FechaEntrega = repartoDet.FechaEntrega;
                                repartoNuevo.CantPed = repartoDetCant;
                                repartoNuevo.TipoReparto = "Z6";
                                repartoNuevo.Pos = "0001";
                                repartoNuevo.PosCorto = "1";
                                //////Roy crear nuevo campo de fecha /////////////////////
                                repartoNuevo.FechaEntregaConf = repartoDet.FechaEntrega;
                                //////////////////////////////////////////////////////////
                            }   
                            var nuevaPosicion ="";
                            if(repartos.length>0){
                                for (var i = 1; i < repartos.length+2; i++) {
                                    var posUnico = (repartos[i-1] ==undefined) ? 0:parseInt(repartos[i-1].PosCorto);
                                    if(posUnico != i){
                                        nuevaPosicion = i;
                                        break;
                                    }
                                }
                                repartoNuevo.CantConf = repartoDetCant;                        
                                repartoNuevo.FechaEntrega = repartoDet.FechaEntrega;
                                repartoNuevo.CantPed = repartoDetCant;
                                repartoNuevo.TipoReparto = "";
                                repartoNuevo.Pos = nuevaPosicion;
                                repartoNuevo.PosCorto = nuevaPosicion;
                                //////Roy crear nuevo campo de fecha /////////////////////
                                repartoNuevo.FechaEntregaConf = repartoDet.FechaEntrega;
                                //////////////////////////////////////////////////////////
                            }
                            repartos.push(repartoNuevo);                            
                        } else {
                            //editar
                            var indice = repartoDet.path;
                            repartos[indice].CantConf = repartoDetCant;  
                            repartos[indice].FechaEntrega = repartoDet.FechaEntrega;  
                            repartos[indice].CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartos[indice].FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////    
                        }
                        this.getView().getModel().setProperty("/material/Repartos", repartos);
                        this.getView().getModel().refresh();     
                        sap.ui.getCore().byId("dlg_DialogDocReparto").close();                   
                    } else {                        
                        if(cantidadReparto + repartoDetCant > cantidad) 
                        {             
                            this.getView().getModel().setProperty("/repartoDetail/CantPed",repartoDet.CantConf);
                            this.getView().getModel().setProperty("/repartoDetail/FechaEntrega",repartoDet.FechaEntregaConf);
                            sap.m.MessageToast.show("Aviso, El total de cantidades es superior a la del detalle del pedido:" + cantidad, { duration: 3000 });  
                        }
                        else 
                        {
                            //sap.m.MessageToast.show("No se puede agregar un nuevo reparto.", { duration: 3000 });
                        }  
                    }            
            } else {
                sap.m.MessageToast.show("Debe ingresar una cantida mayor a 0.", { duration: 3000 });    
            }    
        },
        onModificarReparto: function() {   
            var repartoDet = this.getView().getModel().getProperty("/repartoDetail");  
            var repartoDetCant = (repartoDet.CantPed != "") ? repartoDet.CantPed : 0;//parseInt(repartoDet.CantPed) : 0;
            ///material/Cantidad
            if(repartoDetCant > 0 ) {
                    var material = this.getView().getModel().getProperty("/material");   
                    var repartos = material.Repartos;
                    var cantidad = material.Cantidad;
                    var cantidadReparto = 0;
                    for(var indice in repartos) {
                        cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
                    }  
                    if(cantidadReparto <= cantidad) {                        
                        if(repartoDet.path === "") {
                            //agregar
                            var repartoNuevo = new Object();
                            repartoNuevo.CantConf = repartoDetCant;                        
                            repartoNuevo.FechaEntrega = repartoDet.FechaEntrega;
                            repartoNuevo.CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartoNuevo.FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////
                            repartos.push(repartoNuevo);                            
                        } else {
                            //editar
                            var indice = repartoDet.path;
                            repartos[indice].CantConf = repartoDetCant;  
                            repartos[indice].FechaEntrega = repartoDet.FechaEntrega;  
                            repartos[indice].CantPed = repartoDetCant;
                            //////Roy crear nuevo campo de fecha /////////////////////
                            repartos[indice].FechaEntregaConf = repartoDet.FechaEntrega;
                            //////////////////////////////////////////////////////////  
                        }
                        this.getView().getModel().setProperty("/material/Repartos", repartos);
                        this.getView().getModel().refresh();     
                        sap.ui.getCore().byId("dlg_DialogDocModificarReparto").close();                   
                    } else {                        
                        if(cantidadReparto > cantidad) 
                        {             
                            this.getView().getModel().setProperty("/repartoDetail/CantPed",repartoDet.CantConf);
                            this.getView().getModel().setProperty("/repartoDetail/FechaEntrega",repartoDet.FechaEntregaConf);
                            sap.m.MessageToast.show("Aviso, El total de cantidades es superior a la del detalle del pedido:" + cantidad, { duration: 3000 });  
                        }
                        else 
                        {
                            //sap.m.MessageToast.show("No se puede agregar un nuevo reparto.", { duration: 3000 });
                        }  
                    }            
            } else {
                sap.m.MessageToast.show("Debe ingresar una cantida mayor a 0.", { duration: 3000 });    
            }    
        },                                                    
        
        onBorrarReparto: function(evt) {
            var contexts = this.getView().byId("idReparto").getSelectedContexts();
             if(contexts == ""){
                 sap.m.MessageToast.show("Por favor seleccione una fila para eliminar");
             } else {
                var path = this.getView().byId("idReparto").getSelectedItem().getBindingContext().getPath();
                var indice = path.substring((path.lastIndexOf("/") + 1),path.length);
                var indiceDelete = (indice != "") ? parseInt(indice) : -1;
                var listaRepartos = this.getView().getModel().getProperty("/material/Repartos");

                listaRepartos.splice(indiceDelete, 1);
                this.getView().getModel().setProperty("/material/Repartos", listaRepartos);
                this.getView().getModel().refresh(); 
             }
        },  
        /** botones de cerrar popup **/
        onDocNuevoClosedlg_addProducto: function () {
            sap.ui.getCore().byId("dlg_DocNuevoaddProducto").close();
        },
        onCloseRepartoDetail: function (oEvent) {
            sap.ui.getCore().byId("dlg_DialogDocReparto").close();
            var repartoDet = this.getView().getModel().getProperty("/repartoDetail"); 
            this.getView().getModel().setProperty("/repartoDetail/CantPed",repartoDet.CantConf);
            this.getView().getModel().setProperty("/repartoDetail/FechaEntrega",repartoDet.FechaEntregaConf);
        },
        onCloseModificarRepartoDetail: function (oEvent) {
            sap.ui.getCore().byId("dlg_DialogDocModificarReparto").close();
            var repartoDet = this.getView().getModel().getProperty("/repartoDetail"); 
            this.getView().getModel().setProperty("/repartoDetail/CantPed",repartoDet.CantConf);
            this.getView().getModel().setProperty("/repartoDetail/FechaEntrega",repartoDet.FechaEntregaConf);
        },
        onNoMensajeAvisoAddCenAlmLot: function () {
            sap.ui.getCore().byId("dlg_MensajeAvisoAddCenAlmLot").close();
        },
        cambiar_moneda: function (){
            //Validar combo
            if (this.getView().getModel().getProperty("/pedido/Moneda") == 'PEN') 
            {
                if (dataIni.person.UsuarioServ == '')
                {
                    this.getView().byId("txt_Total").setText("Tot.Doc.: S/.");
                    this.getView().byId("txt_Dscto").setText("Tot.Dcto.: S/. ");
                    //tb.setTitle('Tot.Doc.: S/. ' + addCommas(roundNumber((objPedidoStore.last().data.Total), 2)) + ' (c/IGV)' + '  |  ' + 'Tot.Dcto. : S/. ' + addCommas(roundNumber(objPedidoStore.last().data.TotalDcto, 2)));
                }
            }
            else 
            {
                if (dataIni.person.UsuarioServ == '')
                {
                    this.getView().byId("txt_Total").setText("Tot.Doc.: $/.");
                    this.getView().byId("txt_Dscto").setText("Tot.Dcto.: $/.");
                    //tb.setTitle('Tot.Doc.: $/. ' + addCommas(roundNumber((objPedidoStore.last().data.Total), 2)) + ' (c/IGV)' + '  |  ' + 'Tot.Dcto. : $/. ' + addCommas(roundNumber(objPedidoStore.last().data.TotalDcto, 2)));
                }
            }
            this.sessionStorageDocNuevo();
        },

        onBtnRecalcular:function(){
            var self = this;
                    sap.ui.core.BusyIndicator.show(0);
                    setTimeout(function(){
            var materiales = self.getView().getModel().getProperty("/listaMaterial/");
            if(materiales!= null && materiales!= undefined){
                if(materiales.length > 0) {
                        var numPedido = self.getView().getModel().getProperty("/pedido/NumPedido");
                    if(numPedido!=""){
                        var op = "copiar";
                        var estadoView = "ref";
                    }else{
                        var op = "";
                        var estadoView = "";
                        numPedido = "";
                    }
                    var dsctoLotes = 2;
                    var listaDscto = JSON.stringify(self.crearDescuentos());// JSON.stringify(this.crearDescuentos());
                    var listaInter = JSON.stringify(self.crearInterlocutores());
                    var listaRepartos = JSON.stringify(self.crearRepartos());
                    var listaMateriales = JSON.stringify(self.crearMateriales());// JSON.stringify(this.crearMateriales());   //crearMateriales1          
                    var listaPedido = JSON.stringify([self.crearPedido()]);

                    
                        /*var result = materialServices.recalcular(op,estadoView,numPedido,dsctoLotes, listaInter, listaDscto, listaRepartos, 
                                                                    listaMateriales, listaPedido);*/
                        materialServices.recalcularModificar(op,estadoView,numPedido,dsctoLotes, listaInter, listaDscto, listaRepartos, 
                                                                    listaMateriales, listaPedido, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                        if (result.c === "s") {
                            if (result.data.success) {
                                var pedidoSer = result.data.objPedido;
                                console.log("Btn Recalcular////////////////");
                                console.log(result.data);
                                var pedido = self.agregarDatosPedido(pedidoSer);                            
                                var materiales = self.agregarDetalleMateriales(pedidoSer.Detalle);

                                self.getView().getModel().setProperty("/pedido", pedido);
                                self.getView().getModel().setProperty("/listaMaterial", materiales);
                                ///Calcular Precio Unitario con IGV//////////////////////////////////////////////////////////////
                                for(var i=0;i<materiales.length;i++){
                                    var totalConIgv = self.getView().getModel().getProperty("/listaMaterial/"+i+"/Total");
                                    var cantMaterial = self.getView().getModel().getProperty("/listaMaterial/"+i+"/Cantidad");
                                    self.getView().getModel().setProperty("/listaMaterial/"+i+"/PrecConIgv",totalConIgv/cantMaterial);
                                }
                                ///////////////////////////////////////////////////////////////////////////////////////////////////
                                self.cambiar_moneda();
                                self.calcularPesoTotal();
                                /////Inicio Foramtear Prec. uni con Dscto/////////////////////////////////////////////////
                                    for (var i = 0; i < self.getView().getModel().getProperty("/listaMaterial/").length; i++) {
                                    var prec  = self.getView().getModel().getProperty("/listaMaterial/"+i+"/PrecConIgv");
                                    prec = utilString.roundNumber(prec, 2);
                                    self.getView().getModel().setProperty("/listaMaterial/"+i+"/PrecConIgv",prec);
                                    }
                                /////End Foramtear Prec. uni con Dscto//////////////////////////////////////////////////// 
                                self.getView().getModel().refresh(); 
                           } else {
                                sap.m.MessageToast.show(result.data.errors.reason, { duration: 3000 });
                            }
                        } else {
                            sap.m.MessageToast.show(result.m, { duration: 3000 });
                        } 
                        self.sessionStorageDocNuevo();
                    sap.ui.core.BusyIndicator.hide();
                });
                    
                }
            }else{
                sap.ui.core.BusyIndicator.hide();
                return MessageToast.show("Debe añadir al menos un Material.");
            } 
            },1000);
        },
        /** utilitarios **/
        crearNuevoMaterial: function (codigoMaterial, opcionMaterial, codigoAmbiente, cantidad,tamanoList) {
        var pedido = this.crearPedido();
        var codigoAuart = pedido.CodTipoDoc;

        var nuevoMaterial = new Object();
        nuevoMaterial.codigo = codigoMaterial,
        nuevoMaterial.cantidad = cantidad;
        nuevoMaterial.CodAmbiente = codigoAmbiente;
        nuevoMaterial.Opcion =opcionMaterial;
        nuevoMaterial.añadirForm = 1;
        nuevoMaterial.posNuevo = tamanoList;
        nuevoMaterial.objPedido = JSON.stringify(pedido);
        nuevoMaterial.cantidadtmp = cantidad;
        nuevoMaterial.ambiente = codigoAmbiente;
        nuevoMaterial.desamb = sap.ui.getCore().byId("com_ambiente_anadir_material").getSelectedItem().getText();
        nuevoMaterial.opcamb = opcionMaterial;
        nuevoMaterial.auart = codigoAuart;
        
        return nuevoMaterial;        
        },
        crearNuevoMaterialDesdeBuscar: function (codigoMaterial, opcionMaterial, codigoAmbiente, cantidad,tamanoList) {
        var pedido = this.crearPedido();
        var codigoAuart = pedido.CodTipoDoc;

        var nuevoMaterial = new Object();
        nuevoMaterial.codigo = codigoMaterial,
        nuevoMaterial.cantidad = cantidad;
        nuevoMaterial.CodAmbiente = codigoAmbiente;
        nuevoMaterial.Opcion =opcionMaterial;
        nuevoMaterial.añadirForm = 1;
        nuevoMaterial.posNuevo = tamanoList;
        nuevoMaterial.objPedido = JSON.stringify(pedido);
        nuevoMaterial.cantidadtmp = cantidad;
        nuevoMaterial.ambiente = codigoAmbiente;
        nuevoMaterial.desamb = sap.ui.getCore().byId("com_ambiente_dlgBuscarMaterial").getSelectedItem().getText();
        nuevoMaterial.opcamb = opcionMaterial;
        nuevoMaterial.auart = codigoAuart;
        
        return nuevoMaterial;        
        },

        agregarMaterialNuevo: function (materialSer,stockSer,cantidad) {//Modificado Roy            
            //var stockMayor = stockSer[stockSer.length-1];  
            var listaMateriales = new Array();

            for(var indice in materialSer) {  
            var matAgregados = this.getView().getModel().getProperty("/listaMaterial");          
                //agregr material
                
                var material = materialSer[indice].Material;
                if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z035" ||
                 this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z037"){
                    material.Posicion = matAgregados.length ==0 ? sessionStorage.ultimaPosMaterialPedOriginal : materialSer[indice].Posicion  ;
                    material.PosicionCorto = matAgregados.length ==0 ? sessionStorage.ultimaPosCortoMaterialPedOriginal : materialSer[indice].PosicionCorto;
                }else{
                    material.Posicion = materialSer[indice].Posicion;
                    material.PosicionCorto = materialSer[indice].PosicionCorto;
                }
                
                material.CodMaterial = materialSer[indice].CodMaterial;
                
                material.Ambiente = materialSer[indice].CodGrupoMat;
                material.Zservicio = materialSer[indice].Zservicio ;
                material.Cantidad = materialSer[indice].Cantidad;   //*Revisar ya que al agregar 1 cantidad de el material 11000008 retorna 2.1 de este y 3 de los demas*
                material.PrioridadEntrega = materialSer[indice].PrioridadEntrega;   
                material.MotivoRechazo = materialSer[indice].MotivoRechazo;   
                material.PesoNeto = materialSer[indice].PesoNeto;
                material.Opcion = materialSer[indice].Opcion;
                material.PrecioUnitario = materialSer[indice].PrecioUnitario;
                material.Reparto = materialSer[indice].Reparto;
                material.CambAlmacen = materialSer[indice].CambAlmacen;
                material.CantComp = materialSer[indice].CantComp;
                material.CantConfirmada = materialSer[indice].CantConfirmada;
                material.CodGrupoMat = materialSer[indice].CodGrupoMat;
                material.ContentID = materialSer[indice].ContentID;
                material.DesGrupoMat = materialSer[indice].DesGrupoMat;
                material.DescMaterialTicketera = materialSer[indice].DescMaterialTicketera;
                material.DivisionRendimiento = materialSer[indice].DivisionRendimiento;
                material.DsctoMontTotal = materialSer[indice].DsctoMontTotal;
                material.FechaCantConf = materialSer[0].FechaCantConf;
                material.FechaCantConfStr = materialSer[0].FechaCantConfStr;
                material.FechaEntregaString = materialSer[indice].FechaEntregaString;
                material.PosSup = materialSer[indice].PosSup;
                material.PosSupCorto = materialSer[indice].PosSupCorto;
                //material.PosicionCorto = materialSer[indice].PosicionCorto;
                material.PrecioConIGV = materialSer[indice].PrecioConIGV;
                material.PrecioSinIGV = materialSer[indice].PrecioSinIGV;
                material.Reembolsable = materialSer[indice].Reembolsable;
                material.TipoPosAnt = materialSer[indice].TipoPosAnt;
                material.TipoPosicion = materialSer[indice].TipoPosicion;
                material.TotalImpresion = materialSer[indice].TotalImpresion;     
                material.Total = materialSer[indice].Total;               
                material.PrecioTotal = materialSer[indice].PrecioTotal; 
                material.TotalDctos = materialSer[indice].TotalDctos; 
                material.SubTotal = materialSer[indice].SubTotal; 
                material.ConversionUMedida = materialSer[indice].ConversionUMedida;

                //agregar reparto
                var repartos = new Array();
                for (var indiceRep in materialSer[indice].Repartos) {
                    var reparto = materialSer[indice].Repartos[indiceRep];
                    reparto.CodUMedida = materialSer[indice].CodUMedida;  

                    ////Inicio Fecha Repartos/////////////////////////////////////////////////////////////////////////////////// {
                /*var fecPedido = this.getView().getModel().getProperty("/pedido/FechaPedido");
                var tipoDoc = this.getView().getModel().getProperty("/pedido/CodTipoDoc")
                var fechaPedidoCalculado = utilString.obtenerFechaDespacho(fecPedido); 
                if(tipoDoc=="Z001" || tipoDoc=="Z003"){
                        var fecEntrega = moment(materialSer[indice].Repartos[indiceRep].FechaEntrega).format('DD/MM/YYYY');
                        if(utilString.verificarFechaRepartoModAdd(fecPedido,fecEntrega) ){
                        reparto.FechaEntrega = fechaPedidoCalculado;
                        reparto.FechaEntregaConf = fechaPedidoCalculado;
                        }
                        if(utilString.compararFechaActualCon(fecPedido)=="menor"){
                            if(utilString.compararFechaActualCon(fecEntrega)=="menor" || utilString.compararFechaActualCon(fecEntrega)=="igual"){
                                reparto.FechaEntrega =  utilString.generarFechaActual();
                                reparto.FechaEntregaConf = utilString.generarFechaActual();
                            }
                        }
                }else{
                    reparto.FechaEntrega = moment(materialSer[indice].Repartos[indiceRep].FechaEntrega).format('DD/MM/YYYY');  
                    //////Roy crear nuevo campo de fecha ///////////////////// 
                    reparto.FechaEntregaConf = moment(materialSer[indice].Repartos[indiceRep].FechaEntrega).format('DD/MM/YYYY');
                }*/
                ////End Fecha Repartos/////////////////////////////////////////////////////////////////////////////////// 

                    reparto.FechaEntrega =  utilString.generarFechaActual();
                    reparto.FechaEntregaConf = utilString.generarFechaActual();
                    
                    //////////////////////////////////////////////////////////            
                    reparto.CantPed = parseInt(cantidad);
                    reparto.CantConf = parseInt(cantidad);   
                    repartos.push(reparto);              
                }
                material.Repartos = repartos;   
                
                //agregar lista de stock
                var stocks = new Array();
                var stockTotal = 0;
                var stockMayor = (stockSer.length > 0) ? stockSer[0].StockDisponible:0;
                
                ///Inicio Stock Nuevo Ordenamiento 26-01-2018////////////////////////////////////
                //Ordenamiento Array segun campo de objeto///////////////////////////////
                stockSer = stockSer.sort(function (o1,o2) {
                          if (o1.DescCentro > o2.DescCentro) { //comparación lexicogŕafica
                            return 1;
                          } else if (o1.DescCentro < o2.DescCentro) {
                            return -1;
                          } 
                          return 0;
                        });
                /////////////////////////////////////////////////////////////////////////
                for (var indiceSt=stockSer.length-1; 0<=indiceSt;indiceSt--) {
                    if(materialSer[indice].CodMaterial == stockSer[indiceSt].CodMaterial && stockSer[indiceSt].StockDisponible >= 0) {
                        var stock = stockSer[indiceSt];
                        stockTotal = stockTotal + stockSer[indiceSt].StockDisponible;
                        stocks.push(stock);
                            
                    }
                }
                material.CodCentro = (stockSer.length > 0) ? stockSer[0].CodCentro:"";
                material.CodAlmacen = (stockSer.length > 0) ? stockSer[0].CodAlmacen:"";// stockSer[indiceSt-1].CodAlmacen;
                material.CodLote = (stockSer.length > 0) ? stockSer[0].CodLote:""; //stockSer[indiceSt-1].CodLote;
                material.DescCentro = (stockSer.length > 0) ? stockSer[0].DescCentro:"";// stockSer[indiceSt-1].DescCentro;
                material.DescAlmacen = (stockSer.length > 0) ? stockSer[0].DescAlmacen:"";// stockSer[indiceSt-1].DescAlmacen;
                ///End Stock Nuevo Ordenamiento 26-01-2018////////////////////////////////////
                
                material.StockTotal = stockTotal;
                material.stockDetallado = stocks; 
                listaMateriales.push(material); 
            }   
            return listaMateriales;
        },
        obtenerTamaniolLista: function() {
            var listaMateriales = this.getView().getModel().getProperty("/listaMaterial");
            if(listaMateriales){
                if(listaMateriales.length==0){
                    var tamanoList = 10;
                }else{
                    var tamanio = listaMateriales.length-1;
                    var tamanoList = (listaMateriales[tamanio].PosicionCorto ==null) ? 10:(parseInt(listaMateriales[tamanio].PosicionCorto)+10);
                }
                /*var tamanoList = (listaMateriales === null) ? 10 : (listaMateriales.length + 1 ) * 10;
                this.getView().getModel().refresh();*/
            }else{
                var tamanoList = 10;
            }
            return tamanoList;
        },
        convertirFechaSistema: function(fechaString) {
            var fechaFormat = "";
            if(!jQuery.isEmptyObject(fechaString)) {
                fechaFormat = moment.utc(fechaString,"DD/MM/YYYY").format(); 
            }
            return fechaFormat;
        },
        crearPedidoConReferencia: function() {
            var pedidoMod = this.getView().getModel().getProperty("/pedido");
            var clienteMod = this.getView().getModel().getProperty("/cliente");
            var preguntasMod = this.getView().getModel().getProperty("/preguntas");
            var observacionesMod = this.getView().getModel().getProperty("/observaciones");
            var interlocutoresMod = this.getView().getModel().getProperty("/interlocutores");
            var visitaMod = this.getView().getModel().getProperty("/visita");
            var fecha_resultado= this.getView().getModel().getProperty("/pedido/FechaResult");
            if (fecha_resultado=="") {
                 var date = new Date();
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
                var mm1 = (date.getMonth() + 4).toString(); // getMonth() is zero-based
                var dd  = date.getDate().toString();
                var fechaActual = yyyy +"/"+ (mm[1] ? mm : "0" + mm[0]) +"/"+ (dd[1] ? dd : "0" + dd[0]);
                fecha_resultado=fechaActual;
            }        
            var pedido = new Object();
            pedido.id= pedidoMod.id;//1503939092455  //pedidoMod.id;
            pedido.CodTipoDoc = pedidoMod.CodTipoDoc; //"ZO01";//pedidoMod.CodTipoDoc;
            pedido.CodTipoDocAnt = pedidoMod.CodTipoDocAnt; //"";//pedidoMod.CodTipoDocAnt;
            pedido.Referencia = "";//"";
            pedido.OrgVentas = pedidoMod.OrgVentas;//"1000";//pedidoMod.OrgVentas;
            pedido.CanalDist = pedidoMod.CanalDist;//"10";//pedidoMod.CanalDist;
            pedido.CodOficina = pedidoMod.CodOficina;//"1010";//pedidoMod.CodOficina;
            pedido.CondPago = pedidoMod.CondPago;//"E000";//pedidoMod.CondPago;
            pedido.Moneda = pedidoMod.Moneda;//"PEN";//pedidoMod.Moneda;
            pedido.CondExp = pedidoMod.CondExp;//"03";//pedidoMod.CondExp;
            pedido.FechaEntrega = this.convertirFechaSistema(pedidoMod.FechaEntrega);//"2017-08-28T16:51:32.455Z";//this.convertirFechaSistema(pedidoMod.FechaEntrega);
            pedido.FechaReparto = this.convertirFechaSistema(pedidoMod.FechaReparto);//null;
            pedido.TipoCambio = parseFloat(pedidoMod.TipoCambio);//3.282;//pedidoMod.TipoCambio;
            pedido.FechaFacturacion = this.convertirFechaSistema(pedidoMod.FechaFacturacion);//"2017-08-28T16:51:32.455Z";//this.convertirFechaSistema(pedidoMod.FechaFacturacion);
            pedido.CodigoBanco = pedidoMod.CodigoBanco; //"";//pedidoMod.CodigoBanco; 
            pedido.Motivo = pedidoMod.Motivo;//"";//pedidoMod.Motivo;
            pedido.BloqueoEntrega = pedidoMod.BloqueoEntrega;//"";//pedidoMod.BloqueoEntrega;
            pedido.BloqueoFactura = pedidoMod.BloqueoFactura;//"";//pedidoMod.BloqueoFactura;
            pedido.OrdenCompra = pedidoMod.OrdenCompra;//"";//pedidoMod.OrdenCompra; 
            pedido.FechaPedido = this.convertirFechaSistema(pedidoMod.FechaPedido);//"2017-08-28T16:51:32.455Z";//this.convertirFechaSistema(pedidoMod.FechaPedido);
            pedido.FechaValidez = this.convertirFechaSistema(pedidoMod.FechaValidez);//"2017-09-04T16:51:32.472Z";//this.convertirFechaSistema(pedidoMod.FechaValidez);
            pedido.FechaResult = this.convertirFechaSistema(fecha_resultado);
            pedido.Estado = "";//"";
            pedido.nomProyecto = pedidoMod.nomProyecto;//"";//pedidoMod.nomProyecto;
            pedido.TipoVisita = pedidoMod.TipoVisita;//"";//pedidoMod.TipoVisita;
            pedido.cbxReembolsable = pedidoMod.Reenbolsable;//false;//pedidoMod.Reenbolsable; 
            pedido.dsctoAdicionalZD12 = 0;//0;
            pedido.dsctoAdicionalZD12tmp = 0;//0;
            pedido.FechaPrecio = this.convertirFechaSistema(pedidoMod.FechaFacturacion);//null; //2017-07-19T05:00:00.000Z //**
            pedido.Mail = interlocutoresMod.AG.Cliente.Mail;//"";
            pedido.BonoCampania = (pedidoMod.BonoCampania==undefined) ? "" : pedidoMod.BonoCampania ;//"";
            pedido.RegaloCampania = (pedidoMod.RegaloCampania==undefined) ? "" : pedidoMod.RegaloCampania ;//"";
            pedido.Reenbolsable = pedidoMod.Reenbolsable;//false;//pedidoMod.Reenbolsable;
            pedido.PedidoVenta1 = this.getView().getModel().getProperty("/pedido/PedidoVenta1") == "" ? "null":this.getView().getModel().getProperty("/pedido/PedidoVenta1");//"";
            pedido.PedidoVenta2 = this.getView().getModel().getProperty("/pedido/PedidoVenta2") == "" ? "null":this.getView().getModel().getProperty("/pedido/PedidoVenta2") ;//"";
            pedido.PedidoVenta3 = this.getView().getModel().getProperty("/pedido/PedidoVenta3") == "" ? "null":this.getView().getModel().getProperty("/pedido/PedidoVenta3");//"";
            pedido.PedidoVenta4 = this.getView().getModel().getProperty("/pedido/PedidoVenta4") == "" ? "null":this.getView().getModel().getProperty("/pedido/PedidoVenta4");//"";
            pedido.PedidoVisita1 = this.getView().getModel().getProperty("/pedido/PedidoVisita1");//"";
            pedido.PedidoVisita2 = this.getView().getModel().getProperty("/pedido/PedidoVisita3") == "" ? "null":this.getView().getModel().getProperty("/pedido/PedidoVisita3");//"";
            pedido.PedidoVisita3 = this.getView().getModel().getProperty("/pedido/PedidoVisita2") == "" ? "null":this.getView().getModel().getProperty("/pedido/PedidoVisita2");//"";
            pedido.PedidoVisita4 = this.getView().getModel().getProperty("/pedido/PedidoVisita4") == "" ? "null":this.getView().getModel().getProperty("/pedido/PedidoVisita4");//"";
            pedido.SubtotalImp = (pedidoMod.SubtotalImp=="") ? 0 : parseFloat(pedidoMod.SubtotalImp) ;//0;
            pedido.TieneEntrega = pedidoMod.TieneEntrega == true ? pedidoMod.TieneEntrega : false;//false;
            pedido.DocOriginal = pedidoMod.DocOriginal==undefined? "":  pedidoMod.DocOriginal;//"";
            pedido.Znpiso = pedidoMod.Znpiso;//"";//pedidoMod.Znpiso;
            pedido.Ztransporte = pedidoMod.Ztransporte;//"";//pedidoMod.Ztransporte;
            pedido.Zasensor = pedidoMod.Zasensor;//false;//pedidoMod.Zasensor;
            pedido.Zncservicio = pedidoMod.Zncservicio;//false;//pedidoMod.Zncservicio;
            pedido.TieneKitCombo = false;//false;
            pedido.NumPedido = pedidoMod.NumPedido;//"";
            pedido.NumPedidoCorto = "";//"";
            pedido.FechaPedidoString = pedidoMod.FechaPedido;//"";//pedidoMod.FechaPedido;
            pedido.FechaValidezString = pedidoMod.FechaValidez;//"";//pedidoMod.FechaValidez;
            pedido.FechaEntregaString = pedidoMod.FechaEntrega;//"";//pedidoMod.FechaEntrega;
            pedido.CodCliente = (clienteMod.Codigo=="") ? this.getView().getModel().getProperty("/clienteEventual/codigoCliente") : clienteMod.Codigo ;//"0000101317";//clienteMod.Codigo; 
            pedido.CodClienteCorto = "";//"";
            pedido.CodGrupoVend = pedidoMod.CodGrupoVend;//"";//pedidoMod.CodGrupoVend;
            pedido.Sector = pedidoMod.Sector;//"";
            pedido.SubTotal  =  parseFloat(pedidoMod.SubTotal); //*
            pedido.Igv  =  parseFloat(pedidoMod.Igv); //*
            pedido.Total  =  parseFloat(pedidoMod.Total); //*
            pedido.TotalImp  =  parseFloat(pedidoMod.TotalImp); //*
            pedido.PesoTotal = (pedidoMod.PesoTotal!="") ? pedidoMod.PesoTotal : 0;//0;//(pedidoMod.PesoTotal!= "") ? pedidoMod.PesoTotal : 0;
            pedido.GrupoCond = pedidoMod.GrupoCond;//"";
            pedido.Tratado = pedidoMod.Tratado == true ? pedidoMod.Tratado : false;//false;
            pedido.ClasePedidoCliente = "";//"";
            pedido.ClaseDocumento = "";//"";
            pedido.CodVendedor1 = interlocutoresMod.VE.Persona.CodPersona;//"00001802";//interlocutoresMod.VE.Persona.CodPersona;
            pedido.NomVendedor1 = interlocutoresMod.VE.Persona.Descripcion;//"Julio Edgardo Pingo";//interlocutoresMod.VE.Persona.Descripcion;
            pedido.TotalConIgv = 0;//0;
            pedido.textoAtencion = observacionesMod.ZP01.Descripcion;//"";//observacionesMod.ZP01.Descripcion;
            pedido.textoObsAdministrativas = observacionesMod.ZP05.Descripcion;//"";//observacionesMod.ZP06.Descripcion;
            pedido.textoRefFactura = observacionesMod.ZP06.Descripcion;//"";//observacionesMod.ZP07.Descripcion;
            pedido.textoRefDireccion = observacionesMod.ZP07.Descripcion; //"";//observacionesMod.ZP05.Descripcion; 
            pedido.correo = clienteMod.Mail;//"";
            pedido.codigoSolicitante = interlocutoresMod.AG.Cliente.Codigo;//"";//interlocutoresMod.AG.Cliente.Codigo;
            pedido.codigoDestFact = interlocutoresMod.RE.Cliente.Codigo;//"";//interlocutoresMod.RE.Cliente.Codigo;
            pedido.codigoResPago = interlocutoresMod.RG.Cliente.Codigo;//"";//interlocutoresMod.RG.Cliente.Codigo;
            pedido.nombreSolicitante = interlocutoresMod.AG.Cliente.Descripcion;//"";//interlocutoresMod.AG.Cliente.Descripcion;
            pedido.direccionSolicitante = interlocutoresMod.AG.Cliente.DireccionCompleta;//"";//interlocutoresMod.AG.Cliente.DireccionCompleta;
            pedido.codigoPostalSolicitante = interlocutoresMod.AG.Cliente.CodigoPostal;//"";//interlocutoresMod.AG.Cliente.CodigoPostal;
            pedido.telefonoSolicitante = interlocutoresMod.AG.Cliente.Telefono;//"";//interlocutoresMod.AG.Cliente.Telefono;
            pedido.nifSolicitante = interlocutoresMod.AG.Cliente.Ruc;//"";//interlocutoresMod.AG.Cliente.Ruc;
            pedido.codigoDestMerc = interlocutoresMod.WE.Cliente.Codigo;//"";//interlocutoresMod.WE.Cliente.Codigo;
            pedido.nombreDestMerc = interlocutoresMod.WE.Cliente.Descripcion;//"";//interlocutoresMod.WE.Cliente.Descripcion;
            pedido.direccionDestMerc = interlocutoresMod.WE.Cliente.DireccionCompleta;//"";//interlocutoresMod.WE.Cliente.DireccionCompleta;
            pedido.codigoPostalDestMerc = interlocutoresMod.WE.Cliente.CodigoPostal;//"";//interlocutoresMod.WE.Cliente.CodigoPostal;
            pedido.telefonoDestMerc = interlocutoresMod.WE.Cliente.Telefono;//"";//interlocutoresMod.WE.Cliente.Telefono;
            pedido.telefonoMovilDestMerc = interlocutoresMod.WE.Cliente.TelefonoMovil;//"";//interlocutoresMod.WE.Cliente.TelefonoMovil;
            pedido.nombreDestFact = interlocutoresMod.RE.Cliente.Descripcion;//"";//interlocutoresMod.RE.Cliente.Descripcion;
            pedido.direccionDestFact = interlocutoresMod.RE.Cliente.DireccionCompleta;//"";//interlocutoresMod.RE.Cliente.DireccionCompleta;
            pedido.codigoPostalDestFact = interlocutoresMod.RE.Cliente.CodigoPostal;//"";//interlocutoresMod.RE.Cliente.CodigoPostal;
            pedido.telefonoDestFact = interlocutoresMod.RE.Cliente.Telefono;//"";//interlocutoresMod.RE.Cliente.Telefono;
            pedido.nombreResPago = interlocutoresMod.RG.Cliente.Descripcion;//"";//interlocutoresMod.RG.Cliente.Descripcion;
            pedido.direccionResPago = interlocutoresMod.RG.Cliente.DireccionCompleta;//"";//interlocutoresMod.RG.Cliente.DireccionCompleta;
            pedido.codigoPostalResPago = interlocutoresMod.RG.Cliente.CodigoPostal;//"";//interlocutoresMod.RG.Cliente.CodigoPostal;
            pedido.telefonoResPago = interlocutoresMod.RG.Cliente.Telefono;//"";//interlocutoresMod.RG.Cliente.Telefono;
            pedido.nifResPago = clienteMod.Ruc;//"";//clienteMod.Ruc;
            pedido.codigoCliente = this.getView().getModel().getProperty("/clienteEventual/codigoCliente"); //pedidoMod.codigoCliente;//interlocutoresMod.AG.Cliente.Codigo//"0000101317";//clienteMod.Codigo;***************Revisar
            pedido.nombreCliente = this.getView().getModel().getProperty("/clienteEventual/nombreCliente"); //clienteMod.NOMBRE + " " + clienteMod.APPAT + " " +  clienteMod.APMAT;//"Cliente Eventual La Molina";//clienteMod.NOMBRE + " " + clienteMod.APPAT + " " +  clienteMod.APMAT;
            pedido.direccionCliente = clienteMod.DIREC;//"";//clienteMod.DIREC;
            pedido.apePatSolicitante = clienteMod.APPAT;//"";//clienteMod.APPAT;                    
            pedido.apeMatSolicitante = clienteMod.APMAT;//"";//clienteMod.APMAT;
            pedido.textoContacto = this.getView().getModel().getProperty("/observaciones/ZP09/Descripcion");//"";//visitaMod.textoContacto;
            pedido.textoDatosAdicionalesCliente = this.getView().getModel().getProperty("/observaciones/ZP10/Descripcion");//"";//visitaMod.textoDatosAdicionalesCliente;
            pedido.textoTelefonos = this.getView().getModel().getProperty("/observaciones/ZP12/Descripcion");//"";//visitaMod.textoTelefonos;
            pedido.textoDescripcionVisita = this.getView().getModel().getProperty("/observaciones/ZP13/Descripcion");//"";//visitaMod.textoDescripcionVisita;
            pedido.textoResultadoVisita = this.getView().getModel().getProperty("/observaciones/ZP11/Descripcion");//"";//visitaMod.textoResultadoVisita;
            pedido.textoDescripcionServInstalacion = this.getView().getModel().getProperty("/observaciones/ZP14/Descripcion");//"";
            

            pedido.datosCliente = this.crearClienteConReferencia();
            if(pedidoMod.NumPedido!=""){
                pedido.listaPre = this.getView().getModel().getProperty("/listCliPregResp");//"";
            }else{
                pedido.listaPre = "";//"";
            }
            
            pedido.TotalDcto = 0;//0;
            pedido.codProyecto = pedidoMod.codProyecto;//"";//pedidoMod.codProyecto;
            pedido.codVersion = pedidoMod.codVersion;//"";//pedidoMod.codVersion;
            pedido.GrupoForecast = pedidoMod.GrupoForecast;//"01";//pedidoMod.GrupoForecast;
            pedido.TipoForecast = pedidoMod.TipoForecast;//" ";//pedidoMod.TipoForecast;
            pedido.NoImpFac = "";//"";
            pedido.Certificado = pedidoMod.Certificado;//"";//pedidoMod.Certificado; 
            pedido.FechaVisita = this.convertirFechaSistema(pedidoMod.FechaVisita);//null;//null;
            pedido.Referencia = pedidoMod.Referencia;
            console.log("cliente////////////////////");
            console.log(clienteMod);
            return pedido;

        },  
        crearPedido: function() {
            var pedidoMod = this.getView().getModel().getProperty("/pedido");
            var clienteMod = this.getView().getModel().getProperty("/cliente");
            var preguntasMod = this.getView().getModel().getProperty("/preguntas");
            var observacionesMod = this.getView().getModel().getProperty("/observaciones");
            var interlocutoresMod = this.getView().getModel().getProperty("/interlocutores");
            var visitaMod = this.getView().getModel().getProperty("/visita");
            var cliente = new Object();

           cliente.Codigo = clienteMod.Codigo ; // null,
           cliente.Ruc = clienteMod.Ruc ; // null,
           cliente.Descripcion = clienteMod.Descripcion ; // null,
           cliente.Titulo = clienteMod.Titulo ; // null,
           cliente.Direccion = clienteMod.Direccion ; // null,
           cliente.DireccionCompleta = clienteMod.DireccionCompleta ; //cliente.LIMA 03 140101",
           cliente.Ciudad = clienteMod.Ciudad ; //cliente.140101",
           cliente.Pais = clienteMod.Pais ; //cliente.PE",
           cliente.CodigoPostal = clienteMod.CodigoPostal ; //cliente.LIMA 03",
           cliente.Distrito = clienteMod.Distrito ; // null,
           cliente.Telefono = clienteMod.Telefono ; //cliente.765432",
           cliente.TelefonoMovil = clienteMod.TelefonoMovil ; // null,
           cliente.Mail = clienteMod.Mail ; //cliente.mvelapatino@decorcenter.pe",
           cliente.TranspZone = clienteMod.TranspZone ; // null,
           cliente.PersonaFisica = clienteMod.PersonaFisica ; // false,
           cliente.Eventual = clienteMod.Eventual ; // false,
           cliente.Funcion = clienteMod.Funcion ; // null,
           cliente.CODIG = clienteMod.CODIG ; //cliente.12345678",
           cliente.APPAT = clienteMod.APPAT ; //cliente.vidal",
           cliente.APMAT = clienteMod.APMAT ; //cliente.luis",
           cliente.NOMBRE = clienteMod.NOMBRE ; //cliente.jose",
           cliente.DIREC = clienteMod.DIREC ; //cliente.AV. 123",
           cliente.ZCODE = clienteMod.ZCODE ; //cliente.",
           cliente.FECNAC = this.convertirFechaSistema(clienteMod.FECNAC) ; //cliente.2013-06-19T00:00:00",
           cliente.EDAD = clienteMod.EDAD ; //cliente.4",
           cliente.SEXO = clienteMod.SEXO ; //cliente.1",
           cliente.GRAINS = clienteMod.GRAINS ; //cliente.10",
           cliente.CODP = clienteMod.CODP ; // null,
           cliente.CODR = clienteMod.CODR ; // null,
           cliente.NIVELSE = clienteMod.NIVELSE ; //cliente.A",
           cliente.codigoCliente = clienteMod.codigoCliente ; // null,
           cliente.RANGOED = clienteMod.RANGOED ; // null,
           cliente.P1 = clienteMod.P1 ; // null,
           cliente.P10 = clienteMod.P10 ; // null,
           cliente.P15 = clienteMod.P15 ; // null,
           cliente.P20 = clienteMod.P20 ; // null,
           cliente.P25 = clienteMod.P25 ; // null,
           cliente.P30 = clienteMod.P30 ; // null,
           cliente.P35 = clienteMod.P35 ; // null,
           cliente.P40 = clienteMod.P40 ; // null,
           cliente.P45 = clienteMod.P45 ; // null,
           cliente.P50 = clienteMod.P50 ; // null,
           cliente.P55 = clienteMod.P55 ; // null


            var pedido = new Object();
            pedido.id= pedidoMod.id;//1503939092455  //pedidoMod.id;
            pedido.CodTipoDoc = pedidoMod.CodTipoDoc; //"ZO01";//pedidoMod.CodTipoDoc;
            pedido.CodTipoDocAnt = pedidoMod.CodTipoDocAnt; //"";//pedidoMod.CodTipoDocAnt;
            pedido.Referencia = "";//"";
            pedido.OrgVentas = pedidoMod.OrgVentas;//"1000";//pedidoMod.OrgVentas;
            pedido.CanalDist = pedidoMod.CanalDist;//"10";//pedidoMod.CanalDist;
            pedido.CodOficina = pedidoMod.CodOficina;//"1010";//pedidoMod.CodOficina;
            pedido.CondPago = pedidoMod.CondPago;//"E000";//pedidoMod.CondPago;
            pedido.Moneda = pedidoMod.Moneda;//"PEN";//pedidoMod.Moneda;
            pedido.CondExp = pedidoMod.CondExp;//"03";//pedidoMod.CondExp;
            pedido.FechaEntrega = this.convertirFechaSistema(pedidoMod.FechaEntrega);//"2017-08-28T16:51:32.455Z";//this.convertirFechaSistema(pedidoMod.FechaEntrega);
            pedido.FechaReparto = this.convertirFechaSistema(pedidoMod.FechaReparto);//null;
            pedido.TipoCambio = parseFloat(pedidoMod.TipoCambio);//3.282;//pedidoMod.TipoCambio;
            pedido.FechaFacturacion = this.convertirFechaSistema(pedidoMod.FechaFacturacion);//"2017-08-28T16:51:32.455Z";//this.convertirFechaSistema(pedidoMod.FechaFacturacion);
            pedido.CodigoBanco = pedidoMod.CodigoBanco; //"";//pedidoMod.CodigoBanco; 
            pedido.Motivo = pedidoMod.Motivo;//"";//pedidoMod.Motivo;
            pedido.BloqueoEntrega = pedidoMod.BloqueoEntrega;//"";//pedidoMod.BloqueoEntrega;
            pedido.BloqueoFactura = pedidoMod.BloqueoFactura;//"";//pedidoMod.BloqueoFactura;
            pedido.OrdenCompra = pedidoMod.OrdenCompra;//"";//pedidoMod.OrdenCompra; 
            pedido.FechaPedido = this.convertirFechaSistema(pedidoMod.FechaPedido);//"2017-08-28T16:51:32.455Z";//this.convertirFechaSistema(pedidoMod.FechaPedido);
            pedido.FechaValidez = this.convertirFechaSistema(pedidoMod.FechaValidez);//"2017-09-04T16:51:32.472Z";//this.convertirFechaSistema(pedidoMod.FechaValidez);
            pedido.Estado = "";//"";
            pedido.nomProyecto = pedidoMod.nomProyecto;//"";//pedidoMod.nomProyecto;
            pedido.TipoVisita = pedidoMod.TipoVisita;//"";//pedidoMod.TipoVisita;
            pedido.cbxReembolsable = pedidoMod.Reenbolsable;//false;//pedidoMod.Reenbolsable; 
            pedido.dsctoAdicionalZD12 = 0;//0;
            pedido.dsctoAdicionalZD12tmp = 0;//0;
            pedido.FechaPrecio = null;//null; //2017-07-19T05:00:00.000Z
            pedido.Mail = interlocutoresMod.AG.Cliente.Mail;//"";
            pedido.BonoCampania = (pedidoMod.BonoCampania==undefined) ? "" : pedidoMod.BonoCampania ;//"";
            pedido.RegaloCampania = (pedidoMod.RegaloCampania==undefined) ? "" : pedidoMod.RegaloCampania ;//"";
            pedido.Reenbolsable = pedidoMod.Reenbolsable;//false;//pedidoMod.Reenbolsable;
            pedido.PedidoVenta1 = this.getView().getModel().getProperty("/pedido/PedidoVenta1");//"";
            pedido.PedidoVenta2 = this.getView().getModel().getProperty("/pedido/PedidoVenta2");//"";
            pedido.PedidoVenta3 = this.getView().getModel().getProperty("/pedido/PedidoVenta3");//"";
            pedido.PedidoVenta4 = this.getView().getModel().getProperty("/pedido/PedidoVenta4");//"";
            pedido.PedidoVisita1 = this.getView().getModel().getProperty("/pedido/PedidoVisita1");//"";
            pedido.PedidoVisita2 = this.getView().getModel().getProperty("/pedido/PedidoVisita2");//"";
            pedido.PedidoVisita3 = this.getView().getModel().getProperty("/pedido/PedidoVisita3");//"";
            pedido.PedidoVisita4 = this.getView().getModel().getProperty("/pedido/PedidoVisita4");//"";
            pedido.SubtotalImp = (pedidoMod.SubtotalImp=="") ? 0 : parseFloat(pedidoMod.SubtotalImp) ;//0;
            pedido.TieneEntrega = pedidoMod.TieneEntrega == true ? pedidoMod.TieneEntrega : false;//false;
            pedido.DocOriginal = pedidoMod.DocOriginal == undefined ? "" : pedidoMod.DocOriginal ;//"";
            pedido.Znpiso = pedidoMod.Znpiso;//"";//pedidoMod.Znpiso;
            pedido.Ztransporte = pedidoMod.Ztransporte;//"";//pedidoMod.Ztransporte;
            pedido.Zasensor = pedidoMod.Zasensor;//false;//pedidoMod.Zasensor;
            pedido.Zncservicio = pedidoMod.Zncservicio;//false;//pedidoMod.Zncservicio;
            pedido.TieneKitCombo = false;//false;
            pedido.NumPedido = pedidoMod.NumPedido;//"";
            pedido.NumPedidoCorto = "";//"";
            pedido.FechaPedidoString = pedidoMod.FechaPedido;//"";//pedidoMod.FechaPedido;
            pedido.FechaValidezString = pedidoMod.FechaValidez;//"";//pedidoMod.FechaValidez;
            pedido.FechaEntregaString = pedidoMod.FechaEntrega;//"";//pedidoMod.FechaEntrega;
            pedido.CodCliente = (clienteMod.Codigo=="") ? this.getView().getModel().getProperty("/clienteEventual/codigoCliente") : clienteMod.Codigo ;//"0000101317";//clienteMod.Codigo; 
            pedido.CodClienteCorto = "";//"";
            pedido.CodGrupoVend = pedidoMod.CodGrupoVend;//"";//pedidoMod.CodGrupoVend;
            pedido.Sector = pedidoMod.Sector;//"";
            pedido.SubTotal  =  parseFloat(pedidoMod.SubTotal); //*
            pedido.Igv  =  parseFloat(pedidoMod.Igv); //*
            pedido.Total  =  parseFloat(pedidoMod.Total); //*
            pedido.TotalImp  =  parseFloat(pedidoMod.TotalImp); //*
            pedido.PesoTotal = (pedidoMod.PesoTotal!="") ? pedidoMod.PesoTotal : 0;//0;//(pedidoMod.PesoTotal!= "") ? pedidoMod.PesoTotal : 0;
            pedido.GrupoCond = pedidoMod.GrupoCond;//"";
            pedido.Tratado = pedidoMod.Tratado == true ? pedidoMod.Tratado : false;//false;
            pedido.ClasePedidoCliente = "";//"";
            pedido.ClaseDocumento = "";//"";
            pedido.CodVendedor1 = interlocutoresMod.VE.Persona.CodPersona;//"00001802";//interlocutoresMod.VE.Persona.CodPersona;
            pedido.NomVendedor1 = interlocutoresMod.VE.Persona.Descripcion;//"Julio Edgardo Pingo";//interlocutoresMod.VE.Persona.Descripcion;
            pedido.TotalConIgv = 0;//0;
            pedido.textoAtencion = observacionesMod.ZP01.Descripcion;//"";//observacionesMod.ZP01.Descripcion;
            pedido.textoObsAdministrativas = observacionesMod.ZP05.Descripcion;//"";//observacionesMod.ZP06.Descripcion;
            pedido.textoRefFactura = observacionesMod.ZP06.Descripcion;//"";//observacionesMod.ZP07.Descripcion;
            pedido.textoRefDireccion = observacionesMod.ZP07.Descripcion; //"";//observacionesMod.ZP05.Descripcion;  
            pedido.correo = clienteMod.Mail;//"";
            pedido.codigoSolicitante = interlocutoresMod.AG.Cliente.Codigo;//"";//interlocutoresMod.AG.Cliente.Codigo;
            pedido.codigoDestFact = interlocutoresMod.RE.Cliente.Codigo;//"";//interlocutoresMod.RE.Cliente.Codigo;
            pedido.codigoResPago = interlocutoresMod.RG.Cliente.Codigo;//"";//interlocutoresMod.RG.Cliente.Codigo;
            pedido.nombreSolicitante = interlocutoresMod.AG.Cliente.Descripcion;//"";//interlocutoresMod.AG.Cliente.Descripcion;
            pedido.direccionSolicitante = interlocutoresMod.AG.Cliente.DireccionCompleta;//"";//interlocutoresMod.AG.Cliente.DireccionCompleta;
            pedido.codigoPostalSolicitante = interlocutoresMod.AG.Cliente.CodigoPostal;//"";//interlocutoresMod.AG.Cliente.CodigoPostal;
            pedido.telefonoSolicitante = interlocutoresMod.AG.Cliente.Telefono;//"";//interlocutoresMod.AG.Cliente.Telefono;
            pedido.nifSolicitante = interlocutoresMod.AG.Cliente.Ruc;//"";//interlocutoresMod.AG.Cliente.Ruc;
            pedido.codigoDestMerc = interlocutoresMod.WE.Cliente.Codigo;//"";//interlocutoresMod.WE.Cliente.Codigo;
            pedido.nombreDestMerc = interlocutoresMod.WE.Cliente.Descripcion;//"";//interlocutoresMod.WE.Cliente.Descripcion;
            pedido.direccionDestMerc = interlocutoresMod.WE.Cliente.DireccionCompleta;//"";//interlocutoresMod.WE.Cliente.DireccionCompleta;
            pedido.codigoPostalDestMerc = interlocutoresMod.WE.Cliente.CodigoPostal;//"";//interlocutoresMod.WE.Cliente.CodigoPostal;
            pedido.telefonoDestMerc = interlocutoresMod.WE.Cliente.Telefono;//"";//interlocutoresMod.WE.Cliente.Telefono;
            pedido.telefonoMovilDestMerc = interlocutoresMod.WE.Cliente.TelefonoMovil;//"";//interlocutoresMod.WE.Cliente.TelefonoMovil;
            pedido.nombreDestFact = interlocutoresMod.RE.Cliente.Descripcion;//"";//interlocutoresMod.RE.Cliente.Descripcion;
            pedido.direccionDestFact = interlocutoresMod.RE.Cliente.DireccionCompleta;//"";//interlocutoresMod.RE.Cliente.DireccionCompleta;
            pedido.codigoPostalDestFact = interlocutoresMod.RE.Cliente.CodigoPostal;//"";//interlocutoresMod.RE.Cliente.CodigoPostal;
            pedido.telefonoDestFact = interlocutoresMod.RE.Cliente.Telefono;//"";//interlocutoresMod.RE.Cliente.Telefono;
            pedido.nombreResPago = interlocutoresMod.RG.Cliente.Descripcion;//"";//interlocutoresMod.RG.Cliente.Descripcion;
            pedido.direccionResPago = interlocutoresMod.RG.Cliente.DireccionCompleta;//"";//interlocutoresMod.RG.Cliente.DireccionCompleta;
            pedido.codigoPostalResPago = interlocutoresMod.RG.Cliente.CodigoPostal;//"";//interlocutoresMod.RG.Cliente.CodigoPostal;
            pedido.telefonoResPago = interlocutoresMod.RG.Cliente.Telefono;//"";//interlocutoresMod.RG.Cliente.Telefono;
            pedido.nifResPago = clienteMod.Ruc;//"";//clienteMod.Ruc;
            pedido.codigoCliente = this.getView().getModel().getProperty("/clienteEventual/codigoCliente"); //pedidoMod.codigoCliente;//interlocutoresMod.AG.Cliente.Codigo//"0000101317";//clienteMod.Codigo;***************Revisar
            pedido.nombreCliente = this.getView().getModel().getProperty("/clienteEventual/nombreCliente"); //clienteMod.NOMBRE + " " + clienteMod.APPAT + " " +  clienteMod.APMAT;//"Cliente Eventual La Molina";//clienteMod.NOMBRE + " " + clienteMod.APPAT + " " +  clienteMod.APMAT;
            pedido.direccionCliente = clienteMod.DIREC;//"";//clienteMod.DIREC;
            pedido.apePatSolicitante = clienteMod.APPAT;//"";//clienteMod.APPAT;                    
            pedido.apeMatSolicitante = clienteMod.APMAT;//"";//clienteMod.APMAT;
            pedido.textoContacto = this.getView().getModel().getProperty("/observaciones/ZP09/Descripcion");//"";//visitaMod.textoContacto;
            pedido.textoDatosAdicionalesCliente = this.getView().getModel().getProperty("/observaciones/ZP10/Descripcion");//"";//visitaMod.textoDatosAdicionalesCliente;
            pedido.textoTelefonos = this.getView().getModel().getProperty("/observaciones/ZP12/Descripcion");//"";//visitaMod.textoTelefonos;
            pedido.textoDescripcionVisita = this.getView().getModel().getProperty("/observaciones/ZP13/Descripcion");//"";//visitaMod.textoDescripcionVisita;
            pedido.textoResultadoVisita = this.getView().getModel().getProperty("/observaciones/ZP11/Descripcion");//"";//visitaMod.textoResultadoVisita;
            pedido.textoDescripcionServInstalacion = this.getView().getModel().getProperty("/observaciones/ZP14/Descripcion");//"";
            
            if(pedidoMod.NumPedido!=""){
                pedido.datosCliente = cliente;
                pedido.listaPre = this.getView().getModel().getProperty("/listCliPregResp");//"";
            }else{
                pedido.datosCliente = "";
                pedido.listaPre = "";//"";
            }
            
            pedido.TotalDcto = 0;//0;
            pedido.codProyecto = pedidoMod.codProyecto;//"";//pedidoMod.codProyecto;
            pedido.codVersion = pedidoMod.codVersion;//"";//pedidoMod.codVersion;
            pedido.GrupoForecast = pedidoMod.GrupoForecast;//"01";//pedidoMod.GrupoForecast;
            pedido.TipoForecast = pedidoMod.TipoForecast;//" ";//pedidoMod.TipoForecast;
            pedido.NoImpFac = "";//"";
            pedido.Certificado = pedidoMod.Certificado;//"";//pedidoMod.Certificado; 
            pedido.FechaVisita = this.convertirFechaSistema(pedidoMod.FechaVisita);//null;//null;
            pedido.Referencia = pedidoMod.Referencia;
            console.log("cliente////////////////////");
            console.log(clienteMod);
            return pedido;
        },        
        crearDescuentosGuardar: function() {
            var id = 0;
            var listaDescuentos = new Array();
            var materiales = this.getView().getModel().getProperty("/listaMaterial");
            try{
                for(var indiceM in materiales) {                
                var listaPrincipal = materiales[indiceM].DescuentoPrincipal;
                var listaOtros = materiales[indiceM].DescuentoOtros;

                if(listaPrincipal != undefined && listaOtros != undefined) {
                    var posicion = materiales[indiceM].PosicionCorto;
                    var descuentos = listaPrincipal.concat(listaOtros);

                    /////////Inicio Nueva Validacion Descuentos/////////////////////////
                    var desPrin = JSON.parse(sessionStorage["DsctosPrinDocNuevoOriginal"+posicion]);
                    var desOtros = JSON.parse(sessionStorage["DsctosOtrosDocNuevoOriginal"+posicion]);
                    var descuentosOriginales = desPrin.concat(desOtros);
                    for(var indice in descuentosOriginales) {
                        id = id +1;
                        var descuento = descuentosOriginales[indice];
                        descuento.id= id;
                        descuento.matPosicion = posicion;      //descuento.Posicion

                        var buscarDscto = descuentos.filter(function(el) {
                                return el.Condicion == descuentosOriginales[indice].Condicion ;
                        });
                        if(buscarDscto.length>0){
                            buscarDscto[0].id= id;
                            buscarDscto[0].matPosicion = parseInt(posicion); 
                            buscarDscto[0].Moneda = "";
                            buscarDscto[0].iconBtnCalcular = null;
                            listaDescuentos.push(buscarDscto[0]);
                        }else{
                            descuentosOriginales[indice].Moneda = "";
                            descuentosOriginales[indice].iconBtnCalcular = null;
                            descuentosOriginales[indice].matPosicion = descuentosOriginales[indice].matPosicion;
                            listaDescuentos.push(descuentosOriginales[indice]);
                        }
                        


                    }
                    /////////End Nueva Validacion Descuentos//////////////////////////////
                    /*for(var indice in descuentos) {
                        id = id +1;
                        var descuento = descuentos[indice];
                        descuento.id= id;
                        descuento.matPosicion = posicion;      //descuento.Posicion
                        listaDescuentos.push(descuento);
                    }*/
                }
            }            
            }catch(ex){}
            
            return listaDescuentos;

        },
        crearDescuentos: function() {
            var id = 0;
            var listaDescuentos = new Array();
            var materiales = this.getView().getModel().getProperty("/listaMaterial");

            for(var indiceM in materiales) {                
                var listaPrincipal = materiales[indiceM].DescuentoPrincipal;
                var listaOtros = materiales[indiceM].DescuentoOtros;

                if(listaPrincipal != undefined && listaOtros != undefined) {
                    var posicion = materiales[indiceM].PosicionCorto;
                    var descuentos = listaPrincipal.concat(listaOtros);

                    
                    for(var indice in descuentos) {
                        id = id +1;
                        var descuento = descuentos[indice];
                        descuento.id= id;
                        descuento.matPosicion = posicion;      //descuento.Posicion
                        listaDescuentos.push(descuento);
                    }
                }
            }            
            return listaDescuentos;

        },
        crearInterlocutores: function() {
            var listaInterlocutores = new Array();
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var listInter =["AG","RE","WE","RG","VE","Z3","V2","V3","V4","Z2","Z5"];
            var cont = 0;
            for(var indice in listInter) {
                var interlocutor = new Object();  
                cont = cont + 1;              
                interlocutor.id = cont ;
                interlocutor.PedidoId = 0 ;
                interlocutor.Funcion = interlocutores[listInter[indice]].Funcion ;
                interlocutor.Codigo = interlocutores[listInter[indice]].Cliente.Codigo ;
                interlocutor.Ruc = interlocutores[listInter[indice]].Cliente.Ruc ;
                interlocutor.Descripcion = interlocutores[listInter[indice]].Cliente.Descripcion ;
                interlocutor.Titulo = "" ;
                interlocutor.Direccion = interlocutores[listInter[indice]].Cliente.Direccion ;
                interlocutor.DireccionCompleta = interlocutores[listInter[indice]].Cliente.Direccion + " " + interlocutores[listInter[indice]].Cliente.CodigoPostal + " " +  interlocutores[listInter[indice]].Cliente.Ciudad ;
                
                var ubigeo = this.getView().getModel().getProperty("/dataIni/lstZipCodes"); 
                    var ciudad = jQuery.grep(ubigeo, function(item, i){ 
                          return (item.Codigo == interlocutores[listInter[indice]].Cliente.CodigoPostal) ;
                    });

                interlocutor.Ciudad = ciudad.length>0 ? ciudad[0].Descripcion: "";//interlocutores[listInter[indice]].Cliente.Ciudad //this.getView().byId("com_distrito_solicitante").getSelectedItem().getText();
                interlocutor.Pais = interlocutores[listInter[indice]].Cliente.Pais ;
                interlocutor.CodigoPostal = interlocutores[listInter[indice]].Cliente.CodigoPostal ;
                interlocutor.Distrito = interlocutores[listInter[indice]].Cliente.Ciudad;
                interlocutor.Telefono = interlocutores[listInter[indice]].Cliente.Telefono ;
                interlocutor.TelefonoMovil = interlocutores[listInter[indice]].Cliente.TelefonoMovil ;
                interlocutor.Mail = interlocutores[listInter[indice]].Cliente.Mail ;
                interlocutor.PersonaFisica = interlocutores[listInter[indice]].Cliente.PersonaFisica ;
                interlocutor.Eventual = interlocutores[listInter[indice]].Cliente.Eventual;
                interlocutor.ApPat = "";
                interlocutor.ApMat = "" ;
                interlocutor.TranspZone = "" ;
                interlocutor.CodPersona = interlocutores[listInter[indice]].Persona.CodPersona ;
                interlocutor.Nombre = "" ;
                interlocutor.Apellido = "" ;
                interlocutor.Iniciales = "" ;
                interlocutor.ApeSoltero = "" ;
                interlocutor.DescripcionP = "" ;
                interlocutor.Dni = interlocutores[listInter[indice]].Cliente.Ruc ;
                interlocutor.TelefonoP = "" ;              
                listaInterlocutores.push(interlocutor);
            }
            return listaInterlocutores;
        },        
        crearInterlocutoresConReferencia: function() {
            var listaInterlocutores = new Array();
            var interlocutores = this.getView().getModel().getProperty("/interlocutores");
            var listInter =["AG","RE","WE","RG","VE","Z3","V2","V3","V4","Z2","Z5"];
            var cont = 0;
            for(var indice in listInter) {
                var interlocutor = new Object();  
                cont = cont + 1;              
                interlocutor.id = cont ;
                interlocutor.PedidoId = 0 ;
                interlocutor.Funcion = interlocutores[listInter[indice]].Funcion ;
                interlocutor.Codigo = (interlocutores[listInter[indice]].Cliente.Codigo ==null) ? "": interlocutores[listInter[indice]].Cliente.Codigo;
                interlocutor.Ruc = interlocutores[listInter[indice]].Cliente.Ruc ;
                interlocutor.Descripcion = (interlocutores[listInter[indice]].Cliente.Descripcion ==null) ? "":interlocutores[listInter[indice]].Cliente.Descripcion ;
                interlocutor.Titulo = "" ;
                interlocutor.Direccion = interlocutores[listInter[indice]].Cliente.Direccion ;
                interlocutor.DireccionCompleta = interlocutores[listInter[indice]].Cliente.Direccion + " " + interlocutores[listInter[indice]].Cliente.CodigoPostal + " " +  interlocutores[listInter[indice]].Cliente.Ciudad ;
                var ubigeo = this.getView().getModel().getProperty("/dataIni/lstZipCodes"); 
                    var ciudad = jQuery.grep(ubigeo, function(item, i){ 
                          return (item.Codigo == interlocutores[listInter[indice]].Cliente.CodigoPostal) ;
                    });
                interlocutor.Ciudad = ciudad.length>0 ? ciudad[0].Descripcion: "";//(interlocutores[listInter[indice]].Cliente.Ciudad ==null) ? "":interlocutores[listInter[indice]].Cliente.Ciudad //this.getView().byId("com_distrito_solicitante").getSelectedItem().getText();
                interlocutor.Pais = interlocutores[listInter[indice]].Cliente.Pais ;
                interlocutor.CodigoPostal = interlocutores[listInter[indice]].Cliente.CodigoPostal ;
                interlocutor.Distrito = (interlocutores[listInter[indice]].Cliente.Ciudad ==null) ? "":interlocutores[listInter[indice]].Cliente.Ciudad;
                interlocutor.Telefono = interlocutores[listInter[indice]].Cliente.Telefono ;
                interlocutor.TelefonoMovil = interlocutores[listInter[indice]].Cliente.TelefonoMovil ;
                interlocutor.Mail = (interlocutores[listInter[indice]].Cliente.Mail==null) ? "":interlocutores[listInter[indice]].Cliente.Mail ;
                interlocutor.PersonaFisica = interlocutores[listInter[indice]].Cliente.PersonaFisica ;
                interlocutor.Eventual = interlocutores[listInter[indice]].Cliente.Eventual;
                interlocutor.ApPat = "";
                interlocutor.ApMat = "" ;
                interlocutor.TranspZone = "" ;
                interlocutor.CodPersona = interlocutores[listInter[indice]].Persona.CodPersona ;
                interlocutor.Nombre = "" ;
                interlocutor.Apellido = "" ;
                interlocutor.Iniciales = "" ;
                interlocutor.ApeSoltero = "" ;
                interlocutor.DescripcionP = "" ;
                interlocutor.Dni = interlocutores[listInter[indice]].Cliente.Ruc ;
                interlocutor.TelefonoP = "" ;              
                listaInterlocutores.push(interlocutor);
            }
            return listaInterlocutores;
        },        
        crearRepartos: function() {
            var listaRepartos = new Array();
            var materiales = this.getView().getModel().getProperty("/listaMaterial"); //erick
            var zid = 0;

            for(var indice in materiales) {
                //////Roy/////////////////////////////////////////////////////////////////////////////
                /*var repartos = materiales[indice].Repartos;
                    for (var i = repartos.length; i >0 ; i--) {
                            repartos.splice(i-1, 1);
                            this.getView().getModel().refresh(); 
                        }
                    //agregar
                        var fechaHoy = new Date();                                      
                        var fechaHoyString = moment(fechaHoy.getTime()).format('DD/MM/YYYY');    
                            var repartoNuevo = new Object();
                            repartoNuevo.TipoReparto = "";
                            repartoNuevo.Pos = "0001";
                            repartoNuevo.PosCorto = "1";
                            repartoNuevo.CantConf = materiales[indice].Cantidad;                        
                            repartoNuevo.FechaEntrega = fechaHoyString;
                            repartoNuevo.CantPed = materiales[indice].Cantidad;
                            repartos.push(repartoNuevo); 
                            this.getView().getModel().refresh();    */ 
                ///////////////////////////////////////////////////////////////////////////////////
                //Segundo Ultimo Funcionando
                /*var zpos = 0;
                for(var cont in materiales[indice].Repartos) {
                    var rep = materiales[indice].Repartos[cont];
                    zid = zid + 1;
                    zpos = zpos + 1;
                    var reparto = new Object();
                    reparto.matPosicion = parseInt(materiales[indice].PosicionCorto) ;
                    reparto.id = zid;
                    reparto.TipoReparto =  rep.TipoReparto; //
                    reparto.Pos = rep.Pos ; //
                    reparto.PosCorto = rep.PosCorto; //
                    reparto.FechaEntrega = this.convertirFechaSistema(rep.FechaEntrega);
                    reparto.CantPed = rep.CantConf ;
                    reparto.CantConf = rep.CantConf ;
                    reparto.CodUMedida = (rep.CodUMedida==null) ? "" : rep.CodUMedida  ;
                    
                    listaRepartos.push(reparto);  
                }*/
                /*29-01-2018*/
                try{
                    var zpos = 0;
                    var rep = materiales[indice].Repartos[0];
                    zid = zid + 1;
                    zpos = zpos + 1;
                    var reparto = new Object();
                    reparto.matPosicion = parseInt(materiales[indice].PosicionCorto) ;
                    reparto.id = zid;
                    reparto.TipoReparto =  rep.TipoReparto; //
                    reparto.Pos = rep.Pos ; //
                    reparto.PosCorto = rep.PosCorto; //
                    reparto.FechaEntrega = this.convertirFechaSistema(rep.FechaEntrega);
                    reparto.CantPed = materiales[indice].Cantidad;//rep.CantConf ;
                    reparto.CantConf = materiales[indice].Cantidad; //rep.CantConf ;
                    reparto.CodUMedida = (rep.CodUMedida==null) ? "" : rep.CodUMedida  ;
                    
                    listaRepartos.push(reparto); 
                }catch(exe){}
                

            }
            return listaRepartos;    
        },
        crearMateriales: function() {
            var listaMateriales = new Array();
            var materiales = this.getView().getModel().getProperty("/listaMaterial");
            console.log(materiales);

            for(var indice in materiales) {
                var material = new Object();
                var crearId = indice ;
                material.id= parseInt(crearId)+1 ;
                material.CodMaterial= materiales[indice].CodMaterial ;
                material.CodUMedida= materiales[indice].CodUMedida ;
                material.Descripcion= (materiales[indice].Descripcion != null ) ? materiales[indice].Descripcion : ""; //Material
                material.Jerarquia= "" ;// materiales.Material.Jerarquia //Cuando lo enviaba salia vacio, aun cuando agregabas material retornaba lleno
                material.ValorRendimiento=  materiales[indice].ValorRendimiento ;
                material.TipoMaterial= materiales[indice].TipoMaterial ;
                ///////////////////////////////////////////////////////////////////
                material.EsFlete= (materiales[indice].EsFlete == undefined ) ? false : materiales[indice].EsFlete ; //Material
                material.EsEstiba= (materiales[indice].EsEstiba == undefined ) ? false : materiales[indice].EsEstiba ; //Material
                material.EspecialServ= (materiales[indice].EspecialServ == undefined ) ? false : materiales[indice].EspecialServ ; //Material
                material.Tipo= (materiales[indice].Tipo == undefined ) ? "" : materiales[indice].Tipo ; //Material
                material.CodMaterialCorto= materiales[indice].CodMaterialCorto ;
                material.TieneServ= (materiales[indice].EspecialServ == undefined ) ? false : materiales[indice].EspecialServ  ; //Material //Al cambiar por TieneServ al grabar doc aparece NOTA
                material.Rendimiento= materiales[indice].Rendimiento ;
                material.DescMovil= materiales[indice].PosicionCorto+" - "+materiales[indice].DescMovil ;
                material.Descontinuado= materiales[indice].Descontinuado ;
                material.UMedidaRendimiendo= materiales[indice].UMedidaRendimiendo ;
                material.DescMaterial= materiales[indice].DescMaterial ;
                material.PrecioUnit= 0;//(materiales[indice].PrecioUnit == undefined ) ? 0 : materiales[indice].PrecioUnit ;// materiales[indice].PrecioUnit ; //Material
                material.Peso= materiales[indice].Peso ; //*Revisar*
                material.Stock= (materiales[indice].Stock ==undefined) ? 0 : materiales[indice].Stock ;//materiales[indice].Stock ; //Material
                material.Mstae= (materiales[indice].MSTAE == undefined ) ? "" : materiales[indice].MSTAE   ; //Material
                ///////////////////////////////////////////////////////////////////
                material.Vdscto= "0"; //*(materiales[indice].Vdscto==undefined) ? "":materiales[indice].Vdscto ;
                material.StatusDespacho= (materiales[indice].StatusDespacho != null) ? materiales[indice].StatusDespacho : "";
                material.StockPos= (materiales[indice].StockPos!= null) ? materiales[indice].StockPos : "";//*
                material.Posicion= materiales[indice].Posicion ;
                material.Cantidad= parseFloat( materiales[indice].Cantidad ) ;
                material.CodCentro= (materiales[indice].CodCentro==undefined) ? "":materiales[indice].CodCentro; //"9110" ; // materiales[indice].CodCentro ; // materiales[indice].CodCentro
                material.CodAlmacen= (materiales[indice].CodAlmacen==undefined) ? "":materiales[indice].CodAlmacen; //"0001";// materiales[indice].CodAlmacen ;// materiales[indice].CodAlmacen
                material.CodLote= (materiales[indice].CodLote==0) ? "":materiales[indice].CodLote; //"1000LD"; // materiales[indice].CodLote ;// materiales[indice].CodLote
                material.PrecioSinIGV= materiales[indice].PrecioUnitario ;
                material.DsctoMontTotal= materiales[indice].DsctoMontTotal ;
                material.MotivoRechazo= materiales[indice].MotivoRechazo ;
                material.TipoPosAnt= (materiales[indice].TipoPosAnt != null) ? materiales[indice].TipoPosAnt :"";
                material.CodGrupoMat= materiales[indice].CodGrupoMat; // materiales[indice].CodGrupoMat ;
                material.Opcion= materiales[indice].Opcion ;
                material.Reembolsable= (materiales[indice].Reembolsable!= null) ? materiales[indice].Reembolsable: "" ;
                material.Zservicio= materiales[indice].Zservicio ;
                material.ContentID= materiales[indice].ContentID ;
                material.DescMaterialTicketera= materiales[indice].DescMaterialTicketera ;
                material.PrioridadEntrega= materiales[indice].PrioridadEntrega ;
                var numPedido = this.getView().getModel().getProperty("/pedido/NumPedido");
                    if(numPedido!=""){
                        material.FechaCantConf= (materiales[indice].FechaCantConfStr=="-") ? this.convertirFechaSistema(materiales[indice].FechaCantConf): this.convertirFechaSistema(materiales[indice].FechaCantConfStr);
                    }else{
                        material.FechaCantConf= (materiales[indice].FechaCantConfStr=="-") ? materiales[indice].FechaCantConf:materiales[indice].FechaCantConfStr;
                    }
                material.FechaCantConfStr= materiales[indice].FechaCantConfStr ; //CAMBIAR PORQUE APARECE POSICION
                material.PosSup= materiales[indice].PosSup ;
                material.PosSupCorto= materiales[indice].PosSupCorto ;
                material.TipoPosicion= (materiales[indice].TipoPosicion!= null)?materiales[indice].TipoPosicion :"";// materiales[indice].TipoPosicion
                material.CambAlmacen= materiales[indice].CambAlmacen ;
                material.CantComp= materiales[indice].CantComp ;
                material.PrecioTotal= (materiales[indice].PrecioTotal != null)? materiales[indice].PrecioTotal:0 ; // materiales[indice].PrecioTotal
                material.PrecioUnitario= materiales[indice].PrecioUnitario
                material.Total= (materiales[indice].Total == undefined)? 0:materiales[indice].Total ;//materiales[indice].PrecioUnit ;// materiales[indice].Total
                material.IgvUnitario=  (materiales[indice].IgvUnitario != null)?materiales[indice].IgvUnitario :0  ;// materiales[indice].IgvUnitario
                material.IgvTotal=  (materiales[indice].IgvTotal != null)? materiales[indice].IgvTotal:0 ;// materiales[indice].IgvTotal
                material.TotalDctos=  (materiales[indice].TotalDctos != null)? materiales[indice].TotalDctos:0  ;// materiales[indice].TotalDctos
                material.SubTotal= (materiales[indice].SubTotal != null)? materiales[indice].SubTotal:0  ;// materiales[indice].SubTotal
                material.CantConfirmada= materiales[indice].CantConfirmada ;// materiales[indice].CantConfirmada
                material.PesoNeto= materiales[indice].Peso*materiales[indice].Cantidad ;
                material.PrecioConIGV= materiales[indice].Total ;
                material.TotalImpresion= materiales[indice].Total ;
                material.DescCentro= (materiales[indice].DescCentro == undefined)? "":materiales[indice].DescCentro; //"Distribución"; // (materiales[indice].DescCentro == undefined)? "":materiales[indice].DescCentro   ;
                material.DescAlmacen= (materiales[indice].DescAlmacen == null)? "":materiales[indice].DescAlmacen  ;
                material.FechaEntregaString= materiales[indice].FechaEntregaString ;
                material.Reparto= materiales[indice].Reparto ;
                material.TotPercep=  (materiales[indice].TotPercep != null)? materiales[indice].TotPercep:0 ;// materiales[indice].TotPercep
                material.link= (materiales[indice].link == undefined)? "" :materiales[indice].link  ;
                material.DesGrupoMat= materiales[indice].DesGrupoMat ;
                material.DivisionRendimiento= materiales[indice].DivisionRendimiento ;
                material.mod= ""; //materiales[indice].mod ;
                material.PosicionCorto= materiales[indice].PosicionCorto ;
                material.SubTotalLista=  (materiales[indice].SubTotal != null)? materiales[indice].SubTotal:0 ;
                material.fullName= materiales[indice].CodCentro+" "+materiales[indice].DescCentro+" / "+materiales[indice].CodAlmacen+" / "+materiales[indice].CodLote ; //"9110 Distribución / 0001 / 1000LD" ;// materiales[indice].CodCentro+" "+materiales[indice].DescCentro+" / "+materiales[indice].CodAlmacen+" / "+materiales[indice].CodLote ;
                
                listaMateriales.push(material);
            }
            console.log("listaMaterial//////////////////////////////////////");
            console.log(materiales);
            return listaMateriales;

        },        
        agregarDatosPedido: function(pedido) {
            var pedidoMod = this.getView().getModel().getProperty("/pedido");
            pedidoMod.Igv = pedidoMod.Igv;
            pedidoMod.Percepcion = pedido.Percepcion;
            pedidoMod.PesoTotal = pedido.PesoTotal;
            pedidoMod.Sector = pedido.Sector;
            pedidoMod.Sociedad = pedido.Sociedad;
            pedidoMod.SubTotal = pedido.SubTotal;
            pedidoMod.SubtotalImp = pedido.SubtotalImp;
            //////Convertir a 2  decimales el precio Total de la lista de Productos///////////////////////////////////////////////////////////////////////////////////
            var oFormatOptions = {decimalSeparator : '.', groupingSeparator:',', minFractionDigits: 2, maxFractionDigits: 2};
            var oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(oFormatOptions);
            var precioTotal = pedido.Total;
            pedidoMod.Total = oFloatFormat.format(precioTotal);
            ////////////////////////////////////////////////////////////////////////////////////////////////
            pedidoMod.TotalConIgv = pedido.TotalConIgv;
            pedidoMod.TotalDcto = pedido.TotalDcto;
            pedidoMod.TotalImp = pedido.TotalImp;
            return pedidoMod;
        },
        agregarDetalleMateriales: function(materiales) {

            var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                            {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
            var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                                        {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}, {"codigoSer": "DsctoAdicionalZD13"}, {"codigoSer": "Precio"}];                            
            var materialesMod = this.getView().getModel().getProperty("/listaMaterial");

            for(var indiceSer in materiales) {
                var materialSer = materiales[indiceSer];
                for(var indiceMod in materialesMod) {
                    var materialMod = materialesMod[indiceMod];
                    if(materialSer.CodMaterialCorto == materialMod.CodMaterialCorto) {
                        if(materialMod.Posicion == materialSer.Posicion){
                        ///////////////////////////////////////////////////////////////////
                        materialMod.CodCentro = materialSer.CodCentro ; 
                        var lstCentros = jQuery.grep(dataIni.lstCentros, function(item, i){ // just use arr
                            return (item.Codigo == materialSer.CodCentro) ;
                        });
                        materialMod.DescCentro = (lstCentros.length==0) ? "":lstCentros[0].Descripcion ;
                        materialMod.CodAlmacen = materialSer.CodAlmacen ; 
                        materialMod.CodLote = materialSer.CodLote ;
                        ///////////////////////////////////////////////////////////////////
                        materialMod.ConversionUMedida= materialSer.ConversionUMedida ; 
                        materialMod.Descontinuado= materialSer.Descontinuado ;
                        materialMod.Cantidad= materialSer.Cantidad ; 
                        materialMod.DivisionRendimiento= materialSer.DivisionRendimiento ;
                        materialMod.DsctoMontTotal= materialSer.DsctoMontTotal ; 
                        materialMod.IgvTotal= materialSer.IgvTotal ; 
                        materialMod.IgvUnitario= materialSer.IgvUnitario ; 
                        materialMod.Peso= materialSer.Peso ; 
                        materialMod.PesoNeto= materialSer.PesoNeto ; 
                        materialMod.PrecioConIGV= materialSer.PrecioConIGV ; 
                        materialMod.PrecioSinIGV= materialSer.PrecioSinIGV ; 
                        materialMod.PrecioTotal= materialSer.PrecioTotal ; 
                        materialMod.PrecioUnitario= materialSer.PrecioUnitario ; 
                        materialMod.SubTotal= materialSer.SubTotal ; 
                        materialMod.TotPercep= materialSer.TotPercep ; 
                        materialMod.Total= materialSer.Total ; 
                        materialMod.TotalDctos= materialSer.TotalDctos ; 
                        materialMod.TotalImpresion= materialSer.TotalImpresion ; 
                        
                        //////////////////////
                        sessionStorage.setItem("DsctosPrinDocNuevoOriginal"+materialSer.PosicionCorto,JSON.stringify(this.obtenerDescuento(materialSer, listaPrincipal)));
                        sessionStorage.setItem("DsctosOtrosDocNuevoOriginal"+materialSer.PosicionCorto,JSON.stringify(this.obtenerDescuento(materialSer, listaOtros)));
                        var descPrincipal = this.obtenerDescuento(materialSer, listaPrincipal);                        
                        var descOtros = this.obtenerDescuento(materialSer, listaOtros);                        
                        materialMod.DescuentoPrincipal = descPrincipal;
                        materialMod.DescuentoOtros = descOtros;
                        
                        /*materialMod.Vdscto = 0;
                        var pintarDscto = descPrincipal.concat(descOtros);
                        for (var s = 0; s < pintarDscto.length; s++) {
                            if(pintarDscto[s].Importe != 0 && pintarDscto[s].Condicion != "ZP00"){
                                materialMod.Vdscto = pintarDscto[s].Importe;
                            }
                        }*/
                        ////Quitar Dscto Dependiendo el Material////////////
                        ////Inicio ZP02/////////////////////////////////////
                        /*if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z015"){
                            if( materialMod.CodMaterialCorto=="20000182"){
                                var descPrinci = materialMod.DescuentoPrincipal.filter(function(el) {
                                         return el.Condicion == "ZP02";
                                    });
                                materialMod.DescuentoPrincipal = descPrinci;
                            }
                        }*/
                        ////End ZP02////////////////////////////////////////
                        ////Inicio Agregar Icon Dscto./////////////////////////////
                        for (var i = 0; i < materialMod.DescuentoPrincipal.length; i++) {
                            if(materialMod.DescuentoPrincipal[i].Importe==0){
                            materialMod.DescuentoPrincipal[i].iconBtnCalcular = "border";
                            }else{
                                materialMod.DescuentoPrincipal[i].iconBtnCalcular = "complete";
                            }
                        }
                        for (var j = 0; j < materialMod.DescuentoOtros.length; j++) {
                            if(materialMod.DescuentoOtros[j].Importe==0){
                            materialMod.DescuentoOtros[j].iconBtnCalcular = "border";
                            }else{
                                materialMod.DescuentoOtros[j].iconBtnCalcular = "complete";
                            }
                        }
                        ////End Agregar Icon Dscto./////////////////////////////
                        ////Inicio ZP08///////////////////////////////////// 
                        if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z035"){
                            if( materialMod.CodMaterialCorto=="20000816"){
                                var descPrinci = materialMod.DescuentoPrincipal.filter(function(el) {
                                         return el.Condicion == "ZP08";
                                    });
                                materialMod.DescuentoPrincipal = descPrinci;
                                materialMod.DescuentoOtros = [];
                            }
                            if( materialMod.CodMaterialCorto=="20000815"){
                                var descPrinci = materialMod.DescuentoPrincipal.filter(function(el) {
                                         return el.Condicion == "ZP08";
                                    });
                                materialMod.DescuentoPrincipal = descPrinci;
                                materialMod.DescuentoOtros = [];
                            }
                            if( materialMod.CodMaterialCorto=="20000814"){
                                var descPrinci = materialMod.DescuentoPrincipal.filter(function(el) {
                                         return el.Condicion == "ZP08";
                                    });
                                materialMod.DescuentoPrincipal = descPrinci;
                                materialMod.DescuentoOtros = [];
                            }
                        }else{
                            ///Inicio Validacion Tabla z Descuentos////////////////////
                            for (var i = 0; i < materialMod.DescuentoPrincipal.length; i++) {
                                        var validDsctoPri = materialMod.DescuentoPrincipal.filter(function(el) {
                                                 return el.Moneda == "X";
                                        });
                                        materialMod.DescuentoPrincipal = validDsctoPri;
                                        //
                                        var dsctoPrinConImporte = validDsctoPri.filter(function(el) {
                                                 return el.Importe != 0;
                                        });
                                        if(dsctoPrinConImporte.length>0){
                                            materialMod.Vdscto = dsctoPrinConImporte[dsctoPrinConImporte.length-1].Importe ;//
                                        }else{
                                            materialMod.Vdscto = 0 ;
                                        }
                                        //
                            }
                            for (var j = 0; j < materialMod.DescuentoOtros.length; j++) {
                                    var validDsctoOtr = materialMod.DescuentoOtros.filter(function(el) {
                                             return el.Moneda == "X";
                                    });
                                    materialMod.DescuentoOtros = validDsctoOtr;
                                    //
                                        var dsctoOtrosConImporte = validDsctoOtr.filter(function(el) {
                                                 return el.Importe != 0;
                                        });
                                        if(materialMod.Vdscto==0){
                                            if(dsctoOtrosConImporte.length>0){
                                                
                                                materialMod.Vdscto = dsctoOtrosConImporte[dsctoOtrosConImporte.length-1].Importe ;//
                                                
                                            }
                                        }
                                        //
                            }
                            ///End Validacion Tabla z Descuentos////////////////////
                            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z040"){
                                if( materialMod.CodMaterialCorto=="20000514"){
                                    var descPrinci = materialMod.DescuentoPrincipal.filter(function(el) {
                                             return el.Condicion == "ZP08";
                                        });
                                    materialMod.DescuentoPrincipal = descPrinci;
                                }
                            }
                            //Ped Administrativo
                            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z015"){
                                if( materialMod.CodMaterialCorto=="20000182"){
                                    var descPrinci = materialMod.DescuentoPrincipal.filter(function(el) {
                                             return el.Condicion == "ZP02";
                                        });
                                    materialMod.DescuentoPrincipal = descPrinci;
                                    if(descPrinci.Importe!=0){
                                        materialMod.Vdscto = 0 ;
                                    }
                                }
                            }
                            //
                        }
                           
                        /////End ZP08///////////////////////////////////////
                        
                                ///Inicio Agregar Clase CSS ListaMateriales///////////////////////////////////////////////
                                if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z001" ||
                                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z003" ||
                                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO01"){
                                       if (materialMod.TipoMaterial.substring(0,2)=="NA") {
                                            if (materialMod.CodLote=="") {
                                                materialMod.clase = "verde";
                                            }else{
                                                materialMod.clase = "negro";
                                            }
                                        
                                        }else {
                                            if (materialMod.CodLote=="") {
                                                materialMod.clase = "rojo";
                                            }else{
                                                materialMod.clase = "negro";
                                            }
                                        } 
                                }
                                ///End Agregar Clase CSS ListaMateriales///////////////////////////////////////////////
                            sessionStorage.setItem("DsctosPrinReserva"+materialSer.PosicionCorto,JSON.stringify(materialMod.DescuentoPrincipal));
                            sessionStorage.setItem("DsctosOtrosReserva"+materialSer.PosicionCorto,JSON.stringify(materialMod.DescuentoOtros));
                            materialMod.DescuentoPrincipalReserva = JSON.parse(sessionStorage["DsctosPrinReserva"+materialSer.PosicionCorto]);
                            materialMod.DescuentoOtrosReserva = JSON.parse(sessionStorage["DsctosOtrosReserva"+materialSer.PosicionCorto]);
                        }
                    }

                }
            }
            return materialesMod;
        },
        obtenerDescuento: function (material, descuentos) {
            var materialesMod = this.getView().getModel().getProperty("/listaMaterial");
            var listaDescuento = [];
            for (var indice in descuentos) {
                var materialMod = materialesMod.filter(function(el) {
                                         return el.PosicionCorto == material.PosicionCorto;
                                    });
                try{
                    material[descuentos[indice].codigoSer].ImpAnterior = Math.abs(materialMod[0][descuentos[indice].codigoSer].ImpAnterior);//21-05-2018 Roy flag agregar Descuentos en cero
                }catch(ex){console.log("///Error Ipad///"+ex)}
                listaDescuento.push(material[descuentos[indice].codigoSer]);
            }
            return listaDescuento;
        },    
        handleLiveChange: function(oEvent) {
            var reparto  = oEvent.getSource().getBindingContext().getObject();            

            var cantidadIngresar = oEvent.getParameter("value");
            var material = this.getView().getModel().getProperty("/material");
            
            var cantRepartoTotal = 0;
            var cantidadPedida = (material.Cantidad != "") ? parseInt(material.Cantidad) : 0;

            for(var indice in material.Repartos)  {    
                cantRepartoTotal = cantRepartoTotal + parseInt(material.Repartos[indice].CantPed);
            }    
            if( cantidadIngresar == 0) {
                sap.m.MessageToast.show("La cantidad ingresada debe ser menor que 1.", { duration: 3000 });
            } else if(cantidadIngresar <= (cantidadPedida - cantRepartoTotal)) {
                reparto.CantConf = cantidadIngresar;
            } else {
                sap.m.MessageToast.show("La cantidad ingresada debe ser menor.", { duration: 3000 });
            }        
        }, 
        onCalcularDescuentoPrincipal: function(oEvent) {
            var descuento  = oEvent.getSource().getBindingContext().getObject(); 
            var material = this.getView().getModel().getProperty("/material");
            
            var importe = (descuento.Importe != "") ? parseFloat(descuento.Importe): 0;
        ////Inicio Dscto ZP08////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if(descuento.Condicion=="ZP08" || descuento.Condicion=="ZP01" || descuento.Condicion=="ZP02"){
            if(descuento.iconBtnCalcular=="complete"){
                importe = 0;
                descuento.Importe = 0;
                descuento.Valor = 0;
            }
                    descuento.Valor = parseFloat(importe).toFixed(2);
                
                    var listaDescuento = material.DescuentoPrincipalReserva;            
                    for(var indice in listaDescuento) {
                        if(descuento.Condicion != listaDescuento[indice].Condicion) {
                            listaDescuento[indice].Valor = 0;
                            listaDescuento[indice].Importe = 0;
                            listaDescuento[indice].iconBtnCalcular = "border";
                        } else {
                            listaDescuento[indice].Valor = descuento.Valor;
                            if(listaDescuento[indice].iconBtnCalcular=="complete"){
                                listaDescuento[indice].iconBtnCalcular = "border";
                            }else{
                                    listaDescuento[indice].iconBtnCalcular = "complete";
                            }
                        }
                        listaDescuento[indice].Importe = parseFloat(listaDescuento[indice].Importe);
                    }
                    var listaDescuentoOt = material.DescuentoOtrosReserva;
                    for(var indice in listaDescuentoOt) {
                        listaDescuentoOt[indice].Valor = 0;
                        listaDescuentoOt[indice].Importe = 0;
                        listaDescuentoOt[indice].iconBtnCalcular = "border";
                    }
                    //this.getView().getModel().setProperty("/material/DescuentoPrincipal", listaDescuento);
                    this.getView().getModel().setProperty("/material/DescuentoPrincipalReserva", listaDescuento);
                    
                    this.getView().getModel().refresh();
                    this.sessionStorageDocNuevo(); 
        }
        else if(descuento.Condicion=="ZD04"){
            if(descuento.iconBtnCalcular=="complete"){
                descuento.Importe = 0;
            }else{
                if(importe=="0" || importe==0){
                    if(descuento.Condicion=="ZD00"){
                        descuento.Importe = parseFloat(descuento.LimiteInferior);
                    }else{
                        descuento.Importe = 0;
                    }
                }else{
                    descuento.Importe = parseFloat(importe);
                }
                
            }
            importe = (descuento.Importe != "") ? parseFloat(descuento.Importe): 0;
        ////End Dscto ZP08///////////////////////////////////////////////////////////////////////////////////
            //if(importe >= descuento.LimiteInferior) {
                var pathDescuento = oEvent.getSource().getBindingContext().getPath();
            if(importe > 100) {
            sap.ui.getCore().byId("txt_aviso_general").setText("La cantidad del descuento ingresada supera al máximo permitido");
                    sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open(); 
                    this.getView().getModel().setProperty(pathDescuento+"/Importe",0);
                    this.getView().getModel().setProperty(pathDescuento+"/Valor",0);               
            } else {
                descuento.Valor = parseFloat((material.SubTotal * (importe/ 100)).toFixed(2));
                var listaDescuento = material.DescuentoPrincipalReserva;            
                for(var indice in listaDescuento) {
                    if(descuento.Condicion != listaDescuento[indice].Condicion) {
                        listaDescuento[indice].Valor = 0;
                        listaDescuento[indice].Importe = 0;
                        listaDescuento[indice].iconBtnCalcular = "border";
                    } else {
                        listaDescuento[indice].Valor = descuento.Valor;
                        if(listaDescuento[indice].iconBtnCalcular=="complete"){
                                listaDescuento[indice].iconBtnCalcular = "border";
                            }else{
                                    listaDescuento[indice].iconBtnCalcular = "complete";
                            }
                    }
                    listaDescuento[indice].Importe = parseFloat(listaDescuento[indice].Importe);
                }
                var listaDescuentoOt = material.DescuentoOtrosReserva;
                for(var indice in listaDescuentoOt) {
                    listaDescuentoOt[indice].Valor = 0;
                    listaDescuentoOt[indice].Importe = 0;
                    listaDescuentoOt[indice].iconBtnCalcular = "border";
                }
                this.getView().getModel().setProperty("/material/DescuentoPrincipalReserva", listaDescuento);
                this.getView().getModel().refresh();
                this.sessionStorageDocNuevo(); 
            }
        }
        else{
            if(descuento.LimiteInferior==0 || descuento.LimiteInferior=="0" || descuento.LimiteInferior=="0"){
                return;
            }
            if(descuento.iconBtnCalcular=="complete"){
                descuento.Importe = 0;
            }else{
                if(importe=="0" || importe==0){
                    if(descuento.Condicion=="ZD00"){
                        descuento.Importe = parseFloat(descuento.LimiteInferior);
                    }else{
                        descuento.Importe = 0;
                    }
                }else{
                    descuento.Importe = parseFloat(importe);
                }
            }
            importe = (descuento.Importe != "") ? parseFloat(descuento.Importe): 0;
        ////End Dscto ZP08///////////////////////////////////////////////////////////////////////////////////
            //if(importe >= descuento.LimiteInferior) {
                var pathDescuento = oEvent.getSource().getBindingContext().getPath();
            if(importe > descuento.LimiteInferior) {
            sap.ui.getCore().byId("txt_aviso_general").setText("La cantidad del descuento ingresada supera al máximo permitido");
                    sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open(); 
                    this.getView().getModel().setProperty(pathDescuento+"/Importe",0);
                    this.getView().getModel().setProperty(pathDescuento+"/Valor",0);               
            } else {
                descuento.Valor = parseFloat((material.SubTotal * (importe/ 100)).toFixed(2));
                var listaDescuento = material.DescuentoPrincipalReserva;            
                for(var indice in listaDescuento) {
                    if(descuento.Condicion != listaDescuento[indice].Condicion) {
                        listaDescuento[indice].Valor = 0;
                        listaDescuento[indice].Importe = 0;
                        listaDescuento[indice].iconBtnCalcular = "border";
                    } else {
                        listaDescuento[indice].Valor = descuento.Valor;
                        if(listaDescuento[indice].iconBtnCalcular=="complete"){
                                listaDescuento[indice].iconBtnCalcular = "border";
                            }else{
                                    listaDescuento[indice].iconBtnCalcular = "complete";
                            }
                    }
                    listaDescuento[indice].Importe = parseFloat(listaDescuento[indice].Importe);
                }
                var listaDescuentoOt = material.DescuentoOtrosReserva;
                for(var indice in listaDescuentoOt) {
                    listaDescuentoOt[indice].Valor = 0;
                    listaDescuentoOt[indice].Importe = 0;
                    listaDescuentoOt[indice].iconBtnCalcular = "border";
                }
                this.getView().getModel().setProperty("/material/DescuentoPrincipalReserva", listaDescuento);
                this.getView().getModel().refresh();
                this.sessionStorageDocNuevo(); 
            }

            }
        },         
        onCalcularDescuentoOtros: function(oEvent) {
            var descuento  = oEvent.getSource().getBindingContext().getObject();  
            var material = this.getView().getModel().getProperty("/material");
            
            if(descuento.LimiteInferior==0 || descuento.LimiteInferior=="0" || descuento.LimiteInferior=="0"){
                return;
            }
            if(descuento.iconBtnCalcular=="complete"){
                descuento.Importe = 0;
            }else{
                if(importe=="0" || importe==0){
                    descuento.Importe = parseFloat(descuento.LimiteInferior);
                }else{
                    descuento.Importe = parseFloat(importe);
                }
            }
            var importe = (descuento.Importe != "") ? parseFloat(descuento.Importe): 0;
            //if(importe >= descuento.LimiteInferior) {
            var pathDescuento = oEvent.getSource().getBindingContext().getPath();
            if(importe > descuento.LimiteInferior) {
            sap.ui.getCore().byId("txt_aviso_general").setText("La cantidad del descuento ingresada supera al máximo permitido");
                    sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open(); 
                    this.getView().getModel().setProperty(pathDescuento+"/Importe",0);
                    this.getView().getModel().setProperty(pathDescuento+"/Valor",0);                 
            } else {
                descuento.Valor = parseFloat((material.SubTotal * (importe/ 100)).toFixed(2));
                var listaDescuento = material.DescuentoOtrosReserva;
                for(var indice in listaDescuento) {
                    if(descuento.Condicion != listaDescuento[indice].Condicion) {
                        listaDescuento[indice].Valor = 0;
                        listaDescuento[indice].Importe = 0;
                        listaDescuento[indice].iconBtnCalcular = "border";
                    } else {
                        listaDescuento[indice].Valor = descuento.Valor;
                        if(listaDescuento[indice].iconBtnCalcular=="complete"){
                                listaDescuento[indice].iconBtnCalcular = "border";
                            }else{
                                    listaDescuento[indice].iconBtnCalcular = "complete";
                            }
                    }
                }
                var listaDescuentoPr = material.DescuentoPrincipalReserva;
                for(var indice in listaDescuentoPr) {
                    listaDescuentoPr[indice].Valor = 0;
                    listaDescuentoPr[indice].Importe = 0;
                    listaDescuentoPr[indice].iconBtnCalcular = "border";
                }                
                this.getView().getModel().setProperty("/material/DescuentoOtrosReserva", listaDescuento);
                this.getView().getModel().refresh(); 
                this.sessionStorageDocNuevo();
            }
        }, 
        /******************* detalle de Materiales ********************************/
        onGuardarDetalleMaterialMultiple:function(){
            var matSelected = this.getView().byId("listaMasterMateriales").getSelectedItems();
            
            for (var i = 0; i < matSelected.length; i++) {
                var path = matSelected[i].getBindingContext().getPath();
                var materialMod = this.getView().getModel().getProperty(path);
                utilString.storeDsctosPrinReserva(this,materialMod.DescuentoPrincipalReserva,path+"/DescuentoPrincipal",materialMod.PosicionCorto);
                utilString.storeDsctosOtrosReserva(this,materialMod.DescuentoOtrosReserva,path+"/DescuentoOtros",materialMod.PosicionCorto);
                var listaDescuentoPr = this.getView().getModel().getProperty(path+"/DescuentoPrincipal");
                var listaDescuentoOt = this.getView().getModel().getProperty(path+"/DescuentoOtros");
                if(listaDescuentoPr != undefined) {
                                                
                                            var listaDescPrinFinal = [];
                                            var listaDescOtrosFinal = [];
                                            for (var j = 0; j < listaDescuentoPr.length; j++) {
                                                var descuentoPrin = listaDescuentoPr[j];
                                            //////////////////////////
                                                if(descuentoPrin.Valor=="0" || descuentoPrin.Valor==0 || descuentoPrin.Valor==""){
                                                    descuentoPrin.Importe = 0;
                                                }else{
                                                    if(descuentoPrin.Condicion=="ZP08" || descuentoPrin.Condicion=="ZP02" || descuentoPrin.Condicion=="ZP01"){
                                                        this.getView().getModel().setProperty(path+"/Vdscto",0);
                                                    }else{
                                                        if(this.getView().getModel().getProperty(path+"/CodMaterialCorto")=="20000815" || this.getView().getModel().getProperty(path+"/CodMaterialCorto") =="20000182"){
                                                            this.getView().getModel().setProperty(path+"/Vdscto",0);
                                                        }else{
                                                            this.getView().getModel().setProperty(path+"/Vdscto",Math.abs(descuentoPrin.Importe));
                                                        }
                                                    }
                                                }
                                            //////////////////////////
                                            listaDescPrinFinal.push(descuentoPrin);
                                            }
                                            this.getView().getModel().setProperty(path+"/DescuentoPrincipal",listaDescPrinFinal)
                                            for (var k = 0; k < listaDescuentoOt.length; k++) {
                                                var descuentoOtros = listaDescuentoOt[k];
                                            //////////////////////////
                                                if(descuentoOtros.Valor=="0" || descuentoOtros.Valor==0 || descuentoOtros.Valor==""){
                                                    descuentoOtros.Importe = 0;
                                                }else{
                                                    if(descuentoOtros.Condicion=="ZP00"){
                                                        this.getView().getModel().setProperty(path+"/Vdscto",0);
                                                    }else{
                                                        if(this.getView().getModel().getProperty(path+"/CodMaterialCorto")=="20000815" || this.getView().getModel().getProperty(path+"/CodMaterialCorto") =="20000182"){
                                                            this.getView().getModel().setProperty(path+"/Vdscto",0);
                                                        }else{
                                                            this.getView().getModel().setProperty(path+"/Vdscto",Math.abs(descuentoOtros.Importe));
                                                        }
                                                    }
                                                }
                                            //////////////////////////
                                            listaDescOtrosFinal.push(descuentoOtros);
                                            }
                                            var vdsctoTotal = listaDescPrinFinal.concat(listaDescOtrosFinal).filter(function(el) {
                                                    return el.Importe == 0 ;
                                                });
                                            if(vdsctoTotal.length ==listaDescPrinFinal.concat(listaDescOtrosFinal).length){
                                                this.getView().getModel().setProperty(path+"/Vdscto",0);
                                            }
                                            this.getView().getModel().setProperty(path+"/DescuentoOtros",listaDescOtrosFinal);


                                            /////////////////////////////////////


            materialMod = this.getView().getModel().getProperty(path);
            var pedidoMod = this.getView().getModel().getProperty("/pedido");

            if (pedidoMod.CodTipoDoc == "Z035") {
                var dctoTotal = pedidoMod.SubTotal;
                var igv = 0; //0.18 * dctototal;
                matSelected[i].SubTotal = utilString.roundNumber((dctoTotal + igv), 2);
                materialMod.SubTotalLista = utilString.roundNumber((dctoTotal + igv), 2);
                materialMod.PrecioTotal = utilString.roundNumber((dctoTotal + igv), 2);
                materialMod.dirty = true;                
            }
            else if (pedidoMod.CodTipoDoc == "Z015") {
                var dctoTotal = pedidoMod.SubTotal;
                var igv = 0; //0.18 * dctototal;
                matSelected[i].SubTotal = dctoTotal + igv;
                materialMod.SubTotalLista = dctoTotal + igv;
                materialMod.PrecioTotal = dctoTotal + igv;
                materialMod.dirty = true;                 
            }            
            else if (pedidoMod.CodTipoDoc == "Z020") {
                var dctoTotal = pedidoMod.SubTotal;
                var igv = 0; //0.18 * dctototal;
                matSelected[i].SubTotal = utilString.roundNumber((dctoTotal + igv), 2);
                materialMod.SubTotalLista = utilString.roundNumber((dctoTotal + igv), 2);
                materialMod.PrecioTotal = utilString.roundNumber((dctoTotal + igv), 2);
                materialMod.dirty = true;  
                //currentMat.dirty = true;
            }
            else {
                var precio = materialMod.PrecioUnitario;
                var cantidad = (utilString.isEntero(materialMod.Cantidad)) ? parseInt(materialMod.Cantidad): 0;//cambio de metodo: isNumeric por isEntero 21-08-17
                var dctoTotal = materialMod.DsctoMontTotal;                
                matSelected[i].SubTotal = (precio * cantidad) - dctoTotal
                materialMod.SubTotalLista = utilString.roundNumber(((precio * cantidad) - dctoTotal), 2);
                materialMod.PrecioTotal = (precio * cantidad);
                materialMod.dirty = true; 

                var acumulado = 0;
                if(materialMod.DescuentoPrincipal != undefined) {
                    var listaDescuentoPr = materialMod.DescuentoPrincipal;
                    if(materialMod.DescuentoOtros.length==0){
                        var listaDescuentos = listaDescuentoPr;
                    }else{
                        var listaDescuentos = listaDescuentoPr.concat(materialMod.DescuentoOtros);
                    }
                    var dsctoManuales = 0;
                    for(var indice in listaDescuentos) {
                        var descuento = listaDescuentos[indice];
                        //
                            descuento.Importe = utilString.verificarTipoVariable(descuento.Importe) == "string" ? (descuento.Importe.trim()==""? 0 : descuento.Importe.trim()):descuento.Importe;
                        //
                        var condicion = descuento.Condicion.substring(0, 2);

                        //////////////////////////
                            if(descuento.Valor=="0" || descuento.Valor==0 || descuento.Valor==""){
                                descuento.Importe = 0;
                            }
                        //////////////////////////
                        if (descuento.Importe != 0 && condicion == "ZD") {
                            if (descuento.Condicion == 'ZD09' && materialMod.Cantidad != materialMod.Cantidad) {
                                descuento.Valor = 0;
                                descuento.Importe = 0;
                            } else {
                                if(descuento.Importe < 0) {
                                    descuento.Importe = descuento.Importe * -1;
                                }
                                acumulado = acumulado + descuento.Importe
                            }
                        }
                        if(descuento.condicion =="ZP08" || descuento.condicion =="ZP01" || descuento.condicion =="ZP02" || descuento.condicion =="ZP00" ){
                            dsctoManuales = 1;
                        }                          
                    }
                }
                    materialMod.Vdscto = acumulado;
            } 
            materialMod.dirty = true;
            materialMod.IgvTotal = (0.18 * materialMod.PrecioTotal);
            materialMod.Total = utilString.roundNumber((materialMod.SubTotal + materialMod.IgvTotal),2); 
            var materialDet = jQuery.extend({}, materialMod);
            if(dsctoManuales==1){
                materialDet.Vdscto = 0;
            }else{
                if(materialDet.CodMaterialCorto=="20000815" || materialDet.CodMaterialCorto =="20000182"){
                    materialDet.Vdscto = 0;
                }else{
                    materialDet.Vdscto = parseFloat(materialDet.Vdscto);
                }
            }
            this.getView().getModel().setProperty(path, materialDet);
            //datos del pedido
            var subTotalDoc = 0;
            var listaMaterialesMod = this.getView().getModel().getProperty("/listaMaterial");
            for(var indice in listaMaterialesMod) {
                var materialMod = listaMaterialesMod[indice];
                subTotalDoc = subTotalDoc + materialMod.SubTotal;
            }
            pedidoMod.SubTotal = subTotalDoc;
            pedidoMod.Igv = pedidoMod.SubTotal * 0.18;
            //////Convertir a 2  decimales el precio Total de la lista de Productos///////////////////////////////////////////////////////////////////////////////////
            var oFormatOptions = {decimalSeparator : '.', minFractionDigits: 2, maxFractionDigits: 2, IntegerSeparator: ','};
            var oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(oFormatOptions);
            var precioTotal = subTotalDoc + pedidoMod.Igv;
            pedidoMod.Total = oFloatFormat.format(precioTotal);
             //////////////////////////////////////////////////////////////////////////////////////////
            pedidoMod.TotalImp = pedidoMod.Total;
            pedidoMod.TotalConIgv = pedidoMod.Total * 0.18;                
            pedidoMod.TotalDcto = pedidoMod.TotalDcto;
            pedidoMod.dirty = true;                    
            this.getView().getModel().setProperty("/pedido", pedidoMod);
            MessageToast.show("El material se grabo correctamente.", { duration: 3000 });
            this.sessionStorageDocNuevo();
            }
        }
        },
        onGuardarDetalleMaterial: function() {
            var material = this.getView().getModel().getProperty("/material");
            utilString.storeDsctosPrinReserva(this,material.DescuentoPrincipalReserva,"/material/DescuentoPrincipal",material.PosicionCorto);
            utilString.storeDsctosOtrosReserva(this,material.DescuentoOtrosReserva,"/material/DescuentoOtros",material.PosicionCorto);

            var materialMod = this.getView().getModel().getProperty("/listaMaterial/" + material.path);
            var pedidoMod = this.getView().getModel().getProperty("/pedido");

            
            ////////Roy ///////////////////////////////////////////////////////////////////////////
                    /*var repartos = material.Repartos;
                    var cantidadReparto = 0;
                    for(var indice in repartos) {
                        cantidadReparto = cantidadReparto + parseInt(repartos[indice].CantPed);
                    }  
                    if(material.Cantidad<cantidadReparto){
                        for (var i = repartos.length; i >0 ; i--) {
                            repartos.splice(i-1, 1);
                            this.getView().getModel().refresh(); 
                        }
                        //agregar
                        var fechaHoy = new Date();                                      
                    var fechaHoyString = moment(fechaHoy.getTime()).format('DD/MM/YYYY');    
                            var repartoNuevo = new Object();
                            repartoNuevo.CantConf = material.Cantidad;                        
                            repartoNuevo.FechaEntrega = fechaHoyString;
                            repartoNuevo.CantPed = material.Cantidad;
                            repartos.push(repartoNuevo); 
                            this.getView().getModel().refresh();     
                            
                    }*/
            ///////////////////////////////////////////////////////////////////////////////////////
            if(material.Ambiente == undefined){
                material.Ambiente = material.CodGrupoMat; 
            }else{
                material.Ambiente = material.Ambiente; 
            }

            if(material.Ambiente == "" || material.Ambiente == " ") {}
            else {
                var listaAmbientes = dataIni.lstPreguntas[5].listaResp;
                var grupMaterial = jQuery.grep(listaAmbientes, function(item, i){ // just use arr
                    return (item.Codigo == material.Ambiente) ;
                });
                material.DesGrupoMat = grupMaterial[0].Descripcion;
                material.CodGrupoMat = material.Ambiente;

                materialMod.DesGrupoMat = material.DesGrupoMat;
                materialMod.CodGrupoMat = material.Ambiente;
                materialMod.Ambiente = material.Ambiente;     
            }
            if(material.Opcion == "" || material.Opcion != " "){}
            else {
                material.Opcion = material.Opcion;
            }
            if ((pedidoMod.CodTipoDoc == 'ZO01' || pedidoMod.CodTipoDoc == 'Z001') && (pedidoMod.CanalDist == '10')) {
                if(material.CodGrupoMat == "") {
                    MessageToast.show("Ingresar Ambiente.", { duration: 3000 });
                    return false;
                }
                if(material.Opcion == "") {
                    MessageToast.show("Ingresar Opcion de Ambiente.", { duration: 3000 });
                    return false;
                }
            }
            if(material.Cantidad != materialMod.Cantidad) {
                material.mod = "X";
            }
            var condPago = utilFunction.containsCode(pedidoMod.CodTipoDoc);
            var unidadMed = utilFunction.validateUnitMeasurement(material.CodUMedida);
            if (!unidadMed && !condPago) {
                if (pedidoMod.CodTipoDoc != 'Z024') {
                    var cantidad = material.Cantidad;
                    var listaRepartos = material.Repartos;
                    for(var indice in listaRepartos) {
                        if(material.PosicionCorto == listaRepartos[indice].matPosicion) {
                            listaRepartos[indice].CantPed = cantidad;
                            listaRepartos[indice].CantConf = cantidad;
                            break;
                        }
                    }
                    material.Repartos = listaRepartos;
                }                 
            }
            /**************grabar materiales***************/
            //para el descuento ZP08 @@@@         
            if (pedidoMod.CodTipoDoc == "Z035") {
                var dctoTotal = pedidoMod.SubTotal;
                var igv = 0; //0.18 * dctototal;
                material.SubTotal = utilString.roundNumber((dctoTotal + igv), 2);
                material.SubTotalLista = utilString.roundNumber((dctoTotal + igv), 2);
                material.PrecioTotal = utilString.roundNumber((dctoTotal + igv), 2);
                material.dirty = true;                
            }
            else if (pedidoMod.CodTipoDoc == "Z015") {
                var dctoTotal = pedidoMod.SubTotal;
                var igv = 0; //0.18 * dctototal;
                material.SubTotal = dctoTotal + igv;
                material.SubTotalLista = dctoTotal + igv;
                material.PrecioTotal = dctoTotal + igv;
                material.dirty = true;                 
            }            
            else if (pedidoMod.CodTipoDoc == "Z020") {
                var dctoTotal = pedidoMod.SubTotal;
                var igv = 0; //0.18 * dctototal;
                material.SubTotal = utilString.roundNumber((dctoTotal + igv), 2);
                material.SubTotalLista = utilString.roundNumber((dctoTotal + igv), 2);
                material.PrecioTotal = utilString.roundNumber((dctoTotal + igv), 2);
                material.dirty = true;  
                //currentMat.dirty = true;
            }
            else {
                var precio = material.PrecioUnitario;
                var cantidad = (utilString.isEntero(material.Cantidad)) ? parseInt(material.Cantidad): 0;//cambio de metodo: isNumeric por isEntero 21-08-17
                var dctoTotal = material.DsctoMontTotal;                
                material.SubTotal = (precio * cantidad) - dctoTotal
                material.SubTotalLista = utilString.roundNumber(((precio * cantidad) - dctoTotal), 2);
                material.PrecioTotal = (precio * cantidad);
                material.dirty = true; 

                var acumulado = 0;
                if(material.DescuentoPrincipal != undefined) {
                    var listaDescuentoPr = material.DescuentoPrincipal;
                    if(material.DescuentoOtros.length==0){
                        var listaDescuentos = listaDescuentoPr;
                    }else{
                        var listaDescuentos = listaDescuentoPr.concat(material.DescuentoOtros);
                    }
                    var dsctoManuales = 0;
                    for(var indice in listaDescuentos) {
                        var descuento = listaDescuentos[indice];
                        //
                            descuento.Importe = utilString.verificarTipoVariable(descuento.Importe) == "string" ? (descuento.Importe.trim()==""? 0 : descuento.Importe.trim()):descuento.Importe;
                        //
                        var condicion = descuento.Condicion.substring(0, 2);

                        //////////////////////////
                            if(descuento.Valor=="0" || descuento.Valor==0 || descuento.Valor==""){
                                descuento.Importe = 0;
                            }
                        //////////////////////////
                        if (descuento.Importe != 0 && condicion == "ZD") {
                            if (descuento.Condicion == 'ZD09' && material.Cantidad != materialMod.Cantidad) {
                                descuento.Valor = 0;
                                descuento.Importe = 0;
                            } else {
                                if(descuento.Importe < 0) {
                                    descuento.Importe = descuento.Importe * -1;
                                }
                                acumulado = acumulado + descuento.Importe
                            }
                        }
                        if(descuento.condicion =="ZP08" || descuento.condicion =="ZP01" || descuento.condicion =="ZP02" || descuento.condicion =="ZP00" ){
                            dsctoManuales = 1;
                        }                          
                    }
                }
                    material.Vdscto = acumulado;
            } 
            material.dirty = true;
            material.IgvTotal = (0.18 * material.PrecioTotal);
            material.Total = utilString.roundNumber((material.SubTotal + material.IgvTotal),2); 
            var materialDet = jQuery.extend({}, material);
            if(dsctoManuales==1){
                materialDet.Vdscto = 0;
            }else{
                if(materialDet.CodMaterialCorto=="20000815" || materialDet.CodMaterialCorto =="20000182"){
                    materialDet.Vdscto = 0;
                }else{
                    materialDet.Vdscto = parseFloat(materialDet.Vdscto);
                }
            }
            this.getView().getModel().setProperty("/listaMaterial/" + material.path, materialDet);
            //datos del pedido
            var subTotalDoc = 0;
            var listaMaterialesMod = this.getView().getModel().getProperty("/listaMaterial");
            for(var indice in listaMaterialesMod) {
                var materialMod = listaMaterialesMod[indice];
                subTotalDoc = subTotalDoc + materialMod.SubTotal;
            }
            pedidoMod.SubTotal = subTotalDoc;
            pedidoMod.Igv = pedidoMod.SubTotal * 0.18;
            //////Convertir a 2  decimales el precio Total de la lista de Productos///////////////////////////////////////////////////////////////////////////////////
            var oFormatOptions = {decimalSeparator : '.', minFractionDigits: 2, maxFractionDigits: 2, IntegerSeparator: ','};
            var oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(oFormatOptions);
            var precioTotal = subTotalDoc + pedidoMod.Igv;
            pedidoMod.Total = oFloatFormat.format(precioTotal);
             //////////////////////////////////////////////////////////////////////////////////////////
            pedidoMod.TotalImp = pedidoMod.Total;
            pedidoMod.TotalConIgv = pedidoMod.Total * 0.18;                
            pedidoMod.TotalDcto = pedidoMod.TotalDcto;
            pedidoMod.dirty = true;                    
            this.getView().getModel().setProperty("/pedido", pedidoMod);
            MessageToast.show("El material se grabo correctamente.", { duration: 3000 });
            this.sessionStorageDocNuevo();
        },
        /******************* detalle de Productos ********************************/
        ///////Incio Roy////////////////////////////////////////////////////////////////
        crearNuevoDocumento: function () {
        var pedido = this.getView().getModel().getProperty("/pedido") ;
        var nuevoDocumento = new Object();
            nuevoDocumento.codigoCliente = this.getView().getModel().getProperty("/clienteEventual/codigoCliente") ; // codigoCliente:0000101317
            nuevoDocumento.nombreCliente= this.getView().getModel().getProperty("/clienteEventual/nombreCliente") ;
            nuevoDocumento.OrgVentas= pedido.OrgVentas ;//"1000" ;
            nuevoDocumento.CanalDist= pedido.CanalDist ;// "10" ;
            nuevoDocumento.CodOficina= pedido.CodOficina ;// "1010" ;
            nuevoDocumento.CondPago= pedido.CondPago ;// "E000" ;
            nuevoDocumento.Moneda= pedido.Moneda ;// "PEN" ;
            nuevoDocumento.TipoCambio= pedido.TipoCambio ;// "3.282" ;
            nuevoDocumento.dsctoAdicionalZD12= "" ;// "" ;
            nuevoDocumento.pesoTotal= this.getView().byId("txt_pago_pesoTotal").getValue() ;// "0.300 KG" ;
            nuevoDocumento.FechaFacturacion= this.convertirFechaSistema(pedido.FechaFacturacion) ;// "2017-07-21T19:10:42.933Z" ;
            nuevoDocumento.GrupoCond= pedido.CodigoBanco ;// "02" ; // GrupoCond pertenece al codigo nombre banco
            nuevoDocumento.Motivo= pedido.Motivo ;// "003" ;
            nuevoDocumento.BloqueoFactura= pedido.BloqueoFactura ;// "04" ;
            nuevoDocumento.BloqueoEntrega= pedido.BloqueoEntrega ;// "05" ;
            nuevoDocumento.OrdenCompra= pedido.OrdenCompra ;// "nroOrden" ;
            nuevoDocumento.FechaPedido= this.convertirFechaSistema(pedido.FechaPedido) ;// "2017-07-21T19:10:42.933Z" ;
            nuevoDocumento.FechaValidez= this.convertirFechaSistema(pedido.FechaValidez) ;// "2017-07-28T19:10:42.958Z" ;
            nuevoDocumento.FechaEntrega= this.convertirFechaSistema(pedido.FechaEntrega) ;// "2017-07-21T19:10:42.933Z" ;
            nuevoDocumento.CondExp= pedido.CondExp ;// "03" ;
            nuevoDocumento.FechaReparto= this.convertirFechaSistema(pedido.FechaReparto) ;// "" ;
            nuevoDocumento.nomProyecto= pedido.nomProyecto ;// "nomProyecto" ;
            nuevoDocumento.codProyecto= pedido.codProyecto ;// "1025" ;
            nuevoDocumento.codVersion= pedido.codVersion ;// "123" ;
            nuevoDocumento.TipoVisita= pedido.TipoVisita ;// "02" ;
            nuevoDocumento.cbxReembolsable= pedido.Reenbolsable ;// "" ;
            nuevoDocumento.GrupoForecast= pedido.GrupoForecast ;// "01" ;
            nuevoDocumento.TipoForecast= pedido.TipoForecast ;// "" ;
            nuevoDocumento.Certificado= pedido.Certificado ;// "" ;
            nuevoDocumento.FechaVisita= pedido.FechaVisita ;// "" ;
            nuevoDocumento.pPedTotal = pedido.Total;
            nuevoDocumento.op= "mod" ;
            nuevoDocumento.numPedido= pedido.NumPedido;
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z004"){
                nuevoDocumento.planFact="planFact";
            }
        return nuevoDocumento;        
        },

        /////////Roy////////////////////////////////////////////////
        crearCliente:function(){
            var preguntasMod = this.getView().getModel().getProperty("/preguntas");
            var clienteMod = this.getView().getModel().getProperty("/cliente");
            var cliente = new Object();
            cliente.id = 1;
            cliente["1"]=preguntasMod["1"].CODR;
            cliente["10"]=preguntasMod["10"].CODR;
            cliente["15"]=preguntasMod["15"].CODR;
            cliente["20"]=preguntasMod["20"].CODR;
            cliente["25"]=preguntasMod["25"].CODR;
            cliente["35"]=preguntasMod["35"].CODR;
            cliente.CODIG=clienteMod.Ruc;
            cliente.APPAT=clienteMod.APPAT;
            cliente.APMAT=clienteMod.APMAT;
            cliente.NOMBRE=clienteMod.NOMBRE;
            cliente.FECNAC=this.convertirFechaSistema(clienteMod.FECNAC); 
            cliente.GRAINS=clienteMod.GRAINS;
            cliente.SEXO=clienteMod.SEXO;
            cliente.CIUDAD=clienteMod.Ciudad; //clienteMod.CodigoPostal
            cliente.EDAD=(clienteMod.EDAD != "") ? parseInt(clienteMod.EDAD) : 0;
            cliente.RANGOED=clienteMod.RANGOED;
            cliente.NIVELSE=clienteMod.NIVELSE;
            cliente.DIREC=clienteMod.DIREC;

            return cliente;
        },
        crearClienteConReferencia:function(){
            var preguntasMod = this.getView().getModel().getProperty("/preguntas");
            var clienteMod = this.getView().getModel().getProperty("/cliente");
            var cliente = new Object();
               
               cliente["1"]=preguntasMod["1"].CODR;
               cliente["10"]=preguntasMod["10"].CODR;
               cliente["15"]=preguntasMod["15"].CODR;
               cliente["20"]=preguntasMod["20"].CODR;
               cliente["25"]=preguntasMod["25"].CODR;
               cliente["35"]=preguntasMod["35"].CODR;
               cliente["40"]="";
               cliente["45"]="";
               cliente["50"]="";
               cliente["55"]="";
               cliente.Codigo = clienteMod.Codigo ; // null,
               cliente.Ruc = clienteMod.Ruc ; // null,
               cliente.Descripcion = clienteMod.Descripcion ; // null,
               cliente.Titulo = clienteMod.Titulo ; // null,
               cliente.Direccion = clienteMod.Direccion ; // null,
               cliente.DireccionCompleta = clienteMod.DireccionCompleta ; //cliente.LIMA 03 140101",
               cliente.Ciudad = clienteMod.Ciudad ; //cliente.140101",
               cliente.Pais = clienteMod.Pais ; //cliente.PE",
               cliente.CodigoPostal = clienteMod.CodigoPostal ; //cliente.LIMA 03",
               cliente.Distrito = clienteMod.Distrito ; // null,
               cliente.Telefono = clienteMod.Telefono ; //cliente.765432",
               cliente.TelefonoMovil = clienteMod.TelefonoMovil ; // null,
               cliente.Mail = clienteMod.Mail ; //cliente.mvelapatino@decorcenter.pe",
               cliente.TranspZone = clienteMod.TranspZone ; // null,
               cliente.PersonaFisica = clienteMod.PersonaFisica ; // false,
               cliente.Eventual = clienteMod.Eventual ; // false,
               cliente.Funcion = clienteMod.Funcion ; // null,
               cliente.CODIG = clienteMod.CODIG ; //cliente.12345678",
               cliente.APPAT = clienteMod.APPAT ; //cliente.vidal",
               cliente.APMAT = clienteMod.APMAT ; //cliente.luis",
               cliente.NOMBRE = clienteMod.NOMBRE ; //cliente.jose",
               cliente.DIREC = clienteMod.DIREC ; //cliente.AV. 123",
               cliente.ZCODE = clienteMod.ZCODE ; //cliente.",
               cliente.FECNAC = this.convertirFechaSistema(clienteMod.FECNAC) ; //cliente.2013-06-19T00:00:00",
               cliente.EDAD = clienteMod.EDAD ; //cliente.4",
               cliente.SEXO = clienteMod.SEXO ; //cliente.1",
               cliente.GRAINS = clienteMod.GRAINS ; //cliente.10",
               cliente.CODP = clienteMod.CODP ; // null,
               cliente.CODR = clienteMod.CODR ; // null,
               cliente.NIVELSE = clienteMod.NIVELSE ; //cliente.A",
               cliente.codigoCliente = clienteMod.codigoCliente ; // null,
               cliente.RANGOED = clienteMod.RANGOED ; // null,
               cliente.P1 = clienteMod.P1 ; // null,
               cliente.P10 = clienteMod.P10 ; // null,
               cliente.P15 = clienteMod.P15 ; // null,
               cliente.P20 = clienteMod.P20 ; // null,
               cliente.P25 = clienteMod.P25 ; // null,
               cliente.P30 = clienteMod.P30 ; // null,
               cliente.P35 = clienteMod.P35 ; // null,
               cliente.P40 = clienteMod.P40 ; // null,
               cliente.P45 = clienteMod.P45 ; // null,
               cliente.P50 = clienteMod.P50 ; // null,
               cliente.P55 = clienteMod.P55 ; // null

            return cliente;
        },
        crearPlanFacturacion: function(){
            var planFact = new Array();
            var planFacturacion = this.getView().getModel().getProperty("/planFacturacion");
            for(var indice in planFacturacion) {

                if(planFacturacion[indice].FKARV != "") {
                    var fechaFact1 = this.convertirFechaSistema(planFacturacion[indice].FKDAT);
                    var fechaFact2 = this.convertirFechaSistema(planFacturacion[indice].AFDAT);
                    planFacturacion[indice].FKDAT = fechaFact1;
                    planFacturacion[indice].AFDAT = fechaFact2;                    
                    planFact.push(planFacturacion[indice]);
                }
            }
            return planFact;
        },        
        /////////////////////////////////////////////////////////////
        validObservaciones:function(){
            if(window.dataIni.person.CanalDist=="10"){
                if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z001" ||
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z003" ||
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z004" ||
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z009" ||
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z010" ||
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z015" ){

                    this.getView().getModel().setProperty("/observaciones/ZP06/Descripcion","I");
                    //this.getView().getModel().setProperty("/observaciones/ZP01/Descripcion","I");
                    //this.getView().getModel().setProperty("/observaciones/ZP07/Descripcion","I");
                }
            }
            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z037"){
                this.getView().getModel().setProperty("/observaciones/ZP01/Descripcion","I");
            }
        },
           onBtnGuardarDocumento:function(){
            //utilDocumentoDocModificar.setValidInterlocutores(this);
            this.validObservaciones();
            this.getView().getModel().refresh();
            utilDocumentoDocModificar.validarGuardarDocumento(this);
            this.sessionStorageDocNuevo();
           },
                /////////////////////////////////////////////////////////////
        onBtnGuardarDocumento1: function () {

            var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function(){

            var nuevoDocumento = self.crearNuevoDocumento() ; //Sin Hard Code 
            var listaMatJson = JSON.stringify(self.crearMateriales()); //Sin Hard Code 
            var listaDsctoJson = JSON.stringify(self.crearDescuentosGuardar()); //Sin Hard Code 
            var listaRepJson = JSON.stringify(self.crearRepartos()); //Sin Hard Code 
            if(self.getView().getModel().getProperty("/pedido/NumPedido")!=""){
                var listaIntJson = JSON.stringify(self.crearInterlocutoresConReferencia()) ; //Sin Hard Code 
                var listaPedJson = JSON.stringify([self.crearPedidoConReferencia()]);  //Sin Hard Code 
                var listadatosCliente = JSON.stringify(self.crearClienteConReferencia()); //Sin Hard Code 
            }else{
                var listaIntJson = JSON.stringify(self.crearInterlocutores()) ; //Sin Hard Code 
                var listaPedJson = JSON.stringify([self.crearPedido()]);  //Sin Hard Code 
                var listadatosCliente = JSON.stringify(self.crearCliente()); //Sin Hard Code 
            }
            
            var listaPlanFacturacion  = JSON.stringify(self.crearPlanFacturacion());


            //var result = documentosServices.guardarDocumento(nuevoDocumento,listaMatJson,listaDsctoJson,listaRepJson,listaIntJson,listaPedJson,listadatosCliente,listaPlanFacturacion);
            documentosServices.guardarDocumentoModificar(nuevoDocumento,listaMatJson,listaDsctoJson,listaRepJson,listaIntJson,listaPedJson,listadatosCliente,listaPlanFacturacion, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            if (result.c === "s") {
                if (result.data.success) {
                    window.isDocModificarFin = true;
                    window.impDoc = true;
                    window.pedidoInstalacion = false;
                    window.numeroDocumento = result.data.numPedido;
                    sap.ui.getCore().byId("txt_aviso_general").setText(result.data.errors.reason);
                    sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
                } else {
                    sap.ui.getCore().byId("txt_aviso_general").setText(result.data.errors.reason);
                    sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
                }
            } else {
                //sap.m.MessageToast.show(result.m, {duration: 3000});
            }

sap.ui.core.BusyIndicator.hide();
});
},1000);
            
        },

        //////Buscar Materiales//////////////////////////////////////////////
        datosCaracteristicasMateriales:function(){
             var caracteristicas = {};
            var listaCaracteristicas = this.getView().getModel().getProperty("/listacaract");
            if(listaCaracteristicas){
                for (var i = 0; i < listaCaracteristicas.length; i++) {
                var listacodPre = listaCaracteristicas[i].codPre;
                caracteristicas[listacodPre] = this.getView().getModel().getProperty("/listacaract/"+i+"/selectCodigo");
                
                }
            }else{
                caracteristicas = {};
            }
            
            return caracteristicas;
        },
        datosBuscarMateriales:function(){
            var buscarMaterial = new Object();
            buscarMaterial.codigo = sap.ui.getCore().byId("txt_codigo_material_busqueda").getValue();
            buscarMaterial.codigoAntiguo = sap.ui.getCore().byId("txt_codigoAntiguo_material_busqueda").getValue();
            buscarMaterial.descripcionMaterial = sap.ui.getCore().byId("txt_descripcionMaterial_material_busqueda").getValue();
            buscarMaterial.categoria = sap.ui.getCore().byId("comboCategoria").getSelectedKey();
            buscarMaterial.linea = sap.ui.getCore().byId("comboLinea").getSelectedKey();
            buscarMaterial.marca = sap.ui.getCore().byId("comboMarca").getSelectedKey();
            buscarMaterial.orgVentas = window.dataIni.person.OrgVentas;
            buscarMaterial.canalDist = window.dataIni.person.CanalDist;
            buscarMaterial.ofVentas = window.dataIni.person.OfVentas;
            buscarMaterial.listacaract = JSON.stringify(this.datosCaracteristicasMateriales());
            return buscarMaterial;
        },
        limpiarBuscarProductos:function(){
            //////Limpiar Campos/////////////////////////////////////////////////////////
                    sap.ui.getCore().byId("txt_codigo_material_busqueda").setValue("");
                    sap.ui.getCore().byId("txt_codigoAntiguo_material_busqueda").setValue("");
                    sap.ui.getCore().byId("txt_descripcionMaterial_material_busqueda").setValue("");

                    sap.ui.getCore().byId("comboCategoria").setSelectedKey(" ");
                    sap.ui.getCore().byId("comboLinea").setSelectedKey("");
                    sap.ui.getCore().byId("comboMarca").setSelectedKey("");
                    //////////////////////////////////////////////////////////////////////////////
        },
        onDocNuevoBuscarMateriales: function (oEvent) {
            var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
            var datosMateriales = self.datosBuscarMateriales() ;
            //var result = documentosServices.buscarmaterial(datosMateriales);
            documentosServices.buscarmaterial(datosMateriales, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            if (result.c === "s") {
                
                if (result.data.success) {
                        for (var i = 0; i < result.data.materiales.length; i++) {
                            result.data.materiales[i].Descontinuado = (result.data.materiales[i].Descontinuado == 'Descontinuado') ? 'SÍ' : 'NO';
                                    result.data.materiales[i].stockDisp = (result.data.materiales[i].Stock - parseFloat(result.data.materiales[i].Segurida).toString()+" UN" );
                                    if(window.dataIni.person.CanalDist!='30'){
                                        result.data.materiales[i].detalleStockMaterial2 = 
                                        "Peso: " + result.data.materiales[i].Peso + " KG Precio:" + result.data.materiales[i].PrecioUnit + "\n Stock: " + result.data.materiales[i].Stock +
                                        result.data.materiales[i].CodUMedida + " Descontinuado: " + result.data.materiales[i].Descontinuado;
                                    }else{
                                        if(result.data.materiales[i].Segurida!=""){
                                            result.data.materiales[i].detalleStockMaterial2 = 
                                            "Peso: " + result.data.materiales[i].Peso + " KG Precio:" + result.data.materiales[i].PrecioUnit + "\n Stock: " + result.data.materiales[i].Stock +
                                            result.data.materiales[i].CodUMedida + " Descontinuado: " + result.data.materiales[i].Descontinuado + "\n Stock de Seguridad: " + result.data.materiales[i].Segurida + 
                                            "\n Stock Disponible: " + result.data.materiales[i].Dispo;
                                        }else{
                                            result.data.materiales[i].detalleStockMaterial2 = 
                                            "Peso: " + result.data.materiales[i].Peso + " KG Precio:" + result.data.materiales[i].PrecioUnit + "\n Stock: " + result.data.materiales[i].Stock +
                                            result.data.materiales[i].CodUMedida + " Descontinuado: " + result.data.materiales[i].Descontinuado;
                                        }
                                    }
                        }
                    self.getView().getModel().setProperty("/listaBuscarMateriales",result.data.materiales);
                    sap.ui.getCore().byId("dlg_listaBuscarMateriales").open();
                    self.limpiarBuscarProductos();
                    self.getView().getModel().refresh();
                    sap.ui.getCore().byId("dlg_DocNuevobuscar").close();
                    sap.ui.core.BusyIndicator.hide();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {
                        duration: 3000
                    });
                    sap.ui.core.BusyIndicator.hide();
                }
            } else {
                sap.m.MessageToast.show(result.m, {
                    duration: 3000
                });
                sap.ui.core.BusyIndicator.hide();
            }
            sap.ui.core.BusyIndicator.hide();
        });
                    }, 1000);
        },
        onDocNuevoCloseSeleccionarMaterial: function () {
            sap.ui.getCore().byId("dlg_listaBuscarMateriales").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscar").open();
        },
        onDocNuevoAnadirMaterial: function (evt) {
            var itemSeleccionado = sap.ui.getCore().byId("lista_BuscarMaterial").getSelectedItem();
            if(itemSeleccionado){
                sap.ui.getCore().byId("dlg_DocNuevoaddProductoonDialog").open();                           
        }else{
            MessageToast.show("No ha seleccionado un Material");             
        }
        },
        ////// Inicio Mejora Seleccionar KIT AddDialog//////////////////////////////////
        AddMaterialNormalDialog:function(materialSer,stockSer,cantidad){
               if(materialSer != null) {
                   var materialesStock = this.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                   var materiales = this.getView().getModel().getProperty("/listaMaterial");
                   if(materiales == null) {materiales = new Array();}
                       for(var indice in materialesStock) {
                            if(materialesStock[indice].TipoMaterial=="NA2" || materialesStock[indice].TipoMaterial=="NA3"){
                            materialesStock[indice].CodCentro="9110";
                            materialesStock[indice].CodAlmacen="0001";
                            }  
                            materiales.push(materialesStock[indice]);
                        }                        
                        this.getView().getModel().setProperty("/listaMaterial/", materiales);        
                        if(window.dataIni.person.CanalDist=='10'){
                            if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){
                                for (var i = 0; i < materialesStock.length; i++) {
                                    this.onConsultarTransito(materialesStock,i);
                                }
                            }
                        }
                        /////Redireccion Master Productos y Detalle Producto//////////////
                                            this.onDocNuevoMasterProductos();
                                            //////////////////////////////////////////////////////////////////
                                            if(window.dataIni.person.CanalDist=='10'){
                                                if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){
                                                    for (var i = 0; i < materialesStock.length; i++) {
                                                        this.onConsultarTransito(materialesStock,i);
                                                    }
                                                }
                                            }
                                            sap.ui.getCore().byId("txt_cantidad_dlgBuscarMaterial").setValue(1);
                                        this.calcularPesoTotal();
                                        //self.onSelectAll(false);
                                        this.getView().getModel().refresh();
                                        sap.ui.getCore().byId("dlg_MensajeAvisoCrearCotizacion").close()
                                        sap.ui.getCore().byId("lb_mensajeAviso1").setText("Material Añadido. Desea seguir añadiendo materiales?");//Menssaje Aviso
                                        sap.ui.getCore().byId("dlg_DocNuevoaddProductoonDialog").close();
                                        sap.ui.getCore().byId("dlg_MensajeAviso1").open();
                                        sap.ui.core.BusyIndicator.hide();
                                        this.sessionStorageDocNuevo();

                        /*this.calcularPesoTotal();
                        this.onSelectAll(false);
                        this.limpiarAgregarMaterial();
                        this.getView().getModel().refresh();
                        //sap.ui.getCore().byId("dlg_DocNuevoaddProducto").close();
                        this.sessionStorageDocNuevo();
                        sap.ui.core.BusyIndicator.hide();*/
                }   
        },
        VerificarOpcionKitDialog:function(mats,matsStock,cantidad){
            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({ text: "¿Desea agregar vínculos?" }),
                beginButton: new Button({
                    text: 'Si',
                    type: 'Accept',
                    press: function () {
                        dialog.destroy();
                        utilString.cambiarSelectedsLista(this,"listaMaterialesKit",false);
                        this.getView().getModel().setProperty("/listaMaterialKitPrimerItem/", mats[0]);
                        this.getView().getModel().setProperty("/listaMaterialKit/", mats.filter(function(i) { return i.PosSupCorto !== "" }));
                        this.getView().getModel().setProperty("/listaMaterialKit/0/stockKit", matsStock);
                        this.getView().getModel().setProperty("/listaMaterialKit/0/cantidadKit", cantidad);
                        this.getView().getModel().refresh();
                        sap.ui.getCore().byId("dlg_DocNuevoaddProductoonDialog").close();
                        sap.ui.getCore().byId("dlg_DialogListaMaterialesSelectKitDialog").open();
                        sap.ui.core.BusyIndicator.hide();
                         return ;
                    }.bind(this)
                }),
                endButton: new Button({
                    text: 'No',
                    type: 'Reject',
                    press: function () {
                             dialog.destroy();
                        var materialSer = mats.filter(function(i) { return i.PosSupCorto == "" });
                        var stockSer = matsStock;
                        this.AddMaterialNormalDialog(materialSer,stockSer,cantidad);
                        return;
                    }.bind(this)
                }),
                afterClose: function() {
                    dialog.destroy();
                }
            });

            dialog.open();

            
        },
        onCloseDlg_DialogListaMaterialesSelectKitDialog:function(){
            this.getView().getModel().setProperty("/listaMaterialKit",null);
            sap.ui.getCore().byId("dlg_DialogListaMaterialesSelectKitDialog").close();
            sap.ui.getCore().byId("dlg_MensajeAvisoCrearCotizacion").close()
                                        sap.ui.getCore().byId("lb_mensajeAviso1").setText("Material Añadido. Desea seguir añadiendo materiales?");//Menssaje Aviso
                                        sap.ui.getCore().byId("dlg_DocNuevoaddProductoonDialog").close();
                                        sap.ui.getCore().byId("dlg_MensajeAviso1").open();
            this.getView().getModel().refresh();
        },
        onAnadirDlg_DialogListaMaterialesSelectKitDialog:function(){
            var matSelected = sap.ui.getCore().byId("listaMaterialesKitDialog").getSelectedItems();
            var matGenerar = [];

            matGenerar.push(this.getView().getModel().getProperty("/listaMaterialKitPrimerItem/"));
            for (var i = 0; i < matSelected.length; i++) 
                {
                  var item = matSelected[i];
                  var context = item.getBindingContext();
                  var path = context.getPath(); 
                  //Obtener Material////
                  var material = this.getView().getModel().getProperty(path);
                  material.path = path;
                  matGenerar.push(material);
                    
                }

            var materialSer = matGenerar;
            var stockSer = this.getView().getModel().getProperty("/listaMaterialKit/0/stockKit");
            var cantidad = this.getView().getModel().getProperty("/listaMaterialKit/0/cantidadKit");
            if(materialSer != null) {
                var materialesStock = this.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                var materiales = this.getView().getModel().getProperty("/listaMaterial");
                if(materiales == null) {materiales = new Array();}
                    for(var indice in materialesStock) {
                        if(materialesStock[indice].TipoMaterial=="NA2" || materialesStock[indice].TipoMaterial=="NA3"){
                            materialesStock[indice].CodCentro="9110";
                            materialesStock[indice].CodAlmacen="0001";
                        }  
                        materiales.push(materialesStock[indice]);
                    }                        
                    this.getView().getModel().setProperty("/listaMaterial/", materiales);        
                    if(window.dataIni.person.CanalDist=='10'){
                        if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){
                            for (var i = 0; i < materialesStock.length; i++) {
                                this.onConsultarTransito(materialesStock,i);
                            }
                        }
                    }
                    this.calcularPesoTotal();
                    this.onSelectAll(false);
                    this.limpiarAgregarMaterial();
                    this.getView().getModel().refresh();
                    //sap.ui.getCore().byId("dlg_DocNuevoaddProducto").close();
                    this.sessionStorageDocNuevo();
                }
                sap.ui.getCore().byId("dlg_DialogListaMaterialesSelectKitDialog").close();
                sap.ui.getCore().byId("lb_mensajeAviso1").setText("Material Añadido. Desea seguir añadiendo materiales?");//Menssaje Aviso
                                        sap.ui.getCore().byId("dlg_DocNuevoaddProductoonDialog").close();
                                        sap.ui.getCore().byId("dlg_MensajeAviso1").open();

        },
        ////// End Mejora Seleccionar KIT AddDialog//////////////////////////////////
        onDocNuevoMasterProductosAddonDialog: function () {
            var documentoCreado = this.getView().getModel().getProperty("/pedido/CodTipoDoc");

            if(!documentoCreado){
                this.listaMasterDatos(false);
                this.getView().byId("listPanelDatos").setVisible(true);
                sap.ui.getCore().byId("dlg_MensajeAvisoCrearCotizacion").open();
            }else{
                var codMaterial = sap.ui.getCore().byId("lista_BuscarMaterial").getSelectedItem().getBindingContext().getObject(); 
                var codigoMaterial = codMaterial.CodMaterial ;
                var opcionMaterial = sap.ui.getCore().byId("com_opcion_dlgBuscarMaterial").getSelectedKey();
                var codigoAmbiente = sap.ui.getCore().byId("com_ambiente_dlgBuscarMaterial").getSelectedKey() ;
                var cantidad1 = sap.ui.getCore().byId("txt_cantidad_dlgBuscarMaterial").getValue() ;
                var cantidad = cantidad1;//
                        
                        if(codigoMaterial!=""){
            
                }else{
                    return MessageToast.show("No ha ingresado ningún material"); 
                }
                    if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z036" && 
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z010" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z035" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="ZO02" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z003" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z004" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z015" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z034" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z037" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z038" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z036" &&
                    this.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z040"){

                        if(window.dataIni.person.CanalDist=="10"){
                            if(codigoAmbiente!=""){
                                    
                            }else{
                                return MessageToast.show("No ha ingresado Ambiente"); 
                            }

                            if(opcionMaterial!=""){

                            }else{
                                 return MessageToast.show("No ha ingresado Opcion de Ambiente");
                            }
                        }

                    }

                                        var tamanoList = this.obtenerTamaniolLista();
                                        var nuevoMaterial = this.crearNuevoMaterialDesdeBuscar(codigoMaterial, opcionMaterial, codigoAmbiente, cantidad, tamanoList);
                                        var self = this;

                                        sap.ui.core.BusyIndicator.show(0);
                                        setTimeout(function(){
                                            //var result = materialServices.anadirMaterialMaster(nuevoMaterial);
                                            materialServices.anadirMaterialMaster(nuevoMaterial, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                                            if (result.c === "s") {
                                                if (result.data.success) {

                                                    var materialSer = result.data.lstTotal;
                                                    var stockSer = result.data.lstStock;

                                                    if(materialSer != null) {
                                                        //////
                                            if( (self.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z035" && 
                                                            self.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z036" && 
                                                            self.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z037" && 
                                                            self.getView().getModel().getProperty("/pedido/CodTipoDoc")!="Z038" ) && 
                                                            (window.dataIni.person.CanalDist=="10" || window.dataIni.person.CanalDist=="20" || window.dataIni.person.CanalDist=="30" || window.dataIni.person.CanalDist=="")){

                                                            if(result.data.lstTotal.length>1){//result.data.lstTotal.length>1
                                                                if(result.data.lstTotal[0].CodMaterialCorto.substring(0,1)=="4"){
                                                                    
                                                                    self.AddMaterialNormalDialog(result.data.lstTotal,result.data.lstStock,cantidad);
                                                                }else{
                                                                    self.VerificarOpcionKitDialog(result.data.lstTotal,result.data.lstStock,cantidad);
                                                                }
                                                            }else{
                                                                self.AddMaterialNormalDialog(result.data.lstTotal,result.data.lstStock,cantidad);
                                                            }

                                                        }else{
                                                            self.AddMaterialNormalDialog(result.data.lstTotal,result.data.lstStock,cantidad);
                                                        }
                                            /////

                                                       /* var materialesStock = self.agregarMaterialNuevo(materialSer,stockSer,cantidad);
                                                        var materiales = self.getView().getModel().getProperty("/listaMaterial");
                                                        if(materiales == null) {materiales = new Array();}
                                                        for(var indice in materialesStock) {
                                                            materiales.push(materialesStock[indice]);
                                                        }                        
                                                        self.getView().getModel().setProperty("/listaMaterial/", materiales);   
                                                        /////Redireccion Master Productos y Detalle Producto//////////////
                                                        self.onDocNuevoMasterProductos();
                                                        //////////////////////////////////////////////////////////////////
                                                        if(window.dataIni.person.CanalDist=='10'){
                                                            if(self.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){
                                                                for (var i = 0; i < materialesStock.length; i++) {
                                                                    self.onConsultarTransito(materialesStock,i);
                                                                }
                                                            }
                                                        }
                                                        sap.ui.getCore().byId("txt_cantidad_dlgBuscarMaterial").setValue(1);
                                                    self.calcularPesoTotal();
                                                    self.onSelectAll(false);
                                                    self.getView().getModel().refresh();
                                                    sap.ui.getCore().byId("dlg_MensajeAvisoCrearCotizacion").close()
                                                    sap.ui.getCore().byId("lb_mensajeAviso1").setText("Material Añadido. Desea seguir añadiendo materiales?");//Menssaje Aviso
                                                    sap.ui.getCore().byId("dlg_DocNuevoaddProductoonDialog").close();
                                                    sap.ui.getCore().byId("dlg_MensajeAviso1").open();
                                                    sap.ui.core.BusyIndicator.hide();
                                                    */
                                                    }
                                                    
                                                } else {
                                                    sap.ui.getCore().byId("txt_cantidad_dlgBuscarMaterial").setValue(1);
                                                    sap.m.MessageToast.show(result.data.errors.reason, { duration: 3000 });
                                                    sap.ui.core.BusyIndicator.hide();
                                                }
                                            } else {
                                                sap.ui.getCore().byId("txt_cantidad_dlgBuscarMaterial").setValue(1);
                                                sap.m.MessageToast.show(result.m, { duration: 3000 });
                                                sap.ui.core.BusyIndicator.hide();
                                            } 
                                            self.sessionStorageDocNuevo();
                                            sap.ui.core.BusyIndicator.hide();
                                        });
                                        },1000);
                            
                }
        },

        onDocNuevoClosedlg_addProductoonDialog: function () {
            sap.ui.getCore().byId("dlg_DocNuevoaddProductoonDialog").close();
        },

        onSiMensajeAviso1: function () {
            sap.ui.getCore().byId("dlg_MensajeAviso1").close();
        },
        onNoMensajeAviso1: function () {
            sap.ui.getCore().byId("dlg_MensajeAviso1").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscar").close();
            sap.ui.getCore().byId("dlg_listaBuscarMateriales").close();
            sap.ui.getCore().byId("dlg_DocNuevoaddProductoonDialog").close();
            sap.ui.getCore().byId("dlg_stockDisponibleOnDialog").close();
        },
       onEliminarMaterial:function(){
            if(this.getView().byId("listaMasterMateriales").getSelectedItems().length>0){
                var items = new Array();
                var currentMat = this.getView().byId("listaMasterMateriales").getSelectedItems();
                for (var i = 0; i < currentMat.length; i++) 
                {
                  var item = currentMat[i];
                  var context = item.getBindingContext();
                  var obj = context.getProperty(null, context);
                  items.push(obj)
                }
                var currentMatCount = items.length;
                if (items.length > 0)
                {
                    for (var cmb = 0; cmb < items.length; cmb++) 
                    {
                        if (items[cmb].TipoPosicion == "Z017" || items[cmb].TipoPosicion == "Z012") 
                        {
                            sap.m.MessageToast.show("Aviso, Los componentes del combo no pueden ser eliminados.", { duration: 3000 }); 
                            return;
                        }
                    }
                }      
                sap.ui.getCore().byId("dlg_MensajeAvisoEliminarMaterial").open();
            }else{
                sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
                sap.ui.getCore().byId("txt_aviso_general").setText("No ha seleccionado ningun material");
            }
        },
        onSiMensajeEliminarMaterial:function(){
            var currentItem = this.getView().byId("listaMasterMateriales").getSelectedItems();
            var  listaMasterMateriales = this.getView().byId("listaMasterMateriales");
            var items = new Array();
            var detalleMatStore = new Array();
            for (var indice in currentItem) 
            {
              var item = currentItem[indice];
              var context = item.getBindingContext();
              var obj = context.getProperty(null, context);
              obj.path = context.getPath().match(/\d/g).join("");
              items.push(obj)
            }
            for (var indice in listaMasterMateriales.mAggregations.items) 
            {
              var item = listaMasterMateriales.mAggregations.items[indice];
              var context = item.getBindingContext();
              var obj = context.getProperty(null, context);
              obj.path = context.getPath().match(/\d/g).join("");
              detalleMatStore.push(obj)
            }
            var matHijos = [];
            for (var detmp = 0; detmp < detalleMatStore.length; detmp++) 
            {
                for (var detmpx = 0; detmpx < items.length; detmpx++) {
                    if (detalleMatStore[detmp].PosSupCorto == items[detmpx].PosicionCorto) {
                        matHijos.push(detalleMatStore[detmp]);
                    }
                }
            }
            ///Inicio Nuevo Eliminar Materiales////////////////////
            var itemsEliminar = items.concat(matHijos);
            var itemsFinal = detalleMatStore;
            for (var i = 0; i < itemsEliminar.length; i++) {
                var itemsActualizado = itemsFinal.filter(function(el) {
                                         return el.path != itemsEliminar[i].path ;
                    });
                itemsFinal = itemsActualizado;
            }
            ///End Nuevo Eliminar Materiales///////////////////////
            

            /*
            for (var i = currentItem.length; i >0 ; i--) {
                var currentIndex = this.getView().byId("listaMasterMateriales").indexOfItem(currentItem[i-1]);
                var array = this.getView().getModel().getProperty("/listaMaterial");
                _.remove(array, function(item,indexRemove) {
                  return currentIndex == indexRemove;
                });
            }
            
            for (var i = array.length-1; i>0 ; i--) 
            {
                for (var a = matHijos.length-1; a >= 0; a--) 
                {
                    if (array[i].PosicionCorto==matHijos[a].PosicionCorto) 
                    {
                        array.splice(i,1);
                        i--;
                    }
                }
            }*/
            /*for(var indice in matHijos ){
                array.splice(array[indice],1);
            }
            this.getView().getModel().setProperty("/listaMaterial",array);*/
            this.getView().getModel().setProperty("/listaMaterial",itemsFinal);
            sap.ui.getCore().byId("dlg_MensajeAvisoEliminarMaterial").close();
            this.onSeleccionarNingunMaterial();
            //this.onSelectAll(false);
            this.calcularPesoTotal();
            this.getView().getModel().refresh();
            console.log(itemsFinal);
            this.sessionStorageDocNuevo();
        },
        onNoMensajeEliminarMaterial:function(){
            sap.ui.getCore().byId("dlg_MensajeAvisoEliminarMaterial").close();
        },
        //////End Buscar Materiales/////////////////////////////////////////
        /////Inicio Mejora Calzada Multiple////////////////////////////
        onContinuarStockPorPedirMulti: function(oEvent) {
            var self = this;
sap.ui.core.BusyIndicator.show(0); 
setTimeout(function () {
                var CodJer = sap.ui.getCore().byId("com_codJerarqui_stockPorPedirMultiDocNuevo").getSelectedKey();
                if(CodJer==" "){
                    CodJer="";
                }
                var CodMat = JSON.stringify(JSON.parse(sessionStorage.MatCalzadaMulti));
                var FecIni = sap.ui.getCore().byId("date_fechaInicio_stockPorPedirMultiDocNuevo").getValue();
                var FecFin = sap.ui.getCore().byId("date_fechaFin_stockPorPedirMultiDocNuevo").getValue();
                var OfVentas = window.dataIni.person.OfVentas;
                //var result = stockServices.stockporPedir(CodJer,CodMat,FecIni,FecFin,OfVentas); 
                stockServices.stockporPedirMulti(CodJer,CodMat,FecIni,FecFin,OfVentas,"calzada", function(result) { 
                sap.ui.core.BusyIndicator.show(0); 
                if (result.c === "s") {
                                if (result.data.success) {
                                    var matSelected = self.getView().byId("listaMasterMateriales").getSelectedItems();
                                    var mensaje = "";
                                    for (var i = 0; i < matSelected.length; i++) {
                                                var path = matSelected[i].getBindingContext().getPath();
                                                var stockCalzada = result.data.lstReporteMercaderia.filter(function(el) {
                                                    return el.MATNR == self.getView().getModel().getProperty(path+"/CodMaterialCorto") ;
                                                });          
                                                self.getView().getModel().setProperty(path+"/stockPorPedir",stockCalzada);                
                                                self.getView().getModel().refresh();
                                                
                                                if(stockCalzada.length<1){
                                                    if(mensaje!=""){
                                                        mensaje = mensaje+","+self.getView().getModel().getProperty(path+"/CodMaterialCorto");
                                                    }else{
                                                        mensaje = self.getView().getModel().getProperty(path+"/CodMaterialCorto");
                                                    }   
                                                }
                                    }
                                    if(mensaje==""){
                                        sap.ui.getCore().byId("txt_aviso_general").setText("Se cargaron registros en calzada."); 
                                    }else{
                                        sap.ui.getCore().byId("txt_aviso_general").setText("Se cargaron registros en calzada, excepto: "+mensaje); 
                                    }
                                   sap.ui.getCore().byId("dlg_stockPorPedirMultiDocNuevo").close();
                                   sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();

                                } else {
                                    sap.m.MessageToast.show(result.data.errors.reason, {
                                        duration: 3000
                                    });
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                    /*var matSelected = self.getView().byId("listaMasterMateriales").getSelectedItems();
                                    for (var i = 0; i < matSelected.length; i++) {
                                        if(self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto")==CodMat){
                                            self.getView().getModel().setProperty("/listaMaterial/"+i+"/stockPorPedir",null);
                                            self.getView().getModel().refresh();
                                        }
                                    }*/
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                }
                            } else {
                                sap.m.MessageToast.show(result.m, {
                                    duration: 3000
                                });
                            }
                            console.log(result.data);
                            sap.ui.core.BusyIndicator.hide();
                            }); 
                    }, 1000);
        },
        onCancelarStockPorPedirMulti:function(){
            sap.ui.getCore().byId("dlg_stockPorPedirMultiDocNuevo").close();
        },
        /////End Mejora Calzada Multiple////////////////////////////////
        /////Inicio Mejora Tránsito Multiple////////////////////////////
        onContinuarStockPorLlegarMulti:function(){
            var self = this;
sap.ui.core.BusyIndicator.show(0); 
setTimeout(function () {
                var matnr = JSON.stringify(JSON.parse(sessionStorage.MatTransitoMulti));
                var lfdat_inicio = sap.ui.getCore().byId("date_fec_inicio_stockPorLlegarMultiDocNuevo").getValue();
                var lfdat_fin = sap.ui.getCore().byId("date_fec_fin_stockPorLlegarMultiDocNuevo").getValue();
                var OfVentas = window.dataIni.person.OfVentas;
                //var result = stockServices.stockporLlegar(matnr,lfdat_inicio,lfdat_fin,OfVentas); 
                stockServices.stockporLlegarMulti(matnr,lfdat_inicio,lfdat_fin,OfVentas,"transito", function(result) { 
                sap.ui.core.BusyIndicator.show(0); 
                if (result.c === "s") {
                                if (result.data.success) {
                                    //self.getView().getModel().setProperty("/retornoStockPorPedir", null);
                                    /////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var matSelected = self.getView().byId("listaMasterMateriales").getSelectedItems();
                                    var mensaje = "";
                                    for (var i = 0; i < matSelected.length; i++) {
                                                var path = matSelected[i].getBindingContext().getPath();
                                                var stockTransito = result.data.lstStockCurso.filter(function(el) {
                                                    return el.MATNR == self.getView().getModel().getProperty(path+"/CodMaterial") ;
                                                }); 
                                                self.getView().getModel().setProperty(path+"/stockPorLlegar",stockTransito);
                                                self.getView().getModel().refresh();
                                                if(stockTransito.length<1){
                                                    if(mensaje!=""){
                                                        mensaje = mensaje+","+self.getView().getModel().getProperty(path+"/CodMaterialCorto");
                                                    }else{
                                                        mensaje = self.getView().getModel().getProperty(path+"/CodMaterialCorto");
                                                    }
                                                    
                                                }
                                    }

                                    if(mensaje==""){
                                        sap.ui.getCore().byId("txt_aviso_general").setText("Se cargaron registros en transito."); 
                                    }else{
                                        sap.ui.getCore().byId("txt_aviso_general").setText("Se cargaron registros en transito, excepto: "+mensaje); 
                                    }
                                    sap.ui.getCore().byId("dlg_stockPorLlegarMultiDocNuevo").close();
                                    sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();

                                } else {
                                    sap.m.MessageToast.show(result.data.errors.reason, {
                                        duration: 3000
                                    });
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var matSelected = self.getView().byId("listaMasterMateriales").getSelectedItems();
                                    for (var i = 0; i < matSelected.length; i++) {
                                        if(self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto")==matnr){
                                            self.getView().getModel().setProperty("/listaMaterial/"+i+"/stockPorPedir",null);
                                            self.getView().getModel().refresh();
                                        }
                                    }
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                }
                            } else {
                                sap.m.MessageToast.show(result.m, {
                                    duration: 3000
                                });
                            }
                            console.log(result.data);
                            sap.ui.core.BusyIndicator.hide(); 
                        });
                    }, 1000);
        },
        onCancelarStockPorLlegarMulti:function(){
            sap.ui.getCore().byId("dlg_stockPorLlegarMultiDocNuevo").close();
        },
        /////End Mejora Tránsito Multiple///////////////////////////////
        /////////Inicio Stock Por Pedir////////////////////////////////////////////////////////////////////////////////
        goStockporPedir: function (oEvent) {
            var item = this.getView().byId("listaMasterMateriales").getSelectedItem();
            var matSelected = this.getView().byId("listaMasterMateriales").getSelectedItems();
            if(matSelected.length==0){
                return MessageToast.show("No ha seleccionado un Material.");
            }
            if(matSelected.length==1){
                sap.ui.getCore().byId("txt_codMaterial_stockPorPedirDocNuevo").setValue(item.getBindingContext().getObject().CodMaterialCorto);
                this.getView().getModel().refresh();
                sap.ui.getCore().byId("dlg_stockPorPedirDocNuevo").open();
            }else{
                if(window.dataIni.person.CanalDist=="10"){
                    if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO01" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO02" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z001" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z003" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z004" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z009" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z010" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z015"){
                    var matArray = [];
                    for (var i = 0; i < matSelected.length; i++) {
                        var matObject = {};
                        matObject.material = matSelected[i].getBindingContext().getObject().CodMaterial;
                        matArray.push(matObject);
                    }
                    sessionStorage.setItem( "MatCalzadaMulti",JSON.stringify(matArray) );
                    this.getView().getModel().refresh();
                    sap.ui.getCore().byId("dlg_stockPorPedirMultiDocNuevo").open();
                    }else{
                        MessageToast.show("Seleccione sólo un Material.");
                    }
                }else{

                    MessageToast.show("Seleccione sólo un Material.");
                }
            }
        },
        onContinuarStockPorPedir: function(oEvent) {

            var self = this;
sap.ui.core.BusyIndicator.show(0); 
setTimeout(function () {
                var CodJer = sap.ui.getCore().byId("com_codJerarqui_stockPorPedirDocNuevo").getSelectedKey();
                if(CodJer==" "){
                    CodJer="";
                }
                var CodMat = sap.ui.getCore().byId("txt_codMaterial_stockPorPedirDocNuevo").getValue();
                var FecIni = sap.ui.getCore().byId("date_fechaInicio_stockPorPedirDocNuevo").getValue();
                var FecFin = sap.ui.getCore().byId("date_fechaFin_stockPorPedirDocNuevo").getValue();
                var OfVentas = window.dataIni.person.OfVentas;
                //var result = stockServices.stockporPedir(CodJer,CodMat,FecIni,FecFin,OfVentas); 
                stockServices.stockporPedir(CodJer,CodMat,FecIni,FecFin,OfVentas, function(result) { 
                sap.ui.core.BusyIndicator.show(0); 
                if (result.c === "s") {
                                if (result.data.success) {
                                    self.getView().getModel().setProperty("/retornoStockPorLlegarDocNuevo", null);
                                    /////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var matSelected = self.getView().byId("listaMasterMateriales").getItems();
                                    for (var i = 0; i < matSelected.length; i++) {
                                        if(self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto")==CodMat){
                                            self.getView().getModel().setProperty("/listaMaterial/"+i+"/stockPorPedir",result.data.lstReporteMercaderia);

                                            self.getView().getModel().refresh();
                                        }
                                    }
                                    var item = self.getView().byId("listaMasterMateriales").getSelectedItems()[0].oBindingContexts.undefined;
                                    var path = item.getPath();
                                    self.getView().getModel().setProperty("/material",self.getView().getModel().getProperty(path) );
                                    self.getView().getModel().setProperty("/material/path",path.substr(15));
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                   //self.getView().getModel().setProperty("/retornoStockPorPedirDocNuevo", result.data);
                                   sap.ui.getCore().byId("dlg_stockPorPedirDocNuevo").close();
                                   self.getView().byId("tabDetalleProducto").setSelectedKey("filterStockPorPedir");
                                   self.byId("SplitAppId").to(self.createId("pagDocNuevo_productos_lista1"));
                                } else {
                                    sap.m.MessageToast.show(result.data.errors.reason, {
                                        duration: 3000
                                    });
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var matSelected = self.getView().byId("listaMasterMateriales").getSelectedItems();
                                    for (var i = 0; i < matSelected.length; i++) {
                                        if(self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto")==CodMat){
                                            self.getView().getModel().setProperty("/listaMaterial/"+i+"/stockPorPedir",null);
                                            self.getView().getModel().refresh();
                                        }
                                    }
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                }
                            } else {
                                sap.m.MessageToast.show(result.m, {
                                    duration: 3000
                                });
                            }
                            console.log(result.data);
                            sap.ui.core.BusyIndicator.hide();
                            }); 
                    }, 1000);
        },
        /////////Fin Stock Por Pedir////////////////////////////////////////////////////////////////////////////////
        /////////Inicio Stock Por Llegar////////////////////////////////////////////////////////////////////////////////
        goStockporLlegar: function () {
            var item = this.getView().byId("listaMasterMateriales").getSelectedItem();
            var matSelected = this.getView().byId("listaMasterMateriales").getSelectedItems();
            if(matSelected.length==0){
                return MessageToast.show("No ha seleccionado un Material.");
            }
            if(matSelected.length==1){
                sap.ui.getCore().byId("txt_cod_material_stockPorLlegarDocNuevo").setValue(item.getBindingContext().getObject().CodMaterialCorto);
                this.getView().getModel().refresh();
                sap.ui.getCore().byId("dlg_stockPorLlegarDocNuevo").open();
            }else{
                if(window.dataIni.person.CanalDist=="10"){
                    if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO01" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO02" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z001" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z003" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z004" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z009" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z010" ||
                        this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z015"){
                var matArray = [];
                for (var i = 0; i < matSelected.length; i++) {
                    var matObject = {};
                    matObject.material = matSelected[i].getBindingContext().getObject().CodMaterial;
                    matArray.push(matObject);
                }
                sessionStorage.setItem( "MatTransitoMulti",JSON.stringify(matArray) );
                this.getView().getModel().refresh();
                sap.ui.getCore().byId("dlg_stockPorLlegarMultiDocNuevo").open();
                }else{
                    MessageToast.show("Seleccione sólo un Material.");
                }
            }else{

                MessageToast.show("Seleccione sólo un Material.");
            }
            }
        },
        onContinuarStockPorLlegar:function(){
            var self = this;
sap.ui.core.BusyIndicator.show(0); 
setTimeout(function () {
                var matnr = sap.ui.getCore().byId("txt_cod_material_stockPorLlegarDocNuevo").getValue();
                var lfdat_inicio = sap.ui.getCore().byId("date_fec_inicio_stockPorLlegarDocNuevo").getValue();
                var lfdat_fin = sap.ui.getCore().byId("date_fec_fin_stockPorLlegarDocNuevo").getValue();
                var OfVentas = window.dataIni.person.OfVentas;
                //var result = stockServices.stockporLlegar(matnr,lfdat_inicio,lfdat_fin,OfVentas); 
                stockServices.stockporLlegar(matnr,lfdat_inicio,lfdat_fin,OfVentas, function(result) { 
                sap.ui.core.BusyIndicator.show(0); 
                if (result.c === "s") {
                                if (result.data.success) {
                                    //self.getView().getModel().setProperty("/retornoStockPorPedir", null);
                                    /////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var matSelected = self.getView().byId("listaMasterMateriales").getItems();
                                    for (var i = 0; i < matSelected.length; i++) {
                                        if(self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto")==matnr){
                                            self.getView().getModel().setProperty("/listaMaterial/"+i+"/stockPorLlegar",result.data.lstStockCurso);

                                            self.getView().getModel().refresh();
                                        }
                                    }
                                    var item = self.getView().byId("listaMasterMateriales").getSelectedItems()[0].oBindingContexts.undefined;
                                    var path = item.getPath();
                                    self.getView().getModel().setProperty("/material",self.getView().getModel().getProperty(path) );
                                    self.getView().getModel().setProperty("/material/path",path.substr(15));
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                   //self.getView().getModel().setProperty("/retornoStockPorLlegar", result.data);
                                   sap.ui.getCore().byId("dlg_stockPorLlegarDocNuevo").close();
                                   self.getView().byId("tabDetalleProducto").setSelectedKey("filterStockPorLlegar");
                                   self.byId("SplitAppId").to(self.createId("pagDocNuevo_productos_lista1"));
                                } else {
                                    sap.m.MessageToast.show(result.data.errors.reason, {
                                        duration: 3000
                                    });
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var matSelected = self.getView().byId("listaMasterMateriales").getSelectedItems();
                                    for (var i = 0; i < matSelected.length; i++) {
                                        if(self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto")==matnr){
                                            self.getView().getModel().setProperty("/listaMaterial/"+i+"/stockPorPedir",null);
                                            self.getView().getModel().refresh();
                                        }
                                    }
                                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                }
                            } else {
                                sap.m.MessageToast.show(result.m, {
                                    duration: 3000
                                });
                            }
                            console.log(result.data);
                            sap.ui.core.BusyIndicator.hide(); 
                        });
                    }, 1000);
        },
        //Boton Home para Stock Por Llegar
        onCancelarStockPorLlegar: function () {
            sap.ui.getCore().byId("dlg_stockPorLlegarDocNuevo").close();            
        },
        onCancelarStockPorPedir:function(){
            sap.ui.getCore().byId("dlg_stockPorPedirDocNuevo").close();
        },        
        /////////Fin Stock Por Llegar///////////////////////////////////////////////////////////////////////////////////
        mostrarCatalogo:function(){
            var material = this.getView().byId("listaMasterMateriales").getSelectedItem().getBindingContext().getObject();
            
            var catalogo = new Object();
            catalogo.Posicion = material.Posicion ;
            catalogo.CodMaterialCorto = material.CodMaterialCorto ;
            catalogo.DescMaterial = material.DescMaterial ;
            catalogo.Cantidad = material.Cantidad ;  //chequear cantidad en material 11000997 debe ser 1.44, pero sale 1
            catalogo.CodUMedida = material.CodUMedida ;
            catalogo.Rendimiento = material.Rendimiento ;
            catalogo.fullName = material.CodCentro+" "+material.DescCentro+" / "+material.CodAlmacen+" / "+material.CodLote ;
            catalogo["ext-comp-1153"] = true ;
            catalogo.Peso = material.Peso ;
            catalogo.PesoNeto = material.PesoNeto ;
            catalogo.PrecioUnitario = material.PrecioUnitario ;
            catalogo.TotalDctos = "" ;//no estan en las propiedades del material
            catalogo.SubTotal = "" ;//
            catalogo["ext-comp-1159"] = "2017-07-26T05:00:00.000Z" ;
            catalogo.CodGrupoMat = material.CodGrupoMat ;
            catalogo.Opcion = material.Opcion ;
            catalogo.MotivoRechazo = "" ;//
            catalogo.PrioridadEntrega = material.PrioridadEntrega ;
            catalogo.codigoMaterial = material.CodMaterialCorto ;
            
            return catalogo;
        },
        ////////Inicio Seleccionar Material desde el Master//////////////////////////
        onMasterProductoSeleccionarMaterial: function (oEvent) {
            this.onSelectAll(false);
            var item =  oEvent.getSource().getBindingContext().getPath();
            var numb = item.match(/\d/g);
            numb = numb.join("");
            window.posicionListaProductoDetallado = numb;
            var firstItem = this.getView().byId("listaMasterMateriales").getItems()[numb]; 
                            this.getView().byId("listaMasterMateriales").setSelectedItem(firstItem,true);
        
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
            this.getView().byId("tabDetalleProducto").setSelectedKey("filterDetalleProducto1");
            var material = this.getView().byId("listaMasterMateriales").getSelectedItem().getBindingContext().getObject();
            var materialDet = jQuery.extend({}, material);
            materialDet.path = numb;
            if(material.CodMaterialCorto == "20000812"){
                this.getView().byId("tabDetalleMaterialDescuento").setVisible(false);
            }else{
                this.getView().byId("tabDetalleMaterialDescuento").setVisible(true);
            }
            this.getView().getModel().setProperty("/material", materialDet);
            utilString.storeDsctosPrinReserva(this,materialDet.DescuentoPrincipal,"/material/DescuentoPrincipalReserva",materialDet.PosicionCorto);
            utilString.storeDsctosOtrosReserva(this,materialDet.DescuentoOtros,"/material/DescuentoOtrosReserva",materialDet.PosicionCorto);
            
            this.getView().getModel().refresh();
            
            console.log(this.getView().getModel().getProperty("/material"));
            ////////// Catalogo  ////////////////////////////////////////////////////
            /*
            var materialSeleccionado = this.mostrarCatalogo();
            var result = materialServices.catalogo(materialSeleccionado);

                            if (result.c === "s") {
                                if (result.data.success) {
                                    var archivos = [];
                                    archivos = result.data.archivos;
                                    if (archivos.length == 0){
                                    }else{ 
                                        var oCarousel = this.getView().byId("carouselCatalogo");
                                        oCarousel.destroyPages();
                             
                                        for (var i = 0; i < archivos.length; i++) {
                                            var imgId = "img" + (i + 1);
                                            var imgSrc = "http://ventas.decor-center.com/ipad_proyecto/"+archivos[i].url;
                                            var imgAlt = "Example picture " + archivos[i].url;
                                            var img = new sap.m.Image(imgId, {
                                                src: imgSrc,
                                                alt: "{/material/DescMaterial}",
                                                width: "300px",
                                                densityAware: false,
                                                decorative: false
                                            });
                             
                                            oCarousel.addPage(img);
                                        }
                                    }
                                    this.getView().getModel().refresh();
                                    console.log(archivos.length);
                                    console.log(result);
                                    } else {
                                        sap.m.MessageToast.show(result.data.errors.reason, {
                                            duration: 3000
                                        });
                                    }
                             } else {
                                    sap.m.MessageToast.show(result.m, {
                                        duration: 3000
                                    });
                                }   
                                */
            /////////////////////////////////////////////////////////////////////////
        },  
        ////////End Seleccionar Material desde el Master//////////////////////////
        ////////Inicio Stock Disponible/////////////////////////////////////////////
        CambioTabFilterProductos:function(){
            if (this.getView().byId("tabDetalleProducto").getSelectedKey() === "filterCentroAlmacenLote") {
                var material = this.getView().getModel().getProperty("/material");

                //////Inicio Stock////////////////////////////////////////////////////////
                    
            //if(this.getView().getModel().getProperty("/pedido/NumPedido")!="" ){
            //if(!this.getView().getModel().getProperty("/listaMaterial/"+window.posicionListaProductoDetallado+"/stockDetallado")){
                var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
    self.byId("SplitAppId").to(self.createId("pagDocNuevo_productos_lista1"));
                var materialSeleccionado = {};
                materialSeleccionado.Posicion = material.Posicion;
                materialSeleccionado.CodMaterialCorto = material.CodMaterialCorto;  //11000004
                materialSeleccionado.DescMaterial = material.DescMaterial;  //VAINSA NVA ASIA D TEL BIDET TUB/MET 1.2MT C/SOP VAINSA NVA ASIA D TELBIDET TUB/MET 1.2
                materialSeleccionado.Cantidad = material.Cantidad;  //1
                materialSeleccionado.CodUMedida = material.CodUMedida;  //UN
                materialSeleccionado.Rendimiento = material.Rendimiento;  //-
                materialSeleccionado.fullName = material.CodCentro+" "+(material.DescCentro == undefined) ? "":material.DescCentro+" / "+material.CodAlmacen+" / "+material.CodLote;  //1080  / 0001 / 
                materialSeleccionado["ext-comp-1153"] = material.Zservicio;  //true
                materialSeleccionado.Peso = material.Peso;  //0.3
                materialSeleccionado.PesoNeto = material.PesoNeto;  //0.3
                materialSeleccionado.PrecioUnitario = material.PrecioUnitario;  //210.06
                materialSeleccionado.TotalDctos = material.TotalDctos;  //
                materialSeleccionado.SubTotal = material.SubTotal;  //210.06
                materialSeleccionado["ext-comp-1159"] = self.convertirFechaSistema(material.FechaCantConfStr);  //2017-07-19T05:00:00.000Z
                materialSeleccionado.CodGrupoMat = material.CodGrupoMat;  //08
                materialSeleccionado.Opcion = material.Opcion;  //01
                materialSeleccionado.MotivoRechazo = material.MotivoRechazo;  // 
                materialSeleccionado.PrioridadEntrega = material.PrioridadEntrega;  //03
                materialSeleccionado.codigoMaterial = material.CodMaterial;  //000000000011000004
                materialSeleccionado.pPosicion = material.Posicion;  //000010
                materialSeleccionado.pCentro = "";  //
                materialSeleccionado.dsctoLotes = material.dsctoLotes;  //1
                materialSeleccionado.auart = self.getView().getModel().getProperty("/pedido/CodTipoDoc");  //ZO01
                materialSeleccionado.verStock = 0;  //0
                materialSeleccionado.numPedido = self.getView().getModel().getProperty("/pedido/NumPedido");  //0020165432
                materialSeleccionado.valorRe = 0;
                materialSeleccionado.dsctoLotes = 1;
          
            //var result = materialServices.stockDisponibleListaMateriales(materialSeleccionado);
            materialServices.stockDisponibleListaMateriales(materialSeleccionado, function(result) { 
                sap.ui.core.BusyIndicator.show(0);

                            if (result.c === "s") {
                                if (result.data.success) {
                                    var stockTotal = 0;
                                    for (var i = 0; i < result.data.lstLoteTotal.length; i++) {
                                        stockTotal = stockTotal + result.data.lstLoteTotal[i].StockDisponible;
                                    }
                                    //////////////////////////////////////////////
                                    var stockDisp = (stockTotal - parseFloat(self.getView().getModel().getProperty("/material/Segurida")).toString()+" UN" );
                                    self.getView().getModel().setProperty("/material/StockTotal",stockTotal);
                                    self.getView().getModel().setProperty("/material/StockDisp",stockDisp);
                                   
                                    if(window.dataIni.person.CanalDist!='30'){
                                        self.getView().getModel().setProperty("/tituloTabStockDisp",true);
                                        self.getView().getModel().setProperty("/tituloTabStockSeparado",false);
                                    }else{
                                        if(self.getView().getModel().getProperty("/material/Segurida")!=""){
                                            self.getView().getModel().setProperty("/tituloTabStockDisp",false);
                                            self.getView().getModel().setProperty("/tituloTabStockSeparado",true);
                                        }else{
                                            self.getView().getModel().setProperty("/tituloTabStockDisp",true);
                                            self.getView().getModel().setProperty("/tituloTabStockSeparado",false);
                                        }
                                    }
                                    //////////////////////////////////////////////
                                    self.getView().getModel().setProperty("/listaMaterial/"+window.posicionListaProductoDetallado+"/stockDetallado", result.data.lstLoteTotal);
                                    self.getView().getModel().setProperty("/material/stockDetallado", result.data.lstLoteTotal);
                                    self.getView().getModel().setProperty("/material/path",window.posicionListaProductoDetallado);
                                    self.getView().getModel().refresh();
                                    } else {
                                        sap.m.MessageToast.show(result.data.errors.reason, {
                                            duration: 3000
                                        });
                                    }
                             } else {
                                    sap.m.MessageToast.show(result.m, {
                                        duration: 3000
                                    });
                                }   
            sap.ui.core.BusyIndicator.hide();
        });
                    }, 1000);
                                }else{
                                    this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
                                }
        //}
            //////End Stock////////////////////////////////////////////////////////
            //}

        }, 
        onNOCrearCotizacion:function(){
            sap.ui.getCore().byId("dlg_MensajeAvisoCrearCotizacion").close();
        },
        onCrearCotizacion: function (oEvent) {
            var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function(){
            var tipoDocumento ={
                                Codigo: "ZO01",
                                }; 
            var numPedido = self.getView().byId("txt_refDocNuevo").getValue();
            //var result = documentosServices.crearDocumento(tipoDocumento.Codigo, numPedido);
            documentosServices.crearDocumento(tipoDocumento.Codigo, numPedido, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            if (result.c === "s") {
                if (result.data.success) {
                    self.initDataDefault(result.data, tipoDocumento.Codigo);
                    sap.ui.getCore().byId("dlg_MensajeAvisoCrearCotizacion").close();
                    self.onDocNuevoMasterProductosAddonDialog();
                        //sap.ui.getCore().byId("dlg_MensajeAviso1").open();
                } else {
                    sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                }
            } else {
                sap.m.MessageToast.show(result.m, {duration: 3000});
            }
            sap.ui.core.BusyIndicator.hide();
        });
},1000);
        },
        ///////End Stock Disponible////////////////////////////////////////////////
        ////Inicio Calcular Peso Total///////////////////////////////////////////////////
        onVolverBuscarMaterial:function(){
            sap.ui.getCore().byId("dlg_listaBuscarMateriales").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscar").open();
        },
        calcularPesoTotal:function(){
         //Inicio Añadiendo el peso total al formulario principal
                    var pesoTotal = 0;
                    for (var i = 0; i < this.getView().getModel().getProperty("/listaMaterial").length; i++) {
                        var pesoNeto = this.getView().getModel().getProperty("/listaMaterial/"+i+"/PesoNeto");
                        pesoTotal = pesoTotal + pesoNeto;
                    }
                        this.getView().getModel().setProperty("/pedido/PesoTotal",pesoTotal);
                        ///Formatear Numeros con decimal//////////////////////////////////////
                        var oFormatOptions = {decimalSeparator : '.', groupingSeparator:',', minFractionDigits: 3, maxFractionDigits: 3};
                        var oFloatFormat = sap.ui.core.format.NumberFormat.getFloatInstance(oFormatOptions);
                        ///////////////////////////////////////////////////////////////////////
                        var pesotFinal = oFloatFormat.format(pesoTotal)+" KG";
                        this.getView().byId("txt_pago_pesoTotal").setValue(pesotFinal);
                        this.sessionStorageDocNuevo();

        },
        ////End Calcular Peso Total///////////////////////////////////////////////////
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
                this.CambioTabFilter();
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
        ////End Seleccionar Item Master Datos///////////////////////////////////////
        /////Inicio MultiSelect////////////////////////////////////
        onMultiSelect:function(oEvent){
            this.btnSelectCerrados(false);
            this.getView().byId("btnSingle").setVisible(true);
            this.getView().byId("listaMasterMateriales").setMode("MultiSelect");
        },

        onSingleSelect:function(oEvent){
            this.btnSelectCerrados(false);
            this.getView().byId("btnMulti").setVisible(true);
            this.getView().byId("listaMasterMateriales").setMode("SingleSelectMaster");
        },
        btnSelectCerrados:function(valor){
            this.getView().byId("btnMulti").setVisible(valor);
            this.getView().byId("btnSingle").setVisible(valor);
        },
        ////End MultiSelect///////////////////////////////////////////
        ////Inicio Seleccionar Todo///////////////////////////////////
        btnSelectAllCerrados:function(valor){
            this.getView().byId("btnSelectAll").setVisible(valor);
            this.getView().byId("btnSelectNothing").setVisible(valor);
        },
        btnSelectAllCerradosPedMulti:function(valor){
            this.getView().byId("btnSelectAllPedMult").setVisible(valor);
            this.getView().byId("btnSelectNothingPedMult").setVisible(valor);
        },
        onSelectAll:function(valor){
            //this.onMultiSelect();
                 var itemSeleccionado = this.getView().byId("listaMasterMateriales").getItems();
                 for (var i = 0; i < itemSeleccionado.length; i++) {
                        this.getView().byId("listaMasterMateriales").setSelectedItem(itemSeleccionado[i],valor);
                        itemSeleccionado[i].setSelected(valor);
                 }
        },
        onSelectAllPedMulti:function(valor){
            //this.onMultiSelect();
                 var itemSeleccionado = this.getView().byId("listaMaterialesPedMulti").getItems();
                 for (var i = 0; i < itemSeleccionado.length; i++) {
                        this.getView().byId("listaMaterialesPedMulti").setSelectedItem(itemSeleccionado[i],valor);
                        itemSeleccionado[i].setSelected(valor);
                 }
        },
        onSeleccionarTodoMaterial:function(){
            this.btnSelectAllCerrados(false);
            this.getView().byId("btnSelectNothing").setVisible(true);
            this.onSelectAll(true);
        },
        onSeleccionarTodoMaterialPedMulti:function(){
            this.btnSelectAllCerradosPedMulti(false);
            this.getView().byId("btnSelectNothingPedMult").setVisible(true);
            this.onSelectAllPedMulti(true);
        },
        onSeleccionarNingunMaterial:function(){
            this.btnSelectAllCerrados(false);
            this.getView().byId("btnSelectAll").setVisible(true);
            this.onSelectAll(false);
        },
        onSeleccionarNingunMaterialPedMulti:function(){
            this.btnSelectAllCerradosPedMulti(false);
            this.getView().byId("btnSelectAllPedMult").setVisible(true);
            this.onSelectAllPedMulti(false);
        },
        ////End Seleccionar Todo//////////////////////////////////////

        ///Inicio Dialog Descuentos//////////////////////////////////////////////////////////////////////////
        ////Inicio onDescuentos////////////////////////////////////////
        onDescuentos:function(){
            /*if(this.getView().byId("listaMasterMateriales").getSelectedItem()){
                var currentItem = this.getView().byId("listaMasterMateriales").getSelectedItems()[0];
                var material = currentItem.getBindingContext().getObject();
                this.getView().getModel().setProperty("/material", material);
                this.getView().getModel().refresh();
                console.log(this.getView().getModel().getProperty("/material"));
                this.getView().byId("tabDetalleProducto").setSelectedKey("filterDescuentos");
                                   this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
            }else{
                MessageToast.show("No se ha seleccionado ningún material");
            }*/
            var matSelected = this.getView().byId("listaMasterMateriales").getSelectedItems();
            window.matSeLecDsctos=0;
            if(matSelected.length>0){
                var path = matSelected[window.matSeLecDsctos].getBindingContext().getPath();
                    var material = this.getView().getModel().getProperty(path);
                    if(matSelected.length==1){
                        if(material.CodMaterialCorto == "20000812"){
                            MessageToast.show("El material "+material.CodMaterialCorto+" no tiene acceso a Dscto.");
                        }else{
                            this.getView().getModel().setProperty("/material",material);
                            this.getView().getModel().setProperty("/material/path",path.substr(15));
                            this.getView().getModel().refresh();
                            sap.ui.getCore().byId("dlg_DialogDocDscto").open();
                        }
                    }else{
                        if(material.CodMaterialCorto == "20000812"){
                            sap.ui.getCore().byId("dlg_DialogDocDscto").open();
                        }else{
                            this.getView().getModel().setProperty("/material",material);
                            this.getView().getModel().setProperty("/material/path",path.substr(15));
                            this.getView().getModel().refresh();
                            sap.ui.getCore().byId("dlg_DialogDocDscto").open();
                        }
                    }
                    
                    
            }else{
                MessageToast.show("No ha Seleccionado ningun Material");
            }
            
        },
        onCanceldlg_DialogDocDscto:function(){
            var matSelected = this.getView().byId("listaMasterMateriales").getSelectedItems();
            
            for (var i = 0; i < matSelected.length; i++) {
                var path = matSelected[i].getBindingContext().getPath();
                var materialMod = this.getView().getModel().getProperty(path);
                try{
                utilString.storeDsctosPrinReserva(this,materialMod.DescuentoPrincipal,path+"/DescuentoPrincipalReserva",materialMod.PosicionCorto);
                utilString.storeDsctosOtrosReserva(this,materialMod.DescuentoOtros,path+"/DescuentoOtrosReserva",materialMod.PosicionCorto);
                }catch(ex){}
            }
            sap.ui.getCore().byId("dlg_DialogDocDscto").close();
        },
        ////End onDescuentos///////////////////////////////////////////
        goPosicioMaterialUp:function(){
            var lisMateriales = this.getView().byId("listaMasterMateriales").getItems();
            var matSelected = this.getView().byId("listaMasterMateriales").getSelectedItems();
            
            window.matSeLecDsctos=window.matSeLecDsctos+1;

            if(window.matSeLecDsctos==matSelected.length){
                window.matSeLecDsctos=matSelected.length-1;
                MessageToast.show("No hay mas Posiciones");
            }
            if(matSelected.length>0){
                    var path = matSelected[window.matSeLecDsctos].getBindingContext().getPath();
                    var material = this.getView().getModel().getProperty(path);
                    if(material.CodMaterialCorto == "20000812"){
                        //this.goPosicioMaterialUp();
                    }else{
                        this.getView().getModel().setProperty("/material",material);
                        this.getView().getModel().setProperty("/material/path",path.substr(15));
                        this.getView().getModel().refresh();
                    }
            }
        },
        goPosicioMaterialDown:function(){
            var lisMateriales = this.getView().byId("listaMasterMateriales").getItems();
            var matSelected = this.getView().byId("listaMasterMateriales").getSelectedItems();
            
            window.matSeLecDsctos=window.matSeLecDsctos-1;
            
            if(window.matSeLecDsctos==-1){
                window.matSeLecDsctos=0;
                MessageToast.show("No hay mas Posiciones");
            }
            if(matSelected.length>0){
                    var path = matSelected[window.matSeLecDsctos].getBindingContext().getPath();
                    var material = this.getView().getModel().getProperty(path);
                    if(material.CodMaterialCorto == "20000812"){
                        //this.goPosicioMaterialDown();
                    }else{
                    this.getView().getModel().setProperty("/material",material);
                    this.getView().getModel().setProperty("/material/path",path.substr(15));
                    this.getView().getModel().refresh();
                    }
            }
        },
        onDsctoOtrosDialog:function(){
            this.getView().byId("idDescuentoPrincipalDialog").bindItems("/material/DescuentoPrincipal", "/material/DescuentoOtros");
        },
        ///End Dialog Descuentos/////////////////////////////////////////////////////////////////////////////
        onCmbTipoProyResi:function(){
            if(window.dataIni.person.CanalDist="10"){
                if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO01" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO02" ){
                    if(this.getView().getModel().getProperty("/preguntas/15/CODR")!="" ){
                        this.getView().getModel().setProperty("/preguntas/20/CODR","");
                    }
                }
            }
        },
        onCmbTipoProyInsti:function(){
            if(window.dataIni.person.CanalDist="10"){
                if(this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO01" ||
                this.getView().getModel().getProperty("/pedido/CodTipoDoc")=="ZO02" ){
                    if(this.getView().getModel().getProperty("/preguntas/20/CODR")!="" ){
                        this.getView().getModel().setProperty("/preguntas/15/CODR","");
                    }
                }
            }
        },
        ////Inicio Centro/Almacen/Lote////////////////////////////////////////
        onCentroAlmacenLote:function(){

            if(this.getView().byId("listaMasterMateriales").getSelectedItem()){
                var currentItem = this.getView().byId("listaMasterMateriales").getSelectedItems()[0];
                var material = currentItem.getBindingContext().getObject();
                this.getView().getModel().setProperty("/material", material);
                this.getView().getModel().refresh();
                this.getView().byId("tabDetalleProducto").setSelectedKey("filterCentroAlmacenLote");
                if(this.getView().getModel().getProperty("/pedido/NumPedido")!="" ){
                    
            var item =  currentItem.getBindingContext().getPath();
                var numb = item.match(/\d/g);
                numb = numb.join("");
                window.posicionListaProductoDetallado=numb;
            this.CambioTabFilterProductos();            
        }else{
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
        }

            
            }else{
                MessageToast.show("No se ha seleccionado ningún material");
            }
        },
        ////End Centro/Almacen/Lote///////////////////////////////////////////

        ////Inicio Asignar Ambiente////////////////////////////////////
        onAsignarAmbiente:function(){
            if(this.getView().byId("listaMasterMateriales").getSelectedItem()){
                sap.ui.getCore().byId("dlg_DocNuevoAsignarAmbiente").open();
            }else{
                MessageToast.show("No se ha seleccionado ningun item");
            }
            
        },
        onAnadirdlg_DocNuevoAsignarAmbiente:function(){
            var items = this.getView().byId("listaMasterMateriales").getSelectedItems();
            for (var i = 0; i < items.length; i++) {
                var item =  items[i].getBindingContext().getPath();
                var numb = item.match(/\d/g);
                numb = numb.join("");

                this.getView().getModel().setProperty("/listaMaterial/"+numb+"/DesGrupoMat",sap.ui.getCore().byId("cmAsignarAmbiente").getSelectedItem().getText() );
                this.getView().getModel().setProperty("/listaMaterial/"+numb+"/CodGrupoMat",sap.ui.getCore().byId("cmAsignarAmbiente").getSelectedKey() );
                this.getView().getModel().setProperty("/listaMaterial/"+numb+"/Ambiente",sap.ui.getCore().byId("cmAsignarAmbiente").getSelectedKey() );
                this.getView().getModel().setProperty("/listaMaterial/"+numb+"/Opcion",sap.ui.getCore().byId("cmAsignarOpcion").getSelectedKey() );
                this.getView().getModel().refresh();
            }
            this.sessionStorageDocNuevo();
            sap.ui.getCore().byId("dlg_DocNuevoAsignarAmbiente").close();
        },
        onCanceldlg_DocNuevoAsignarAmbiente:function(){
            sap.ui.getCore().byId("dlg_DocNuevoAsignarAmbiente").close();
        },
        ////End Asignar Ambiente///////////////////////////////////////
        ////Inicio Cancelar Dialog Buscar Profesional/////////////
        onCancelDlg_DocNuevobuscarProfesional_resultado1:function(){
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional_resultado1").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional1").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional1").open();
        },
        onCancelDlg_DocNuevobuscarProfesional_resultado2:function(){
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional_resultado2").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional2").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional2").open();
        },
        ////End Cancelar Dialog Buscar Profesional/////////////
        ///Inicio Setear DNI DE AG A Datos Adicionales//////
        onInputAgDni:function(){
            var dni = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");
                this.getView().getModel().setProperty("/cliente/Ruc",dni);
                var gg = this.getView().getModel().getProperty("/cliente/Ruc");
                this.getView().getModel().refresh();
                utilString.validarDni(this,"txt_dni_ruc_solicitante",dni);
                this.sessionStorageDocNuevo();
        },
        onInputAgCorreo:function(){
            var correo = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");
            utilString.validarEmail(this,"txt_correo_solicitante",correo);
                this.sessionStorageDocNuevo();
        },
        onInputAgNombre:function(){
            var Descripcion = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Descripcion");
            if(this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length!=11){
                if(Descripcion!="" && Descripcion!=" "){
                var separador = " "; // un espacio en blanco
                var cadena = Descripcion.split(separador);
                var ultimoCadena = cadena.length - 1;
                var acumuladorNombre = "";
                    if(cadena.length >= 4){
                        for (var i = 0; i < cadena.length ; i++) {
                            if(i!=ultimoCadena && i!=ultimoCadena-1){
                                if(i==0){
                                    acumuladorNombre = cadena[i];
                                }else{
                                    acumuladorNombre = acumuladorNombre + separador + cadena[i];
                                }
                            }
                        }
                        this.getView().getModel().setProperty("/cliente/NOMBRE",acumuladorNombre);
                        this.getView().getModel().setProperty("/cliente/APPAT",cadena[ultimoCadena-1]);
                            this.getView().getModel().setProperty("/cliente/APMAT",cadena[ultimoCadena]);
                    }else{
                        if(cadena.length == 1){
                            this.getView().getModel().setProperty("/cliente/NOMBRE",cadena[0]);
                        }
                        if(cadena.length == 2){
                            this.getView().getModel().setProperty("/cliente/NOMBRE",cadena[0]);
                            this.getView().getModel().setProperty("/cliente/APPAT",cadena[ultimoCadena]);
                        }
                        if(cadena.length == 3){
                            this.getView().getModel().setProperty("/cliente/NOMBRE",cadena[0]);
                            this.getView().getModel().setProperty("/cliente/APPAT",cadena[ultimoCadena-1]);
                            this.getView().getModel().setProperty("/cliente/APMAT",cadena[ultimoCadena]);
                        }
                    }
                    this.getView().getModel().refresh();
                    this.sessionStorageDocNuevo();
                }
            }
            },
        ///End Setear DNI DE AG A Datos Adicionales//////
        
        ///Inicio Buscar Material Caracteristicas//////////////////////////
        onSeleccionarCategoria: function () {
            var categoria = sap.ui.getCore().byId("comboCategoria").getSelectedKey();
            if(categoria!=" " ){
                var linea = window.dataIni.lstLinea;
                var itemLleno = [{
                    Codigo:"",
                    Descripcion:""
                }];
                console.log(categoria);
                for (var i = 0; i < linea.length; i++) {
                    var item = linea[i];
                    var itemcod = item.Codigo;
                    if (itemcod.substring(0, 2) === categoria) {
                        itemLleno.push(item);
                    }
                }
                this.getView().getModel().setProperty("/listaLinea", itemLleno);
                this.getView().getModel().refresh();
            }else{
                this.getView().getModel().setProperty("/listacaract", null);
                this.getView().getModel().setProperty("/listaLinea", null);
                this.getView().getModel().setProperty("/listaMarca", null);
                this.getView().getModel().refresh();
                var itemLleno = [{
                Codigo:"",
                Descripcion:""
            }];
                this.getView().getModel().setProperty("/listaLinea", itemLleno);
                this.getView().getModel().setProperty("/listaMarca", itemLleno);
                this.getView().getModel().refresh();
            }
        },
        onSeleccionarLinea: function () {
            var linea = sap.ui.getCore().byId("comboLinea").getSelectedKey();
            var marca = window.dataIni.lstMarca;
            var itemLleno = [{
                Codigo:"",
                Descripcion:""
            }];
            for (var i = 0; i < marca.length; i++) {
                var item = marca[i];
                var itemcod = item.Codigo;
                if (itemcod.substring(0, 5) === linea) {
                    itemLleno.push(item);
                    console.log(item);
                }
            }
            
            this.getView().getModel().setProperty("/listaMarca", itemLleno);
            this.getView().getModel().refresh();
        },
        
        //Dialog Aviso General
        //ID DIALOG  sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
        //ID TEXT  this.getView().byId("txt_aviso_general").setText(abc);
        onOkDlg_MensajeAvisoGeneral: function () {
            sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").close();
            if(window.isDocModificarFin){
                 var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                    utilString.destruirFragments(self);
                    sap.ui.core.BusyIndicator.show(0);
                    window.IsDocNuevo = false;
                    window.IsDocModificar = false;
                    window.isDocModificarFin = false;
                    sessionStorage.clear();
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appHome");
                    sap.ui.core.BusyIndicator.hide();
                }, 200);
            }
        },
        onSeleccionarCaracteristicas: function (oEvent) {
            var codigo = sap.ui.getCore().byId("txt_codigo_material_busqueda").getValue();
            var codigoAntiguo = sap.ui.getCore().byId("txt_codigoAntiguo_material_busqueda").getValue();
            var descripcionMaterial = sap.ui.getCore().byId("txt_descripcionMaterial_material_busqueda").getValue();
            var categoria = sap.ui.getCore().byId("comboCategoria").getSelectedKey();
            var linea = sap.ui.getCore().byId("comboLinea").getSelectedKey();
            var marca = sap.ui.getCore().byId("comboMarca").getSelectedKey();
            var buscarCaract = 1 ;
           
            if(this.getView().getModel().getProperty("/listacaract")){
                this.getView().getModel().setProperty("/listacaract",null);
            }
            var self = this;
             //var result = documentosServices.buscarCaracteristicas(codigo, codigoAntiguo, descripcionMaterial, categoria, linea, marca, buscarCaract);
            documentosServices.buscarCaracteristicas(codigo, codigoAntiguo, descripcionMaterial, categoria, linea, marca, buscarCaract, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            if (result.c === "s") {
                if (result.data.success) {
                                        if(categoria!=""){
                                        
                                            if(result.data.lstCaract.length == 0){
                                                    MessageToast.show(result.data.errors.reason);
                                            }else{
                                                self.getView().getModel().setProperty("/listacaract",result.data.lstCaract);
                                                var listaCaracteristica = self.getView().getModel().getProperty("/listacaract");


                                                self.getView().getModel().refresh();  

                                                var contenedor = sap.ui.getCore().byId("formDinamico");
                                                contenedor.destroyFormContainers();
                                                    for (var i = 0; i < result.data.lstCaract.length; i++) {
                                                        self.getView().getModel().setProperty("/listacaract/"+i+"/selectCodigo","");
                                                        self.getView().getModel().refresh();  
                                                        var elementId = "element" + (i + 1);
                                                        var selectId = "select" + (i + 1);
                                                            var formContainer = new sap.ui.layout.form.FormContainer({
                                                                formElements: [new sap.ui.layout.form.FormElement({elementId,
                                                                    label: result.data.lstCaract[i].txtPre,
                                                                    fields: [new sap.m.Select({selectId,
                                                                        selectedKey: "{/listacaract/"+i+"/selectCodigo}",
                                                                        items: {
                                                                        path: "/listacaract/"+i+"/listaResp",
                                                                        template: new sap.ui.core.Item({
                                                                            key:"{Codigo}",
                                                                        text: "{Descripcion}"
                                                                        })
                                                                    },
                                                                    })]
                                                                })]
                                                            })
                                                        contenedor.addFormContainer(formContainer);
                                                    }
                                                    self.getView().getModel().refresh();  
                                                     sap.ui.getCore().byId("dlg_docCaracteristica").open();
                                            }
                                        }
                            
                } else {
                    if(categoria==" "){
                           MessageToast.show("Seleccione Categoría");     
                    }else{
                        sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                    }
                }
            } else {
                sap.m.MessageToast.show(result.m, {duration: 3000});
            } 
            sap.ui.core.BusyIndicator.hide();
        });
        },
        ///End Buscar Material Caracteristicas//////////////////////////
        //Inicio Stock Disponible desde Buscar Materiales //////////////////////
        onDocNuevoBuscarStock:function(){
            if(sap.ui.getCore().byId("lista_BuscarMaterial").getSelectedItem()){
                var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                var material = sap.ui.getCore().byId("lista_BuscarMaterial").getSelectedItem().getBindingContext().getObject();
                var codigoMaterial = material.CodMaterialCorto;
                var dsctoLotes = 0;
                 //var result = materialServices.buscarStockMaterial(codigoMaterial, dsctoLotes);
                 materialServices.buscarStockMaterial(codigoMaterial, dsctoLotes, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                if (result.c === "s") {
                    if (result.data.success) {
                        self.getView().getModel().setProperty("/tituloStock",result.data.textoStock);
                        
                    sap.ui.getCore().byId("dlg_DocNuevobuscar").close();
                    sap.ui.getCore().byId("dlg_listaBuscarMateriales").close();

                        self.getView().getModel().setProperty("/listaStockMaterial",result.data.lstStock);
                        sap.ui.getCore().byId("dlg_stockDisponibleOnDialog").open();
                    } else {
                        sap.m.MessageToast.show(result.data.errors.reason, {
                            duration: 3000
                        });
                    }

                } else {
                    sap.m.MessageToast.show(result.m, {
                        duration: 3000
                    });
                }
                sap.ui.core.BusyIndicator.hide();
            });
                    }, 1000);
        }else{
            MessageToast.show("Seleccione un Material");
        }
        },
        onVolverListaMateriales:function(){
            this.getView().getModel().setProperty("/listaStockMaterial",null);
            sap.ui.getCore().byId("dlg_stockDisponibleOnDialog").close();
        },
        
        //End Stock Disponible desde Buscar Materiales //////////////////////
        //Inicio Imprimir Doc////////////////////////////
        onImprimirDoc:function(){
            
            window.numeroDocumento= this.getView().getModel().getProperty("/NumeroDocumentoReferencia");
            if(window.numeroDocumento!=""){
                if(window.numeroDocumento!=undefined){
                    if(utilString.isNumeric(window.numeroDocumento)){
            var self = this;
            var busyDialog = new sap.m.BusyDialog({customIconHeight : "32px",customIconWidth :"32px"});
busyDialog.open();
setTimeout(function () {
                window.imprimirDoc = true;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appHome");
                busyDialog.close();
                    }, 200);
                    }else{
                        MessageToast.show("Ingrese un Número, no letras ni símbolos");
                    }
                }else{
                    MessageToast.show("Ingrese un Número");
                }
            }else{
                MessageToast.show("Ingrese un Número");
            }
        },
        //End Imprimir Doc///////////////////////////////
        ///////End Roy/////////////////////////////////////////////////////////////////

  /***************************Plan de Facturacion *****************************/
        onSeleccionarPlanFacturacion: function (evt) {           
            var facturacion = evt.getSource().getSelectedItem().getBindingContext().getObject();  
            var facturacionDet = jQuery.extend({}, facturacion);
            this.getView().getModel().setProperty("/facturacion", facturacionDet);            
            sap.ui.getCore().byId("dlg_DocNuevoaddPlanFacturacion").open();
        },
        onDocPlanFactuacionAdd: function(evt) {
            var porcPlan = 0;
            var planFacturacion = this.getView().getModel().getProperty("/planFacturacion");
            var facturacionDet = this.getView().getModel().getProperty("/facturacion");
            var subTotal = this.getView().getModel().getProperty("/pedido/SubTotal").replace(",", "");
            var subTotalN = parseFloat(subTotal==""?"0":subTotal);//(utilString.isNumeric(subTotal)) ? subTotal : parseFloat(subTotal);

            for(var indice in planFacturacion) {
                var facturacion = planFacturacion[indice];
                if(facturacion.TAXK1 != 'D') {  
                    if (facturacionDet.FPLTR == facturacion.FPLTR) {
                        facturacion.FPROZ = facturacionDet.FPROZ;
                    }  
                    porcPlan = porcPlan + parseFloat(facturacion.FPROZ);
                }
            }
            if(facturacionDet.path != null) {
                porcPlan = porcPlan - parseFloat(facturacionDet.FPROZ);
            }
            if (facturacionDet.FPROZ <= (100 - porcPlan) || (100 - porcPlan) == 0) {  
                var nuevoValor = (facturacionDet.FPROZ / 100) * subTotalN;
                nuevoValor = utilString.roundNumber(nuevoValor, 2);
                facturacionDet.FAKWR =  nuevoValor;

                if(facturacionDet.path == null) {
                    planFacturacion.push(facturacionDet)
                } else {
                    planFacturacion[facturacionDet.path] = facturacionDet;
                }
                this.getView().getModel().setProperty("/planFacturacion", planFacturacion);    
                sap.ui.getCore().byId("dlg_DocNuevoaddPlanFacturacion").close()
            } else {
                sap.m.MessageToast.show("El porcentaje ingresado supera al máximo permitido: " + (100 - porcPlan), {duration: 3000});                
            }      
        },        
        onDocPlanFactuacionClose: function(evt) {
            sap.ui.getCore().byId("dlg_DocNuevoaddPlanFacturacion").close()
        },
        onAgregarPlanFacturacionDet: function(evt) {
            try{
            var planFacturacion = this.getView().getModel().getProperty("/planFacturacion");
            var subTotal = utilString.verificarTipoVariable(this.getView().getModel().getProperty("/pedido/SubTotal")) == "string" ?  this.getView().getModel().getProperty("/pedido/SubTotal").replace(",", "") : this.getView().getModel().getProperty("/pedido/SubTotal");
            var subTotalN = parseFloat(subTotal==""?"0":subTotal);//(utilString.isNumeric(subTotal)) ? subTotal : parseFloat(subTotal);
            var fechaHoy = new Date();                                      
            var fechaHoyString = moment(fechaHoy.getTime()).format('DD/MM/YYYY');                    
            var storeCount = (jQuery.isEmptyObject(planFacturacion)) ? 1 : planFacturacion.length;
            var pos = utilString.padLeft((storeCount + 1), 6);
            var porcPlan = 0;
            for(var indice in planFacturacion) {
                porcPlan = porcPlan + parseFloat(planFacturacion[indice].FPROZ);
            }
            var newPorcPlan = 100 - porcPlan;
            var subTotalPlan = subTotalN * (newPorcPlan/100);
            var facturacionDet = {
                    "AFDAT": fechaHoyString,"BONBA": 0,"CCACT": "","CMPRE": 0,"CMPRE_FLT": 0,"FAKCA": "","FAKSP": "02",
                    "FAKWR": subTotalPlan,"FAREG": "1","FKARV": "ZFAC","FKDAT": fechaHoyString,"FKSAF": "A","FPFIX": "","FPLAE": "",
                    "FPLNR": "","FPLTR": pos,"FPROZ": newPorcPlan,"FPTTP": "","KORTE": "","KUNRG": "","KURFP": 0,
                    "KURRF": 0,"KZWI1": 0,"KZWI2": 0,"KZWI3": 0,"KZWI4": 0,"KZWI5": 0,"KZWI6": 0,
                    "MLBEZ": "","MLSTN": "000000000000","NETPR": 0,"NETWR": 0,"NFDAT": null,"OFKDAT": null,"PERIO": "",
                    "PRSOK": "","SKFBP": 0,"TAXK1": "I","TAXK2": "","TAXK3": "","TAXK4": "","TAXK5": "",
                    "TAXK6": "","TAXK7": "","TAXK8": "","TAXK9": "","TEMAN": "","TETXT": "","TYPZM": "",
                    "UELNR": "","UELTR": "","VALDT": null,"VALTG": "","WAERS": "PEN","WAVWR": 0,
                    "ZTERM": ""};                      
            this.getView().getModel().setProperty("/facturacion", facturacionDet);            
            sap.ui.getCore().byId("dlg_DocNuevoaddPlanFacturacion").open(); 
            }catch(ex){MessageToast.show(ex);}           
        },
        onEditarPlanFacturacionDet: function(evt) {
            try{
            var contexts = this.getView().byId("idPlanFacturacion").getSelectedContexts();
             if(contexts == ""){
                 sap.m.MessageToast.show("Seleccione un registro a editar.");
             } else {
                var path = this.getView().byId("idPlanFacturacion").getSelectedItem().getBindingContext().getPath();
                var indice = path.substring((path.lastIndexOf("/") + 1),path.length);
                var indiceEdit = (indice != "") ? parseInt(indice) : -1;                
                var facturacion = this.getView().byId("idPlanFacturacion").getSelectedItem().getBindingContext().getObject();
                var facturacionDet = jQuery.extend({}, facturacion);
                facturacionDet.path = indiceEdit;                
                this.getView().getModel().setProperty("/facturacion", facturacionDet); 
                this.getView().getModel().refresh();  
                sap.ui.getCore().byId("dlg_DocNuevoaddPlanFacturacion").open(); 
             }  
             }catch(ex){MessageToast.show(ex);}          
        },
        onBorrarPlanFacturacionDet: function(evt) {
            var contexts = this.getView().byId("idPlanFacturacion").getSelectedContexts();
             if(contexts == ""){
                 sap.m.MessageToast.show("Please Select a row to Delete");
             } else {
                var path = this.getView().byId("idPlanFacturacion").getSelectedItem().getBindingContext().getPath();
                var indice = path.substring((path.lastIndexOf("/") + 1),path.length);
                var indiceDelete = (indice != "") ? parseInt(indice) : -1;
                var listPanelFacturacion = this.getView().getModel().getProperty("/planFacturacion");

                listPanelFacturacion.splice(indiceDelete, 1);
                this.getView().getModel().setProperty("/planFacturacion", listPanelFacturacion);
                this.getView().getModel().refresh(); 
             }
        },        
        /***************************Plan de Facturacion *****************************/                


        onImagenListaProductos:function(){
        },

        onChangeFecNac:function(){
            this.getView().getModel().setProperty("/cliente/EDAD", utilString.calcularEdad(this.getView().getModel().getProperty("/cliente/FECNAC")) ); 
            if(utilString.calcularEdad(this.getView().getModel().getProperty("/cliente/FECNAC"))>=0 && utilString.calcularEdad(this.getView().getModel().getProperty("/cliente/FECNAC"))<=30){
            this.getView().getModel().setProperty("/cliente/RANGOED","0");
            }
            if(utilString.calcularEdad(this.getView().getModel().getProperty("/cliente/FECNAC"))>=31 && utilString.calcularEdad(this.getView().getModel().getProperty("/cliente/FECNAC"))<=49){
            this.getView().getModel().setProperty("/cliente/RANGOED","1");
            }
            if(utilString.calcularEdad(this.getView().getModel().getProperty("/cliente/FECNAC"))>=50){
            this.getView().getModel().setProperty("/cliente/RANGOED","2");
            }
            this.sessionStorageDocNuevo();
        },
        





        /*******Inicio Codigo QR********/
        onUpload:function(){
            var oImageUploader = this.getView().byId("fileUploader");


            oImageUploader.attachBrowserEvent("change", function(oEvent){
                var reader = new FileReader();
                reader.onload = function(oEvent){
                    imageData = oEvent.target.result;
                    fileType = files[0].type;
                    document.getElementById("qr-code").src = oEvent.target.result;
                }
            });

        },

        handleValueChange: function() {
            var self = this;
                var oFileUploader = self.getView().byId("fileUploader");
            if (!oFileUploader.getValue()) {
                MessageToast.show("Escoger una Imagen QR");
                return;
            }
            oFileUploader.upload();
            oFileUploader.attachBrowserEvent("change", function(oEventGeneral){
                var campo = true;
                //var fileName = files[0].name.substr(files[0].name.indexOf('.')+1, files[0].name.length);
                //if(fileName == "png"){
                    var reader = new FileReader();
                while(campo){
                    reader.onload = function(oEvent){
                            //imageData = oEvent.target.result;
                            //fileType = files[0].type;
                            document.getElementById("qr-code").src = oEvent.target.result;
                            if(oEvent.target.result!=""){
                                campo=false;
                                  qrcode.decode(oEvent.target.result);
                                  //self.getView().byId("txt_codigo_anadir_material").setValue(qrcode.result);
                            }
                        };
                            reader.readAsDataURL(oEventGeneral.target.files.item(0));
                            oFileUploader.upload();
                    
                //}
                }
                
                        
                            });
            
        },
        handleUploadComplete:function(){
            var img = document.querySelector('img');
              qrcode.decode(img.src);
              if (utilString.isNumeric(qrcode.result)) {
                    sap.ui.getCore().byId("txt_codigo_anadir_material").setValue(qrcode.result);
                }else{
                    sap.ui.getCore().byId("txt_codigo_anadir_material").setValue("");
                    MessageToast.show("No es un número, ingresar otro Código");
                }
                var oFileUploader = this.getView().byId("fileUploader");
                oFileUploader.setValue("");
                //this.handleValueChange();
        },

        /*******End Codigo QR********/


        /****04-12-2017*****************************************/
        tabDetailDefault:function(){
            this.getView().byId("tabCliente").setSelectedKey("filterPago");
            this.getView().byId("tabInterlocutores").setSelectedKey("filterSolicitante");
            //this.getView().byId("tabObservaciones").setSelectedKey("filterAtencion");

            this.getView().byId("SplitAppId").setMode("ShowHideMode");
            this.getView().byId("SplitAppId").setMode("HideMode");

        },
        /*******************************************************/






onSeleccionarGrupoForecast: function(){
            ////////Inicio Canal 30//////////////////////////////////////////////////////////////
            var grupo_for = this.getView().getModel().getProperty("/pedido/GrupoForecast");
                            if(window.dataIni.person.CanalDist=='30'){
                                if(grupo_for=="06"){ //Residencial Multifamiliar
                                    var tipoFore = window.lstTipoForOriginal;
                                    var tipoForeFormateado = tipoFore.filter(function(el) {
                                         return el.Codigo == "00" || el.Codigo == " ";
                                    });
                                    this.getView().getModel().setProperty("/lstTipoFor", tipoForeFormateado);
                                    this.getView().getModel().setProperty("/GrupoForeAction",true);
                                    this.getView().getModel().setProperty("/TipoForeAction",true);
                                }

                                else if(grupo_for=="08"){ //Arquitecto
                                    var tipoFore = window.lstTipoForOriginal;
                                    var tipoForeFormateado = tipoFore.filter(function(el) {
                                         return el.Codigo == " " || el.Codigo == "11";
                                    });
                                    this.getView().getModel().setProperty("/lstTipoFor", tipoForeFormateado);
                                    var dd = this.getView().getModel().getProperty("/pedido/TipoForecast");
                                    this.getView().getModel().setProperty("/GrupoForeAction",true);
                                    this.getView().getModel().setProperty("/TipoForeAction",true);
                                }
                                else{
                                    var tipoFore = window.lstTipoForOriginal;
                                    var tipoForeFormateado = tipoFore.filter(function(el) {
                                         return el.Codigo != "00" && el.Codigo != "11";
                                    });
                                    this.getView().getModel().setProperty("/lstTipoFor", tipoForeFormateado);
                                    this.getView().getModel().setProperty("/GrupoForeAction",true);
                                    this.getView().getModel().setProperty("/TipoForeAction",true);
                                }

                            }
                            this.getView().getModel().refresh();
                            ////////End Canal 30//////////////////////////////////////////////////////////////
        },

        onGenPedidoDlg_DialogDocModificar: function () {
            window.IsDocNuevo = true;
            window.converPedido = true;
            this.getView().getModel().refresh();
            if(this.getView().getModel().getProperty("/NumeroDocumentoReferencia")!="" && this.getView().getModel().getProperty("/NumeroDocumentoReferencia")!=undefined){
                window.numeroDocumento = this.getView().getModel().getProperty("/NumeroDocumentoReferencia");
                var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                    utilString.destruirFragments(self);
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocNuevo");
                    sap.ui.core.BusyIndicator.hide();
                }, 100);
            }else{
                MessageToast.show("No hay un número de referencia para generar Pedido.")
            }
        },
        cambiarTipoDespachoMasivo:function(){
            var tipoDesp = this.getView().byId("com_tipoDespacho_datosDocumento").getSelectedKey();
            for (var i = 0; i < this.getView().getModel().getProperty("/listaMaterial").length; i++) {
                this.getView().getModel().setProperty("/listaMaterial/"+i+"/PrioridadEntrega",tipoDesp);
            }
        },
        cambiarFecRepartoMasivo:function(){
            var self=this;
            ////Inicio Fecha Repartos/////////////////////////////////////////////////////////////////////////////////// {
                var fecPedido=self.getView().getModel().getProperty("/pedido/FechaPedido");
                var fechaPedidoCalculado = self.getView().getModel().getProperty("/pedido/FechaReparto"); 
                if(self.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z001" || self.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z003" || self.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){ 
                    for (var i = 0; i < self.getView().getModel().getProperty("/listaMaterial").length; i++) {
                        self.onObtenerFechaReparto(fechaPedidoCalculado,i);
                    }
                    sap.ui.getCore().byId("txt_aviso_general").setText("FALTA RECALCULAR para actualizar la fecha de despacho.");
                    sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open(); 
                }
                /*if(self.getView().getModel().getProperty("/pedido/CodTipoDoc")=="Z034"){ 
                    for (var j = 0; j < self.getView().getModel().getProperty("/listaMaterial").length; j++) {
                        self.onObtenerFechaRepartoZ034(fechaPedidoCalculado,j);
                    }
                }*/
                ////End Fecha Repartos/////////////////////////////////////////////////////////////////////////////////// 
        },
        ///Inicio Mejora Pedidos Multiples 15-01-2017///////////////////////////////////////////
        copiarDocumentoPedidosMultiples:function(tipoDocPedMul){
            var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
            var referencia = self.getView().getModel().getProperty("/NumeroDocumentoReferencia");
            //var result = documentosServices.visualizarDocumento(tipoDoc.Codigo,accion, referencia);
            documentosServices.visualizarPedMultiples(tipoDocPedMul.codigo,"copiar", referencia, "pedmult",function(result) {
                sap.ui.core.BusyIndicator.show(0);
                try{
                    result.data.success;
                }catch(ex){
                    sap.ui.core.BusyIndicator.hide();
                }
            if (result.data.success) {
                self.getView().getModel().setProperty("/listaMaterialPedMulti",result.data.lstDetalle);
                self.getView().getModel().setProperty("/listaMaterialPedMulti/tipoDocumento",tipoDocPedMul);
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").close();
                sap.ui.getCore().byId("dlg_DialogListaMaterialesPedidosMultiples").open();
                self.sessionStorageDocNuevo();                
            } else {
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").close();
                sap.ui.getCore().byId("dlg_DialogDocModificar").open();
                sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
            }            
            sap.ui.core.BusyIndicator.hide();
            });
            
                    }, 1000);
        },
        onGenPedidoMultiplesDlg_DialogDocModificar:function(){
            if(this.getView().getModel().getProperty("/NumeroDocumentoReferencia")!=""){
                sap.ui.getCore().byId("dlg_DialogDocModificar").close();
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").open();
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").close();
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").open();
            }else{
                MessageToast.show("No ha ingresado Número Doc.")
            }
        },
        onCloseGenPedidoMultiplesDlg_DialogDocModificar:function(){
            sap.ui.getCore().byId("dlg_DialogPedidosMultiples").close();
            sap.ui.getCore().byId("dlg_DialogDocModificar").open();
        },
        /*onCopiarDataActualPedMulti:function(){
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
                self.getView().getModel().setProperty("/listaMaterialPedMulti",JSON.parse((sessionStorage.dataDetallesDocPedMult==undefined)? "":sessionStorage.dataDetallesDocPedMult));
                
                self.sessionStorageDocNuevo();
                sap.ui.core.BusyIndicator.hide();
                }, 200);
        },*/
        onListaMaterialesPedidosMultiples:function(oEvent){
            var item =  oEvent.getSource().getBindingContext().getPath();
            utilString.cambiarSelectedsLista(this,"listaMaterialesPedMulti",false);
            
            var tipoPedido = oEvent.getSource().getBindingContext().getObject();
            var firstItem = sap.ui.getCore().byId("listaPedidosMultiples").getItems()[1]; //ponerlo 19 en la posicion Z001
                            sap.ui.getCore().byId("listaPedidosMultiples").setSelectedItem(firstItem,true);
                            sap.ui.getCore().byId("listaPedidosMultiples").setSelectedItem(firstItem,false);
            /*if(this.getView().getModel().getProperty("/listaMaterialPedMulti")==null){
                this.copiarDocumentoPedidosMultiples(tipoPedido);

            }else if(this.getView().getModel().getProperty("/listaMaterialPedMulti").length==0){*/
                this.copiarDocumentoPedidosMultiples(tipoPedido);
                //sap.ui.getCore().byId("dlg_DialogListaMaterialesPedidosMultiples").open();
            /*}else{
                this.onCopiarDataActualPedMulti();
                sap.ui.getCore().byId("dlg_DialogListaMaterialesPedidosMultiples").open();
            }*/
            
        },
        onCloseListaMaterialesPedidosMultiples:function(){
            sap.ui.getCore().byId("dlg_DialogListaMaterialesPedidosMultiples").close();
            sap.ui.getCore().byId("dlg_DialogPedidosMultiples").open();
            ///Todos los Paths Seleccionados en la lista////////////
            utilString.cambiarSelectedsLista(this,"listaMaterialesPedMulti",false);
            /*this.btnSelectAllCerradosPedMulti(false);
            this.getView().byId("btnSelectAllPedMult").setVisible(true);*/
        },
        crearMaterialesPedMultiple: function() {
            var tipoDocPedMul = this.getView().getModel().getProperty("/listaMaterialPedMulti/tipoDocumento");
            var listaMateriales = new Array();
            var materiales = this.getView().getModel().getProperty("/listaMaterialPedMultiSelected");
            console.log(materiales);

            for(var indice in materiales) {
                var material = new Object();
                material.Posicion= materiales[indice].Posicion ;
                material.CodMaterial= materiales[indice].CodMaterialCorto ;
                material.Cantidad= materiales[indice].Cantidad ;
                if(tipoDocPedMul.codigo=="Z034"){
                    material.Fecha = utilString.fechaTodoJunto(materiales[indice].fechaTransito,"/");
                }
                listaMateriales.push(material);
            }
            console.log("listaMaterialPedMulti//////////////////////////////////////");
            console.log(materiales);
            return listaMateriales;

        },
      _getDialog : function () {
         if (!this._oDialog) {
            this._oDialog = sap.ui.xmlfragment("pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoPedMultiple");
            this.getView().addDependent(this._oDialog);
         }
         return this._oDialog;
      },
      onOpenDialog : function () {
         this._getDialog().open();
      },
      onpress:function(){
        this._getDialog().close();
      },
        crearDialogAvisoPedMult: function(data) {  
            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({ text: data }),
                beginButton: new Button({
                    text: 'OK',
                    type: 'Accept',
                    press: function () {  
                        dialog.destroy();
                        if(window.pedMultAviso){
                        sap.ui.getCore().byId("dlg_DialogListaMaterialesPedidosMultiples").close();
                        sap.ui.getCore().byId("dlg_DialogPedidosMultiples").open();
                var path =  sap.ui.getCore().byId("listaMaterialesPedMulti")._aSelectedPaths;
                utilString.cambiarSelectedsLista(this,"listaMaterialesPedMulti",false);
            }
                    }.bind(this)
                }),
                afterClose: function() {
                    dialog.destroy();
                }.bind(this)
            });

            dialog.open();
        },
        onGenerarPedidoMultiple:function(){
            var matSelected = sap.ui.getCore().byId("listaMaterialesPedMulti").getSelectedItems();
            var matGenerar = [];
            if(matSelected.length>0){
            for (var i = 0; i < matSelected.length; i++) 
                {
                  var item = matSelected[i];
                  var context = item.getBindingContext();
                  var path = context.getPath(); 
                  //Obtener Material////
                  var material = this.getView().getModel().getProperty(path);
                  var indicador = "";
                  for (var j = 0; j < matSelected.length; j++) {
                      var itemSelec = matSelected[j];
                      var contextSelec = itemSelec.getBindingContext();
                      var pathSelec = contextSelec.getPath(); 
                      var materialSelec = this.getView().getModel().getProperty(pathSelec);
                      if(materialSelec.Posicion ==material.PosSup){
                        indicador = "x";
                      }
                  }
                  if(indicador!="x"){
                      if(material.PosSup!="" && material.PosSup!="000000"){
                        return this.crearDialogAvisoPedMult("El material: "+material.CodMaterialCorto+" de Pos. "+material.Posicion+" tiene como componente principal a "+material.PosSup+", seleccionarlo tambien.");
                      }
                  }
                  material.path = path;
                  matGenerar.push(material);
                  /////////////////////
                }
                this.getView().getModel().setProperty("/listaMaterialPedMultiSelected",matGenerar);
                var lstMateriales = JSON.stringify(this.crearMaterialesPedMultiple());
                
            var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
            var tipoDocPedMul = self.getView().getModel().getProperty("/listaMaterialPedMulti/tipoDocumento");
            var referencia = self.getView().getModel().getProperty("/NumeroDocumentoReferencia");

            //var result = documentosServices.visualizarDocumento(tipoDoc.Codigo,accion, referencia);
            var detMatPedMult = self.getView().getModel().getProperty("/listaMaterialPedMulti");
            documentosServices.crearPedMultiple(referencia, tipoDocPedMul.codigo,lstMateriales,"pedmult",function(result) {
                sap.ui.core.BusyIndicator.show(0);
                try{
                    result.data.success;
                }catch(ex){
                    sap.ui.core.BusyIndicator.hide();
                }
            if (result.data.success) {
                
                
                var numped = parseInt(result.data.numPedido); 
                    if(tipoDocPedMul.codigo=="Z001"){
                    var modelListPedMul = self.getView().getModel().getProperty("/listaPedidosMultiples/0/numPedido");
                        if(modelListPedMul==""){
                            self.getView().getModel().setProperty("/listaPedidosMultiples/0/numPedido",numped);
                        }else{
                            self.getView().getModel().setProperty("/listaPedidosMultiples/0/numPedido",modelListPedMul+", "+numped);
                        }
                    }
                    if(tipoDocPedMul.codigo=="Z034"){
                        var modelListPedMul = self.getView().getModel().getProperty("/listaPedidosMultiples/1/numPedido");
                        if(modelListPedMul==""){
                            self.getView().getModel().setProperty("/listaPedidosMultiples/1/numPedido",numped);
                        }else{
                            self.getView().getModel().setProperty("/listaPedidosMultiples/1/numPedido",modelListPedMul+", "+numped);
                        }
                    }
                    if(tipoDocPedMul.codigo=="Z004"){
                        var modelListPedMul = self.getView().getModel().getProperty("/listaPedidosMultiples/2/numPedido");
                        if(modelListPedMul==""){
                            self.getView().getModel().setProperty("/listaPedidosMultiples/2/numPedido",numped);
                        }else{
                            self.getView().getModel().setProperty("/listaPedidosMultiples/2/numPedido",modelListPedMul+", "+numped);
                        }
                    }
                    window.pedMultAviso=true;
                    self.crearDialogAvisoPedMult(result.data.errors.reason);
                    sap.ui.getCore().byId("txt_aviso_pedMultiple").setText(result.data.errors.reason);
                    //self.onOpenDialog();
                    //sap.ui.getCore().byId("dlg_MensajeAvisoPedMultiple").open();
                               
            } else {
                self.crearDialogAvisoPedMult(result.data.errors.reason);
                    //sap.ui.getCore().byId("dlg_MensajeAvisoPedMultiple").open();
                window.pedMultAviso=false;
                sap.ui.getCore().byId("txt_aviso_pedMultiple").setText(result.data.errors.reason); 
            }            
            sap.ui.core.BusyIndicator.hide();
            });
            
                    }, 1000);
                }else{
                    MessageToast.show("No ha seleccionado ningun material");
                }
        },
        onOkDlg_MensajeAvisoPedMultiple:function(){
            if(window.pedMultAviso){
                sap.ui.getCore().byId("dlg_MensajeAvisoPedMultiple").close();
                sap.ui.getCore().byId("dlg_DialogListaMaterialesPedidosMultiples").close();
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").open();
                var path =  sap.ui.getCore().byId("listaMaterialesPedMulti")._aSelectedPaths;
                utilString.cambiarSelectedsLista(this, path,"listaMaterialesPedMulti",false);
            }else{
                sap.ui.getCore().byId("dlg_MensajeAvisoPedMultiple").close();
            }
        },
        onMatPedMult:function(oEvent){
            if(this.getView().getModel().getProperty("/listaMaterialPedMulti/tipoDocumento/codigo")=="Z034"){
        var indexLast = oEvent.getSource()._aSelectedPaths.length-1;
        var matSelected = oEvent.getSource()._aSelectedPaths[indexLast];
        var codMaterial = this.getView().getModel().getProperty(matSelected+"/CodMaterialCorto");            
        var isSelect = oEvent.mParameters.selected;
        if(isSelect){
            var self = this;
        sap.ui.core.BusyIndicator.show(0); 
setTimeout(function () {
                    
                var lfdat_inicio = utilString.generarFechaActual();
                var lfdat_fin = utilString.generarFechaPosterior();
                var OfVentas = window.dataIni.person.OfVentas;
                //var result = stockServices.stockporLlegar(matnr,lfdat_inicio,lfdat_fin,OfVentas); 
                stockServices.stockporLlegar(codMaterial,lfdat_inicio,lfdat_fin,OfVentas, function(result) { 
                sap.ui.core.BusyIndicator.show(0); 
                if (result.c === "s") {
                                if (result.data.success) {
                                    var fechaTransitoProxima = utilString.fechaMasProxima(result.data.lstStockCurso,"LFDAT","-");
                                    self.getView().getModel().setProperty(matSelected+"/fechaTransito",fechaTransitoProxima);
                                }else{
                                    var posicionMat = parseInt(matSelected.substr(23));
                                    var lastItem = sap.ui.getCore().byId("listaMaterialesPedMulti").getItems()[posicionMat]; //ponerlo 19 en la posicion Z001
                                    sap.ui.getCore().byId("listaMaterialesPedMulti").setSelectedItem(lastItem,false);
                                    MessageToast.show("El Material no tiene tránsito");//result.data.errors.reason+
                                }
                            } else {
                                sap.m.MessageToast.show(result.m, {
                                    duration: 3000
                                });
                            }
                            console.log(result.data);
                            sap.ui.core.BusyIndicator.hide(); 
                        });
                    }, 1000);
            }
        }
        },
        ///End Mejora Pedidos Multiples 15-01-2017//////////////////////////////////////////////

        onEliminarProfesional1:function(){
            this.getView().getModel().setProperty("/interlocutores/Z2/Persona/CodPersona","");
            this.getView().getModel().setProperty("/interlocutores/Z2/Persona/Descripcion","");
        },
        onEliminarProfesional2:function(){
            this.getView().getModel().setProperty("/interlocutores/Z5/Persona/CodPersona","");
            this.getView().getModel().setProperty("/interlocutores/Z5/Persona/Descripcion","");
        },
        onBtnProfesional1:function(){
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional1").open();
        },
        onBuscarDlg_DocNuevoBuscarProfesional1:function(){
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                var profesional = this.getView().getModel().getProperty("/busquedaCliente");
                if (profesional.nombre != "") {
                    this.obtenerDatosProfesionalNombre(profesional.nombre, 1);
                } else {
                    MessageToast.show("Ingresar Nombre del Profesional");
                }
            }
            this.sessionStorageDocNuevo();
        },
        onCloseDlg_DocNuevobuscarProfesional1(){
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional1").close();
            this.onLimpiarBuscarProfesional();
        },
        onCloseDlg_DocNuevobuscarProfesional2(){
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional2").close();
            this.onLimpiarBuscarProfesional();
        },
        ///////////////////////////////////////////////////////////////
        onBtnProfesional2:function(){
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional2").open();
        },
        onBuscarDlg_DocNuevoBuscarProfesional2:function(){
            if (this.getView().byId("tabInterlocutores").getSelectedKey() === "filterProfesional") {
                var profesional = this.getView().getModel().getProperty("/busquedaCliente");
                if (profesional.nombre != "") {
                    this.obtenerDatosProfesionalNombre(profesional.nombre, 2);
                } else {
                    MessageToast.show("Ingresar Nombre del Profesional");
                }
            }
            this.sessionStorageDocNuevo();
        },
        onCloseDlg_DocNuevobuscarProfesional2(){
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional1").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscarProfesional2").close();
            this.onLimpiarBuscarProfesional();
        },
        onLimpiarBuscarProfesional:function(){
            this.getView().getModel().setProperty("/busquedaCliente/nombre","");
            this.onDeseleccionarListaResulProfesional();
        },
        onDeseleccionarListaResulProfesional:function(){
            //////Deseleccionar Item Buscar Cliente//////////////////////////////////////////////////////////////////////////////////
                var itemSeleccionado1 = sap.ui.getCore().byId("resultadoListaProfesional1").getItems()[0];
                sap.ui.getCore().byId("resultadoListaProfesional1").setSelectedItem(itemSeleccionado1,true);
                sap.ui.getCore().byId("resultadoListaProfesional1").setSelectedItem(itemSeleccionado1,false);

                var itemSeleccionado2 = sap.ui.getCore().byId("resultadoListaProfesional2").getItems()[0];
                sap.ui.getCore().byId("resultadoListaProfesional2").setSelectedItem(itemSeleccionado2,true);
                sap.ui.getCore().byId("resultadoListaProfesional2").setSelectedItem(itemSeleccionado2,false);
                ////////////////////////////////////////////////////////////////////////////////////////
        },
































        onChangeEditMode: function() {
                var bFlag = true;
 
            this.getView().byId("idProductId").setContextEditable(bFlag);
            this.getView().byId("idProductId").setEnabled(bFlag);
            this.getView().byId("idPrice").setContextEditable(bFlag);
            this.getView().byId("idPrice").setEnabled(bFlag);
            this.getView().byId("idName").setContextEditable(bFlag);
            this.getView().byId("idName").setEnabled(bFlag);
            this.getView().byId("idEmail").setContextEditable(bFlag);
            this.getView().byId("idEmail").setEnabled(bFlag);
            this.getView().byId("idPhone").setContextEditable(bFlag);
            this.getView().byId("idPhone").setEnabled(bFlag);
            this.getView().byId("idURL").setContextEditable(bFlag);
            this.getView().byId("idURL").setEnabled(bFlag);
            this.getView().byId("smartForm").setEditable(bFlag);
            /*this.getView().byId("idCategory").setContextEditable(bFlag);
            this.getView().byId("idDescription").setContextEditable(bFlag);
            this.getView().byId("idPrice").setContextEditable(bFlag);
            this.getView().byId("idSale").setContextEditable(bFlag);
            this.getView().byId("idStatus").setContextEditable(bFlag);
            this.getView().byId("idQuantity").setContextEditable(bFlag);
            this.getView().byId("idPassword").setContextEditable(bFlag);
            this.getView().byId("idCreationDate").setContextEditable(bFlag);
            this.getView().byId("idCreationDateLong").setContextEditable(bFlag);
            this.getView().byId("idCreationDateCustomPattern").setContextEditable(bFlag);
            this.getView().byId("idLastChanged").setContextEditable(bFlag);
            this.getView().byId("idAvailableSince").setContextEditable(bFlag);*/
        },

        onChangeEnabledMode: function(oEvent) {
            var bFlag = false;
             this.getView().byId("idProductId").setContextEditable(bFlag);
            this.getView().byId("idProductId").setEnabled(bFlag);
            this.getView().byId("idPrice").setContextEditable(bFlag);
            this.getView().byId("idPrice").setEnabled(bFlag);
            this.getView().byId("idName").setContextEditable(bFlag);
            this.getView().byId("idName").setEnabled(bFlag);
            this.getView().byId("idEmail").setContextEditable(bFlag);
            this.getView().byId("idEmail").setEnabled(bFlag);
            this.getView().byId("idPhone").setContextEditable(bFlag);
            this.getView().byId("idPhone").setEnabled(bFlag);
            this.getView().byId("idURL").setContextEditable(bFlag);
            this.getView().byId("idURL").setEnabled(bFlag);
            this.getView().byId("smartForm").setEditable(bFlag);
            /*this.getView().byId("idCategory").setContextEditable(bFlag);
            this.getView().byId("idDescription").setContextEditable(bFlag);
            this.getView().byId("idPrice").setContextEditable(bFlag);
            this.getView().byId("idSale").setContextEditable(bFlag);
            this.getView().byId("idStatus").setContextEditable(bFlag);
            this.getView().byId("idQuantity").setContextEditable(bFlag);
            this.getView().byId("idPassword").setContextEditable(bFlag);
            this.getView().byId("idCreationDate").setContextEditable(bFlag);
            this.getView().byId("idCreationDateLong").setContextEditable(bFlag);
            this.getView().byId("idCreationDateCustomPattern").setContextEditable(bFlag);
            this.getView().byId("idLastChanged").setContextEditable(bFlag);
            this.getView().byId("idAvailableSince").setContextEditable(bFlag);*/
        },



        
        //Boton Home
        goHome: function () {
            /*var oEventBus = sap.ui.core.Component.getOwnerComponentFor(this.getView()).getEventBus();

oEventBus.publish(
        "MyEvent"
);*/
            window.numeroDocumento = sap.ui.getCore().byId("txt_numeroDocumento_DocModificar").getValue();
            utilString.destruirFragments(this);
            sessionStorage.clear();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        
        
        
        
        //Boton Buscar Cliente
        onDocNuevoBuscarCliente1: function () {
            sap.ui.getCore().byId("dlg_DocNuevobuscarCliente").open()
        },
        //Navegacion Master
        onDocNuevoPressMasterBack: function () {
        },
        //Buscar Producto
        onDocNuevodlg_buscar: function () {
                sap.ui.getCore().byId("dlg_DocNuevobuscar").open();
        },
        onDocNuevoClosedlg_buscar: function () {
            this.limpiarBuscarProductos();
                sap.ui.getCore().byId("dlg_DocNuevobuscar").close();          
        },
        //Boton Buscar Producto desde el Dialog
        onDocNuevoMasterProductosBuscar: function () {
            sap.ui.getCore().byId("dlg_DocNuevobuscar").close();
        },
        //Editar Lista de Reparto
        /*
         onDocNuevodlg_editListaReparto: function() {
         sap.ui.getCore().byId("dlg_DocNuevoeditListaReparto").open();
         },
         
         onDocNuevoClosedlg_editListaReparto: function() {
         sap.ui.getCore().byId("dlg_DocNuevoeditListaReparto").close();
         }, 
         */
        //Boton Agregar producto desde el Master BuscarProducto
        onDocNuevoAddinBuscar: function () {
            MessageToast.show("Producto Añadido");
        },
        /*
         onDocNuevoSemanticButtonPress: function(evt) {
         MessageToast.show(evt.getSource().getText() + " Pressed");
         
         },
         */
        //Boton Master Datos
        onDocNuevoMasterDatos: function (oEvent) {
            /*this.getView().byId("buttonMasterDatos").setSelectedKey("datos");/////
            this.getView().byId("buttonMasterProductos").setSelectedKey("productos");*/////
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
            sessionStorage.setItem("PageSelect","DocProductosDetallado");

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
        //Lista de Master Datos
        onListaMasterDatos: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            if (obj.codigo === 1) {
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"))
            }
            if (obj.codigo === 2) {
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail2"))
            }
            if (obj.codigo === 3) {
                this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail3"))
            }
        },
        //Lista de Master Productos
        onDocNuevoListMasterProductos: function (oEvent) {
        },
        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaCliente1: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/clienteSeleccionado", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductosBuscarCliente"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_cliente_buscado"));
            sap.ui.getCore().byId("dlg_DocNuevobuscarCliente_resultado").close();
            sap.ui.getCore().byId("dlg_DocNuevobuscarCliente").close();
            console.log(obj.codigo);
        },
        //Al presionar en la Lista de los Clientes Buscados
        onDocNuevoListBuscarCliente: function () {
        },
        goStockDisponible: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockDisponible");
        },
        
        //Seleccionar Categoria
        /*onSeleccionarCategoria: function(){
         var categoria = this.getView().byId("comboCategoria").getSelectedKey();
         var linea[] = window.dataIni.lstLinea;
         var listaL[];
         for (var i = 0; i < (linea[].lenght); i++) {
         if(linea[]{Codigo} === categoria ){
         listaL[].push(linea[]{Descripcion});
         }
         }
         this.getView().getModel().setProperty("/ListaLinea",listaL[]);
         },*/
        //Stock Buscar
        //Seleccionar Categoria
        
//Busy Indicador------------
        hideBusyIndicator: function () {
            sap.ui.core.BusyIndicator.hide();
        },
        showBusyIndicator: function (iDuration, iDelay) {
            sap.ui.core.BusyIndicator.show(iDelay);
            if (iDuration && iDuration > 0) {
                if (this._sTimeoutId) {
                    jQuery.sap.clearDelayedCall(this._sTimeoutId);
                    this._sTimeoutId = null;
                }
                this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
                    this.hideBusyIndicator();
                });
            }
        },
// this.showBusyIndicator(4000, 0);
//--------------------------

        onVolverCate:function(){
            sap.ui.getCore().byId("dlg_docCaracteristica").close();
        },





    });

});
