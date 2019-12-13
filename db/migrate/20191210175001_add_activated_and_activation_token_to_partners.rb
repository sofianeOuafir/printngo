class AddActivatedAndActivationTokenToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :activated, :boolean, default: false
  end
end
