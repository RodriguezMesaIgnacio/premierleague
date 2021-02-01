"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datoRoutes = void 0;
const express_1 = require("express");
const dato_1 = require("../model/dato");
const database_1 = require("../database/database");
class DatoRoutes {
    constructor() {
        this.getFijo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            let idv = "Spain";
            if (id == "GREECE" || id == "greece" || id == "Greece") {
                idv = "Greece";
            }
            else if (id == "BULGARIA" || id == "bulgaria" || id == "Bulgaria") {
                idv = "Bulgaria";
            }
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield dato_1.DatosDispositivosFijos.findOne({ ID: idv }).sort({ date: -1 });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this.getPortables = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield dato_1.DatosDispositivosPortables.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/fijo/:id', this.getFijo),
            this._router.get('/portable', this.getPortables);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.datoRoutes = obj.router;
