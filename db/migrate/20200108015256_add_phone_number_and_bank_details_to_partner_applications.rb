class AddPhoneNumberAndBankDetailsToPartnerApplications < ActiveRecord::Migration[6.0]
  def change
    add_column :partner_applications, :phone_number, :string
    add_column :partner_applications, :bank_details, :string
  end
end
