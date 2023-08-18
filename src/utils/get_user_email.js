async function getEmail(client, userId){
  const response = await client.users.info({
    user: userId
  });
  const email = response.user.profile.email;

  return email
}

module.exports = {
  getEmail
}