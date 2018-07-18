sap.ui.define([
], function() {
    "use strict";
    return {
        /*abrirFragment:function(self,idFragment,rutaFragment){
            var fragmentId = self.getView().createId(idFragment);
            var tab = sap.ui.core.Fragment.byId(fragmentId, "tab1");
            if (!self[idFragment]) {
                self[idFragment] = sap.ui.xmlfragment(
                    "pe.com.seidor.sap.decor.ventas.view."+rutaFragment,
                    self.getView().getController() // associate controller with the fragment            
                );
                self.getView().addDependent(self[idFragment]);
            }
            self[idFragment].open();
            self.getView().byId(fragmentId).open();
        },
        cerrarFragment:function(self,idFragment){
            if (self[idFragment]) {
                self[idFragment].destroy();
                delete self[idFragment];
            } 
        },*/
        DocDialogsFragments:function(){
            var fragDialogs= [
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoGeneral",
            idFrag: "dlg_MensajeAvisoGeneral"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoCrearCotizacion",
            idFrag: "dlg_MensajeAvisoCrearCotizacion"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoPedidoCreado",
            idFrag: "dlg_MensajeAvisoPedidoCreado"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogDocNuevoInicio",
            idFrag: "dlg_DialogDocNuevo"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogDocModificarInicio",
            idFrag: "dlg_DialogDocModificar"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogDocVisualizarInicio",
            idFrag: "dlg_DialogDocVisualizar"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogDocBuscarInicio",
            idFrag: "dlg_DialogDocBuscar"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocBuscarLista",
            idFrag: "dlg_DocBuscarLista"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoConversionPedido",
            idFrag: "dlg_MensajeAvisoConversionPedido"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogListaMaterialesPedidosMultiples",
            idFrag: "dlg_DialogListaMaterialesPedidosMultiples"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogPedidosMultiples",
            idFrag: "dlg_DialogPedidosMultiples"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoPedMultiple",
            idFrag: "dlg_MensajeAvisoPedMultiple"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogListaMaterialesSelectKit",
            idFrag: "dlg_DialogListaMaterialesSelectKit"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogListaMaterialesSelectKitDialog",
            idFrag: "dlg_DialogListaMaterialesSelectKitDialog"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevobuscarProfesional1",
            idFrag: "dlg_DocNuevobuscarProfesional1"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevobuscarProfesional2",
            idFrag: "dlg_DocNuevobuscarProfesional2"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogDocDscto",
            idFrag: "dlg_DialogDocDscto"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoCopiarDatosMod",
            idFrag: "dlg_MensajeAvisoCopiarDatos"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevobuscarCliente",
            idFrag: "dlg_DocNuevobuscarCliente"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevobuscarCliente_resultado",
            idFrag: "dlg_DocNuevobuscarCliente_resultado"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevobuscarClienteLista_resultado",
            idFrag: "dlg_DocNuevobuscarClienteLista_resultado"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevobuscarProfesional_resultado1",
            idFrag: "dlg_DocNuevobuscarProfesional_resultado1"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevobuscarProfesional_resultado2",
            idFrag: "dlg_DocNuevobuscarProfesional_resultado2"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevolistaClientes_resultado",
            idFrag: "dlg_DocNuevolistaClientes_resultado"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoGeneralValidacion",
            idFrag: "dlg_MensajeAvisoGeneralValidacion"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevobuscarProducto",
            idFrag: "dlg_DocNuevobuscar"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.Frag.Caracteristicas.DocCaracteristica",
            idFrag: "dlg_docCaracteristica"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_BuscarMaterialesLista",
            idFrag: "dlg_listaBuscarMateriales"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevoaddProducto",
            idFrag: "dlg_DocNuevoaddProducto"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevoaddProductoonDialog",
            idFrag: "dlg_DocNuevoaddProductoonDialog"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_stockDisponibleOnDialog",
            idFrag: "dlg_stockDisponibleOnDialog"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAviso1AddMaterial",
            idFrag: "dlg_MensajeAviso1"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevoAsignarAmbiente",
            idFrag: "dlg_DocNuevoAsignarAmbiente"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoEliminarMaterial",
            idFrag: "dlg_MensajeAvisoEliminarMaterial"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_stockPorLlegarDocNuevo",
            idFrag: "dlg_stockPorLlegarDocNuevo"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_stockPorLlegarMultiDocNuevo",
            idFrag: "dlg_stockPorLlegarMultiDocNuevo"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_stockPorPedirDocNuevo",
            idFrag: "dlg_stockPorPedirDocNuevo"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_stockPorPedirMultiDocNuevo",
            idFrag: "dlg_stockPorPedirMultiDocNuevo"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_MensajeAvisoAddCenAlmLot",
            idFrag: "dlg_MensajeAvisoAddCenAlmLot"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocNuevoaddPlanFacturacion",
            idFrag: "dlg_DocNuevoaddPlanFacturacion"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogDocReparto",
            idFrag: "dlg_DialogDocReparto"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DialogDocModificarReparto",
            idFrag: "dlg_DialogDocModificarReparto"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_DocBuscarImpresion",
            idFrag: "dlg_DocBuscarImpresion"
            },
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_preview_pdfDocBus",
            idFrag: "dlg_preview_pdfDocBus"
            }           
            ];

            return fragDialogs;

        },
        DocMasterDetailFragments:function(){
            var fragSplit= [
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.Frag.DocContenedorFragment",
            idFrag: "SplitAppId"
            }
            ];

            return fragSplit;

        },
        StockDialogsFragments:function(){
            var fragDialogs= [
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Stock.FragDialogs.dlg_pedComprometidos",
            idFrag: "dlg_pedComprometidos"
            }
            ];

            return fragDialogs;

        },
        HomeDialogsFragments:function(){
            var fragDialogs= [
            {ruta:"pe.com.seidor.sap.decor.ventas.view.Documentos.FragDialogs.dlg_preview_pdf",
            idFrag: "dlg_preview_pdf"
            }
            ];

            return fragDialogs;

        },


    };
});