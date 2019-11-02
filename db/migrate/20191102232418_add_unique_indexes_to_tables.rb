class AddUniqueIndexesToTables < ActiveRecord::Migration[6.0]
  def change
    add_index :partners, :email, unique: true
    add_index :users, :email, unique: true
    add_index :orders, :secret_code, unique: true
  end
end
