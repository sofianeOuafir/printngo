class Document < ApplicationRecord
  visitable :ahoy_visit
  # after_create_commit must come before has_one_attached :file
  after_create_commit :set_number_of_page
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

  def set_number_of_page
    o = open(file.service_url)
    reader = PDF::Reader.new(o)
    update_columns(number_of_page: reader.page_count)
  end

  def update_name
    return unless file.attached?
    update_columns(name: file.blob.filename.to_s)
  end
end
