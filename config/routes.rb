Rails.application.routes.draw do
  root 'homepage#index'
  get 'user' => 'user#index'

  # USERS
  resources :users

  # SESSIONS
  resources :sessions

  # TWEETS
  resources :tweets

  get 'authenticated' => 'sessions#authenticated'

  # Redirect all other paths to index page, which will be taken over by AngularJS
  get '*path'    => 'homepage#index'
end
