sap.ui.define([
    'jquery.sap.global',
    "sap/m/MessageToast",
    "pe/com/seidor/sap/decor/ventas/services/materialServices",
    "pe/com/seidor/sap/decor/ventas/services/clienteServices",
    "pe/com/seidor/sap/decor/ventas/util/utilString"
], function(jQuery,MessageToast,materialServices,clienteServices,utilString) {
    "use strict";
    return {
        obtenerObservaciones: function (self, observaciones) {
            for (var indice in observaciones) {
                self.getView().getModel().setProperty("/observaciones/" + observaciones[indice].CodTexto, observaciones[indice]);
            }
        },
        obtenerInterlocutores: function (self, interlocutores, data) {
            for (var indice in interlocutores) {
                self.getView().getModel().setProperty("/interlocutores/" + interlocutores[indice].Funcion, interlocutores[indice]);
            }
            var interAGCliente = self.getView().getModel().getProperty("/interlocutores/AG/Cliente");
            if(interAGCliente.Mail == null || interAGCliente.Mail == "" ) {interAGCliente.Mail = data.objPedido.Mail;}
            self.getView().getModel().setProperty("/interlocutores/AG/Cliente",interAGCliente);
            //Profesional 1 == Z2
            self.getView().getModel().setProperty("/profesionales/CodProfesional", data.CodProfesional);
            self.getView().getModel().setProperty("/profesionales/NomProfesional", data.NomProfesional);
            //Profesional 2 == Z5
            self.getView().getModel().setProperty("/profesionales/CodProfesional2", data.CodProfesional2);
            self.getView().getModel().setProperty("/profesionales/NomProfesional2", data.NomProfesional2); 

                     
        },
        obtenerPreguntas: function (self, clienDatosAdic) {
            for (var indice in clienDatosAdic) {
                self.getView().getModel().setProperty("/preguntas/" + clienDatosAdic[indice].CODP, clienDatosAdic[indice]);
            }
        },
        obtenerClienteEventual: function (self, cliente) {
            var clienteEventual = self.getView().getModel().getProperty("/clienteEventual");
            clienteEventual.codigoCliente = cliente.Codigo;
            clienteEventual.nombreCliente = cliente.Descripcion; 
            clienteEventual.esEventual = cliente.Eventual;  
            self.getView().getModel().setProperty("/clienteEventual", clienteEventual);
        },
        obtenerMateriales: function (self, CodTipoDoc, materiales) {
            var listaMateriales = new Array();
            for (var indice in materiales) {
                var material = materiales[indice];
                var fechCantidad = moment(material.FechaCantConf).format('DD/MM/YYYY');
                material.FechaCantConf = fechCantidad; 

                ////Inicio Ultima Posicion//////////////
                sessionStorage.setItem("ultimaPosCortoMaterialPedOriginal", utilString.convertStringSumar(material.PosicionCorto,10) );
                sessionStorage.setItem("ultimaPosMaterialPedOriginal",utilString.pad( utilString.convertStringSumar(material.PosicionCorto,10), 6 ));
                ////End Ultima Posicion////////////////
                if(material.CodGrupoMat != null) {
                    //material
                    if(material.CodGrupoMat == "") {material.CodGrupoMat = " ";}
                    else {
                        var ambientes = dataIni.lstPreguntas[5].listaResp;
                        /*
                        var grupMaterial = ambientes.forEach((item, i) => {
                            if (item.Codigo == material.CodGrupoMat) { return item;}
                        });*/
                        var grupMaterial = jQuery.grep(ambientes, function(item, i){ // just use arr
                          return (item.Codigo == material.CodGrupoMat) ;
                        });
                        if(grupMaterial.length>0){
                        material.DesGrupoMat = grupMaterial[0].Descripcion;
                        }
                    }
                    if (CodTipoDoc == "Z025") { material.PrecioUnitario = material.PrecioSinIGV; }
                    material.Diferencia.Denominacion = " Mat.Diferencia";
                    material.PreZP08.Denominacion = " Pr.Srv.Transp.Manual";
                    //descuentos
                    var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                        {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
                    var descPrincipal = this.obtenerDescuento(material, listaPrincipal);
                    var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                        {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}, {"codigoSer": "DsctoAdicionalZD13"}, {"codigoSer": "Precio"}];
                    var descOtros = this.obtenerDescuento(material, listaOtros);
                    material.DescuentoPrincipal = descPrincipal;
                    material.DescuentoOtros = descOtros;
                    //valor descuento         
                    material.Vdscto = this.obtenerValorDescuento(material);

                    

                    //repartos                   
                    for(var indice in material.Repartos) {
                        var reparto = material.Repartos[indice];
                        var fechaEntrega =  moment(reparto.FechaEntrega).format('DD/MM/YYYY');
                        reparto.FechaEntrega = fechaEntrega;
                        reparto.FechaEntregaConf = fechaEntrega;
                        reparto.matPosicion = material.PosicionCorto;
                    }

                    //////Inicio Stock////////////////////////////////////////////////////////
                    /*
            if(self.getView().getModel().getProperty("/pedido/NumPedido")!="" ){
            
                var materialSeleccionado = {};
                materialSeleccionado.Posicion = material.Posicion;
                materialSeleccionado.CodMaterialCorto = material.CodMaterialCorto;  //11000004
                materialSeleccionado.DescMaterial = material.DescMaterial;  //VAINSA NVA ASIA D TEL BIDET TUB/MET 1.2MT C/SOP VAINSA NVA ASIA D TELBIDET TUB/MET 1.2
                materialSeleccionado.Cantidad = material.Cantidad;  //1
                materialSeleccionado.CodUMedida = material.CodUMedida;  //UN
                materialSeleccionado.Rendimiento = material.Rendimiento;  //-
                materialSeleccionado.fullName = material.CodCentro+" "+(material.DescCentro == undefined) ? "":material.DescCentro+" / "+material.CodAlmacen+" / "+material.CodLote;  //1080  / 0001 / 
                materialSeleccionado["ext-comp-1153"] = material.Zservicio;  //true
                materialSeleccionado.Peso = material.Peso;  //0.3
                materialSeleccionado.PesoNeto = material.PesoNeto;  //0.3
                materialSeleccionado.PrecioUnitario = material.PrecioUnitario;  //210.06
                materialSeleccionado.TotalDctos = material.TotalDctos;  //
                materialSeleccionado.SubTotal = material.SubTotal;  //210.06
                materialSeleccionado["ext-comp-1159"] = self.convertirFechaSistema(material.FechaCantConfStr);  //2017-07-19T05:00:00.000Z
                materialSeleccionado.CodGrupoMat = material.CodGrupoMat;  //08
                materialSeleccionado.Opcion = material.Opcion;  //01
                materialSeleccionado.MotivoRechazo = material.MotivoRechazo;  // 
                materialSeleccionado.PrioridadEntrega = material.PrioridadEntrega;  //03
                materialSeleccionado.codigoMaterial = material.CodMaterial;  //000000000011000004
                materialSeleccionado.pPosicion = material.Posicion;  //000010
                materialSeleccionado.pCentro = "";  //
                materialSeleccionado.dsctoLotes = material.dsctoLotes;  //1
                materialSeleccionado.auart = self.getView().getModel().getProperty("/documentoNuevo/Codigo");  //ZO01
                materialSeleccionado.verStock = 0;  //0
                materialSeleccionado.numPedido = self.getView().getModel().getProperty("/pedido/NumPedido");  //0020165432
                materialSeleccionado.valorRe = 0;
                materialSeleccionado.dsctoLotes = 1;
          
            var result = materialServices.stockDisponibleListaMateriales(materialSeleccionado);

                            if (result.c === "s") {
                                if (result.data.success) {
                                        material.stockDetallado = result.data.lstLoteTotal;
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
            

        }*/
            //////End Stock////////////////////////////////////////////////////////
                //Inicio Agregar mas detalles al Material/////////////
                            material.EsFlete = material.Material.EsFlete;
                            material.EsEstiba = material.Material.EsEstiba;
                            material.EspecialServ = material.Material.EspecialServ;
                            material.Tipo = material.Material.Tipo;
                            material.TieneServ = material.Material.TieneServ;
                            material.PrecioUnit = material.Material.PrecioUnit;
                            material.Stock = material.Material.Stock;
                            material.DescMovil = material.Material.DescMovil;
                //End Agregar mas detalles al Material///////////////
                    listaMateriales.push(material);
                }

                ////Materiales de Servicio material.CodGrupoMat=null////////////////////////////////////////////////////////////////
                if(CodTipoDoc=="ZO02" || CodTipoDoc=="Z035" || CodTipoDoc=="Z036" || CodTipoDoc=="Z037"){
                if(material.CodGrupoMat == null) {
                    //material
                    if(material.CodGrupoMat == "") {material.CodGrupoMat = " ";}
                    else {
                        var ambientes = dataIni.lstPreguntas[5].listaResp;
                        /*
                        var grupMaterial = ambientes.forEach((item, i) => {
                            if (item.Codigo == material.CodGrupoMat) { return item;}
                        });*/
                        var grupMaterial = jQuery.grep(ambientes, function(item, i){ // just use arr
                          return (item.Codigo == material.CodGrupoMat) ;
                        });
                        if(grupMaterial.length>0){
                        material.DesGrupoMat = grupMaterial[0].Descripcion;
                        }
                    }
                    if (CodTipoDoc == "Z025") { material.PrecioUnitario = material.PrecioSinIGV; }
                    material.Diferencia.Denominacion = " Mat.Diferencia";
                    material.PreZP08.Denominacion = " Pr.Srv.Transp.Manual";
                    //descuentos
                    var listaPrincipal = [{"codigoSer": "DctoDecorPorc"}, {"codigoSer": "DctoGenerico"}, {"codigoSer": "DctoZD11"}, {"codigoSer": "DctoGerenciaPorc"},
                        {"codigoSer": "DsctoAdicionalZD12"}, {"codigoSer": "Diferencia"}, {"codigoSer": "PreZP08"}, {"codigoSer": "ZP02"}, {"codigoSer": "DctoCT"}];
                    var descPrincipal = this.obtenerDescuento(material, listaPrincipal);
                    var listaOtros = [{"codigoSer": "DctoDecorMonto"}, {"codigoSer": "DctoAdicionalPorc"}, {"codigoSer": "DctoEstadisticoPorc"}, {"codigoSer": "DctoGerenciaMonto"},
                        {"codigoSer": "DctoZD06"}, {"codigoSer": "DctoZD07"}, {"codigoSer": "DctoGenericoZD08"}, {"codigoSer": "DsctoAdicionalZD13"}, {"codigoSer": "Precio"}];
                    var descOtros = this.obtenerDescuento(material, listaOtros);
                    material.DescuentoPrincipal = descPrincipal;
                    material.DescuentoOtros = descOtros;
                    //valor descuento         
                    material.Vdscto = this.obtenerValorDescuento(material);

                    

                    //repartos                   
                    for(var indice in material.Repartos) {
                        var reparto = material.Repartos[indice];
                        var fechaEntrega =  moment(reparto.FechaEntrega).format('DD/MM/YYYY');
                        reparto.FechaEntrega = fechaEntrega;
                        reparto.FechaEntregaConf = fechaEntrega;
                        reparto.matPosicion = material.PosicionCorto;
                    }

                    //////Inicio Stock////////////////////////////////////////////////////////
                    /*
            if(self.getView().getModel().getProperty("/pedido/NumPedido")!="" ){
            
                var materialSeleccionado = {};
                materialSeleccionado.Posicion = material.Posicion;
                materialSeleccionado.CodMaterialCorto = material.CodMaterialCorto;  //11000004
                materialSeleccionado.DescMaterial = material.DescMaterial;  //VAINSA NVA ASIA D TEL BIDET TUB/MET 1.2MT C/SOP VAINSA NVA ASIA D TELBIDET TUB/MET 1.2
                materialSeleccionado.Cantidad = material.Cantidad;  //1
                materialSeleccionado.CodUMedida = material.CodUMedida;  //UN
                materialSeleccionado.Rendimiento = material.Rendimiento;  //-
                materialSeleccionado.fullName = material.CodCentro+" "+(material.DescCentro == undefined) ? "":material.DescCentro+" / "+material.CodAlmacen+" / "+material.CodLote;  //1080  / 0001 / 
                materialSeleccionado["ext-comp-1153"] = material.Zservicio;  //true
                materialSeleccionado.Peso = material.Peso;  //0.3
                materialSeleccionado.PesoNeto = material.PesoNeto;  //0.3
                materialSeleccionado.PrecioUnitario = material.PrecioUnitario;  //210.06
                materialSeleccionado.TotalDctos = material.TotalDctos;  //
                materialSeleccionado.SubTotal = material.SubTotal;  //210.06
                materialSeleccionado["ext-comp-1159"] = self.convertirFechaSistema(material.FechaCantConfStr);  //2017-07-19T05:00:00.000Z
                materialSeleccionado.CodGrupoMat = material.CodGrupoMat;  //08
                materialSeleccionado.Opcion = material.Opcion;  //01
                materialSeleccionado.MotivoRechazo = material.MotivoRechazo;  // 
                materialSeleccionado.PrioridadEntrega = material.PrioridadEntrega;  //03
                materialSeleccionado.codigoMaterial = material.CodMaterial;  //000000000011000004
                materialSeleccionado.pPosicion = material.Posicion;  //000010
                materialSeleccionado.pCentro = "";  //
                materialSeleccionado.dsctoLotes = material.dsctoLotes;  //1
                materialSeleccionado.auart = self.getView().getModel().getProperty("/documentoNuevo/Codigo");  //ZO01
                materialSeleccionado.verStock = 0;  //0
                materialSeleccionado.numPedido = self.getView().getModel().getProperty("/pedido/NumPedido");  //0020165432
                materialSeleccionado.valorRe = 0;
                materialSeleccionado.dsctoLotes = 1;
          
            var result = materialServices.stockDisponibleListaMateriales(materialSeleccionado);

                            if (result.c === "s") {
                                if (result.data.success) {
                                        material.stockDetallado = result.data.lstLoteTotal;
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
            

        }*/
            //////End Stock////////////////////////////////////////////////////////
                //Inicio Agregar mas detalles al Material/////////////
                            material.EsFlete = material.Material.EsFlete;
                            material.EsEstiba = material.Material.EsEstiba;
                            material.EspecialServ = material.Material.EspecialServ;
                            material.Tipo = material.Material.Tipo;
                            material.TieneServ = material.Material.TieneServ;
                            material.PrecioUnit = material.Material.PrecioUnit;
                            material.Stock = material.Material.Stock;
                            material.DescMovil = material.Material.DescMovil;
                //End Agregar mas detalles al Material///////////////
                    listaMateriales.push(material);
                }
                var tipoFore = self.getView().getModel().getProperty("/pedido/TipoForecast");
                self.getView().getModel().setProperty("/pedido/TipoForecast",(tipoFore !="" )? (tipoFore != undefined) ? tipoFore: "" : "" );

                }
                ///////////////////////////////////////////////////////////////////////////////////////////

                
                self.getView().getModel().setProperty("/listaMaterial", listaMateriales);
            }
        },
        obtenerDescuento: function (material, descuentos) {
            var listaDescuento = [];
            for (var indice in descuentos) {
                material[descuentos[indice].codigoSer].matPosicion = material.PosicionCorto;
                if(descuentos[indice].codigoSer == "ZP02") {
                    if(material.Precio.Condicion == "ZP02" && material.Precio.Valor != 0){}
                    else{ 
                        material[descuentos[indice].codigoSer].ImpAnterior = Math.abs(material[descuentos[indice].codigoSer].Importe);//21-05-2018 Roy flag agregar Descuentos en cero
                        listaDescuento.push(material[descuentos[indice].codigoSer]); 
                    }
                } else {
                    material[descuentos[indice].codigoSer].ImpAnterior = Math.abs(material[descuentos[indice].codigoSer].Importe);//21-05-2018 Roy flag agregar Descuentos en cero
                    listaDescuento.push(material[descuentos[indice].codigoSer]);
                }
            }
            return listaDescuento;
        },
        obtenerValorDescuento: function (material) {
            var acumulado = 0;
            var listaDescuento = material.DescuentoPrincipal.concat(material.DescuentoOtros);
          //  listaDescuento.concat(material.DescuentoOtros);
            for(var indice in listaDescuento) {
                var descuento = listaDescuento[indice];
                var tipo = descuento.Condicion; 
                var condicion = tipo.substring(0, 2);
                if (descuento.Importe != 0 && condicion == "ZD" && tipo != "ZD03"){
                    var importe = descuento.Importe;
                    if (importe < 0) { importe = importe * -1; }
                    acumulado = acumulado + importe; 
                }
            }
            return acumulado;
        },

        abrirAvisoGeneral:function(self, texto){
            sap.ui.getCore().byId("txt_aviso_general").setText(texto); 
                        sap.ui.getCore().byId("dlg_MensajeAvisoGeneral").open();
        },
        crearDetalleEmpresa:function(busquedaDTO){
        var objEmpresa={"id":1,
                            "PedidoId":0,
                            "Funcion":"AG",
                            "Codigo":busquedaDTO.Codigo ,
                            "Ruc":busquedaDTO.Ruc,
                            "Descripcion":busquedaDTO.Descripcion,
                            "Titulo":"",
                            "Direccion":busquedaDTO.Direccion,
                            "DireccionCompleta":"",
                            "Ciudad":busquedaDTO.Ciudad,
                            "Pais":"",
                            "CodigoPostal":busquedaDTO.CodigoPostal,
                            "Distrito":busquedaDTO.Ciudad,
                            "Telefono":busquedaDTO.Telefono,
                            "TelefonoMovil":"",
                            "Mail":busquedaDTO.Mail,
                            "PersonaFisica":false,
                            "Eventual":false,
                            "ApPat":"",
                            "ApMat":"",
                            "TranspZone":"",
                            "CodPersona":"",
                            "Nombre":"",
                            "Apellido":"",
                            "Iniciales":"",
                            "ApeSoltero":"",
                            "DescripcionP":"",
                            "Dni":"",
                            "TelefonoP":""};
            return objEmpresa;
        },
        crearEmpresa: function(busquedaDTO){
        var empresa = {"Codigo": busquedaDTO.Codigo,
                            "Ruc": busquedaDTO.Ruc,
                            "Descripcion": busquedaDTO.Descripcion,
                            "Direccion": busquedaDTO.Direccion,
                            "CodigoPostal": busquedaDTO.Ciudad,
                            "Telefono": busquedaDTO.Telefono,
                            "Mail": busquedaDTO.Mail,
                            "UserId": window.dataIni.user.User,
                            "PwdId": window.dataIni.user.Password,
                            "Id": window.dataIni.user.Id,
                            "grabaRuc": "X",
                            "empresa": JSON.stringify(this.crearDetalleEmpresa(busquedaDTO))};
            return empresa;
        },
    validarGuardarDocumento:function(self){
    var condicion = true;
    //while(condicion){
            var pru = self.getView().getModel().getProperty("/preguntas");

                var prueba2 = self.getView().getModel().getProperty("/preguntas");
                var valor = self.getView().getModel().getProperty("/preguntas/1/CODR"); //tipo de cliente   
                var valor2 = self.getView().getModel().getProperty("/preguntas/10/CODR"); //tipo de contruccion
                var valor3 = self.getView().getModel().getProperty("/preguntas/15/CODR"); //tipo de proyecto -  residencial
                var valor4 = self.getView().getModel().getProperty("/preguntas/20/CODR"); //tipo de proyecto - institucional

                //ini - JLM - validacion de ambientes
                var temp25 = self.getView().getModel().getProperty("/preguntas/25/CODR");
                var temp30 = "";
                var temp35 = self.getView().getModel().getProperty("/preguntas/35/CODR");
                var temp40 = "1";
                var temp45 = "1";
                var temp50 = "1";
                var temp55 = "1";

                //fin - JLM - validacion de ambientes

                

                var codDoc = self.getView().getModel().getProperty("/pedido/CodTipoDoc");
                var canaldist = self.getView().getModel().getProperty("/pedido/CanalDist");

                //FST 30/09/2013 TelMovilDestMercancia INICIO
                //              var atencion = objPedidoStore.last().data.textoAtencion;
                //              var referenciaDireccion = objPedidoStore.last().data.textoRefDireccion;
                //              if (atencion == "" && this.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01') {
                //                  MessageToast.show('Aviso', 'No se ha ingresado el texto de atención.', function(res) {
                //                  }, this);
                //                  return;
                //              }

                //              if (referenciaDireccion == "" && this.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01') {
                //                  MessageToast.show('Aviso', 'No se ha ingresado el texto de referencia de dirección.', function(res) {
                //                  }, this);
                //                  return;
                //              }
                //              for (var i = 0; i < interlocutoresStore.data.items.length; i++) {
                //                  if (interlocutoresStore.data.items[i].data.Funcion == "WE") {
                //                      if (interlocutoresStore.data.items[i].data.TelefonoMovil == "" && this.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01') {
                //                          MessageToast.show('Aviso', 'No se ha ingresado el teléfono móvil del destinatario de mercancía.', function(res) {
                //                         }, this);
                //                        return;
                //                      }
                //                      else {
                //                          continue;
                //                      }
                //                  }
                //              }
                //FST 30/09/2013 TelMovilDestMercancia FIN

                //FST 31/12/2013 DatosObligatoriosPedidos INICIO
                //La mejora original (TelMovilDestMercancia) requería que los datos sean de ingreso obligatorio en caso de cotizaciones.
                //El cambio requerido últimamente fue que sea obligatorio en caso de pedidos.
                var atencion = self.getView().getModel().getProperty("/observaciones/ZP01/Descripcion");
                var referenciaDireccion = self.getView().getModel().getProperty("/observaciones/ZP07/Descripcion");
                
                    if (atencion == "" && (
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z003' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z004' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z005' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z009' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z010' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z013' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z014' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z033' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z034' ||
                    //  objPedidoStore.last().data.CodTipoDoc == 'Z035' ||
                        //self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z037' ||
                        self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z038'
                        )) {
                        
                        this.abrirAvisoGeneral(self, "No se ha ingresado el texto de atención en observaciones.");
                        condicion = false;
                        return;
                    }

                if (referenciaDireccion == "" && (
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z003' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z004' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z005' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z009' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z010' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z013' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z014' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z033' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z034' ||
                //  self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z035' ||
                    //self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z037' ||
                    self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z038'
                    )) {
                    this.abrirAvisoGeneral(self, "No se ha ingresado el texto de referencia de dirección en interlocutores: observaciones.");
                    condicion = false;
                    return;
                }

                /////////////////////////////////////////////////////////////////////
                        if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/TelefonoMovil") == "" && (
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z003' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z004' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z005' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z009' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z010' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z013' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z014' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z033' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z034' ||
                        //  self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z035' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z037' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z038'
                            )) {
                            this.abrirAvisoGeneral(self, "No se ha ingresado el teléfono móvil en Interlocutores: Dest. Mcia.");
                            condicion = false;
                            return;
                        }


        if(                 self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z003' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z004' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z005' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z009' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z010' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z013' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z014' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z033' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z034' ||
                        //  self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z035' ||
                            //self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z037' ||
                            self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z038'){

                ////Inicio Validar Interlocutores////////////////////////////////////////////////////
                            //validadndo el correo
            /*var model = Ext.ModelMgr.create(panel1.getValues(), 'interlocutoresModel');
            var errors = model.validate(), message = "";
            if (errors.isValid())
            {

            } else
            {
            Ext.each(errors.items, function(rec, i)
            {
            message += rec.message + "<br>";
            });
                    MessageToast.show("Validación", message, function() { });
                    return false;
            }*/


            //6000001216 INSERT BEGIN OF EDC 26.10.2016


            var solicitanteAG = self.getView().getModel().getProperty("/interlocutores/AG");
            var mailAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Mail");
            var descripcionAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Descripcion");
            var direccionAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion");
            var telefonoAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Telefono");
            var ruc = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");

            var datosAdic =  self.getView().getModel().getProperty("/cliente");
            if (mailAG == "" || mailAG == " ")
            {   
                this.abrirAvisoGeneral(self, "Interlocutores: Solicitante, Mail inválido.");
                condicion = false;
                return;
            }
            if (ruc != "" || ruc != " ")
            {
                if (ruc.length != 8 && ruc.length != 11)
                {
                    this.abrirAvisoGeneral(self, "Dato incorrecto,valor de DNI debe ser 8 dígitos y RUC 11 dígitos");
                    condicion = false;
                    return;
                }else{
                    /*if(descripcionAG=="" && direccionAG==""){
                        //Inicio Grabar Ruc
                            var crearEmpresa = this.crearEmpresa(solicitanteAG.Cliente, self);
                            if(crearEmpresa.Ruc.length==11){
                                var result = clienteServices.validarInterlocutores(crearEmpresa);
                            if (result.data.success) {  
                            self.obtenerDatosInterlocutorAgDni1(self.getView().getModel().getProperty("/interlocutores/AG/Cliente"));         
                            } else {
                                //self.borrarInterlocutores();
                                this.abrirAvisoGeneral(self, result.data.errors.reason);
                                    condicion = false;
                                break;
                            }
                        }*/
                            //End Grabar Ruc
                            /*var result = clienteServices.validarInterlocutores(solicitanteAG.Cliente.Ruc, 
                                                                                solicitanteAG.Cliente.Descripcion,
                                                                                 solicitanteAG.Cliente.Direccion, 
                                                                                 solicitanteAG.Cliente.CodigoPostal, 
                                                                                 solicitanteAG.Cliente.Telefono, 
                                                                                 solicitanteAG.Cliente.Mail, 
                                                                                 solicitanteAG.Cliente.Ruc
                                                                                );
                            if (result.data.success) {  
                                    
                            } else {
                                this.abrirAvisoGeneral(self, result.data.errors.reason);
                                    condicion = false;
                        break;
                            }*/         
                    /*}   */
                    }
            }


            if(self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036' || 
                //self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01' ||
                //self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001' ||
                //self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z003' ||
                //self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z004' ||
                self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z009' || 
                self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z010' ||
                //self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z034' ||
                self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z015'){

                        //Todos los tipo de Doc. que no piden datos de seguimiento, solo piden llenar solicitante y resp. pago

                         if (((descripcionAG != "" || descripcionAG != " ") && (direccionAG == "" || direccionAG == " ")) || ((descripcionAG == "" || descripcionAG == " ") && (direccionAG != "" || direccionAG != " ")))
                        {   
                            this.abrirAvisoGeneral(self, "Falta Llenar los campos del Solicitante y/o Dirección y/o Ruc del Solicitante.");
                            condicion = false;
                            return;
                        }


                }else{
                    
                    if (((descripcionAG != "" || descripcionAG != " ") && (direccionAG == "" || direccionAG == " ")) || ((descripcionAG == "" || descripcionAG == " ") && (direccionAG != "" || direccionAG != " ")))
                    {   
                        this.abrirAvisoGeneral(self, "Falta Llenar los campos del Solicitante y/o Dirección y/o Teléfono del Solicitante.");
                        condicion = false;
                        return;
                    }

                    if (telefonoAG == "" || telefonoAG == " ")
                    {   
                        this.abrirAvisoGeneral(self, "Falta Llenar el campo Teléfono del Solicitante.");
                        condicion = false;
                        return;
                    }

                if((canaldist!="20" && canaldist!="30")&& datosAdic.Ruc.length==10 ){
                    if (datosAdic.Ruc == "" || datosAdic.Ruc == " " ||
                        datosAdic.APPAT == "" || datosAdic.APPAT == undefined ||
                        datosAdic.APMAT == "" || datosAdic.APMAT == undefined ||
                        datosAdic.NOMBRE == "" || datosAdic.NOMBRE == undefined ||
                        datosAdic.FECNAC == "" || datosAdic.FECNAC == " " ||
                        datosAdic.GRAINS == "" || datosAdic.GRAINS == " " ||
                        datosAdic.CodigoPostal == "" || datosAdic.CodigoPostal == " " )
                    {   
                        this.abrirAvisoGeneral(self, "Falta completar los datos de seguimiento del cliente.");
                        condicion = false;
                        return;
                    }
                    
                    if (datosAdic.EDAD == "" || datosAdic.EDAD == " " )
                    {   
                        this.abrirAvisoGeneral(self, "Falta Calcular edad, seleccione fecha de nacimiento.");
                        condicion = false;
                        return;
                    }
                }
            //6000001216 INSERT END OF EDC 26.10.2016




            //INSERT BEGIN OF EDC 24.08.2015

            //              if (objPedidoStore.last().data.CanalDist == '10') 
            //              {
            //                   if (objPedidoStore.last().data.CodTipoDoc == "ZO01" || objPedidoStore.last().data.CodTipoDoc == "ZO02" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z001" || objPedidoStore.last().data.CodTipoDoc == "Z002" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z003" || objPedidoStore.last().data.CodTipoDoc == "Z004" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z034") 
            //                  {
            //                  
            //                      if (interlocutoresStore.data.items[0].data.Ruc.length <= 8 && cliEventualStore.last().data.esEventual.toLowerCase().trim() == "true") 
            //                      {
            //                              
            //                          var amb1 = panel8.items.items[17].value;
            //                          var amb2 = panel8.items.items[19].value;
            //                          var amb3 = panel8.items.items[21].value;
            //                          
            //                          if ( amb1 == "" || amb1 == undefined )
            //                          {
            //                              amb1 = "";
            //                          }

            //                          if ( amb2 == "" || amb2 == undefined )
            //                          {
            //                              amb2 = "";
            //                          }
            //                          
            //                          if ( amb3 == "" || amb3 == undefined )
            //                          {
            //                              amb3 = "";
            //                          }                           
            //                           for (var i = 0; i < preguntasStore.data.items[5].data.listaResp.length; i++)
            //                           {
            //                              if (amb1 == preguntasStore.data.items[5].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb1 = preguntasStore.data.items[5].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb1 == "" || descAmb1 == undefined )
            //                           {
            //                              descAmb1 = "";
            //                           }
            //                           
            //                          
            //                          for (var i = 0; i < preguntasStore.data.items[7].data.listaResp.length; i++)
            //                           {
            //                              if (amb2 == preguntasStore.data.items[7].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb2 = preguntasStore.data.items[7].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb2 == "" || descAmb2 == undefined )
            //                           {
            //                              descAmb2 = "";
            //                           }
            //                           
            //                           for (var i = 0; i < preguntasStore.data.items[9].data.listaResp.length; i++)
            //                           {
            //                              if (amb3 == preguntasStore.data.items[9].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb3 = preguntasStore.data.items[9].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb3 == "" || descAmb3 == undefined )
            //                           {
            //                              descAmb3 = "";
            //                           }
            //                           
            //                           
            //                           if ( descAmb1 == descAmb2 && descAmb1 == descAmb3 && descAmb2 == descAmb3 &&
            //                                descAmb1 != "" && descAmb2 != "" && descAmb3 != "" ) 
            //                           {
            //                              MessageToast.show("Validación", "Datos Cliente: Ambiente1,Ambiente2 y Ambiente 3 no deben ser iguales", function() { });
            //                              return false;
            //                           }
            //                           else{
            //                              if ( descAmb1 == "" && descAmb2 == "" && descAmb3 == "" )
            //                              {
            //                                  MessageToast.show("Validación", "Ingresar minimo un Ambiente", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb1 == descAmb2 && descAmb1 != "" && descAmb2 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente2 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb1 == descAmb3 && descAmb1 != "" && descAmb3 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente3 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb2 == descAmb3 && descAmb2 != "" && descAmb3 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente2 y Ambiente3 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                           
            //                           }
            //                       
            //                       }
            //                   
            //                   }
            //               
            //               }

            //INSERT END OF EDC 24.08.2015

            //validacion para que copie los datos del solicitante a todos los interlocutores
            var rucAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");
            var desAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Descripcion");
            var dirAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion");
            var codPostalAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/CodigoPostal");
            var telAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Telefono");
            var lengthAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion").length;
            if (lengthAG > 60)
            {
                this.abrirAvisoGeneral(self, 'No se permiten más de 60 caractéres en la dirección del Solicitante. Existe ' + lengthAG + ' caracteres.');
                condicion = false;
                return;
            }
            var desWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion");
            var dirWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion");
            var lengthWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion").length;
            if (lengthWE > 60)
            {
                this.abrirAvisoGeneral(self, 'No se permiten más de 60 caractéres en la dirección del Dest.Mcia. Existe ' + lengthWE + ' caracteres.');
                condicion = false;
                return;
            }
            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Descripcion", desAG); //panel2.items.items[2].setValue(panel1.getValues().Descripcion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Direccion", dirAG);
                //panel2.items.items[3].setValue(panel1.getValues().Direccion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/CodigoPostal") == null)//EDC
            //                if (panel2.getValues().Distrito == "" || panel2.getValues().Distrito == null)//EDC
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/CodigoPostal", codPostalAG);
                //panel2.items.items[4].setValue(panel1.getValues().CodigoPostal);
                var cpostalwe = codPostalAG; // ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                if (cpostalwe)
                {
                    var nombrewe = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion"); //cpostalwe.data.Descripcion;
                }
                /*
                var interwe = interlocutoresStore.findRecord('Funcion', 'WE');
                interwe.set('Ciudad', nombrewe);///Roy: Por Revisar
                interwe.set('Distrito', nombrewe);///Roy: Por Revisar*/
            }

            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Telefono", telAG);
                //panel2.items.items[5].setValue(panel1.getValues().Telefono);
            }

            //FST 09/10/2013 TelMovilDestMercancia INICIO
            //if (panel2.getValues().TelefonoMovil == "" || panel2.getValues().TelefonoMovil == null) {
            //    panel2.items.items[6].setValue(panel2.getValues().TelefonoMovil);
            //}
            //FST 09/10/2013 TelMovilDestMercancia FIN

            //ROY: Comentado  objPedidoStore.sync();
            //Roy: Comentado interlocutoresStore.sync();

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Descripcion") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Descripcion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Descripcion", desAG);
                //panel3.items.items[2].setValue(panel1.getValues().Descripcion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Direccion", dirAG);
                //panel3.items.items[3].setValue(panel1.getValues().Direccion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/CodigoPostal") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/CodigoPostal", codPostalAG);
                //panel3.items.items[4].setValue(panel1.getValues().CodigoPostal);
                /*Roy: ya seteamos de golpe :)
                 var cpostalre = ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                 if (cpostalre)
                 {
                 var nombrere = cpostalre.data.Descripcion;
                 }
                 var interre = interlocutoresStore.findRecord('Funcion', 'RE');
                 interre.set('Ciudad', nombrere);
                 interre.set('Distrito', nombrere);*/
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Telefono", telAG);
                //panel3.items.items[5].setValue(panel1.getValues().Telefono);
            }
            //objPedidoStore.sync();
            //interlocutoresStore.sync();

            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Ruc", rucAG);
                //panel4.items.items[2].setValue(panel1.getValues().Ruc);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Descripcion", desAG);
                //panel4.items.items[3].setValue(panel1.getValues().Descripcion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Direccion", dirAG);
                //panel4.items.items[4].setValue(panel1.getValues().Direccion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/CodigoPostal") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/CodigoPostal", codPostalAG);
                //panel4.items.items[5].setValue(panel1.getValues().CodigoPostal);
                /*Roy: en vano :)
                 var cpostalrg = ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                 if (cpostalrg)
                 {
                 var nombrerg = cpostalrg.data.Descripcion;
                 }
                 var interrg = interlocutoresStore.findRecord('Funcion', 'RG');
                 interrg.set('Ciudad', nombrerg);
                 interrg.set('Distrito', nombrerg);
                 */
            }

            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Telefono", telAG);
                //panel4.items.items[6].setValue(panel1.getValues().Telefono);
            }
                            
                }

                    ////End Validar Interlocutores///////////////////////////////////////////////////////


                
            }
                        
                    
                
                //FST 31/12/2013 DatosObligatoriosPedidos FIN
                
                //BEGIN OF EDC 25/02/2015: Validación texto referencia factura
                if ( self.getView().getModel().getProperty("/pedido/CodTipoDoc") == "Z001" ||
                     self.getView().getModel().getProperty("/pedido/CodTipoDoc") == "Z003"  )
                {
//                    if ( self.getView().getModel().getProperty("/pedido/CodTipoDoc") != "Z004" )
//                    {
                        if ( self.getView().getModel().getProperty("/pedido/CanalDist") == "10" && 
                             self.getView().getModel().getProperty("/pedido/CodOficina") != "1080")
                        {
                            if ( self.getView().getModel().getProperty("/observaciones/ZP06/Descripcion") == "" )
                            {
                                this.abrirAvisoGeneral(self, "No se ha ingresado Referencia de factura en Observaciones.");
                                condicion = false;
                                return;
                            }
                        }
//                    } 
                }       
                //END OF EDC 25/02/2015
                if(self.getView().getModel().getProperty("/listaMaterial/0") == null){
                }
                    else{
                //BEGIN OF EDC 21/07/2015: Componentes
                for (var i = 0; i < self.getView().getModel().getProperty("/listaMaterial").length; i++)
                {
                    var matCombo = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto").substring(0, 1);
                    
                    if (matCombo == '4' && self.getView().getModel().getProperty("/listaMaterial/"+i+"/PosSup") == '000000')
                    {
                        var centroRaiz = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodCentro");
                        var matCombo2 = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto");
                    }
                    else
                    {
                        if (matCombo != '4' && self.getView().getModel().getProperty("/listaMaterial/"+i+"/PosSup") == '000000')
                        {
                           centroRaiz = "";
                           matCombo2 = "";
                        }
                    }
                    
                    if ( centroRaiz != "" )
                    {
                        if ( centroRaiz != self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodCentro") )
                        {
                            this.abrirAvisoGeneral(self, "Centros diferentes en componentes de Material Combo:" + matCombo2 + '.');
                            condicion = false;
                            return;
                        }                     
                    }
                }
                
                //END OF EDC 21/07/2015
                
                //6000000771 INCIO EDC 24.06.2016
                for(var i = 0; i < self.getView().getModel().getProperty("/listaMaterial").length; i++)
                {
                    var codMat = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodMaterialCorto");
                    var codPosCor = self.getView().getModel().getProperty("/listaMaterial/"+i+"/PosicionCorto");
                    var Mstae = self.getView().getModel().getProperty("/listaMaterial/"+i+"/MSTAE");
                        if (Mstae == '01' )
                        {
                            this.abrirAvisoGeneral(self, "Material:" + codMat + ' Pos.' + codPosCor + '\n Tiene Status: Inactivo.'+'\n Borrarlo para Continuar.');
                            condicion = false;
                            return;
                        }
                }
                //FIN
            }
                if (canaldist == '10') 
                {
                    if (codDoc == "ZO01" || codDoc == "ZO02" || codDoc == "Z001" ||
                    codDoc == "Z002" || codDoc == "Z003" || codDoc == "Z004" || codDoc == "Z034") 
                    {
                        //FST 07.01.2013 OmisionObligatoriedadDatosClienteCodificado INICIO
                        //Omite el ingreso de los datos de fidelización de clientes cuando se trate de un cliente codificado
                        //if (interlocutoresStore.data.items[0].data.Ruc.length <= 8) {
                        if (self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length <= 8 && 
                            self.getView().getModel().getProperty("/clienteEventual/esEventual") == true) //Roy: Falta colocar un valor verdadero
                        {
                            //FST 07.01.2013 OmisionObligatoriedadDatosClienteCodificado FIN
                            if (valor == "") {
                                this.abrirAvisoGeneral(self, "Debe completar el tipo de cliente en Interlocutores: Datos Cliente");
                                condicion = false;
                                return;
                            }

                            if (valor2 == "") {
                                this.abrirAvisoGeneral(self, "Debe ingresar el tipo de Construcción en Interlocutores: Datos Cliente");
                                condicion = false;
                                return;

                            }

                            if (valor4 == "" && valor3 == "") {
                                this.abrirAvisoGeneral(self, "Debe ingresar un tipo de Proyecto en Interlocutores: Datos Cliente");
                                condicion = false;
                                return;

                            } else {

                                if (valor4 != "" && valor3 != "") {
                                    this.abrirAvisoGeneral(self, "Debe ingresar solo un tipo de proyecto: Institucional o Residencial");
                                    condicion = false;
                                    return;
                                }

                            }
                            //MDEC072 : DELETE BEGIN OF EDC 25.11.2015 : Ambientes
                            //JLM - Validacion ambientes (ini)
////                            if (temp30 == "") {
////                                MessageToast.show('Aviso', 'Debe ingresar Ambiente 1 en -> Interlocutores -> Datos de cliente.', function(res) {
////                                }, self);
////                                return;
////                            }

                            if (temp35 == "") {
                                this.abrirAvisoGeneral(self, "Debe ingresar Estilo 1  en -> Interlocutores -> Datos de cliente.");
                                condicion = false;
                                return;
                            }
/////////////////////Inicio Validacion Roy ///////////////////////////////////////////////////////////////////////////////////////////////////////
                            if(self.getView().getModel().getProperty("/pedido/CodTipoDoc") =="ZO01"){
                                    ////Inicio Validar Interlocutores////////////////////////////////////////////////////
                            //validadndo el correo
            /*var model = Ext.ModelMgr.create(panel1.getValues(), 'interlocutoresModel');
            var errors = model.validate(), message = "";
            if (errors.isValid())
            {

            } else
            {
            Ext.each(errors.items, function(rec, i)
            {
            message += rec.message + "<br>";
            });
                    MessageToast.show("Validación", message, function() { });
                    return false;
            }*/


            //6000001216 INSERT BEGIN OF EDC 26.10.2016


            var solicitanteAG = self.getView().getModel().getProperty("/interlocutores/AG");
            var mailAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Mail");
            var descripcionAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Descripcion");
            var direccionAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion");
            var telefonoAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Telefono");
            var ruc = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");

            var datosAdic =  self.getView().getModel().getProperty("/cliente");
            if (mailAG == "" || mailAG == " ")
            {   
                this.abrirAvisoGeneral(self, "Interlocutores: Solicitante, Mail inválido.");
                condicion = false;
                return;
            }
            if (ruc != "" || ruc != " ")
            {
                if (ruc.length != 8 && ruc.length != 11)
                {
                    this.abrirAvisoGeneral(self, "Dato incorrecto,valor de DNI debe ser 8 dígitos y RUC 11 dígitos");
                    condicion = false;
                    return;
                }else{
                    /*if(descripcionAG=="" && direccionAG==""){
                        //Inicio Grabar Ruc
                            var crearEmpresa = this.crearEmpresa(solicitanteAG.Cliente, self);
                            if(crearEmpresa.Ruc.length==11){
                                var result = clienteServices.validarInterlocutores(crearEmpresa);
                            if (result.data.success) {  
                            self.obtenerDatosInterlocutorAgDni1(self.getView().getModel().getProperty("/interlocutores/AG/Cliente"));         
                            } else {
                                //self.borrarInterlocutores();
                                this.abrirAvisoGeneral(self, result.data.errors.reason);
                                    condicion = false;
                                break;
                            }
                        }*/
                            //End Grabar Ruc
                            /*var result = clienteServices.validarInterlocutores(solicitanteAG.Cliente.Ruc, 
                                                                                solicitanteAG.Cliente.Descripcion,
                                                                                 solicitanteAG.Cliente.Direccion, 
                                                                                 solicitanteAG.Cliente.CodigoPostal, 
                                                                                 solicitanteAG.Cliente.Telefono, 
                                                                                 solicitanteAG.Cliente.Mail, 
                                                                                 solicitanteAG.Cliente.Ruc
                                                                                );
                            if (result.data.success) {  
                                    
                            } else {
                                this.abrirAvisoGeneral(self, result.data.errors.reason);
                                    condicion = false;
                        break;
                            }*/         
                    /*}*/   
                    }
            }


            if(self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z036'){

                        

                         if (((descripcionAG != "" || descripcionAG != " ") && (direccionAG == "" || direccionAG == " ")) || ((descripcionAG == "" || descripcionAG == " ") && (direccionAG != "" || direccionAG != " ")))
                        {   
                            this.abrirAvisoGeneral(self, "Falta Llenar el campo del Solicitante y/o Dirección y/o Ruc.");
                            condicion = false;
                            return;
                        }


                }else{
                    if (((descripcionAG != "" || descripcionAG != " ") && (direccionAG == "" || direccionAG == " ")) || ((descripcionAG == "" || descripcionAG == " ") && (direccionAG != "" || direccionAG != " ")))
            {   
                this.abrirAvisoGeneral(self, "Falta Llenar el campo del Solicitante y/o Dirección y/o Teléfono.");
                condicion = false;
                return;
            }

            if (telefonoAG == "" || telefonoAG == " ")
            {   
                this.abrirAvisoGeneral(self, "Falta Llenar el campo Teléfono del Solicitante.");
                condicion = false;
                return;
            }

            if (datosAdic.Ruc == "" || datosAdic.Ruc == " " ||
                datosAdic.APPAT == "" || datosAdic.APPAT == undefined ||
                datosAdic.APMAT == "" || datosAdic.APMAT == undefined ||
                datosAdic.NOMBRE == "" || datosAdic.NOMBRE == undefined ||
                datosAdic.FECNAC == "" || datosAdic.FECNAC == " " ||
                datosAdic.GRAINS == "" || datosAdic.GRAINS == " " ||
                datosAdic.CodigoPostal == "" || datosAdic.CodigoPostal == " " )
            {   
                this.abrirAvisoGeneral(self, "Falta completar los datos de seguimiento del cliente.");
                condicion = false;
                return;
            }
            
            if (datosAdic.EDAD == "" || datosAdic.EDAD == " " )
            {   
                this.abrirAvisoGeneral(self, "Falta Calcular edad, seleccione fecha de nacimiento.");
                condicion = false;
                return;
            }

            //6000001216 INSERT END OF EDC 26.10.2016




            //INSERT BEGIN OF EDC 24.08.2015

            //              if (objPedidoStore.last().data.CanalDist == '10') 
            //              {
            //                   if (objPedidoStore.last().data.CodTipoDoc == "ZO01" || objPedidoStore.last().data.CodTipoDoc == "ZO02" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z001" || objPedidoStore.last().data.CodTipoDoc == "Z002" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z003" || objPedidoStore.last().data.CodTipoDoc == "Z004" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z034") 
            //                  {
            //                  
            //                      if (interlocutoresStore.data.items[0].data.Ruc.length <= 8 && cliEventualStore.last().data.esEventual.toLowerCase().trim() == "true") 
            //                      {
            //                              
            //                          var amb1 = panel8.items.items[17].value;
            //                          var amb2 = panel8.items.items[19].value;
            //                          var amb3 = panel8.items.items[21].value;
            //                          
            //                          if ( amb1 == "" || amb1 == undefined )
            //                          {
            //                              amb1 = "";
            //                          }

            //                          if ( amb2 == "" || amb2 == undefined )
            //                          {
            //                              amb2 = "";
            //                          }
            //                          
            //                          if ( amb3 == "" || amb3 == undefined )
            //                          {
            //                              amb3 = "";
            //                          }                           
            //                           for (var i = 0; i < preguntasStore.data.items[5].data.listaResp.length; i++)
            //                           {
            //                              if (amb1 == preguntasStore.data.items[5].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb1 = preguntasStore.data.items[5].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb1 == "" || descAmb1 == undefined )
            //                           {
            //                              descAmb1 = "";
            //                           }
            //                           
            //                          
            //                          for (var i = 0; i < preguntasStore.data.items[7].data.listaResp.length; i++)
            //                           {
            //                              if (amb2 == preguntasStore.data.items[7].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb2 = preguntasStore.data.items[7].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb2 == "" || descAmb2 == undefined )
            //                           {
            //                              descAmb2 = "";
            //                           }
            //                           
            //                           for (var i = 0; i < preguntasStore.data.items[9].data.listaResp.length; i++)
            //                           {
            //                              if (amb3 == preguntasStore.data.items[9].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb3 = preguntasStore.data.items[9].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb3 == "" || descAmb3 == undefined )
            //                           {
            //                              descAmb3 = "";
            //                           }
            //                           
            //                           
            //                           if ( descAmb1 == descAmb2 && descAmb1 == descAmb3 && descAmb2 == descAmb3 &&
            //                                descAmb1 != "" && descAmb2 != "" && descAmb3 != "" ) 
            //                           {
            //                              MessageToast.show("Validación", "Datos Cliente: Ambiente1,Ambiente2 y Ambiente 3 no deben ser iguales", function() { });
            //                              return false;
            //                           }
            //                           else{
            //                              if ( descAmb1 == "" && descAmb2 == "" && descAmb3 == "" )
            //                              {
            //                                  MessageToast.show("Validación", "Ingresar minimo un Ambiente", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb1 == descAmb2 && descAmb1 != "" && descAmb2 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente2 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb1 == descAmb3 && descAmb1 != "" && descAmb3 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente3 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb2 == descAmb3 && descAmb2 != "" && descAmb3 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente2 y Ambiente3 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                           
            //                           }
            //                       
            //                       }
            //                   
            //                   }
            //               
            //               }

            //INSERT END OF EDC 24.08.2015

            //validacion para que copie los datos del solicitante a todos los interlocutores
            var rucAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");
            var desAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Descripcion");
            var dirAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion");
            var codPostalAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/CodigoPostal");
            var telAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Telefono");
            var lengthAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion").length;
            if (lengthAG > 60)
            {
                this.abrirAvisoGeneral(self, 'No se permiten más de 60 caractéres en la dirección del Solicitante. Existe ' + lengthAG + ' caracteres.');
                condicion = false;
                return;
            }
            var desWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion");
            var dirWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion");
            var lengthWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion").length;
            if (lengthWE > 60)
            {
                this.abrirAvisoGeneral(self, 'No se permiten más de 60 caractéres en la dirección del Dest.Mcia. Existe ' + lengthWE + ' caracteres.');
                condicion = false;
                return;
            }
            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Descripcion", desAG); //panel2.items.items[2].setValue(panel1.getValues().Descripcion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Direccion", dirAG);
                //panel2.items.items[3].setValue(panel1.getValues().Direccion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/CodigoPostal") == null)//EDC
            //                if (panel2.getValues().Distrito == "" || panel2.getValues().Distrito == null)//EDC
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/CodigoPostal", codPostalAG);
                //panel2.items.items[4].setValue(panel1.getValues().CodigoPostal);
                var cpostalwe = codPostalAG; // ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                if (cpostalwe)
                {
                    var nombrewe = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion"); //cpostalwe.data.Descripcion;
                }
                /*
                var interwe = interlocutoresStore.findRecord('Funcion', 'WE');
                interwe.set('Ciudad', nombrewe);///Roy: Por Revisar
                interwe.set('Distrito', nombrewe);///Roy: Por Revisar*/
            }

            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Telefono", telAG);
                //panel2.items.items[5].setValue(panel1.getValues().Telefono);
            }

            //FST 09/10/2013 TelMovilDestMercancia INICIO
            //if (panel2.getValues().TelefonoMovil == "" || panel2.getValues().TelefonoMovil == null) {
            //    panel2.items.items[6].setValue(panel2.getValues().TelefonoMovil);
            //}
            //FST 09/10/2013 TelMovilDestMercancia FIN

            //ROY: Comentado  objPedidoStore.sync();
            //Roy: Comentado interlocutoresStore.sync();

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Descripcion") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Descripcion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Descripcion", desAG);
                //panel3.items.items[2].setValue(panel1.getValues().Descripcion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Direccion", dirAG);
                //panel3.items.items[3].setValue(panel1.getValues().Direccion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/CodigoPostal") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/CodigoPostal", codPostalAG);
                //panel3.items.items[4].setValue(panel1.getValues().CodigoPostal);
                /*Roy: ya seteamos de golpe :)
                 var cpostalre = ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                 if (cpostalre)
                 {
                 var nombrere = cpostalre.data.Descripcion;
                 }
                 var interre = interlocutoresStore.findRecord('Funcion', 'RE');
                 interre.set('Ciudad', nombrere);
                 interre.set('Distrito', nombrere);*/
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Telefono", telAG);
                //panel3.items.items[5].setValue(panel1.getValues().Telefono);
            }
            //objPedidoStore.sync();
            //interlocutoresStore.sync();

            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Ruc", rucAG);
                //panel4.items.items[2].setValue(panel1.getValues().Ruc);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Descripcion", desAG);
                //panel4.items.items[3].setValue(panel1.getValues().Descripcion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Direccion", dirAG);
                //panel4.items.items[4].setValue(panel1.getValues().Direccion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/CodigoPostal") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/CodigoPostal", codPostalAG);
                //panel4.items.items[5].setValue(panel1.getValues().CodigoPostal);
                /*Roy: en vano :)
                 var cpostalrg = ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                 if (cpostalrg)
                 {
                 var nombrerg = cpostalrg.data.Descripcion;
                 }
                 var interrg = interlocutoresStore.findRecord('Funcion', 'RG');
                 interrg.set('Ciudad', nombrerg);
                 interrg.set('Distrito', nombrerg);
                 */
            }

            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Telefono", telAG);
                //panel4.items.items[6].setValue(panel1.getValues().Telefono);
            }
                            
                }
                    ////End Validar Interlocutores///////////////////////////////////////////////////////
                            }
