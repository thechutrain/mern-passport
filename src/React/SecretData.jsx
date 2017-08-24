import React from 'react'
import userOnly from './components/userOnlyHOC'

const SecretData = (props) => {
  return (
    <div id="secretData">
      <h1>This should only display if a user is signed in</h1>
    </div>
  )
}

// export default SecretData
export default userOnly(SecretData)