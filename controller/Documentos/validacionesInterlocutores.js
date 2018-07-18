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
var ruc = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");

if (ruc != "" || ruc != " ")
{
    if (ruc.length != 8 && ruc.length != 11)
    {
        MessageToast.show('Dato incorrecto,valor de DNI debe ser 8 dígitos y RUC 11 dígitos');
    }
}
//6000001216 INSERT END OF EDC 26.10.2016



//INSERT BEGIN OF EDC 24.08.2015

//		        if (objPedidoStore.last().data.CanalDist == '10') 
//		        {
//		             if (objPedidoStore.last().data.CodTipoDoc == "ZO01" || objPedidoStore.last().data.CodTipoDoc == "ZO02" || 
//		                 objPedidoStore.last().data.CodTipoDoc == "Z001" || objPedidoStore.last().data.CodTipoDoc == "Z002" || 
//		                 objPedidoStore.last().data.CodTipoDoc == "Z003" || objPedidoStore.last().data.CodTipoDoc == "Z004" || 
//		                 objPedidoStore.last().data.CodTipoDoc == "Z034") 
//		            {
//		            
//		                if (interlocutoresStore.data.items[0].data.Ruc.length <= 8 && cliEventualStore.last().data.esEventual.toLowerCase().trim() == "true") 
//		                {
//		        		        
//		                    var amb1 = panel8.items.items[17].value;
//		                    var amb2 = panel8.items.items[19].value;
//		                    var amb3 = panel8.items.items[21].value;
//            		        
//            		        if ( amb1 == "" || amb1 == undefined )
//            		        {
//            		            amb1 = "";
//            		        }

//            		        if ( amb2 == "" || amb2 == undefined )
//            		        {
//            		            amb2 = "";
//            		        }
//            		        
//            		        if ( amb3 == "" || amb3 == undefined )
//            		        {
//            		            amb3 = "";
//            		        }            		        
//		                     for (var i = 0; i < preguntasStore.data.items[5].data.listaResp.length; i++)
//		                     {
//		                        if (amb1 == preguntasStore.data.items[5].data.listaResp[i].Codigo)
//		                        {
//		                            var descAmb1 = preguntasStore.data.items[5].data.listaResp[i].Descripcion;
//		                            break;
//		                        }	            
//		                     }
//		                     
//		                     if (descAmb1 == "" || descAmb1 == undefined )
//		                     {
//		                        descAmb1 = "";
//		                     }
//		                     
//            		        
//		                    for (var i = 0; i < preguntasStore.data.items[7].data.listaResp.length; i++)
//		                     {
//		                        if (amb2 == preguntasStore.data.items[7].data.listaResp[i].Codigo)
//		                        {
//		                            var descAmb2 = preguntasStore.data.items[7].data.listaResp[i].Descripcion;
//		                            break;
//		                        }	            
//		                     }
//		                     
//		                     if (descAmb2 == "" || descAmb2 == undefined )
//		                     {
//		                        descAmb2 = "";
//		                     }
//            		         
//		                     for (var i = 0; i < preguntasStore.data.items[9].data.listaResp.length; i++)
//		                     {
//		                        if (amb3 == preguntasStore.data.items[9].data.listaResp[i].Codigo)
//		                        {
//		                            var descAmb3 = preguntasStore.data.items[9].data.listaResp[i].Descripcion;
//		                            break;
//		                        }	            
//		                     }
//		                     
//		                     if (descAmb3 == "" || descAmb3 == undefined )
//		                     {
//		                        descAmb3 = "";
//		                     }
//            		         
//            		         
//		                     if ( descAmb1 == descAmb2 && descAmb1 == descAmb3 && descAmb2 == descAmb3 &&
//		                          descAmb1 != "" && descAmb2 != "" && descAmb3 != "" ) 
//		                     {
//		                        MessageToast.show("Validación", "Datos Cliente: Ambiente1,Ambiente2 y Ambiente 3 no deben ser iguales", function() { });
//		                        return false;
//		                     }
//		                     else{
//		                        if ( descAmb1 == "" && descAmb2 == "" && descAmb3 == "" )
//		                        {
//		                            MessageToast.show("Validación", "Ingresar minimo un Ambiente", function() { });
//		                            return false;
//		                        }
//		                        if (descAmb1 == descAmb2 && descAmb1 != "" && descAmb2 != "")
//		                        {
//		                            MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente2 no deben ser iguales", function() { });
//		                            return false;
//		                        }
//		                        if (descAmb1 == descAmb3 && descAmb1 != "" && descAmb3 != "")
//		                        {
//		                            MessageToast.show("Validación", "Datos Cliente: Ambiente1 y Ambiente3 no deben ser iguales", function() { });
//		                            return false;
//		                        }
//		                        if (descAmb2 == descAmb3 && descAmb2 != "" && descAmb3 != "")
//		                        {
//		                            MessageToast.show("Validación", "Datos Cliente: Ambiente2 y Ambiente3 no deben ser iguales", function() { });
//		                            return false;
//		                        }
//            		         
//		                     }
//		                 
//		                 }
//		             
//		             }
//		         
//		         }

