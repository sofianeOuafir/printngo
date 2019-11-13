class CreatePartnerApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :partner_applications do |t|
      t.string :firstname
      t.string :lastname
      t.references :partner, null: true, foreign_key: true
      t.string :email
      t.string :company_name
      t.string :postcode
      t.string :company_address

      t.timestamps
    end
  end
end
