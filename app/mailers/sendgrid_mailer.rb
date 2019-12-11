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
        "email": 'contact@printngo.ca'
      },
      "template_id": 'd-dcdb078019b34e53ba346e5997fe3ca0'
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
        "email": 'contact@printngo.ca'
      },
      "template_id": 'd-37305aec46ae4898a40df3ad3ce89e13'
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
        "email": 'contact@printngo.ca'
      },
      "template_id": 'd-7646a1995e3144ecb17201290e978a40'
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
        "email": 'contact@printngo.ca'
      },
      "template_id": 'd-23c125a1683a4e7fac655d3844533c69'
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
