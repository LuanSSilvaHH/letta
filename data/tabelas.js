import mysql from "./mysql.js"
import {DataTypes} from "sequelize"

const Ator = mysql.define('Ator',{
    nome: DataTypes.STRING, 
    pais: DataTypes.STRING
});

const Diretor = mysql.define ('Diretor',{
    nome: DataTypes.STRING,
    nascimento: DataTypes.DATEONLY 
});

const Filme = mysql.define ('Filme', {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    ano: DataTypes.SMALLINT
});

Filme.belongsTo(Diretor)
Diretor.hasMany(Filme)


Filme.belongsToMany(Ator,{through: 'FilmeAtor'})
Ator.belongsToMany(Filme,{through: 'FilmeAtor'})

mysql.sync()

export {Ator, Diretor, Filme, mysql}