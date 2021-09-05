export function setUser (state, data) {
  //console.log(data)
  if (data) {
    state.user = data

    if (data.role == 1){
      state.user.rolename = 'admin'
    }
    if (data.role == 6){
      state.user.rolename = 'csstaff'
    }
    if (data.role == 7){
      state.user.rolename = 'csmanager'
    }
    if (data.role == 8){
      state.user.rolename = 'csapproval'
    }
  } else {
    state.user = null
  }
}

export function setError (state, data) {
  if (data) {
    state.error = data
  } else {
    state.error = null
  }
}
