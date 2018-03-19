module.exports = (robot) => {
  // Your code here
  robot.log('Yay, the app was loaded!')

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/

  robot.on('created', async context => {
    const config = await context.config('your-config.yml', { tv: 'paw patrol' })
    const params = context.issue({body: `You are configured to watch some ${config.tv}`})
    return context.github.issues.create(params)
  })
}
