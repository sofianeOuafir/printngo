require 'sidekiq'
require 'sidekiq/web'

if Rails.env.development?
  Sidekiq.configure_server do |config|
    config.redis = { url: 'redis://localhost:6379' }
  end
end

if Rails.env.production?
  Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
    [user, password] == [ENV['SIDEKIQ_UI_USER'], ENV['SIDEKIQ_UI_PASSWORD']]
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: ENV['REDISCLOUD_URL'] }
  end

  Sidekiq.configure_server do |config|
    config.redis = { url: ENV['REDISCLOUD_URL'] }
  end
end
