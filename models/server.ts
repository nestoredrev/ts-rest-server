import express, { Application } from 'express';
import cors from "cors";
import userRoutes from "../routes/usuario";
import db from '../db/connection';
// import * as categoriaRoutes from "../routes/categorias";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Metodos iniciales
        this.middlewares();

        // Definir mis rutas
        this.routers();

        // Conectar base de datos
        this.dbConnection();
    }

    

    async dbConnection () {
        try {

            await db.authenticate();
            console.log(`La base de datos ${db.getDatabaseName()} esta online`);
            
        } catch (error) {
            throw new Error( error );
        }
    }

    routers() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    middlewares() {
        // Configuraciones de peticiones crossdomain cors
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta publica
        this.app.use( express.static('public') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        })
    }
}

export default Server;