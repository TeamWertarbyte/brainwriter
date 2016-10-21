Meteor.startup(() => {
  const date = new Date(Date.now())
  console.log(`Server start:  ${date}`)

  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        clientId: '34707bab745485368bea',
        loginStyle: 'popup',
        secret: '7372d76eeaaae50f7c5eab072b73bc7860665c25'
      }
    }
  )
})
