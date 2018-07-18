ActualizarEstados: function(codigos) {
						var self = this;
						jQuery.get("/destinations/Prodac/DarBajaSCN.xsjs", {
								codigo: codigos.join(",")
							},
							function(data) {
								console.log(data);
								/*Minimizar Tiempo*/
								self.mostrarDatosGestionInsatisfacciones();
							});
					},



RefrescarDatos: function(nroReclamos, nroFilasTabla) {
						console.log("**** RefrescarDatos() - Inicio ***********");

						//MCA : reemplaza logica de capura data tabla
						var tablaGes = self.getView().byId("tableGestionInsat");
						var filas = tablaGes.getRows();
						var cantidad = filas.length;

						//MCA pasa los objetos a un arreglo
						var p = tablaGes.getModel().getProperty("/");
						var aDataTabla = [];
						for (var key in p) {
							if (p.hasOwnProperty(key)) {
								if (key.startsWith("Detalles")) {
									aDataTabla.push([key, p[key]]);
								}
							}
						}
						console.log("aDataTabla = ", aDataTabla);
						cantidad = aDataTabla.length;

						if (nroReclamos === -1) {
							for (var j = 0; j < cantidad; j++) {
								var filaCurrent = filas[j];
								filaCurrent.getCells()[57].setText("");
								filaCurrent.getCells()[58].setText("");
								filaCurrent.getCells()[59].setText("");
								filaCurrent.getCells()[60].setText("");
								filaCurrent.getCells()[61].setText("");
							}
							return;
						}

						var code = 1;
						//var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis2/130/zservice_zws_zinsatis2/zbinding_zws_zinsatis2";  //MCA Se cambio por el nuevo servicio
						var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis3/130/zservice_zws_zinsatis3/zbinding_zws_zinsatis3";
						var thah = self;
						var _request2 = "";
						var request1 =
							'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\
						     <soapenv:Header/>\
						     <soapenv:Body>\
						         <urn:ZSD_GESTION_INSATISFACCION3>\
						         <CODE>' + code + '</CODE>\
						         <DOCUM>' + numDoc + '</DOCUM>\
						         <NRO_RECLAMO></NRO_RECLAMO>\
						         <TIPO_DOC>' + keyDoc + '</TIPO_DOC>\
						         <T_BORRADO>\
						            <item>\
						               <VBELN></VBELN>\
						               <POSNR></POSNR>\
						            </item>\
						         </T_BORRADO>\
						         <T_RECLAMO>';
						for (var i = 0; i < nroReclamos.length; i++) {
							_request2 += '<item>\
												<DOCUM>' + nroReclamos[i].split(",")[1] + '</DOCUM>\
								        		<RECLAMO>' +
							nroReclamos[i].split(",")[0] + '</RECLAMO>\
						    			  </item>';
						}
						var request3 = '</T_RECLAMO>\
					    			</urn:ZSD_GESTION_INSATISFACCION3>\
								</soapenv:Body>\
							</soapenv:Envelope>';

						var request = request1 + _request2 + request3;

						console.log("REQUEST");
						$.ajax({
							url: url,
							async: true,
							type: "POST",
							processData: false,
							data: request,
							dataType: 'xml',
							contentType: "text/xml; charset=\"utf-8\"",
							success: function(data, textStatus, jqXHR) {
								console.log("*********** Respuesta SUCCESS");

								function formatter(datos) {
									data = datos.toString();
									//var xml = '<?xml version="1.0" encoding="UTF-8"?>';
									return data;
								}

								var xml = formatter(jqXHR.responseText);
								var modeldata = $.parseXML(xml);
								var celemn = modeldata.children[0].children[1].children[0].children[1].childElementCount;
								var listCodReclamos = [];
								setTimeout(function() {
									console.log("**** Arreglo respuesta BAPI ", modeldata.children[0].children[1].children[0].children[1]);

									for (var j = 0; j < cantidad; j++) {
										console.log("****** Procesando fila " + j + " de " + cantidad);

										var codigoReclamoCurrent = '';
										try {
											codigoReclamoCurrent = aDataTabla[j][1].Id;
										} catch (e) {}
										var codigoPosicion = '';
										try {
											codigoPosicion = aDataTabla[j][1].Posicion;
										} catch (e) {}

										for (var i = 0; i < celemn; i++) {
											var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
											//var IDMat = tablaGes.getRows()[i].getCells()[1].getText();
											var docum = dato[0].textContent;
											var factura = dato[1].textContent;
											var snc = dato[2].textContent;
											var sncFormatter = thah.formatter.borrarCeros(snc);
											var pos_snc = dato[3].textContent;
											var motivoSnc = dato[4].textContent;
											var cantidadSnc = parseInt(dato[5].textContent);
											var cantidadSncFormatter = thah.formatter.EnteroDecimal(cantidadSnc);
											var importeSnc = dato[6].textContent;
											var importeSncFormatter = thah.formatter.currencyValue(importeSnc);
											var nc = dato[7].textContent;
											var ncFormatter = thah.formatter.borrarCeros(nc);

											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];

											if (parseInt(codigoReclamoCurrent) === parseInt(docum) && parseInt(codigoPosicion) === parseInt(pos_snc)) {
												base.setProperty(base2 + "/NroSNC", sncFormatter);
												base.setProperty(base2 + "/MotivoSNCSAP", motivoSnc);
												base.setProperty(base2 + "/CantidadSNC", cantidadSncFormatter);
												base.setProperty(base2 + "/ImporteSNC", importeSncFormatter);
												base.setProperty(base2 + "/NC", ncFormatter);
											}
										}
									}
									thah.getView().getModel().refresh(true);
								}, 3000);

								setTimeout(function() {

									var listReclamosActualizar = [];
									for (var i = 0; i < celemn; i++) {
										var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
										var codigoReclamo = dato[0].textContent;
										var listValid = listReclamosActualizar.filter(function(item) {
											return item === codigoReclamo;
										});
										if (listValid.length < 1) {
											listReclamosActualizar.push(codigoReclamo);
										}
									}

									var listReclamos = [];
									for (var j = 0; j < cantidad; j++) {
										try {

											//MCA se cambia las variables
											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];
											var codigoReclamoCurrent = base.getProperty(base2 + "/Id");
											var estado = base.getProperty(base2 + "/Estado");

											if (estado === "F") {
												var listValid2 = listReclamos.filter(function(item) {
													return item === codigoReclamoCurrent;
												});

												if (listValid2.length < 1) {
													listReclamos.push(codigoReclamoCurrent);
												}
											}
										} catch (e) {
											console.error(e);
										}
									}

									if (listReclamosActualizar.length > 0) {

										var listaActualizar = listReclamos.filter(function(codCurrent) {
											var validador = true;

											for (var x = 0; x < listReclamosActualizar.length; x++) {
												if (codCurrent === listReclamosActualizar[x]) {
													validador = false;
												}
											}
											return validador;
										});

										if (listaActualizar.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listaActualizar);
										}

									} else {

										if (listReclamos.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listReclamos);
										}
									}

								}, 3500);

							},
							error: function(e, xhr, status) {
								sap.ui.core.BusyIndicator.hide();
								MessageToast.show("Error, no se pudo refrescar");
							},
							complete: function(xhr, status) {
								thah.validacionTabla();
								console.log("COMPLETE");

							}
						});

	},


	mostrarDatosGestionInsatisfacciones: function(sFuncion) {
						console.log("mostrarDatosGestionInsatisfacciones -- Inicio", sFuncion);
						var that2 = this;
						var self = this;
						var busyDialog = new sap.m.BusyDialog({customIconHeight : "32px",customIconWidth :"32px"});
busyDialog.open();
setTimeout(function () {



						var tableGest = that2.getView().byId("tableGestionInsat");
						var Mimodel = new JSONModel();
						sap.ui.core.BusyIndicator.show(0);

						//MCA: incializa el flag para marca de reclamos
						var midata = that2.getView().getModel("midata");
						midata.setProperty("blReclamosCargados", true);
						var fechaDesde = midata.getProperty("/fechaDesde");
						var fechaHasta = midata.getProperty("/fechaHasta");
						if (fechaDesde !== undefined && fechaDesde != '') {
							fechaDesde = fechaDesde.substr(3, 2) + '/' + fechaDesde.substr(0, 2) + '/' + fechaDesde.substr(6, 4);
						}
						if (fechaHasta !== undefined && fechaHasta != '') {
							fechaHasta = fechaHasta.substr(3, 2) + '/' + fechaHasta.substr(0, 2) + '/' + fechaHasta.substr(6, 4);
						}
						console.log("fechaDesde = ", fechaDesde); // MM/dd/YYYY
						console.log("fechaHasta = ", fechaHasta);
						console.log("numDoc = ", numDoc);
						if (numDoc !== '0000000000' && numDoc !== '') {
							fechaDesde = '';
							fechaHasta = '';
						}
						//MCA: fin

						// Nuevo filtro aplicado
						// ?$filter=FechaRegistro ge datetime'2017-09-01' and FechaRegistro le datetime'2017-09-12'
						
							console.log("numDoc = ", numDoc);
							var sData = '';
							if ((numDoc == '0000000000' || numDoc == '') && (fechaDesde != '' || fechaHasta != '')) {
								console.log("Busqueda por fecha");
								if (fechaDesde != '' && fechaHasta != '') {
									sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FechaRegistro ge datetime'" + that2.getYYYYMMDD(fechaDesde) +
										"' and FechaRegistro le datetime'" + that2.getYYYYMMDD(fechaHasta) + "'";
									Mimodel.loadData(sData);
								} else if (fechaDesde != '') {
									sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FechaRegistro eq datetime'" + that2.getYYYYMMDD(fechaDesde) + "'";
									Mimodel.loadData(sData);
								}
							} else if (numDoc != '0000000000' && numDoc != '') {
								console.log("Busqueda por documento");
								//midata.setProperty("/fechaDesde", '');
								//midata.setProperty("/fechaHasta", '');
								sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FacturaSAP eq '" + numDoc + "' or Entrega eq '" + numDoc +
									"' or CodigoDoc eq '" + numDoc + "'";
								Mimodel.loadData(sData);
							} else {
								sap.ui.core.BusyIndicator.hide();
								return;
							}
							console.log("sData = ", sData);
							Mimodel.attachEvent("requestCompleted", function() {
								var Data = Mimodel.getProperty("/d/results/");

								if (Data.length > 0) {
									var oFilter = [];

									if (TipoDoc === "Factura" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("FacturaSAP", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									if (TipoDoc === "Entrega" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("Entrega", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									if (TipoDoc === "Traslado" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("CodigoDoc", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									//MCA filtro para fecha
									if (fechaDesde !== undefined && fechaDesde.length > 0 && fechaHasta !== undefined && fechaHasta.length > 0) {
										console.log("entro");
										oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.BT, (new Date(fechaDesde)), (new Date(
											fechaHasta))));
									} else {
										if (fechaDesde !== undefined && fechaDesde.length > 0) {
											oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.GE, fechaDesde));
										}
										if (fechaHasta !== undefined && fechaHasta.length > 0) {
											oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.LE, fechaHasta));
										}
									}
									//MCA fin

									//MCA no se usa opor el nuevo filtro, se borra
									tableGest.bindRows("/Detalles");
									tableGest.getBinding("rows").filter(oFilter, "Application");
									//tableGest.setVisibleRowCount(Data.length);
									tableGest.setVisibleRowCount(11);
									//if(Data.length === 1)
									//{
									//console.log("MIDATA" , estado);
									//this.getView().byId("fechaImplem").setDateValue(new Date());

									console.log("*** Tiempo reserva procesamiento tabla (Data.length)", Data.length);
									setTimeout(function() {

										var tipTratamiento = 0;
										var tipSNC = 0;
										for (var i = 0; i < Data.length; i++) {
											Data[i].CodVendedor = "PROBANDO";
											if (Data[i].Tratamiento === 'COMERCIAL') {
												tipTratamiento = 1;
												Data[i].FechaImplem = null;
											} else {
												tipTratamiento = 2; //CALIDAD
											}

											if (Data[i].TipoSNC === 'DEVOLUCION') {
												tipSNC = 1;
											} else {
												tipSNC = 2; //VALOR
											}

											if (keyDoc === 3) {
												that2.tablaTraslado(i);

											} else {
												that2.tablaDevolucionValor(i);
											}
										}

										var nrec_ = [];
										var nRecl = [];

										console.log("Inicio tiempo = ", (new Date()));
										if (sFuncion === 'pressBuscar') {
											//MCA en caso se utilice la busqueda se cargan todos los reclamos para procesar
											for (var i = 0; i < Data.length; i++) {
												nrec_.push(Data[i].Id + "," + Data[i].FacturaSAP); //MCA se agrego llave para comparar
											}
											jQuery.each(nrec_, function(i, el) {
												if (jQuery.inArray(el, nRecl) === -1) {
													nRecl.push(Data[i].Id + "," + Data[i].FacturaSAP);
												}
											});
										} else {
											for (var i = 0; i < Data.length; i++) {
												if (Data[i].Estado === 'F') {
													nrec_.push(Data[i].Id + "," + Data[i].FacturaSAP); //MCA se agrego FacturaSAP
												}
											}
											jQuery.each(nrec_, function(i, el) {
												if (jQuery.inArray(el, nRecl) === -1) {
													//nRecl.push(el);
													nRecl.push(Data[i].Id + "," + Data[i].FacturaSAP);
												}
											});
										}
										console.log("Final tiempo = ", (new Date()));
										//console.log("nrec_ = ",nrec_);
										console.log("nRec1 = ", nRecl);
										//Mimodel.setProperty("/d/results/", Data);
										//Mimodel.refech
										var sinCerosNumDoc = parseInt(numDoc);
										self.getView().byId("nroDocumento").setValue(sinCerosNumDoc.toString());
										console.log("nRecl.length = ", nRecl.length);
										if (nRecl.length) {
											console.log("Entro");
											//self.RefrescarDatos(nRecl);
											/**Inicio RefrescarDatos**/
												console.log("**** RefrescarDatos() - Inicio ***********");

						//MCA : reemplaza logica de capura data tabla
						var nroReclamos = nRecl;
						var tablaGes = self.getView().byId("tableGestionInsat");
						var filas = tablaGes.getRows();
						var cantidad = filas.length;

						//MCA pasa los objetos a un arreglo
						var p = tablaGes.getModel().getProperty("/");
						var aDataTabla = [];
						for (var key in p) {
							if (p.hasOwnProperty(key)) {
								if (key.startsWith("Detalles")) {
									aDataTabla.push([key, p[key]]);
								}
							}
						}
						console.log("aDataTabla = ", aDataTabla);
						cantidad = aDataTabla.length;

						if (nroReclamos === -1) {
							for (var j = 0; j < cantidad; j++) {
								var filaCurrent = filas[j];
								filaCurrent.getCells()[57].setText("");
								filaCurrent.getCells()[58].setText("");
								filaCurrent.getCells()[59].setText("");
								filaCurrent.getCells()[60].setText("");
								filaCurrent.getCells()[61].setText("");
							}
							return;
						}

						var code = 1;
						//var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis2/130/zservice_zws_zinsatis2/zbinding_zws_zinsatis2";  //MCA Se cambio por el nuevo servicio
						var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis3/130/zservice_zws_zinsatis3/zbinding_zws_zinsatis3";
						var thah = self;
						var _request2 = "";
						var request1 =
							'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\
						     <soapenv:Header/>\
						     <soapenv:Body>\
						         <urn:ZSD_GESTION_INSATISFACCION3>\
						         <CODE>' + code + '</CODE>\
						         <DOCUM>' + numDoc + '</DOCUM>\
						         <NRO_RECLAMO></NRO_RECLAMO>\
						         <TIPO_DOC>' + keyDoc + '</TIPO_DOC>\
						         <T_BORRADO>\
						            <item>\
						               <VBELN></VBELN>\
						               <POSNR></POSNR>\
						            </item>\
						         </T_BORRADO>\
						         <T_RECLAMO>';
						for (var i = 0; i < nroReclamos.length; i++) {
							_request2 += '<item>\
												<DOCUM>' + nroReclamos[i].split(",")[1] + '</DOCUM>\
								        		<RECLAMO>' +
							nroReclamos[i].split(",")[0] + '</RECLAMO>\
						    			  </item>';
						}
						var request3 = '</T_RECLAMO>\
					    			</urn:ZSD_GESTION_INSATISFACCION3>\
								</soapenv:Body>\
							</soapenv:Envelope>';

						var request = request1 + _request2 + request3;

						console.log("REQUEST");
						$.ajax({
							url: url,
							async: true,
							type: "POST",
							processData: false,
							data: request,
							dataType: 'xml',
							contentType: "text/xml; charset=\"utf-8\"",
							success: function(data, textStatus, jqXHR) {
								console.log("*********** Respuesta SUCCESS");

								function formatter(datos) {
									data = datos.toString();
									//var xml = '<?xml version="1.0" encoding="UTF-8"?>';
									return data;
								}

								var xml = formatter(jqXHR.responseText);
								var modeldata = $.parseXML(xml);
								var celemn = modeldata.children[0].children[1].children[0].children[1].childElementCount;
								var listCodReclamos = [];
								setTimeout(function() {
									console.log("**** Arreglo respuesta BAPI ", modeldata.children[0].children[1].children[0].children[1]);

									for (var j = 0; j < cantidad; j++) {
										console.log("****** Procesando fila " + j + " de " + cantidad);

										var codigoReclamoCurrent = '';
										try {
											codigoReclamoCurrent = aDataTabla[j][1].Id;
										} catch (e) {}
										var codigoPosicion = '';
										try {
											codigoPosicion = aDataTabla[j][1].Posicion;
										} catch (e) {}

										for (var i = 0; i < celemn; i++) {
											var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
											//var IDMat = tablaGes.getRows()[i].getCells()[1].getText();
											var docum = dato[0].textContent;
											var factura = dato[1].textContent;
											var snc = dato[2].textContent;
											var sncFormatter = thah.formatter.borrarCeros(snc);
											var pos_snc = dato[3].textContent;
											var motivoSnc = dato[4].textContent;
											var cantidadSnc = parseInt(dato[5].textContent);
											var cantidadSncFormatter = thah.formatter.EnteroDecimal(cantidadSnc);
											var importeSnc = dato[6].textContent;
											var importeSncFormatter = thah.formatter.currencyValue(importeSnc);
											var nc = dato[7].textContent;
											var ncFormatter = thah.formatter.borrarCeros(nc);

											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];

											if (parseInt(codigoReclamoCurrent) === parseInt(docum) && parseInt(codigoPosicion) === parseInt(pos_snc)) {
												base.setProperty(base2 + "/NroSNC", sncFormatter);
												base.setProperty(base2 + "/MotivoSNCSAP", motivoSnc);
												base.setProperty(base2 + "/CantidadSNC", cantidadSncFormatter);
												base.setProperty(base2 + "/ImporteSNC", importeSncFormatter);
												base.setProperty(base2 + "/NC", ncFormatter);
											}
										}
									}
									thah.getView().getModel().refresh(true);
								}, 3000);

								setTimeout(function() {

									var listReclamosActualizar = [];
									for (var i = 0; i < celemn; i++) {
										var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
										var codigoReclamo = dato[0].textContent;
										var listValid = listReclamosActualizar.filter(function(item) {
											return item === codigoReclamo;
										});
										if (listValid.length < 1) {
											listReclamosActualizar.push(codigoReclamo);
										}
									}

									var listReclamos = [];
									for (var j = 0; j < cantidad; j++) {
										try {

											//MCA se cambia las variables
											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];
											var codigoReclamoCurrent = base.getProperty(base2 + "/Id");
											var estado = base.getProperty(base2 + "/Estado");

											if (estado === "F") {
												var listValid2 = listReclamos.filter(function(item) {
													return item === codigoReclamoCurrent;
												});

												if (listValid2.length < 1) {
													listReclamos.push(codigoReclamoCurrent);
												}
											}
										} catch (e) {
											console.error(e);
										}
									}

									if (listReclamosActualizar.length > 0) {

										var listaActualizar = listReclamos.filter(function(codCurrent) {
											var validador = true;

											for (var x = 0; x < listReclamosActualizar.length; x++) {
												if (codCurrent === listReclamosActualizar[x]) {
													validador = false;
												}
											}
											return validador;
										});

										if (listaActualizar.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listaActualizar);
										}

									} else {

										if (listReclamos.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listReclamos);
										}
									}

								}, 3500);

							},
							error: function(e, xhr, status) {
								sap.ui.core.BusyIndicator.hide();
								MessageToast.show("Error, no se pudo refrescar");
							},
							complete: function(xhr, status) {
								thah.validacionTabla();
								console.log("COMPLETE");

							}
						});
											/**Fin RefrescarDatos**/
										} else {
											self.VT();
											//self.RefrescarDatos(-1);
											/**Inicio RefrescarDatos**/
												console.log("**** RefrescarDatos() - Inicio ***********");

						//MCA : reemplaza logica de capura data tabla
						var nroReclamos = -1;
						var tablaGes = self.getView().byId("tableGestionInsat");
						var filas = tablaGes.getRows();
						var cantidad = filas.length;

						//MCA pasa los objetos a un arreglo
						var p = tablaGes.getModel().getProperty("/");
						var aDataTabla = [];
						for (var key in p) {
							if (p.hasOwnProperty(key)) {
								if (key.startsWith("Detalles")) {
									aDataTabla.push([key, p[key]]);
								}
							}
						}
						console.log("aDataTabla = ", aDataTabla);
						cantidad = aDataTabla.length;

						if (nroReclamos === -1) {
							for (var j = 0; j < cantidad; j++) {
								var filaCurrent = filas[j];
								filaCurrent.getCells()[57].setText("");
								filaCurrent.getCells()[58].setText("");
								filaCurrent.getCells()[59].setText("");
								filaCurrent.getCells()[60].setText("");
								filaCurrent.getCells()[61].setText("");
							}
							return;
						}

						var code = 1;
						//var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis2/130/zservice_zws_zinsatis2/zbinding_zws_zinsatis2";  //MCA Se cambio por el nuevo servicio
						var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis3/130/zservice_zws_zinsatis3/zbinding_zws_zinsatis3";
						var thah = self;
						var _request2 = "";
						var request1 =
							'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\
						     <soapenv:Header/>\
						     <soapenv:Body>\
						         <urn:ZSD_GESTION_INSATISFACCION3>\
						         <CODE>' + code + '</CODE>\
						         <DOCUM>' + numDoc + '</DOCUM>\
						         <NRO_RECLAMO></NRO_RECLAMO>\
						         <TIPO_DOC>' + keyDoc + '</TIPO_DOC>\
						         <T_BORRADO>\
						            <item>\
						               <VBELN></VBELN>\
						               <POSNR></POSNR>\
						            </item>\
						         </T_BORRADO>\
						         <T_RECLAMO>';
						for (var i = 0; i < nroReclamos.length; i++) {
							_request2 += '<item>\
												<DOCUM>' + nroReclamos[i].split(",")[1] + '</DOCUM>\
								        		<RECLAMO>' +
							nroReclamos[i].split(",")[0] + '</RECLAMO>\
						    			  </item>';
						}
						var request3 = '</T_RECLAMO>\
					    			</urn:ZSD_GESTION_INSATISFACCION3>\
								</soapenv:Body>\
							</soapenv:Envelope>';

						var request = request1 + _request2 + request3;

						console.log("REQUEST");
						$.ajax({
							url: url,
							async: true,
							type: "POST",
							processData: false,
							data: request,
							dataType: 'xml',
							contentType: "text/xml; charset=\"utf-8\"",
							success: function(data, textStatus, jqXHR) {
								console.log("*********** Respuesta SUCCESS");

								function formatter(datos) {
									data = datos.toString();
									//var xml = '<?xml version="1.0" encoding="UTF-8"?>';
									return data;
								}

								var xml = formatter(jqXHR.responseText);
								var modeldata = $.parseXML(xml);
								var celemn = modeldata.children[0].children[1].children[0].children[1].childElementCount;
								var listCodReclamos = [];
								setTimeout(function() {
									console.log("**** Arreglo respuesta BAPI ", modeldata.children[0].children[1].children[0].children[1]);

									for (var j = 0; j < cantidad; j++) {
										console.log("****** Procesando fila " + j + " de " + cantidad);

										var codigoReclamoCurrent = '';
										try {
											codigoReclamoCurrent = aDataTabla[j][1].Id;
										} catch (e) {}
										var codigoPosicion = '';
										try {
											codigoPosicion = aDataTabla[j][1].Posicion;
										} catch (e) {}

										for (var i = 0; i < celemn; i++) {
											var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
											//var IDMat = tablaGes.getRows()[i].getCells()[1].getText();
											var docum = dato[0].textContent;
											var factura = dato[1].textContent;
											var snc = dato[2].textContent;
											var sncFormatter = thah.formatter.borrarCeros(snc);
											var pos_snc = dato[3].textContent;
											var motivoSnc = dato[4].textContent;
											var cantidadSnc = parseInt(dato[5].textContent);
											var cantidadSncFormatter = thah.formatter.EnteroDecimal(cantidadSnc);
											var importeSnc = dato[6].textContent;
											var importeSncFormatter = thah.formatter.currencyValue(importeSnc);
											var nc = dato[7].textContent;
											var ncFormatter = thah.formatter.borrarCeros(nc);

											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];

											if (parseInt(codigoReclamoCurrent) === parseInt(docum) && parseInt(codigoPosicion) === parseInt(pos_snc)) {
												base.setProperty(base2 + "/NroSNC", sncFormatter);
												base.setProperty(base2 + "/MotivoSNCSAP", motivoSnc);
												base.setProperty(base2 + "/CantidadSNC", cantidadSncFormatter);
												base.setProperty(base2 + "/ImporteSNC", importeSncFormatter);
												base.setProperty(base2 + "/NC", ncFormatter);
											}
										}
									}
									thah.getView().getModel().refresh(true);
								}, 3000);

								setTimeout(function() {

									var listReclamosActualizar = [];
									for (var i = 0; i < celemn; i++) {
										var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
										var codigoReclamo = dato[0].textContent;
										var listValid = listReclamosActualizar.filter(function(item) {
											return item === codigoReclamo;
										});
										if (listValid.length < 1) {
											listReclamosActualizar.push(codigoReclamo);
										}
									}

									var listReclamos = [];
									for (var j = 0; j < cantidad; j++) {
										try {

											//MCA se cambia las variables
											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];
											var codigoReclamoCurrent = base.getProperty(base2 + "/Id");
											var estado = base.getProperty(base2 + "/Estado");

											if (estado === "F") {
												var listValid2 = listReclamos.filter(function(item) {
													return item === codigoReclamoCurrent;
												});

												if (listValid2.length < 1) {
													listReclamos.push(codigoReclamoCurrent);
												}
											}
										} catch (e) {
											console.error(e);
										}
									}

									if (listReclamosActualizar.length > 0) {

										var listaActualizar = listReclamos.filter(function(codCurrent) {
											var validador = true;

											for (var x = 0; x < listReclamosActualizar.length; x++) {
												if (codCurrent === listReclamosActualizar[x]) {
													validador = false;
												}
											}
											return validador;
										});

										if (listaActualizar.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listaActualizar);
										}

									} else {

										if (listReclamos.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listReclamos);
										}
									}

								}, 3500);

							},
							error: function(e, xhr, status) {
								sap.ui.core.BusyIndicator.hide();
								MessageToast.show("Error, no se pudo refrescar");
							},
							complete: function(xhr, status) {
								thah.validacionTabla();
								console.log("COMPLETE");

							}
						});
											/**Fin RefrescarDatos**/
											//sap.ui.core.BusyIndicator.hide();
										}

									}, 1000 + Data.length * 500);

								} else {
									//oFilter.push(new sap.ui.model.Filter("Estado", sap.ui.model.FilterOperator.Contains, 'D'));
									/*tableGest.bindRows("/");
									tableGest.getBinding("rows").filter(oFilter, "Application");*/
									var oFilter = [];
									tableGest.bindRows("/");
									tableGest.getBinding("rows").filter(oFilter, "Application");
									MessageToast.show("Documento no encontrado");
									//this.getView().byId("col_estado").setVisible(false);
									//this.getView().byId("col_pos").setVisible(false);
									sap.ui.core.BusyIndicator.hide();
								}

								//MCA limpia el casillero Factura
								var sNroDocumento = that2.getView().byId("nroDocumento").getValue();
								if (sNroDocumento == '0') {
									that2.getView().byId("nroDocumento").setValue('');
								}

							}, this);

							Mimodel.attachEvent('requestFailed', function() {
								busyDialog.close();
								MessageToast.show("Problemas en la búsqueda");

							}, this);
						busyDialog.close();
                    }, 200);

					},



