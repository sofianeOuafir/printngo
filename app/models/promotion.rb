# frozen_string_literal: true

class Promotion < ApplicationRecord
  belongs_to :partner

  before_validation :strip_link
  validates_length_of :text, maximum: 100
  validates :link, url: { allow_blank: true }

  private

  def strip_link
    self.link = link.strip
  end
end
