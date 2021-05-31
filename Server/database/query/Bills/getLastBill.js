const connection =require('../../connection')

module.exports =  (type, id ) => {
    const sql = {
        text: `SELECT gid, provider_id , type
         , total_amount , bill_DATE  , due_DATE , start_DATE  , end_DATE , bill_Number 
          FROM bill 
          WHERE type=$1 AND users_id=$2 `
        ,values : [type, id]
    }; 
    
    return connection.query(sql.text,sql.values);
}