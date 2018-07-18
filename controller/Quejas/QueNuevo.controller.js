sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
], function (Controller, MessageToast, UIComponent, JSONModel) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Quejas.QueNuevo", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
            this.getView().setModel(new JSONModel({}));
            this.getView().getModel().setProperty("/dataIni", window.dataIni);
            this.getView().getModel().refresh(true);
        },
        onRouteMatched: function (oEvent) {
            if (oEvent.getParameter("name") == "appQueNuevo") {
                this.getView().byId("dlg_QueNuevo").open();
            };
        },
        onAfterRendering: function () {
        },
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onShowHello: function () {
            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },
        onCloseDlg_QueNuevo: function () {
            this.getView().byId("dlg_QueNuevo").close();
        }
    });
});
