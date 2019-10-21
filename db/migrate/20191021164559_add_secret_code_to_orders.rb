class AddSecretCodeToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :secret_code, :string, nil: false
  end
end
