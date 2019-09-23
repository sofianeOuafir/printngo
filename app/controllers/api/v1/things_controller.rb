class Api::V1::ThingsController < ApplicationController
  def index
    render json: {
      things: [
        {
          name: 'something',
          guid: 'blablabla'
        }
      ]
    }.to_json
  end
end