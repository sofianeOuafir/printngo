class Document < ApplicationRecord
  visitable :ahoy_visit

  has_one_attached :file
  belongs_to :user, optional: true

  after_create :update_name
  after_commit :update_number_of_page

  private

  def update_number_of_page
    o = open("https://printngo-dev.s3.ca-central-1.amazonaws.com/#{file.key}")
    reader = PDF::Reader.new(o)
    update_columns(number_of_page: reader.page_count)
  end

  def update_name
    return unless file.attached?
    update_columns(name: file.blob.filename.to_s)
  end
end
