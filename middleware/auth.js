exports.requireStudentLogin = (req, res, next) => {
  if (!req.session.studentId) return res.redirect('/auth/login');
  next();
};

exports.requireAdminLogin = (req, res, next) => {
  if (!req.session.adminId) return res.redirect('/auth/login');
  next();
};