const exp = require('express');

module.exports = (usersCollection) => {
    const userAPI = exp.Router();

    userAPI.get('/users', async (req, res, next) => {
        try {
            if (!usersCollection) {
                throw new Error('Database not initialized');
            }
            const userslist = await usersCollection.find().toArray();
            if (userslist.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }
            res.status(200).json({
                message: 'Users retrieved successfully',
                payload: userslist
            });
        } catch (err) {
            next(err);
        }
    });

    return userAPI;
};
