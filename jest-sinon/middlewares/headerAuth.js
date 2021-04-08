
function isApiKey(apiKey){
  if(apiKey === `76b1e728-1c14-43f9-aa06-6de5cbc064c2`) {
    return true
  }else{
    return false
  }
}

const apiKeyToUser = {
  "76b1e728-1c14-43f9-aa06-6de5cbc064c2": "hugo"
}

function headerAuthMiddleware(req, res, next) {
  if (req.session.data) {
    return next()
  }
  const authenticationHeader = req.get('authorization')
  if(!authenticationHeader) {
    return next()
  }
  const apiKey = authenticationHeader
    .replace('Bearer', '')
    .trim();
  if (!isApiKey(apiKey)) {
    return next()
  }
  req.session.data = { username: apiKeyToUser[apiKey] };
  next();
}

module.exports = {
  headerAuthMiddleware
}