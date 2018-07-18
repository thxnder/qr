sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/stockServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, stockServices, utilString) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Stock.StockporPedir", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent)
        {
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
                    mes = mes+3;
                }
                var fechaActual = fechaif.getDate() + "/" + mes0 + "/" + year0;
                var fechaPosterior = fechaif.getDate() + "/" + mes + "/" + year; // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
            if (oEvent.getParameter("name") == "appStockporPedir")
            {
                this.getView().setModel(new JSONModel({}));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().setProperty("/codMaterial", window.codMaterial);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_stockPorPedir").open();
                this.getView().byId("date_fechaInicio_stockPorPedir").setValue(fechaActual);
                this.getView().byId("date_fechaFin_stockPorPedir").setValue(fechaPosterior);
            };
        },
        onAfterRendering: function (){
        },
        //Boton Home
        goHome: function (){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        //Cerrar Dialog Doc Nuevo Inicio
        onContinuarStockPorPedir: function (oEvent){
            var self = this;
sap.ui.core.BusyIndicator.show(0); 
setTimeout(function () {
            var CodJer = self.getView().byId("com_codJerarqui_stockPorPedir").getSelectedKey();
            if (CodJer == " ")
            {
                CodJer = "";
            }
            var CodMat = self.getView().byId("txt_codMaterial_stockPorPedir").getValue();
            var FecIni = self.getView().byId("date_fechaInicio_stockPorPedir").getValue();
            var FecFin = self.getView().byId("date_fechaFin_stockPorPedir").getValue();
            var OfVentas = window.dataIni.person.OfVentas;
            //var result = stockServices.stockporPedir(CodJer, CodMat, FecIni, FecFin, OfVentas);
            stockServices.stockporPedir(CodJer, CodMat, FecIni, FecFin, OfVentas, function(result) { 
                sap.ui.core.BusyIndicator.show(0); 
            if (result.c === "s")
            {
                if (result.data.success)
                {
                    self.getView().getModel().setProperty("/retornoStockPorPedir", result.data);
                    self.getView().byId("dlg_stockPorPedir").close();
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
            console.log(result.data);
            sap.ui.core.BusyIndicator.hide();
        });
},1000);
        },
        onCancelarStockPorPedir:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
    });
});
