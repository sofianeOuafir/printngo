class AddArchivedToPartnerApplications < ActiveRecord::Migration[6.0]
  def change
    add_column :partner_applications, :archived, :boolean, default: false
  end
end
