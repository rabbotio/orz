module.exports = {
  // Authenticate
  getAccessToken: () => {
    const now = new Date()
    return {
      user: {},
      accessTokenExpiresAt: new Date(now.setDate(now.getDate() + 1))
    }
  }
}
