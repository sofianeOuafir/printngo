class Document < ApplicationRecord
  visitable :ahoy_visit

  belongs_to :user, optional: true
end
