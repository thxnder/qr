sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/stockServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, stockServices,utilString) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Stock.StockporLlegar", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
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
                    mes = mes+4;
                }
                var fechaActual = fechaif.getDate() + "/" + mes0 + "/" + year0;
                var fechaPosterior = fechaif.getDate() + "/" + mes + "/" + year; // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
            if (oEvent.getParameter("name") == "appStockporLlegar") {
                this.getView().setModel(new JSONModel({}));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().setProperty("/codMaterial", window.codMaterial);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_stockPorLlegar").open();
                this.getView().byId("date_fec_inicio_stockPorLlegar").setValue(fechaActual);
                this.getView().byId("date_fec_fin_stockPorLlegar").setValue(fechaPosterior);
            }
            ;
        },
        //Cerrar Dialog Doc Nuevo Inicio
        onCloseDialog: function (oEvent) {
            this.getView().byId("dlg_stockPorLlegar").close()
        },
        onAfterRendering: function () {
        },
        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onContinuarStockPorLlegar: function () {
            var self = this;
sap.ui.core.BusyIndicator.show(0); 
setTimeout(function () {
            var matnr = self.getView().byId("txt_cod_material_stockPorLlegar").getValue();
            var lfdat_inicio = self.getView().byId("date_fec_inicio_stockPorLlegar").getValue();
            var lfdat_fin = self.getView().byId("date_fec_fin_stockPorLlegar").getValue();
            var OfVentas = window.dataIni.person.OfVentas;
            //var result = stockServices.stockporLlegar(matnr, lfdat_inicio, lfdat_fin, OfVentas);
            stockServices.stockporLlegar(matnr, lfdat_inicio, lfdat_fin, OfVentas, function(result) { 
                sap.ui.core.BusyIndicator.show(0); 
            if (result!==undefined && result.c === "s") {
                if (result.data.success) {
                    self.getView().getModel().setProperty("/retornoStockPorLlegar", result.data);
                    self.getView().byId("dlg_stockPorLlegar").close();
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
},1000);
        },
        onCancelarStockPorLlegar:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        //Boton Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").open()
        },
        onDocNuevoCloseBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").close()
        },
        //Buscar Producto
        onDocNuevodlg_buscar: function () {
            this.getView().byId("dlg_DocNuevobuscar").open();
        },
        onDocNuevoClosedlg_buscar: function () {
            this.getView().byId("dlg_DocNuevobuscar").close();
        },
        //Abrir Dialog para Agregar Producto
        onDocNuevodlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").open();
        },
        onDocNuevoClosedlg_addProducto: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").close();
        },
        onDocNuevoAddinBuscar: function () {
            MessageToast.show("Producto Añadido");
        },
    });
});
