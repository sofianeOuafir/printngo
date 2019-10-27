class RemovePartnerIdFromOrders < ActiveRecord::Migration[6.0]
  def change

    remove_column :orders, :partner_id, :reference
  end
end