//INSERT END OF EDC 24.08.2015

//validacion para que copie los datos del solicitante a todos los interlocutores
var rucAG = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");
var desAG = this.getView()
getModel().getProperty("/interlocutores/AG/Cliente/Descripcion");
var dirAG = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion");
var codPostalAG = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/CodigoPostal");
var telAG = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Telefono");
var lengthAG = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Direccion").length;
if (lengthAG > 60)
{
    MessageToast.show('No se permiten más de 60 caractéres en la dirección del Solicitante. Existe ' + lengthAG + ' caracteres.');
}
var desWE = this.getView()
getModel().getProperty("/interlocutores/WE/Cliente/Descripcion");
var dirWE = this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion");
var lengthWE = this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion").length;
if (lengthWE > 60)
{
    MessageToast.show('', 'No se permiten más de 60 caractéres en la dirección del Dest.Mcia. Existe ' + lengthWE + ' caracteres.');
}
if (this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion") == "" || this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion") == null)
{
    this.getView().getModel().setProperty("/interlocutores/WE/Cliente/Descripcion", desAG); //panel2.items.items[2].setValue(panel1.getValues().Descripcion);
}

if (this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion") == "" || this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Direccion") == null)
{
    this.getView().getModel().setProperty("/interlocutores/WE/Cliente/Direccion", dirAG);
    //panel2.items.items[3].setValue(panel1.getValues().Direccion);
}
if (this.getView().getModel().getProperty("/interlocutores/WE/Cliente/CodigoPostal") == "" || this.getView().getModel().getProperty("/interlocutores/WE/Cliente/CodigoPostal") == null)//EDC
//                if (panel2.getValues().Distrito == "" || panel2.getValues().Distrito == null)//EDC
{
    this.getView().getModel().setProperty("/interlocutores/WE/Cliente/CodigoPostal", codPostalAG);
    //panel2.items.items[4].setValue(panel1.getValues().CodigoPostal);
    var cpostalwe = codPostalAG; // ubicacionStore.findRecord('Codigo', panel1.getValues().CodigoPostal);
    if (cpostalwe)
    {
        var nombrewe = this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Descripcion"); //cpostalwe.data.Descripcion;
    }
    /*
    var interwe = interlocutoresStore.findRecord('Funcion', 'WE');
    interwe.set('Ciudad', nombrewe);///Roy: Por Revisar
    interwe.set('Distrito', nombrewe);///Roy: Por Revisar*/
}

