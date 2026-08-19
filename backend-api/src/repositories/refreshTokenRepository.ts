import prisma from '../database/prisma';

export class RefreshTokenRepository {
  async create(userId: string, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: { userId, token, expiresAt },
    });
  }

  async findByToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async revoke(token: string) {
    return prisma.refreshToken.update({
      where: { token },
      data: { revoked: true },
    });
  }
}
