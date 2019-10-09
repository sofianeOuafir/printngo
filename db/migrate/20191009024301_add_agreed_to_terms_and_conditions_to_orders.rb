class AddAgreedToTermsAndConditionsToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :agreed_to_terms_and_conditions, :boolean, default: false
  end
end
