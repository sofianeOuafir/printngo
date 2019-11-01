class AddPrinterIdToOrders < ActiveRecord::Migration[6.0]
  def change
    add_reference :orders, :printer, foreign_key: { to_table: :partners }
  end
end
