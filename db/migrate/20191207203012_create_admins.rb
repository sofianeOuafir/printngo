class CreateAdmins < ActiveRecord::Migration[6.0]
  def change
    create_table :admins do |t|
      t.string :firstname
      t.string :lastname
      t.string :email, null: false, index: { unique: true }
      t.string :password_hash
      t.string :password_salt

      t.timestamps
    end
  end
end