mostrarDatosGestionInsatisfacciones1: function(sFuncion) {
						console.log("mostrarDatosGestionInsatisfacciones -- Inicio", sFuncion);
						var that2 = this;
						var self = this;
						var busyDialog = new sap.m.BusyDialog({customIconHeight : "32px",customIconWidth :"32px"});
busyDialog.open();
setTimeout(function () {



						var tableGest = that2.getView().byId("tableGestionInsat");
						tableGest.bindRows("/Detalles");
						var Mimodel = new JSONModel();
						

						//MCA: incializa el flag para marca de reclamos
						var midata = that2.getView().getModel("midata");
						midata.setProperty("blReclamosCargados", true);
						var fechaDesde = midata.getProperty("/fechaDesde");
						var fechaHasta = midata.getProperty("/fechaHasta");
						if (fechaDesde !== undefined && fechaDesde != '') {
							fechaDesde = fechaDesde.substr(3, 2) + '/' + fechaDesde.substr(0, 2) + '/' + fechaDesde.substr(6, 4);
						}
						if (fechaHasta !== undefined && fechaHasta != '') {
							fechaHasta = fechaHasta.substr(3, 2) + '/' + fechaHasta.substr(0, 2) + '/' + fechaHasta.substr(6, 4);
						}
						console.log("fechaDesde = ", fechaDesde); // MM/dd/YYYY
						console.log("fechaHasta = ", fechaHasta);
						console.log("numDoc = ", numDoc);
						if (numDoc !== '0000000000' && numDoc !== '') {
							fechaDesde = '';
							fechaHasta = '';
						}
						//MCA: fin

						// Nuevo filtro aplicado
						// ?$filter=FechaRegistro ge datetime'2017-09-01' and FechaRegistro le datetime'2017-09-12'
						
							console.log("numDoc = ", numDoc);
							var sData = '';
							if ((numDoc == '0000000000' || numDoc == '') && (fechaDesde != '' || fechaHasta != '')) {
								console.log("Busqueda por fecha");
								if (fechaDesde != '' && fechaHasta != '') {
									sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FechaRegistro ge datetime'" + that2.getYYYYMMDD(fechaDesde) +
										"' and FechaRegistro le datetime'" + that2.getYYYYMMDD(fechaHasta) + "'";
									Mimodel.loadData(sData);
								} else if (fechaDesde != '') {
									sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FechaRegistro eq datetime'" + that2.getYYYYMMDD(fechaDesde) + "'";
									Mimodel.loadData(sData);
								}
							} else if (numDoc != '0000000000' && numDoc != '') {
								console.log("Busqueda por documento");
								//midata.setProperty("/fechaDesde", '');
								//midata.setProperty("/fechaHasta", '');
								sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FacturaSAP eq '" + numDoc + "' or Entrega eq '" + numDoc +
									"' or CodigoDoc eq '" + numDoc + "'";
								Mimodel.loadData(sData);
							} else {
								busyDialog.close();
								return;
							}
							console.log("sData = ", sData);
							Mimodel.attachEvent("requestCompleted", function() {
								var Data = Mimodel.getProperty("/d/results/");

								if (Data.length > 0) {
									var oFilter = [];

									if (TipoDoc === "Factura" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("FacturaSAP", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									if (TipoDoc === "Entrega" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("Entrega", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									if (TipoDoc === "Traslado" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("CodigoDoc", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									//MCA filtro para fecha
									if (fechaDesde !== undefined && fechaDesde.length > 0 && fechaHasta !== undefined && fechaHasta.length > 0) {
										console.log("entro");
										oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.BT, (new Date(fechaDesde)), (new Date(
											fechaHasta))));
									} else {
										if (fechaDesde !== undefined && fechaDesde.length > 0) {
											oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.GE, fechaDesde));
										}
										if (fechaHasta !== undefined && fechaHasta.length > 0) {
											oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.LE, fechaHasta));
										}
									}
									//MCA fin

									//MCA no se usa opor el nuevo filtro, se borra
									
									tableGest.getBinding("rows").filter(oFilter, "Application");
									//tableGest.setVisibleRowCount(Data.length);
									tableGest.setVisibleRowCount(11);
									//if(Data.length === 1)
									//{
									//console.log("MIDATA" , estado);
									//this.getView().byId("fechaImplem").setDateValue(new Date());

									console.log("*** Tiempo reserva procesamiento tabla (Data.length)", Data.length);

										var tipTratamiento = 0;
										var tipSNC = 0;
										for (var i = 0; i < Data.length; i++) {
											Data[i].CodVendedor = "PROBANDO";
											if (Data[i].Tratamiento === 'COMERCIAL') {
												tipTratamiento = 1;
												Data[i].FechaImplem = null;
											} else {
												tipTratamiento = 2; //CALIDAD
											}

											if (Data[i].TipoSNC === 'DEVOLUCION') {
												tipSNC = 1;
											} else {
												tipSNC = 2; //VALOR
											}

											if (keyDoc === 3) {
												that2.tablaTraslado(i);

											} else {
												that2.tablaDevolucionValor(i);
											}
										}

										var nrec_ = [];
										var nRecl = [];

										console.log("Inicio tiempo = ", (new Date()));
										if (sFuncion === 'pressBuscar') {
											//MCA en caso se utilice la busqueda se cargan todos los reclamos para procesar
											for (var i = 0; i < Data.length; i++) {
												nrec_.push(Data[i].Id + "," + Data[i].FacturaSAP); //MCA se agrego llave para comparar
											}
											jQuery.each(nrec_, function(i, el) {
												if (jQuery.inArray(el, nRecl) === -1) {
													nRecl.push(Data[i].Id + "," + Data[i].FacturaSAP);
												}
											});
										} else {
											for (var i = 0; i < Data.length; i++) {
												if (Data[i].Estado === 'F') {
													nrec_.push(Data[i].Id + "," + Data[i].FacturaSAP); //MCA se agrego FacturaSAP
												}
											}
											jQuery.each(nrec_, function(i, el) {
												if (jQuery.inArray(el, nRecl) === -1) {
													//nRecl.push(el);
													nRecl.push(Data[i].Id + "," + Data[i].FacturaSAP);
												}
											});
										}
										console.log("Final tiempo = ", (new Date()));
										//console.log("nrec_ = ",nrec_);
										console.log("nRec1 = ", nRecl);
										//Mimodel.setProperty("/d/results/", Data);
										//Mimodel.refech
										var sinCerosNumDoc = parseInt(numDoc);
										self.getView().byId("nroDocumento").setValue(sinCerosNumDoc.toString());
										console.log("nRecl.length = ", nRecl.length);
										if (nRecl.length) {
											console.log("Entro");
											self.RefrescarDatos(nRecl);
										} else {
											self.validacionTabla();
											self.RefrescarDatos(-1);
											//sap.ui.core.BusyIndicator.hide();
										}


								} else {
									//oFilter.push(new sap.ui.model.Filter("Estado", sap.ui.model.FilterOperator.Contains, 'D'));
									/*tableGest.bindRows("/");
									tableGest.getBinding("rows").filter(oFilter, "Application");*/
									var oFilter = [];
									tableGest.bindRows("/");
									tableGest.getBinding("rows").filter(oFilter, "Application");
									MessageToast.show("Documento no encontrado");
									//this.getView().byId("col_estado").setVisible(false);
									//this.getView().byId("col_pos").setVisible(false);
									busyDialog.close();
								}

								//MCA limpia el casillero Factura
								var sNroDocumento = that2.getView().byId("nroDocumento").getValue();
								if (sNroDocumento == '0') {
									that2.getView().byId("nroDocumento").setValue('');
								}

							}, this);

							Mimodel.attachEvent('requestFailed', function() {
								busyDialog.close();
								MessageToast.show("Problemas en la búsqueda");

							}, this);
						busyDialog.close();
                    }, 200);

					},


