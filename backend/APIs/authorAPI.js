const exp=require('express');

module.exports = (authorsCollection)=>{
    const authorAPI = exp.Router();

    authorAPI.get('/authors', async (req, res, next) => {
        try{
            if(!authorsCollection){
                throw new Error('Database not initialized');
            }
            const authorslist = await authorsCollection.find().toArray();
            if (authorslist.length==0){
                return res.status(404).json({message : 'No authors found'});
            }
            res.status(200).json({
                message: 'Authors retrieved successfully',
                payload: authorslist
            });
        } catch(err){
            next(err);
        }
    })

    return authorAPI;
};