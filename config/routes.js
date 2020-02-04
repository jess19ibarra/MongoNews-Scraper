module.exports = function(router) {
  // route renders home
  router.get("/", function(req, res) {
    res.render("home");
  });

  // route renders saved
  router.get("/saved", function(req, res) {
    res.render("saved");
  });
};
