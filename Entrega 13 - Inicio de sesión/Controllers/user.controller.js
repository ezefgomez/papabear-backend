export default class userClass {
    async registerGet(req, res) {
        res.render('register');
        }
    
        async loginGet(req, res) {
        res.render('login');
        }
    
        async mainGet(req, res) {
        res.render('main');
        }
    
        async logout(req, res) {
        req.logout();
        res.redirect('/user/login');
        }
}