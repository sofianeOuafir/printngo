class AddSelectedPartnerIdToOrders < ActiveRecord::Migration[6.0]
  def change
    add_reference :orders, :selected_partner, foreign_key: { to_table: :partners }
  end
end
