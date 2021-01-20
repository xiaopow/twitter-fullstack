Rails.application.routes.draw do
  root 'static_pages#index'
  get '*path/', to: 'static_pages#index'
  get '/feed'                     => 'static_pages#feed'
  get '/feed/*uri'                 => 'static_pages#feed'

  namespace :api do
    # USERS
    post '/users'                  => 'users#create'
  
    # SESSIONS
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'  

      # TWEETS
    post '/tweets'                 => 'tweets#create'
    get  '/tweets'                 => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'
    get  '/users/:username/tweets' => 'tweets#index_by_user'
    get  '/tweets/search/:keyword' => 'tweets#search'
  end
end  
#  root 'homepage#index'
#  get '/feeds'                    => 'feeds#index'
#
#  # USERS
#  post '/users'                  => 'users#create'
#
#  # SESSIONS
#  post '/sessions'               => 'sessions#create'
#  get  '/authenticated'          => 'sessions#authenticated'
#  delete '/sessions'             => 'sessions#destroy'
#
#  # TWEETS
#  post '/tweets'                 => 'tweets#create'
#  get  '/tweets'                 => 'tweets#index'
#  delete '/tweets/:id'           => 'tweets#destroy'
#  get  '/users/:username/tweets' => 'tweets#index_by_user'
#  get  '/tweets/search/:keyword' => 'tweets#search'

  # Redirect all other paths to index page, which will be taken over by AngularJS
  # get '*path'    => 'homepage#index'