if (this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Telefono") == "" || this.getView().getModel().getProperty("/interlocutores/WE/Cliente/Telefono") == null)
{
    this.getView().getModel().setProperty("/interlocutores/WE/Cliente/Telefono", telAG);
    //panel2.items.items[5].setValue(panel1.getValues().Telefono);
}

//FST 09/10/2013 TelMovilDestMercancia INICIO
//if (panel2.getValues().TelefonoMovil == "" || panel2.getValues().TelefonoMovil == null) {
//    panel2.items.items[6].setValue(panel2.getValues().TelefonoMovil);
//}
//FST 09/10/2013 TelMovilDestMercancia FIN

//ROY: Comentado  objPedidoStore.sync();
//Roy: Comentado interlocutoresStore.sync();

if (this.getView().getModel().getProperty("/interlocutores/RE/Cliente/Descripcion") == "" || this.getView().getModel().getProperty("/interlocutores/RE/Cliente/Descripcion") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RE/Cliente/Descripcion", desAG);
    //panel3.items.items[2].setValue(panel1.getValues().Descripcion);
}

if (this.getView().getModel().getProperty("/interlocutores/RE/Cliente/Direccion") == "" || this.getView().getModel().getProperty("/interlocutores/RE/Cliente/Direccion") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RE/Cliente/Direccion", dirAG);
    //panel3.items.items[3].setValue(panel1.getValues().Direccion);
}

if (this.getView().getModel().getProperty("/interlocutores/RE/Cliente/CodigoPostal") == "" || this.getView().getModel().getProperty("/interlocutores/RE/Cliente/CodigoPostal") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RE/Cliente/CodigoPostal", codPostalAG);
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

if (this.getView().getModel().getProperty("/interlocutores/RE/Cliente/Telefono") == "" || this.getView().getModel().getProperty("/interlocutores/RE/Cliente/Telefono") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RE/Cliente/Telefono", telAG);
    //panel3.items.items[5].setValue(panel1.getValues().Telefono);
}
//objPedidoStore.sync();
//interlocutoresStore.sync();

if (this.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == "" || this.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RG/Cliente/Ruc", rucAG);
    //panel4.items.items[2].setValue(panel1.getValues().Ruc);
}
if (this.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == "" || this.getView().getModel().getProperty("/interlocutores/RG/Cliente/Ruc") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RG/Cliente/Descripcion", desAG);
    //panel4.items.items[3].setValue(panel1.getValues().Descripcion);
}
if (this.getView().getModel().getProperty("/interlocutores/RG/Cliente/Direccion") == "" || this.getView().getModel().getProperty("/interlocutores/RG/Cliente/Direccion") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RG/Cliente/Direccion", dirAG);
    //panel4.items.items[4].setValue(panel1.getValues().Direccion);
}
if (this.getView().getModel().getProperty("/interlocutores/RG/Cliente/CodigoPostal") == "" || this.getView().getModel().getProperty("/interlocutores/RG/Cliente/CodigoPostal") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RG/Cliente/CodigoPostal", codPostalAG);
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

if (this.getView().getModel().getProperty("/interlocutores/RG/Cliente/Telefono") == "" || this.getView().getModel().getProperty("/interlocutores/RG/Cliente/Telefono") == null)
{
    this.getView().getModel().setProperty("/interlocutores/RG/Cliente/Telefono", telAG);
    //panel4.items.items[6].setValue(panel1.getValues().Telefono);
}

//objPedidoStore.sync();
//interlocutoresStore.sync();

/////Inicio Buscar Cliente Solicitante Panel 1/////////////////////////////////////////////////////////////////

if (objPedidoStore.last())
{
    if (panel1.getValues().Ruc != '' && panel1.getValues().Direccion == '' && panel1.getValues().Descripcion == '')
    {
        var dni = panel1.getValues().Ruc;
        panel1.add({xtype: 'hiddenfield', id: 'UserId', name: 'UserId', value: SAPUserStore.data.getAt(0).data.User});
        panel1.add({xtype: 'hiddenfield', id: 'PwdId', name: 'PwdId', value: SAPUserStore.data.getAt(0).data.Password});
        panel1.add({xtype: 'hiddenfield', id: 'Id', name: 'Id', value: SAPUserStore.data.getAt(0).data.Id});
        panel1.add({xtype: 'hiddenfield', id: 'dni', name: 'dni', value: dni});
        //FST 07/11/2013 ValidaRUCClienteEventual INICIO
        //var orgVentas = objPedidoStore.last().data.OrgVentas;
        //panel1.add({ xtype: 'hiddenfield', id: 'OrgVentas', name: 'OrgVentas', value: orgVentas });
        //FST 07/11/2013 ValidaRUCClienteEventual FIN
        panel1.submit({
            url: hostValue + '/buscarClientes.aspx',
            method: 'POST',
            waitMsg: {message: 'Conectando ...', cls: 'demos-loading'},
            success: function (form, action)
            {
                if (action.success)
                {
                    var rec = action.objCliente;
                    //************************************************************
                    panel1.items.items[3].setValue(rec.NOMBRE + ' ' + rec.APPAT + ' ' + rec.APMAT);
                    panel1.items.items[4].setValue(rec.DIREC);
                    //panel1.items.items[5].setValue(rec.ZCODE);
                    //************************************************************
                    panel8.items.items[0].setValue(rec.CODIG);
                    panel8.items.items[1].setValue(rec.APPAT);
                    panel8.items.items[2].setValue(rec.APMAT);
                    panel8.items.items[3].setValue(rec.NOMBRE);
                    var FECNAC = rec.FECNAC;
                    var FECNAC1 = FECNAC.split(/[^0-9]/);
                    var fechaF = new Date(FECNAC1[0], FECNAC1[1] - 1, FECNAC1[2], FECNAC1[3], FECNAC1[4], FECNAC1[5]);
                    panel8.items.items[4].setValue(fechaF);
                    panel8.items.items[5].setValue(rec.GRAINS);
                    panel8.items.items[6].setValue(rec.SEXO);
                    panel8.items.items[7].setValue(rec.Ciudad);
                    var edad = calculateAge(fechaF);
                    panel8.items.items[9].setValue(edad);
                    if (rec.EDAD <= 30)
                    {
                        panel8.items.items[10].setValue('1');
                    } else
                    {
                        if (rec.EDAD > 30 && rec.EDAD < 50)
                        {
                            panel8.items.items[10].setValue('2');
                        } else
                        {
                            panel8.items.items[10].setValue('3');
                        }
                    }
                    panel8.items.items[11].setValue(rec.NIVELSE);
                    var pre = action.listCliPregResp;
                    var itm = panel8.items.items;
                    for (var i = 0; i < itm.length; i++)
                    {
                        var cur = itm[i];
                        for (var j = 0; j < pre.length; j++)
                        {
                            var curP = pre[j];
                            if (cur.name == curP.CODP)
                            {
                                cur.setValue(curP.CODR);
                            }
                        }
                    }
                    var val = panel8.getValues();
                    objPedidoStore.last().set('datosCliente', val);
                    objPedidoStore.sync();
                    grabarDatos();
                    grabarCheck(); //EDC 18.03.2015 insert

                    //BEGIN OF EDC 18.03.2015
                    distritoStore.getProxy().clear();
                    distritoStore.data.clear();
                    distritoStore.sync();

                    distritoMercStore.getProxy().clear();
                    distritoMercStore.data.clear();
                    distritoMercStore.sync();
                    //END OF EDC 18.03.2015

                    window.open("interlocutores.html", "_self");
                } else
                {
                    MessageToast.show('Aviso', action.errors.reason);
                }
            },
            failure: function (form, action)
            {
                MessageToast.show('Aviso', action.errors.reason);
                panel8.items.items[0].setValue(panel1.getValues().Ruc);
            }
        });
    } else
    {
        //FST 07/11/2013 ValidaRUCClienteEventual INICIO
        //		                //Grabar Datos
        var codigoTipoDoc = objPedidoStore.last().data.CodTipoDoc;
        var found = docFid(codigoTipoDoc);
        if (found)
        {
            if (panel1.getValues().Direccion != '' && panel1.getValues().Descripcion != '')
            {
                if (panel2.getValues().TelefonoMovil != '' || (
                        objPedidoStore.last().data.CodTipoDoc != 'Z001' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z003' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z004' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z005' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z009' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z010' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z013' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z014' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z033' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z034' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z035' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z036' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z037' ||
                        objPedidoStore.last().data.CodTipoDoc != 'Z038'
                        ))
                {
                    if (panel2.getValues().Telefono != '' || (
                            objPedidoStore.last().data.CodTipoDoc != 'Z001' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z003' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z004' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z005' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z009' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z010' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z013' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z014' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z033' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z034' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z035' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z036' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z037' ||
                            objPedidoStore.last().data.CodTipoDoc != 'Z038'
                            ))
                    {
                        //FST 31/12/2013 DatosObligatoriosPedidos FIN
//		                                if (objPedidoStore.last().data.CanalDist == '10')
//		                                {
                        if (panel1.getValues().Telefono != '')
                        {
                            var ruc = this.getView().getModel().getProperty("/interlocutores/AG/Cliente/Ruc");
                            if (cliEventualStore.data.items.length > 0)
                            {
                                var codigoDoc = objPedidoStore.last().data.codigoCliente;
                                var inter = cliEventualStore.findRecord('codigoCliente', codigoDoc);
                                if (inter.data.esEventual == "true" || inter.data.codigoCliente.length >= 10)
                                {
                                    var val = panel8.getValues();
                                    val.DIREC = panel1.getValues().Direccion;

//		                                                if (panel1.getValues().Ruc.length <= 8)//SDEC093 DELETE EDC 18.03.2016
                                    if (panel1.getValues().Ruc.length <= 8 && inter.data.esEventual == "true")//SDEC093 INSERT EDC 18.03.2016
                                    {
                                        if (val.NOMBRE != '' && val.APPAT != '' && val.APMAT != '' && val.CODIG != '' && val.GRAINS != '0' && val.CIUDAD != '' && val.EDAD != null)
                                        {
                                            objPedidoStore.last().set('datosCliente', val);
                                            objPedidoStore.sync();
                                            grabarDatos();

                                            grabarCheck();//insert EDC 18.03.2015

                                            //BEGIN OF EDC 18.03.2015
                                            distritoStore.getProxy().clear();
                                            distritoStore.data.clear();
                                            distritoStore.sync();

                                            distritoMercStore.getProxy().clear();
                                            distritoMercStore.data.clear();
                                            distritoMercStore.sync();
                                            //END OF EDC 18.03.2015

                                            window.open("documento.html", "_self");
                                        } else
                                        {
                                            MessageToast.show('', 'Falta completar los datos de seguimiento del cliente.', function (res) { }, this);
                                        }
                                    } else if ((panel1.getValues().Ruc.length >= 10) ||
                                            (panel1.getValues().Ruc.length == 8 && inter.data.esEventual == "False")) //INSERT SDEC093
                                    {
                                        //SDEC093 INSERT BEGIN OF EDC
                                        var val2 = panel8.getValues();

                                        if (val2.FECNAC == null || val2.FECNAC == "")
                                        {
                                            val2.FECNAC = new Date();
                                        }

                                        objPedidoStore.last().set('datosCliente', val2);
                                        objPedidoStore.sync();
                                        //SDEC093 INSERT END OF EDC

                                        grabarDatos();

                                        grabarCheck();//insert EDC 18.03.2015

                                        //BEGIN OF EDC 18.03.2015
                                        distritoStore.getProxy().clear();
                                        distritoStore.data.clear();
                                        distritoStore.sync();

                                        distritoMercStore.getProxy().clear();
                                        distritoMercStore.data.clear();
                                        distritoMercStore.sync();
                                        //END OF EDC 18.03.2015

                                        panel1.add({xtype: 'hiddenfield', id: 'UserId', name: 'UserId', value: SAPUserStore.data.getAt(0).data.User});
                                        panel1.add({xtype: 'hiddenfield', id: 'PwdId', name: 'PwdId', value: SAPUserStore.data.getAt(0).data.Password});
                                        panel1.add({xtype: 'hiddenfield', id: 'Id', name: 'Id', value: SAPUserStore.data.getAt(0).data.Id});
                                        panel1.add({xtype: 'hiddenfield', id: 'grabaRuc', name: 'grabaRuc', value: "X"});
                                        panel1.add({xtype: 'hiddenfield', id: 'empresa', name: 'empresa', value: JSON.stringify(interlocutoresStore.findRecord('Funcion', 'AG').data)});
                                        panel1.submit({
                                            url: hostValue + '/buscarClientes.aspx',
                                            method: 'POST',
                                            waitMsg: {message: 'Conectando ...', cls: 'demos-loading'},
                                            success: function (form, action) {
                                                if (action.success) {
                                                    window.open("documento.html", "_self");
                                                } else {
                                                    MessageToast.show('Aviso', action.errors.reason);
                                                }
                                            },
                                            failure: function (form, action) {
                                                MessageToast.show('Aviso', action.errors.reason);
                                            }
                                        });

                                    }
                                } else
                                {
                                    grabarDatos();
                                    grabarCheck();//insert EDC 18.03.2015

                                    //BEGIN OF EDC 18.03.2015
                                    distritoStore.getProxy().clear();
                                    distritoStore.data.clear();
                                    distritoStore.sync();

                                    distritoMercStore.getProxy().clear();
                                    distritoMercStore.data.clear();
                                    distritoMercStore.sync();
                                    //END OF EDC 18.03.2015

                                    window.open("documento.html", "_self");
                                }
                            }
                        } else
                        {
                            MessageToast.show('', 'Falta llenar el campo Teléfono del Solicitante.', function (res) { }, this);
                        }
//		                                }
//		                                else
//		                                {
//		                                    grabarDatos();
//		                                    window.open("documento.html", "_self");
//		                                }
                    } else
                    {
                        MessageToast.show('', 'Falta llenar el campo Teléfono del Destinatario de Mercancía.', function (res) { }, this);
                    }
                } else
                {
                    MessageToast.show('', 'Falta llenar el campo Teléfono Móvil del Destinatario de Mercancía.', function (res) { }, this);
                }
            } else
            {
                MessageToast.show('', 'Falta llenar el campo Nombre del Solicitante y/o Dirección y/o Teléfono.', function (res) { }, this);
            }
        } else
        {
            if (panel1.getValues().Direccion != '' && panel1.getValues().Ruc != '' && panel1.getValues().Descripcion != '')
            {
                grabarDatos();
                grabarCheck(); //insert EDC 18.03.2015

                //BEGIN OF EDC 18.03.2015
                distritoStore.getProxy().clear();
                distritoStore.data.clear();
                distritoStore.sync();

                distritoMercStore.getProxy().clear();
                distritoMercStore.data.clear();
                distritoMercStore.sync();
                //END OF EDC 18.03.2015

                window.open("documento.html", "_self");
            } else
            {
                MessageToast.show('', 'Falta llenar los campos Nombre del Solicitante y/o Dirección y/o Ruc del Solicitante.', function (res)
                {
                }, this);
            }
        }
    }
} else
{
    MessageToast.show('', 'No se está creando documento', function (res)
    {
        window.open("claseDoc.html", "_self");
    }, this);
}

/////End Buscar Cliente Solicitante Panel 1/////////////////////////////////////////////////////////////////