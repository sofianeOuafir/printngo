Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :users, only: [:create] do
        resources :orders, only: [:index], controller: 'users/orders'
      end
      resources :sessions, only: [:create, :destroy, :show]
      resources :order_items, only: [:create, :update, :destroy]
      resources :documents, only: [:create, :update, :destroy]
      resources :products, only: [:index]
      resources :partners, only: [:index]
      resources :documents, only: [:show]
      resources :payments, only: [:create]
      resources :orders do
        resources :documents, only: [:create, :update, :destroy], controller: 'orders/documents'
      end
    end
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root 'static#index'
end
