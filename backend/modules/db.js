const knex = require('knex');
const pws = require('p4ssw0rd');
const { response } = require('express');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'panda007',
    database : 'weather'
  }
});

const createUser = ({ username,email, password }) => {
  return db('users')
    .returning('*')
    .insert({username: username,
             email: email.toLowerCase(),
             password: pws.hash(password,10),
             createdat: new Date(),
             updatedat: new Date()});
}

const findUser = (email) => {
  return db.select('*')
    .from('users')
    .where({email})
}

const sFavorites = (user, key) => {
  return db('favorites')
  .returning('*')
  .insert({users_id:user, city_key:key})
}

const delFavorite = (key, user) => {
  return db('favorites')
  .where({'city_key':key})
  .andWhere({'users_id':user})
  .del()
}

const getAllCities = (user) => {
  return db.select('*')
  .from('favorites')
  .where({'favorites.users_id':user})
}

//not being used
const getAllfavorCities = (user) => {
  return db.select('*')
  .from('users')
  .fullOuterJoin('favorites', 'users.id', 'favorites.users_id' )
  .select('favorites.users_id', 'users.id','favorites.city_key', 'users.username')
  .where({'favorites.users_id':user})
}


module.exports = {
  findUser,
  createUser,
  getAllCities,
  getAllfavorCities,
  sFavorites,
  delFavorite
};
