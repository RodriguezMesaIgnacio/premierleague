import {Request, Response, Router } from 'express'
import { Teams, Players } from '../model/schemas'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getTeams = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Teams.aggregate([
                {
                    $lookup: {
                        from: 'players',
                        localField: '_nombre',
                        foreignField: '_equipo',
                        as: "_jugadores"
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

    private getTeam = async (req:Request, res: Response) => {
        const { name } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Teams.aggregate([
                {
                    $lookup: {
                        from: 'players',
                        localField: '_nombre',
                        foreignField: '_equipo',
                        as: "_jugadores"
                    }
                },{
                    $match: {
                        _name:name
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

    private postTeam = async (req: Request, res: Response) => {
        const { name, nombre, ganados, empatados, perdidos , fundacion, titulos, temporadasPremier } = req.body
        await db.conectarBD()
        const dSchema={
            _name : name,
            _nombre : nombre,
            _ganados : ganados,
            _empatados : empatados,
            _perdidos : perdidos,
            _fundacion : fundacion,
            _titulos : titulos,
            _temporadasPremier : temporadasPremier
        }
        const oSchema = new Teams(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    
   

    misRutas(){
        this._router.get('/teams', this.getTeams),
        this._router.get('/team/:name', this.getTeam),
        this._router.post('/', this.postTeam)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router
