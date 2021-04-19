import { Request, Response } from "express";
import Usuario from '../models/usuario';

export const getUsuarios = async ( req: Request, res: Response ) => {
    
    const usuarios = await Usuario.findAll({
        where: {
            estado: true
        }
    });
    
    if( usuarios ) {
        res.json({usuarios});
    } else {
        res.status(404).json({
            msg: `No hay usuarios existentes`
        });
    }
}


export const getUsuario = async ( req: Request, res: Response ) => {
    
    const { id } = req.params; 
    const usuario = await Usuario.findByPk( id );

    if( usuario ) {
        res.json({usuario});
    } else {
        res.status(404).json({
            msg: `No existe el usuario con el id ${ id }`
        });
    }

}


export const postUsuario = async ( req: Request, res: Response ) => {
    
    const { body } = req; 

    try {

       const existeEmail = await Usuario.findOne({
           where: {
               email: body.email
           }
       });
       

       if(existeEmail) {
           return res.status(400).json({
               msg: `El email ${body.email} ya existe`
           });
       }


        const usuario = await Usuario.create(body);
        if( usuario ) {
           res.status(200).json({
            msg: `El usuario ${ body.nombre } se ha creado correctamente`
           });
        } else {
            res.status(500).json({
                msg: 'Error en la insercion'
            });   
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}


export const putUsuario = async ( req: Request, res: Response ) => {
    
    const { id } = req.params; 
    const { body } = req; 

    try {

        const usuario = await Usuario.findByPk( id );
        if( !usuario ) {
            return res.status(404).json({
                msg: `No existe el usuario con el id ${ id }`
            });
        }
    
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
    
        if(existeEmail) {
            return res.status(400).json({
                msg: `El email ${body.email} ya existe`
            });
        }

        const nameBeforeUpdate = usuario.getDataValue('nombre');
        await usuario.update( body );

        res.status(200).json({
            msg: `El usuario ${ nameBeforeUpdate } se ha actualizado correctamente`,
            usuarioActualizado: usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}


export const deleteUsuario = async ( req: Request, res: Response ) => {
    
    const { id } = req.params; 
    
    try {

        const usuario = await Usuario.findByPk( id );

        if( !usuario ) {
            return res.status(404).json({
                msg: `No existe el usuario con el id ${ id }`
            });
        }

        // eliminacion logica
        await usuario.update({estado: false});

        // eliminacion fisica
        // await usuario.destroy();

        res.status(200).json({
            msg: `El usuario ${ usuario.getDataValue('nombre') } se ha borrado correctamente`
        });
        
    } catch (error) {
        res.status(500).json({
            msg: `Hable con el administrador`
        });
    }
}
