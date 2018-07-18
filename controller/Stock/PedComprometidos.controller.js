sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/stockServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString",
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, stockServices, utilString) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Stock.PedComprometidos", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
            utilString.borrarHistory();
            var oData = {
                //////Inicio Roy Tipo Documento//////////////////////
                //////Ocultar Campos/////////////////////////////////
                "clasePedido":"",
                "numPedido":"",
                "solicitante":"",
                "canal":"",
                "ofiVenta":"",
                "asesor":"",
                "listaPedComprometidos":[{
                    Denominacion:"",
                    Documento:"",
                    Status:"",
                    Cliente:"",
                    Responsable:"",
                    Posicion:"",
                    CodMaterial:"",
                    MatDescripcion:"",
                    Cantidad:"",
                    UM:"",
                    FechaReparto:"",
                    FechaProgramada:"",
                    FechaIngreso:"",
                    IndFechas:""
                }]
            };
            
            if (oEvent.getParameter("name") == "appPedComprometidos") {
                this.getView().setModel(new JSONModel({oData}));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().setProperty("/codMaterial", window.codMaterial);
                this.getView().getModel().refresh(true);
                utilString.destruirFragmentsStock(this);
                utilString.cargarFragmentsStock(this);
                sap.ui.getCore().byId("dlg_pedComprometidos").open();
                //////Inicio Fecha Actual/////////////////////////////////////////////////////////////////////////
                var fechaif = new Date();
                fechaif.setDate(fechaif.getDate()-90);
                var mes0 = (fechaif.getMonth()+1);
                
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
                var fechaAnterior = fechaif.getDate() + "/" + mes0 + "/" + year0;
                var fechaPosterior = fechaif.getDate() + "/" + mes + "/" + year; // padding 
                ///////Fin Fecha Actual///////////////////////////////////////////////////////////////////////////
                ////////Inicio Stock Por Llegar y Por Pedir//////////////////////////////////////////////////////////////
                sap.ui.getCore().byId("date_fec_inicio_pedComprometidos").setValue(fechaAnterior); 
                sap.ui.getCore().byId("date_fec_fin_pedComprometidos").setValue(fechaPosterior); 
                /////////Fin Stock Por Llegar y Por Pedir////////////////////////////////////////////////////////////////
                
            }else{
                utilString.destruirFragmentsStock(this);
            } 
            ;
        },
        //Cerrar Dialog Doc Nuevo Inicio
        onCloseDialog: function (oEvent) {
            utilString.destruirFragmentsStock(this);
            sap.ui.getCore().byId("dlg_pedComprometidos").close()
        },
        onAfterRendering: function () {
        },
        //Boton Home
        goHome: function () {
            utilString.destruirFragmentsStock(this);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
        },
        crearPedidos: function() { 
            var numPedidos = this.getView().getModel().getProperty("/numPedido");
            var listaPedidos = new Array();
            try{
                numPedidos = numPedidos.split(" ");
                for(var indice in numPedidos) {
                    var pedido = new Object();
                    var crearId = indice ;
                    //pedido.id= parseInt(crearId)+1;
                    pedido.valor= utilString.pad(numPedidos[indice],10);
                    listaPedidos.push(pedido);
                }
            }catch(ex){
                if(numPedidos=="" || numPedidos==undefined){
                    var pedido = new Object();
                    pedido.valor= "" ;
                    listaPedidos.push(pedido);
                }
            }
            return listaPedidos;

        }, 
        crearSolicitantes: function() { 
            var solicitantes = this.getView().getModel().getProperty("/solicitante");
            var listaSolicitantes = new Array();
            try{
                solicitantes = solicitantes.split(" ");
                for(var indice in solicitantes) {
                    var solicitante = new Object();
                    var crearId = indice ;
                    //solicitante.id= parseInt(crearId)+1 ;
                    solicitante.valor= utilString.pad(solicitantes[indice],10) ;
                    listaSolicitantes.push(solicitante);
                }
            }catch(ex){
                if(solicitantes=="" || solicitantes==undefined){
                    var solicitante = new Object();
                    solicitante.valor= "" ;
                    listaSolicitantes.push(solicitante);
                }
            }
            return listaSolicitantes;

        },        
        onContinuarPedComprometidos: function () {
            /*  
                por lo tanto asi seria tus filtros:
                clase documento : 1 solo valor ( NO json )
                fecha de creación :  2 valores ( fecha inicio , fecha fin ... NO JSON )
                documento de ventas ( pedido ) :  JSON ( esto puede ser multiple )
                solicitante ( JSON , porque puede ser multiple )
                por tanto tenemos 2 campos multiples nomas
            */
            var self = this;
sap.ui.core.BusyIndicator.show(0); 
setTimeout(function () {

            var claseDoc = sap.ui.getCore().byId("com_clasePedido_pedComprometidos").getSelectedKey();
            var lstPedJSON = JSON.stringify(self.crearPedidos());
            var lfdat_ini = sap.ui.getCore().byId("date_fec_inicio_pedComprometidos").getValue();
            var lfdat_fin = sap.ui.getCore().byId("date_fec_fin_pedComprometidos").getValue();
            var lstSolJSON = JSON.stringify(self.crearSolicitantes());
            var canal = sap.ui.getCore().byId("txt_canal_pedComprometidos").getValue() ;//==undefined ?"":sap.ui.getCore().byId("txt_canal_pedComprometidos").getValue();
            var ofiVenta = sap.ui.getCore().byId("txt_ofiVenta_pedComprometidos").getValue() ;// ==undefined ?"":sap.ui.getCore().byId("txt_ofiVenta_pedComprometidos").getValue();
            var usuario = sap.ui.getCore().byId("txt_asesor_pedComprometidos").getValue() ; //==undefined ?"":sap.ui.getCore().byId("txt_asesor_pedComprometidos").getValue();
            var IdUsuario = window.dataIni.person.Id ;
            var flag = "comprometidos";

            if(canal=="" && ofiVenta=="" && usuario==""){
                canal = window.dataIni.person.CanalDist;
                ofiVenta = window.dataIni.person.OfVentas;
                usuario = window.dataIni.person.Uname;
            }
            if(canal!="" || ofiVenta!="" || usuario!=""){
                if(canal!="" && ofiVenta=="" && usuario==""){
                    if(canal!=window.dataIni.person.CanalDist){
                        sap.ui.core.BusyIndicator.hide();
                       return MessageToast.show("El usuario no puede ver resultado por ser de otro canal.");
                    }else{
                        canal = window.dataIni.person.CanalDist;
                        ofiVenta = window.dataIni.person.OfVentas;
                        usuario = window.dataIni.person.Uname;
                    }
                }
                if(canal=="" && ofiVenta!="" && usuario==""){
                    if(ofiVenta==window.dataIni.person.OfVentas){
                        canal = window.dataIni.person.CanalDist;
                        ofiVenta = window.dataIni.person.OfVentas;
                        usuario = window.dataIni.person.Uname;
                    }
                }
                if(canal=="" && ofiVenta=="" && usuario!=""){
                    if(usuario==window.dataIni.person.Uname){
                        canal = window.dataIni.person.CanalDist;
                        ofiVenta = window.dataIni.person.OfVentas;
                        usuario = window.dataIni.person.Uname;
                    }
                }
            }

            

            
            //var result = stockServices.stockporLlegar(matnr, lfdat_inicio, lfdat_fin, OfVentas);
            stockServices.stockPedComprometidos(lstPedJSON,lstSolJSON, lfdat_ini, lfdat_fin,claseDoc,IdUsuario,canal,ofiVenta, usuario,flag, function(result) { 
                sap.ui.core.BusyIndicator.show(0); 
            if (result!==undefined && result.c === "s") {
                if (result.data.ok =="0") {
                    if (result.data.success) {
                        self.getView().getModel().setProperty("/listaPedComprometidos", result.data.lstReporte);

                        for (var i = 0; i < self.getView().getModel().getProperty("/listaPedComprometidos").length; i++) {
                            if(self.getView().getModel().getProperty("/listaPedComprometidos/"+i+"/Indfec")=="@08@"){
                                self.getView().getModel().setProperty("/listaPedComprometidos/"+i+"/Indfec","verdePC");
                            }
                            if(self.getView().getModel().getProperty("/listaPedComprometidos/"+i+"/Indfec")=="@09@"){
                                self.getView().getModel().setProperty("/listaPedComprometidos/"+i+"/Indfec","amarilloPC");
                            }
                            if(self.getView().getModel().getProperty("/listaPedComprometidos/"+i+"/Indfec")=="@0A@"){
                                self.getView().getModel().setProperty("/listaPedComprometidos/"+i+"/Indfec","rojoPC");
                            }
                            if(self.getView().getModel().getProperty("/listaPedComprometidos/"+i+"/Indfec")=="@EB@"){
                                self.getView().getModel().setProperty("/listaPedComprometidos/"+i+"/Indfec","blancoPC");
                            }
                        }

                        sap.ui.getCore().byId("dlg_pedComprometidos").close();
                    } else {
                        sap.m.MessageToast.show(result.data.errors.reason, {
                            duration: 3000
                        });
                        sap.ui.core.BusyIndicator.hide();
                    }
                }else{
                    sap.m.MessageToast.show("No se encontraron Resultados", {
                            duration: 3000
                        });
                    sap.ui.core.BusyIndicator.hide();
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
        onCancelarPedComprometidos:function(){
            utilString.destruirFragmentsStock(this);
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
