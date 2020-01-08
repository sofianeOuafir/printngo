class AddPhoneNumberAndBankDetailsToPartner < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :phone_number, :string
    add_column :partners, :bank_details, :string
  end
end
