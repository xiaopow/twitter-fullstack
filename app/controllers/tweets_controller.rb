class TweetsController < ApplicationController
  def index
    @tweets = Tweet.all
    render 'tweets/index'
  end

  def create
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)
    user = session.user

    @tweet = user.tweets.new(tweet_params)

    if @tweet.save
      render 'tweets/create'
    end
  end

  private

    def tweet_params
      params.require(:tweet).permit(:message)
    end
end
