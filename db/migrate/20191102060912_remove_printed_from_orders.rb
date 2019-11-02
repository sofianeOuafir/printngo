class RemovePrintedFromOrders < ActiveRecord::Migration[6.0]
  def change

    remove_column :orders, :printed, :boolean
  end
end
