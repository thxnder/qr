sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "pe/com/seidor/sap/decor/ventas/util/utilString",
    "pe/com/seidor/sap/decor/ventas/services/quejaServices",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/imprimirServices",
    "sap/m/MessageToast",
    "pe/com/seidor/sap/decor/ventas/services/documentosServices",
    'sap/m/Button',
    'sap/m/Dialog',
    'sap/m/Text',
    'jquery.sap.global'
], function (Controller, UIComponent, utilString, quejaServices, JSONModel, imprimirServices, MessageToast, documentosServices, Button, Dialog, Text, jQuery) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Home", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
            var date = new Date();
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = date.getDate().toString();
            var fechaActual = yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding 
            ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
            utilString.prepareDataIni();
            var oData = {
                modelInstala: {
                    "pedido1": "",
                    "pedido2": "",
                    "pedido3": "",
                    "pedido4": "",
                    "cotiza1": "",
                    "cotiza2": "",
                    "cotiza3": "",
                    "pedvisi": ""
                },
                datosQueja: {
                    "NumQueja": "",
                    "CodCli": "",
                    "NomCliente": "",
                    "Calles": "",
                    "Ubicacion": "",
                    "Telefono": "",
                    "OfiVenta": "",
                    "TextoQueja": "",
                    "ADRNR": "",
                    "pNumeroReclamo": "",
                    "pCodigoCliente": "",
                    "pFechaCreacionI": fechaActual,
                    "pFechaCreacionF": fechaActual
                },
                imprimirDoc: {
                    "pNumPedido": "",
                    "tipoImpresion": "0",
                    "accion": "ver"
                },
                imprimirRec: {
                    "pNumeroReclamo": ""
                },
                imprimirQue: {
                    "pNumeroQueja": "",
                    "accion": "verbusqueja"
                }
            };

            if (oEvent.getParameter("name") === "appHome") {
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().setProperty("/dataIni/user/User", window.dataIni.user.User);
                if (window.IsDocInstalacion) {
                    this.getView().byId("dlg_DialogDocInstalacion").open();
                }
                this.getView().getModel().refresh(true);
                if(window.numeroDocumento){
                    this.getView().getModel().setProperty("/imprimirDoc/pNumPedido", window.numeroDocumento);
                }
                if (window.imprimirDoc) {
                    //////////////Número referencia (Doc Buscar) //////
                    this.getView().getModel().setProperty("/imprimirDoc/pNumPedido", window.numeroDocumento);
                    ///////////////////////////////////////////////////
                    this.goDocImprimir();
                } else {
                    this.onCloseDocImprimir();
                }
                this.getView().byId("opcion1").setSelected(true);
                //Inicio Oficina Alterna
                if(window.OficinaAlterna==true){
                    this.openDialogOficinaAlterna();
                }
                //End Oficina Alterna
            }
        },
        //Inicio Oficina Alterna
        openDialogOficinaAlterna: function(){
                var dialog = new Dialog({
                    title: 'Elegir Oficina de Venta',
                    content: new sap.m.List({
                        id:"listaOfiAlterno",
                        mode: "SingleSelectMaster",
                        items: {
                            path: '/dataIni/lstUsuOfVen',
                            template: new sap.m.StandardListItem({
                                title: "Oficina de Venta : {Ofventa}",
                                counter: "{Quantity}"
                            })
                        }
                    }),
                beginButton: new Button({
                    text: 'Si',
                    type: 'Accept',
                    press: function() {
                        if(sap.ui.getCore().byId("listaOfiAlterno").getSelectedItem()==null){
                            MessageToast.show("Elgir una Oficina de Venta");
                        }else{
                            var objeto = sap.ui.getCore().byId("listaOfiAlterno").getSelectedItem().getBindingContext().getObject();
                            window.dataIni.person.OfVentas = objeto.Ofventa;
                            localStorage.setItem("dataIni",JSON.stringify(window.dataIni));
                            console.log("Nuevo DataIni"+window.dataIni);
                            window.OficinaAlterna = false;
                            dialog.destroy();
                        }
                    }.bind(this)
                }),
                endButton: new Button({
                    text: 'No',
                    type: 'Reject',
                    press: function() {
                        window.OficinaAlterna = false;
                        dialog.destroy();
                    }.bind(this)
                }),
                });
                //to get access to the global model
                this.getView().addDependent(dialog);
                dialog.open();
        },
        //End Oficina Alterna
        //Documentos----------------------
        goDocNuevo: function (oEvent) {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                // sap.ui.core.BusyIndicator.show();
                ///////////////////////////////////////////////
                window.IsDocModificar = false;
                window.converPedido = false;
                window.IsDocNuevo = true;
                ///////////////////////////////////////////////
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocNuevo");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goDocModificar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                window.IsDocBuscarModificar = true;
                window.IsDocNuevo = false;
                window.IsDocModificar = true;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocModificar");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goDocVisualizar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            window.IsDocVisualizar = true;
            window.IsDocNuevo = false;
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocVisualizar");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goDocBuscar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            window.IsDocNuevo = false;
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocBuscar");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goDocInstalacion: function (oEvent) {
            utilString.destruirFragmentsTotal();
            window.IsDocInstalacion = false;
            window.IsDocNuevo = false;
            this.getView().byId("dlg_DialogDocInstalacion").open();
        },
        goDocFlujo: function (oEvent) {
            utilString.destruirFragmentsTotal();
            window.IsDocNuevo = false;
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appDocFlujo");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goDocImprimir: function () {
            utilString.destruirFragmentsTotal();
            var usu_ser = this.getView().getModel().getProperty("/dataIni/person/UsuarioServ");
            if (usu_ser == "X") {
                sap.m.MessageToast.show("El usuario no tiene permiso para esta opcion", {
                    duration: 3000
                });
                return;
            } else {
                this.getView().byId("dlg_doc_impresion").open();
            }

        },
        onCloseDocImprimir: function () {
            window.imprimirDoc = false;
            this.getView().byId("dlg_doc_impresion").close();
        },
        //Stock------------------------------
        goStockDisponible: function (oEvent) {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                window.IsDocModificar = false;
                window.IsDocNuevo = false;
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appStockDisponible");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goStockporLlegar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appStockporLlegar");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goStockporPedir: function (oEvent) {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appStockporPedir");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goPedComprometidos: function () {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appPedComprometidos");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        //Reclamos----------------------------
        goRecNuevo: function (oEvent) {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecNuevo");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goRecModificar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            window.isRecModificar = false;
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecModificar");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goRecVisualizar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecVisualizar");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goRecBuscar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appRecBuscar");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        goRecImprimir: function () {
            utilString.destruirFragmentsTotal();
            this.getView().byId("dlg_rec_impresion").open();
        },
        onCloseRecImprimir: function () {
            this.getView().byId("dlg_rec_impresion").close();
        },
        limpiarCamposQuejas: function () {
            var date = new Date();
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
            var dd = date.getDate().toString();
            var fechaActual = yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
            this.getView().getModel().setProperty("/datosQueja/NumQueja", "");
            this.getView().getModel().setProperty("/datosQueja/CodCli", "");
            this.getView().getModel().setProperty("/datosQueja/NomCliente", "");
            this.getView().getModel().setProperty("/datosQueja/Calles", "");
            this.getView().getModel().setProperty("/datosQueja/Ubicacion", "");
            this.getView().getModel().setProperty("/datosQueja/Telefono", "");
            this.getView().getModel().setProperty("/datosQueja/OfiVenta", "");
            this.getView().getModel().setProperty("/datosQueja/TextoQueja", "");
            this.getView().getModel().setProperty("/datosQueja/ADRNR", "");
            this.getView().getModel().setProperty("/datosQueja/pNumeroReclamo", "");
            this.getView().getModel().setProperty("/datosQueja/TextoQueja", "");
            this.getView().getModel().setProperty("/datosQueja/pCodigoCliente", "")
            this.getView().getModel().setProperty("/datosQueja/pFechaCreacionI", fechaActual);
            this.getView().getModel().setProperty("/datosQueja/pFechaCreacionF", fechaActual);
        },
        //Quejas------------------------------
        goQueNuevo: function (oEvent) {
            utilString.destruirFragmentsTotal();
            this.limpiarCamposQuejas();
            this.getView().byId("dlg_QueNuevo").open();
        },
        onCloseDlg_QueNuevo: function () {
            this.getView().byId("dlg_QueNuevo").close();
        },
        goQueModificar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            this.limpiarCamposQuejas();
            this.getView().byId("dlg_QueModificar").open();
            this.getView().byId("dlg_QueModificar").close();
            this.getView().byId("dlg_QueModificar").open();
        },
        onCloseDlg_QueModificar: function () {
            this.getView().byId("dlg_QueModificar").close();
        },
        goQueVisualizar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            this.limpiarCamposQuejas();
            this.getView().byId("dlg_QueVisualizar").open();
        },
        onCloseDlg_QueVisualizar: function () {
            this.getView().byId("dlg_QueVisualizar").close();
            this.getView().byId("dlg_QueBuscar").close();
            this.getView().byId("dlg_QueBuscarLista").close();
        },
        goQueBuscar: function (oEvent) {
            utilString.destruirFragmentsTotal();
            this.limpiarCamposQuejas();
            this.getView().byId("dlg_QueBuscar").open();
        },
        onCloseDlg_QueBuscar: function () {
            this.getView().byId("dlg_QueBuscar").close();
        },
        onOpenDlg_QueBuscarLista: function () {
            this.limpiarCamposQuejas();
            this.getView().byId("dlg_QueBuscarLista").open();
        },
        onCloseDlg_QueBuscarLista: function () {
            this.getView().byId("dlg_QueBuscarLista").close();
        },
        goQueImprimir: function () {
            utilString.destruirFragmentsTotal();
            this.getView().byId("dlg_que_impresion").open();
        },
        onCloseQueImprimir: function () {
            this.getView().byId("dlg_que_impresion").close();
        },
        /////////Inicio Instalacion////////////////////////       
        MensajeAvisoInformativo: function (mensaje) {
            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({
                    text: mensaje
                }),
                beginButton: new Button({
                    text: 'Ok',
                    type: 'Accept',
                    press: function () {
                        dialog.destroy();
                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this)
                }),
                afterClose: function () {
                    dialog.destroy();
                    sap.ui.core.BusyIndicator.hide();
                }
            });

            dialog.open();


        },
        MensajeAvisoInstalacion: function (mensaje, pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita) {

            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({
                    text: mensaje
                }),
                beginButton: new Button({
                    text: 'Si',
                    type: 'Accept',
                    press: function () {
                        var self = this;
                        dialog.destroy();
                        sap.ui.core.BusyIndicator.show(0);
                        setTimeout(function () {
                            documentosServices.crearInstalacion(pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita, function (result) {
                                sap.ui.core.BusyIndicator.show(0);
                                if (result.c === "s") {
                                    if (result.data.success) {
                                        self.getView().getModel().setProperty("/resultIntala", result.data.result);
                                        self.getView().getModel().refresh();
                                        window.pedidoInstalacion = result.data.numPedido;
                                        window.IsDocInstalacion = false;
                                        self.getView().getModel().refresh();
                                        self.getView().byId("dlg_DialogDocInstalacion").close();
                                        self.getView().byId("dlg_MensajeAvisoInstalacion").open();
                                    } else {
                                        sap.m.MessageToast.show(result.data.result, {
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
                        }, 200);

                    }.bind(this)
                }),
                endButton: new Button({
                    text: 'No',
                    type: 'Reject',
                    press: function () {
                        dialog.destroy();
                        sap.ui.core.BusyIndicator.hide();
                    }.bind(this)
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();


        },
        onContinuarDlg_DialogDocInstalacion: function () {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var pedido1 = self.getView().getModel().getProperty("/modelInstala/pedido1");
                var pedido2 = self.getView().getModel().getProperty("/modelInstala/pedido2");
                var pedido3 = self.getView().getModel().getProperty("/modelInstala/pedido3");
                var pedido4 = self.getView().getModel().getProperty("/modelInstala/pedido4");
                var cotiza1 = self.getView().getModel().getProperty("/modelInstala/cotiza1");
                var cotiza2 = self.getView().getModel().getProperty("/modelInstala/cotiza2");
                var cotiza3 = self.getView().getModel().getProperty("/modelInstala/cotiza3");
                var pedvisi = self.getView().getModel().getProperty("/modelInstala/pedvisi");
                var tipo_visita = self.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey();
                //07 ILUMINACION
                //01 REV BLANDOS
                //02 REV DUROS
                //03 HIDRO
                //06 ELECTRO COCINA
                //08 CORTINAS

                ///Inicio Mejora Instalacion 15-01-2017///////////////////////////////////
                if (tipo_visita == "03" || tipo_visita == "06" || tipo_visita == "07") {
                    if (pedido1 == "") {
                        return self.MensajeAvisoInformativo("Falta Pedido de Venta 1");
                    }
                    if (cotiza1 == "" && pedvisi != "") {
                        return self.MensajeAvisoInstalacion("No ha ingresado cotización de Servicio N°1. ¿Desea Continuar?", pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita);
                    }
                    if (cotiza1 != "" && pedvisi == "") {
                        return self.MensajeAvisoInstalacion("No ha ingresado pedido de visita. ¿Desea Continuar?", pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita);
                    }
                    if (cotiza1 == "" && pedvisi == "") {
                        return self.MensajeAvisoInstalacion("No ha ingresado cotización de Servicio N°1 y pedido de visita. ¿Desea Continuar?", pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita);
                    }

                }
                if (tipo_visita == "01") {
                    if (pedido1 == "" && cotiza1 != "") {
                        return self.MensajeAvisoInformativo("Falta Pedido de Venta 1 ");
                    }
                    if (pedido1 != "" && cotiza1 == "") {
                        return self.MensajeAvisoInformativo("Falta Cotización de Servicio 1");
                    }
                    if (pedido1 == "" && cotiza1 == "") {
                        return self.MensajeAvisoInformativo("Falta Pedido de Venta 1 y Falta Cotización de Servicio 1");
                    }
                    if (pedvisi == "") {
                        return self.MensajeAvisoInformativo("No ha ingresado pedido de visita");
                    }
                }
                if (tipo_visita == "08") {
                    if (pedido1 == "") {
                        return self.MensajeAvisoInformativo("Falta Pedido de Venta 1");
                    }
                    if (cotiza1 == "" && pedvisi != "") {
                        return self.MensajeAvisoInstalacion("No ha ingresado cotización de Servicio N°1. ¿Desea Continuar?", pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita);
                    }
                    if (cotiza1 != "" && pedvisi == "") {
                        return self.MensajeAvisoInstalacion("No ha ingresado pedido de visita. ¿Desea Continuar?", pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita);
                    }
                    if (cotiza1 == "" && pedvisi == "") {
                        return self.MensajeAvisoInstalacion("No ha ingresado cotización de Servicio N°1 y pedido de visita. ¿Desea Continuar?", pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita);
                    }
                }

                //avisoMensajeInsalacion
                ///End Mejora Instalacion 15-01-2017//////////////////////////////////////{
                if (tipo_visita == "") {
                    sap.m.MessageToast.show("Ingresar Tipo de Visita", {
                        duration: 3000
                    });
                    sap.ui.core.BusyIndicator.hide();
                    return;
                } else if (pedido1 == "" && pedido2 == "" && pedido3 == "" && pedido4 == "") {
                    sap.m.MessageToast.show("Falta ingresar el pedido de venta", {
                        duration: 3000
                    });
                    sap.ui.core.BusyIndicator.hide();
                    return;
                }
                //var result = documentosServices.crearInstalacion(pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi,tipo_visita);
                documentosServices.crearInstalacion(pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi, tipo_visita, function (result) {
                    sap.ui.core.BusyIndicator.hide();
                    if (result.c === "s") {
                        if (result.data.success) {
                            self.getView().getModel().setProperty("/resultIntala", result.data.result);
                            self.getView().getModel().refresh();
                            window.pedidoInstalacion = result.data.numPedido;
                            window.IsDocInstalacion = false;
                            self.getView().getModel().refresh();
                            self.getView().byId("dlg_DialogDocInstalacion").close();
                            self.getView().byId("dlg_MensajeAvisoInstalacion").open();
                        } else {
                            sap.m.MessageToast.show(result.data.result, {
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
            }, 2000);
        },
        onOkMensajeInstalacion: function () {
            this.getView().byId("dlg_MensajeAvisoInstalacion").close();
            if (window.pedidoInstalacion) {
                var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                    oRouter.navTo("appDocModificar");
                    sap.ui.core.BusyIndicator.hide();
                }, 200);
            }
        },
        onCancelDlg_DialogDocInstalacion: function () {
            window.IsDocInstalacion = false;
            this.getView().getModel().refresh();
            this.getView().byId("dlg_DialogDocInstalacion").close();
        },
        ////////Fin Instalacion////////////////////////////
        //Usuario-----------------------------
        goUsuInformacion: function (oEvent) {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(self);
                oRouter.navTo("appUsuInformacion");
                sap.ui.core.BusyIndicator.hide();
            }, 200);
        },
        validarOnImprimirDoc: function(){
            var self = this;
            var imprimirDoc = self.getView().getModel().getProperty("/imprimirDoc");
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
        crearDialogAviso: function(data) {  
            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({ text: data }),
                beginButton: new Button({
                    text: 'OK',
                    type: 'Accept',
                    press: function () {  
                        dialog.destroy();
                    }.bind(this)
                }),
                afterClose: function() {
                    dialog.destroy();
                }.bind(this)
            });

            dialog.open();
        },
        ///////////////Imprimir/////////////////////////////////////////////////////////
        //////////Imprimir Documento/////////////////////////////////////////
        onImprimirDoc: function () {
            var self = this;
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDoc");
            if(imprimirDoc.pNumPedido.length>10 || imprimirDoc.pNumPedido==""){
                MessageToast.show("Ingrese un número de Documento correcto.");
                return;
            }
            imprimirDoc.pNumPedido = utilString.pad(imprimirDoc.pNumPedido, 10);
            if (imprimirDoc.pNumPedido != "") {
                if (utilString.isNumeric(imprimirDoc.pNumPedido)) {
                    //var result = imprimirServices.imprimirDocumento(imprimirDoc);
                    var opcion1 = this.getView().byId("opcion1").getSelected();
                    var opcion2 = this.getView().byId("opcion2").getSelected();
                    var opcion3 = this.getView().byId("opcion3").getSelected();
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
                                        self.getView().getModel().setProperty("/MensajeCorrecto", "No se puede imprimir por bloqueo de factura");
                                        self.getView().byId("txt_aviso_general").bindProperty("text", {
                                            path: "/MensajeCorrecto"
                                        });
                                        self.getView().getModel().refresh();
                                        self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                    } else {
                                        if (opcion1 == true) {
                                            if (tipoDoc == "Z036") {
                                                if (result.data.objPedido.CanalDist == "30") {
                                                    if (result.data.objPedido.CodOficina == "1140") {
                                                        window.open(rutaImpresion + "DocImprVisDE.aspx?np=" + imprimirDoc.pNumPedido);
                                                    } else {
                                                        window.open(rutaImpresion + "DocImpVisitas.aspx?np=" + imprimirDoc.pNumPedido);
                                                    }
                                                } else if (result.data.objPedido.CanalDist == "20") {
                                                    if (result.data.objPedido.CodOficina == "1130") {
                                                        window.open(rutaImpresion + "DocImprVisUF.aspx?np=" + imprimirDoc.pNumPedido);
                                                    } else {
                                                        window.open(rutaImpresion + "DocImprVisFA.aspx?np=" + imprimirDoc.pNumPedido);
                                                    }
                                                } else {
                                                    if ( //result.data.objPedido.CodOficina == "1110" ||
                                                        //result.data.objPedido.CodOficina == "1040" ||
                                                        result.data.objPedido.CodOficina == "1070") {
                                                        window.open(rutaImpresion + "DocImprVisCasa.aspx?np=" + imprimirDoc.pNumPedido);
                                                    } else {
                                                        window.open(rutaImpresion + "DocImpVisitas.aspx?np=" + imprimirDoc.pNumPedido);
                                                    }
                                                }
                                            } else {
                                                if (result.data.objPedido.CanalDist == "30") {
                                                    if (result.data.objPedido.CodOficina == "1140") {
                                                        var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");
                                                        if (fechaz <= fechap) {
                                                            window.open(rutaImpresion + "DocImprGrpAmbDE.aspx?np=" + imprimirDoc.pNumPedido);
                                                        } else {
                                                            window.open(rutaImpresion + "DocImprDE.aspx?np=" + imprimirDoc.pNumPedido);
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
                                                                window.open(rutaImpresion + "DocImprGrpAmb.aspx?np=" + imprimirDoc.pNumPedido);
                                                            } else {
                                                                window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido);
                                                            }
                                                        } else {
                                                            window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido);
                                                        }
                                                    }
                                                } else if (result.data.objPedido.CanalDist == "20") {
                                                    if (result.data.objPedido.CodOficina == "1130") {
                                                        window.open(rutaImpresion + "DocImprUF.aspx?np=" + imprimirDoc.pNumPedido);
                                                    } else {
                                                        window.open(rutaImpresion + "DocImprFA.aspx?np=" + imprimirDoc.pNumPedido);
                                                    }
                                                } else {
                                                    if (tipoDoc == "ZO01" || tipoDoc == "Z001") {
                                                        var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");//2016-01-19
                                                        if (fechaz <= fechap) {
                                                            if ( //result.data.objPedido.CodOficina == "1110" ||
                                                                //result.data.objPedido.CodOficina == "1040" ||
                                                                result.data.objPedido.CodOficina == "1070") {
                                                                window.open(rutaImpresion + "DocImprGrpAmbCasa.aspx?np=" + imprimirDoc.pNumPedido);
                                                            } else {
                                                                window.open(rutaImpresion + "DocImprGrpAmb.aspx?np=" + imprimirDoc.pNumPedido)
                                                            }
                                                        } else {
                                                            if ( //result.data.objPedido.CodOficina == "1110" ||
                                                                //result.data.objPedido.CodOficina == "1040" ||
                                                                result.data.objPedido.CodOficina == "1070") {
                                                                window.open(rutaImpresion + "DocImprCasa.aspx?np=" + imprimirDoc.pNumPedido);
                                                            } else {
                                                                window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido);
                                                            }
                                                        }
                                                    } else {
                                                        if ( //result.data.objPedido.CodOficina == "1110" ||
                                                            //result.data.objPedido.CodOficina == "1040" ||
                                                            result.data.objPedido.CodOficina == "1070") {
                                                            window.open(rutaImpresion + "DocImprCasa.aspx?np=" + imprimirDoc.pNumPedido);
                                                        } else {
                                                            window.open(rutaImpresion + "DocImpr.aspx?np=" + imprimirDoc.pNumPedido);
                                                        }
                                                    }
                                                }
                                            }
                                            self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el documento");
                                            self.getView().byId("txt_aviso_general").bindProperty("text", {
                                                path: "/MensajeCorrecto"
                                            });
                                            self.getView().getModel().refresh();
                                            self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                        } else if (opcion2 == true) {
                                            var tipoDoc = result.data.objPedido.CodTipoDoc;
                                            if (tipoDoc == "Z001" || tipoDoc == "Z034" || tipoDoc == "Z003" ||
                                                tipoDoc == "Z004" || tipoDoc == "Z010") {
                                                if ((result.data.objPedido.CanalDist == "10" ||
                                                        result.data.objPedido.CanalDist == "30") &&
                                                    ( //result.data.objPedido.CodOficina == "1110" ||
                                                        //result.data.objPedido.CodOficina == "1040" ||
                                                        result.data.objPedido.CodOficina == "1070")) {
                                                    window.open(rutaImpresion + "DocPedEntImprCasa.aspx?np=" + imprimirDoc.pNumPedido);
                                                } else {
                                                    window.open(rutaImpresion + "DocPedEntImpr.aspx?np=" + imprimirDoc.pNumPedido);
                                                }
                                                self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el documento");
                                                self.getView().byId("txt_aviso_general").bindProperty("text", {
                                                    path: "/MensajeCorrecto"
                                                });
                                                self.getView().getModel().refresh();
                                                self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                            } else {
                                                self.getView().getModel().setProperty("/MensajeCorrecto", "La impresión seleccionada solo es válida para pedidos Z001,Z034,Z003,Z004 y Z010");
                                                self.getView().byId("txt_aviso_general").bindProperty("text", {
                                                    path: "/MensajeCorrecto"
                                                });
                                                self.getView().getModel().refresh();
                                                self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                            }
                                        } else if (opcion3 == true) {
                                            imprimirDoc.tipoImpresion = "3";
                                            //var result2 = imprimirServices.imprimirDocumentoSync(imprimirDoc);
                                            imprimirServices.imprimirDocumento(imprimirDoc, function (result2) {
                                                if (result2.c === "s") {
                                                    if (result2.data.success) {
                                                        self.getView().getModel().setProperty("/MensajeCorrecto", "El documento se mando a imprimir");
                                                        self.getView().byId("txt_aviso_general").bindProperty("text", {
                                                            path: "/MensajeCorrecto"
                                                        });
                                                        self.getView().getModel().refresh();
                                                        self.getView().byId("dlg_MensajeAvisoGeneral").open();
                                                    } else {
                                                        sap.m.MessageToast.show(result2.data.errors.reason, {
                                                            duration: 3000
                                                        });
                                                    }
                                                }else {
                                                    sap.m.MessageToast.show(result2.m, {
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
        ////////////////////////////////////////////////////////////////////
        //////////Imprimir Reclamo/////////////////////////////////////////
        onImprimirRec: function () {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
                var imprimirRec = self.getView().getModel().getProperty("/imprimirRec");
                if (imprimirRec.pNumeroReclamo != "") {
                    if (utilString.isNumeric(imprimirRec.pNumeroReclamo)) {

                        //var result = imprimirServices.imprimirReclamo(imprimirRec);
                        imprimirServices.imprimirReclamo(imprimirRec, function (result) {
                            sap.ui.core.BusyIndicator.hide();
                            var rutaImpresion = window.RootImprimir; //"http://ventas.decor-center.com/DecorQAs/";

                            if (result.c === "s") {
                                if (result.data.success) {
                                    if (result.data.objReclamo.Contactos.VTWEG == "30") {
                                        if (result.data.objReclamo.Contactos.VKBUR == "1140") {
                                            window.open(rutaImpresion + "ImprReclamoDE.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                                        } else {
                                            window.open(rutaImpresion + "ImprReclamo.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                                        }
                                    } else if (result.data.objReclamo.Contactos.VTWEG == "20") {
                                        if (result.data.objReclamo.Contactos.VKBUR == "1130") {
                                            window.open(rutaImpresion + "ImprReclamoUF.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                                        } else {
                                            window.open(rutaImpresion + "ImprReclamoFA.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                                        }
                                    } else {
                                        if ( //result.data.objReclamo.Contactos.VKBUR == "1110" ||
                                            //result.data.objReclamo.Contactos.VKBUR == "1040" ||
                                            result.data.objReclamo.Contactos.VKBUR == "1070") //..
                                        {
                                            window.open(rutaImpresion + "ImprReclamoCasa.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                                        } else {
                                            window.open(rutaImpresion + "ImprReclamo.aspx?np=" + imprimirRec.pNumeroReclamo, "");
                                        }
                                    }
                                    self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el reclamo");
                                    self.getView().byId("txt_aviso_general").bindProperty("text", {
                                        path: "/MensajeCorrecto"
                                    });
                                    self.getView().getModel().refresh();
                                    self.getView().byId("dlg_MensajeAvisoGeneral").open();
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

                    } else {
                        MessageToast.show("Ingrese un Número, no letras ni símbolos");
                    }

                } else {
                    MessageToast.show("Ingrese un Número");
                }


        },
        ////////////////////////////////////////////////////////////////////
        //////////Imprimir Queja/////////////////////////////////////////
        onImprimirQue: function () {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
                var imprimirQue = self.getView().getModel().getProperty("/imprimirQue");
                if (imprimirQue.pNumeroQueja != "") {
                    if (utilString.isNumeric(imprimirQue.pNumeroQueja)) {

                        //var result = imprimirServices.imprimirQueja(imprimirQue);
                        imprimirServices.imprimirQueja(imprimirQue, function (result) {
                            sap.ui.core.BusyIndicator.hide();
                            var rutaImpresion = window.RootImprimir; //"http://ventas.decor-center.com/DecorQAs/";

                            if (result.c === "s") {
                                if (result.data.success) {
                                    if (result.data.objqueja.Contactos.VTWEG == "30") {
                                        if (result.data.objqueja.Contactos.VKBUR == "1140") {
                                            window.open(rutaImpresion + "imprQuejaDE.aspx?np=" + imprimirQue.pNumeroQueja, "");
                                        } else {
                                            window.open(rutaImpresion + "imprQueja.aspx?np=" + imprimirQue.pNumeroQueja, "");
                                        }
                                    } else if (result.data.objqueja.Contactos.VTWEG == "20") {
                                        if (result.data.objqueja.Contactos.VKBUR == "1130") {
                                            window.open(rutaImpresion + "imprQuejaUF.aspx?np=" + imprimirQue.pNumeroQueja, "");
                                        } else {
                                            window.open(rutaImpresion + "imprQuejaFA.aspx?np=" + imprimirQue.pNumeroQueja, "");
                                        }
                                    } else {
                                        if ( //result.data.objqueja.Contactos.VKBUR == "1110" ||
                                            //result.data.objqueja.Contactos.VKBUR == "1040" ||
                                            result.data.objqueja.Contactos.VKBUR == "1070") //..
                                        {
                                            window.open(rutaImpresion + "imprQuejaCasa.aspx?np=" + imprimirQue.pNumeroQueja, "");
                                        } else {
                                            window.open(rutaImpresion + "imprQueja.aspx?np=" + imprimirQue.pNumeroQueja, "");
                                        }
                                    }
                                    self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir la queja");
                                    self.getView().byId("txt_aviso_general").bindProperty("text", {
                                        path: "/MensajeCorrecto"
                                    });
                                    self.getView().getModel().refresh();
                                    self.getView().byId("dlg_MensajeAvisoGeneral").open();
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
                    } else {
                        MessageToast.show("Ingrese un Número, no letras ni símbolos");
                    }
                } else {
                    MessageToast.show("Ingrese un Número");
                }

        },
        ////////////////////////////////////////////////////////////////////////////////
        /////////Buscar Cliente en Nueva Queja/////////////////////////
        onBuscarCliQueja: function () {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var buscarCliQueja = self.getView().getModel().getProperty("/datosQueja");
                //var result = quejaServices.buscarCliQueja(buscarCliQueja);
                quejaServices.buscarCliQueja(buscarCliQueja, function (result) {
                    sap.ui.core.BusyIndicator.show(0);

                    if (buscarCliQueja.CodCli !== "") {

                        if (result.c === "s") {
                            if (result.data.success) {
                                if (result.data.objCliente.Mail == "X") {
                                    MessageToast.show("No se encontró información");
                                } else {
                                    var apellidoPat = result.data.objCliente.APPAT;
                                    var apellidoMat = result.data.objCliente.APMAT;
                                    var nombre = result.data.objCliente.NOMBRE;
                                    var descripcion = result.data.objCliente.Descripcion;
                                    //NOMBRES
                                    if (result.data.objCliente.APPAT == null) {
                                        apellidoPat = "";
                                    } else {
                                        apellidoPat = result.data.objCliente.APPAT;
                                    }
                                    if (result.data.objCliente.APMAT == null) {
                                        apellidoMat = "";
                                    } else {
                                        apellidoMat = result.data.objCliente.APMAT;
                                    }
                                    if (result.data.objCliente.NOMBRE == null) {
                                        nombre = "";
                                    } else {
                                        nombre = result.data.objCliente.NOMBRE;
                                    }
                                    if (result.data.objCliente.Descripcion == null) {
                                        descripcion = "";
                                    } else {
                                        descripcion = result.data.objCliente.Descripcion;
                                    }
                                    buscarCliQueja.NomCliente = apellidoPat + " " + apellidoMat + " " + nombre + " " + descripcion;
                                    //DIRECCION      
                                    if (buscarCliQueja.CodCli.length == 10) {
                                        buscarCliQueja.Calles = result.data.objCliente.Direccion;
                                    }
                                    if (buscarCliQueja.CodCli.length == 8) {
                                        buscarCliQueja.Calles = result.data.objCliente.DIREC;
                                    }
                                    if (buscarCliQueja.CodCli.length == 11) {
                                        buscarCliQueja.Calles = result.data.objCliente.DIREC;
                                        if (buscarCliQueja.Calles == null || buscarCliQueja.Calles == undefined || buscarCliQueja.Calles == "") {
                                            buscarCliQueja.Calles = result.data.objCliente.Direccion;
                                        }
                                    }
                                    //Ubicacion
                                    if (result.data.objCliente.Ciudad == null || result.data.objCliente.Ciudad == "" || result.data.objCliente.Ciudad == " " || result.data.objCliente.Ciudad == undefined) {
                                        if (buscarCliQueja.CodCli.length == 11) {
                                            buscarCliQueja.Ubicacion = result.data.objCliente.Distrito;
                                            if (result.data.objCliente.Distrito == null || result.data.objCliente.Distrito == "" || result.data.objCliente.Distrito == undefined) {
                                                buscarCliQueja.Ubicacion = result.data.objCliente.Ciudad;
                                            }
                                        } else {
                                            buscarCliQueja.Ubicacion = result.data.objCliente.Ciudad;
                                        }
                                    } else {
                                        buscarCliQueja.Ubicacion = result.data.objCliente.Ciudad;
                                    }
                                    buscarCliQueja.Telefono = result.data.objCliente.Telefono;
                                    //buscarCliQueja.OfiVenta = self.getView().getModel().getProperty("/RetornoBuscarCliQueja");
                                    //buscarCliQueja.TextoQueja = self.getView().getModel().getProperty("/RetornoBuscarCliQueja");
                                    self.getView().getModel().refresh();
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
                        console.log(result.data);
                        sap.ui.core.BusyIndicator.hide();

                    } else {
                        MessageToast.show("Ingresar DNI o RUC");
                    }

                    sap.ui.core.BusyIndicator.hide();
                });
            }, 200);
        },
        onGuardarQueja: function () {
            var self = this;
            if (self.getView().byId("txt_ruc_nuevaQueja").getValue() == "") {
                MessageToast.show("Ingrese RUC o DNI");
            } else if (self.getView().byId("txt_descripcion_nuevaQueja").getValue() == "") {
                MessageToast.show("Ingrese Nombre o Descripción");
            } else if (self.getView().byId("txt_calle_nuevaQueja").getValue() == "") {
                MessageToast.show("Ingresar Calle");
            } else if (self.getView().byId("txt_ubicacion_nuevaQueja").getValue() == "") {
                MessageToast.show("Ingresar Ubicación o Distrito");
            } else if (self.getView().byId("txt_telefono_nuevaQueja").getValue() == "") {
                MessageToast.show("Ingresar Teléfono");
            } else if (self.getView().byId("com_ofVentas_nuevaQueja").getSelectedKey() == "") {
                MessageToast.show("Ingresar Oficina de Ventas");
            } else if (self.getView().byId("txtArea_motivo_nuevaQueja").getValue() == "") {
                MessageToast.show("Ingresar Motivo de Queja");
            } else {
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                    var nuevoQueja = self.getView().getModel().getProperty("/datosQueja");
                    //var result = quejaServices.guardarQueja(nuevoQueja);
                    quejaServices.guardarQueja(nuevoQueja, function (result) {
                        sap.ui.core.BusyIndicator.show(0);
                        if (result.c === "s") {
                            if (result.data.success) {
                                var reclamo = result.data.mensaje;
                                var queja = reclamo.replace("El reclamo", "Queja").replace(/:/g, '');
                                //Queja Nro. 0100004532 generado..
                                var num = reclamo.replace("El reclamo Nro. ", "").replace(/:/g, '');
                                var NumQueja = num.replace(" generado..", "").replace(/:/g, '');
                                self.getView().getModel().setProperty("/MensajeCorrecto", queja);
                                self.getView().byId("txt_aviso_general_queja_nuevo").bindProperty("text", {
                                    path: "/MensajeCorrecto"
                                });
                                self.getView().getModel().refresh();
                                self.getView().byId("dlg_MensajeAvisoGeneralQueNuevo").open();
                                self.getView().getModel().setProperty("/datosQueja/NumQueja", NumQueja);
                                self.getView().getModel().setProperty("/datosQueja/CodCli", "");
                                self.getView().getModel().setProperty("/datosQueja/NomCliente", "");
                                self.getView().getModel().setProperty("/datosQueja/Calles", "");
                                self.getView().getModel().setProperty("/datosQueja/Ubicacion", "");
                                self.getView().getModel().setProperty("/datosQueja/Telefono", "");
                                self.getView().getModel().setProperty("/datosQueja/OfiVenta", "");
                                self.getView().getModel().setProperty("/datosQueja/TextoQueja", "");
                                //self.getView().byId("dlg_QueModificar").open();
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
                }, 500);
            }
        },
        onBuscarQueja: function () {
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                var buscarQueja = self.getView().getModel().getProperty("/datosQueja");
                //var result = quejaServices.buscarQueja(buscarQueja);
                quejaServices.buscarQueja(buscarQueja, function (result) {
                    sap.ui.core.BusyIndicator.show(0);

                    if (result.c === "s") {
                        if (result.data.success) {
                            buscarQueja.CodCli = result.data.objqueja.Contactos.KUNNR;
                            buscarQueja.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE;
                            buscarQueja.Calles = result.data.objqueja.Interlocutor[0].Calle;
                            buscarQueja.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad;
                            buscarQueja.Telefono = result.data.objqueja.Interlocutor[0].Telefono;
                            buscarQueja.OfiVenta = result.data.objqueja.Contactos.VKBUR;
                            var texto = result.data.objqueja.Texto;
                            buscarQueja.TextoQueja = texto[1].Descripcion;
                            ///////////////////////////////////////
                            buscarQueja.ADRNR = result.data.objqueja.Interlocutor[0].ADRNR;
                            ////////////////////////////////////////
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
                    console.log(result.data);
                    sap.ui.core.BusyIndicator.hide();
                });
            }, 200);
        },
        onOkDlg_MensajeAvisoGeneral: function () {
            this.getView().byId("dlg_MensajeAvisoGeneral").close();
            this.getView().byId("dlg_QueNuevo").close();
            this.getView().byId("dlg_QueModificar").close();
        },
        onOkDlg_MensajeAvisoGeneralQueNuevo: function () {
            this.getView().byId("dlg_MensajeAvisoGeneralQueNuevo").close();
            this.getView().byId("dlg_QueNuevo").close();
            this.getView().byId("dlg_QueModificar").open();
        },
        onOkDlg_MensajeAvisoGeneralQueModificar: function () {
            this.getView().byId("dlg_MensajeAvisoGeneralQueModificar").close();
            this.getView().byId("dlg_QueModificar").close();
        },
        onModificarQueja: function () {
            var self = this;
            self.getView().byId("loadingControl").open();
            setTimeout(function () {
                var modificarQueja = self.getView().getModel().getProperty("/datosQueja");
                //var result = quejaServices.modificarQueja(modificarQueja);
                quejaServices.modificarQueja(modificarQueja, function (result) {
                    sap.ui.core.BusyIndicator.show(0);

                    if (self.getView().byId("txtArea_motivo_nuevaQueja").getValue() != "") {

                        if (result.c === "s") {
                            if (result.data.success) {
                                var reclamo = result.data.mensaje;
                                var queja = reclamo.replace("Reclamo", "Queja").replace(/:/g, '');
                                self.getView().getModel().setProperty("/MensajeCorrecto", queja);
                                self.getView().byId("txt_aviso_general_queja_modificar").bindProperty("text", {
                                    path: "/MensajeCorrecto"
                                });
                                self.getView().getModel().refresh();
                                self.getView().byId("dlg_MensajeAvisoGeneralQueModificar").open();
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
                        self.getView().byId("loadingControl").close();

                    } else {
                        MessageToast.show("Ingresar texto de la queja");
                    }
                    sap.ui.core.BusyIndicator.hide();
                });
            }, 500);
        },
        onVolver: function () {
            this.getView().byId("dlg_QueBuscarLista").close();
            this.getView().byId("dlg_QueBuscar").open();
        },
        onBuscarListaQueja: function () {
            this.getView().byId("dlg_QueBuscarLista").open();
            var buscarListaQueja = this.getView().getModel().getProperty("/datosQueja");
            var self = this;
            sap.ui.core.BusyIndicator.show(0);
            setTimeout(function () {
                //var result = quejaServices.buscarListaQueja(buscarListaQueja);
                quejaServices.buscarListaQueja(buscarListaQueja, function (result) {
                    sap.ui.core.BusyIndicator.show(0);
                    if (result.c === "s") {
                        if (result.data.success) {
                            self.getView().getModel().setProperty("/RetornoBuscarListaQueja", result.data);
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
                    console.log(result.data);
                    sap.ui.core.BusyIndicator.hide();
                });
            }, 200);
        },
        onListaBuscarQueja: function (evt) {
            var itemLista = evt.getSource().getSelectedItem().getBindingContext().getObject();
            console.log(itemLista);
            this.getView().getModel().setProperty("/QuejaSeleccionado", itemLista);
        },
        verQuejaSeleccionado: function (oEvent) {
            var item = oEvent.getSource().getBindingContext().getPath();
            var numb = item.match(/\d/g);
            numb = numb.join("");
            var firstItem = this.getView().byId("listaDocumentosBuscarDoc").getItems()[numb];
            this.getView().byId("listaDocumentosBuscarDoc").setSelectedItem(firstItem, true);

            var itemLista = this.getView().byId("listaDocumentosBuscarDoc").getSelectedItem().getBindingContext().getObject();
            console.log(itemLista);
            this.getView().getModel().setProperty("/QuejaSeleccionado", itemLista);
            var quejaSeleccionado = this.getView().getModel().getProperty("/QuejaSeleccionado");
            if (quejaSeleccionado) {
                var verQuejaSeleccionado = this.getView().getModel().getProperty("/datosQueja");
                verQuejaSeleccionado.NumQueja = quejaSeleccionado.VBELN;
                var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                    //var result = quejaServices.verQuejaSeleccionado(verQuejaSeleccionado);
                    quejaServices.verQuejaSeleccionado(verQuejaSeleccionado, function (result) {
                        sap.ui.core.BusyIndicator.show(0);

                        if (result.c === "s") {
                            if (result.data.success) {
                                var interlocutor = result.data.objqueja.Interlocutor;
                                verQuejaSeleccionado.CodCli = result.data.objqueja.Contactos.KUNNR;
                                verQuejaSeleccionado.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE;
                                verQuejaSeleccionado.Calles = result.data.objqueja.Interlocutor[0].Calle;
                                verQuejaSeleccionado.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad; //CodPostal
                                verQuejaSeleccionado.Telefono = result.data.objqueja.Interlocutor[0].Telefono;
                                verQuejaSeleccionado.OfiVenta = result.data.objqueja.Contactos.VKBUR;
                                for (var i = 0; i < result.data.objqueja.Texto.length; i++) {
                                    if (result.data.objqueja.Texto[i].CodTexto == 'Z013') {
                                        verQuejaSeleccionado.TextoQueja = result.data.objqueja.Texto[i].Descripcion;
                                        break;
                                    }
                                }
                                self.getView().getModel().refresh();
                                self.getView().byId("dlg_QueVisualizar").open();
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
                        self.getView().getModel().setProperty("/QuejaSeleccionado", null);
                        sap.ui.core.BusyIndicator.hide();
                    });
                }, 500);
            } else {
                MessageToast.show("Seleccione una Queja");
            }
        },
        onVerBuscarQueja: function () {
            var verBuscarQueja = this.getView().getModel().getProperty("/datosQueja");

            if (verBuscarQueja.NumQueja != "") {
                var self = this;
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {
                    //var result = quejaServices.verBuscarQueja(verBuscarQueja);
                    quejaServices.verBuscarQueja(verBuscarQueja, function (result) {
                        sap.ui.core.BusyIndicator.show(0);
                        if (result.c === "s") {
                            if (result.data.success) {
                                verBuscarQueja.NumQueja = result.data.objqueja.Contactos.VBELN;
                                verBuscarQueja.CodCli = result.data.objqueja.Contactos.KUNNR;
                                verBuscarQueja.NomCliente = result.data.objqueja.Interlocutor[0].NOMBRE;
                                verBuscarQueja.Calles = result.data.objqueja.Interlocutor[0].Calle;
                                verBuscarQueja.Ubicacion = result.data.objqueja.Interlocutor[0].Ciudad;
                                verBuscarQueja.Telefono = result.data.objqueja.Interlocutor[0].Telefono;
                                verBuscarQueja.OfiVenta = result.data.objqueja.Contactos.VKBUR;
                                for (var i = 0; i < result.data.objqueja.Texto.length; i++) {
                                    if (result.data.objqueja.Texto[i].CodTexto == 'Z013') {
                                        verBuscarQueja.TextoQueja = result.data.objqueja.Texto[i].Descripcion;
                                        break;
                                    }
                                }
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
                        console.log(result.data);
                        sap.ui.core.BusyIndicator.hide();
                    });
                }, 200);
            } else {
                MessageToast.show("Ingresar Número de Queja")
            }
        },

        /////Inicio Mejora 7 Instalacion//////////////
        MensajeAvisoGeneralHome: function (mensaje) {

            var dialog = new Dialog({
                title: 'Aviso',
                content: new Text({
                    text: mensaje
                }),
                endButton: new Button({
                    text: 'OK',
                    type: 'Reject',
                    press: function () {
                        dialog.destroy();
                    }.bind(this)
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });

            dialog.open();


        },
        onBtnBuscarInstalacionPedidoVenta: function () {
            var self = this;
            if (self.getView().getModel().getProperty("/modelInstala/pedido1") != "") {
                var pedido1 = utilString.pad(self.getView().getModel().getProperty("/modelInstala/pedido1"), 10);
                sap.ui.core.BusyIndicator.show(0);
                setTimeout(function () {

                    documentosServices.consultarServicioInstalacion(pedido1, "servicio", function (result) {
                        sap.ui.core.BusyIndicator.show(0);
                        //result = JSON.stringify(result.responseText);
                        if (result.c === "s") {
                            if (result.data.success) {
                                self.getView().getModel().setProperty("/modelInstala/cotiza1", result.data.cotserv == "null" ? "" : result.data.cotserv);
                                self.getView().getModel().setProperty("/modelInstala/pedvisi", result.data.pedvis == "null" ? "" : result.data.pedvis);
                                self.getView().byId("com_tipoVisita_proyectoVisita").setSelectedKey(result.data.tipovis == "null" ? "" : result.data.tipovis);
                                if (result.data.errors.reason != "null") {
                                    self.MensajeAvisoGeneralHome(result.data.errors.reason);
                                }
                            } else {
                                sap.m.MessageToast.show(result.data.result, {
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
                        console.log(result.data);
                        sap.ui.core.BusyIndicator.hide();
                    });
                }, 200);
            } else {
                sap.m.MessageToast.show("Ingresar Pedido de Venta N°1", {
                    duration: 3000
                });
            }
        },
        ////End Mejora 7 Instlacion//////////////////
        validarObtenerLinkDoc: function(){
            var self = this;
            var imprimirDoc = self.getView().getModel().getProperty("/imprimirDoc");
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
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDoc");
            if(imprimirDoc.pNumPedido.length>10 || imprimirDoc.pNumPedido==""){
                MessageToast.show("Ingrese un número de Documento correcto.");
                return;
            }
            imprimirDoc.pNumPedido = utilString.pad(imprimirDoc.pNumPedido, 10);
            if (imprimirDoc.pNumPedido != "") {
                if (utilString.isNumeric(imprimirDoc.pNumPedido)) {

                    //var result = imprimirServices.imprimirDocumento(imprimirDoc);
                    var opcion1 = this.getView().byId("opcion1").getSelected();
                    var opcion2 = this.getView().byId("opcion2").getSelected();
                    var opcion3 = this.getView().byId("opcion3").getSelected();
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
                                        self.getView().getModel().setProperty("/MensajeCorrecto", "No se puede imprimir por bloqueo de factura");
                                        self.getView().byId("txt_aviso_general").bindProperty("text", {
                                            path: "/MensajeCorrecto"
                                        });
                                        self.getView().getModel().refresh();
                                        self.getView().byId("dlg_MensajeAvisoGeneral").open();
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
                                                        var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");//2016-01-19
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
                                                            var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");//2016-01-19
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
                                                        var fechaz = utilString.convertFechaFormatoAAMMD(window.dataIni.lstValambi[0].Descripcion,"-");//2016-01-19
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
                                            $.cliente = result.data.correo;
                                            $.cantMat = result.data.objPedido.Detalle.length;
                                            $.subLink = subLink;
                                            utilString.cargarFragmentsHome(self);
                                            self.fnPreviewPDF2(imprimirDoc.pNumPedido,"pdfViewerHTML",sap.ui.getCore().byId("dlg_preview_pdf").getId());
                                            //var iframeCadena = '</object><iframe frameborder="0" style="-webkit-transform:scale(0.75);-moz-transform-scale(0.75);width: 100%; height: -webkit-fill-available;border: 0;" src="' + linkDoc + '"></iframe>';
                                            //sap.ui.getCore().byId("pdfViewerHTML").setContent(iframeCadena);
                                            sap.ui.getCore().byId("dlg_preview_pdf").open();
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
                                                $.cliente = result.data.correo;
                                                $.cantMat = result.data.objPedido.Detalle.length;

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
                                                    $.TipoDetalle = "D";
                                                }

                                                if (bdalmacen) {
                                                    $.TipoDetalle = "A";
                                                }

                                                if (bdalmacen && bdespacho) {
                                                    $.TipoDetalle = "M";
                                                }

                                                if (!bdalmacen && !bdespacho) {
                                                    $.TipoDetalle = "-";
                                                }

                                                // NUEVO FRANZ
                                                $.subLink = subLink;
                                                utilString.cargarFragmentsHome(self);
                                                self.fnPreviewPDF2(imprimirDoc.pNumPedido,"pdfViewerHTML",sap.ui.getCore().byId("dlg_preview_pdf").getId());
                                                //var iframeCadena = '<iframe frameborder="0" style="-webkit-transform:scale(0.75);-moz-transform-scale(0.75);width: 100%; height: -webkit-fill-available;border: 0;" src="' + linkDoc + '"></iframe>';
                                                //sap.ui.getCore().byId("pdfViewerHTML").setContent(iframeCadena);
                                                sap.ui.getCore().byId("dlg_preview_pdf").open();
                                                /////////////////////////////////////////////////////////////////////
                                                /*self.getView().getModel().setProperty("/MensajeCorrecto", "Se envio a imprimir el documento");
                                                self.getView().byId("txt_aviso_general").bindProperty("text", {path: "/MensajeCorrecto"});
                                                self.getView().getModel().refresh();
                                                self.getView().byId("dlg_MensajeAvisoGeneral").open();*/
                                            } else {
                                                self.getView().getModel().setProperty("/MensajeCorrecto", "La impresión seleccionada solo es válida para pedidos Z001,Z034,Z003,Z004 y Z010");
                                                self.getView().byId("txt_aviso_general").bindProperty("text", {
                                                    path: "/MensajeCorrecto"
                                                });
                                                self.getView().getModel().refresh();
                                                self.getView().byId("dlg_MensajeAvisoGeneral").open();
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
        // GENERACION DE PDF
        onOpenPreviewPDF: function () {
            this.obtenerLinkDoc();
        },
        onCerrarPrevisualizar: function () {
            sap.ui.getCore().byId("pdfViewerHTML").setContent("");
            sap.ui.getCore().byId("pdfViewerFirma").setContent("");
            var navCon = sap.ui.getCore().byId("navConPDF");
            navCon.to(sap.ui.getCore().byId("pgGeneracion"), "slide");
            sap.ui.getCore().byId("dlg_preview_pdf").close();
            utilString.destruirFragmentsHome(this);
        },
        onGenerarPDFDoc: function () {
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDoc");
            var asesor = this.getView().getModel().getProperty("/dataIni/person");
            var opcion1 = this.getView().byId("opcion1").getSelected();
            var opcion2 = this.getView().byId("opcion2").getSelected();
            var opcion3 = this.getView().byId("opcion3").getSelected();
            if (imprimirDoc.pNumPedido != "") {
                if (utilString.isNumeric(imprimirDoc.pNumPedido)) {

                    $.AsesorCorreo = asesor.SapRouter;
                    $.NroPedido = imprimirDoc.pNumPedido;
                    $.FirmaPDF = "";
                    if (opcion1) {
                        $.TipoPDF = "0";
                        sap.ui.getCore().byId("txtAsuntoCorreo").setValue("DECOR CENTER");
                        sap.ui.getCore().byId("txtCuerpoCorreo").setValue("Estimado Cliente: \n" +
                            "Agradecemos su visita a nuestra tienda, estamos contentos de ser parte de su proyecto, adjunto encontrará la cotización y/o pedido de venta. \n" +
                            "Si desea contactarse con el asesor, por favor enviar su comunicación al correo " + $.AsesorCorreo + " \n" +
                            "Saludos." + "\n\n" + window.dataIni.person.Descripcion);
                        sap.ui.getCore().byId("navConPDF").to(sap.ui.getCore().byId("pgCorreo"), "slide");
                        //this.fnGenZoneSing();
                        //this.fnGenPDF(imprimirDoc.pNumPedido, Asesor.Email, "0", "");
                    }

                    if (opcion2) {
                        $.TipoPDF = "1";
                        var nPed = parseInt(imprimirDoc.pNumPedido) ;
                        sap.ui.getCore().byId("txtAsuntoCorreo").setValue("CONDICIONES DE ENTREGA DIGITAL DECOR CENTER"+" "+nPed);
                        sap.ui.getCore().byId("txtCuerpoCorreo").setValue("Estimado Cliente: \n" +
                            "Agradecemos su visita a nuestra tienda, estamos contentos de ser parte de su proyecto, adjunto encontrará las condiciones de entrega digital vistas en tienda. \n" +
                            "Si desea contactarse con el asesor, por favor enviar su comunicación al correo " + $.AsesorCorreo + " \n" +
                            "Saludos." + "\n\n" + window.dataIni.person.Descripcion);
                        sap.ui.getCore().byId("navConPDF").to(sap.ui.getCore().byId("pgFirma"), "slide");
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
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDoc");
            var Asesor = this.getView().getModel().getProperty("/dataIni/person");
            var opcion1 = this.getView().byId("opcion1").getSelected();
            var opcion2 = this.getView().byId("opcion2").getSelected();
            var opcion3 = this.getView().byId("opcion3").getSelected();
            var canvas = document.getElementById('canvasFirmaPDF');
            //$.FirmaPDF = canvas.toDataURL('image/jpeg', 0.5);
            $.FirmaPDF = canvas.toDataURL();
            this.fnPreviewPDF($.NroPedido, $.TipoPDF, $.FirmaPDF, $.cantMat);
            //var navCon = this.getView().byId("navConPDF");
            //navCon.to(this.getView().byId("pgCorreo"), "slide");
        },
        onGenerarPDFDocFirmadoSend: function () {
            var imprimirDoc = this.getView().getModel().getProperty("/imprimirDoc");
            var Asesor = this.getView().getModel().getProperty("/dataIni/person");
            var opcion1 = this.getView().byId("opcion1").getSelected();
            var opcion2 = this.getView().byId("opcion2").getSelected();
            var opcion3 = this.getView().byId("opcion3").getSelected();
            var canvas = document.getElementById('canvasFirmaPDF');
            var navCon = sap.ui.getCore().byId("navConPDF");
            navCon.to(sap.ui.getCore().byId("pgCorreo"), "slide");
        },
        onEnviarPDF: function () {
            var Asunto = sap.ui.getCore().byId("txtAsuntoCorreo").getValue();
            var Cuerpo = sap.ui.getCore().byId("txtCuerpoCorreo").getValue();
            this.fnGenPDF($.NroPedido, $.cliente, $.AsesorCorreo, $.TipoPDF, $.FirmaPDF, Asunto, Cuerpo, $.cantMat);
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

            sap.ui.getCore().byId("pdfViewerFirma").setContent('<div id="lienzo" style="width: 610px; height: 200px; background: #fff;"></div>');
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
                documentosServices.enviarPDF(cotizacion, cliente, asesor, tipo, imagen, asunto, cuerpo, cantidad, $.TipoDetalle,$.subLink, function (resultCorreo) {
                    sap.ui.core.BusyIndicator.hide();
                    if (resultCorreo.c === "s") {
                        sap.ui.getCore().byId("dlg_preview_pdf").close();
                        utilString.destruirFragmentsHome(self);
                        sap.m.MessageToast.show("Correo enviado correctamente", {
                            duration: 3000
                        });
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
                documentosServices.previsualizarPDF(cotizacion, tipo, imagen, cantidad, $.TipoDetalle,$.subLink, function (resultCorreo) {
                    sap.ui.core.BusyIndicator.hide();
                    if (resultCorreo.c === "s") {
                        sap.ui.getCore().byId("navConPDF").to(sap.ui.getCore().byId("pgPrevisualizacion"), "slide");
                        var iframeCadena = '<div class="embed-responsive" style="height:'+$("#pgPrevisualizacion").height()+'px">'+
                                                '<object data="'+resultCorreo.data+'" type="application/pdf" width="100%" height="'+$("#pgPrevisualizacion").height()+'px"/>'+
                                            '</div>'; //'<iframe frameborder="0" style="width: 100%; height: -webkit-fill-available;border: 0;" src="' + resultCorreo.data + '"></iframe>';
                        window.pdfPreviewFirmado = iframeCadena;
                        sap.ui.getCore().byId("pdfViewerHTML2").setContent(iframeCadena);
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
            /*
            document.addEventListener("gesturestart", function(){
                MessageToast.show("aplicando evento gesturestart");
            },false);
            document.addEventListener("gesturechange", function(){
                MessageToast.show("aplicando evento gesturechange");
            },false);
            document.addEventListener("gestureend", function(){
                MessageToast.show("aplicando evento gestureend");
            },false);*/
            setTimeout(function () {
                documentosServices.previsualizarPDF(cotizacion, "1", "", 1, $.TipoDetalle,$.subLink, function (resultCorreo) {
                    sap.ui.core.BusyIndicator.hide();
                    if (resultCorreo.c === "s") {

                        var iframeCadena = '<div class="embed-responsive" style="height:'+$("#"+idSeccion).height()+'px">'+
                                                '<object data="'+resultCorreo.data+'" type="application/pdf" width="100%" height="'+$("#"+idSeccion).height()+'px"/>'+
                                            '</div>'; //'<iframe frameborder="0" style="width: 100%; height: -webkit-fill-available;border: 0;" src="' + resultCorreo.data + '"></iframe>';
                        window.pdfPreview = iframeCadena;
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
            var opcion1 = this.getView().byId("opcion1").getSelected();
            var opcion2 = this.getView().byId("opcion2").getSelected();
            var opcion3 = this.getView().byId("opcion3").getSelected();
            if (opcion1 == true) {
                sap.ui.getCore().byId("navConPDF").to(sap.ui.getCore().byId("pgCorreo"), "slide");
            }
            if (opcion2 == true) {
                sap.ui.getCore().byId("navConPDF").to(sap.ui.getCore().byId("pgGeneracion"), "slide");
                sap.ui.getCore().byId("pdfViewerHTML").setContent(window.pdfPreview);
            }
        },
        onVolverPgPrevisualizacion: function () {
            sap.ui.getCore().byId("navConPDF").to(sap.ui.getCore().byId("pgFirma"), "slide");
        },
        onVolverPgCorreo: function () {
            var opcion1 = this.getView().byId("opcion1").getSelected();
            var opcion2 = this.getView().byId("opcion2").getSelected();
            var opcion3 = this.getView().byId("opcion3").getSelected();
            if (opcion1 == true) {
                sap.ui.getCore().byId("navConPDF").to(sap.ui.getCore().byId("pgGeneracion"), "slide");
                sap.ui.getCore().byId("pdfViewerHTML").setContent(window.pdfPreview);
            }
            if (opcion2 == true) {
                sap.ui.getCore().byId("navConPDF").to(sap.ui.getCore().byId("pgPrevisualizacion"), "slide");
                sap.ui.getCore().byId("pdfViewerHTML2").setContent(window.pdfPreviewFirmado);
            }

        }
    });
});