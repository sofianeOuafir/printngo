class AddAttributesToPartnerApplications < ActiveRecord::Migration[6.0]
  def change
    add_column :partner_applications, :city, :string
    add_column :partner_applications, :country, :string
    add_column :partner_applications, :lat, :string
    add_column :partner_applications, :lng, :string
    add_column :partner_applications, :opening_hours, :string
  end
end
