import { Schema, model } from 'mongoose'

const TeamSchema = new Schema({
    _id: String,
    _name: String,
    _nombre: String,
    _ganados: Number,
    _empatados: Number,
    _perdidos: Number,
    _fundacion: Date,
    _titulos: Number,
    _temporadasPremier: Number,
},{
    collection:'teams'
})


const PlayerSchema = new Schema({
    _id: String,
    _nombre: String,
    _equipo: String,
    _partidosJugados: Number,
    _minutosJugados: Number,
    _goles: Number,
    _asistencias: Number,
    _tarjetasAmarillas: Number,
    _tarjetasRojas: Number,
    _debut: Date,
},{
    collection:'players'
})



export const Teams = model('teams', TeamSchema  )
export const Players = model('players', PlayerSchema  )
