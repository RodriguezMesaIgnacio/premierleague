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
    
   

    misRutas(){
        this._router.get('/teams', this.getTeams),
        this._router.get('/team/:name', this.getTeam)
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router
