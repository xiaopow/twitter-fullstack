json.tweet do
  json.username @tweet.user.username
  json.message  @tweet.message
  json.image    @tweet.image
end