/////////////////////End Validacion Roy //////////////////////////////////////////////////////////////////////////////////////////////////////////
////                            if (temp40 != "1") {
////                                if (temp45 == "1") {
////                                    MessageToast.show('Aviso', 'Debe ingresar Estilo 2  en -> Interlocutores -> Datos de cliente.', function(res) {
////                                    }, self);
////                                    return;
////                                }
////                            }

////                            if (temp45 != "1") {
////                                if (temp40 == "1") {
////                                    MessageToast.show('Aviso', 'Debe ingresar Ambiente 2  en -> Interlocutores -> Datos de cliente.', function(res) {
////                                    }, self);
////                                    return;
////                                }
////                            }

////                            if (temp50 != "1") {
////                                if (temp55 == "1") {
////                                    MessageToast.show('Aviso', 'Debe ingresar Estilo 3  en -> Interlocutores -> Datos de cliente.', function(res) {
////                                    }, self);
////                                    return;
////                                }
////                            }

////                            if (temp55 != "1") {
////                                if (temp50 == "1") {
////                                    MessageToast.show('Aviso', 'Debe ingresar Ambiente 3  en -> Interlocutores -> Datos de cliente.', function(res) {
////                                    }, self);
////                                    return;
////                                }
////                            }
////                            
////                           
////                            //INSERT BEGIN OF EDC 24.08.2015
////                                                                                                
////                            var amb1 = temp30;
////                            
////                            if (temp45 != "1") 
////                            {
////                                if (temp40 != "1") 
////                                {
////                                    var amb2 = temp40;        
////                                }
////                            }
////                            
////                            if (temp55 != "1") {
////                                if (temp50 != "1") {
////                                    var amb3 = temp50;        
////                                }
////                            }
////                                                    
////                             for (var i = 0; i < preguntasStore.data.items[5].data.listaResp.length; i++)
////                             {
////                                if (amb1 == preguntasStore.data.items[5].data.listaResp[i].Codigo)
////                                {
////                                    var descAmb1 = preguntasStore.data.items[5].data.listaResp[i].Descripcion;
////                                    break;
////                                }               
////                             }
////                             
////                             if (descAmb1 == "" || descAmb1 == undefined )
////                             {
////                                descAmb1 = "";
////                             }
////                             
////                            
////                            for (var i = 0; i < preguntasStore.data.items[7].data.listaResp.length; i++)
////                             {
////                                if (amb2 == preguntasStore.data.items[7].data.listaResp[i].Codigo)
////                                {
////                                    var descAmb2 = preguntasStore.data.items[7].data.listaResp[i].Descripcion;
////                                    break;
////                                }               
////                             }
////                             
////                             if (descAmb2 == "" || descAmb2 == undefined )
////                             {
////                                descAmb2 = "";
////                             }
////                             
////                             for (var i = 0; i < preguntasStore.data.items[9].data.listaResp.length; i++)
////                             {
////                                if (amb3 == preguntasStore.data.items[9].data.listaResp[i].Codigo)
////                                {
////                                    var descAmb3 = preguntasStore.data.items[9].data.listaResp[i].Descripcion;
////                                    break;
////                                }               
////                             }
////                             
////                             if (descAmb3 == "" || descAmb3 == undefined )
////                             {
////                                descAmb3 = "";
////                             }
////                             
////                             
////                             if ( descAmb1 == descAmb2 && descAmb1 == descAmb3 && descAmb2 == descAmb3 &&
////                                  descAmb1 != "" && descAmb2 != "" && descAmb3 != "" ) 
////                             {
////                                MessageToast.show("Validación", "Datos Cliente: Ambiente1,Ambiente2 y Ambiente 3 no deben ser iguales", function() { });
////                                return false;
////                             }
////                             else{
////                                if ( descAmb1 == "" && descAmb2 == "" && descAmb3 == "" )
////                                {
////                                    MessageToast.show("Validación", "Ingresar minimo un Ambiente", function() { });
////                                    return false;
////                                }
////                                if (descAmb1 == descAmb2 && descAmb1 != "" && descAmb2 != "")
////                                {
////                                    MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente2 no deben ser iguales", function() { });
////                                    return false;
////                                }
////                                if (descAmb1 == descAmb3 && descAmb1 != "" && descAmb3 != "")
////                                {
////                                    MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente3 no deben ser iguales", function() { });
////                                    return false;
////                                }
////                                if (descAmb2 == descAmb3 && descAmb2 != "" && descAmb3 != "")
////                                {
////                                    MessageToast.show("Validación", "Datos Cliente: Ambiente2 y Ambiente3 no deben ser iguales", function() { });
////                                    return false;
////                                }
////                             
////                             }
////                                     
////                            //INSERT END OF EDC 24.08.2015
                                                
                            //JLM - validacion ambientes (fin)
                            
                            //MDEC072 : DELETE END OF EDC 25.11.2015 : Ambientes

                        }
                        
                         //SDEC093 OBLIGATORIEDAD CLIENTES CODIFICADOS Y RUCS
                         else if (self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc").length == 11 && 
                                  (self.getView().getModel().getProperty("/clienteEventual/esEventual") == true ||
                                   self.getView().getModel().getProperty("/clienteEventual/esEventual") == false)) //Roy: falta colocar valor verdadero
                         {
                             var fechaZ_cod = window.dataIni.lstFeclicod[0].Descripcion; //Roy: Falta Comprobar Despues--------ParametroStore.data.items[32].data.Model[0].Descripcion
                             var fecha_doc = moment(self.getView().getModel().getProperty("/pedido/FechaPedido")).format('Y-m-d'); //Ext.util.Format.date(objPedidoStore.data.items[0].data.FechaPedido, 'Y-m-d'); 
                                
                            if (fechaZ_cod <= fecha_doc)
                            {                        
                                if (valor == "") {
                                    this.abrirAvisoGeneral(self, "Debe completar el tipo de cliente en Interlocutores: Datos Cliente");
                                    condicion = false;
                                    return;
                                }

                                if (valor2 == "") {
                                    this.abrirAvisoGeneral(self, "Debe ingresar el tipo de Construcción en Interlocutores: Datos Cliente");
                                    condicion = false;
                                    return;
                                }

                                if (valor4 == "" && valor3 == "") {
                                    this.abrirAvisoGeneral(self, "Debe ingresar un tipo de Proyecto en Interlocutores: Datos Cliente");
                                    condicion = false;
                                    return;
                                } else {

                                    if (valor4 != "" && valor3 != "") {
                                        this.abrirAvisoGeneral(self, "Debe ingresar solo un tipo de proyecto: Institucional o Residencial");
                                        condicion = false;
                                        return;
                                    }
                                }
                            }
                         }
                    }   
                }
                //Inicio Limpiar Nombre y Apellidos en Datos Adicionales con cliente con Ruc
                var datosAdicionales = self.getView().getModel().getProperty("/cliente");
                if(datosAdicionales.Ruc.length==11){
                    self.getView().getModel().setProperty("/cliente/APPAT","");
                    self.getView().getModel().setProperty("/cliente/APMAT","");
                    self.getView().getModel().setProperty("/cliente/NOMBRE","");
                }
                //End Limpiar Nombre y Apellidos en Datos Adicionales con cliente con Ruc
                //
                //Impedir que graben Ruc sin razón social
                var solicitanteAG = self.getView().getModel().getProperty("/interlocutores/AG");
                    var mailAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Mail");
                    var descripcionAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Descripcion");
                    var direccionAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion");
                    var telefonoAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Telefono");
                    var ruc = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");

                    var datosAdic =  self.getView().getModel().getProperty("/cliente");
                    if (mailAG == "" || mailAG == " ")
                    {   
                        this.abrirAvisoGeneral(self, "Interlocutores: Solicitante, Mail inválido.");
                        condicion = false;
                        return;
                    }
                    if (ruc != "" || ruc != " ")
                    {
                        if (ruc.length != 8 && ruc.length != 11)
                        {
                            this.abrirAvisoGeneral(self, "Dato incorrecto,valor de DNI debe ser 8 dígitos y RUC 11 dígitos");
                            condicion = false;
                            return;
                        }else{
                            if (((descripcionAG != "" || descripcionAG != " ") && (direccionAG == "" || direccionAG == " ")) || ((descripcionAG == "" || descripcionAG == " ") && (direccionAG != "" || direccionAG != " ")))
                                {   
                                    this.abrirAvisoGeneral(self, "Falta Llenar los campos del Solicitante y/o Dirección y/o Ruc del Solicitante.");
                                    condicion = false;
                                    return;
                                }   
                            }
                    }
                //
                //Inicio Grabar Ruc
                //
                            if (valor == "") {
                                this.abrirAvisoGeneral(self, "Debe completar el tipo de cliente en Interlocutores: Datos Cliente");
                                condicion = false;
                                return;
                            }

                            if (valor2 == "") {
                                this.abrirAvisoGeneral(self, "Debe ingresar el tipo de Construcción en Interlocutores: Datos Cliente");
                                condicion = false;
                                return;

                            }

                            if (valor4 == "" && valor3 == "") {
                                this.abrirAvisoGeneral(self, "Debe ingresar un tipo de Proyecto en Interlocutores: Datos Cliente");
                                condicion = false;
                                return;

                            } else {

                                if (valor4 != "" && valor3 != "") {
                                    this.abrirAvisoGeneral(self, "Debe ingresar solo un tipo de proyecto: Institucional o Residencial");
                                    condicion = false;
                                    return;
                                }

                            }
                //
                if(condicion){
                    var crearEmpresa = this.crearEmpresa(self.getView().getModel().getProperty("/interlocutores/AG/Cliente"), self);
                    if(crearEmpresa.Ruc.length==11){
                        var result = clienteServices.validarInterlocutores(crearEmpresa);
                        if (result.data.success) {  
                            self.obtenerDatosInterlocutorAgDni1(self.getView().getModel().getProperty("/interlocutores/AG/Cliente"));         
                        } else {
                            //self.borrarInterlocutores();
                            this.abrirAvisoGeneral(self, result.data.errors.reason);
                            condicion = false;
                            return;
                        }
                    }
                }
                //End Grabar Ruc                
                //FORECAST INSERT BEGIN OF EDC 12.11.2015
                var grupoFor = "";
                var tipoFor = "";
                
                grupoFor = self.getView().getModel().getProperty("/pedido/GrupoForecast");
                tipoFor = self.getView().getModel().getProperty("/pedido/TipoForecast");
                canaldist = self.getView().getModel().getProperty("/pedido/CanalDist");
                var fechaz = window.dataIni.lstValfore[0].Descripcion; //ParametroStore.data.items[30].data.Model[0].Descripcion;
            //  var fechap = formDoc.getValues().FechaPedido
                
                var fechap = moment(self.getView().getModel().getProperty("/pedido/FechaPedido")).format('Y-m-d'); //Ext.util.Format.date(formDoc.getValues().FechaPedido, 'Y-m-d');
                
                if ( self.getView().getModel().getProperty("/pedido/CodTipoDoc") != "Z015" )//6000001895 INSERT EDC 30.12.2016
                {
                    if ( grupoFor == " " )
                    {
                        if ( fechaz <= fechap )
                        {
                            this.abrirAvisoGeneral(self, "Grupo Forecast esta vacío");
                            condicion = false;
                            return;
                        }
                        else
                            {
                            this.abrirAvisoGeneral(self, "Grupo Forecast esta vacío");
                            condicion = false;
                            return;
                            }
                    }
                    else if ( grupoFor == "01" || grupoFor == "03" || grupoFor == "04" || grupoFor == "05" )
                    {
                       
                        if ( tipoFor != " " && tipoFor != "")
                        {
                             if ( fechaz <= fechap )
                            {
                                this.abrirAvisoGeneral(self, "Tipo Forecast debe estar vacío");
                                condicion = false;
                                return;
                            }
                            else{
                                this.abrirAvisoGeneral(self, "Tipo Forecast debe estar vacío");
                                condicion = false;
                                return;
                            }
                        }
                    }
                    else if ( grupoFor == "02" || 
                              grupoFor == "07" ) 
                    {
                        if ( tipoFor == " " || tipoFor == "")
                        {
                           if ( fechaz <= fechap )
                           {
                                this.abrirAvisoGeneral(self, 'Falta ingresar el Tipo para Grupo Forecast');
                                condicion = false;
                                return;
                            }
                            else{
                                this.abrirAvisoGeneral(self, "Falta ingresar el Tipo para Grupo Forecast");
                                condicion = false;
                                return;
                            }
                        }
                        //6000001232 INSERT BEGIN OF EDC 28.09.2016
                        if ( grupoFor == "02" ) 
                        {
                           if ( tipoFor == "11" || tipoFor == "00" )
                           {
                               if ( fechaz <= fechap )
                               {
                                    this.abrirAvisoGeneral(self, 'Cambiar Tipo Forecast');
                                    condicion = false;
                                    return;
                                }
                                else{
                                    this.abrirAvisoGeneral(self, "Cambiar Tipo Forecast");
                                    condicion = false;
                                    return;
                                }
                            }
                        }       
                        //6000001232 INSERT END OF EDC 28.09.2016
                        if ( grupoFor == "07" ) 
                        {
                            if ( tipoFor != " " && ( canaldist == "30" || canaldist == "40" ) )
                            {
                                if ( tipoFor  == "00" )
                                {
                                    if ( fechaz <= fechap )
                                    {
                                        this.abrirAvisoGeneral(self, 'Para el Tipo Forecast debe grabarse con opción distinta a Multifamiliar');
                                        condicion = false;
                                        return;
                                    }
                                    else{
                                        this.abrirAvisoGeneral(self, "Para el Tipo Forecast debe grabarse con opción distinta a Multifamiliar");
                                        condicion = false;
                                        return;
                                    }
                                }
                                else if ( tipoFor  == "11" && canaldist == "30" )
                                {
                                    if ( fechaz <= fechap )
                                    {
                                        this.abrirAvisoGeneral(self, 'Para el Tipo Forecast debe grabarse con opción distinta a Arquitecto');
                                        condicion = false;
                                        return;
                                    }
                                    else{
                                        this.abrirAvisoGeneral(self, "Para el Tipo Forecast debe grabarse con opción distinta a Arquitecto");
                                        condicion = false;
                                        return;
                                    }
                                }
                            }
                        }                                 
                    }  
                    else if( grupoFor == "06"  )
                    {
                        if ( tipoFor == " " || tipoFor == "")
                        {
                           if ( fechaz <= fechap )
                           {
                                this.abrirAvisoGeneral(self, 'Falta ingresar el Tipo para Grupo Forecast');
                                condicion = false;
                                return;
                           }
                           else{
                                this.abrirAvisoGeneral(self, "Falta ingresar el Tipo para Grupo Forecast");
                                condicion = false;
                                return;
                           }
                        }
                        if ( tipoFor != " " && ( canaldist == "30" || canaldist == "40" ) )
                        {
                            if ( tipoFor  != "00" )
                            {
                                if ( fechaz <= fechap )
                                {
                                    this.abrirAvisoGeneral(self, 'Para el Tipo Forecast debe grabarse con opción Multifamiliar');
                                    condicion = false;
                                    return;
                                }
                                else{
                                    this.abrirAvisoGeneral(self, "Para el Tipo Forecast debe grabarse con opción Multifamiliar");
                                    condicion = false;
                                    return;
                                }
                            }
                        }                  
                    }
                    else if( grupoFor == "08"  )
                    {
                        if ( tipoFor == " " || tipoFor == "")
                        {
                           if ( fechaz <= fechap )
                           {
                                this.abrirAvisoGeneral(self, 'Falta ingresar el Tipo para Grupo Forecast');
                                condicion = false;
                                return;
                           }
                           else{
                                this.abrirAvisoGeneral(self, "Falta ingresar el Tipo para Grupo Forecast");
                                condicion = false;
                                return;
                           }
                        }
                        if ( tipoFor != " " && ( canaldist == "30" ) )
                        {
                            if ( tipoFor  != "11" )
                            {
                                if ( fechaz <= fechap )
                                {
                                    this.abrirAvisoGeneral(self, 'Para el Tipo Forecast debe grabarse con opción Arquitecto');
                                    condicion = false;
                                    return;
                                }
                                else{
                                    this.abrirAvisoGeneral(self, "Para el Tipo Forecast debe grabarse con opción Arquitecto");
                                    condicion = false;
                                    return;
                                }
                            }
                        }            
                    }
                }
                //FORECAST INSERT END OF EDC 12.11.2015  
                //MDEC072 INSERT BEGIN OF EDC 07.01.2016 Ambientes
                var fechazA = ""; 
                var fechapA = "";
                var CodGrupoMat = "";
                var Opcion = "";
                var Pos = "";
                fechazA = window.dataIni.lstValambi[0].Descripcion ; //ParametroStore.data.items[31].data.Model[0].Descripcion;
                fechapA = moment(self.getView().getModel().getProperty("/pedido/FechaPedido")).format('Y-m-d'); //Ext.util.Format.date(objPedidoStore.data.items[0].data.FechaPedido, 'Y-m-d');
                 if(self.getView().getModel().getProperty("/listaMaterial/0")==null){

                 }else{
                 if (fechazA <= fechapA)
                 {
                    if ((self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'ZO01' || 
                          self.getView().getModel().getProperty("/pedido/CodTipoDoc") == 'Z001') && (self.getView().getModel().getProperty("/pedido/CanalDist") == '10'))
                    {
                        for (var i = 0; i < self.getView().getModel().getProperty("/listaMaterial").length; i++)
                        {
                            CodGrupoMat = self.getView().getModel().getProperty("/listaMaterial/"+i+"/CodGrupoMat");
                            Opcion = self.getView().getModel().getProperty("/listaMaterial/"+i+"/Opcion");
                            Pos = self.getView().getModel().getProperty("/listaMaterial/"+i+"/PosicionCorto");
                            
                            if ((CodGrupoMat == "" || CodGrupoMat == " ") && (Opcion == "" || Opcion == " "))
                            {
                                this.abrirAvisoGeneral(self, 'Colocar Datos de Ambiente y Opción en Pos.' + Pos);
                                condicion = false;
                                return;
                            }
                            else if(CodGrupoMat == "" || CodGrupoMat == " ")
                            {
                                this.abrirAvisoGeneral(self, 'Colocar Ambiente en Pos.' + Pos);
                                condicion = false;
                                return;
                            }
                            else if(Opcion == "" || Opcion == " ") 
                            {
                                this.abrirAvisoGeneral(self, 'Colocar Opción en Pos:' + Pos);
                                condicion = false;
                                return;
                            }                                                    
                        }
                    }
                 }

                 }
                //MDEC072 INSERT END OF EDC 07.01.2016 Ambientes
                var pedido = self.getView().getModel().getProperty("/pedido");
                    
                    var mat = self.getView().getModel().getProperty("/listaMaterial"); //detalleMaterialStore.data.items;

                    //////Inicio Nueva Validacion no dejar grabar Ped. Z035 SIN MONTO///13-03-2018/////////////
                    if(pedido.CodTipoDoc=="Z035"){
                        for(var i =0;i<mat.length;i++){
                            if(mat[i].CodMaterialCorto=="20000816" || mat[i].CodMaterialCorto=="20000815"){
                                for(var j=0;j<mat[i].DescuentoPrincipal.length;j++){
                                    if(mat[i].DescuentoPrincipal[j].Condicion=="ZP08"){
                                        if(mat[i].DescuentoPrincipal[j].Importe=="" || mat[i].DescuentoPrincipal[j].Importe==0){
                                        this.abrirAvisoGeneral(self, 'No se puede guardar Pedido, añadir Precio Manual');
                                        condicion = false;
                                        return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //////End Nueva Validacion no dejar grabar Ped. Z035 SIN MONTO///////////////////
                    var cal = 0;
                    var tipoMatFinal = 0;//nuevo 18-04-2018
                    for (var k = 0; k < self.getView().byId("listaMasterMateriales").getItems().length; k++) {//detalleMaterialStore.getCount()
                        var currentMat = mat[k];
                        if (currentMat.CodCentro == "") {
                            cal = 1;
                        }
                        if (currentMat.TipoMaterial == "NA") {//nuevo 18-04-2018
                            tipoMatFinal = 1;//nuevo 18-04-2018
                        }//nuevo 18-04-2018
                    }
                    if(condicion){
                        if (cal != 0) {
                            if(pedido.CodTipoDoc!="ZO01" && pedido.CodTipoDoc!="ZO02"){
                                if(tipoMatFinal==1){//nuevo 18-04-2018
                                    console.log("Grabar");//nuevo 18-04-2018
                                            self.onBtnGuardarDocumento1();//nuevo 18-04-2018
                                            condicion = false;//nuevo 18-04-2018
                                            return;//nuevo 18-04-2018
                                }else{//nuevo 18-04-2018
                                    this.abrirAvisoGeneral(self, 'No está definido el Centro/Almacen/Lote en el detalle del Pedido');
                                    condicion = false;
                                    return;
                                }//nuevo 18-04-2018
                            
                            }else{
                                console.log("Grabar");
                                    self.onBtnGuardarDocumento1();
                                    condicion = false;
                                    return;
                            }
                        }
                        else {
                            console.log("Grabar");
                            self.onBtnGuardarDocumento1();
                            condicion = false;
                            return;
                        }
                    }
            //}
        },
        setValidInterlocutores:function(self){
            var condicion = true;
    while(condicion){
            //validadndo el correo
            /*var model = Ext.ModelMgr.create(panel1.getValues(), 'interlocutoresModel');
            var errors = model.validate(), message = "";
            if (errors.isValid())
            {

            } else
            {
            Ext.each(errors.items, function(rec, i)
            {
            message += rec.message + "<br>";
            });
                    MessageToast.show("Validación", message, function() { });
                    return false;
            }*/


            //6000001216 INSERT BEGIN OF EDC 26.10.2016
            var ruc = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");

            if (ruc != "" || ruc != " ")
            {
                if (ruc.length != 8 && ruc.length != 11)
                {
                    this.abrirAvisoGeneral(self, "Dato incorrecto,valor de DNI debe ser 8 dígitos y RUC 11 dígitos");
                        condicion = false;
                        break;
                }
            }
            //6000001216 INSERT END OF EDC 26.10.2016



            //INSERT BEGIN OF EDC 24.08.2015

            //              if (objPedidoStore.last().data.CanalDist == '10') 
            //              {
            //                   if (objPedidoStore.last().data.CodTipoDoc == "ZO01" || objPedidoStore.last().data.CodTipoDoc == "ZO02" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z001" || objPedidoStore.last().data.CodTipoDoc == "Z002" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z003" || objPedidoStore.last().data.CodTipoDoc == "Z004" || 
            //                       objPedidoStore.last().data.CodTipoDoc == "Z034") 
            //                  {
            //                  
            //                      if (interlocutoresStore.data.items[0].data.Ruc.length <= 8 && cliEventualStore.last().data.esEventual.toLowerCase().trim() == "true") 
            //                      {
            //                              
            //                          var amb1 = panel8.items.items[17].value;
            //                          var amb2 = panel8.items.items[19].value;
            //                          var amb3 = panel8.items.items[21].value;
            //                          
            //                          if ( amb1 == "" || amb1 == undefined )
            //                          {
            //                              amb1 = "";
            //                          }

            //                          if ( amb2 == "" || amb2 == undefined )
            //                          {
            //                              amb2 = "";
            //                          }
            //                          
            //                          if ( amb3 == "" || amb3 == undefined )
            //                          {
            //                              amb3 = "";
            //                          }                           
            //                           for (var i = 0; i < preguntasStore.data.items[5].data.listaResp.length; i++)
            //                           {
            //                              if (amb1 == preguntasStore.data.items[5].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb1 = preguntasStore.data.items[5].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb1 == "" || descAmb1 == undefined )
            //                           {
            //                              descAmb1 = "";
            //                           }
            //                           
            //                          
            //                          for (var i = 0; i < preguntasStore.data.items[7].data.listaResp.length; i++)
            //                           {
            //                              if (amb2 == preguntasStore.data.items[7].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb2 = preguntasStore.data.items[7].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb2 == "" || descAmb2 == undefined )
            //                           {
            //                              descAmb2 = "";
            //                           }
            //                           
            //                           for (var i = 0; i < preguntasStore.data.items[9].data.listaResp.length; i++)
            //                           {
            //                              if (amb3 == preguntasStore.data.items[9].data.listaResp[i].Codigo)
            //                              {
            //                                  var descAmb3 = preguntasStore.data.items[9].data.listaResp[i].Descripcion;
            //                                  break;
            //                              }               
            //                           }
            //                           
            //                           if (descAmb3 == "" || descAmb3 == undefined )
            //                           {
            //                              descAmb3 = "";
            //                           }
            //                           
            //                           
            //                           if ( descAmb1 == descAmb2 && descAmb1 == descAmb3 && descAmb2 == descAmb3 &&
            //                                descAmb1 != "" && descAmb2 != "" && descAmb3 != "" ) 
            //                           {
            //                              MessageToast.show("Validación", "Datos Cliente: Ambiente1,Ambiente2 y Ambiente 3 no deben ser iguales", function() { });
            //                              return false;
            //                           }
            //                           else{
            //                              if ( descAmb1 == "" && descAmb2 == "" && descAmb3 == "" )
            //                              {
            //                                  MessageToast.show("Validación", "Ingresar minimo un Ambiente", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb1 == descAmb2 && descAmb1 != "" && descAmb2 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente2 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb1 == descAmb3 && descAmb1 != "" && descAmb3 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente3 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                              if (descAmb2 == descAmb3 && descAmb2 != "" && descAmb3 != "")
            //                              {
            //                                  MessageToast.show("Validación", "Datos Cliente: Ambiente2 y Ambiente3 no deben ser iguales", function() { });
            //                                  return false;
            //                              }
            //                           
            //                           }
            //                       
            //                       }
            //                   
            //                   }
            //               
            //               }

            //INSERT END OF EDC 24.08.2015

            //validacion para que copie los datos del solicitante a todos los interlocutores
            var rucAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");
            var desAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Descripcion");
            var dirAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion");
            var codPostalAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/CodigoPostal");
            var telAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Telefono");
            var lengthAG = self.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion").length;
            if (lengthAG > 60)
            {
                this.abrirAvisoGeneral(self, 'No se permiten más de 60 caractéres en la dirección del Solicitante. Existe ' + lengthAG + ' caracteres.');
                        condicion = false;
                        break;
            }
            var desWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion");
            var dirWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion");
            var lengthWE = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion").length;
            if (lengthWE > 60)
            {
                this.abrirAvisoGeneral(self, 'No se permiten más de 60 caractéres en la dirección del Dest.Mcia. Existe ' + lengthWE + ' caracteres.');
                        condicion = false;
                        break;
            }
            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Descripcion", desAG); //panel2.items.items[2].setValue(panel1.getValues().Descripcion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Direccion", dirAG);
                //panel2.items.items[3].setValue(panel1.getValues().Direccion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/CodigoPostal") == null)//EDC
            //                if (panel2.getValues().Distrito == "" || panel2.getValues().Distrito == null)//EDC
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/CodigoPostal", codPostalAG);
                //panel2.items.items[4].setValue(panel1.getValues().CodigoPostal);
                var cpostalwe = codPostalAG; // ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                if (cpostalwe)
                {
                    var nombrewe = self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion"); //cpostalwe.data.Descripcion;
                }
                /*
                var interwe = interlocutoresStore.findRecord('Funcion', 'WE');
                interwe.set('Ciudad', nombrewe);///Roy: Por Revisar
                interwe.set('Distrito', nombrewe);///Roy: Por Revisar*/
            }

            if (self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/WE/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/WE/Cliente/Telefono", telAG);
                //panel2.items.items[5].setValue(panel1.getValues().Telefono);
            }

            //FST 09/10/2013 TelMovilDestMercancia INICIO
            //if (panel2.getValues().TelefonoMovil == "" || panel2.getValues().TelefonoMovil == null) {
            //    panel2.items.items[6].setValue(panel2.getValues().TelefonoMovil);
            //}
            //FST 09/10/2013 TelMovilDestMercancia FIN

            //ROY: Comentado  objPedidoStore.sync();
            //Roy: Comentado interlocutoresStore.sync();

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Descripcion") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Descripcion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Descripcion", desAG);
                //panel3.items.items[2].setValue(panel1.getValues().Descripcion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Direccion", dirAG);
                //panel3.items.items[3].setValue(panel1.getValues().Direccion);
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/CodigoPostal") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/CodigoPostal", codPostalAG);
                //panel3.items.items[4].setValue(panel1.getValues().CodigoPostal);
                /*Roy: ya seteamos de golpe :)
                 var cpostalre = ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                 if (cpostalre)
                 {
                 var nombrere = cpostalre.data.Descripcion;
                 }
                 var interre = interlocutoresStore.findRecord('Funcion', 'RE');
                 interre.set('Ciudad', nombrere);
                 interre.set('Distrito', nombrere);*/
            }

            if (self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/RE/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RE/Cliente/Telefono", telAG);
                //panel3.items.items[5].setValue(panel1.getValues().Telefono);
            }
            //objPedidoStore.sync();
            //interlocutoresStore.sync();

            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Ruc", rucAG);
                //panel4.items.items[2].setValue(panel1.getValues().Ruc);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Descripcion", desAG);
                //panel4.items.items[3].setValue(panel1.getValues().Descripcion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Direccion") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Direccion") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Direccion", dirAG);
                //panel4.items.items[4].setValue(panel1.getValues().Direccion);
            }
            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/CodigoPostal") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/CodigoPostal") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/CodigoPostal", codPostalAG);
                //panel4.items.items[5].setValue(panel1.getValues().CodigoPostal);
                /*Roy: en vano :)
                 var cpostalrg = ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
                 if (cpostalrg)
                 {
                 var nombrerg = cpostalrg.data.Descripcion;
                 }
                 var interrg = interlocutoresStore.findRecord('Funcion', 'RG');
                 interrg.set('Ciudad', nombrerg);
                 interrg.set('Distrito', nombrerg);
                 */
            }

            if (self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Telefono") == "" || self.getView().getModel().getProperty("/interlocutores/RG/Cliente/Telefono") == null)
            {
                self.getView().getModel().setProperty("/interlocutores/RG/Cliente/Telefono", telAG);
                //panel4.items.items[6].setValue(panel1.getValues().Telefono);
            }

        }
        },        
    };
});