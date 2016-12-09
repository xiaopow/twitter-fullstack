Rails.application.routes.draw do
  root 'homepage#index'
  get 'user' => 'user#index'

  namespace :api do
    namespace :v1 do
      # USERS

      # SESSIONS

      # TWEETS

    end
  end

  # Redirect all other paths to index page, which will be taken over by AngularJS
  get '*path'    => 'homepage#index'
end
