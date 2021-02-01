"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatosDispositivosPortables = exports.DatosDispositivosFijos = void 0;
const mongoose_1 = require("mongoose");
const DatosDispositivosFijosSchema = new mongoose_1.Schema({
    _id: String,
    _co2: Number,
    _no: Number,
    _nh3: Number,
    _co: Number,
    _pm10: Number,
    _pm25: Number,
    _date: Date
}, {
    collection: 'DatosDispositivosFijos'
});
const CoordenadasSchema = new mongoose_1.Schema({
    _latitud: Number,
    _longitud: Number,
});
const DatosDispositivosPortablesSchema = new mongoose_1.Schema({
    _id: String,
    _co2: Number,
    _no: Number,
    _nh3: Number,
    _coordenadas: CoordenadasSchema,
    _date: Date
}, {
    collection: 'DatosDispositivosPortables'
});
exports.DatosDispositivosFijos = mongoose_1.model('DatosDispositivosFijos', DatosDispositivosFijosSchema);
exports.DatosDispositivosPortables = mongoose_1.model('DatosDispositivosPortables', DatosDispositivosPortablesSchema);
