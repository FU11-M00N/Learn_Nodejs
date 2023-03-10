const passport = require('passport');
const { Strategy: KakaoStrategy } = require('passport-kakao');
const User = require('../models/user');

module.exports = () => {
   passport.use(
      new KakaoStrategy(
         {
            clientID: process.env.KAKAO_ID,
            callbackURL: '/auth/kakao/callback',
         },
         async (accessToken, refreshToken, profile, done) => {
            console.log('profile', profile);
            try {
               const ExUser = await User.findOne({
                  where: { snsId: profile.id, provider: 'kakao' },
               });
               if (ExUser) {
                  done(null, ExUser);
               } else {
                  const newUser = await User.create({
                     email: profile._json?.kakao_account?.email,
                     nick: profile.displayName,
                     snsId: profile._id,
                     provider: 'kakao',
                  });
               }
            } catch {
               console.error(error);
               done(error);
            }
         },
      ),
   );
};
