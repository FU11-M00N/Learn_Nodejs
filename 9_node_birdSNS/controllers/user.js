const User = require('../models/user');

exports.follow = async (req, res, next) => {
   //req.user.id, req.params.id
   try {
      const user = await User.findOne({ where: { id: req.user.id } });
      console.log('여기까지오냐양야야앙아아앙');
      if (user) {
         await user.addFollowing(parseInt(req.params.id, 10));
         res.send('success');
      } else {
         res.status(404).send('User not found');
      }
   } catch (error) {
      console.error(error);
      next(error);
   }
};

exports.unfollow = async (req, res, next) => {
   //req.user.id, req.params.id
   try {
      const user = await User.findOne({ where: { id: req.user.id } });
      console.log('여기까지옴?asdadssa');
      if (user) {
         await user.removeFollowing(parseInt(req.params.id, 10));
         res.send('success');
      } else {
         res.status(404).send('User not found');
      }
   } catch (error) {
      console.error(error);
      next(error);
   }
};
