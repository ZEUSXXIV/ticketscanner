export function passwordValidator(monument,password) {
  console.log("pass", monument._id.substr(monument._id.length - 5))
    if (!password) return "Password can't be empty."
    if (password.length < 5) return 'Password must be at least 5 characters long.'
    if (monument._id.substr(monument._id.length - 5) != password) return "Incorrect password"
    return ''
  }