const User = require('../models/user');

exports.follow = async (req, res, next) => {
   //req.user.id, req.params.id
   try {
      const user = await User.findOne({ where: { id: req.user.id } });

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

exports.update_nick = async (req, res, next) => {
   try {
      const user = await User.findOne({ where: { id: req.user.id } });
      if (user) {
         User.update(
            {
               nick: req.body.nick,
            },
            {
               where: { id: req.user.id },
            },
         );
         res.send('success');
      } else {
         res.status(404).send('User not found');
      }
   } catch (error) {
      console.error(error);
      next(error);
   }
};
