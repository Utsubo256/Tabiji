Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post '/signup', to: 'users#create'
      resources :users, only: %i[show]
    end
  end
end
