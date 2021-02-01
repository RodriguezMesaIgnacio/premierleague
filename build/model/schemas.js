"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Players = exports.Teams = void 0;
const mongoose_1 = require("mongoose");
const TeamSchema = new mongoose_1.Schema({
    _name: String,
    _nombre: String,
    _ganados: Number,
    _empatados: Number,
    _perdidos: Number,
    _fundacion: Date,
    _titulos: Number,
    _temporadasPremier: Number,
}, {
    collection: 'teams'
});
const PlayerSchema = new mongoose_1.Schema({
    _nombre: String,
    _equipo: String,
    _partidosJugados: Number,
    _minutosJugados: Number,
    _goles: Number,
    _asistencias: Number,
    _tarjetasAmarillas: Number,
    _tarjetasRojas: Number,
    _debut: Date,
}, {
    collection: 'players'
});
exports.Teams = mongoose_1.model('teams', TeamSchema);
exports.Players = mongoose_1.model('players', PlayerSchema);
