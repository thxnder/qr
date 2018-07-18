sap.ui.define([
    "sap/ui/model/odata/v2/ODataModel",
    "pe/com/seidor/sap/decor/ventas/util/utilService"
], function (ODataModel, utilService) {
    "use strict";

    return {

        guardar: function (codigoCliente,
                            nombreCliente,
                            OrgVentas,
                            CanalDist,
                            CodOficina,
                            CondPago,
                            Moneda,
                            TipoCambio,
                            dsctoAdicionalZD12,
                            pesoTotal,
                            FechaFacturacion,
                            GrupoCond,
                            Motivo,
                            BloqueoFactura,
                            BloqueoEntrega,
                            OrdenCompra,
                            FechaPedido,
                            FechaValidez,
                            FechaEntrega,
                            CondExp,
                            FechaReparto,
                            nomProyecto,
                            codProyecto,
                            codVersion,
                            TipoVisita,
                            cbxReembolsable,
                            GrupoForecast,
                            TipoForecast,
                            Certificado,
                            FechaVisita,
                            listaMatJson,
                            listaDsctoJson,
                            listaRepJson,
                            listaIntJson,
                            listaPedJson,
                            listadatosCliente,
                            UserId,
                            PwdId,
                            Id,
                            GrpVend,
                            Descripcion,
                            CodigoVendedor,
                            numPedido,
                            op)
        {
            var contexto = {};
            contexto.servicio = "guardarDocumento.guardar()";
            contexto.url = "guardarDocumento.aspx";
            contexto.parametros = {codigoCliente: codigoCliente,
                                    nombreCliente: nombreCliente,
                                    OrgVentas: OrgVentas,
                                    CanalDist: CanalDist,
                                    CodOficina: CodOficina,
                                    CondPago: CondPago,
                                    Moneda: Moneda,
                                    TipoCambio: TipoCambio,
                                    dsctoAdicionalZD12: dsctoAdicionalZD12,
                                    pesoTotal: pesoTotal,
                                    FechaFacturacion: FechaFacturacion,
                                    GrupoCond: GrupoCond,
                                    Motivo: Motivo,
                                    BloqueoFactura: BloqueoFactura,
                                    BloqueoEntrega: BloqueoEntrega,
                                    OrdenCompra: OrdenCompra,
                                    FechaPedido: FechaPedido,
                                    FechaValidez: FechaValidez,
                                    FechaEntrega: FechaEntrega,
                                    CondExp: CondExp,
                                    FechaReparto: FechaReparto,
                                    nomProyecto: nomProyecto,
                                    codProyecto: codProyecto,
                                    codVersion: codVersion,
                                    TipoVisita: TipoVisita,
                                    cbxReembolsable: cbxReembolsable,
                                    GrupoForecast: GrupoForecast,
                                    TipoForecast: TipoForecast,
                                    Certificado: Certificado,
                                    FechaVisita: FechaVisita,
                                    listaMatJson: listaMatJson,
                                    listaDsctoJson: listaDsctoJson,
                                    listaRepJson: listaRepJson,
                                    listaIntJson: listaIntJson,
                                    listaPedJson: listaPedJson,
                                    listadatosCliente: listadatosCliente,
                                    UserId: UserId,
                                    PwdId: PwdId,
                                    Id: Id,
                                    GrpVend: GrpVend,
                                    Descripcion: Descripcion,
                                    CodigoVendedor: CodigoVendedor,
                                    numPedido: numPedido,
                                    op: op
                                    };
            var resultado = utilService.exec(contexto);
            return resultado;
        }
        //FIN EDELACRUZ
    };
});