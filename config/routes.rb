Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :users, only: [:create]
      namespace :users do
        resources :print_orders, only: [:index, :show]
        resources :sessions, only: [:create, :destroy, :show]
      end
      namespace :partners do
        resources :sessions, only: [:create, :destroy, :show]
        resources :print_orders, only: [:show, :update, :index]
        resources :deliverables, only: [:show]
        resources :printing_attempts, only: [:create]
      end
      resources :print_order_items, only: [:create, :update, :destroy]
      resources :print_products, only: [:index]
      resources :top_up_products, only: [:index]
      resources :partners, only: [:index]
      resources :documents, only: [:show, :index]
      resources :payments, only: [:create]
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
