# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :users, only: [:create]
      namespace :users do
        resources :print_orders, only: %i[index show]
        resources :sessions, only: %i[create destroy show]
      end
      namespace :partners do
        resources :sessions, only: %i[create destroy show]
        resources :print_orders, only: %i[show update index]
        resources :deliverables, only: [:show]
        resources :printing_attempts, only: [:create]
      end
      resources :print_order_items, only: %i[create update destroy]
      resources :print_products, only: [:index]
      resources :top_up_products, only: [:index]
      resources :partners, only: [:index]
      resources :documents, only: %i[show index]
      resources :print_orders
      namespace :print_orders do
        resources :documents, only: [:create]
        resources :payments, only: [:create]
      end
      namespace :top_up_orders do
        resources :stripe_payments, only: [:create]
      end
      resources :invoices, only: [:show]
    end
  end

  get '*page', to: 'static#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }

  root 'static#index'
end
