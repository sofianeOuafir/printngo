class AddPartnerApplicationToPartners < ActiveRecord::Migration[6.0]
  def change
    add_reference :partners, :partner_application, foreign_key: true
  end
end
