# frozen_string_literal: true

class SendgridMailer
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
        "email": 'contact@printandgo.ca'
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
        "email": 'contact@printandgo.ca'
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
        "email": 'contact@printandgo.ca'
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
        "email": 'contact@printandgo.ca'
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
