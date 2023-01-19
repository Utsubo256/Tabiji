Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      post '/signup', to: 'users#create'
      resources :users, only: %i[show]
      resources :auth_token, only: %i[create] do
        post :refresh, on: :collection
        delete :destroy, on: :collection
      end
    end
  end
end
