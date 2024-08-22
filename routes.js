
    //permitindo uso de rotas
    import express from 'express'
    import { sqlConfig } from "./routes/config.js"
    import sql from 'mssql';
    
    //conexão com MySql (banco)
    const pool = new sql.ConnectionPool(sqlConfig)
    await pool.connect();
    const routes = express.Router();

    //conversor de string para txt
    import exportar from "./functions/fdp.js";
    
    //ROTAS DO PROFESSOR ----------------------------

    routes.get('/modelos', async (req,res)=>{//exibir os modelos já existentes

        try{
            const { recordset }  = await pool.query`select * from Modelo_redacao `
            return res.status(200).json(recordset)
        }

        catch{
            return res.status(501).json('erro')
        }

    })

    routes.post('/novomodelo', async (req,res)=>{//criar um modelo de redação novo

        try{
            const {  imagem, titulo, corpo_redacao} = req.body;
            
            await pool.query`INSERT INTO Modelo_redacao (imagem, titulo, corpo_redacao)
             VALUES (${imagem}, ${titulo}, ${corpo_redacao})`;

            return res.status(201).json(`ok, foi`)
        }
        catch(error){
            return res.status(501).json('erro ao inserir redação...')
        }

    })

    routes.put('/editar/:id', async (req, res)=>{//editar modelos já existentes
        try {

            const { id } = req.params;
            const { imagem, titulo, corpo_redacao } = req.body

            await pool.query`UPDATE Modelo_redacao SET imagem = ${imagem}, titulo = ${titulo}, corpo_redacao = ${corpo_redacao} WHERE id = ${id}`;
            return res.status(201).json('atualizado')
        } 
        
        catch (error) {
            console.log(error)
            return res.status(501).json('erro ao atualizar produto...')
        }
    })

    //ROTAS DO ALUNO ----------------------------

    routes.post('/exportar', async (req,res)=>{

        try{
            const { filename, redacao } = req.body;
            const { recordset }  =  exportar(redacao, filename);// código que exporta a redação para txt
            return res.status(200).json(recordset)
        }

        catch{
            return res.status(501).json('erro')
        }

    })
       
    //exportar para o app
    export default routes

