sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/userServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
], function (Controller, MessageToast, UIComponent, JSONModel, userServices, utilString) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Usuario.UsuInformacion", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            var oData = {
                informacionUsuario: {
                    Usuario: window.dataIni.person.Uname,
                    extcomp1007: window.dataIni.person.PerNr,
                    extcomp1008: window.dataIni.person.Descripcion,
                    extcomp1009: window.dataIni.person.OrgVentas,
                    extcomp1010: window.dataIni.person.CanalDist,
                    extcomp1011: window.dataIni.person.Email,
                    curPassword: "",
                    newPassword: "",
                    newPassword2: ""
                }
            };
            if (oEvent.getParameter("name") == "appUsuInformacion") {
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
            }
        },
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onGuardarInformacionUsuario: function () {
            var OfVentas = window.dataIni.person.OfVentas;
            var datosUser = this.getView().getModel().getProperty("/informacionUsuario");
            //var result = userServices.cambioPassword(datosUser, OfVentas);
            userServices.cambioPassword(datosUser, OfVentas, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            if (result.data.success) {
                //var data = this.getView().byId("form_OrgVentas").setEditable(false);
                //this.getView().getModel().refresh(true);
                sap.ui.core.BusyIndicator.hide();
            } else {
                sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                sap.ui.core.BusyIndicator.hide();
            }
            sap.ui.core.BusyIndicator.hide();
        });
        }
    });
});
