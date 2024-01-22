module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.isadmin == 1){
            return next();
        }
        req.flash("error_msg", "Acesso negado. Apenas ADMIN!");
        res.redirect("/");
    }
}