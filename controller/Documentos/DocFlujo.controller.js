sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/flujoDocumentoServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery, flujoDocumentoServices, utilString) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocFlujo", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            if (oEvent.getParameter("name") == "appDocFlujo") {
                this.getView().byId("SplitAppId").setMode("HideMode");
                this.getView().setModel(new JSONModel({}));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_DialogDocFlujo").open();
                this.getView().getModel().setProperty("/NumeroDocumento", window.numeroDocumento);
            }
            var tipoCabecera = [];
            tipoCabecera.push({
                codigo: 1,
                descripcion: 'Flujo'
            });
            tipoCabecera.push({
                codigo: 2,
                descripcion: 'Status'
            });
            this.getView().getModel().setProperty("/tipoCabeceraModel", tipoCabecera);
            this.getView().getModel().refresh();
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
        onItemTreeTable:function(oEvent){
            var fila = oEvent.getSource().getBindingContext().getObject();
            var tipoDoc = fila.TipoDocumento;
            if(tipoDoc=="Entrega"){
                var detalleEntrega = this.getView().getModel().getProperty("/retornoFlujo/detEntrega");
                var detalleEntregaEspecifico = detalleEntrega.filter(function(el) {
                                return el.CodEntrega == parseInt(fila.NumDocumento) ;
                        });
                this.getView().getModel().setProperty("/detalleEntrega",detalleEntregaEspecifico);
                this.getView().byId("txt_aviso_flujo").setText("Este Tipo de Documento es Entrega");
                this.getView().byId("dlg_Detalleflujo").open();
                this.getView().byId("dlg_Detalleflujo").close();
                this.getView().byId("dlg_Detalleflujo").open();
            }else{
                this.getView().byId("txt_aviso_flujo").setText("Solo se puede ver Detalle de una Entrega");
                this.getView().byId("dlg_MensajeAvisoFlujo").open();
            }
        },
        onOkDlg_MensajeAvisoFlujo:function(){
            this.getView().byId("dlg_MensajeAvisoFlujo").close();
        },
        //Continuar en Dialog Flujo
        onContinuarDlg_DialogDocFlujo: function (oEvent) {
            if (this.getView().byId("txt_numDoc_flujo").getValue() !== "") {
                var self = this;
sap.ui.core.BusyIndicator.show(0);
setTimeout(function () {
                var pNumPedido = self.getView().byId("txt_numDoc_flujo").getValue();
                /*var result = flujoDocumentoServices.flujoDocumento(pNumPedido,
                        UserId,
                        PwdId,
                        Id,
                        GrpVend,
                        Descripcion,
                        CodigoVendedor,
                        OrgVentas,
                        CanalDist,
                        OfVentas
                        );*/
                flujoDocumentoServices.flujoDocumento(pNumPedido, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
                if (result.c === "s") {
                    if (result.data.success) {
                        self.getView().getModel().setProperty("/retornoFlujo", result.data);
                        /////Inicio Tree/////////////////////////////////////////////////////////////////////////////////////////
                        for (var i = 0; i < result.data.flujo.length; i++) {
                            result.data.flujo[i].TipoDocumento = self.onQuitarCaracter(result.data.flujo[i].TipoDocumento,">");
                            result.data.flujo[i].id = parseInt(result.data.flujo[i].Jerarquia).toString();
                            result.data.flujo[i].parentId =(result.data.flujo[i].Num=="")?"0":parseInt(result.data.flujo[i].Num).toString();
                            result.data.flujo[i].children = null;
                        }
                        self.getView().getModel().setProperty("/flujoTemporal1", self.listaToArbol(result.data.flujo) );
                        //////End Tree//////////////////////////////////////////////////////////////////////////////////////////
                        console.log(self.getView().getModel().getProperty("/retornoFlujo"));
                        var flujo = self.getView().getModel().getProperty("/retornoFlujo/flujo");
                        self.getView().getModel().setProperty("/flujo0", flujo[0]);
                        self.getView().getModel().setProperty("/flujo1", flujo[1]);
                        console.log(self.getView().getModel().getProperty("/flujo0/TipoDocumento"));

                        ///////////////////////////////////////////////////////////
                        var oTreeTable = self.getView().byId("treeTable");
                        oTreeTable.expandToLevel(5);
                        ///////////////////////////////////////////////////////////
                        self.getView().byId("dlg_DialogDocFlujo").close();
                        window.numeroDocumento = "";
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
            } else {
                MessageToast.show("Falta Ingresar Nro. de Documento");
            }
        },
        //Boton Home
        goHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        onListaMasterFlujo: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            if (obj.codigo === 1) {
                this.byId("SplitAppId").to(this.createId("pag_flujo_detail1"))
            }
            if (obj.codigo === 2) {
                this.byId("SplitAppId").to(this.createId("pag_status_detail1"))
            }
        },
         onVolver: function () {
            
            this.getView().byId("dlg_Detalleflujo").close();
        },

    });
});
