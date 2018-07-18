sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString",
    "pe/com/seidor/sap/decor/ventas/services/stockServices",
    'sap/m/Button',
    'sap/m/Dialog',    
    'sap/m/Text',
    "pe/com/seidor/sap/decor/ventas/services/imprimirServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery, documentosServices,utilString,stockServices,Button,Dialog,Text,imprimirServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocBuscar", {
        
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
                var date = new Date();
                var yyyy = date.getFullYear().toString();
                var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
                var dd  = date.getDate().toString();
                var fechaActual = yyyy +"-"+ (mm[1] ? mm : "0" + mm[0]) +"-"+ (dd[1] ? dd : "0" + dd[0]); // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
            var oData = {
                datosBuscarDoc: {
                    "NumeroDocumentoReferencia":"",
                    "tipoBusqueda": "1",
                    "datoBusqueda": "",
                    "nMaterial": "",
                    "claseDoc": " ",
                    "fechaInicio": "", //2017-07-10T20:57:43.311Z
                    "fechaFin": "", //2017-07-10T20:57:43.311Z
                    "codAsesor": window.dataIni.person.PerNr, //00001802
                    "fecInicio1": fechaActual, //2017-07-10
                    "fecFin1": fechaActual, //2017-07-10
                    "Detalle": [],
                    "ClaseDocumento": "", //String si es Cotizacion
                    "NumeroPedido": "",
                    "knumv": "",
                    "flujo": [],
                    "numeroPedidos": {}
                    
                },
                listaPedidosMultiples:[
                    {"codigo":"Z001", "descripcion":"Pedido Mostrador", "numPedido":""},
                    {"codigo":"Z034", "descripcion":"Pedido Vta. Tránsito", "numPedido":""},
                    {"codigo":"Z004", "descripcion":"Pedido Vta. Calzada", "numPedido":""}
                    ],
                imprimirDocBus: {
                    "pNumPedido": "",
                    "tipoImpresion": "0",
                    "accion": "ver"
                }
            };
            if (oEvent.getParameter("name") == "appDocBuscar") {
                window.numeroDocumento = null;
                window.numDocBus = null;
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);

                ////Inicio Formatear lista de tipo de Doc y quitar espacio en blanco///////////////////
                var tiposDoc = this.getView().getModel().getProperty("/dataIni/lstTipoDoc");
                var tipos = [];
                var tiposObject = {}; 
                var tiposObject1 = {};
                var primero = tiposDoc.filter(function(el) {
                                         return el.Codigo == " ";
                    });
                if(primero.length==0){
                    tiposObject1 = {
                        "Codigo":" ",
                        "Descripcion": "Seleccione Clase de Doc."
                    }
                tipos.push(tiposObject1);
                }
                for (var i = 0; i < tiposDoc.length; i++) {
                    if(tiposDoc[i].Codigo !="ZO01" && tiposDoc[i].Codigo !="ZO02"){
                        tiposObject = tiposDoc[i];
                        tiposObject.posicion = i;
                        tipos.push(tiposObject);
                    }
                }
                for (var i = 0; i < tiposDoc.length; i++) {
                    if(tiposDoc[i].Codigo =="ZO01"){
                        tiposObject = tiposDoc[i];
                        tiposObject.posicion = -2;
                        tipos.push(tiposObject);
                    }
                }
                for (var i = 0; i < tiposDoc.length; i++) {
                    if(tiposDoc[i].Codigo =="ZO02"){
                        tiposObject = tiposDoc[i];
                        tiposObject.posicion = -1;
                        tipos.push(tiposObject);
                    }
                }
                this.getView().getModel().setProperty("/dataIni/lstTipoDoc",tipos);
                ////End Formatear lista de tipo de Doc y quitar espacio en blanco///////////////////
                
                //INICIO EDELACRUZ: 
                //Valores Dialog "Buscar Documento"(dlg_DialogDocBuscarInicio.xml)
                //Combo campo: "tipo de busqueda"
                var listaTipoDoc = [];
                var objTipoDoc0 = {
                    Codigo: "1",
                    Descripcion: "Número de Pedido"
                };
                var objTipoDoc1 = {
                    Codigo: "2",
                    Descripcion: "Número de Factura"
                };
                var objTipoDoc2 = {
                    Codigo: "3",
                    Descripcion: "Nombre de Cliente"
                };
                var objTipoDoc3 = {
                    Codigo: "4",
                    Descripcion: "RUC / DNI"
                };
                var objTipoDoc4 = {
                    Codigo: "5",
                    Descripcion: "Código de Cliente"
                };
                var objTipoDoc5 = {
                    Codigo: "6",
                    Descripcion: "Nombre de material"
                };
                var objTipoDoc6 = {
                    Codigo: "7",
                    Descripcion: "Material"
                };
                listaTipoDoc.push(objTipoDoc0);
                listaTipoDoc.push(objTipoDoc1);
                listaTipoDoc.push(objTipoDoc2);
                listaTipoDoc.push(objTipoDoc3);
                listaTipoDoc.push(objTipoDoc4);
                listaTipoDoc.push(objTipoDoc5);
                listaTipoDoc.push(objTipoDoc6);
                //FIN EDELACRUZ 
                this.getView().getModel().setProperty("/modelTipoBusq", listaTipoDoc);
                this.getView().getModel().refresh();
                utilString.destruirFragments(this);
                utilString.cargarFragments(this);
                sap.ui.getCore().byId("dlg_DialogDocBuscar").open();
            }else{
                utilString.destruirFragments(this);
            }
            
        },
        //Boton Home
        goHome: function () {
            utilString.destruirFragments(this);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        //Buscar en Dialgo Buscar
        onBuscarDlg_DialogDocBuscar: function (oEvent) {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
            var buscarDoc = self.getView().getModel().getProperty("/datosBuscarDoc");
            //var result = documentosServices.buscarDocumento(buscarDoc);
            documentosServices.buscarDocumento(buscarDoc, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            
                if (result.c === "s") {
                    if (result.data.success) {
                        ////Inicio Ampliar Listado de Documentos////////
                        self.getView().setModel(new JSONModel(result.data.lstPedidos),"modellstDoc");
                        self.getView().getModel("modellstDoc").setSizeLimit(700);
                        self.getView().getModel("modellstDoc").refresh(true);
                        ////End Ampliar Listado de Documentos////////
                        /*self.getView().getModel().setProperty("/retornoBuscarDoc", result.data);
                        self.getView().getModel().refresh();*/
                        sap.ui.getCore().byId("dlg_DialogDocBuscar").close();
                        sap.ui.getCore().byId("dlg_DocBuscarLista").open();
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
                console.log(result.data);
                sap.ui.core.BusyIndicator.hide();
            });
            }, 1000);
        },
        onCancenlDlg_DialogDocBuscar: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appDocHome");
        },
        onListaBuscarDoc: function (oEvent) {
            var item =  oEvent.getSource().getBindingContext("modellstDoc").getPath();
            var numb = item.match(/\d/g);
            numb = numb.join("");
            var firstItem = sap.ui.getCore().byId("listaDocumentosBuscarDoc").getItems()[numb]; 
                            sap.ui.getCore().byId("listaDocumentosBuscarDoc").setSelectedItem(firstItem,true);

            var docSeleccionado = sap.ui.getCore().byId("listaDocumentosBuscarDoc").getSelectedItem().getBindingContext("modellstDoc").getObject();
            window.numDocBus = docSeleccionado.NumeroPedido;
            console.log(docSeleccionado);
            this.getView().getModel().setProperty("/datosBuscarDoc/ClaseDocumento", docSeleccionado.ClaseDocumento);
            this.getView().getModel().setProperty("/datosBuscarDoc/knumv", docSeleccionado.knumv);
            this.getView().getModel().setProperty("/datosBuscarDoc/Detalle", docSeleccionado.Detalle);
            this.getView().getModel().setProperty("/datosBuscarDoc/NumeroPedido", docSeleccionado.NumeroPedido);
            this.getView().getModel().refresh();
            sap.ui.getCore().byId("dlg_DocBuscarLista").close();
        },
        onListaDetalleDoc: function (evt) {
            var docSeleccionado = evt.getSource().getSelectedItem().getBindingContext().getObject();
            window.numDocBus = docSeleccionado.DocumentoVenta;
            console.log(docSeleccionado);
        },
        onBtnFlujo: function () {
            window.numeroDocumento = window.numDocBus;
            if (window.numeroDocumento) {
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocFlujo");
                    self.getView().byId("loadingControl").close();
                }, 100);
            } else {
                MessageToast.show("Seleccione un Documento");
            }
        },
        onBtnImprimir: function () {
            var numPedido = this.getView().getModel().getProperty("/datosBuscarDoc/NumeroPedido");
            this.getView().getModel().setProperty("/imprimirDocBus/pNumPedido",numPedido);
            //window.imprimirDoc= true;
            sap.ui.getCore().byId("dlg_DocBuscarImpresion").open();
                /*var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocHome");
                    self.getView().getModel().refresh();
                    self.getView().byId("loadingControl").close();
                }, 100);*/
        },
        onListaDocumento: function () {
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
            sap.ui.getCore().byId("dlg_DocBuscarLista").open();
            sap.ui.core.BusyIndicator.hide();
            }, 100);
        },
        onVolver: function () {
            sap.ui.getCore().byId("dlg_DialogDocBuscar").open();
            sap.ui.getCore().byId("dlg_DocBuscarLista").close();
        },
        onConversionPedido: function () {
            var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                var convPedido = self.getView().getModel().getProperty("/datosBuscarDoc");
                //var result = documentosServices.conversionPedido(convPedido);
                documentosServices.conversionPedido(convPedido, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                
                    console.log("longitud de flujo");
                    console.log(result.data.flujo.length);
                    if (result.c === "s") {
                            var pedido = '';
                            var cadena = '';
                            var coti = self.getView().getModel().getProperty("/datosBuscarDoc/ClaseDocumento");
                            var itera = 0;
                             if (result.data.flujo.length > 1) {
                                        for (var i = 0; i < result.data.flujo.length; i++) {
                                            var numPedido = result.data.flujo[i].codTipoDoc;
                                            if (numPedido == "C") {//condicion
                                                pedido = pedido + result.data.flujo[i].NumDocumento + ', ';
                                            }

                                            if (itera == 0) {
                                                if(numPedido == "B"){
                                                    coti = self.getView().getModel().getProperty("/datosBuscarDoc/ClaseDocumento");
                                                        
                                                        if (coti == "COTIZACIÓN DECOR")//insert edc
                                                        {
                                                             itera = 1; 
                                                        }
                                                }
                                            }
                                        }

                                        if (coti == "COTIZACIÓN DECOR") {
                                       
                                                if ( pedido != '' )
                                                {
                                                    cadena = 'Cotización tiene pedido(s) nro: ' + pedido + '¿Seguro que desea crear el pedido de venta?';
                                                    sap.ui.getCore().byId("dlg_MensajeAvisoConversionPedido").open();
                                                    sap.ui.getCore().byId("txt_dlg_MensajeAvisoConversionPedido").setText(cadena);
                                                }
                                                else
                                                {
                                                    cadena = '¿Seguro que desea crear pedido?';
                                                    sap.ui.getCore().byId("dlg_MensajeAvisoConversionPedido").open();
                                                    sap.ui.getCore().byId("txt_dlg_MensajeAvisoConversionPedido").setText(cadena);
                                                }
                                        
                                        } else {
                                            sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
                                            sap.ui.getCore().byId("txt_aviso_general").setText("Solo se puede crear si es una cotización.");
                                          }
                            }else {
                                    if (result.data.flujo.length = 1) {
                                    
        //                              int entero = 0;
        //                              entero = action.flujo[0].NumDocumento;
                                        
                                        if (result.data.flujo[0].codTipoDoc == 'B' && parseInt(result.data.flujo[0].NumDocumento,10) == window.numDocBus) {
                                           sap.ui.getCore().byId("dlg_MensajeAvisoConversionPedido").open();
                                                    sap.ui.getCore().byId("txt_dlg_MensajeAvisoConversionPedido").setText("¿Seguro que desea crear pedido?");
                                          
                                                
                                        } else {
                                             sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
                                            sap.ui.getCore().byId("txt_aviso_general").setText("Solo se puede crear si es una cotización.");
                                        }
                            }}
                           
                        } else {
                            sap.m.MessageToast.show(result.data.errors.reason, {
                                duration: 3000
                            });
                        }
                    sap.ui.core.BusyIndicator.hide();
                });
                }, 500);
            

        },
        onOkDlg_MensajeAvisoGeneral: function () {
            sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").close();
        },
        onNodlg_MensajeAvisoConversionPedido: function () {
            sap.ui.getCore().byId("dlg_MensajeAvisoConversionPedido").close();
        },
        onSidlg_MensajeAvisoConversionPedido: function () {
            window.numeroDocumento = window.numDocBus;
            window.IsDocNuevo = true;
            window.converPedido = true;
            this.getView().getModel().refresh();
                var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                    utilString.destruirFragments(self);
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocNuevo");
                    sap.ui.core.BusyIndicator.hide();
                }, 100);
        },

        onBtnVisualizarDoc:function(){
            window.numeroDocumento = window.numDocBus;
            window.IsDocVisualizar = false;
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    utilString.destruirFragments(self);
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocVisualizar");
                    self.getView().byId("loadingControl").close();
                }, 100);
        },

        onBtnModificarDoc:function(){
            window.numeroDocumento = window.numDocBus;
            window.IsDocBuscarModificar = false;
                var self = this;
                self.getView().byId("loadingControl").open();
                setTimeout(function () {
                    utilString.destruirFragments(self);
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocModificar");
                    self.getView().byId("loadingControl").close();
                }, 100);
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
                if (result.c === "s") {
            if (result.data.success) {
                self.getView().getModel().setProperty("/listaMaterialPedMulti",result.data.lstDetalle);
                self.getView().getModel().setProperty("/listaMaterialPedMulti/tipoDocumento",tipoDocPedMul);
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").close();
                sap.ui.getCore().byId("dlg_DialogListaMaterialesPedidosMultiples").open();           
            } else {
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").close();
                sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
            }            
            sap.ui.core.BusyIndicator.hide();
            } else {
                sap.ui.core.BusyIndicator.hide();
                    sap.m.MessageToast.show(result.m, {
                        duration: 3000
                    });
                }
            });
            
                    }, 1000);
        },
        onGenPedidoMultiplesDlg_DialogDocModificar:function(){
            var numDoc = this.getView().getModel().getProperty("/datosBuscarDoc/NumeroPedido");
            this.getView().getModel().setProperty("/NumeroDocumentoReferencia",numDoc);
            if(this.getView().getModel().getProperty("/NumeroDocumentoReferencia")!=""){
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").open();
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").close();
                sap.ui.getCore().byId("dlg_DialogPedidosMultiples").open();
            }else{
                MessageToast.show("No ha ingresado Número Doc.")
            }
        },
        onCloseGenPedidoMultiplesDlg_DialogDocModificar:function(){
            sap.ui.getCore().byId("dlg_DialogPedidosMultiples").close();
            var pedMult = this.getView().getModel().getProperty("/listaPedidosMultiples");
            for (var i = 0; i < pedMult.length; i++) {
                pedMult[i].numPedido = "";
            }
            this.getView().getModel().setProperty("/listaPedidosMultiples",pedMult);
            this.getView().getModel().refresh()
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
        crearDialogAviso: function(data,flag) {  
            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({ text: data }),
                beginButton: new Button({
                    text: 'OK',
                    type: 'Accept',
                    press: function () {  
                        dialog.destroy();
                        if(flag=="Buscar"){
                            this.onCloseDocImprimir();
                        }
                    }.bind(this)
                }),
                afterClose: function() {
                    dialog.destroy();
                }.bind(this)
            });

            dialog.open();
        },
        validarOnImprimirDoc: function(){
            var self = this;
            var imprimirDoc = self.getView().getModel().getProperty("/imprimirDocBus");
                    imprimirDoc.pNumPedido = utilString.pad(imprimirDoc.pNumPedido, 10);
                    if(imprimirDoc.pNumPedido.length>10 || imprimirDoc.pNumPedido=="0000000000"){
                        MessageToast.show("Ingrese un número de Documento correcto.");
                        return;
                    }
                if(navigator.onLine){
                    sap.ui.core.BusyIndicator.show(0);
                  fetch(window.RootServices).then(function(response) {
                    if(!response.ok) {
                     // Parece que hay acceso a Internet,
                     // pero la respuesta no ha sido ok
                     // También se puede comprobar el código de estado con response.status
                     // Y hacer algo específico según el estado exacto recibido
                     throw Error(response.statusText);
                    }
                   }).then(function(response) {
                        self.validarOnImprimirDoc();
                    
                     // Aqui debes llamar a la opcion de imprimir
                     console.log("Ingreso correctamente");
                   }).catch(function(error) {
                    sap.ui.core.BusyIndicator.hide();
                     MessageToast.show("No tiene Acceso al Servidor de Impresion");
                    return;
                   });
                } else {
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("No se encuentra conectado a Internet");
                    return;
                }
        },
        //////////Imprimir Documento/////////////////////////////////////////
        onImprimirDoc: function () {
            var self = this;
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDocBus");
            if(imprimirDoc.pNumPedido.length>10 || imprimirDoc.pNumPedido==""){
                MessageToast.show("Ingrese un número de Documento correcto.");
                return;
            }
            imprimirDoc.pNumPedido = utilString.pad(imprimirDoc.pNumPedido, 10);
            if (imprimirDoc.pNumPedido != "") {
                if (utilString.isNumeric(imprimirDoc.pNumPedido)) {

                    //var result = imprimirServices.imprimirDocumento(imprimirDoc);
                    var opcion1 = sap.ui.getCore().byId("opcion1DocBus").getSelected();
                    var opcion2 = sap.ui.getCore().byId("opcion2DocBus").getSelected();
                    var opcion3 = sap.ui.getCore().byId("opcion3DocBus").getSelected();
                    if(opcion1==true){
                        imprimirDoc.tipoImpresion = "0";
                    }
                    if(opcion2==true){
                        imprimirDoc.tipoImpresion = "2";
                    }
                    if(opcion3==true){
                        imprimirDoc.tipoImpresion = "3";
                    }
                    var rutaImpresion = window.RootImprimir; //"http://140.20.0.101/DecorQAs/";
                    
                        //var result = imprimirServices.imprimirDocumentoSync(imprimirDoc);
                        sap.ui.core.BusyIndicator.show(0);
                        imprimirServices.imprimirDocumento(imprimirDoc, function (result) {
                            sap.ui.core.BusyIndicator.hide();
                            /*if(result.data==undefined || result.data.objPedido.FechaString==undefined){
                                            MessageToast.show("Vuelva a imprimir");
                                            console.log("Objeto Imprimir");
                                            console.log(result.data);
                                            return;
                                    }*/
                            if (result.c === "s") {
                                if (result.data.success) {
                                    if (opcion1 == true) {
                                        var tipoDoc = result.data.objPedido.CodTipoDoc;
                                        var fechapValor = result.data.objPedido.FechaString;//05/07/2018
                                        var fechap = utilString.convertFechaFormatoDDMMAA(fechapValor,"/"); 
                                    }
                                    var NoImpFac = "";
                                    if (opcion1 == true) {
                                        NoImpFac = result.data.objPedido.NoImpFac;
                                    }
                                    if (NoImpFac == "X") {
                                        self.crearDialogAviso("No se puede imprimir por bloqueo de factura");
                                        self.getView().getModel().refresh();
                                    } else {
                                        if (opcion1 == true) {
                                            if (tipoDoc == "Z036") {
                                                if (result.data.objPedido.CanalDist == "30") {
                                                    if (result.data.objPedido.CodOficina == "1140") {
                                                        window.open(rutaImpresion + "DocImprVisDE.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    } else {
                                                        window.open(rutaImpresion + "DocImpVisitas.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    }
                                                } else if (result.data.objPedido.CanalDist == "20") {
                                                    if (result.data.objPedido.CodOficina == "1130") {
                                                        window.open(rutaImpresion + "DocImprVisUF.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    } else {
                                                        window.open(rutaImpresion + "DocImprVisFA.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    }
                                                } else {
                                                    if ( //result.data.objPedido.CodOficina == "1110" ||
                                                        //result.data.objPedido.CodOficina == "1040" ||
                                                        result.data.objPedido.CodOficina == "1070") {
                                                        window.open(rutaImpresion + "DocImprVisCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    } else {
                                                        window.open(rutaImpresion + "DocImpVisitas.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    }
                                                }
                                            } else {
                                                if (result.data.objPedido.CanalDist == "30") {
                                                    if (result.data.objPedido.CodOficina == "1140") {
                                                        var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");
                                                        if (fechaz <= fechap) {
                                                            window.open(rutaImpresion + "DocImprGrpAmbDE.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                        } else {
                                                            window.open(rutaImpresion + "DocImprDE.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                        }
                                                    }
                                                    /*else if (result.data.objPedido.CodOficina == "1110" ||
                                                            result.data.objPedido.CodOficina == "1040")
                                                    {
                                                        window.open(rutaImpresion + "DocImprGrpAmbCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    }*/
                                                    else {
                                                        if (tipoDoc == "ZO01" || tipoDoc == "Z001") {
                                                            var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");
                                                            if (fechaz <= fechap) {
                                                                window.open(rutaImpresion + "DocImprGrpAmb.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                            } else {
                                                                window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                            }
                                                        } else {
                                                            window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                        }
                                                    }
                                                } else if (result.data.objPedido.CanalDist == "20") {
                                                    if (result.data.objPedido.CodOficina == "1130") {
                                                        window.open(rutaImpresion + "DocImprUF.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    } else {
                                                        window.open(rutaImpresion + "DocImprFA.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    }
                                                } else {
                                                    if (tipoDoc == "ZO01" || tipoDoc == "Z001") {
                                                        var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");
                                                        if (fechaz <= fechap) {
                                                            if ( //result.data.objPedido.CodOficina == "1110" ||
                                                                //result.data.objPedido.CodOficina == "1040" ||
                                                                result.data.objPedido.CodOficina == "1070") {
                                                                window.open(rutaImpresion + "DocImprGrpAmbCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                            } else {
                                                                window.open(rutaImpresion + "DocImprGrpAmb.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                            }
                                                        } else {
                                                            if ( //result.data.objPedido.CodOficina == "1110" ||
                                                                //result.data.objPedido.CodOficina == "1040" ||
                                                                result.data.objPedido.CodOficina == "1070") {
                                                                window.open(rutaImpresion + "DocImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                            } else {
                                                                window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                            }
                                                        }
                                                    } else {
                                                        if ( //result.data.objPedido.CodOficina == "1110" ||
                                                            //result.data.objPedido.CodOficina == "1040" ||
                                                            result.data.objPedido.CodOficina == "1070") {
                                                            window.open(rutaImpresion + "DocImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                        } else {
                                                            window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                        }
                                                    }
                                                }
                                            }
                                            self.crearDialogAviso("Se envio a imprimir el documento","Buscar");
                                            self.getView().getModel().refresh();
                                        } else if (opcion2 == true) {
                                            var tipoDoc = result.data.objPedido.CodTipoDoc;
                                            if (tipoDoc == "Z001" || tipoDoc == "Z034" || tipoDoc == "Z003" ||
                                                tipoDoc == "Z004" || tipoDoc == "Z010") {
                                                if ((result.data.objPedido.CanalDist == "10" ||
                                                        result.data.objPedido.CanalDist == "30") &&
                                                    ( //result.data.objPedido.CodOficina == "1110" ||
                                                        //result.data.objPedido.CodOficina == "1040" ||
                                                        result.data.objPedido.CodOficina == "1070")) {
                                                    window.open(rutaImpresion + "DocPedEntImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                } else {
                                                    window.open(rutaImpresion + "DocPedEntImpr.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                }
                                                self.crearDialogAviso("Se envio a imprimir el documento","Buscar");
                                                self.getView().getModel().refresh();
                                            } else {
                                                self.crearDialogAviso("La impresión seleccionada solo es válida para pedidos Z001,Z034,Z003,Z004 y Z010");
                                                self.getView().getModel().refresh();
                                            }
                                        } else if (opcion3 == true) {
                                            imprimirDoc.tipoImpresion = "3";
                                            //var result2 = imprimirServices.imprimirDocumentoSync(imprimirDoc);
                                            imprimirServices.imprimirDocumento(imprimirDoc, function (result2) {
                                                sap.ui.core.BusyIndicator.hide();
                                                if (result2.c === "s") {
                                                    if (result2.data.success) {
                                                        self.crearDialogAviso("El documento se mando a imprimir","Buscar");
                                                        self.getView().getModel().refresh();
                                                    } else {
                                                        sap.m.MessageToast.show(result2.data.errors.reason, {
                                                            duration: 3000
                                                        });
                                                    }
                                                }else {
                                                    sap.m.MessageToast.show(result.m, {
                                                        duration: 3000
                                                    });
                                                }
                                                }, 4000);

                                        }
                                    }
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
                            //console.log(result.data);
                            sap.ui.core.BusyIndicator.hide();
                        },5000);
                } else {
                    MessageToast.show("Ingrese un Número, no letras ni símbolos");
                }
            } else {
                MessageToast.show("Ingrese un Número");
            }
        },
        onCloseDocImprimir: function () {
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                sap.ui.core.BusyIndicator.hide();
            sap.ui.getCore().byId("dlg_DocBuscarImpresion").close();
            sap.ui.getCore().byId("dlg_DocBuscarLista").open();
            }, 100);
        },
        validarObtenerLinkDoc: function(){
            var self = this;
            var imprimirDoc = self.getView().getModel().getProperty("/imprimirDocBus");
                    imprimirDoc.pNumPedido = utilString.pad(imprimirDoc.pNumPedido, 10);
                    if(imprimirDoc.pNumPedido.length>10 || imprimirDoc.pNumPedido=="0000000000"){
                        MessageToast.show("Ingrese un número de Documento correcto.");
                        return;
                    }
                if(navigator.onLine){
                    sap.ui.core.BusyIndicator.show(0);
                  fetch(window.RootServices).then(function(response) {
                    if(!response.ok) {
                     // Parece que hay acceso a Internet,
                     // pero la respuesta no ha sido ok
                     // También se puede comprobar el código de estado con response.status
                     // Y hacer algo específico según el estado exacto recibido
                     throw Error(response.statusText);
                    }
                   }).then(function(response) {
                    self.validarObtenerLinkDoc();
                     // Aqui debes llamar a la opcion de imprimir
                     console.log("Ingreso correctamente");
                   }).catch(function(error) {
                    sap.ui.core.BusyIndicator.hide();
                     MessageToast.show("No tiene Acceso al Servidor de Impresion");
                    return;
                   });
                } else {
                    sap.ui.core.BusyIndicator.hide();
                    MessageToast.show("No se encuentra conectado a Internet");
                    return;
                }
        },
        obtenerLinkDoc: function () {
            var self = this;
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDocBus");
            if(imprimirDoc.pNumPedido.length>10 || imprimirDoc.pNumPedido==""){
                MessageToast.show("Ingrese un número de Documento correcto.");
                return;
            }
            imprimirDoc.pNumPedido = utilString.pad(imprimirDoc.pNumPedido, 10);
            if (imprimirDoc.pNumPedido != "") {
                if (utilString.isNumeric(imprimirDoc.pNumPedido)) {

                    //var result = imprimirServices.imprimirDocumento(imprimirDoc);
                    var opcion1 = sap.ui.getCore().byId("opcion1DocBus").getSelected();
                    var opcion2 = sap.ui.getCore().byId("opcion2DocBus").getSelected();
                    var opcion3 = sap.ui.getCore().byId("opcion3DocBus").getSelected();
                    if(opcion1==true){
                        imprimirDoc.tipoImpresion = "0";
                    }
                    if(opcion2==true){
                        imprimirDoc.tipoImpresion = "2";
                    }
                    if(opcion3==true){
                        imprimirDoc.tipoImpresion = "3";
                    }
                    var rutaImpresion = window.RootImprimir; //"http://140.20.0.101/DecorQAs/";
                    
                        //var result = imprimirServices.imprimirDocumento(imprimirDoc);
                        sap.ui.core.BusyIndicator.show(0);
                        imprimirServices.imprimirDocumento(imprimirDoc, function (result) {
                            sap.ui.core.BusyIndicator.hide();
                            /*if(result.data==undefined || result.data.objPedido.FechaString==undefined){
                                            MessageToast.show("Vuelva a imprimir");
                                            console.log("Objeto Imprimir");
                                            console.log(result.data);
                                            return;
                                    }*/
                            if (result.c === "s") {
                                if (result.data.success) {
                                    if (opcion1 == true) {
                                        var tipoDoc = result.data.objPedido.CodTipoDoc;
                                        var fechapValor = result.data.objPedido.FechaString;//05/07/2018
                                        var fechap = utilString.convertFechaFormatoDDMMAA(fechapValor,"/"); 
                                    }
                                    var NoImpFac = "";
                                    if (opcion1 == true) {
                                        NoImpFac = result.data.objPedido.NoImpFac;
                                    }
                                    if (NoImpFac == "X") {
                                        self.crearDialogAviso("No se puede imprimir por bloqueo de factura");
                                        self.getView().getModel().refresh();
                                    } else {
                                        var linkDoc = "";
                                        var subLink = "";
                                        if (opcion1 == true) {
                                            if (tipoDoc == "Z036") {
                                                if (result.data.objPedido.CanalDist == "30") {
                                                    if (result.data.objPedido.CodOficina == "1140") {
                                                        subLink = "DocImprVisDE";
                                                        linkDoc = rutaImpresion + "DocImprVisDE.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                    } else {
                                                        subLink = "DocImpVisitas";
                                                        linkDoc = rutaImpresion + "DocImpVisitas.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                    }
                                                } else if (result.data.objPedido.CanalDist == "20") {
                                                    if (result.data.objPedido.CodOficina == "1130") {
                                                        subLink = "DocImprVisUF";
                                                        linkDoc = rutaImpresion + "DocImprVisUF.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                    } else {
                                                        subLink = "DocImprVisFA";
                                                        linkDoc = rutaImpresion + "DocImprVisFA.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                    }
                                                } else {
                                                    if ( //result.data.objPedido.CodOficina == "1110" ||
                                                        //result.data.objPedido.CodOficina == "1040" ||
                                                        result.data.objPedido.CodOficina == "1070") {
                                                        subLink = "DocImprVisCasa";
                                                        linkDoc = rutaImpresion + "DocImprVisCasa.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                    } else {
                                                        subLink = "DocImpVisitas";
                                                        linkDoc = rutaImpresion + "DocImpVisitas.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                    }
                                                }
                                            } else {
                                                if (result.data.objPedido.CanalDist == "30") {
                                                    if (result.data.objPedido.CodOficina == "1140") {
                                                        var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");
                                                        if (fechaz <= fechap) {
                                                            subLink = "DocImprGrpAmbDE";
                                                            linkDoc = rutaImpresion + "DocImprGrpAmbDE.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                        } else {
                                                            subLink = "DocImprDE";
                                                            linkDoc = rutaImpresion + "DocImprDE.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                        }
                                                    }
                                                    /*else if (result.data.objPedido.CodOficina == "1110" ||
                                                            result.data.objPedido.CodOficina == "1040")
                                                    {
                                                        window.open(rutaImpresion + "DocImprGrpAmbCasa.aspx?np=" + imprimirDoc.pNumPedido, "");
                                                    }*/
                                                    else {
                                                        if (tipoDoc == "ZO01" || tipoDoc == "Z001") {
                                                            var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");
                                                            if (fechaz <= fechap) {
                                                                subLink = "DocImprGrpAmb";
                                                                linkDoc = rutaImpresion + "DocImprGrpAmb.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                            } else {
                                                                subLink = "DocImpr";
                                                                linkDoc = rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                            }
                                                        } else {
                                                            subLink = "DocImpr";
                                                            linkDoc = rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                        }
                                                    }
                                                } else if (result.data.objPedido.CanalDist == "20") {
                                                    if (result.data.objPedido.CodOficina == "1130") {
                                                        subLink = "DocImprUF";
                                                        linkDoc = rutaImpresion + "DocImprUF.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                    } else {
                                                        subLink = "DocImprFA";
                                                        linkDoc = rutaImpresion + "DocImprFA.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                    }
                                                } else {
                                                    if (tipoDoc == "ZO01" || tipoDoc == "Z001") {
                                                        var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");
                                                        if (fechaz <= fechap) {
                                                            if ( //result.data.objPedido.CodOficina == "1110" ||
                                                                //result.data.objPedido.CodOficina == "1040" ||
                                                                result.data.objPedido.CodOficina == "1070") {
                                                                subLink = "DocImprGrpAmbCasa";
                                                                linkDoc = rutaImpresion + "DocImprGrpAmbCasa.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                            } else {
                                                                subLink = "DocImprGrpAmb";
                                                                linkDoc = rutaImpresion + "DocImprGrpAmb.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                            }
                                                        } else {
                                                            if ( //result.data.objPedido.CodOficina == "1110" ||
                                                                //result.data.objPedido.CodOficina == "1040" ||
                                                                result.data.objPedido.CodOficina == "1070") {
                                                                subLink = "DocImprCasa";
                                                                linkDoc = rutaImpresion + "DocImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                            } else {
                                                                subLink = "DocImpr";
                                                                linkDoc = rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                            }
                                                        }
                                                    } else {
                                                        if ( //result.data.objPedido.CodOficina == "1110" ||
                                                            //result.data.objPedido.CodOficina == "1040" ||
                                                            result.data.objPedido.CodOficina == "1070") {
                                                            subLink = "DocImprCasa";
                                                            linkDoc = rutaImpresion + "DocImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                        } else {
                                                            subLink = "DocImpr";
                                                            linkDoc = rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                        }
                                                    }
                                                }
                                            }
                                            ////////////////////////////////////////////////////////////////////
                                            $.cliente1 = result.data.correo;
                                            $.cantMat1 = result.data.objPedido.Detalle.length;
                                            $.subLink1 = subLink;
                                            self.fnPreviewPDF2(imprimirDoc.pNumPedido,"pdfViewerHTMLDocBus",sap.ui.getCore().byId("dlg_preview_pdfDocBus").getId());
                                            //var iframeCadena = '</object><iframe frameborder="0" style="-webkit-transform:scale(0.75);-moz-transform-scale(0.75);width: 100%; height: -webkit-fill-available;border: 0;" src="' + linkDoc + '"></iframe>';
                                            //sap.ui.getCore().byId("pdfViewerHTML").setContent(iframeCadena);
                                            sap.ui.getCore().byId("dlg_preview_pdfDocBus").open();
                                            ////////////////////////////////////////////////////////////////////
                                            /*self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el documento");
                                            self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                                            self.getView().getModel().refresh();
                                            self.getView().byId("dlg_MensajeAvisoGeneral").open();*/
                                        } else if (opcion2 == true) {
                                            var tipoDoc = result.data.objPedido.CodTipoDoc;
                                            if (tipoDoc == "Z001" || tipoDoc == "Z034" || tipoDoc == "Z003" ||
                                                tipoDoc == "Z004" || tipoDoc == "Z010") {
                                                if ((result.data.objPedido.CanalDist == "10" ||
                                                        result.data.objPedido.CanalDist == "30") &&
                                                    ( //result.data.objPedido.CodOficina == "1110" ||
                                                        //result.data.objPedido.CodOficina == "1040" ||
                                                        result.data.objPedido.CodOficina == "1070")) {
                                                    subLink = "DocPedEntImprCasa";
                                                    linkDoc = rutaImpresion + "DocPedEntImprCasa.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                } else {
                                                    subLink = "DocPedEntImpr";
                                                    linkDoc = rutaImpresion + "DocPedEntImpr.aspx?np=" + imprimirDoc.pNumPedido, "";
                                                }
                                                ////////////////////////////////////////////////////////////////////
                                                $.cliente1 = result.data.correo;
                                                $.cantMat1 = result.data.objPedido.Detalle.length;

                                                // NUEVO FRANZ
                                                var bdespacho = false;
                                                var bdalmacen = false
                                                for (var i = 0; i < result.data.objPedido.Detalle.length; i++) {
                                                    var item = result.data.objPedido.Detalle[i];
                                                    if (item.PrioridadEntrega === "01" || item.PrioridadEntrega === "02" || item.PrioridadEntrega === "04") {
                                                        bdespacho = true;
                                                    }

                                                    if (item.PrioridadEntrega === "03" || item.PrioridadEntrega === "05" || item.PrioridadEntrega === "06") {
                                                        bdalmacen = true;
                                                    }
                                                }

                                                if (bdespacho) {
                                                    $.TipoDetalle1 = "D";
                                                }

                                                if (bdalmacen) {
                                                    $.TipoDetalle1 = "A";
                                                }

                                                if (bdalmacen && bdespacho) {
                                                    $.TipoDetalle1 = "M";
                                                }

                                                if (!bdalmacen && !bdespacho) {
                                                    $.TipoDetalle1 = "-";
                                                }

                                                // NUEVO FRANZ
                                                $.subLink1 = subLink;
                                                self.fnPreviewPDF2(imprimirDoc.pNumPedido,"pdfViewerHTMLDocBus",sap.ui.getCore().byId("dlg_preview_pdfDocBus").getId());
                                                //var iframeCadena = '<iframe frameborder="0" style="-webkit-transform:scale(0.75);-moz-transform-scale(0.75);width: 100%; height: -webkit-fill-available;border: 0;" src="' + linkDoc + '"></iframe>';
                                                //sap.ui.getCore().byId("pdfViewerHTML").setContent(iframeCadena);
                                                sap.ui.getCore().byId("dlg_preview_pdfDocBus").open();
                                                /////////////////////////////////////////////////////////////////////
                                                /*self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el documento");
                                                self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                                                self.getView().getModel().refresh();
                                                self.getView().byId("dlg_MensajeAvisoGeneral").open();*/
                                            } else {
                                                self.crearDialogAviso("La impresión seleccionada solo es válida para pedidos Z001,Z034,Z003,Z004 y Z010");
                                                self.getView().getModel().refresh();
                                            }
                                        } else if (opcion3 == true) {
                                            sap.ui.core.BusyIndicator.hide();
                                            MessageToast.show("No se puede generar PDF de impresión termica");
                                            return;
                                            /*
                                            imprimirDoc.tipoImpresion="3";
                                            var resultado = imprimirServices.imprimirDocumento(imprimirDoc);
                                            if (resultado.c === "s")
                                            {
                                                if (resultado.data.success)
                                                {
                                                    self.getView().getModel().setProperty("/MensajeCorrecto", "El documento se mando a imprimir");
                                                    self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                                                    self.getView().getModel().refresh();
                                                    self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                                }
                                                else
                                                {
                                                    sap.m.MessageToast.show(result.data.errors.reason, {
                                                        duration: 3000
                                                    });
                                                }
                                            }
                                            */
                                        }
                                    }
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
                            //console.log(result.data);
                            sap.ui.core.BusyIndicator.hide();
                        },5000);
                } else {
                    MessageToast.show("Ingrese un Número, no letras ni símbolos");
                }
            } else {
                MessageToast.show("Ingrese un Número");
            }
        },
        ////////////////////////////////////////////////////////////////////
        // GENERACION DE PDF
        onOpenPreviewPDF: function () {
            sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgGeneracionDocBus"), "slide");
            this.obtenerLinkDoc();
        },
        onCerrarPrevisualizar: function () {
            sap.ui.getCore().byId("pdfViewerHTMLDocBus").setContent("");
            sap.ui.getCore().byId("pdfViewerFirmaDocBus").setContent("");
            var navCon = sap.ui.getCore().byId("navConPDFDocBus");
            navCon.to(sap.ui.getCore().byId("pgGeneracionDocBus"), "slide");
            sap.ui.getCore().byId("dlg_preview_pdfDocBus").close();
        },
        onGenerarPDFDoc: function () {
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDocBus");
            var asesor = this.getView().getModel().getProperty("/dataIni/person");
            var opcion1 = sap.ui.getCore().byId("opcion1DocBus").getSelected();
            var opcion2 = sap.ui.getCore().byId("opcion2DocBus").getSelected();
            var opcion3 = sap.ui.getCore().byId("opcion3DocBus").getSelected();
            if (imprimirDoc.pNumPedido != "") {
                if (utilString.isNumeric(imprimirDoc.pNumPedido)) {

                    $.AsesorCorreo1 = asesor.SapRouter;
                    $.NroPedido1 = imprimirDoc.pNumPedido;
                    $.FirmaPDF1 = "";
                    if (opcion1) {
                        $.TipoPDF1 = "0";
                        sap.ui.getCore().byId("txtAsuntoCorreoDocBus").setValue("DECOR CENTER");
                        sap.ui.getCore().byId("txtCuerpoCorreoDocBus").setValue("Estimado Cliente: \n" +
                            "Agradecemos su visita a nuestra tienda, estamos contentos de ser parte de su proyecto, adjunto encontrará la cotización y/o pedido de venta. \n" +
                            "Si desea contactarse con el asesor, por favor enviar su comunicación al correo " + $.AsesorCorreo1 + " \n" +
                            "Saludos." + "\n\n" + window.dataIni.person.Descripcion);
                        sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgCorreoDocBus"), "slide");
                        //this.fnGenZoneSing();
                        //this.fnGenPDF(imprimirDoc.pNumPedido, Asesor.Email, "0", "");
                    }

                    if (opcion2) {
                        $.TipoPDF1 = "1";
                        var nPed = parseInt(imprimirDoc.pNumPedido) ;
                        sap.ui.getCore().byId("txtAsuntoCorreoDocBus").setValue("CONDICIONES DE ENTREGA DIGITAL DECOR CENTER"+" "+nPed);
                        sap.ui.getCore().byId("txtCuerpoCorreoDocBus").setValue("Estimado Cliente: \n" +
                            "Agradecemos su visita a nuestra tienda, estamos contentos de ser parte de su proyecto, adjunto encontrará las condiciones de entrega digital vistas en tienda. \n" +
                            "Si desea contactarse con el asesor, por favor enviar su comunicación al correo " + $.AsesorCorreo1 + " \n" +
                            "Saludos." + "\n\n" + window.dataIni.person.Descripcion);
                        sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgFirmaDocBus"), "slide");
                        this.fnGenZoneSing();
                    }

                } else {
                    MessageToast.show("Ingrese un Número, no letras ni símbolos");
                }
            } else {
                MessageToast.show("Ingrese un Número");
            }
        },
        onGenerarPDFDocFirmado: function () {
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDocBus");
            var Asesor = this.getView().getModel().getProperty("/dataIni/person");
            var opcion1 = sap.ui.getCore().byId("opcion1DocBus").getSelected();
            var opcion2 = sap.ui.getCore().byId("opcion2DocBus").getSelected();
            var opcion3 = sap.ui.getCore().byId("opcion3DocBus").getSelected();
            var canvas = document.getElementById('canvasFirmaPDF');
            //$.FirmaPDF = canvas.toDataURL('image/jpeg', 0.5);
            $.FirmaPDF1 = canvas.toDataURL();
            this.fnPreviewPDF($.NroPedido1, $.TipoPDF1, $.FirmaPDF1, $.cantMat1);
            //var navCon = this.getView().byId("navConPDF");
            //navCon.to(this.getView().byId("pgCorreo"), "slide");
        },
        onGenerarPDFDocFirmadoSend: function () {
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDocBus");
            var Asesor = this.getView().getModel().getProperty("/dataIni/person");
            var opcion1 = sap.ui.getCore().byId("opcion1DocBus").getSelected();
            var opcion2 = sap.ui.getCore().byId("opcion2DocBus").getSelected();
            var opcion3 = sap.ui.getCore().byId("opcion3DocBus").getSelected();
            var canvas = document.getElementById('canvasFirmaPDF');
            var navCon = sap.ui.getCore().byId("navConPDFDocBus");
            navCon.to(sap.ui.getCore().byId("pgCorreoDocBus"), "slide");
        },
        onEnviarPDF: function () {
            var Asunto = sap.ui.getCore().byId("txtAsuntoCorreoDocBus").getValue();
            var Cuerpo = sap.ui.getCore().byId("txtCuerpoCorreoDocBus").getValue();
            this.fnGenPDF($.NroPedido1, $.cliente1, $.AsesorCorreo1, $.TipoPDF1, $.FirmaPDF1, Asunto, Cuerpo, $.cantMat1);
        },
        fnGenZoneSing: function () {
            var movimientos = new Array();
            var pulsado;
            function repinta() {
                var canvas = document.getElementById('canvasFirmaPDF');
                var context = canvas.getContext("2d");
                canvas.width = canvas.width; // Limpia el lienzo
                context.strokeStyle = "#000000";
                context.lineJoin = "round";
                context.lineWidth = 3;
                //context.fillStyle = "white";
                //context.fillRect(0, 0, canvas.width, canvas.height);
                for (var i = 0; i < movimientos.length; i++) {
                    context.beginPath();
                    if (movimientos[i][2] && i) {
                        context.moveTo(movimientos[i - 1][0], movimientos[i - 1][1]);
                    } else {
                        context.moveTo(movimientos[i][0], movimientos[i][1]);
                    }
                    context.lineTo(movimientos[i][0], movimientos[i][1]);
                    context.closePath();
                    //context.fill();
                    context.stroke();
                }
            }
            function CrearLienzo() {
                var canvasDiv = document.getElementById('lienzo');
                var canvas = document.createElement('canvas');
                canvas.setAttribute('width', 610);
                canvas.setAttribute('height', 200);
                canvas.setAttribute('id', 'canvasFirmaPDF');
                canvasDiv.appendChild(canvas);
                if (typeof G_vmlCanvasManager != 'undefined') {
                    canvas = G_vmlCanvasManager.initElement(canvas);
                }
                var context = canvas.getContext("2d");
                context.beginPath();
                function calcularCanvas(canvas) {
                    var ratio = Math.max(window.devicePixelRatio || 1, 1);
                    canvas.height = canvas.offsetHeight * ratio;
                    canvas.width = canvas.offsetWidth * ratio;
                    canvas.getContext("2d").scale(ratio, ratio);
                    var ctx = canvas.getContext("2d");
                    ctx.beginPath();
                    ctx.fillStyle = "red";
                    ctx.fill();
                }
                this.signaturePad = new SignaturePad(canvas);
                calcularCanvas(canvas);
            }
            sap.ui.getCore().byId("pdfViewerFirmaDocBus").setContent('<div id="lienzo" style="width: 610px; height: 200px; background: #fff;"></div>');
            setTimeout(function () {
                CrearLienzo();
            }, 200);
        },
        openFormCorreo: function (Asunto, Cuerpo) {
            var oRichTextEditor = new RTE("EditorCuerpoCorreo", {
                editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
                width: "100%",
                height: "500pc",
                customToolbar: true,
                showGroupFont: true,
                tooltip: "My RTE Tooltip",
                value: Cuerpo
            });
        },
        fnLimpiarFirma: function () {
            var canvas = document.getElementById("canvasFirmaPDF");
            if (canvas) {
                var ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                //$('#lienzo').remove();
                $('#canvasFirmaPDF').remove();
                this.fnGenZoneSing();
            }
        },
        fnGenPDF: function (cotizacion, cliente, asesor, tipo, imagen, asunto, cuerpo, cantidad) {
            var rutaImpresion = window.RootImprimir; //"http://ventas.decor-center.com/DecorQAs/";
            var self = this;
            if (cliente == "" || cliente == undefined) {
                return MessageToast.show("No se puede enviar correo, ya que el Documento no cuenta con correo de cliente.");
            }
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                documentosServices.enviarPDF(cotizacion, cliente, asesor, tipo, imagen, asunto, cuerpo, cantidad, $.TipoDetalle1,$.subLink1, function (resultCorreo) {
                    sap.ui.core.BusyIndicator.hide();
                    if (resultCorreo.c === "s") {
                        sap.ui.getCore().byId("dlg_preview_pdfDocBus").close();
                        sap.m.MessageToast.show("Correo enviado correctamente", {
                            duration: 3000
                        });
                        sap.ui.getCore().byId("dlg_DocBuscarLista").open();
                    } else {

                        sap.m.MessageToast.show(resultCorreo.m, {
                            duration: 3000
                        });
                    }
                });
            }, 500);
        },
        fnPreviewPDF: function (cotizacion, tipo, imagen, cantidad) {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                documentosServices.previsualizarPDF(cotizacion, tipo, imagen, cantidad, $.TipoDetalle1,$.subLink1, function (resultCorreo) {
                    sap.ui.core.BusyIndicator.hide();
                    if (resultCorreo.c === "s") {
                        sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgPrevisualizacionDocBus"), "slide");
                        var iframeCadena = '<div class="embed-responsive" style="height:'+$("#pgPrevisualizacionDocBus").height()+'px">'+
                                                '<object data="'+resultCorreo.data+'" type="application/pdf" width="100%" height="'+$("#pgPrevisualizacionDocBus").height()+'px"/>'+
                                            '</div>'; //'<iframe frameborder="0" style="width: 100%; height: -webkit-fill-available;border: 0;" src="' + resultCorreo.data + '"></iframe>';
                        window.pdfPreviewFirmadoBuscar = iframeCadena;
                        sap.ui.getCore().byId("pdfViewerHTML2DocBus").setContent(iframeCadena);
                        /*sap.m.MessageToast.show("Correo generado correctamente", {
                            duration: 3000
                        });*/
                    } else {
                        sap.m.MessageToast.show(resultCorreo.responseText, {
                            duration: 3000
                        });
                    }
                });
            }, 500);
        },
        fnPreviewPDF2: function (cotizacion,iframeContentId,idSeccion) {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                documentosServices.previsualizarPDF(cotizacion, "1", "", 1, $.TipoDetalle1,$.subLink1, function (resultCorreo) {
                    sap.ui.core.BusyIndicator.hide();
                    if (resultCorreo.c === "s") {

                        var iframeCadena = '<div class="embed-responsive" style="height:'+$("#"+idSeccion).height()+'px">'+
                                                '<object data="'+resultCorreo.data+'" type="application/pdf" width="100%" height="'+$("#"+idSeccion).height()+'px"/>'+
                                            '</div>'; //'<iframe frameborder="0" style="width: 100%; height: -webkit-fill-available;border: 0;" src="' + resultCorreo.data + '"></iframe>';
                        window.pdfPreviewBuscar = iframeCadena;
                        sap.ui.getCore().byId(iframeContentId).setContent(iframeCadena);
                    } else {
                        sap.m.MessageToast.show(resultCorreo.responseText, {
                            duration: 3000
                        });
                    }
                });
            }, 500);
        },
        onVolverPgFirma: function () {
            var opcion1 = sap.ui.getCore().byId("opcion1DocBus").getSelected();
            var opcion2 = sap.ui.getCore().byId("opcion2DocBus").getSelected();
            var opcion3 = sap.ui.getCore().byId("opcion3DocBus").getSelected();
            if (opcion1 == true) {
                sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgCorreoDocBus"), "slide");
            }
            if (opcion2 == true) {
                sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgGeneracionDocBus"), "slide");
                sap.ui.getCore().byId("pdfViewerHTML").setContent(window.pdfPreviewBuscar);
            }
        },
        onVolverPgPrevisualizacion: function () {
            sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgFirmaDocBus"), "slide");
        },
        onVolverPgCorreo: function () {
            var opcion1 = sap.ui.getCore().byId("opcion1DocBus").getSelected();
            var opcion2 = sap.ui.getCore().byId("opcion2DocBus").getSelected();
            var opcion3 = sap.ui.getCore().byId("opcion3DocBus").getSelected();
            if (opcion1 == true) {
                sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgGeneracionDocBus"), "slide");
                sap.ui.getCore().byId("pdfViewerHTML").setContent(window.pdfPreviewBuscar);
            }
            if (opcion2 == true) {
                sap.ui.getCore().byId("navConPDFDocBus").to(sap.ui.getCore().byId("pgPrevisualizacionDocBus"), "slide");
                sap.ui.getCore().byId("pdfViewerHTML2").setContent(window.pdfPreviewFirmadoBuscar);
            }
        }
        //End Envio PDF
    });
});