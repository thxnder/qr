sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
], function (Controller, MessageToast, UIComponent, JSONModel) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Quejas.QueBuscar", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            this.getView().setModel(new JSONModel({}));
            this.getView().getModel().setProperty("/dataIni", window.dataIni);
            this.getView().getModel().refresh(true);
        },
        onRouteMatched: function (oEvent) {
            if (oEvent.getParameter("name") == "appQueBuscar") {
                this.getView().byId("dlg_QueBuscar").open();
            };
        },
        onAfterRendering: function () {
        },
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onCloseDlg_QueBuscar: function () {
            this.getView().byId("dlg_QueBuscar").close();
        },
        onVolver: function () {
            this.getView().byId("dlg_QueBuscarLista").close();
            this.getView().byId("dlg_QueBuscar").open();
        }
    });
});
