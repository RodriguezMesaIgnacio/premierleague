import {Request, Response, Router } from 'express'
import { Equipos, Jugadores } from '../model/schemas'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getEquipos = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Equipos.aggregate([
                {
                    $lookup: {
                        from: 'jugadores',
                        localField: 'nombre',
                        foreignField: 'equipo',
                        as: "jugadores"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private getEquipo = async (req:Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Equipos.aggregate([
                {
                    $lookup: {
                        from: 'jugadores',
                        localField: 'nombre',
                        foreignField: 'equipo',
                        as: "jugadores"
                    }
                },{
                    $match: {
                        id:id
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

    private postEquipo = async (req: Request, res: Response) => {
        const { id, nombre, ganados, empatados, perdidos } = req.body
        await db.conectarBD()
        const dSchema={
            id: id,
            nombre: nombre,
            ganados: ganados,
            empatados: empatados,
            perdidos: perdidos
        }
        const oSchema = new Equipos(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    
    private postJugador = async (req: Request, res: Response) => {
        const { dorsal, nombre, equipo, partidosJugados, minutosJugados, golesEncajados, goles,
                asistencias, tarjetasAmarillas, tarjetasRojas } = req.body
        await db.conectarBD()
        const dSchema={
            dorsal: dorsal,
            nombre: nombre,
            equipo: equipo,
            partidosJugados: partidosJugados,
            minutosJugados: minutosJugados,
            golesEncajados: golesEncajados,
            goles: goles,
            asistencias: asistencias,
            tarjetasAmarillas: tarjetasAmarillas,
            tarjetasRojas: tarjetasRojas
        }
        const oSchema = new Jugadores(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    

    private getJugador = async (req:Request, res: Response) => {
        const {  dorsal } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const j = await Jugadores.findOne({
                dorsal: dorsal,
                // equipo: equipo
            })
            res.json(j)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }
   

    misRutas(){
        this._router.get('/equipos', this.getEquipos),
        this._router.get('/equipo/:id', this.getEquipo),
        this._router.post('/', this.postEquipo),
        this._router.post('/jugador', this.postJugador),
        this._router.get('/jugador/:dorsal&:equipo', this.getJugador)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router













