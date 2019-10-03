class Document < ApplicationRecord
  visitable :ahoy_visit

  has_one_attached :file
  belongs_to :user, optional: true

  after_create :update_name

  def url
    file.service_url
  end

  def as_json(options = {})
    h = super(options)
    h[:url] = url
    h
  end

  def serializable_hash(options = {})
    h = super(options)
    h[:url] = url
    h
  end

  private

  def update_name
    return unless file.attached?
    update_columns(name: file.blob.filename.to_s)
  end
end
