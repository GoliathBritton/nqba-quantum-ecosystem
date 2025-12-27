import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  constructor({ store, tenantService, jwtSecret }) {
    this.store = store;
    this.tenantService = tenantService;
    this.jwtSecret = jwtSecret;
  }

  async register({ email, password, tenantName }) {
    if (!email || !password) throw new Error('email and password required');
    if (password.length < 8) throw new Error('password must be at least 8 characters');

    const existing = this.store.getUserByEmail(email);
    if (existing) throw new Error('email already registered');

    const userId = uuidv4();
    const passwordHash = await bcrypt.hash(password, 12);

    // Create tenant first
    const tenant = await this.tenantService.createTenant({ name: tenantName, ownerUserId: userId });

    const user = {
      id: userId,
      email: email.toLowerCase(),
      passwordHash,
      tenantId: tenant.id,
      role: 'owner',
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    await this.store.transact(data => {
      data.users[userId] = user;
    });

    const token = this.issueToken(user);
    return { user: this.safeUser(user), tenant, token };
  }

  async login({ email, password }) {
    if (!email || !password) throw new Error('email and password required');
    const user = this.store.getUserByEmail(email);
    if (!user) throw new Error('invalid credentials');
    if (user.status !== 'active') throw new Error('user disabled');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error('invalid credentials');

    const tenant = this.store.getTenant(user.tenantId);
    const token = this.issueToken(user);
    return { user: this.safeUser(user), tenant, token };
  }

  issueToken(user) {
    return jwt.sign(
      { sub: user.id, tenantId: user.tenantId, role: user.role },
      this.jwtSecret,
      { expiresIn: '12h' },
    );
  }

  verifyToken(token) {
    return jwt.verify(token, this.jwtSecret);
  }

  safeUser(user) {
    const { passwordHash: _passwordHash, ...rest } = user;
    return rest;
  }
}

export default AuthService;
