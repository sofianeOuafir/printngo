class RemovePartnerFromPartnerApplications < ActiveRecord::Migration[6.0]
  def change
    remove_reference :partner_applications, :partner, null: false, foreign_key: true
  end
end
