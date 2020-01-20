class AddTaxAmountToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :tax_amount_paid, :integer
  end
end
