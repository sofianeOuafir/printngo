# frozen_string_literal: true

class SendgridMailer
  def self.activation_confirmation_email(email)
    s3 = Aws::S3::Client.new
    File.open('guide.pdf', 'wb') do |file|
      s3.get_object({ bucket:ENV['S3_BUCKET_NAME'], key: I18n.translate('s3.guide')}, target: file)
    end
    data = {
      "personalizations": [
        {
          "to": [
            {
              "email": email
            }
          ]
        }
      ],
      "attachments": [{
        'content': Base64.strict_encode64(File.read('guide.pdf')),
        'type': 'application/pdf',
        'filename': 'guide.pdf',
        "disposition": 'attachment'
      }],
      "from": {
        "email": I18n.translate('mailer.from')
      },
      "template_id": I18n.translate('mailer.activation_confirmation_email.template_id')
    }
    send_email(data)
  end

  def self.activation_email(firstname:, token:, email:)
    data = {
      "personalizations": [
        {
          "to": [
            {
              "email": email
            }
          ],
          "dynamic_template_data": {
            firstname: firstname,
            token: token
          }
        }
      ],
      "from": {
        "email": I18n.translate('mailer.from')
      },
      "template_id": I18n.translate('mailer.activation_email.template_id')
    }
    send_email(data)
  end

  def self.print_order_confirmed_email(order)
    user = order.user
    partner = order.selected_partner
    data = {
      "personalizations": [
        {
          "to": [
            {
              "email": user.email
            }
          ],
          "dynamic_template_data": {
            firstname: user.firstname,
            name: partner.name,
            address: partner.address,
            city: partner.city,
            country: partner.country,
            lat: partner.lat,
            lng: partner.lng,
            postcode: partner.postcode,
            id: order.id,
            opening_hours: partner.opening_hours,
            secret_code: order.secret_code
          }
        }
      ],
      "from": {
        "email": I18n.translate('mailer.')
      },
      "template_id": I18n.translate('mailer.print_order_confirmed_email.template_id')
    }
    send_email(data)
  end

  def self.top_up_order_confirmed_email(order)
    user = order.user
    data = {
      "personalizations": [
        {
          "to": [
            {
              "email": user.email
            }
          ],
          "dynamic_template_data": {
            firstname: user.firstname,
            wallet_balance: user.wallet_balance.to_f / 100,
            invoice_id: order.invoice.id
          }
        }
      ],
      "from": {
        "email": I18n.translate('mailer.')
      },
      "template_id": I18n.translate('mailer.top_up_order_confirmed_email.template_id')
    }
    send_email(data)
  end

  def self.send_welcome_email(user)
    data = {
      "personalizations": [
        {
          "to": [
            {
              "email": user.email
            }
          ],
          "dynamic_template_data": { firstname: user.firstname }
        }
      ],
      "from": {
        "email": I18n.translate('mailer.')
      },
      "template_id": I18n.translate('mailer.welcome_email.template_id')
    }
    send_email(data)
  end

  def self.send_email(data)
    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    begin
      response = sg.client.mail._('send').post(request_body: data)
      return response.status_code
    rescue Exception => e
      puts e.message
    end
  end
end
