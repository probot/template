const bot = require('..')

const { createRobot } = require('probot')

describe('your-bot', () => {
  let robot
  let github

  beforeEach(() => {
    robot = createRobot()
    bot(robot)

    github = {
      issues: {
        create: jest.fn(() => Promise.resolve())
      },
      repos: {
        createStatus: jest.fn(() => Promise.resolve()),
        getContent: jest.fn(() => Promise.resolve({data: {content: Buffer.from('tv: law and order').toString('base64')}}))
      }
    }

    robot.auth = () => Promise.resolve(github)
  })

  it('creates a new issue upon installation', async () => {
    // Simulates delivery of a payload
    await robot.receive({
      event: 'created', // top level action will match robot.on('created')
      payload: {
        action: 'install', // sub action like robot.on('created.install')
        repository: {
          owner: {
            login: 'clarkbw'
          }
        },
        installation: {
          id: 64798
        }
      }
    })
    // This test would pass if in your main code you called `context.github.issues.createComment`
    expect(github.issues.create).toHaveBeenCalled()
  })
})

// For more information about testing with Jest see:
// https://facebook.github.io/jest/
