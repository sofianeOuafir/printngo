class CreatePartners < ActiveRecord::Migration[6.0]
  def change
    create_table :partners do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :postcode
      t.string :country
      t.float :lat
      t.float :lng
      t.string :opening_hours

      t.timestamps
    end
  end
end
