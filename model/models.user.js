const db = require('../utils/db');
const bcrypt = require('bcrypt');


getUser = async (username, password)=>{
    /*
    On login we require: first name, second name age, gender,
    no_of_bills, city, nationality, city, area, store_name, 
    store_type, pos_id
    age:  substr(utc_timestamp(),1,11)-substr(dob,1, 11)
    */
   const user = await db.executeQuery(
    'select ? as username, password, first_name, second_name, substr(utc_timestamp(), 1, 11)-substr(dob,1, 11) AS age, gender, total_items_billed, nationality, city_id, city_name, area_id, area_name, store.store_id, store.store_name, store.store_type, pos_id from pos NATURAL JOIN operator inner join store natural join city natural join area where store.store_id = pos.store_id AND username = ?',
    [username, username]
    )
    console.log(user)
    if(user == null || user.length == 0) return user;


    var verified = await bcrypt.compare(password, user[0].password);

    if(verified) return user;

    return null;
}



// getUser('operator6', 'password');

module.exports = {
    getUser
}