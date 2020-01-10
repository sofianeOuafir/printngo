# frozen_string_literal: true

class Api::V1::Partners::GuideController < ApplicationController
  before_action :authenticate_partner!

  def show
    s3 = Aws::S3::Client.new
    signer = Aws::S3::Presigner.new(client: s3)
    url = signer.presigned_url(
      :get_object,
      bucket: ENV['S3_BUCKET_NAME'],
      key: I18n.translate('s3.guide')
    )
    render json: url
  end
end
