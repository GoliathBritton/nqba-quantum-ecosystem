export function authRequired(platform) {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || '';
      const [, token] = header.split(' ');
      if (!token) return res.status(401).json({ error: 'missing bearer token' });

      const payload = platform.auth.verifyToken(token);
      const user = platform.store.getUser(payload.sub);
      if (!user) return res.status(401).json({ error: 'invalid token user' });
      const tenant = platform.store.getTenant(user.tenantId);
      if (!tenant) return res.status(401).json({ error: 'invalid token tenant' });

      req.user = platform.auth.safeUser(user);
      req.tenant = tenant;
      next();
    } catch (e) {
      res.status(401).json({ error: 'unauthorized', details: e.message });
    }
  };
}
