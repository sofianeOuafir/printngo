Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :users, only: [:create]
      resources :sessions, only: [:create, :destroy]
      resources :order_items, only: [:create, :update, :destroy]
      resources :documents, only: [:create, :update, :destroy]
      resources :products, only: [:index]
      resources :partners, only: [:index]
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
