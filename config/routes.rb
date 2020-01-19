# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'

  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :users, only: [:create]
      namespace :admins do
        resources :sessions, only: %i[create destroy show]
        resources :partner_applications
        resources :partners
      end
      namespace :users do
        resources :print_orders, only: %i[index show]
        resources :top_up_orders, only: %i[index show]
        resources :sessions, only: %i[create destroy show]
        resources :transactions, only: :index
      end
      namespace :partners do
        resources :activations
        resources :sessions, only: %i[create destroy show]
        resources :print_orders, only: %i[show update index]
        resources :deliverables, only: [:show]
        resources :printing_attempts, only: [:create]
        resources :promotions, only: [:update]
        resources :partner_products, only: [:index, :update]
        get 'guide', to: 'guide#show'
        get 'testing', to: 'testing#show'
      end
      resources :print_order_items, only: %i[create update destroy]
      resources :print_products, only: [:index]
      resources :top_up_products, only: %i[index show]
      resources :partners, only: [:index]
      resources :documents, only: %i[show index]
      resources :print_orders
      resources :partner_applications, only: :create
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
