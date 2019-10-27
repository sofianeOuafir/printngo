class AddColumnsToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :firstname, :string
    add_column :partners, :lastname, :string
    add_column :partners, :email, :string
    add_column :partners, :password_hash, :string
    add_column :partners, :password_salt, :string
  end
end