pressBuscar: function() {
						console.log("Modelo ", this.getView().getModel());

						this.getView().byId("col_estado").setVisible(true);
						this.getView().byId("col_pos").setVisible(true);
						var mystr = this.getView().byId("nroDocumento").getValue();
						var pad = '0000000000';
						numDoc = (pad + mystr).slice(-pad.length);
						var keyDocumento = this.getView().byId("cmbtipoDocumen").getSelectedKey();
						keyDoc = parseInt(keyDocumento);

						//MCA carga de fechas
						var fechaDesde = this.getView().byId("fechaDesde").getValue();
						var fechaHasta = this.getView().byId("fechaHasta").getValue();
						this.getView().getModel("midata").setProperty("/fechaDesde", fechaDesde);
						this.getView().getModel("midata").setProperty("/fechaHasta", fechaHasta);
						console.log("fechaDesde = ", fechaDesde);
						console.log("fechaHasta = ", fechaHasta);
						console.log("fechaDesde = ", this.getYYYYMMDD2(fechaDesde));
						console.log("fechaHasta = ", this.getYYYYMMDD2(fechaHasta));
						var blFecInicio = this.validaFecha(fechaDesde);
						var blFecFinal = this.validaFecha(fechaHasta);
						console.log("blFecInicio = ", blFecInicio);
						console.log("blFecFinal = ", blFecFinal);

						if (!((blFecInicio || fechaDesde == '') && (blFecFinal || fechaHasta == ''))) {
							sap.m.MessageToast.show("Fecha no es válida");
							return;
						}
						if (fechaHasta != '' && fechaDesde == '') {
							sap.m.MessageToast.show("Rango inválido, definir fecha inicial");
							return;
						}
						if ((this.getYYYYMMDD2(fechaHasta) < this.getYYYYMMDD2(fechaDesde)) && fechaDesde != '' && fechaHasta != '') {
							sap.m.MessageToast.show("Rango mal definido");
							return;
						}

						//console.log("log", oBinding.getLength());

						if (keyDoc === 1) {
							TipoDoc = "Factura";
						} else {
							if (keyDoc === 2) {
								TipoDoc = "Entrega";
							} else {
								if (keyDoc === 3) {
									TipoDoc = "Traslado";
								}
							}
						}
						setTimeout(function() {
							$("#__xmlview0--tableGestionInsat-selall").hide();
						}, 200);
						this.mostrarDatosGestionInsatisfacciones('pressBuscar'); //MCA se agrego para determinar la funcion del llamado
						//that.mostrarDatosGestionInsatisfacciones();
						jQuery(".tableGestionInsat .sapUiTableCnt .sapUiTableHSb").animate({
							scrollLeft: 0
						}, 1);

					},

					},

					VT: function() {
						var tablaGes = this.getView().byId("tableGestionInsat");
						var filas = tablaGes.getRows();
						var cantidad = filas.length;
						var usuario = IdUsuarioPerfil;
						for (var i = 0; i < cantidad; i++) {
							var filaCurrent = filas[i];

							var cellTrapaso = filaCurrent.getCells()[6];
							var cellTipoDocumento = filaCurrent.getCells()[52];
							var cellTratamiento = filaCurrent.getCells()[3];

							var cellCantidadObservada = filaCurrent.getCells()[18];
							var cellImporteObservado = filaCurrent.getCells()[22];

							var cellRepresentanteComercial = filaCurrent.getCells()[34];
							var cellDescripcionInsatisfaccion = filaCurrent.getCells()[35];
							var cellMotivo = filaCurrent.getCells()[36];

							var cellImporteVerificado = filaCurrent.getCells()[53];
							var cellCantidadVerificada = filaCurrent.getCells()[54];
							var cellStatusCierre = filaCurrent.getCells()[51];
							var celCondExpedicion = filaCurrent.getCells()[56];
							var celEstado = filaCurrent.getCells()[filaCurrent.getCells().length - 2];

							var isUsuarioVentas = usuario === "3" ? true : false;
							var isUsuarioCalidad = usuario === "2" ? true : false;
							var isUsuarioDespacho = usuario === "4" ? true : false;
							var isTraslado;
							try {
								isTraslado = cellTrapaso.getText() !== '' ? true : false;
							} catch (e) {
								console.log(e);
								isTraslado = false;
							}

							var isDevolucion = cellTipoDocumento.getText() === "DEVOLUCION" ? true : false;
							var isValor = cellTipoDocumento.getText() === "VALOR" ? true : false;

							var isComercial = cellTratamiento.getSelectedItem().getText() === "COMERCIAL" ? true : false;
							var isCalidad = cellTratamiento.getSelectedItem().getText() === "CALIDAD" ? true : false;
							var isFinalizado = celEstado.getText() === "F" ? true : false;

							if (isTraslado) {
								cellImporteObservado.setEnabled(false);
								cellCantidadVerificada.setEnabled(false);
								cellImporteVerificado.setEnabled(false);
							} else {

								cellImporteObservado.setEnabled(isValor);
								cellCantidadVerificada.setEnabled(isDevolucion);
								cellImporteVerificado.setEnabled(isValor);
							}

							cellCantidadObservada.setEnabled(isDevolucion);
							cellTratamiento.setEnabled(isUsuarioCalidad);
							cellRepresentanteComercial.setEnabled(true /*isComercial || isCalidad*/ );
							cellDescripcionInsatisfaccion.setEnabled(true /*isComercial || isCalidad*/ );
							cellMotivo.setEnabled(true /*isComercial || isCalidad*/ );
							//MCA cellStatusCierre.setEnabled(true /*isComercial || isCalidad*/ );
							celCondExpedicion.setEnabled(!isTraslado);

							for (var x = 38; x < 51; x++) {
								var cellCurrent = filaCurrent.getCells()[x];
								cellCurrent.setEnabled(isCalidad && isUsuarioCalidad);
							}

							if (isUsuarioDespacho || isFinalizado) {

								cellTratamiento.setEnabled(false);
								cellCantidadObservada.setEnabled(false);
								cellImporteObservado.setEnabled(false);
								cellCantidadVerificada.setEnabled(false);
								cellImporteVerificado.setEnabled(false);
								cellRepresentanteComercial.setEnabled(false /*isComercial || isCalidad*/ );
								cellDescripcionInsatisfaccion.setEnabled(false /*isComercial || isCalidad*/ );
								cellMotivo.setEnabled(false /*isComercial || isCalidad*/ );
								cellStatusCierre.setEnabled(false /*isComercial || isCalidad*/ );
								celCondExpedicion.setEnabled(false /*isComercial || isCalidad*/ );

								for (var x2 = 38; x2 < 51; x2++) {
									var cellCurrent2 = filaCurrent.getCells()[x2];
									cellCurrent2.setEnabled(false);
								}
							}

							if (!isFinalizado) {
								if (isComercial) {

									filaCurrent.getCells()[49].setValue("\t");

								} else {

									if (!filaCurrent.getCells()[49].getValue().trim()) {
										filaCurrent.getCells()[49].setDateValue(new Date());
									}
								}
							}

						}

						//MCA:  Franz  scrollbar
						console.log("tablaGes");
						console.log(tablaGes);
						console.log(tablaGes.getBinding("rows"));
						for (var i = 0; i < 50; i++) {
                tablaGes.addRow(new sap.ui.table.Row("rowInternal" + i.toString(), {
                    label: new sap.ui.commons.Label("l1", { text: "rowInternal" + i.toString() })
                }));
            }
								//tablaGes.getBinding("rows").refresh(true);

							jQuery(".tableGestionInsat .sapUiTableCnt .sapUiTableHSb").animate({
								scrollLeft: 2000
							}, 1);

							jQuery(".tableGestionInsat .sapUiTableCnt .sapUiTableVSb").animate({
								scrollTop: 1000
							}, 1);

							jQuery(".tableGestionInsat .sapUiTableCnt .sapUiTableVSb").animate({
								scrollTop: 0
							}, 1);
							// fin MCA

							
							tablaGes.clearSelection();
						},
						validacionTabla: function() {
								/*var self = this;

								setTimeout(function() {
									self.VT();
								}, 1000);

								setTimeout(function() {
									self.VT();
								}, 2000);

								setTimeout(function() {
									self.VT();
								}, 3000);

								setTimeout(function() {
									self.VT();
								}, 4000);

								setTimeout(function() {

									self.VT();
								}, 5000);

								setTimeout(function() {
									self.VT();
								}, 6000);

								setTimeout(function() {

									self.VT();
								}, 7000);

								setTimeout(function() {
									self.VT();
								}, 8000);

								setTimeout(function() {

									self.VT();
								}, 9000);

								setTimeout(function() {
									sap.ui.core.BusyIndicator.hide();
									self.VT();
								}, 10000);*/   
								
								
								

								/*	
									setTimeout(function() {
										self.VT();
									}, 12000);

									
									setTimeout(function() {
										self.VT();
									}, 13000);

									
									setTimeout(function() {
										self.VT();
									}, 14000);
								*/
								this.VT();
							},
						



			mostrarDatosGestionInsatisfacciones: function(sFuncion) {
						console.log("mostrarDatosGestionInsatisfacciones -- Inicio", sFuncion);
						var that2 = this;
						var self = this;
						var busyDialog = new sap.m.BusyDialog({customIconHeight : "32px",customIconWidth :"32px"});
busyDialog.open();
setTimeout(function () {



						var tableGest = that2.getView().byId("tableGestionInsat");
						var Mimodel = new JSONModel();

						//MCA: incializa el flag para marca de reclamos
						var midata = that2.getView().getModel("midata");
						midata.setProperty("blReclamosCargados", true);
						var fechaDesde = midata.getProperty("/fechaDesde");
						var fechaHasta = midata.getProperty("/fechaHasta");
						if (fechaDesde !== undefined && fechaDesde != '') {
							fechaDesde = fechaDesde.substr(3, 2) + '/' + fechaDesde.substr(0, 2) + '/' + fechaDesde.substr(6, 4);
						}
						if (fechaHasta !== undefined && fechaHasta != '') {
							fechaHasta = fechaHasta.substr(3, 2) + '/' + fechaHasta.substr(0, 2) + '/' + fechaHasta.substr(6, 4);
						}
						console.log("fechaDesde = ", fechaDesde); // MM/dd/YYYY
						console.log("fechaHasta = ", fechaHasta);
						console.log("numDoc = ", numDoc);
						if (numDoc !== '0000000000' && numDoc !== '') {
							fechaDesde = '';
							fechaHasta = '';
						}
						//MCA: fin

						// Nuevo filtro aplicado
						// ?$filter=FechaRegistro ge datetime'2017-09-01' and FechaRegistro le datetime'2017-09-12'
						
							console.log("numDoc = ", numDoc);
							var sData = '';
							if ((numDoc == '0000000000' || numDoc == '') && (fechaDesde != '' || fechaHasta != '')) {
								console.log("Busqueda por fecha");
								if (fechaDesde != '' && fechaHasta != '') {
									sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FechaRegistro ge datetime'" + that2.getYYYYMMDD(fechaDesde) +
										"' and FechaRegistro le datetime'" + that2.getYYYYMMDD(fechaHasta) + "'";
									Mimodel.loadData(sData);
								} else if (fechaDesde != '') {
									sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FechaRegistro eq datetime'" + that2.getYYYYMMDD(fechaDesde) + "'";
									Mimodel.loadData(sData);
								}
							} else if (numDoc != '0000000000' && numDoc != '') {
								console.log("Busqueda por documento");
								//midata.setProperty("/fechaDesde", '');
								//midata.setProperty("/fechaHasta", '');
								sData = "/destinations/Prodac/.xsodata/Detalles?$filter=FacturaSAP eq '" + numDoc + "' or Entrega eq '" + numDoc +
									"' or CodigoDoc eq '" + numDoc + "'";
								Mimodel.loadData(sData);
							} else {
								return;
							}
							console.log("sData = ", sData);
							Mimodel.attachEvent("requestCompleted", function() {
								var Data = Mimodel.getProperty("/d/results/");
								busyDialog.open();
								if (Data.length > 0) {
									var oFilter = [];

									if (TipoDoc === "Factura" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("FacturaSAP", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									if (TipoDoc === "Entrega" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("Entrega", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									if (TipoDoc === "Traslado" && numDoc != '0000000000') {
										oFilter.push(new sap.ui.model.Filter("CodigoDoc", sap.ui.model.FilterOperator.Contains, numDoc));
									}

									//MCA filtro para fecha
									if (fechaDesde !== undefined && fechaDesde.length > 0 && fechaHasta !== undefined && fechaHasta.length > 0) {
										console.log("entro");
										oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.BT, (new Date(fechaDesde)), (new Date(
											fechaHasta))));
									} else {
										if (fechaDesde !== undefined && fechaDesde.length > 0) {
											oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.GE, fechaDesde));
										}
										if (fechaHasta !== undefined && fechaHasta.length > 0) {
											oFilter.push(new sap.ui.model.Filter("FechaRegistro", sap.ui.model.FilterOperator.LE, fechaHasta));
										}
									}
									//MCA fin

									//MCA no se usa opor el nuevo filtro, se borra
									tableGest.bindRows("/Detalles");
									tableGest.getBinding("rows").filter(oFilter, "Application");
									//tableGest.setVisibleRowCount(Data.length);
									tableGest.setVisibleRowCount(11);
									//if(Data.length === 1)
									//{
									//console.log("MIDATA" , estado);
									//this.getView().byId("fechaImplem").setDateValue(new Date());

									console.log("*** Tiempo reserva procesamiento tabla (Data.length)", Data.length);
									

										var tipTratamiento = 0;
										var tipSNC = 0;
										for (var i = 0; i < Data.length; i++) {
											Data[i].CodVendedor = "PROBANDO";
											if (Data[i].Tratamiento === 'COMERCIAL') {
												tipTratamiento = 1;
												Data[i].FechaImplem = null;
											} else {
												tipTratamiento = 2; //CALIDAD
											}

											if (Data[i].TipoSNC === 'DEVOLUCION') {
												tipSNC = 1;
											} else {
												tipSNC = 2; //VALOR
											}

											if (keyDoc === 3) {
												that2.tablaTraslado(i);

											} else {
												that2.tablaDevolucionValor(i);
											}
										}

										var nrec_ = [];
										var nRecl = [];

										console.log("Inicio tiempo = ", (new Date()));
										if (sFuncion === 'pressBuscar') {
											//MCA en caso se utilice la busqueda se cargan todos los reclamos para procesar
											for (var i = 0; i < Data.length; i++) {
												nrec_.push(Data[i].Id + "," + Data[i].FacturaSAP); //MCA se agrego llave para comparar
											}
											jQuery.each(nrec_, function(i, el) {
												if (jQuery.inArray(el, nRecl) === -1) {
													nRecl.push(Data[i].Id + "," + Data[i].FacturaSAP);
												}
											});
										} else {
											for (var i = 0; i < Data.length; i++) {
												if (Data[i].Estado === 'F') {
													nrec_.push(Data[i].Id + "," + Data[i].FacturaSAP); //MCA se agrego FacturaSAP
												}
											}
											jQuery.each(nrec_, function(i, el) {
												if (jQuery.inArray(el, nRecl) === -1) {
													//nRecl.push(el);
													nRecl.push(Data[i].Id + "," + Data[i].FacturaSAP);
												}
											});
										}
										console.log("Final tiempo = ", (new Date()));
										//console.log("nrec_ = ",nrec_);
										console.log("nRec1 = ", nRecl);
										Mimodel.setProperty("/d/results/", Data);
										Mimodel.refresh();
										var sinCerosNumDoc = parseInt(numDoc);
										self.getView().byId("nroDocumento").setValue(sinCerosNumDoc.toString());
										console.log("nRecl.length = ", nRecl.length);
										if (nRecl.length) {
											console.log("Entro");
											//self.RefrescarDatos(nRecl);
											/**Inicio RefrescarDatos**/
												console.log("**** RefrescarDatos() - Inicio ***********");

						//MCA : reemplaza logica de capura data tabla
						var nroReclamos = nRecl;
						var tablaGes = self.getView().byId("tableGestionInsat");
						var filas = tablaGes.getRows();
						var cantidad = filas.length;

						//MCA pasa los objetos a un arreglo
						var OdataModel = Data;
						var p = tablaGes.getModel().getProperty("/");
						var aDataTabla = [];
						for (var key in p) {
							if (p.hasOwnProperty(key)) {
								if (key.startsWith("Detalles")) {
									aDataTabla.push([key, p[key]]);
								}
							}
						}
						console.log("aDataTabla = ", aDataTabla);
						cantidad = aDataTabla.length;

						if (nroReclamos === -1) {
							for (var j = 0; j < cantidad; j++) {
								var filaCurrent = filas[j];
								filaCurrent.getCells()[57].setText("");
								filaCurrent.getCells()[58].setText("");
								filaCurrent.getCells()[59].setText("");
								filaCurrent.getCells()[60].setText("");
								filaCurrent.getCells()[61].setText("");
							}
							return;
						}

						var code = 1;
						//var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis2/130/zservice_zws_zinsatis2/zbinding_zws_zinsatis2";  //MCA Se cambio por el nuevo servicio
						var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis3/130/zservice_zws_zinsatis3/zbinding_zws_zinsatis3";
						var thah = self;
						var _request2 = "";
						var request1 =
							'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\
						     <soapenv:Header/>\
						     <soapenv:Body>\
						         <urn:ZSD_GESTION_INSATISFACCION3>\
						         <CODE>' + code + '</CODE>\
						         <DOCUM>' + numDoc + '</DOCUM>\
						         <NRO_RECLAMO></NRO_RECLAMO>\
						         <TIPO_DOC>' + keyDoc + '</TIPO_DOC>\
						         <T_BORRADO>\
						            <item>\
						               <VBELN></VBELN>\
						               <POSNR></POSNR>\
						            </item>\
						         </T_BORRADO>\
						         <T_RECLAMO>';
						for (var i = 0; i < nroReclamos.length; i++) {
							_request2 += '<item>\
												<DOCUM>' + nroReclamos[i].split(",")[1] + '</DOCUM>\
								        		<RECLAMO>' +
							nroReclamos[i].split(",")[0] + '</RECLAMO>\
						    			  </item>';
						}
						var request3 = '</T_RECLAMO>\
					    			</urn:ZSD_GESTION_INSATISFACCION3>\
								</soapenv:Body>\
							</soapenv:Envelope>';

						var request = request1 + _request2 + request3;

						console.log("REQUEST");
						$.ajax({
							url: url,
							async: false,
							type: "POST",
							processData: false,
							data: request,
							dataType: 'xml',
							contentType: "text/xml; charset=\"utf-8\"",
							success: function(data, textStatus, jqXHR) {
								console.log("*********** Respuesta SUCCESS");

								function formatter(datos) {
									data = datos.toString();
									//var xml = '<?xml version="1.0" encoding="UTF-8"?>';
									return data;
								}

								var xml = formatter(jqXHR.responseText);
								var modeldata = $.parseXML(xml);
								var celemn = modeldata.children[0].children[1].children[0].children[1].childElementCount;
								var listCodReclamos = [];
									console.log("**** Arreglo respuesta BAPI ", modeldata.children[0].children[1].children[0].children[1]);
									busyDialog.open();
									for (var j = 0; j < cantidad; j++) {
										console.log("****** Procesando fila " + j + " de " + cantidad);

										var codigoReclamoCurrent = '';
										try {
											codigoReclamoCurrent = aDataTabla[j][1].Id;
										} catch (e) {}
										var codigoPosicion = '';
										try {
											codigoPosicion = aDataTabla[j][1].Posicion;
										} catch (e) {}

										for (var i = 0; i < celemn; i++) {
											var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
											//var IDMat = tablaGes.getRows()[i].getCells()[1].getText();
											var docum = dato[0].textContent;
											var factura = dato[1].textContent;
											var snc = dato[2].textContent;
											var sncFormatter = thah.formatter.borrarCeros(snc);
											var pos_snc = dato[3].textContent;
											var motivoSnc = dato[4].textContent;
											var cantidadSnc = parseInt(dato[5].textContent);
											var cantidadSncFormatter = thah.formatter.EnteroDecimal(cantidadSnc);
											var importeSnc = dato[6].textContent;
											var importeSncFormatter = thah.formatter.currencyValue(importeSnc);
											var nc = dato[7].textContent;
											var ncFormatter = thah.formatter.borrarCeros(nc);

											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];

											if (parseInt(codigoReclamoCurrent) === parseInt(docum) && parseInt(codigoPosicion) === parseInt(pos_snc)) {
												base.setProperty(base2 + "/NroSNC", sncFormatter);
												base.setProperty(base2 + "/MotivoSNCSAP", motivoSnc);
												base.setProperty(base2 + "/CantidadSNC", cantidadSncFormatter);
												base.setProperty(base2 + "/ImporteSNC", importeSncFormatter);
												base.setProperty(base2 + "/NC", ncFormatter);
											}
										}
									}
									thah.getView().getModel().refresh(true);
									busyDialog.close();

									var listReclamosActualizar = [];
									for (var i = 0; i < celemn; i++) {
										var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
										var codigoReclamo = dato[0].textContent;
										var listValid = listReclamosActualizar.filter(function(item) {
											return item === codigoReclamo;
										});
										if (listValid.length < 1) {
											listReclamosActualizar.push(codigoReclamo);
										}
									}

									var listReclamos = [];
									for (var j = 0; j < cantidad; j++) {
										try {

											//MCA se cambia las variables
											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];
											var codigoReclamoCurrent = base.getProperty(base2 + "/Id");
											var estado = base.getProperty(base2 + "/Estado");

											if (estado === "F") {
												var listValid2 = listReclamos.filter(function(item) {
													return item === codigoReclamoCurrent;
												});

												if (listValid2.length < 1) {
													listReclamos.push(codigoReclamoCurrent);
												}
											}
										} catch (e) {
											console.error(e);
										}
									}

									if (listReclamosActualizar.length > 0) {

										var listaActualizar = listReclamos.filter(function(codCurrent) {
											var validador = true;

											for (var x = 0; x < listReclamosActualizar.length; x++) {
												if (codCurrent === listReclamosActualizar[x]) {
													validador = false;
												}
											}
											return validador;
										});

										if (listaActualizar.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listaActualizar);
										}

									} else {

										if (listReclamos.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listReclamos);
										}
									}


							},
							error: function(e, xhr, status) {
								sap.ui.core.BusyIndicator.hide();
								MessageToast.show("Error, no se pudo refrescar");
							},
							complete: function(xhr, status) {
								thah.VT();
								console.log("COMPLETE");

							}
						});
											/**Fin RefrescarDatos**/
										} else {
											self.VT();
											//self.RefrescarDatos(-1);
											/**Inicio RefrescarDatos**/
												console.log("**** RefrescarDatos() - Inicio ***********");

						//MCA : reemplaza logica de capura data tabla
						var nroReclamos = -1;
						var tablaGes = self.getView().byId("tableGestionInsat");
						var filas = tablaGes.getRows();
						var cantidad = filas.length;

						//MCA pasa los objetos a un arreglo
						var p = tablaGes.getModel().getProperty("/");
						var aDataTabla = [];
						for (var key in p) {
							if (p.hasOwnProperty(key)) {
								if (key.startsWith("Detalles")) {
									aDataTabla.push([key, p[key]]);
								}
							}
						}
						console.log("aDataTabla = ", aDataTabla);
						cantidad = aDataTabla.length;

						if (nroReclamos === -1) {
							for (var j = 0; j < cantidad; j++) {
								var filaCurrent = filas[j];
								filaCurrent.getCells()[57].setText("");
								filaCurrent.getCells()[58].setText("");
								filaCurrent.getCells()[59].setText("");
								filaCurrent.getCells()[60].setText("");
								filaCurrent.getCells()[61].setText("");
							}
							return;
						}

						var code = 1;
						//var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis2/130/zservice_zws_zinsatis2/zbinding_zws_zinsatis2";  //MCA Se cambio por el nuevo servicio
						var url = "/WServices/sap/bc/srt/rfc/sap/zws_zinsatis3/130/zservice_zws_zinsatis3/zbinding_zws_zinsatis3";
						var thah = self;
						var _request2 = "";
						var request1 =
							'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\
						     <soapenv:Header/>\
						     <soapenv:Body>\
						         <urn:ZSD_GESTION_INSATISFACCION3>\
						         <CODE>' + code + '</CODE>\
						         <DOCUM>' + numDoc + '</DOCUM>\
						         <NRO_RECLAMO></NRO_RECLAMO>\
						         <TIPO_DOC>' + keyDoc + '</TIPO_DOC>\
						         <T_BORRADO>\
						            <item>\
						               <VBELN></VBELN>\
						               <POSNR></POSNR>\
						            </item>\
						         </T_BORRADO>\
						         <T_RECLAMO>';
						for (var i = 0; i < nroReclamos.length; i++) {
							_request2 += '<item>\
												<DOCUM>' + nroReclamos[i].split(",")[1] + '</DOCUM>\
								        		<RECLAMO>' +
							nroReclamos[i].split(",")[0] + '</RECLAMO>\
						    			  </item>';
						}
						var request3 = '</T_RECLAMO>\
					    			</urn:ZSD_GESTION_INSATISFACCION3>\
								</soapenv:Body>\
							</soapenv:Envelope>';

						var request = request1 + _request2 + request3;

						console.log("REQUEST");
						$.ajax({
							url: url,
							async: false,
							type: "POST",
							processData: false,
							data: request,
							dataType: 'xml',
							contentType: "text/xml; charset=\"utf-8\"",
							success: function(data, textStatus, jqXHR) {
								console.log("*********** Respuesta SUCCESS");

								function formatter(datos) {
									data = datos.toString();
									//var xml = '<?xml version="1.0" encoding="UTF-8"?>';
									return data;
								}

								var xml = formatter(jqXHR.responseText);
								var modeldata = $.parseXML(xml);
								var celemn = modeldata.children[0].children[1].children[0].children[1].childElementCount;
								var listCodReclamos = [];
									console.log("**** Arreglo respuesta BAPI ", modeldata.children[0].children[1].children[0].children[1]);

									for (var j = 0; j < cantidad; j++) {
										console.log("****** Procesando fila " + j + " de " + cantidad);

										var codigoReclamoCurrent = '';
										try {
											codigoReclamoCurrent = aDataTabla[j][1].Id;
										} catch (e) {}
										var codigoPosicion = '';
										try {
											codigoPosicion = aDataTabla[j][1].Posicion;
										} catch (e) {}

										for (var i = 0; i < celemn; i++) {
											var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
											//var IDMat = tablaGes.getRows()[i].getCells()[1].getText();
											var docum = dato[0].textContent;
											var factura = dato[1].textContent;
											var snc = dato[2].textContent;
											var sncFormatter = thah.formatter.borrarCeros(snc);
											var pos_snc = dato[3].textContent;
											var motivoSnc = dato[4].textContent;
											var cantidadSnc = parseInt(dato[5].textContent);
											var cantidadSncFormatter = thah.formatter.EnteroDecimal(cantidadSnc);
											var importeSnc = dato[6].textContent;
											var importeSncFormatter = thah.formatter.currencyValue(importeSnc);
											var nc = dato[7].textContent;
											var ncFormatter = thah.formatter.borrarCeros(nc);

											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];

											if (parseInt(codigoReclamoCurrent) === parseInt(docum) && parseInt(codigoPosicion) === parseInt(pos_snc)) {
												base.setProperty(base2 + "/NroSNC", sncFormatter);
												base.setProperty(base2 + "/MotivoSNCSAP", motivoSnc);
												base.setProperty(base2 + "/CantidadSNC", cantidadSncFormatter);
												base.setProperty(base2 + "/ImporteSNC", importeSncFormatter);
												base.setProperty(base2 + "/NC", ncFormatter);
											}
										}
									}
									thah.getView().getModel().refresh(true);


									var listReclamosActualizar = [];
									for (var i = 0; i < celemn; i++) {
										var dato = modeldata.children[0].children[1].children[0].children[1].children[i].children;
										var codigoReclamo = dato[0].textContent;
										var listValid = listReclamosActualizar.filter(function(item) {
											return item === codigoReclamo;
										});
										if (listValid.length < 1) {
											listReclamosActualizar.push(codigoReclamo);
										}
									}

									var listReclamos = [];
									for (var j = 0; j < cantidad; j++) {
										try {

											//MCA se cambia las variables
											var base = thah.getView().byId("tableGestionInsat").getModel();
											var base2 = "/" + aDataTabla[j][0];
											var codigoReclamoCurrent = base.getProperty(base2 + "/Id");
											var estado = base.getProperty(base2 + "/Estado");

											if (estado === "F") {
												var listValid2 = listReclamos.filter(function(item) {
													return item === codigoReclamoCurrent;
												});

												if (listValid2.length < 1) {
													listReclamos.push(codigoReclamoCurrent);
												}
											}
										} catch (e) {
											console.error(e);
										}
									}

									if (listReclamosActualizar.length > 0) {

										var listaActualizar = listReclamos.filter(function(codCurrent) {
											var validador = true;

											for (var x = 0; x < listReclamosActualizar.length; x++) {
												if (codCurrent === listReclamosActualizar[x]) {
													validador = false;
												}
											}
											return validador;
										});

										if (listaActualizar.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listaActualizar);
										}

									} else {

										if (listReclamos.length > 0) {
											sap.ui.core.BusyIndicator.show(10);
											thah.ActualizarEstados(listReclamos);
										}
									}


							},
							error: function(e, xhr, status) {
								sap.ui.core.BusyIndicator.hide();
								MessageToast.show("Error, no se pudo refrescar");
							},
							complete: function(xhr, status) {
								thah.VT();
								console.log("COMPLETE");

							}
						});
											/**Fin RefrescarDatos**/
											//sap.ui.core.BusyIndicator.hide();
										}

									

								} else {
									//oFilter.push(new sap.ui.model.Filter("Estado", sap.ui.model.FilterOperator.Contains, 'D'));
									/*tableGest.bindRows("/");
									tableGest.getBinding("rows").filter(oFilter, "Application");*/
									var oFilter = [];
									tableGest.bindRows("/");
									tableGest.getBinding("rows").filter(oFilter, "Application");
									MessageToast.show("Documento no encontrado");
									//this.getView().byId("col_estado").setVisible(false);
									//this.getView().byId("col_pos").setVisible(false);
									sap.ui.core.BusyIndicator.hide();
								}

								//MCA limpia el casillero Factura
								var sNroDocumento = that2.getView().byId("nroDocumento").getValue();
								if (sNroDocumento == '0') {
									that2.getView().byId("nroDocumento").setValue('');
								}
							busyDialog.close();
							}, this);

							Mimodel.attachEvent('requestFailed', function() {
								busyDialog.close();
								MessageToast.show("Problemas en la búsqueda");

							}, this);
						busyDialog.close();
                    }, 200);

					},



