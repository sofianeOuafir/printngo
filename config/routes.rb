Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :users, only: [:create]
      namespace :users do
        resources :orders, only: [:index, :show]
        resources :sessions, only: [:create, :destroy, :show]
      end
      namespace :partners do
        resources :sessions, only: [:create, :destroy, :show]
        resources :orders, only: [:show, :update, :index]
        resources :deliverables, only: [:show]
        resources :printing_attempts, only: [:create]
      end
      resources :order_items, only: [:create, :update, :destroy]
      resources :products, only: [:index]
      resources :partners, only: [:index]
      resources :documents, only: %i[show index]
      resources :print_orders
      namespace :print_orders do
        resources :documents, only: [:create]
      end
      resources :invoices, only: [:show]
    end
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root 'static#index'
end
