# frozen_string_literal: true

class Promotion < ApplicationRecord
  belongs_to :partner

  before_validation :strip_link
  before_save :capitalize_text
  validates_length_of :text, maximum: 100
  validates :link, url: { allow_blank: true }

  private

  def strip_link
    self.link = link&.strip
  end

  def capitalize_text
    self.text = text&.capitalize
  end
end
