sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    'jquery.sap.global',
    "pe/com/seidor/sap/decor/ventas/services/documentosServices"
], function (Controller, MessageToast, UIComponent, JSONModel, clienteServices, materialServices, jQuery, documentosServices) {
    "use strict";
    return Controller.extend("pe.com.seidor.sap.decor.ventas.controller.Documentos.DocInstalacion", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this);
        },
        onRouteMatched: function (oEvent) {
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
                }
            };
            if (oEvent.getParameter("name") == "appDocInstalacion") {
                this.getView().byId("SplitAppId").setMode("HideMode");
                //this.getView().setModel(new JSONModel({}));
                this.getView().setModel(new JSONModel(oData));
                this.getView().getModel().setProperty("/dataIni", window.dataIni);
                this.getView().getModel().refresh(true);
                this.getView().byId("dlg_DialogDocInstalacion").open();
            }
            ;
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
            tipoCabecera.push({
                codigo: 4,
                descripcion: 'Datos de la Instalación'
            });
            tipoCabecera.push({
                codigo: 5,
                descripcion: 'Pedidos Asociados'
            });
            this.getView().getModel().setProperty("/tipoCabeceraModel", tipoCabecera);
            this.getView().getModel().refresh();
        },
        //Dialogs Iniciales
        onContinuarDlg_DialogDocInstalacion: function () {
            this.getView().byId("dlg_MensajeAvisoInstalacion").open();
            var pedido1 = this.getView().getModel().getProperty("/modelInstala/pedido1");
            var pedido2 = this.getView().getModel().getProperty("/modelInstala/pedido2");
            var pedido3 = this.getView().getModel().getProperty("/modelInstala/pedido3");
            var pedido4 = this.getView().getModel().getProperty("/modelInstala/pedido4");
            var cotiza1 = this.getView().getModel().getProperty("/modelInstala/cotiza1");
            var cotiza2 = this.getView().getModel().getProperty("/modelInstala/cotiza2");
            var cotiza3 = this.getView().getModel().getProperty("/modelInstala/cotiza3");
            var pedvisi = this.getView().getModel().getProperty("/modelInstala/pedvisi");
            var tipovisita = this.getView().byId("com_tipoVisita_proyectoVisita").getSelectedKey();
            //var result = documentosServices.crearInstalacion(pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi,tipovisita);
            documentosServices.crearInstalacion(pedido1, pedido2, pedido3, pedido4, cotiza1, cotiza2, cotiza3, pedvisi,tipovisita, function(result) { 
                sap.ui.core.BusyIndicator.show(0);
            if (result.data.success)
            {
                this.getView().getModel().setProperty("/resultIntala", result.data.result);
                this.getView().getModel().refresh();
            } else
            {
                //sap.m.MessageToast.show(result.data.errors.reason, {duration: 3000});
                this.getView().getModel().setProperty("/resultIntala", result.data.result);
                this.getView().getModel().refresh();
            }
            sap.ui.core.BusyIndicator.hide();
        });
            this.getView().byId("dlg_DialogDocInstalacion").close();
        },
        onOkMensajeInstalacion: function () {
            this.getView().byId("dlg_MensajeAvisoInstalacion").close();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
            //this.getView().byId("dlg_DialogDocModificar").open();
        },
        onContinuarDlg_DialogDocModificar: function (oEvent) {
            this.getView().byId("dlg_DialogDocModificar").close()
        },
        onShowHello: function () {
            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },
        //Boton Home
        goHome: function () {
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
        //Navegacion Master
        onDocNuevoPressMasterBack: function () {
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
        //Boton Añadir Producto desde el Dialog
        onDocNuevoMasterProductosAdd: function () {
            this.getView().byId("dlg_DocNuevoaddProducto").close();
        },
        //Boton Buscar Producto desde el Dialog
        onDocNuevoMasterProductosBuscar: function () {
            this.getView().byId("dlg_DocNuevobuscar").close();
        },
        //Boton Agregar producto desde el Master BuscarProducto
        onDocNuevoAddinBuscar: function () {
            MessageToast.show("Producto Añadido");
        },
        //Boton Master Datos
        onDocNuevoMasterDatos: function (oEvent) {
            this.byId("SplitAppId").toMaster(this.createId("DocMasterInstalacion"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_datos_detail1"));
        },
        //Boton Master Producto
        onDocNuevoMasterProductos: function (oEvent) {
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductos"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
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
            if (obj.codigo === 4) {
                this.byId("SplitAppId").to(this.createId("DocInstalacion_datosInstalacion"))
            }
            if (obj.codigo === 5) {
                this.byId("SplitAppId").to(this.createId("DocInstalacion_pedidosAsociados"))
            }
        },
        //Lista de Master Productos
        onDocNuevoListMasterProductos: function (oEvent) {
        },
        //Abrir Dialog Buscar Cliente
        onDocNuevoBuscarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente").open()
        },
        //Cerrar Dialog Seleccionar Cliente
        onDocNuevoCloseSeleccionarCliente: function () {
            this.getView().byId("dlg_DocNuevobuscarCliente_resultado").close()
        },
        //Al Seleccionar un Cliente desde la Lista del Dialog
        SeleccionaCliente: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/clienteSeleccionado", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").toMaster(this.createId("MasterDocNuevoProductosBuscarCliente"));
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_cliente_buscado"));
            console.log(obj.codigo);
        },
        //Al presionar en la Lista de los Clientes Buscados
        onDocNuevoListBuscarCliente: function () {
        },
        //Al Presionar Boton Buscar Cliente desde el Dialog
        onDocNuevoBuscarClienteAccion: function () {
            var ruc = this.getView().byId("txt_ruc_cliente_busqueda").getValue();
            var nombre = this.getView().byId("txt_nombre_cliente_busqueda").getValue();
            if (ruc || nombre) {
                var result = clienteServices.buscarCliente(ruc, nombre);
                if (result.c === "s") {
                    if (result.data.success) {
                        this.getView().byId("dlg_DocNuevobuscarCliente_resultado").open();
                        this.getView().getModel().setProperty("/BusquedaClientes", result.data.lstClientes);
                        this.getView().getModel().refresh();
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
                console.log(result);
            } else {
                sap.m.MessageToast.show('Ingrese RUC ó Razón social', {
                    duration: 1000
                });
                return;
            }
        },
        goStockDisponible: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockDisponible");
        },
        goStockporLlegar: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockporLlegar");
        },
        goStockporPedir: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appStockporPedir");
        },
        onDocNuevoCloseSeleccionarMaterial: function () {
            this.getView().byId("dlg_BuscarMateriales").close();
        },
        onDocNuevoBuscarMateriales: function (oEvent) {
            var codigo = this.getView().byId("txt_codigo_material_busqueda").getValue();
            var codigoAntiguo = this.getView().byId("txt_codigoAntiguo_material_busqueda").getValue();
            var descripcionMaterial = this.getView().byId("txt_descripcionMaterial_material_busqueda").getValue();
            var categoria = this.getView().byId("comboCategoria").getSelectedKey();
            var linea = this.getView().byId("comboLinea").getSelectedKey();
            var marca = this.getView().byId("comboMarca").getSelectedKey();
            var orgVentas = window.dataIni.person.OrgVentas;
            var canalDist = window.dataIni.person.CanalDist;
            var ofVentas = window.dataIni.person.OfVentas;
            this.getView().byId("loadingControl").open(); // INDICADOR
            var result = materialServices.buscarmaterial(codigo, codigoAntiguo, descripcionMaterial, categoria, linea, marca, orgVentas, canalDist, ofVentas);
            if (result.c === "s") {
                this.getView().byId("dlg_DocNuevobuscar").close();
                if (result.data.success) {
                    this.getView().getModel().setProperty("/BusquedaMateriales", result.data.materiales);
                    this.getView().getModel().setProperty("/RetornolstCentros", result.data.lstCentros);
                    this.getView().byId("dlg_BuscarMateriales").open();
                    this.getView().getModel().refresh();
                    this.getView().byId("loadingControl").close();
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
        },
        onDocNuevoAnadirMaterial: function () {
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").open();
        },
        //Seleccionar Categoria
        onSeleccionarCategoria: function () {
            var categoria = this.getView().byId("comboCategoria").getSelectedKey();
            var linea = window.dataIni.lstLinea;
            var itemLleno = [];
            console.log(categoria);
            for (var i = 0; i < linea.length; i++) {
                var item = linea[i];
                var itemcod = item.Codigo;
                if (itemcod.substring(0, 2) == categoria) {
                    itemLleno.push(item);
                }
            }
            ;
            this.getView().getModel().setProperty("/listaLinea", itemLleno);
            this.getView().getModel().refresh();
            console.log(itemLleno.Codigo);
        },
        onSeleccionarLinea: function () {
            var linea = this.getView().byId("comboLinea").getSelectedKey();
            var marca = window.dataIni.lstMarca;
            var itemLleno = [];
            for (var i = 0; i < marca.length; i++) {
                var item = marca[i];
                var itemcod = item.Codigo;
                if (itemcod.substring(0, 5) == linea) {
                    itemLleno.push(item);
                    console.log(item);
                }
            }
            ;
            this.getView().getModel().setProperty("/listaMarca", itemLleno);
            this.getView().getModel().refresh();
        },
        onDocNuevoClosedlg_addProductoonDialog: function () {
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },
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
        onSiMensajeAviso1: function () {
            var objSeleccionado = this.getView().getModel().getProperty("/materialSelec");
            var listaDisplay = this.getView().getModel().getProperty("/listaMatAnadido");
            if (listaDisplay) {
                listaDisplay.push(objSeleccionado);
            } else {
                listaDisplay = [];
                listaDisplay.push(objSeleccionado);
            }
            this.getView().getModel().setProperty("/listaMatAnadido", listaDisplay);
            this.getView().getModel().refresh();
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },
        onNoMensajeAviso1: function () {
            var objSeleccionado = this.getView().getModel().getProperty("/materialSelec");
            var listaDisplay = this.getView().getModel().getProperty("/listaMatAnadido");
            if (listaDisplay) {
                listaDisplay.push(objSeleccionado);
            } else {
                listaDisplay = [];
                listaDisplay.push(objSeleccionado);
            }
            this.getView().getModel().setProperty("/listaMatAnadido", listaDisplay);
            this.getView().getModel().refresh();
            this.getView().byId("dlg_MensajeAviso1").close();
            this.getView().byId("dlg_DocNuevobuscar").close();
            this.getView().byId("dlg_BuscarMateriales").close();
            this.getView().byId("dlg_DocNuevoaddProductoonDialog").close();
        },
        onDocNuevoMasterProductosAddonDialog: function (evt) {
            this.getView().byId("dlg_MensajeAviso1").open();
        },
        SeleccionarMaterial: function (evt) {
            var obj = evt.getSource().getSelectedItem().getBindingContext().getObject();
            //var item=[];
            //var item = { CodMaterial: "{/materialSelec/CodMaterial}" , DescMaterial: "{/materialSelec/DescMaterial}" };
            this.getView().getModel().setProperty("/materialSelec", obj);
            this.getView().getModel().refresh();
            this.byId("SplitAppId").to(this.createId("pagDocNuevo_productos_lista1"));
        },
        onMasterProductoSeleccionarMaterial: function (oEvent) {
            var obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
            this.getView().getModel().setProperty("/materialSeleccionado", obj);
            this.getView().getModel().refresh();
        },
        onSeleccionarCaracteristicas: function (oEvent) {
            var caracteristicas = this.getView().byId("comboCategoria").getSelectedKey();
            var dlg = "dlg_categoria_";
            var dlgtotal = dlg.concat(caracteristicas);
            if (caracteristicas !== " ") {
                if (caracteristicas == "08" | caracteristicas == "10" | caracteristicas == "12" | caracteristicas == "13" | caracteristicas == "16" | caracteristicas == "99") {
                    MessageToast.show("No se encontraron Características");
                } else {
                    this.getView().byId(dlgtotal).open();
                }
            } else {
                console.log(caracteristicas);
                MessageToast.show("Seleccione una Categoría", {
                    horizontally: 'center',
                    vertically: 'center'
                });
            }
        },
        onVolverCate01: function () {
            this.getView().byId("dlg_categoria_01").close();
        },
        onVolverCate02: function () {
            this.getView().byId("dlg_categoria_02").close();
        },
        onVolverCate03: function () {
            this.getView().byId("dlg_categoria_03").close();
        },
        onVolverCate04: function () {
            this.getView().byId("dlg_categoria_04").close();
        },
        onVolverCate05: function () {
            this.getView().byId("dlg_categoria_05").close();
        },
        onVolverCate06: function () {
            this.getView().byId("dlg_categoria_06").close();
        },
        onVolverCate07: function () {
            this.getView().byId("dlg_categoria_07").close();
        },
        onVolverCate09: function () {
            this.getView().byId("dlg_categoria_09").close();
        },
        onVolverCate11: function () {
            this.getView().byId("dlg_categoria_11").close();
        },
        onVolverCate14: function () {
            this.getView().byId("dlg_categoria_14").close();
        },
        onVolverCate15: function () {
            this.getView().byId("dlg_categoria_15").close();
        },
        show4000_0: function () {
            this.showBusyIndicator(4000, 0);
        },
    });
});