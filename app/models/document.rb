class Document < ApplicationRecord
  visitable :ahoy_visit

  has_one_attached :file
  belongs_to :user, optional: true

  after_create :update_name

  private

  def update_name
    return unless file.attached?
    update_columns(name: file.blob.filename.to_s)
  end
end
